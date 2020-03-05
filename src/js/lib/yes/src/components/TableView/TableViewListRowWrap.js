/* 
 * @Author: gmf
 * @Date:   2016-12-27 14:34:42
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-07 17:15:44
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import Immutable from "immutable";
/**
 * 用于包装ListView类控件的行包裹，提供getComponent等方法，
 * 这样在ListView下的控件渲染可以和头控件的渲染方式保持一致
 * @param  {[type]} BaseComponent [description]
 * @return {[type]}               [description]
 */
export default (BaseComponent, listId, path, isGroup) => {
    return class TableViewListRowWrapComponent extends Component {
        constructor() {
            super();
        }

        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
        }

        static childContextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onDisplayValueChange: PropTypes.func
        }

        getChildContext() {
            return {
                getContextComponent: (yigoid) => this.getContextComponent(yigoid),
                getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
                onDisplayValueChange: (yigoid, v) => this.onDisplayValueChange(yigoid, v)
            };
        }

        /**
         * 不允许修改,所以触发这个函数的只是获取单元格显示值得时候
         * @param  {[type]} yigoid [description]
         * @param  {[type]} v      [description]
         * @return {[type]}        [description]
         */
        onValueChange(yigoid, v) {
            var billForm = YESFormStore.getBillForm(this.context.formKey, this.context.oid);
            billForm.emit('cellvaluechange', this.context.gridId, this.context.gridRow, yigoid, v.value != null ? v.value : v);
        }

        onDisplayValueChange(yigoid, v) {
            var list = this.context.getContextComponent(listId);
            let cc = this.getContextComponent(yigoid);
            if (cc)
                list.changeData([...path, cc.metaObj.columnKey, 'displayValue'], v);
        }

        getContextComponent(yigoid) {
            var list = this.context.getContextComponent(listId);
            if (list) {
                return list.getColumnEditor(yigoid, isGroup);
            }
            return null;
        }

        getContextComponentState(yigoid) {
            var list = this.context.getContextComponent(listId);
            let data = list.state.get('data');
            let vv = data.getIn(path);
            let cc = this.getContextComponent(yigoid);
            if (!cc)
                return null;
            let v = vv.get(cc.metaObj.columnKey);
            if (this.virtualState.has(yigoid)) {
                this.virtualState = this.virtualState.mergeIn([yigoid], Immutable.Map({
                    value: v != null ? v.get('value') : '',
                    displayValue: v != null ? v.get('displayValue') : ''
                }));
            } else {
                this.virtualState = this.virtualState.setIn([yigoid], Immutable.Map({
                    value: v != null ? v.get('value') : '',
                    displayValue: v != null ? v.get('displayValue') : '',
                    'enable': false,
                    'visible': true,
                    'editable': false,
                    'required': false
                }));
            }
            var result = this.virtualState.getIn([yigoid]);
            return result;
        }

        render() {
            this.virtualState = Immutable.fromJS({});
            return <BaseComponent {...this.props}></BaseComponent>
        }
    }
}