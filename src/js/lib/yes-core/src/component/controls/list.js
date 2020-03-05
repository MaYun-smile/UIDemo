/*
 * @Author: gmf
 * @Date:   2016-03-15 16:13:00
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 11:00:13
 */

import BaseControl from './control';
import Immutable from 'immutable';
import empty from 'empty';
import { regControlType, getTagName } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import { View } from '../../YIUI-parser';
// import { DataDef } from '../../YIUI-common';
// import { FilterMap, TableFilterDetail } from '../../filtermap';

YIUI.ListView = YIUI.extend(BaseControl, {
    handler: YIUI.ListViewHandler,
    async init(options) {
        this.base(options);
        this.columnInfo = this.metaObj.columnInfo;
        this.state = this.state.set('columnInfo', Immutable.fromJS(this.columnInfo));
        this.state = this.state.set('data', Immutable.fromJS(this.data));
        this.editors = {};
        this.activeRowIndex = -1;
        this._pagination = {
            hidePagination: empty.func,
            setTotalRowCount: empty.func,
        };
    },
    calculateDisplayValue: async function (v) {
        const promptImage = this.metaObj.promptImage;
        if (promptImage) {
            this.metaObj.promptImage = await YIUI.Base64ImageService.getBase64Image(promptImage, this.ofFormID);
        }
        return v
    },
    findIndex(colKey) {
        const cols = this.columnInfo;
        let index = -1;
        for (let i = 0, len = cols.length; i < len; i++) {
            if (cols[i].key === colKey) {
                index = i;
                break;
            }
        }
        return index;
    },
    diff(diffJson) {
        const listView = this;
        listView.totalRowCount = diffJson.totalRowCount || listView.totalRowCount;
        const columnInfo = diffJson.columnInfo;
        // let oldState = this.state;
        let state = null;
        if (diffJson.data) {
            state = this.state.set('data', Immutable.fromJS(diffJson.data));
        } else if (columnInfo) {
            state = this.state.mergeDeep('columnInfo', columnInfo);
            state = this.state.set('data', Immutable.fromJS(diffJson.data));
        }
        this.changeState(state);
    },
    clearDataRow() {
        // this.data = [];
        // this.state = this.state.set('data',Immutable.fromJS(this.data));
    },
    clearAllRows() {
        this.data = [];
        const state = this.state.set('data', Immutable.fromJS(this.data));
        this.changeState(state);
    },
    getValue(rowIndex, colIndex) {
        if (rowIndex == null) {
            return this.data;
        }
        const dbKey = this.columnInfo[colIndex].columnKey;
        return this.getValByKey(rowIndex, dbKey);
    },
    getValByKey(rowIndex, colKey) {
        const colCfg = this.getColumnConfig(colKey);
        return this.state.getIn(['data', rowIndex, colCfg.columnKey]);
    },
    //点击事件:长按,点击,焦点改变
    async rowClick(rowIndex, type = "onClick") {
        var form = YIUI.FormStack.getForm(this.ofFormID);
        var cxt = new View.Context(form);
        cxt.setRowIndex(rowIndex);
        let formula;
        if (type == "onClick") {
            formula = this.getMetaObj().rowClick;
        } else if (type == 'onLongClick') {
            formula = this.getMetaObj().rowDblClick;
        }
        let focusRowChangedScript = this.getMetaObj().focusRowChanged;
        let timer = 0
        if (focusRowChangedScript && this.activeRowIndex !== rowIndex) {
            timer = 2500;
            await form.eval(focusRowChangedScript, cxt, null);
        }
        if (formula) {
            setTimeout(async function () {
                await form.eval(formula, cxt, null);
            }, timer);//这个焦点切换弹框显示和点击弹框显示,做一个时间差
        }
        this.activeRowIndex = rowIndex;
    },
    //点击行后弹框,弹框后的点击操作
    async actionRow(action) {
        var form = YIUI.FormStack.getForm(this.ofFormID);
        var cxt = new View.Context(form);
        await form.eval(action, cxt, null);
    },

    setDisplayValueByKey(rowIndex, colKey, v) {
    },
    getDisplayValueByKey(rowIndex, colKey) {
        return '';
    },
    getRowCount() {
        this.state.get('data').size;
    },
    deleteRow(rowIndex) {
        // this.data.splice(rowIndex,1);
        const state = this.state.deleteIn(['data', rowIndex]);
        this.changeState(state);
    },
    addNewRow(row) {
        if (row) {

        }
        // 新增行，首先计算新增空白行的数据，这个数据需要缓存下来，
        this.data.push(row);
        const newRow = [];
        newRow.push(row);
        this.addDataRow(newRow);
    },
    getEmtpyRowData() {
        return this.emptyRowData || this.calculateEmptyData();
    },
    async calculateEmptyRowData() {
        this.emptyRowData = [];
        const form = YIUI.FormStack.getForm(this.ofFormID);
        for (let column in this.columnInfo) {
            let v = '';
            if (column.defaultValueFormula) {//设置了默认数值公式
                v = await form.evalFormulua(column.defaultValueFormulua);
            }
            if (column.defaultValue) {//设置了默认数值
                v = column.defaultValue;
            }
            this.emptyRowData.push(v);
        }
        return this.emptyRowData();
    },
    setColumnVisible(key, visible) {
        let editor = this.columnInfo.find((item) => {
            return item.key === key;
        });
        editor.visible = visible;
    },
    setColumnEnable(key, enable) {
        let editor = this.columnInfo.find((item) => {
            return item.key === key;
        });
        editor.enable = enable;
    },
    addDataRow(rows) {
        if (rows) {
            this.data = rows;
        }
        this.state = this.state.set('data', Immutable.fromJS(this.data));
    },
    resetData(data) {
        this.data = data;
        const state = this.state.set('data', Immutable.fromJS(this.data));
        this.changeState(state);
    },
    getColumnConfig(columnKey) {
        return this.columnInfo.find((item) => {
            return item.key === columnKey || item.columnKey === columnKey;
        });
    },
    /**
     * 获取所有列的控件
     */
    getAllColumnEditors() {
        this.columnInfo.forEach(item => {
            this.getColumnEditor(item.key);
        });
        return Object.values(this.editors);
    },
    getColumnEditor(columnKey) {
        if (!this.editors[columnKey]) {
            const editor = this.columnInfo.find((item) => {
                return item.key === columnKey || item.columnKey === columnKey;
            });
            if (!editor) return
            editor.tagName = getTagName(editor.columnType);
            editor.ofFormID = this.ofFormID;
            // editor.metaObj = editor;
            const cmp = YIUI.create(editor);
            this.editors[columnKey] = cmp;
        }
        return this.editors[columnKey];
    },
    getFocusRowIndex() {
        return this.activeRowIndex;
    },
    //数据库分页做的处理
    getRefreshData() {

    },
    createColumnHead: empty.func,
    _createHandles: empty.func,
    syncHandleWidths: empty.func,
});
YIUI.reg('listview', YIUI.ListView);
YIUI.reg('rotator', YIUI.ListView);
YIUI.reg('gallery', YIUI.ListView);
regControlType(YIUI.CONTROLTYPE.LISTVIEW, 'listview');
export default YIUI.ListView;
