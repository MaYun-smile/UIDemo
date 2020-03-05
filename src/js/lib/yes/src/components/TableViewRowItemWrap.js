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
 * 用于包装TableViewRow类控件的行包裹，提供getComponent等方法，
 * 这样在ListView下的控件渲染可以和头控件的渲染方式保持一致
 * 表格的行数据，在初始状态下是保存在Document中的，需要显示的行才会触发数据加载
 * 当前不支持行数据之间存在依赖关系的情况
 * @param  {[type]} BaseComponent [description]
 * @return {[type]}               [description]
 */
export default ( BaseComponent, RefreshIndicator ) => {
    return class TableViewRowItemWrapComponent extends Component {
        static propTypes = {
            TableKey:PropTypes.string.isRequired,
            rootYigoId:PropTypes.string,
            rowIndex: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            data:PropTypes.object,
        }

        static contextTypes = {
            getBillForm: PropTypes.func,
            getContextComponent: PropTypes.func,
        }

        static childContextTypes = {
            onControlClick: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
        } 

        getChildContext() {
            return {
                getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
                onControlClick: (yigoid) => this.onClick(yigoid),
                onValueChange: this.onValueChange,
            };
        }

        getContextComponentState(yigoid){
            const comp = this.context.getContextComponent(yigoid);
            let v = this.props.data.get(comp.getMetaObj().columnKey);
            let en = false;
            let visible = true;
            if (this.virtualState.get(yigoid)) {
                this.virtualState = this.virtualState.mergeIn([yigoid], Immutable.Map({
                    value: v,
                    enable: en,
                    visible
                }));
            } else {
                this.virtualState = this.virtualState.setIn([yigoid], Immutable.Map({
                    'enable': en,
                    'visible': visible,
                    'editable': false,
                    'required': false,
                    'value': v,
                    'displayValue': '',
                    'loading': false,
                }));
            }
            var result = this.virtualState.getIn([yigoid]);
            return result;
        }

        onClick=(yigoid)=>{
            const comp = this.context.getContextComponent(yigoid);
            if(comp){
                const form = this.context.getBillForm();
                const script = comp.clickContent || comp.getMetaObj().onClick;
                if(script){
                    const document = form.form.getDocument();
                    const table = document.getByKey(this.props.TableKey);
                    table.setPos(this.props.rowIndex);
                    form.eval(script);
                }else{
                    this.props.onPress(this.props.rowIndex);
                }
            }else{
                console.log(`missing component ${key}`);
            }
        }

        onValueChange = (yigoid,v)=>{
            const comp = this.context.getContextComponent(yigoid);
            if(comp){
                const form = this.context.getBillForm();
                const script = comp.clickContent || comp.getMetaObj().onClick;
                const document = form.form.getDocument();
                const table = document.getByKey(this.props.TableKey);
                table.setPos(this.props.rowIndex);
                dataTable.setByKey(yigoid, v);
            }else{
                console.log(`missing component ${key}`);
            }
        }

        virtualState = Immutable.fromJS({})

        state = {
            loaded: false
        }

        render() {
            // if (this.state.loaded) {
                return <BaseComponent {...this.props}></BaseComponent>
            // }
            // return <RefreshIndicator />
        }
    }
}