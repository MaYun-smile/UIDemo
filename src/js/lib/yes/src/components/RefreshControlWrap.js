import React, { Component } from 'react';
import YESFormStore from '../stores/BillFormStore';
import { Container } from 'flux/utils';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

const refreshControlWrap = (BaseComponent) => {
    class YESListControlWrapComponent extends Component {
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
                state: compState,
            };
        }
        onClick = (action) => {
            this.context.onControlClick(this.props.yigoid, action);
        }
        getComponentState() {
            return this.state.state;
        }
        handleScript = async (script) => {
            const { getBillForm } = this.context;
            const form = getBillForm();
            await form.form.eval(script);
        }
        render() {
            if (!this.props.yigoid) {
                alert('no yigoid');
                debugger;
            }
            const state = this.getComponentState();
            if (!state.get('visible')) {
                return null;
            }
            const comp = this.context.getContextComponent(this.props.yigoid);
            return (<BaseComponent
                comp={comp}
                style={comp.getCommonProps()}
                {...comp && comp.metaObj}
                items={comp.items}
                disabled={!state.get('enable')}
                isVirtual={state.get('isVirtual')}
                controlState={state}
                onClick={this.onClick}
                handleScript={this.handleScript}
                {...this.props}
            />);
        }
    }

    return YESListControlWrapComponent;
};

const containerWrap = (BaseComponent) =>
    Container.create(refreshControlWrap(BaseComponent), { withProps: true, withContext: true });
export default containerWrap;

