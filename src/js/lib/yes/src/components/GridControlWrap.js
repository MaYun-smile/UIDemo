/*
* @Author: gmf
* @Date:   2016-03-17 09:22:11
* @Last Modified by:   gmf
* @Last Modified time: 2016-11-30 10:40:05
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'flux/utils';
import Immutable from 'immutable';
import YESFormStore from '../stores/BillFormStore';
import BackHandler from '../api/HardwareBackButton';
import getHistory from '../history';
import Util from '../util';

var ControlWrap = (BaseComponent) => {
    class YESGridControlWrapComponent extends Component {
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

        static childContextTypes = {
            getOwner: PropTypes.func,
        }
        static getStores() {
            return [YESFormStore];
        }

        getChildContext() {
            return {
                getOwner: this.getGridComponent,
            };
        }

        // 模拟一个compState
        static virtualState = Immutable.Map({
            enable: false,
            visible: true,
            editable: false,
            required: false,
            value: '',
            displayValue: '',
            data: [],
            isVirtual: true,
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
            const result = {
                state: compState,
            };
            if (prevState) {
                result.detailRow = prevState.detailRow;
                result.detailVisible = prevState.detailVisible;
            }
            return result;
        }

        componentWillUnmount() {
            this.backHandler && this.backHandler();
        }

        onClick = (rowIndex) => {
            const list = this.context.getContextComponent(this.props.yigoid);
            if (list) {
                if (this.props.clickSilence) {
                    list.doOnRowDblClick(rowIndex);
                } else {
                    Util.safeExec(async () => {
                        await list.doOnRowDblClick(rowIndex);
                    });
                }
            }
        }

        getComponentState() {
            return this.state.state;
        }

        addNewRow = async () => {
            const grid = this.context.getContextComponent(this.props.yigoid);
            if (grid) {
                const rowData = await grid.addGridRow();
                this.onRowDetail(rowData.rowIndex);
            }
        }

        removeRow = async (row) => {
            const grid = this.context.getContextComponent(this.props.yigoid);
            if (grid) {
                grid.deleteGridRow(row);
            }
        }

        onRowDetail = (rowIndex) => {
            this.setState({
                detailRow: rowIndex,
                detailVisible: true,
            });
            getHistory().push(`#${this.props.yigoid}_griddetail`, false);
            this.backHandler = BackHandler.addPreEventListener(() => {
                this.onHideDetail();
            });
        }

        selectRow = (rowIndex)=> {

        }

        onHideDetail = () => {
            this.setState({
                detailVisible: false,
            });
            this.backHandler && this.backHandler();
        }

        getGridComponent = () =>
            this.context.getContextComponent(this.props.yigoid)

        render() {
            const state = this.getComponentState();
            return (<BaseComponent
                controlState={state}
                disabled={!state.get('enable')}
                detailRow={this.state.detailRow}
                onHideDetail={this.onHideDetail}
                detailVisible={this.state.detailVisible}
                onClick={this.onClick}
                selectRow={this.selectRow}
                onRowDetail={this.onRowDetail}
                addNewRow={this.addNewRow}
                removeRow={this.removeRow}
                {...this.props}
            />);
        }
    }
    return YESGridControlWrapComponent;
};

const totalWrap = (BaseComponent) => {
    return Container.create(ControlWrap(BaseComponent), { withProps: true, withContext: true });
};
export default totalWrap;
