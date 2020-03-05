/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */

import React, { PureComponent } from "react";
import { Container } from "flux/utils";
import YESFormStore from "../stores/BillFormStore";
import Immutable from "immutable";
import PropTypes from 'prop-types';
import StyleAttributeWrap from "./StyleAttributeWrap";
import Util from '../util';

/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
var ControlWrap = (BaseComponent) => {
    class YESListControlWrapComponent extends PureComponent {
        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
            onClick: PropTypes.func,
            onDisplayValueChange: PropTypes.func,
            getBillForm: PropTypes.func,
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
            'data': [],
            'isVirtual': true,
        })

        static calculateState(prevState, props, context) {
            var billForm = context.getBillForm();
            if (!billForm) {
                return { state: this.virtualState };
            }
            var comp = context.getContextComponent(props.yigoid);
            if (comp == null) {
                console.warn(`field ${props.yigoid} not exist!`);
                return { state: this.virtualState };
            }
            // 当billForm，comp均存在时，停止loading
            // 这段代码有问题,会导致每次的state都不同,重复刷新控件
            var compState = context.getContextComponentState(props.yigoid);
            return {
                state: compState
            };
        }

        onClick = (rowIndex, type) => {
            var list = this.context.getContextComponent(this.props.yigoid);
            if (list) {
                if (this.props.clickSilence) {
                    list.rowClick(rowIndex, type);
                } else {
                    Util.safeExec(async () => {
                        await list.rowClick(rowIndex, type);
                    });
                }
            }
        }

        getComponentState() {
            return this.state.state;
        }
        /**
         * 行点击(弹框)后的操作
         */
        actionRow = (action) => {
            var list = this.context.getContextComponent(this.props.yigoid);
            if (list) {
                Util.safeExec(async () => {
                    await list.actionRow(action);
                });
            }
        }
        /**
         *数据库分页,上拉结束后,重新加载数据
         */
        getRefreshData = () => {
            var comp = this.context.getContextComponent(this.props.yigoid);
            comp.getRefreshData()
        }
        render() {
            var state = this.getComponentState();
            const comp = this.context.getContextComponent(this.props.yigoid);
            return (<BaseComponent
                {...comp && comp.metaObj}
                controlState={state}
                onClick={this.onClick}
                actionRow={this.actionRow}
                getRefreshData={this.getRefreshData}
                {...this.props}
            />);
        }
    }
    return YESListControlWrapComponent;
};

var totalWrap = (BaseComponent) => {
    return Container.create(ControlWrap(BaseComponent), { withProps: true, withContext: true });
};
export default totalWrap;
