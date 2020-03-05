/* 
 * @Author: gmf
 * @Date:   2016-12-01 15:35:33
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-08 17:16:11
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
export default (BaseComponent, listId) => {
    return class ListRowWrapComponent extends Component {
        constructor() {
            super();
            this.virtualState = Immutable.fromJS({});
        }
        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
        }

        static childContextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onDisplayValueChange: PropTypes.func,
            onClick: PropTypes.func,
        }

        getChildContext() {
            return {
                getContextComponent: (yigoid) => this.getContextComponent(yigoid),
                getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
                onDisplayValueChange: (yigoid) => this.onDisplayValueChange(yigoid),
                onClick: (yigoid) => this.onClick(yigoid),
            };
        }

        onClick(yigoid) {
            //::TODO:
            var comp = this.getContextComponent(yigoid);
            console.log(comp);
        }

        onValueChange(yigoid) {

        }

        onDisplayValueChange(yigoid, v) {
            // //list.data[rowIndex][yigoid].caption = v;
            // this.virtualState = this.virtualState.mergeIn([yigoid], Immutable.Map({
            //     displayValue: v
            // }));
            // list.setDisplayValueByKey(rowIndex, yigoid, v);
        }

        getContextComponent(yigoid) {
            var list = this.context.getContextComponent(listId);
            if (list) {
                return list.getColumnEditor(yigoid);
            }
            return null;
        }

        getContextComponentState(yigoid) {
            var list = this.context.getContextComponent(listId);
            var v = list.getValByKey(this.props.rowIndex, yigoid);
            let dv = list.getDisplayValueByKey(this.props.rowIndex, yigoid);
            if (this.virtualState.get(yigoid)) {
                this.virtualState = this.virtualState.mergeIn([yigoid], Immutable.Map({
                    value: v,
                    displayValue: dv
                }));
            } else {
                this.virtualState = this.virtualState.setIn([yigoid], Immutable.Map({
                    'enable': false,
                    'visible': true,
                    'editable': false,
                    'required': false,
                    'value': v,
                    'displayValue': dv,
                    'loading': false,
                }));
            }
            var result = this.virtualState.getIn([yigoid]);
            return result;
        }

        render() {
            return <BaseComponent {...this.props}></BaseComponent>
        }
    }
}
