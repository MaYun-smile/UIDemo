/**
 * Created by 陈瑞 on 2017/3/4 use WebStorm.
 */
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import '../YIUI-svr';
import { lodash as $ } from 'yes-common';
import '../uiprocess';
import '../abstractuiprocess';
import '../yes-ui';
//  var YIUI = YIUI || {};
// (function () {
export default YIUI.UICalcProcess = YIUI.extend(YIUI.AbstractUIProcess, {
    init: function (form) {
        this.base(form);
    },
    isInAllCalculating: function () {
        return this.calcAlling;
    },
    calcAlling: false,
    calcAll: async function (commitValue) {
        this.calcAlling = true;
        var items = this.form.dependency.calcTree.items;
        switch (this.form.operationState) {
            case YIUI.Form_OperationState.New:
                await this.calcAllItems(true, items, commitValue);
                break;
            case YIUI.Form_OperationState.Edit:
            case YIUI.Form_OperationState.Default:
                await this.calcAllItems(false, items, commitValue);
                break;
            default:
                break;
        }
        // 计算所有表格的汇总
        // var gm = this.form.getGridInfoMap();
        // for (var i = 0, grid, size = gm.length; i < size; i++) {
        //     grid = this.form.getComponent(gm[i].key);
        //     YIUI.GridSumUtil.evalSum(this.form, grid);
        // }
        this.form.removeSysExpVals("IgnoreKeys");
        this.calcAlling = false;
    },

    calcAllItems: async function (calcAll, items, commitValue) {
        for (var i = 0, exp, component; exp = items[i]; i++) {
            component = this.form.getComponent(exp.source);
            if (!component || component.isSubDetail)
                continue;
            switch (exp.objectType) {
                case YIUI.ExprItem_Type.Item:
                    await this.calcHeadItem(component, exp, this.newContext(this.form, -1, -1), calcAll);
                    break;
                case YIUI.ExprItem_Type.Set:
                    switch (component.type) {
                        case YIUI.CONTROLTYPE.GRID:
                            await this.calcGrid(component, this.newContext(this.form, -1, -1), this.initTree(exp), calcAll, commitValue);
                            break;
                        case YIUI.CONTROLTYPE.LISTVIEW:
                            await this.calcListView(component, this.newContext(this.form, -1, -1), this.initTree(exp), calcAll);
                            break;
                    }
            }
        }
    },

    calcHeadItem: async function (component, item, context, calcAll) {
        if (item.empty) return;
        if (component.type == YIUI.CONTROLTYPE.GRID) {
            var cellLocation = this.form.getCellLocation(item.target);
            var metaCell = component.getMetaCellByKey(item.target);
            const rowData = component.getRowDataAt(cellLocation.row);
            if (!rowData) {
                return;
            }
            // if (!this.needCalc_Cell(metaCell, calcAll))
            //     return;
            var pos = item.pos;
            if (pos.columnExpand) {
                for (var i = 0, length = pos.indexes.length; i < length; i++) {
                    if (this.needCalc_Cell(component, cellLocation.row, pos.indexes[i], metaCell)) {
                        context.rowIndex = cellLocation.row;
                        const result = await this.calcFormulaValue(item, context);
                        component.setValueAt(cellLocation.row, pos.indexes[i], result, true, false);
                    }
                }
            } else {
                if (this.needCalc_Cell(component, cellLocation.row, pos.index, rowData.data[pos.index], metaCell)) {
                    context.rowIndex = cellLocation.row;
                    const result = await this.calcFormulaValue(item, context);
                    component.setValueAt(cellLocation.row, pos.index, result, true, false);
                }
                // if (calcAll && component.hasDataBinding()) {
                //     this.form.doValueChanged(cellLocation, reuslt);
                // }
            }
        } else {
            if (!this.needCalc_Com(component, calcAll))
                return;
            // if (component.needClean() || !component.isInitValue()) {
            const result = await this.calcFormulaValue(item, context);
            // if (result != null) {
            await component.setValue(result, true, false);
            // if (calcAll && component.hasDataBinding()) {
            //     this.form.doValueChanged(component, component.getValue(), true);
            // }
            // }
            // }
        }
    },

    calcListView: async function (listView, context, item, calcAll) {
        for (var i = 0, count = listView.getRowCount(); i < count; i++) {
            this.impl_calcListViewRow(listView, this.newContext(this.form, i, -1), i, item, calcAll);
        }
    },

    impl_calcListViewRow: async function (listView, context, rowIndex, item, calcAll) {
        var items = item.items;
        if (!items)
            return;
        for (var i = 0, exp; exp = items[i]; i++) {
            if ((!exp.defaultValue && !exp.formulaValue) || !exp.target)
                continue;
            var columnInfo = listView.getColumnInfo(exp.target);
            if (!this.needCalc_listView(columnInfo, calcAll))
                continue;
            var result = await this.calcFormulaValue(exp, context);
            if (result) {
                listView.setValByKey(rowIndex, exp.target, result, true, false);
            }
        }
    },

    calcGrid: async function (grid, context, item, calcAll, commitValue) {
        for (var i = 0, rowData, count = grid.getRowCount(); i < count; i++) {
            // rowData = grid.getRowDataAt(i);
            if (!grid.isRowDetail(i))
                continue;
            await this.impl_calcGridRow(grid, this.newContext(this.form, i, -1), i, item, calcAll, commitValue);
        }
    },

    impl_calcGridRow: async function (grid, context, rowIndex, item, calcAll, commitValue) {
        if (!item.items || rowIndex == -1)
            return;
        var _item,
            pos,
            rowData,
            metaCell;
        rowData = grid.getRowDataAt(rowIndex);
        for (var i = 0; (_item = item.items[i]) && (pos = _item.pos); i++) {
            if ((!_item.defaultValue && !_item.formulaValue) || !_item.target)
                continue;
            metaCell = grid.getMetaCellByKey(_item.target);
            commitValue = (YIUI.GridUtil.isEmptyRow(rowData) ? false : commitValue);
            if (pos.columnExpand) {
                for (var c = 0, length = pos.indexes.length; c < length; c++) {
                    if (!this.needCalc_Cell(grid, rowIndex, pos.indexes[c], metaCell, calcAll))
                        continue;
                    context.colIndex = pos.indexes[c];
                    await grid.setValueAt(rowIndex, pos.indexes[c], await this.calcFormulaValue(_item, context), commitValue, false);
                }
            } else {
                if (!this.needCalc_Cell(grid, rowIndex, pos.index, rowData[pos.index], metaCell, calcAll))
                    continue;
                context.rowIndex = rowIndex;
                const result = await this.calcFormulaValue(_item, context);
                await grid.setValueAt(rowIndex, pos.index, result, commitValue, false);

                // if (!commitValue && pos.index == grid.selectFieldIndex) {
                //     grid.gridHandler.selectRow(this.form, grid, rowIndex, pos.index, result);
                // }
            }
        }
        // var items = item.items;
        // if (!items || rowIndex == -1)
        //     return;
        // var exp, pos, cxt, rowData, metaCell, result;
        // for (var i = 0, exp, pos; exp = items[i]; i++) {
        //     if ((!exp.defaultValue && !exp.formulaValue) || !exp.target)
        //         continue;
        //     rowData = grid.getRowDataAt(rowIndex);
        //     metaCell = grid.getMetaCellByKey(exp.target);
        //     cxt = this.newContext(this.form, rowIndex, -1);
        //     pos = exp.pos;
        //     if (pos.columnExpand) {
        //         if (!this.needCalc_Cell(metaCell, calcAll))
        //             continue;

        //         for (var c = 0, length = pos.indexes.length; c < length; c++) {

        //             cxt.colIndex = pos.indexes[c];

        //             result = await this.calcFormulaValue(exp, cxt);

        //             grid.setValueAt(rowIndex, pos.indexes[c], result, rowData.bookmark == null ? false : commitValue, false);

        //         }
        //     } else {
        //         if (!this.needCalc_Cell(metaCell, calcAll))
        //             continue;
        //         cxt.colIndex = pos.index;
        //         result = await this.calcFormulaValue(exp, cxt);

        //         grid.setValueAt(rowIndex, pos.index, result, rowData.bookmark == null ? false : commitValue, false);

        //         // 处理选择字段的默认值
        //         if (!commitValue && pos.index == grid.selectFieldIndex) {
        //             grid.gridHandler.selectRow(this.form, grid, rowIndex, pos.index, result);
        //         }
        //     }
        // }
    },

    doCalcGridRow: async function (grid, rowIndex, calcAll, commitValue) {
        var items = this.form.dependency.calcTree.items;
        for (var i = 0, exp; exp = items[i]; i++) {
            if (exp.objectType == YIUI.ExprItem_Type.Set && exp.source === grid.key) {
                await this.impl_calcGridRow(grid, this.newContext(this.form, rowIndex, -1), rowIndex, exp, calcAll, commitValue);
            }
        }
    },

    needCalc_Cell: function (grid, rowIndex, colIndex, cellData, metaCell, calcAll) {
        var ignoreKeys = this.form.getSysExpVals("IgnoreKeys");
        if (ignoreKeys) {
            return !metaCell.columnKey || $.inArray(metaCell.key, ignoreKeys) == -1;
        }
        return calcAll ? true : !metaCell.columnKey;
    },

    needCalc_Com: function (component, calcAll) {
        var ignoreKeys = this.form.getSysExpVals("IgnoreKeys");
        var hasDataBinding = component.isSubDetail ? (component.hasDataBinding() ||
            !component.bindingCellKey) : component.hasDataBinding();
        if (ignoreKeys) {
            return !hasDataBinding || $.inArray(component.key, ignoreKeys) == -1;
        }
        return calcAll ? true : !hasDataBinding;
    },

    needCalc_listView: function (columnInfo, calcAll) {
        var ignoreKeys = this.form.getSysExpVals("IgnoreKeys");
        if (ignoreKeys) {
            return !columnInfo.columnKey || $.inArray(columnInfo.key, ignoreKeys) == -1;
        }
        return calcAll ? true : !columnInfo.columnKey;
    },

    doAfterInsertRow: async function (component, rowIndex, emptyRow) {
        if (component.type === YIUI.CONTROLTYPE.GRID) {
            await this.doCalcGridRow(component, rowIndex, emptyRow, false);// 全部计算,不提交值
        } else {
            await this.calcListViewRow(component, rowIndex, true);
        }
    },

    calcListViewRow: function (listView, rowIndex, calcAll) {
        var items = this.form.dependency.calcTree.items;
        for (var i = 0, exp; exp = items[i]; i++) {
            if (exp.objectType === YIUI.ExprItem_Type.Set && exp.source === listView.key) {
                this.impl_calcListViewRow(listView, this.newContext(this.form, rowIndex, -1), rowIndex, exp, calcAll);
            }
        }
    },

    calcExprItemObject: async function (com, item, ctx, calcAll, commitValue) {
        switch (item.objectType) {
            case YIUI.ExprItem_Type.Item:
                await this.calcHeadItem(com, item, ctx, calcAll);
                break;
            case YIUI.ExprItem_Type.Set:
                switch (com.type) {
                    case YIUI.CONTROLTYPE.GRID:
                        await this.calcGrid(com, ctx, this.initTree(item), calcAll, commitValue);
                        break;
                    case YIUI.CONTROLTYPE.LISTVIEW:
                        await this.calcListView(com, ctx, this.initTree(item), calcAll);
                        break;
                }
        }
    },

    valueChanged: async function (comp) {
        if (this.isInAllCalculating()) {
            return;
        }
        var items = this.form.dependency.calcTree.affectItems[comp.key];

        if (!items)
            return;

        var context = this.newContext(this.form, -1, -1),
            item,
            com;
        for (var i = 0; item = items[i]; i++) {
            com = this.form.getComponent(item.source);
            if (!com)
                continue;

            await this.calcExprItemObject(com, item, context, true, true);
        }
    },

    reCalcComponent: function (component) {
        var items = this.form.dependency.calcTree.items;
        for (var i = 0, exp; exp = items[i]; i++) {
            if (exp.objectType != YIUI.ExprItem_Type.Set)
                continue;
            if (exp.source !== component.key)
                continue;
            switch (component.type) {
                case YIUI.CONTROLTYPE.GRID:
                    this.calcGrid(component, this.newContext(this.form, -1, -1), this.initTree(exp), false, false)
                    break;
                case YIUI.CONTROLTYPE.LISTVIEW:
                    this.calcListView(component, this.newContext(this.form, -1, -1), this.initTree(exp), false);
                    break;
            }
        }
        if (component.type === YIUI.CONTROLTYPE.GRID) {
            YIUI.GridSumUtil.evalSum(this.form, component);
        }
    },

    cellValueChanged: async function (grid, rowIndex, colIndex) {
        var affectItems = this.form.dependency.calcTree.affectItems;
        var rowData = grid.getRowDataAt(rowIndex);
        var cellKey = rowData.cellKeys[colIndex];
        var items = affectItems[cellKey];
        // for (var i = 0, size = affectItems.length; i < size; i++) {
        //     if (affectItems[i].key === cellKey) {
        //         items = affectItems[i];
        //         break;
        //     }
        // }
        if (items) {
            for (var i = 0, exp, component; exp = items[i]; i++) {
                component = this.form.getComponent(exp.source);
                if (!component)
                    continue;
                switch (exp.objectType) {
                    case YIUI.ExprItem_Type.Item:
                        await this.calcHeadItem(component, exp, this.newContext(this.form, -1, -1), true);
                        break;
                    case YIUI.ExprItem_Type.Set:
                        var calcInGrid = component.key === grid.key;
                        var calcParGrid = YIUI.SubDetailUtil.isSubDetail(this.form, grid, component.key);
                        if (calcInGrid) {
                            await this.impl_calcGridRow(component, this.newContext(this.form, rowIndex, -1), rowIndex, exp, true, true);
                        } else if (calcParGrid) {
                            await this.impl_calcGridRow(component, this.newContext(this.form, -1, -1), component.getFocusRowIndex(), exp, true, true);
                        } else {
                            await this.calcGrid(component, this.newContext(this.form, -1, -1), this.initTree(exp), true, true);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    },

    doAfterDeleteRow: function (grid) {
        var metaRow = grid.getDetailRow();

        var items = [], affectItems = this.form.dependency.calcTree.affectItems;;
        for (var i = 0, metaCell; metaCell = metaRow.cells[i]; i++) {
            for (var j = 0, length = affectItems.length; j < length; j++) {
                if (affectItems[j].key === metaCell.key) {
                    items.push(affectItems[j].expItems);
                }
            }
        }
        items.sort(function (item1, item2) {
            return parseInt(item1.order) - parseInt(item2.order);
        });
        for (var i = 0, exp, component; exp = items[i]; i++) {
            component = this.form.getComponent(exp.source);
            if (!component)
                continue;
            switch (exp.objectType) {
                case YIUI.ExprItem_Type.Item:
                    this.calcHeadItem(component, exp, this.newContext(this.form, -1, -1), true);
                    break;
                case YIUI.ExprItem_Type.Set:
                    if (YIUI.SubDetailUtil.isSubDetail(this.form, grid, component.key)) {
                        this.impl_calcGridRow(component, this.newContext(this.form, -1, -1), component.getFocusRowIndex(), exp, true, true);
                    }
                    break;
            }
        }
    },

    // 表格汇总没加--一般不会在子明细添加汇总
    calcSubDetail: function (grid, calcAll) {
        var items = this.form.dependency.calcTree.items;
        for (var i = 0, exp, component; exp = items[i]; i++) {
            component = this.form.getComponent(exp.source);
            if (!component || !YIUI.SubDetailUtil.isSubDetail(this.form, component, grid.key))
                continue;
            switch (exp.objectType) {
                case YIUI.ExprItem_Type.Item:
                    this.calcHeadItem(component, exp, this.newContext(this.form, -1, -1), calcAll);
                    break;
                case YIUI.ExprItem_Type.Set:
                    switch (component.type) {
                        case YIUI.CONTROLTYPE.GRID:
                            this.calcGrid(component, this.newContext(this.form, -1, -1), this.initTree(exp), calcAll, false);
                            break;
                        case YIUI.CONTROLTYPE.LISTVIEW:
                            this.calcListView(component, this.newContext(this.form, -1, -1), this.initTree(exp), calcAll);
                            break;
                    }
                    break;
            }
        }
    }

});
// })();