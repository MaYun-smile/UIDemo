import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YESFormStore from '../stores/BillFormStore';
import YESBillFormWrap from './YESBillFormWrap';
import { Util } from '../yes_ext';
import { Container } from 'flux/utils';
import { View, YIUI } from 'yes-core';
import History from '../history';
// import defaultControlMapping from './util/defaultControlMapping';
import { lodash as $ } from 'yes-common';
import DynamicControl from './DynamicControl';
// import { InteractionManager } from 'react-native';
import InteractionManager from '../InteractionManager';
import { intlShape, FormattedMessage } from 'react-intl';
import emptyFunction from 'fbjs/lib/emptyFunction';
import AppStateStore from '../stores/AppStatus';

/**
 * 根据yigo2返回的单据布局结构 (设计器中设计 )，自动生成界面对应布局的
 * 单据实现类
 */
function DynamicBillFormWrap(MessageBox, ToastComponent) {
    class DynamicBillForm extends Component {
        static getStores() {
            return [YESFormStore, AppStateStore];
        }

        static calculateState(prevState, props) {
            const oid = (prevState && prevState.oid) ? prevState.oid : (props.oid ? props.oid : -1);
            const key = Util.buildFormKey(props.formKey,
                oid,
            );
            const status = YESFormStore.getBillFormStatus(key);
            return Object.assign({
                globalBusySign: (status.status === 'ok' && prevState) ? prevState.globalBusySign : AppStateStore.getState().get('busyLoading') > 0,
            }, status);
        }

        static contextTypes = {
            getMappedComponent: PropTypes.func,
            intl: intlShape,
        }
        static propTypes = {
            className: PropTypes.string,
            formKey: PropTypes.string,
            status: PropTypes.string,
            oid: PropTypes.string,
            params: PropTypes.object,
            loadWorkitem: PropTypes.bool,
        }

        static childContextTypes = {
            formKey: PropTypes.string,
            oid: PropTypes.string,
            key: PropTypes.string,
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
            onDisplayValueChange: PropTypes.func,
            getBillForm: PropTypes.func,
            eval: PropTypes.func,
            onControlClick: PropTypes.func,
            onScript: PropTypes.func,
            getYigoContext: PropTypes.func,
            getComponents: PropTypes.func,
        }

        static defaultProps = {
            onClose: emptyFunction,
            reloadData: true,
        }

        state = {
            oid: this.props.oid,
        }


        getFormKey = () => {
            return Util.buildFormKey(this.props.formKey,
                this.state.oid ? this.state.oid : -1
            );
        }
        getBillForm = () => {
            const key = this.getFormKey();
            const billForm = YESFormStore.getBillForm(key);
            // if (billForm && !billForm.isBillThisStatus(this.props.status)) {
            //     return null;
            // }
            return billForm;
        };

        onControlClick(yigoid, action) {
            const key = this.getFormKey();
            const billForm = YESFormStore.getBillForm(key);
            if (!billForm) {
                return;
            }
            if ($.isString(action)) {
                billForm.emit('click', yigoid, action);
            } else {
                billForm.emit('click', yigoid);
            }
        }

        onScript = async (script) => {
            const billform = this.getBillForm();
            if (!billform) {
                return;
            }
            await billform.onScript(script);
            // billform.emit('script', script);
        };

        getContextComponent(yigoid) {
            const key = this.getFormKey();
            const billForm = YESFormStore.getBillForm(key);
            if (!billForm) {
                return null;
            }
            const comp = billForm.getComponent(yigoid);
            if (comp == null) {
                // console.warn(`field ${yigoid} not exist!`);
            }
            return comp;
        }

        getContextComponentState(yigoid) {
            const comp = this.getContextComponent(yigoid);
            const state = comp.getState();
            return state;
        }

        async onValueChange(yigoid, v) {
            const key = this.getFormKey();
            const billForm = YESFormStore.getBillForm(key);
            await billForm.onValueChange(yigoid, v);
            // billForm.emit('changed', yigoid, v);
        }

        eval = async (script) => {
            const billform = this.getBillForm();
            return await billform.form.eval(script);
        }
        getChildContext() {
            const oid = (this.props.oid || -1).toString();
            const key = this.getFormKey();
            return {
                formKey: this.props.formKey,
                oid,
                key,
                getContextComponent: (yigoid) => this.getContextComponent(yigoid),
                getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
                onValueChange: (yigoid, v) => this.onValueChange(yigoid, v),
                onDisplayValueChange: (yigoid, v) => this.onDisplayValueChange(yigoid, v),
                onControlClick: (yigoid, action) => this.onControlClick(yigoid, action),
                eval: this.eval,
                onScript: this.onScript,
                getBillForm: this.getBillForm,
                getYigoContext: this.getYigoContext,
                getComponents: this.getComponents,
            };
        }
        getComponents = ()=> {
            const form = this.getBillForm();
            if(!form) {
                return null;
            }
            return form.form.getComponentList();
        }
        getYigoContext = () => {
            const form = this.getBillForm();
            if (form) {
                const cxt = new View.Context(form.form);
                return cxt;
            }
            return null;
        }
        onActionPress = (action) => {
            if (action === 'Retry') {
                const oid = this.props.oid || -1;
                const key = Util.buildFormKey(this.props.formKey, oid);
            }
            if (action === 'Cancel') {
                if(this.props.onCancel) {
                    this.props.onCancel();
                    return;
                }
                History().goBack();
            }
        }
        buildChildren() {
            if (this.props.children) {
                return this.props.children;
            }
            const form = this.getBillForm();
            if (form) {
                const rootPanel = form.form.getRoot();
                if (rootPanel && rootPanel) {
                    // const Control = this.context.getMappedComponent(rootPanel.tagName,rootPanel.metaObj.key) ;
                    // const Control = defaultControlMapping.get(rootPanel.tagName);
                    return <DynamicControl yigoid={rootPanel.metaObj.key} />;
                }
            }
            return <ToastComponent icon="loading" show>{this.formatMessage('loading...')}</ToastComponent>;
        }
        async changeFormStatus() {
            const key = this.getFormKey();
            const value = YESFormStore.getBillForm(key);
            if (value) {
                if (this.props.reloadData) {
                    // console.time('changeformstatus');
                    value.form.sysExpVals = this.props.expVals;
                    value.form.setOperationState(YESBillFormWrap.translateStatus(this.props.status));
                    // value.setBillStatus(this.props.status);
                    await YESFormStore.reloadFormData(key, this.props.document);
                    // console.timeEnd('changeformstatus');
                    // value.form.clearFormulaCache();
                    // value.form.getUIProcess().addOperation();
                } else {
                    // value.form.sysExpVals = this.props.expVals;
                    const yigoState = YESBillFormWrap.translateStatus(this.props.status);
                    if (value.form.getOperationState() !== yigoState) {
                        value.form.resetUIStatus(YIUI.FormUIStatusMask.ENABLE |
                            YIUI.FormUIStatusMask.VISIBLE | YIUI.FormUIStatusMask.OPERATION);
                    }
                }
            } else {
                // await YESFormStore.fetchForm(
                //     key,
                //     YESBillFormWrap.translateStatus(this.props.status),
                //     this.props.expVals
                // );
                (async () => {
                    await YESFormStore.fetchForm(
                        key,
                        YESBillFormWrap.translateStatus(this.props.status),
                        this.props.expVals,
                        null,
                        this.props.parent,
                        this.props.formID,
                    );
                    // this.setState({
                    //     oid: form.form.getOID(),
                    // });
                })();
            }
        }

        componentDidMount() {
            InteractionManager.runAfterInteractions(() => this.changeFormStatus());
        }

        componentWillUnmount() {
            const form = this.getBillForm();
            this.props.onClose(form);
        }

        formatMessage = (msg) => {
            return this.context.intl ? this.context.intl.formatMessage({ id: msg }) : msg;
        }

        render() {
            if (this.state.status === 'error') {
                if(this.props.hideMessage) {
                    return null;
                }
                return (
                    <MessageBox
                        title="error"
                        error={this.state.error}
                        // message={this.state.error.error_info || this.state.error.message}
                        onActionPress={this.onActionPress}
                        actions={['Retry', 'Cancel']}
                    />
                );
            }
            if ((this.state.status === 'ok' || this.state.status === 'reloading')) {
                return this.buildChildren();
            }
            if (this.props.hideLoading || this.state.globalBusySign) {
                return null;
            }
            return <ToastComponent icon="loading" show>{this.formatMessage('loading...')}</ToastComponent>;
        }
    }

    return Container.create(DynamicBillForm, { withProps: true });
}
export default DynamicBillFormWrap;
