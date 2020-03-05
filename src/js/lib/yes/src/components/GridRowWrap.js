/* 
 * @Author: gmf
 * @Date:   2016-12-01 15:35:33
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-08 17:16:11
 */


import React, { Component } from "react";
import Immutable from "immutable";
import PropTypes from 'prop-types';
import { View, YIUI } from 'yes-core';
/**
 * 用于包装ListView类控件的行包裹，提供getComponent等方法，
 * 这样在ListView下的控件渲染可以和头控件的渲染方式保持一致
 * 表格的行数据，在初始状态下是保存在Document中的，需要显示的行才会触发数据加载
 * 当前不支持行数据之间存在依赖关系的情况
 * @param  {[type]} BaseComponent [description]
 * @return {[type]}               [description]
 */
export default (BaseComponent, RefreshIndicator, gridId) => {
    return class ListRowWrapComponent extends Component {

        virtualState = Immutable.fromJS({})

        state = {
            loaded: false
        }

        static contextTypes = {
            getBillForm: PropTypes.func,
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
        }

        static childContextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
            onControlClick: PropTypes.func,
            eval: PropTypes.func,
            getYigoContext: PropTypes.func,
        }

        getChildContext() {
            return {
                getContextComponent: (yigoid) => this.getContextComponent(yigoid),
                getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
                //onDisplayValueChange: (yigoid) => this.onDisplayValueChange(yigoid),
                onControlClick: (yigoid) => this.onClick(yigoid),
                onValueChange: this.onValueChange,
                getYigoContext: this.getYigoContext,
                eval: this.eval,
            };
        }

        getYigoContext = () => {
            const billform = this.context.getBillForm();
            const form = billform.form;
            const cxt = new View.Context(form);
            cxt.setRowIndex(this.props.rowIndex);
            return cxt;
        }

        eval = async (script) => {
            const billform = this.context.getBillForm();
            const form = billform.form;
            const cxt = new View.Context(form);
            cxt.setRowIndex(this.props.rowIndex);
            return await form.eval(script, cxt);
        }
        onClick(yigoid) {
            //::TODO:
            const comp = this.context.getContextComponent(gridId);
            comp && comp.doOnCellClick(this.props.rowIndex, yigoid);
        }

        onValueChange = async (yigoid, v) => {
            const grid = this.context.getContextComponent(gridId);
            if (!grid) {
                return;
            }
            const cmp = grid.getColumnEditor(yigoid);
            await grid.setValueByKey(this.props.rowIndex, yigoid, cmp.convertValue(v), true, true);
        }

        onDisplayValueChange(yigoid, v) {
            // //list.data[rowIndex][yigoid].caption = v;
            // this.virtualState = this.virtualState.mergeIn([yigoid], Immutable.Map({
            //     displayValue: v
            // }));
            // list.setDisplayValueByKey(rowIndex, yigoid, v);
        }

        getContextComponent(yigoid) {
            var grid = this.context.getContextComponent(gridId);
            if (grid) {
                return grid.getColumnEditor(yigoid);
            }
            return null;
            // var billForm = this.context.getBillForm();
            // var comp = billForm.getCellComponent(gridId, this.props.rowIndex, yigoid);
            // return comp;
        }

        getContextComponentState(yigoid) {
            var list = this.context.getContextComponent(gridId);
            const c = this.getContextComponent(yigoid);
            var v = list.getValueByKey(this.props.rowIndex, yigoid);
            //let dv = list.getDisplayValueByKey(rowIndex, yigoid);
            let en = list.isCellEnable(this.props.rowIndex, yigoid);
            const st = c.getState();
            if (this.virtualState.get(yigoid)) {
                this.virtualState = this.virtualState.mergeIn([yigoid], Immutable.Map({
                    value: v,
                    enable: en,
                    items: st.get('items'),
                }));
            } else {
                this.virtualState = this.virtualState.setIn([yigoid], Immutable.Map({
                    enable: en,
                    visible: true,
                    editable: false,
                    required: false,
                    value: v,
                    displayValue: '',
                    items: st.get('items'),
                    loading: false,
                }));
            }
            var result = this.virtualState.getIn([yigoid]);
            return result;
        }

        componentWillMount() {
            var grid = this.context.getContextComponent(gridId);
            if (grid && grid.isRowDataLoaded(this.props.rowIndex)) {
                this.setState({
                    loaded: true
                })
            }
        }

        componentDidMount() {
            var grid = this.context.getContextComponent(gridId);
            if (grid) {
                if (!grid.isRowDataLoaded(this.props.rowIndex)) {
                    grid.loadDetailRow(this.props.rowIndex);
                    this.setState({
                        loaded: true
                    })
                }
            }
        }

        onPress = () => {
            this.props.onPress && this.props.onPress(this.props.rowIndex);
        }

        render() {
            const { onPress, ...otherProps } = this.props;
            var list = this.context.getContextComponent(gridId);
            let checked = false;
            if(!list.selectFieldIndex>=0) {
                checked = list.getValueAt(this.props.rowIndex, list.selectFieldIndex);
            }
            if (this.state.loaded) {
                return <BaseComponent checked={checked} onPress={this.onPress} {...otherProps}></BaseComponent>
            }
            return <RefreshIndicator />
        }
    }
}