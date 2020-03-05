/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */

import React, { Component } from 'react';
import YESFormStore from '../stores/BillFormStore';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
const panelWrap = (BaseComponent) => {
    class YESPanelWrapComponent extends Component {
        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onControlClick: PropTypes.func,
            getBillForm: PropTypes.func,
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
            return {
                state: compState
            }
        }
        onClick = (action) => {
            this.context.onControlClick(this.props.yigoid, action);
        }
        getComponentState() {
            return this.state.state;
        }
        render() {
            if (!this.props.yigoid) {
                alert('no yigoid');
                debugger
            }
            const state = this.getComponentState();
            if (!state.get('visible')) {
                return null;
            }
            const comp = this.context.getContextComponent(this.props.yigoid);
            return (<BaseComponent
                comp={comp}
                style={comp.getCommonProps ? comp.getCommonProps() : null}
                {...comp && comp.metaObj}
                items={comp.items}
                disabled={!state.get('enable')}
                isVirtual={state.get('isVirtual')}
                controlState={state}
                onClick={this.onClick}
                {...this.props}
            />);
        }
    }
    return YESPanelWrapComponent;
};
const totalWrap = (BaseComponent) =>
    Container.create(panelWrap(BaseComponent), {
        withProps: true,
        withContext: true,
    });
export default totalWrap;
