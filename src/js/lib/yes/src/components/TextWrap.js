/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import YESFormStore from '../stores/BillFormStore';
import { Container } from 'flux/utils';
import Immutable from 'immutable';
import layoutWrap from './LayoutWrap';
import { intlShape, FormattedMessage } from 'react-intl';
import { Svr } from 'yes-core';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
//增加:TextWrap的方法,关于输入框
const TextWrap = (BaseComponent) => {
    class YESControlWrapComponent extends PureComponent {
        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
            onTextChange: PropTypes.func,
            onClick: PropTypes.func,
            onControlClick: PropTypes.func,
            onDisplayValueChange: PropTypes.func,
            getBillForm: PropTypes.func,
            intl: intlShape,
            getYigoContext: PropTypes.func,
        }
        static propTypes = {
            yigoid: PropTypes.string.isRequired,
        }
        static getStores() {
            return [YESFormStore];
        }
        // 模拟一个compState
        static virtualState = Immutable.fromJS({
            enable: false,
            visible: true,
            editable: false,
            required: false,
            value: '',
            displayValue: '',
            items: [],
            isVirtual: true,
        })
        static calculateState(prevState, props, context) {
            const billForm = context.getBillForm();
            if (!billForm) {
                return { state: this.virtualState };
            }
            const comp = context.getContextComponent(props.yigoid);
            if (comp == null) {
                console.warn(`field ${props.yigoid} not exist!`);
                return { state: this.virtualState };
            }
            const compState = context.getContextComponentState(props.yigoid);
            const result = {
                state: compState,
                value: prevState ? prevState.value : null,
                displayValue: prevState ? prevState.displayValue : '',
                textLoading: true,
            };
            // if (compState.get('value') === result.value && (result.displayValue !== null && result.displayValue !== '')) {
            if (compState.get('value') === result.value && (result.displayValue !== null)) {
                result.textLoading = false;
            }
            if (prevState && prevState.modalVisible) {
                result.modalVisible = true;
            }
            // if (prevState && prevState.enable) {
            //     result.enable = prevState.enable;
            // }
            // if (prevState && prevState.visible) {
            //     result.visible = prevState.visible;
            // }
            return result;
        }
        async componentDidMount() {
            this.mounted = true;
            await this.updateDisplayValue();
        }
        async componentDidUpdate() {
            await this.updateDisplayValue();
        }
        componentWillUnmount() {
            this.mounted = false;
        }
        onChange = async (v) => {
            const comp = this.context.getContextComponent(this.props.yigoid);
            const yigoid = comp.getMaster(this.props.yigoid);
            await this.context.onValueChange(yigoid, v);
        }
        //增加:onTextChange
        onTextChange = async (v) => {
            const comp = this.context.getContextComponent(this.props.yigoid);
            await comp.onTextChange(v);
        }
        onChangePopupState = (v) => {
            if (v) {
                this.onShowPopup();
            } else {
                this.onHidePopup();
            }
        }
        onClick = (action) => {
            if (this.props.onClick) {
                this.props.onClick();
            }
            this.context.onControlClick(this.props.yigoid, action);
        }
        onHidePopup() {
            this.setState({
                modalVisible: false,
            });
        }
        onShowPopup() {
            this.setState({
                modalVisible: true,
            });
        }
        uploadImage = async (file, fileName) => {
            const billForm = this.context.getBillForm();
            if (!billForm) {
                return null;
            }
            const formKey = billForm.form.formKey;
            const oid = billForm.form.getOID();
            const options = {
                service: 'UploadImage',
                formKey,
                // operatorID: $.cookie("userID"),
                fileID: -1,
                oid,
                mode: 2,
                isFixName: false,
                maxSize: -1,
                types: ['gif', 'jpg', 'jpeg', 'png', 'bmp'],
            };
            return await Svr.Request.upload(file, options, fileName);
        }
        getBuddyCaption() {
            const comp = this.context.getContextComponent(this.props.yigoid);
            if (!comp) {
                return '';
            }
            const buddyYigoId = comp.getMetaObj().buddyKey;
            if (buddyYigoId) {
                const buddyComp = this.context.getContextComponent(buddyYigoId);
                if (buddyComp) {
                    const result = buddyComp.getValue();
                    return result || buddyComp.getMetaObj().caption;
                }
            }
            return comp.getMetaObj().caption || '';
        }
        getComponentState() {
            return this.state.state;
        }
        //增加：更新验证码
        updateValidate = async () => {
            const comp = this.context.getContextComponent(this.props.yigoid);
            await comp.getValidateImage();
        }
        async updateDisplayValue() {
            // await waitToTransitionEnd();
            if (this.state.state.get('isVirtual')) { // 如果是虚拟状态
                return;
            }
            const comp = this.context.getContextComponent(this.props.yigoid);
            const v = this.state.state.get('value');
            const lastV = this.state.value;
            const result = {};
            if (v !== lastV || this.state.textLoading == true) {
                const text = await comp.calculateDisplayValue(v, this.context.getYigoContext());
                // if (this.mounted) {
                result.value = v;
                result.displayValue = text;
                result.textLoading = false;
                // this.setState({
                //     value: v,
                //     displayValue: text,
                //     textLoading: false,
                // });
                // }
            }
            // const form = this.context.getBillForm();
            // if(comp.getMetaObj().visible){
            //     result.visible = await form.form.evalFormula(comp.getMetaObj().visible);
            // }else{
            //     result.visible = true;
            // }
            // if(comp.getMetaObj().enable){
            //     result.enable= await form.form.evalFormula(comp.getMetaObj().enable);
            // }else{
            //     result.enable = false;
            // }
            if (this.mounted) {
                this.setState(result);
            }
        }
        formatMessage = (msg) => {
            if (this.context.intl) {
                return this.context.intl.formatMessage({ id: msg });
            }
            return msg;
        }
        render() {
            const state = this.getComponentState();
            const comp = this.context.getContextComponent(this.props.yigoid);
            if (!this.props.visible && state.get('visible') === false) {
                return null;
            }
            const { onClick, ...otherProps } = this.props;
            const caption = this.getBuddyCaption();
            return (<BaseComponent
                {...comp && comp.metaObj}
                // disabled={!this.state.enable}
                // visible={!!this.state.visible}
                //增加:控件是否必填.
                disabled={!state.get('enable')}
                visible={state.get('visible')}
                isVirtual={!!state.get('isVirtual')}
                textLoading={this.state.textLoading}
                controlState={state}
                onChange={this.onChange}
                onClick={this.onClick}
                caption={caption}
                uploadImage={this.uploadImage}
                displayValue={this.state.displayValue}
                placeholder={this.formatMessage('Please input ') + caption}
                onChangePopupState={this.onChangePopupState}
                modalVisible={this.state.modalVisible}
                //增加:onTextChange
                onTextChange={this.onTextChange}
                //增加:showRequiredIcon
                showRequiredIcon={state.get("required")}
                //增加: 更新验证码
                updateValidate={this.updateValidate}
                {...otherProps}
            />);
        }
    }
    return YESControlWrapComponent;
};
const totalWrap = (BaseComponent) =>
    Container.create(TextWrap(layoutWrap(BaseComponent)), {
        withProps: true,
        withContext: true,
    });
export default totalWrap;
