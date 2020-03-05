/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */

import React, { Component } from "react";
import { Container } from "flux/utils";
import YESFormStore from "../stores/BillFormStore";
import Immutable from "immutable";
import layoutWrap from './LayoutWrap';
import PropTypes from 'prop-types';
import waitToTransitionEnd from '../waitToTransitionEnd';
import { AppDispatcher } from "..";
import getHistory from '../history';
import BackHandler from '../api/HardwareBackButton';
import { intlShape, FormattedMessage } from 'react-intl';

/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
var ControlWrap = (BaseComponent) => {
    class YESComboboxControlWrapComponent extends Component {

        onChange = (v) => this.context.onValueChange(this.props.yigoid, v)

        onChangePopupState = (v) => {
            if (v) {
                this.onShowPopup();
            }
            else {
                this.onHidePopup();
            }
        };


        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
            onClick: PropTypes.func,
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
        static virtualState = Immutable.Map({
            'enable': false,
            'visible': true,
            'editable': false,
            'required': false,
            'value': '',
            'displayValue': '',
            'items': [],
            'isVirtual': true,
        })

        static calculateState(prevState, props, context) {
            var billForm = context.getBillForm();
            if (!billForm) {
                return { state: this.virtualState };
            }
            if (!props.yigoid) {
                console.log('ddddd');
            }
            var comp = context.getContextComponent(props.yigoid);
            if (comp == null) {
                console.warn(`field ${props.yigoid} not exist!`);
                return { state: this.virtualState };
            }
            // 当billForm，comp均存在时，停止loading
            var compState = context.getContextComponentState(props.yigoid);
            var result = {
                state: compState,
                showPopup: false,
                value: prevState ? prevState.value : null,
                displayValue: prevState ? prevState.displayValue : "",
                items: comp.items
            };
            if (prevState && prevState.showPopup) {
                result.showPopup = true;
            }
            // if(prevState && prevState.enable){
            //     result.enable = prevState.enable;
            // }
            // if(prevState && prevState.visible){
            //     result.visible= prevState.visible;
            // }
            return result;
        }

        /**
         * 当包含的内容发生数据变化的时候触发，传入参数v，可以有两种形式
         * string和Object,Object的话，必须包含属性label和value
         * @param  {Ojbect,String} v [description]
         * @return
         */
        onValueChange(v) {
            if (!this.props.yigoid) {
                console.log('eeee');
            }
            this.context.onValueChange(this.props.yigoid, v);
        }

        getComponentState() {
            return this.state.state;
        }

        async updateDisplayValue() {
            // await waitToTransitionEnd();
            if (this.state.state.get('isVirtual')) { //如果是虚拟状态
                return;
            }
            const comp = this.context.getContextComponent(this.props.yigoid)
            const v = this.state.state.get('value');
            let lastV = this.state.value;
            let result = {};
            if (v != lastV) {
                let text = await comp.calculateDisplayValue(v, this.context.getYigoContext());
                result.value = v;
                result.displayValue = text;
                // if(this.mounted){
                //     this.setState({
                //         value:v,
                //         displayValue:text
                //     })
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

        componentWillUnmount() {
            this.mounted = false;
            this.backHandler && this.backHandler();
        }

        async componentDidMount() {
            this.mounted = true;
            await this.updateDisplayValue();
        }

        async componentDidUpdate() {
            await this.updateDisplayValue();
        }

        async onShowPopup() {
            if (this.state.showPopup) {
                return;
            }
            this.setState({
                showPopup: true,
            });
            getHistory().push(`#${this.props.yigoid}_popup`, false);
            this.backHandler = BackHandler.addPreEventListener(() => {
                this.onHidePopup();
            });
            const comp = this.context.getContextComponent(this.props.yigoid);
            if (comp) {
                await comp.resetItems && comp.resetItems(this.props.force);
            }
        }

        onHidePopup() {
            if (!this.state.showPopup) {
                return;
            }
            this.setState({
                showPopup: false,
            });
            this.backHandler && this.backHandler();
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
                    return buddyComp.getMetaObj().caption;
                }
            }
            return comp.getMetaObj().caption;
        }
        formatMessage = (msg) => {
            if (this.context.intl) {
                return this.context.intl.formatMessage({ id: msg });
            }
            return msg;
        }
        render() {
            var state = this.state.state;
            const comp = this.context.getContextComponent(this.props.yigoid);
            let visible = state.get('visible');
            if (this.props.visible != null) {
                visible = this.props.visible;
            }
            if (!visible) {
                return null;
            }
            const caption = this.getBuddyCaption();
            return (<BaseComponent
                {...comp.metaObj}
                // disabled={!state.get('enable')}
                // visible={!!this.state.visible} 
                disabled={!state.get('enable')}
                visible={visible}
                controlState={state}
                caption={caption}
                items={state.get('items')}
                displayValue={this.state.displayValue}
                showPopup={this.state.showPopup}
                onChangePopupState={this.onChangePopupState}
                onChange={this.onChange}
                {...this.props}
            />);
        }
    }
    return YESComboboxControlWrapComponent;
};

var totalWrap = (BaseComponent) => {
    return Container.create(ControlWrap(layoutWrap(BaseComponent)), { withProps: true, withContext: true });
};
export default totalWrap;
