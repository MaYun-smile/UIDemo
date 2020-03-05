/**
 * 一个针对单据操作的包装
 */

import React, { Component } from 'react';
import YESFormStore from '../stores/BillFormStore';
import { Container } from 'flux/utils';
import Immutable from 'immutable';
import Util from '../util';
import PropTypes from 'prop-types';

class DummyToolbar {
    constructor() {
        this.state = Immutable.fromJS({
            items: []
        });
        this.isDefault = true;
    }
    setItemVisible(key, visible) {
        const optItem = this.state.get('items').find((item) => item.get('key') === key);
        const index = this.state.get('items').indexOf(optItem);
        this.state = this.state.setIn(['items', index, 'visible'], visible);
    }
    setItemEnable(key, enable) {
        const optItem = this.state.get('items').find((item) => item.get('key') === key);
        const index = this.state.get('items').indexOf(optItem);
        this.state = this.state.setIn(['items', index, 'enable'], enable);
    }
    setItems(items) {
        this.items = items;
        this.state = this.state.set('items', Immutable.fromJS(items));
    }
    hasItem(key) {
        const optItem = this.state.get('items').find((item) => item.get('key') === key);
        return optItem;
    }
    addItem(item) {
        const index = this.state.get('items').size;
        this.state = this.state.setIn(['items', index], Immutable.fromJS(item));
    }
    getItems() {
        return this.getState.get('items');
    }
    clear() {
        this.setItems([]);
    }
    getState() {
        return this.state;
    }
}
const OperationWrap = (BaseComponent) => {
    class OperationComponent extends Component {
        static getStores() {
            return [YESFormStore];
        }

        static contextTypes = {
            getBillForm: PropTypes.func,
            onScript: PropTypes.func,
        }

        static calculateState(prevState, props, context) {
            const billform = context.getBillForm();
            if (billform && billform.form.defaultToolBar) {
                return {
                    state: billform.form.defaultToolBar.getState(),
                };
            }
            // let toolbar = new DummyToolbar();
            // if(billform){
            //     billform.form.getUIProcess().addOperation(toolbar);
            // }
            return {
                state: false,
            };
        }
        /**
         * 获取当前单据的所有操作
         */
        generateOperations = () => {
            const billform = this.context.getBillForm();
            if (!this.toolbar) {
                this.toolbar = new DummyToolbar();
            }
            if (billform) {
                // const opts = billform.form.operations;
                billform.form.getUIProcess().addOperation(this.toolbar);
            }
            return this.toolbar;
        }
        onOperationClick = (script) => {
            Util.safeExec(async () => {
                await this.context.onScript(script);
            });
        }
        render() {
            // const toolbar = this.generateOperations();
            if (this.state.state) {
                return <BaseComponent
                    controlState={this.state.state}
                    onClick={this.onOperationClick}
                    {...this.props}
                >
                </BaseComponent>
            } else {
                return null;
            }
        }
    }
    return Container.create(OperationComponent, { withProps: true, withContext: true });
}

export default OperationWrap;