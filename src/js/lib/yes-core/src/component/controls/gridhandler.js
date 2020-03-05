import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { lodash as $ } from 'yes-common';
export default (function () {
    var Return = {
        /**
         * 单元格单击事件， 用于表格的checkbox , button , hyperlink
         */
        doOnCellClick: function (control, rowID, colIndex, value) {
            var formID = control.ofFormID, form = YIUI.FormStack.getForm(formID),
                row = control.getRowDataByID(rowID), rowIndex = control.getRowIndexByID(rowID), cellKey = row.cellKeys[colIndex],
                editOpt = control.getCellEditor(cellKey).toJSON();
            switch (editOpt.edittype) {
                case "button":
                case "hyperLink":
                case "image":
                case "textButton":
                    if (editOpt.editOptions.onclick) {
                        form.eval($.trim(editOpt.editOptions.onclick), { form: form, rowIndex: rowIndex }, null);
                    }
                    break;
                case "checkBox":
                    var oldV = control.getValueAt(rowIndex, colIndex);
                    if (oldV !== value) {
                        control.setValueAt(rowIndex, colIndex, value, true, true);
                    }
                    break;
            }
        },
        /**
         * 表格行点击
         */
        doOnRowClick: function (control, rowID) {
            var formID = control.ofFormID,
                form = YIUI.FormStack.getForm(formID),
                rowIndex = control.getRowIndexByID(rowID),
                clickContent = control.rowClick === undefined ? "" : $.trim(control.rowClick);
            var cxt = { form: form, rowIndex: rowIndex };
            if (clickContent) {
                form.eval(clickContent, cxt, null);
            }
        },
        /**
         * 表格行双击事件
         */
        doOnRowDblClick: function (control, rowID) {
            var formID = control.ofFormID,
                form = YIUI.FormStack.getForm(formID),
                rowIndex = control.getRowIndexByID(rowID),
                clickContent = control.rowDblClick === undefined ? "" : $.trim(control.rowDblClick);
            var cxt = { form: form, rowIndex: rowIndex };
            if (clickContent) {
                form.eval(clickContent, cxt, null);
            }
        },
        /**
         * 表格行焦点变化
         */
        doOnFocusRowChange: function (control, oldRowID, rowID) {
            var formID = control.ofFormID,
                form = YIUI.FormStack.getForm(formID),
                rowIndex = control.getRowIndexByID(rowID),
                oldRowIndex = control.getRowIndexByID(oldRowID),
                clickContent = control.focusRowChanged === undefined ? "" : $.trim(control.focusRowChanged);
            var cxt = { form: form, newRowIndex: rowIndex, oldRowIndex: oldRowIndex };
            if (clickContent) {
                form.eval(clickContent, cxt, null);
            }
            control.showSubDetailData(rowIndex);
        },
        /**
         * 表格排序事件
         */
        doOnSortClick: function (control, colIndex, sortType) {
            // if (control.hasGroupRow) {
            //     alert("表格排序不支持行分组！");
            //     return;
            // }
            // var data = control.dataModel.data;
            // data.sort(function (row1, row2) {
            //     if (row1.rowType == "Fix" || row1.rowType == "Total" || row2.rowType == "Fix" || row2.rowType == "Total") {
            //         return row1.metaRowIndex - row2.metaRowIndex;
            //     }
            //     var value1 = row1.data[colIndex][0], value2 = row2.data[colIndex][0];
            //     if (row2.bookmark === undefined) return -1;
            //     if (row1.bookmark === undefined) return 1;
            //     if (value1 == undefined && value2 == undefined) return 0;
            //     if (value1 !== undefined && value2 == undefined) return sortType === "asc" ? -1 : 1;
            //     if (value1 == undefined && value2 !== undefined) return sortType === "asc" ? 1 : -1;
            //     var editOpt = control.dataModel.colModel.cells[row1.cellKeys[colIndex]];
            //     switch (editOpt.edittype) {
            //         case "dict":
            //             value1 = JSON.parse(value1).oid;
            //             value2 = JSON.parse(value2).oid;
            //         case "datePicker":
            //         case "numberEditor":
            //             return sortType === "asc" ? value2 - value1 : value1 - value2;
            //         case "textEditor":
            //             return sortType === "asc" ? value2.localeCompare(value1) : value1.localeCompare(value2);
            //         case "comboBox":
            //             if (!isNaN(value1) && !isNaN(value2)) {
            //                 value1 = parseFloat(value1);
            //                 value2 = parseFloat(value2);
            //                 return sortType === "asc" ? value2 - value1 : value1 - value2;
            //             } else {
            //                 value1 = value1.toString();
            //                 value2 = value2.toString();
            //                 return sortType === "asc" ? value2.localeCompare(value1) : value1.localeCompare(value2);
            //             }

            //     }
            //     return 1;
            // });
            // control.dataModel.data = data;
            // control.refreshGrid();
        },
        /**
         * 单元格选中事件
         */
        doGridCellSelect: function (control, rowID, colIndex) {

        },
        /**
         * 单元格值改变事件
         * formID: 控件所在表单的ID
         * controlKey: 控件自身的key
         * newValue: 新的存储值
         * extParas: 其他参数
         */
        doCellValueChanged: function (control, rowID, colIndex, newValue) {
            var rowIndex = control.getRowIndexByID(rowID);
            control.setValueAt(rowIndex, colIndex, newValue, true, true, true);
        },
        /**
         * 表格粘贴事件
         */
        doCellPast: function (control, bgRowID, bgColIndex, copyText) {
            // var rowInd = control.getRowIndexByID(bgRowID), rowV = copyText.split("\n");
            // for (var i = 0, len = rowV.length; i < len; i++) {
            //     if (rowV[i] === "") continue;
            //     var rowIndex = rowInd + i;
            //     var cellV = rowV[i].split("\t"), cellVObj;
            //     for (var j = 0, clen = cellV.length; j < clen; j++) {
            //         var iCol = bgColIndex + j, value = cellV[j];
            //         if (iCol >= control.dataModel.colModel.columns.length) continue;
            //         control.setValueAt(rowIndex, iCol, value, true, true, false);
            //     }
            // }
        },
        doAllChecked: function (control, colIndex, newValue) {
            var len = control.dataModel.data.length, rd;
            var formID = control.ofFormID, form = YIUI.FormStack.getForm(formID), dt = form.getDocument().getByKey(control.tableKey);
            for (var i = 0; i < len; i++) {
                rd = control.getRowDataAt(i);
                if (rd.isDetail && rd.bookmark != undefined && rd.bookmark != null) {
                    var cellKey = rd.cellKeys[colIndex], editOption = control.getCellEditor(cellKey).toJSON();
                    control.setValueAt(i, colIndex, newValue, false, false);
                    if (editOption.columnKey) {
                        dt.setByBkmk(rd.bookmark);
                        dt.setByKey(editOption.columnKey, newValue ? 1 : 0);
                    }
                }
            }
        },

        /**
         * 向指定页进行跳转
         */
        doGoToPage: function (control, pageInfo) {
            pageInfo = JSON.parse(pageInfo);
            var curPageIndex = control.pageInfo.currentPage, rowIndex = -1;
            if (pageInfo.optType == "firstPage") {
                control.pageInfo.currentPage = 1;
            } else if (pageInfo.optType == "prevPage") {
                control.pageInfo.currentPage = curPageIndex - 1;
            } else if (pageInfo.optType == "nextPage") {
                control.pageInfo.currentPage = curPageIndex + 1;
            } else if (pageInfo.optType == "lastPage") {
                control.pageInfo.currentPage = control.pageInfo.totalPage;
            } else if (pageInfo.optType == "turnToPage") {
                control.pageInfo.currentPage = pageInfo.pageIndex;
            }
            var formID = control.ofFormID, form = YIUI.FormStack.getForm(formID),
                filterMap = form.getFilterMap(),
                startRi = (control.pageInfo.currentPage - 1) * control.pageInfo.pageRowCount;
            filterMap.setOID(form.getDocument().oid == undefined ? -1 : form.getDocument().oid);
            filterMap.getTblFilter(control.tableKey).startRow = startRi;
            filterMap.getTblFilter(control.tableKey).maxRows = control.pageInfo.pageRowCount;
            var paras = {
                formKey: form.formKey,
                cmd: "gridgotopage",
                filterMap: $.toJSON(filterMap),
                gridKey: control.key,
                formOptState: form.getOperationState()
            };
            if (control.pageInfo.pageLoadType == "UI") {
                paras.document = $.toJSON(YIUI.DataUtil.toJSONDoc(form.getDocument()));
            }
            var result = JSON.parse(Svr.SvrMgr.doGoToPage(paras)), dataTable;
            if (result.dataTable) {
                dataTable = YIUI.DataUtil.fromJSONDataTable(result.dataTable);
                form.getDocument().setByKey(control.tableKey, dataTable);
            }
            control.dataModel.data = result.data;
            control.errorInfoes = result.errorInfoes;
            control.pageInfo.totalPage = result.totalPage;
            //            control.pageInfo.currentPage = result.currentPage;
            control.rowIDMask = 0;
            control.initRowDatas();
            control.refreshGrid();
        },
        /**
         * 跳转到首页
         */
        doGoToFirstPage: function (control, pageInfo) {
        },
        /**
         * 跳转到末页
         */
        doGoToLastPage: function (control, pageInfo) {
        },
        /**
         * 跳转到上一页
         */
        doGoToPrevPage: function (control, pageInfo) {
        },
        /**
         * 跳转到下一页
         */
        doGoToNextPage: function (control, pageInfo) {
        },
        /**
         * 表格中新增行事件
         */
        doInsertGridRow: function (control, rowID) {
            var ri = control.getRowIndexByID(rowID),
                rd = control.getRowDataByID(rowID),
                bookmark = parseInt(rd.bookmark, 10);
            if (!rd.isDetail || (isNaN(bookmark) && ri == (control.getRowCount() - 1))) return;
            control.addGridRow(null, ri);
        },

        /**
         * 表格中删除行事件
         */
        doDeleteGridRow: function (control, rowID) {
            var ri = control.getRowIndexByID(rowID);
            control.deleteGridRow(ri);
        },
        setCellValueToDocument: function (form, grid, rowIndex, colIndex, newValue) {
            var row = grid.getRowDataAt(rowIndex);
            switch (row.rowType) {
                case "Fix":
                    this.setFixValueToDoc(form, grid, rowIndex, colIndex, newValue);
                    break;
                case "Detail":
                    this.setDtlValueToDoc(form, grid, rowIndex, colIndex, newValue);
                    break;
            }
        },
        setNewValue: function (colKey, cEditOpt, dataTable, newValue) {
            if (colKey == "") return;
            var dataType = null;
            switch (cEditOpt.get('edittype')) {
                case "dict":
                    const multiSelect = cEditorOpt.getIn(['editOptions', 'multiSelect']);
                    const isCompDict = cEditorOpt.getIn(['editOptions', 'isCompDict']);
                    const isDynamic = cEditorOpt.getIn(['editOptions', 'isDynamic']);
                    if (newValue == null || newValue == undefined) {
                        if (multiSelect) {
                            dataTable.setByKey(colKey, null);
                        } else {
                            dataTable.setByKey(colKey, 0);
                        }
                        break;
                    }
                    if (multiSelect) {
                        var oids = [], itemKey = "";
                        // if (isCompDict) {
                        //     $.error($.ygrid.formatString($.ygrid.compDictNotDataBinding, cEditOpt.key))
                        // }
                        for (var i = 0, len = newValue.length; i < len; i++) {
                            oids.push(newValue[i].oid);
                            oids.push(",");
                        }
                        if (oids && oids.length > 0) {
                            oids.pop();
                            itemKey = newValue[0].itemKey;
                        }
                        dataTable.setByKey(colKey, oids.join(""));
                        if (isDynamic) {
                            dataTable.setByKey(colKey + "ItemKey", itemKey);
                        }
                    } else {
                        dataTable.setByKey(colKey, newValue.oid);
                        if (isCompDict || isDynamic) {
                            dataTable.setByKey(colKey + "ItemKey", newValue.itemKey);
                        }
                    }
                    break;
                default:
                    dataType = dataTable.cols[dataTable.indexByKey(colKey)].type;
                    dataTable.setByKey(colKey, newValue);
                    break;
            }
        },
        newRow: function (form, grid, row, dataTable) {
            var cm, editOpt, cellV, dataType;
            dataTable.addRow();
            for (var i = 0, len = grid.dataModel.colModel.columns.length; i < len; i++) {
                cm = grid.dataModel.colModel.columns[i];
                editOpt = grid.getCellEditor(row.cellKeys[i]).toJSON();
                if (editOpt == undefined || editOpt.columnKey === undefined || editOpt.columnKey === "") continue;
                cellV = row.data[i][0];
                if (editOpt.edittype === "dict" && cellV !== null) {
                    if (editOpt.editOptions.multiSelect) {
                        var realV = [];
                        for (var n = 0, clen = cellV.length; n < clen; n++) {
                            realV.push(cellV[n].oid);
                            realV.push(",");
                        }
                        realV.pop();
                        cellV = realV.join("");
                    } else {
                        cellV = cellV.oid;
                    }
                }
                dataType = dataTable.cols[dataTable.indexByKey(editOpt.columnKey)].type;
                dataTable.setByKey(editOpt.columnKey, grid.convertValue(cellV, dataType));
            }
            return dataTable.getBkmk();
        },
        setFixValueToDoc: function (form, grid, rowIndex, colIndex, newValue) {
            var row = grid.getRowDataAt(rowIndex), cEditOpt = grid.getCellEditor(row.cellKeys[colIndex]).toJSON(),
                doc = form.getDocument(), dataTable, dataType, tableKey = cEditOpt.tableKey, colKey = cEditOpt.columnKey;
            if (doc == undefined || doc == null) return;
            if (tableKey == undefined || colKey == undefined) return;
            dataTable = doc.getByKey(tableKey);
            if (dataTable == undefined || dataTable == null) return;
            if (!dataTable.first()) {
                dataTable.addRow();
            }
            this.setNewValue(colKey, cEditOpt, dataTable, newValue);
        },
        setDtlValueToDoc: function (form, grid, rowIndex, colIndex, newValue) {
            var row = grid.getRowDataAt(rowIndex), cEditOpt = grid.getCellEditor(grid.getCellKey(rowIndex, colIndex)),
                doc = form.getDocument(), dataTable, dataType, tableKey = cEditOpt.get('tableKey'), colKey = cEditOpt.get('columnKey');
            var metaCell = grid.getMetaObj().rows[row.metaRowIndex].cells[colIndex];
            if (doc == undefined || doc == null) return;
            if (tableKey == undefined || colKey == undefined) return;
            dataTable = doc.getByKey(tableKey);
            if (dataTable == undefined || dataTable == null) return;
            var oldTableSize = dataTable.getRowCount();
            if (row.isDetail && row.bookmark == undefined) {
                this.flushRow(form, grid, rowIndex);
            } else {
                if (grid.hasColExpand) {
                    if (metaCell.isColExpand) {
                        dataTable.setByBkmk(row.cellBkmks[colIndex]);
                        this.setNewValue(colKey, cEditOpt, dataTable, newValue);
                    } else {
                        for (var i = 0, len = row.bookmark.length; i < len; i++) {
                            dataTable.setByBkmk(row.bookmark[i]);
                            this.setNewValue(colKey, cEditOpt, dataTable, newValue);
                        }
                    }
                } else {
                    dataTable.setByBkmk(row.bookmark);
                    this.setNewValue(colKey, cEditOpt, dataTable, newValue);
                }
            }
            if (oldTableSize !== dataTable.getRowCount()) {
                this.dealWithSequence(form, grid);
            }
        },
        flushRow: function (form, grid, rowIndex) {
            var row = grid.getRowDataAt(rowIndex), tableKey = grid.tableKey,
                metaRow = grid.getDetailRow(),
                doc = form.getDocument(), dataTable = doc.getByKey(tableKey), rowBkmk;
            if (doc == undefined || doc == null) return;
            if (dataTable == undefined || dataTable == null) return;
            if (grid.hasColExpand) {
                rowBkmk = [];
                var cell, metaCell, newBkmk, cEditOpt, colExpandMap = {};
                for (var i = 0, len = row.data.length; i < len; i++) {
                    cell = row.data[i];
                    metaCell = metaRow.cells[i];
                    cEditOpt = grid.getCellEditor(row.cellKeys[i]);
                    if (metaCell.isColExpand) {
                        newBkmk = colExpandMap[metaCell.columnArea + "-" + metaCell.crossValue];
                        if (newBkmk == undefined || newBkmk == null) {
                            newBkmk = this.newRow(form, grid, row, dataTable);
                            rowBkmk.push(newBkmk);
                            row.cellBkmks[i] = newBkmk;
                            colExpandMap[metaCell.columnArea + "-" + metaCell.crossValue] = newBkmk;
                            this.setNewValue(metaCell.columnKey, cEditOpt, dataTable, cell[0]);
                            var expInfo = grid.expandModel[metaCell.columnArea], crsValue, cKey;
                            for (var k = 0, cLen = metaCell.crossValue.length; k < cLen; k++) {
                                crsValue = metaCell.crossValue[k];
                                cKey = expInfo[k];
                                if (cKey !== undefined && cKey !== null && cKey.length > 0) {
                                    dataTable.setByKey(cKey, crsValue);
                                }
                            }
                        } else {
                            row.cellBkmks[i] = newBkmk;
                        }
                    }
                }
                for (var m = 0, eLen = rowBkmk.length; m < eLen; m++) {
                    dataTable.setByBkmk(rowBkmk[m]);
                    for (var n = 0, nLen = row.data.length; n < nLen; n++) {
                        metaCell = metaRow.cells[n];
                        cEditOpt = grids.getCellEditor(row.cellKeys[n]);
                        if (!metaCell.isColExpand && metaCell.columnKey != undefined && metaCell.columnKey.length > 0) {
                            this.setNewValue(metaCell.columnKey, cEditOpt, dataTable, row.data[n][0]);
                        }
                    }
                }
            } else {
                rowBkmk = this.newRow(form, grid, row, dataTable);
                dataTable.setByBkmk(rowBkmk);
                for (var j = 0, jLen = row.data.length; j < jLen; j++) {
                    metaCell = metaRow.cells[j];
                    // cEditOpt = grid.dataModel.colModel.cells[row.cellKeys[j]];
                    cEditOpt = grid.getCellEditor(row.cellKeys[j]);
                    if (metaCell.columnKey != undefined && metaCell.columnKey.length > 0) {
                        this.setNewValue(metaCell.columnKey, cEditOpt, dataTable, row.data[j][0]);
                    }
                }
                if (grid.parentGrid && grid.parentGrid.length > 0) {
                    var parentGrid = form.getComponent(grid.parentGrid),
                        pRowIndex = parentGrid.getFocusRowIndex(),
                        pRow = parentGrid.dataModel.data[pRowIndex];
                    dataTable.rows[dataTable.pos].parentBkmk = pRow.bookmark;
                }
            }
            grid.setRowBookmark(rowIndex, rowBkmk);
            grid.showSubDetailData(rowIndex);
            return row;
        },

        copyRow: function (form, grid, rowIndex, splitKeys, splitValues, layer) {
            var dataTable = form.getDocument().getByKey(grid.tableKey),
                newRowIndex = rowIndex + 1;
            if (dataTable == undefined) return -1;
            var row = grid.getRowDataAt(rowIndex);
            if (row.isDetail && row.bookmark == undefined) return -1;
            var rd = grid.addGridRow(null, newRowIndex, false);
            if (rd.bookmark == undefined) {
                rd = this.flushRow(form, grid, newRowIndex);
            }
            if (row.bookmark !== undefined) {
                var values = {}, OID = -1, tCol, value;
                dataTable.setByBkmk(row.bookmark);
                for (var i = 0, len = dataTable.cols.length; i < len; i++) {
                    tCol = dataTable.cols[i];
                    value = dataTable.get(i);
                    if (tCol.key.toLowerCase() == "oid" && value !== null) {
                        OID = value;
                    }
                    values[tCol.key] = value;
                }
                dataTable.setByBkmk(rd.bookmark);
                for (var ci = 0, clen = dataTable.cols.length; ci < clen; ci++) {
                    tCol = dataTable.cols[ci];
                    if (splitKeys.indexOf(tCol.key) >= 0) {
                        var dataType = dataTable.cols[dataTable.indexByKey(tCol.key)].type;
                        dataTable.set(ci, YIUI.Handler.convertValue(splitValues[splitKeys.indexOf(tCol.key)], dataType));
                    } else {
                        dataTable.set(ci, values[tCol.key]);
                    }
                    if (tCol.key.toLowerCase() == "oid") {
                        dataTable.set(ci, null);
                    }
                    if (tCol.key.toLowerCase() == "poid") {
                        dataTable.set(ci, OID);
                    }
                    if (tCol.key.toLowerCase() == "sequence") {
                        dataTable.set(ci, null);
                    }
                }
            }
            if (layer != -1) {
                dataTable.setByKey("Layer", layer);
            }
            dataTable.beforeFirst();
            grid.showDetailRow(newRowIndex, false);
            this.dealWithSequence(form, grid);
            return newRowIndex;
        },
        /**
         *处理表格值变化时需要发生的相关事件
         */
        fireCellChangeEvent: async function (form, grid, rowIndex, colIndex) {
            var row = grid.getRowDataAt(rowIndex), cellKey = row.cellKeys[colIndex],
                editOpt = grid.getCellEditor(cellKey).toJS();
            var metaCell = grid.getMetaObj().rows[row.metaRowIndex].cells[colIndex];
            // meatRow = grid.metaRowInfo.rows[row.metaRowIndex];
            form.getUIProcess().doCellValueChanged(grid, rowIndex, colIndex, cellKey);
            //YIUI.GridSumUtil.evalAffectSum(form, grid, rowIndex, colIndex);
            var cellCEvent = metaCell.valueChanged;
            if (cellCEvent !== undefined && cellCEvent.length > 0) {
                await form.eval($.trim(cellCEvent), { form: form, rowIndex: rowIndex }, null);
            }
            // if (editOpt == undefined || editOpt.columnKey === undefined || editOpt.columnKey.length == 0 || !grid.isEnable()) return;
            // var nextRow = grid.getRowDataAt(rowIndex + 1);
            // if (!row.isDetail) return;
            // if ((!nextRow || !nextRow.isDetail) && !grid.hasRowExpand) {
            //     await grid.addGridRow();
            // }
        },
        /**
         *处理表格值变化后需要发生的相关事件
         */
        doPostCellChangeEvent: function (form, grid, rowIndex, colIndex) {
            var row = grid.getRowDataAt(rowIndex), cellKey = row.cellKeys[colIndex];
            form.getUIProcess().doPostCellValueChanged(grid, rowIndex, colIndex, cellKey);
        },
        dealWithSequence: function (form, grid) {
            var SYS_SEQUENCE = "Sequence";
            if (grid.seqColumn == undefined) return;
            var row, bkmk, seq, curSeq = 0, dataTable = form.getDocument().getByKey(grid.tableKey || grid.metaObj.tableKey);
            for (var i = 0, len = grid.getRowCount(); i < len; i++) {
                row = grid.getRowDataAt(i);
                bkmk = row.bookmark;
                if (!row.isDetail || row.bookmark == undefined) continue;
                if (grid.hasColExpand) {
                    dataTable.setByBkmk(bkmk[0]);
                    seq = dataTable.getByKey(SYS_SEQUENCE);
                    if (seq == undefined || seq == null || seq <= curSeq) {
                        seq = curSeq + 1;
                        for (var j = 0, jlen = bkmk.length; j < jlen; j++) {
                            dataTable.setByBkmk(bkmk[j]);
                            dataTable.setByKey(SYS_SEQUENCE, seq);
                        }
                        curSeq = parseInt(seq);
                    }
                } else {
                    dataTable.setByBkmk(bkmk);
                    seq = dataTable.getByKey(SYS_SEQUENCE);
                    if (seq == undefined || seq == null || seq <= curSeq) {
                        seq = curSeq + 1;
                        dataTable.setByKey(SYS_SEQUENCE, seq);
                    }
                    curSeq = parseInt(seq);
                }
            }
        }
    };
    Return = $.extend({}, YIUI.Handler, Return);
    return Return;
})();