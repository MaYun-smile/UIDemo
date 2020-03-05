/*
 * @Author: zjy
 * @Date:   2016-08-01 09:03:12
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 14:45:49
 */

import React from 'react';
import EventEmitter from 'eventemitter3';
import Immutable from 'immutable';
import { YIUI } from '../yes';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { StopEvent as stopEvent, EnableEvent as enableEvent } from '../actions/AppStatusAction';
import Util from '../util';

class YESBillFormWrap extends EventEmitter {
    constructor(form) {
        super();
        this.form = form;
        this.on('changed', this.onValueChange, this);
        this.on('displayChanged', this.onDisplayValueChagne, this);
        this.on('click', this.onClick, this);
        this.on('script', this.onScript, this);
        this.on('cellvaluechange', this.onCellValueChange, this);
        this.on('cellClick', this.onCellClick, this);
    }

    getComponent(key) {
        return this.form.getComponent(key);
    }

    getCellState(gridId, row, columnKey) {
        var grid = this.getComponent(gridId);
        var cellEnable = grid.isCellEnable(row, columnKey);
        var value = grid.getValueByKey(row, columnKey);
        var displayValue = grid.getDisplayValueByKey(row, columnKey);
        var state = Immutable.fromJS({
            visible: true,
            editable: cellEnable,
            enable: cellEnable,
            value,
            displayValue,
            required: false,
        });
        return state;
    }

    transformGridEditor(gridEditor) {
        let result = gridEditor.toLowerCase();
        return result;
    }

    getCellComponent(gridId, row, columnKey) {
        var grid = this.form.getComponent(gridId);
        var editor;
        if (grid) {
            editor = grid.getCellEditor(columnKey);
        }
        if (editor) {
            const ed = editor.toJS();
            var result = ed.editOptions;
            result.ofFormID = this.form.formID;
            result.key = columnKey;
            result.tagName = this.transformGridEditor(ed.edittype);
            return YIUI.create(result);
        }
        return null;
    }

    getComponentState(key) {
        const comp = this.getComponent(key);
        if (comp) {
            return comp.getState();
        }
        return null;
    }

    async onValueChange(key, v) {
        var comp = this.getComponent(key);
        if (!comp)
            return;
        // var text = v.label != null ? v.label : v;
        var value = v.value != null ? v.value : v;
        // comp.setText(text);
        // let state = comp.getState();
        await comp.setValue(value, true, true);
        // if (!Immutable.is(comp.getState(), state))
        //     this.form.doValueChanged(comp, value, true, true);
    }

    onDisplayValueChagne(key, v) {
        var comp = this.getComponent(key);
        if (!comp)
            return;
        comp.setText(v);
    }

    onCellValueChange(gridId, row, columnKey, v) {
        var grid = this.form.getComponent(gridId);
        if (!grid)
            return;
        grid.setValueByKey(row, columnKey, v, true, true);
    }

    onClick(key, action) {
        const comp = this.getComponent(key);
        if (!comp) {
            return;
        }
        if (!comp.isEnable()) {
            return;
        }
        if (action) {
            comp.clickContent = action;
        }
        Util.safeExec(async () => {
            await comp.doOnClick(comp);
        });
    }

    async onScript(script) {
        await this.form.eval(script);
    }

    onCellClick(gridId, rowIndex) {
        var grid = this.form.getComponent(gridId);
        if (!grid)
            return;
        grid.handler.doOnRowDblClick(grid, rowIndex);
    }

    static translateStatus = (status) => {
        status = status || 'EDIT';
        let operationState = YIUI.Form_OperationState.Default;
        switch (status) {
            case 'EDIT':
                operationState = YIUI.Form_OperationState.Edit;
                break;
            case 'NEW':
                operationState = YIUI.Form_OperationState.New;
                break;
            case 'DELETE':
                operationState = YIUI.Form_OperationState.Delete;
                break;
            default:
        }
        return operationState;
    }

    isBillThisStatus(status) {
        const operationState = YESBillFormWrap.translateStatus(status);
        return this.form.getOperationState() === operationState;
    }

    setBillStatus(status) {
        const operationState = YESBillFormWrap.translateStatus(status);
        if (this.form.getOperationState() === operationState) {
            return;
        }
        this.form.setInitOperationState(operationState);
        //设置操作状态
        this.form.setOperationState(operationState);
        //重置界面状态
        AppDispatcher.dispatch(stopEvent());
        this.form.resetUIStatus(true);
        AppDispatcher.dispatch(enableEvent());
    }
}
export default YESBillFormWrap;
