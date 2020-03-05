/*
 * @Author: gmf
 * @Date:   2016-03-14 10:29:16
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-01-03 17:28:14
 */

import React, { Component } from 'react';
import AppDispatcher from '../dispatchers/AppDispatcher';
import YESBillFormWrap from './YESBillFormWrap';
import YESFormStore from '../stores/BillFormStore';
import { Util } from '../yes_ext';
import getHistory from '../history';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import { lodash as $ } from 'yes-common';
import { View } from 'yes-core';

require('../api/YESActionHandler');

export default function BillFormWrap(MessageBox, LoadingComp) {
    class YESBillForm extends Component {
        static getStores() {
            return [YESFormStore];
        }

        static propTypes = {
            className: PropTypes.string,
            formKey: PropTypes.string,
            oid: PropTypes.string,
            params: PropTypes.object,
            sysexpvals: PropTypes.object,
            children: PropTypes.element.isRequired,
        }

        static calculateState(prevState, props) {
            var key = Util.buildFormKey(props.formKey,
                props.oid ? props.oid : -1
            );
            return YESFormStore.getBillFormStatus(key);
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
            onControlClick: PropTypes.func,
            onScript: PropTypes.func,
            getYigoContext: PropTypes.func,
        }

        getBillForm = () => {
            var key = Util.buildFormKey(this.props.formKey,
                this.props.oid ? this.props.oid : -1
            );
            var billForm = YESFormStore.getBillForm(key);
            if (billForm && !billForm.isBillThisStatus(this.props.status)) {
                return null;
            }
            return billForm;
        }

        onScript = async (script) => {
            const billform = this.getBillForm();
            if (!billform) {
                return;
            }
            await billform.onScript(script);
            // billform.emit('script',script);
        }

        onControlClick(yigoid, action) {
            var key = Util.buildFormKey(this.props.formKey,
                this.props.oid ? this.props.oid : -1
            );
            var billForm = YESFormStore.getBillForm(key);
            if (!billForm) {
                return;
            }
            if ($.isString(action)) {
                billForm.emit('click', yigoid, action);
            } else {
                billForm.emit('click', yigoid);
            }
        }

        getYigoContext = () => {
            const form = this.getBillForm();
            if (form) {
                const cxt = new View.Context(form.form);
                return cxt;
            }
            return null;
        }

        getChildContext() {
            const oid = `${(this.props.oid || -1)}`;
            const key = Util.buildFormKey(this.props.formKey,
                this.props.oid ? this.props.oid : -1
            );
            return {
                formKey: this.props.formKey,
                oid,
                key,
                getContextComponent: (yigoid) => this.getContextComponent(yigoid),
                getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
                onValueChange: (yigoid, v) => this.onValueChange(yigoid, v),
                onDisplayValueChange: (yigoid, v) => this.onDisplayValueChange(yigoid, v),
                onControlClick: (yigoid, action) => this.onControlClick(yigoid, action),
                onScript: this.onScript,
                getBillForm: this.getBillForm,
                getYigoContext: this.getYigoContext,
            };
        }

        getContextComponent(yigoid) {
            const key = Util.buildFormKey(this.props.formKey,
                this.props.oid ? this.props.oid : -1
            );
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
            return comp.getState();
            // return state;
        }

        onValueChange(yigoid, v) {
            const key = Util.buildFormKey(this.props.formKey,
                this.props.oid ? this.props.oid : -1
            );
            const billForm = YESFormStore.getBillForm(key);
            billForm.emit('changed', yigoid, v);
        }

        /**
         * 表头的控件不需要做处理
         * @param  {[type]} yigoid [description]
         * @param  {[type]} v      [description]
         * @return {[type]}        [description]
         */
        onDisplayValueChange(yigoid, v) {
            // var key = Util.buildFormKey(this.props.formKey,
            //     this.props.oid?this.props.oid:-1
            // );
            // var billForm = YESFormStore.getBillForm(key);
            // billForm.emit('displayChanged', yigoid, v);
        }

        componentDidMount() {
            setTimeout(() => this.changeFormStatus(), 0);
        }

        componentDidUpdate() {
            // setTimeout(()=>this.changeFormStatus(),0);
        }

        changeFormStatus() {
            const oid = this.props.oid || -1;
            const key = Util.buildFormKey(this.props.formKey,
                oid
            );
            const value = YESFormStore.getBillForm(key);
            if (value) {
                value.setBillStatus(this.props.status);
            } else {
                (async () => {
                    await YESFormStore.fetchForm(
                        key,
                        YESBillFormWrap.translateStatus(this.props.status),
                        this.props.expVals
                    );
                    // value = YESFormStore.getBillForm(key);
                    // value.setBillStatus(this.props.status);
                })();
            }
        }

        onActionPress = (action) => {
            if (action === 'Retry') {
                const oid = this.props.oid || -1;
                const key = Util.buildFormKey(this.props.formKey,
                    oid
                );
            }
            if (action === 'Cancel') {
                getHistory().goBack();
            }
        }

        render() {
            if (this.state.status === 'error') {
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
            // if (this.state.status !== 'fetching' && !this.state.stopEvent) {
            //     return this.props.children;
            // }
            // if (this.props.hideLoading) {
            //     return null;
            // }
            // return <LoadingComp icon="loading" show>加载中...</LoadingComp>;
            return this.props.children;
        }
    }

    return Container.create(YESBillForm, { withProps: true });
}
