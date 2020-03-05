/*
 * @Author: gmf
 * @Date:   2016-12-01 15:35:33
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-08 17:16:11
 */

import React, { Component } from 'react';
import { YIUI } from 'yes-core';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Util from '../util';
/**
 * 用于包装TableViewRow类控件的行包裹，提供getComponent等方法，
 * 这样在ListView下的控件渲染可以和头控件的渲染方式保持一致
 * 表格的行数据，在初始状态下是保存在Document中的，需要显示的行才会触发数据加载
 * 当前不支持行数据之间存在依赖关系的情况
 * @param  {[type]} BaseComponent [description]
 * @return {[type]}               [description]
 */
export default (BaseComponent, RefreshIndicator) => {
    return class TableViewRowWrapComponent extends Component {
        static propTypes = {
            TableKey: PropTypes.string.isRequired,
            root: PropTypes.object.isRequired,
        }

        static contextTypes = {
            getBillForm: PropTypes.func,
        }

        static childContextTypes = {
            getContextComponent: PropTypes.func,
        }

        constructor(props) {
            super(props);
            this.layout = YIUI.create(this.props.root);
            this.compList = {};
            this.loadComp(this.layout);// 对所有的控件进行一次索引，便于之后直接调用
        }

        getChildContext() {
            return {
                getContextComponent: this.getComponent,
            };
        }

        loadComp(comp) {
            this.compList[comp.getMetaObj().key] = comp;
            if (comp.items) {
                comp.items.forEach(item => {
                    this.loadComp(item);
                });
            }
        }

        getComponent = (key) => {
            const comp = this.compList[key];
            const form = this.context.getBillForm();
            comp.ofFormID = form.form.formID;
            if (!comp.getMetaObj().enable) {
                comp.getMetaObj().enable = 'false';// 默认不可编辑
            }
            return comp;
        }

        virtualState = Immutable.fromJS({})

        state = {
            loaded: false,
        }

        onPress = (rowIndex) => { // 行点击事件
            const script = this.props.metaObj.RowClick;
            if (!script) {
                return;
            }
            const form = this.context.getBillForm();
            const document = form.form.getDocument();
            const table = document.getByKey(this.props.TableKey);
            table.setPos(rowIndex);
            Util.safeExec(async () => {
                await form.form.eval(script);
            });
        }
        /**
         * 从document中读取当前TableViewRow对应的表格的数据
         */
        getData() {
            const form = this.context.getBillForm();
            const document = form.form.getDocument();
            let tableKey = this.props.TableKey;
            if (this.props.RowType == 0) {
                tableKey = document.mainTableKey;
            }
            const table = document.getByKey(tableKey);
            let data = [];
            // TODO:这里可以优化
            for (let i = 0; i < table.getRowCount(); i++) {
                let row = {};
                table.setPos(i);
                for (var j = 0; j < table.cols.length; j++) {
                    const col = table.getCol(j);
                    row[col.key] = table.getByKey(col.key);
                }
                data.push(row);
            }
            const newDt = Immutable.fromJS(data);
            if (this.data) {
                this.data = this.data.mergeDeep(newDt);
            } else {
                this.data = newDt;
            }
            return this.data;
        }

        render() {
            const { onPress, ...otherProps } = this.props;
            const data = this.getData();
            // if (this.state.loaded) {
            return <BaseComponent data={data} onPress={this.onPress} {...otherProps} />;
            // }
            // return <RefreshIndicator />
        }
    };
};
