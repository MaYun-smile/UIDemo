/* 
 * @Author: gmf
 * @Date:   2016-03-18 10:56:15
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-07 17:31:40
 */



import BaseControl from "./control";
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import { View } from '../../YIUI-parser';
import Immutable from "immutable";
import { regControlType, getTagName } from './controlUtil';
import { lodash as $ } from 'yes-common';
import GridHandler from "./gridhandler";
import empty from 'empty';

YIUI.Grid = YIUI.extend(BaseControl, {
    groupHeaders: [],//多重表头
    pageInfo: null,//分页信息
    errorInfoes: { rows: [], cells: [] },//带错误标识的单元格
    hasRowClick: false,    //是否有行点击事件
    hasRowChange: false, // 是否有行焦点变化事件
    hasRowDblClick: false, //是否有行双击事件
    gridHandler: GridHandler,
    rowIDMask: 0,
    randID: function () {
        return this.rowIDMask++;
    },
    init: function (options) {
        this.base(options);
        this.orgMetaObj = options.metaObj;
        if (!this.dataModel) {
            this.dataModel = {
                data: [],
                colModel: [],
                rowMap: {},
                expandModel: [],
            };
            this.buildColModel();
        }
        if (this.dataModel.data.isFirstShow) {
            this.rowIDMap = this.dataModel.data.rowIDMap;
            this.dataModel.data = this.dataModel.data.addRowArray;
            this.initRowDatas();
        }
        this.editors = {};
        this.activeRowIndex = -1;
        this.state = this.state.set('dataModel', Immutable.fromJS(this.dataModel));
    },
    initLeafColumns: function () {
        var getLeafColumns = function (_columns) {
            for (var i = 0, column; column = _columns[i]; i++) {
                if (column.columns != null && column.columns.length > 0) {
                    getLeafColumns(column.columns, leafColumns);
                } else {
                    leafColumns.push(column);
                }
            }
        }

        var leafColumns = [];

        var columns = this.getMetaObj().columns;

        getLeafColumns(columns);

        this.metaObj.leafColumns = leafColumns;
    },

    initDataModel: function () {
        var columns = [], column;
        var leafColumns = this.getMetaObj().leafColumns;
        for (var i = 0, metaColumn; metaColumn = leafColumns[i]; i++) {
            column = {};
            column.key = metaColumn.key;
            column.label = metaColumn.caption;
            column.formulaCaption = metaColumn.formulaCaption;
            column.name = "column" + i;
            column.index = i;
            column.parentKey = metaColumn.parentKey;
            column.width = metaColumn.width;
            column.hidden = false;
            column.sortable = metaColumn.sortable;
            column.visible = metaColumn.visible;
            column.columnType = metaColumn.columnType;
            columns.push(column);
        }

        this.dataModel.colModel.columns = columns;
        this.state = this.state.setIn(['dataModel', 'colModel', 'columns'], Immutable.fromJS(columns));
    },
    buildColModel() {
        this.dataModel.colModel = {
            cells: {},
            columns: [],
        };
        this.buildColumns();
        this.buildCells();
    },
    buildCells() {
        const detailRow = this.getDetailRow();
        detailRow.cells.forEach((row) => {
            this.dataModel.colModel.cells[row.key] = row;
        });
    },
    buildColumns() {
        this.metaObj.columns.forEach((column) => this.buildColumn(column));
    },
    buildColumn(col) {
        if (col.columns) {
            col.columns.forEach((column) => this.buildColumn(column));
        }
        this.dataModel.colModel.columns.push(col);
    },
    initRowDatas: function () {
        var len = this.dataModel.data.length, row;
        for (var i = 0; i < len; i++) {
            row = this.dataModel.data[i];
            this.initOneRow(row);
        }
    },
    initOneRow: function (row) {
        if (row.rowID == undefined) {
            row.rowID = this.randID();
        }
        if (row.rowType == undefined) {
            row.rowType = "Detail";
            if (row.metaRowIndex == undefined || row.metaRowIndex == -1) {
                row.metaRowIndex = this.metaRowInfo.dtlRowIndex;
            }
        }
        row.isDetail = (row.rowType == "Detail");
        row.isEditable = (row.rowType == "Fix" || row.rowType == "Detail");
        row.cellKeys = this.metaRowInfo.rows[row.metaRowIndex].cellKeys;
        row.rowHeight = this.metaRowInfo.rows[row.metaRowIndex].rowHeight;
        if (this.hasColExpand && row.isDetail && row.cellBkmks == undefined) {
            row.cellBkmks = []
        }
    },
    setRowBookmark: function (rowIndex, bkmk) {
        console.log('setRowBookmark');
        this.state = this.state.setIn(['dataModel', 'data', rowIndex, 'bookmark'], bkmk);
    },
    getFocusRowIndex: function () {
        return this.activeRowIndex;
    },
    setFocusRowIndex: function (rowIndex) {
        this.activeRowIndex = rowIndex;
    },
    setGridEnable: function (enable) {
        this.setEnable(enable);
        // 在设置为Enable=true的时候不再主动新增行
        // if (enable && this.treeType === -1 && !this.hasRowExpand && this.metaRowInfo.dtlRowIndex != -1) {
        //     if (!this.isSubDetail && this.newEmptyRow) {
        //         if (this.hasGroupRow) {
        //             //this.appendAutoRowAndGroup();
        //             console('group not supported!');
        //         } else {
        //             this.addGridRow();
        //         }
        //     }
        // }
    },
    clearGridData: function () {
        this.state = this.state.setIn(['dataModel', 'data'], Immutable.fromJS([]));
    },
    findRowIndex: function (fn) {
        var data = this.state.getIn(['dataModel', 'data']);
        return data.findIndex(fn);
    },
    getCellNeedValue: async function (rowIndex, colIndex, value, isData, rowData) {
        return [value, null];
        // var options, editor, opt, self = this,
        //     row = rowData || this.getRowDataAt(rowIndex),
        //     cellKey = this.getCellKey(rowIndex, colIndex),
        //     editOpt = this.getCellEditor(cellKey), caption = value,
        //     rowID = (rowIndex >= this.getRowCount() ? -1 : row.rowID),
        //     form = YIUI.FormStack.getForm(this.ofFormID);
        // // if (value instanceof Decimal) {
        // //     caption = value.toString();
        // // }
        // if (editOpt == undefined) return [value, caption];
        // var editorOptions = editOpt.get('editOptions').toJS();
        // switch (editOpt.get('edittype')) {
        //     case "numberEditor":
        //     case "textButton":
        //     case "textEditor":
        //         return [value, caption];
        //     case "comboBox":
        //         if (value == null || value.length == 0 || value === undefined) {
        //             return [null, ""];
        //         }
        //         try {
        //             var items = await UIHandler.getComboboxItems(editorOptions);
        //             var realValue = "", realCaption = "";
        //             for (let item of items) {
        //                 if (editorOptions.type === "combobox") {
        //                     if (isData ? ( item.value.toString().indexOf(value) !== -1) : (item.caption.indexOf(value) !== -1 )) {
        //                         realValue = item.value;
        //                         realCaption = item.caption;
        //                         break;
        //                     }
        //                 } else {
        //                     if (isData ? (value.toString().indexOf(item.value) !== -1) : (value.toString().indexOf(item.caption) !== -1)) {
        //                         realValue += item.value + ",";
        //                         realCaption += item.caption + ",";
        //                     }
        //                 }
        //             }
        //             if (realValue.endsWith(',')) {
        //                 realValue = realValue.substr(0, realValue.length - 1);
        //                 realCaption = realCaption.substr(0, realCaption.length - 1);
        //             }
        //             value = realValue;
        //             caption = realCaption;
        //         } catch (ex) {
        //             console.log(ex);
        //         }
        //         break;
        //     case "dict":
        //         if (value == null || value.length == 0 || value === undefined) {
        //             return [null, ""];
        //         }
        //         if (typeof(value) == 'object') {
        //             value = value;
        //             caption = value.caption;
        //         }
        //         if (typeof(value) == "number") {
        //             var result = await UIHandler.getItem(editorOptions.itemKey, value, true);
        //             value = result;
        //             caption = value.caption;
        //         }
        //         break;
        //     case "datePicker":
        //         if (value == null || value.length == 0 || value === undefined) {
        //             return [null, ""];
        //         }
        //         var date, formatStr, dateStr;
        //         if (isData) {
        //             if ($.isNumeric(value)) {
        //                 date = new Date(parseFloat(value));
        //             } else if ($.isString(value)) {
        //                 dateStr = value.split(" ");
        //                 if (dateStr.length == 1) {
        //                     value = value + " 00:00:00";
        //                 }
        //                 date = new Date(Date.parse(value.replace(/-/g, "/")));
        //             } else if (value instanceof Date) {
        //                 date = value;
        //             }
        //         } else {
        //             dateStr = value.split(" ");
        //             if (dateStr.length == 1) {
        //                 value = value + " 00:00:00";
        //             }
        //             date = new Date(Date.parse(value.replace(/-/g, "/")));
        //         }
        //         value = date.getTime();
        //         formatStr = options.formatStr;
        //         caption = self.gridHandler.formatDate(date, formatStr);
        //         break;
        //     case "checkBox":
        //         if (value == null || value.length == 0 || value === undefined) {
        //             return [false, "false"];
        //         }
        //         break;
        //     default:
        //         if (value == null || value.length == 0 || value === undefined) {
        //             return [null, ""];
        //         }
        // }
        // return [value, caption];
    },
    insertRow(rowIndex, rowData) {
        this.state = this.state.updateIn(['dataModel', 'data'], (data) => data.insert(rowIndex, Immutable.fromJS(rowData)));
    },
    appendRow(rowData) {
        this.state = this.state.updateIn(['dataModel', 'data'], (data) => data.push(Immutable.fromJS(rowData)));
    },
    getRowCount: function () {
        return this.state.getIn(['dataModel', 'data']).size;
    },
    getCellKey: function (row, col) {
        if (col != null) {
            return this.state.getIn(['dataModel', 'data', row, 'cellKeys', col]);
        }
        const dtlRow = this.getDetailRow();
        return dtlRow.cellKeys[row];
    },
    getCellEditor: function (cellKey) {
        return this.state.getIn(['dataModel', 'colModel', 'cells', cellKey]);
    },
    getColumnCount: function () {
        return this.state.getIn(['dataModel', 'colModel', 'cells']).size;
    },
    isRowDataLoaded(rowIndex) {
        if (rowIndex > this.getRowCount()) {
            return;
        }
        return !this.state.getIn(['dataModel', 'data', rowIndex, 'unloaded']);
    },
    /**
     * 新增表格行
     * @param rowData 行数据对象
     * @param rowIndex 行数据对象在表格数据对象中的序号
     * @param isNewGroup 是否为新分组中的明细
     */
    addGridRow: async function (rowData, rowIndex, isNewGroup) {
        var data = this.dataModel.data, dataLength = this.getRowCount(),
            form = YIUI.FormStack.getForm(this.ofFormID), isNewData = false,
            dtrRowIndex = this.getMetaObj().detailMetaRowIndex,
            dtlMetaRow = this.getDetailRow();
        if (!rowData) {
            rowData = {};
            rowData.isDetail = true;
            rowData.isEditable = true;
            rowData.rowHeight = dtlMetaRow.rowHeight;
            rowData.rowID = this.randID();
            rowData.metaRowIndex = dtrRowIndex;
            rowData.rowType = "Detail";
            rowData.cellKeys = dtlMetaRow.cellKeys;
            rowData.data = [];
            rowData.cellBkmks = [];
            rowData.rowGroupLevel = dtlMetaRow.rowGroupLevel;
            isNewData = true;
        }
        rowIndex = parseInt(rowIndex, 10);
        if (isNaN(rowIndex) || rowIndex < 0 || (rowIndex >= dataLength && !isNewGroup)) {
            rowIndex = -1;
        }
        if (rowIndex == -1) {
            var rd, lastDetailRow;
            for (var ri = dataLength - 1; ri >= 0; ri--) {
                rd = this.getRowDataAt(ri);
                if (rd.isDetail) {
                    lastDetailRow = ri;
                    break;
                }
            }
            if (dataLength == 0) {
                rowData.insertRowID = -1;
                rowIndex = 0;
            } else {
                if (lastDetailRow == undefined) {
                    let dtrRow = this.getRowDataAt(dtrRowIndex - 1);
                    rowData.insertRowID = (!dtrRow ? -1 : dtrRow.rowID);
                    rowIndex = dtrRowIndex;
                } else {
                    let dtrRow = this.getRowDataAt(lastDetailRow);
                    rowData.insertRowID = dtrRow.rowID;
                    rowIndex = lastDetailRow + 1;
                }
            }
        }
        if (isNewData) {
            for (var i = 0, len = this.getColumnCount(); i < len; i++) {
                let value = null;
                var cm = this.getColumnConfig(i)/*this.dataModel.colModel.columns[i]*/,
                    cellKey = this.getCellKey(rowIndex, i),
                    editOpt = this.getCellEditor(cellKey),
                    defaultFV = dtlMetaRow.cells[i].defaultFormulaValue,
                    defaultV = dtlMetaRow.cells[i].defaultValue;
                if (cm.get('name') == "rowID") continue;
                if (editOpt !== undefined && editOpt.tableKey == undefined && editOpt.columnKey == undefined
                    && (editOpt.get('edittype') == "label" || editOpt.get('edittype') == "button" || editOpt.get('edittype') == "hyperLink")) {
                    value = dtlMetaRow.cells[i].caption;
                }
                if (defaultFV !== undefined && defaultFV !== null && defaultFV.length > 0) {
                    value = await form.eval(defaultFV, { form: form, rowIndex: rowIndex }, null);
                }
                if (defaultV !== undefined && defaultV !== null && defaultV.length > 0) {
                    value = defaultV;
                }
                //value = await this.getCellNeedValue(rowIndex, i, value, true, rowData);
                //value.push(true);
                rowData.data[i] = [value, '', true];
            }
        }
        let newState = null;
        let newRowIndex = rowIndex;
        rowData.rowIndex = rowIndex;
        if (rowIndex == -1) {
            newRowIndex = this.getRowCount();
            rowData.rowIndex = newRowIndex;
            newState = this.state.updateIn(['dataModel', 'data'], (data) => data.push(Immutable.fromJS(rowData)));
        } else {
            newState = this.state.updateIn(['dataModel', 'data'], (data) => data.insert(rowIndex, Immutable.fromJS(rowData)));
        }
        // this.refreshErrors(rowIndex, false);
        this.changeState(newState);
        await form.getUIProcess().doPostInsertRow(this, rowIndex, true);
        // AppDispatcher.dispatch(PostChange());
        return rowData;
    },
    deleteGridRow: async function (rowIndex) {
        const bkmk = this.getRowBkmk(rowIndex);
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const dataTable = form.getDocument().getByKey(this.tableKey);
        const newState = this.state.removeIn(['dataModel', 'data', rowIndex]);
        this.changeState(newState);
        if (dataTable) {
            dataTable.setByBkmk(bkmk);
            dataTable.delRow();
        }
        await form.getUIProcess().doPostDeleteRow(this);
        var metaObj = this.getMetaObj();
        if (metaObj.rowDelete) {
            const cxt = new View.Context(form);
            await form.eval(metaObj.rowDelete, cxt, null);
        }
    },
    refreshErrors: function (rowIndex, isDelete) {
        var grid = this, eCell, eRow;
        for (var i = grid.errorInfoes.cells.length - 1; i >= 0; i--) {
            eCell = grid.errorInfoes.cells[i];
            if (eCell.rowIndex >= rowIndex) {
                if (isDelete && eCell.rowIndex == rowIndex) {
                    grid.errorInfoes.cells.splice(i, 1);
                } else {
                    eCell.rowIndex = (isDelete ? eCell.rowIndex - 1 : eCell.rowIndex + 1);
                }
            }
        }
        for (var j = grid.errorInfoes.rows.length - 1; j >= 0; j--) {
            eRow = grid.errorInfoes.rows[j];
            if (eRow.rowIndex >= rowIndex) {
                if (isDelete && eRow.rowIndex == rowIndex) {
                    grid.errorInfoes.rows.splice(j, 1);
                } else {
                    eRow.rowIndex = (isDelete ? eRow.rowIndex - 1 : eRow.rowIndex + 1);
                }
            }
        }
    },
    setGridErrorCells: function (cells) {
        //this.el.setErrorCells(cells);
    },
    setGridErrorRows: function (rows) {
        //this.el.setErrorRows(rows);
    },
    /**
     * 并不支持fixrow
     */
    getFixRowInfoByCellKey: function (key) {
        // var getFixInfoes = function (grid, rowData, cellKey) {
        //     var cKey , cEditOpt, isMatch = false, cellInfoes = [], column;
        //     for (var j = 0, clen = grid.dataModel.colModel.columns.length; j < clen; j++) {
        //         cKey = rowData.cellKeys[j];
        //         if (cKey == cellKey) {
        //             column = grid.dataModel.colModel.columns[j];
        //             cEditOpt = grid.dataModel.colModel.cells[cellKey];
        //             if (grid.hasColExpand) {
        //                 cellInfoes.push({rowIndex: i, colIndex: j, col: column, cell: cEditOpt});
        //                 isMatch = true;
        //             } else {
        //                 return [
        //                     {rowIndex: i, colIndex: j, col: column, cell: cEditOpt}
        //                 ];
        //             }
        //         } else if (grid.hasColExpand && isMatch) {
        //             return cellInfoes;
        //         }
        //     }
        //     return null;
        // };
        // var rowData, result;
        // for (var i = 0, rlen = this.dataModel.data.length; i < rlen; i++) {
        //     rowData = this.dataModel.data[i];
        //     if (rowData.rowType == "Fix" || rowData.rowType == "Total") {
        //         result = getFixInfoes(this, rowData, key);
        //         if (result !== null) {
        //             return result;
        //         }
        //     } else if (rowData.rowType == "Detail" || rowData.rowType == "Group") {
        //         break;
        //     }
        // }
        // for (var m = this.dataModel.data.length - 1; m >= 0; m--) {
        //     rowData = this.dataModel.data[m];
        //     if (rowData.rowType == "Fix" || rowData.rowType == "Total") {
        //         result = getFixInfoes(this, rowData, key);
        //         if (result !== null) {
        //             return result;
        //         }
        //     } else if (rowData.rowType == "Detail" || rowData.rowType == "Group") {
        //         break;
        //     }
        // }
        return null;
    },
    getCellIndexByKey: function (colKey) {
        const detailRow = this.getDetailRow();
        if (detailRow) {
            return detailRow.cellKeys.indexOf(colKey);
        }
        return -1;
        // return this.getColumnIndex(colKey);
    },
    reShowCheckColumn: empty.func,
    getColInfoByKey: function (key) {
        var cell = this.getColumnCellConfig(key);
        if (cell == null || cell == undefined) return null;
        if (this.hasColExpand) {
            console.log('colexpand not supported!');
        } else {
            // var c = cell.toJS();
            // var ci = c.colIndex;
            var ci = this.getCellIndexByKey(key);
            var column = this.getColumnConfigByKey(key);
            return [
                { col: column ? column.toJS() : null, cell: cell, colIndex: ci }
            ];
        }
    },
    initEmptyData(rowCount) {
        this.rowCount = rowCount;
        let emtpyData = Array(rowCount).fill({
            unloaded: true
        });
        this.state = this.state.setIn(['dataModel', 'data'], Immutable.fromJS(emtpyData));
    },
    getColumnConfig: function (index) {
        const cellKey = this.getCellKey(index);
        return this.getColumnConfigByKey(cellKey);
        // return this.state.getIn(['dataModel', 'colModel', 'columns', index]);
    },
    getColumnConfigByKey: function (key) {
        const columns = this.state.getIn(['dataModel', 'colModel', 'columns']);
        return columns.find((item) => item.get('key') === key);
    },
    getColumnCellConfig: function (key) {
        return this.state.getIn(['dataModel', 'colModel', 'cells', key]);
    },
    colInfoMap: {},
    /**
     * 根据rowID获得表格行数据的序号
     * @param rowID   表格行数据的标识
     * @returns {number} 表格数据行序号
     */
    getRowIndexByID: function (rowID) {
        var result = this.state.getIn(['dataModel', 'data']).findEntry((item) => item.get('rowID') == rowID);
        if (result)
            return result[0];
        return -1;
    },
    getRowDataByID: function (rowID) {
        // for (var i = 0, len = this.dataModel.data.length; i < len; i++) {
        //     var row = this.dataModel.data[i];
        //     if (row.rowID === rowID) return  row;
        // }
        // return null;
        var result = this.state.getIn(['dataModel', 'data']).find((item) => item.get('rowID') == rowID);
        if (result)
            return result.toJS();
        return null;
    },
    getRowType: function (rowIndex) {
        return this.state.getIn(['dataModel', 'data', rowIndex, 'rowType']);
    },
    isEmptyRow: function (rowIndex) {
        var rowData = this.state.getIn(['dataModel', 'data', rowIndex]);
        if (rowData) {
            return rowData.get('rowType') === 'Detail' ? (rowData.get('bookmark') == null && rowData.get('bkmkRow') == null) : false;
        }
        return false;
    },
    getRowBookmark: function(rowIndex) {
        const result =this.state.getIn(['dataModel', 'data', rowIndex, 'bookmark']);
        if(result) {
            return result.toJS();
        }
        return null;
    },
    isRowDetail: function (rowIndex) {
        return this.state.getIn(['dataModel', 'data', rowIndex, 'isDetail']);
    },
    getRowDataAt: function (rowIndex) {
        var result = this.state.getIn(['dataModel', 'data', rowIndex]);
        if (result)
            return result.toJS();
        return null;
    },
    setColumnEnable: function (colIndex, enable) {
        this.state = this.state.setIn(['dataModel', 'colModel', 'columns', colIndex, 'editable'], enable);
    },
    isCellEnable: function (rowIndex, cellKey) {
        const defaultV = this.state.get('enable');
        let colindex = cellKey;
        if (typeof cellKey === 'string') {
            var colInfoes = this.colInfoMap[cellKey];
            if (colInfoes == undefined) {
                colInfoes = this.getColInfoByKey(cellKey);
                if (colInfoes !== null) {
                    this.colInfoMap[cellKey] = colInfoes;
                }
            }

            if (colInfoes == null || colInfoes.length <= 0) return;
            colindex = colInfoes[0].colIndex;
        }
        let result = this.state.getIn(['dataModel', 'data', rowIndex, 'data', colindex, 2]);
        result = (result == null ? defaultV : result);
        return result;
    },
    setCellEnable: function (rowIndex, cellKey, enable) {
        var// rd = this.dataModel.data[rowIndex], gridRow,
            colInfoes = this.colInfoMap[cellKey];
        let colindex = cellKey;
        if (typeof cellKey === 'string') {
            if (colInfoes == undefined) {
                colInfoes = this.getColInfoByKey(cellKey);
                if (colInfoes !== null) {
                    this.colInfoMap[cellKey] = colInfoes;
                }
            }

            if (colInfoes == null) return;
            for (var i = 0, len = colInfoes.length; i < len; i++) {
                var colIndex = colInfoes[i].colIndex;
                this.state = this.state.setIn(['dataModel', 'data', rowIndex, 'data', colIndex, 2], enable);
                //rd.data[colIndex][2] = enable;
            }
        } else {
            this.state = this.state.setIn(['dataModel', 'data', rowIndex, 'data', colindex, 2], enable);
        }
    },
    /**
     * 不支持这个函数
     * @param {[type]} colKey  [description]
     * @param {[type]} visible [description]
     */
    setColumnVisible: function (colIndex, visible) {
        const cellKey = this.getCellKey(colIndex);
        const columnIndex = this.getColumnIndex(cellKey);
        this.state = this.state.setIn(['dataModel', 'colModel', 'columns', columnIndex, 'hidden'], !visible);
        // 
        // console.log('setColumnVisible');
        // var ci, clen, colM, gridCM, gridCi, hidden, isChange = false, isMatch = false, columnKey;
        // visible = YIUI.TypeConvertor.toBoolean(visible);
        // for (ci = 0, clen = this.dataModel.colModel.columns.length; ci < clen; ci++) {
        //     colM = this.dataModel.colModel.columns[ci];
        //     columnKey = colM.key;
        //     if (colM.isExpandCol && colM.refColumn) {
        //         columnKey = colM.refColumn;
        //     }
        //     if (columnKey === colKey) {
        //         hidden = (visible == null ? false : !visible);
        //         isChange = (colM.hidden !== hidden);
        //         colM.hidden = hidden;
        //         isMatch = true;
        //         if (!this.hasColExpand) {
        //             break;
        //         }
        //     } else if (this.hasColExpand && isMatch) {
        //         break;
        //     }
        // }
        // if (isChange) {

        // }
    },
    getVisibleColumns: function () {
        const result = [];
        for (let col = 0; col < this.getColumnCount(); col++) {
            const colCfg = this.getColumnConfig(col);
            if (!colCfg.get('hidden')) {
                const cellCfg = this.getColumnCellConfig(colCfg.get('key'));
                if (cellCfg) {
                    result.push({
                        key: colCfg.get('key'),
                        caption: colCfg.get('caption'),
                        type: cellCfg.getIn(['editOptions', 'cellType']),
                        isSelect: cellCfg.getIn(['isSelect']),
                    });
                }
            }
        }
        return result;
    },
    setValueByKey: async function (rowIndex, colKey, newValue, commitValue, fireEvent) {
        var colInfoes = this.getColInfoByKey(colKey);
        for (var i = 0, len = colInfoes.length; i < len; i++) {
            await this.setValueAt(rowIndex, colInfoes[i].colIndex, newValue, commitValue, fireEvent, true);
        }
    },
    setValueAt: async function (rowIndex, colIndex, newValue, commitValue, fireEvent, render = true) {
        if (rowIndex == undefined || rowIndex < 0 || rowIndex > this.getRowCount()) return;
        //var dt = await this.getCellNeedValue(rowIndex, colIndex, newValue, isData);
        const state = this.state.setIn(['dataModel', 'data', rowIndex, 'data', colIndex, 0], newValue);
        this.changeState(state, render);
        //this.state = this.state.setIn(['dataModel', 'data', rowIndex, 'data', colIndex, 1], dt[1]);
        const cellKey = this.getCellKey(rowIndex, colIndex);
        if (commitValue) {
            var form = YIUI.FormStack.getForm(this.ofFormID);
            this.gridHandler.setCellValueToDocument(form, this, rowIndex, colIndex, newValue);
            await form.getViewDataMonitor().preFireCellValueChanged(this, rowIndex, colIndex, cellKey);
            if (fireEvent) {
                await this.gridHandler.fireCellChangeEvent(form, this, rowIndex, colIndex);
            }
            await this.gridHandler.doPostCellChangeEvent(form, this, rowIndex, colIndex);
        }
        // AppDispatcher.dispatch(PostChange());
    },
    getColumnIndex: function (key) {
        const columns = this.state.getIn(['dataModel', 'colModel', 'columns']);
        return columns.findIndex((item) => item.get('key') === key);
        // const detailRow = this.getDetailRow();
        // if (detailRow) {
        //     return detailRow.cellKeys.indexOf(key);
        // }
        // return -1;
        // return this.getCellIndexByKey(key);
    },
    getValueByKey: function (rowIndex, colKey) {
        // var colIndex = this.getColInfoByKey(colKey)[0].colIndex;
        const colIndex = this.getCellIndexByKey(colKey);
        return this.getValueAt(rowIndex, colIndex);
    },
    setCellError: function () {

    },
    getValueAt: function (rowIndex, colIndex) {
        return this.state.getIn(['dataModel', 'data', rowIndex, 'data', colIndex, 0]);
    },
    getDisplayValueByKey: function (rowIndex, colKey) {
        var colIndex = this.getColInfoByKey(colKey)[0].colIndex;
        return this.getDisplayValueAt(rowIndex, colIndex);
    },
    getDisplayValueAt: function (rowIndex, colIndex) {
        return this.state.getIn(['dataModel', 'data', rowIndex, 'data', colIndex, 1]);
    },
    showSubDetailData: function () {

    },
    showDetailRow: function (rowIndex, calcRow) {
        var form = YIUI.FormStack.getForm(this.ofFormID),
            table = form.getDocument().getByKey(this.tableKey || this.metaObj.tableKey),
            metaRow = this.getDetailRow(),
            rd = this.getRowDataAt(rowIndex);
        if (table == undefined || rd == undefined || rd == null || !rd.isDetail || rd.bookmark == undefined) return;
        var bookmark = rd.bookmark, editOpt, metaCell, cBookmark;
        for (var i = 0, len = this.getColumnCount(); i < len; i++) {
            metaCell = metaRow.cells[i];
            // editOpt = this.dataModel.colModel.cells[rd.cellKeys[i]];
            editOpt = this.getCellEditor(rd.cellKeys[i]).toJS();
            if (editOpt.hasDB) {
                if (metaCell.isColExpand) {
                    cBookmark = rd.cellBkmks[i];
                    if (cBookmark) {
                        table.setByBkmk(cBookmark);
                        this.setValueAt(rowIndex, i, table.getByKey(editOpt.columnKey), false, false, true);
                    }
                } else {
                    table.setByBkmk(bookmark);
                    this.setValueAt(rowIndex, i, table.getByKey(editOpt.columnKey), false, false, true);
                }
            } else if (editOpt.edittype == "label" || editOpt.edittype == "button" || editOpt.edittype == "hyperLink") {
                this.setValueAt(rowIndex, i, metaCell.caption, false, false, false);
            } else if (metaCell.isSelect) {
                table.setByBkmk(bookmark);
                this.setValueAt(rowIndex, i, table.getByKey(YIUI.SystemField.SELECT_FIELD_KEY), false, false, false);
            }
        }
        if (calcRow) {
            form.getUIProcess().calcEmptyRow(this, rowIndex);
        }
    },
    toggleSelect(rowIndex) {
        if(this.selectFieldIndex<0 || !this.tableKey) {
            return;
        }
        var form = YIUI.FormStack.getForm(this.ofFormID);
        if(!form) {
            return;
        }
        const datatable = form.getDocument().getByKey(this.tableKey);
        var row = this.getRowDataAt(rowIndex);
        var bkmk = row.bkmkRow;
        datatable.setByBkmk(bkmk.getBookmark());
        datatable.setByKey(YIUI.SystemField.SELECT_FIELD_KEY, !this.getValueAt(rowIndex, this.selectFieldIndex));
        this.setValueAt(rowIndex, this.selectFieldIndex, !this.getValueAt(rowIndex, this.selectFieldIndex), false, false);
    },
    loadData() {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const table = form.getDocument().getByKey(this.tableKey || this.metaObj.tableKey);
        for (let i = 0; i < table.size(); i++) {
            this.loadDetailRow(i);
        }
    },
    loadDetailRow: function (rowIndex) {//加载指定行的数据
        //如果已经存在行数据，则重新从Document中读取数据到控件中
        //如果不存在，则新增，加载数据
        // if(this.isRowDataLoaded(rowIndex)){//不存在
        //     return;
        // }
        var dataLength = this.getRowCount(),
            form = YIUI.FormStack.getForm(this.ofFormID), isNewData = false,
            dtrRowIndex = this.metaRowInfo.dtlRowIndex,
            dtlMetaRow = this.metaRowInfo.rows[dtrRowIndex];
        let table = form.getDocument().getByKey(this.tableKey || this.metaObj.tableKey);
        const rowData = {};
        rowData.isDetail = true;
        rowData.isEditable = true;
        rowData.rowHeight = dtlMetaRow.rowHeight;
        rowData.rowID = rowIndex;
        rowData.metaRowIndex = dtrRowIndex;
        rowData.rowType = "Detail";
        rowData.cellKeys = dtlMetaRow.cellKeys;
        rowData.data = [];
        rowData.cellBkmks = [];
        rowData.rowGroupLevel = dtlMetaRow.rowGroupLevel;
        isNewData = false;
        const bkmk = this.getRowBkmk(rowIndex);
        for (var i = 0, len = this.getColumnCount(); i < len; i++) {
            let metaCell = dtlMetaRow.cells[i];
            // editOpt = this.dataModel.colModel.cells[rd.cellKeys[i]];
            let editOpt = this.getCellEditor(rowData.cellKeys[i]).toJS();

            if (editOpt.hasDB) {
                if (metaCell.isColExpand) {
                    cBookmark = rd.cellBkmks[i];
                    if (cBookmark) {
                        table.setByBkmk(cBookmark);
                        rowData.data.push([table.getByKey(editOpt.columnKey), null, true]);
                        // this.setValueAt(rowIndex, i, table.getByKey(editOpt.columnKey), false, false, true);
                    }
                } else {
                    table.setByBkmk(bkmk);
                    rowData.data.push([table.getByKey(editOpt.columnKey), null, true]);
                    // this.setValueAt(rowIndex, i, table.getByKey(editOpt.columnKey), false, false, true);
                }
            } else if (editOpt.edittype == "label" || editOpt.edittype == "button" || editOpt.edittype == "hyperLink") {
                // this.setValueAt(rowIndex, i, metaCell.caption, false, false, false);
                rowData.data.push([metaCell.caption, metaCell.caption, true]);
            } else if (metaCell.isSelect) {
                table.setByBkmk(bkmk);
                rowData.data.push([table.getByKey(YIUI.DataUtil.System_SelectField_Key), null, true]);
                // this.setValueAt(rowIndex, i, table.getByKey(YIUI.DataUtil.System_SelectField_Key), false, false, false);
            }
        }

        this.state = this.state.setIn(['dataModel', 'data', rowIndex], Immutable.fromJS(rowData));
        form.getUIProcess().calcEmptyRow(this, rowIndex);
    },
    getRowBkmk(rowIndex) {
        // return this.rootGroupBkmk[rowIndex];
        const rowData = this.getRowDataAt(rowIndex);
        if (rowData) {
            return rowData.bookmark;
        }
        return null;
    },
    getCellEditOpt(column) {
        const editor = this.getCellEditor(column);
        if (editor) {
            return editor.toJS().editOptions;
        }
        return null;
    },
    getDetailRow() {
        const meta = this.getMetaObj();
        return meta.rows[meta.detailMetaRowIndex];
    },
    getCellDataAt(row, column) {
        const result = this.state.getIn(['dataModel', 'data', row, 'data', column]);
        return result.toJS();
    },
    refreshSelectEnable() { },
    getMetaCellByKey: function (cellKey) {
        var metaRow, metaCell;
        for (var i = 0, len = this.getMetaObj().rows.length; i < len; i++) {
            metaRow = this.getMetaObj().rows[i];
            for (var j = 0, length = metaRow.cells.length; j < length; j++) {
                metaCell = metaRow.cells[j];
                if (metaCell.key == cellKey) {
                    return metaCell;
                }
            }
        }
        return null;
    },
    getColumnEditor: function (columnKey) {
        if (!this.editors[columnKey]) {
            const editor = this.getCellEditor(columnKey);
            if (editor) {
                const ed = editor.toJS();
                const colConfig = this.getColumnConfigByKey(columnKey);
                var result = ed.editOptions;
                result.ofFormID = this.ofFormID;
                result.key = columnKey;
                result.tagName = getTagName(result.cellType);
                result.metaObj = result;
                result.caption = colConfig.get('label') || colConfig.get('caption');
                result.formulaCaption = colConfig.get('formulaCaption');
                const cmp = YIUI.create(result);
                cmp.init();
                this.editors[columnKey] = cmp;
            }
        }
        return this.editors[columnKey];
    },
    doOnCellClick: function (rowIndex, columnKey) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        const colEditor = this.getColumnEditor(columnKey);

        switch (colEditor.cellType) {
            case YIUI.CONTROLTYPE.BUTTON:
            case YIUI.CONTROLTYPE.HYPERLINK:
            case YIUI.CONTROLTYPE.IMAGE:
            case YIUI.CONTROLTYPE.TEXTBUTTON:
                if (colEditor.onClick) {
                    var cxt = new View.Context(form);
                    cxt.setRowIndex(rowIndex);
                    this.activeRowIndex = rowIndex;
                    form.eval($.trim(colEditor.onClick), cxt, null);
                }
                break;
        }
    },
    doOnRowDblClick: async function (rowIndex) {
        var rowDblClick = this.getMetaObj().rowDblClick;

        if (rowDblClick) {
            var formID = this.ofFormID,
                form = YIUI.FormStack.getForm(formID),
                cxt = new View.Context(form);

            cxt.setRowIndex(rowIndex);
            this.activeRowIndex = rowIndex;
            await form.eval(rowDblClick, cxt, null);
        }
    },
    isNullValue: function (value) {
        if (value == null || value == '') { // 文本
            return true;
        }
        if (value instanceof Decimal) { // 数值
            return value.isZero();
        }
        if (value instanceof YIUI.ItemData) { // 字典
            return value.oid == 0;
        }
        if ($.isArray(value)) { // 多选字典
            return value.length == 0;
        }
        return false;
    },
    isCellNull(rowIndex, colIndex) {
        const val = this.getValueAt(rowIndex, colIndex);
        return this.isNullValue(val);
    },
});

YIUI.reg('grid', YIUI.Grid);
regControlType(YIUI.CONTROLTYPE.GRID, 'grid');

export default YIUI.Grid;