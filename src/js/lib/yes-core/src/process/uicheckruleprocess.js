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
// var YIUI = YIUI || {};
// (function () {
YIUI.UICheckRuleProcess = YIUI.extend(YIUI.AbstractUIProcess, {
    init: function (form) {
        this.base(form);
    },

    calcAll: function () {
        this.checkGlobal();

        this.calcAllComponents(this.enableOnly());

        this.checkGridRows();
    },

    checkGlobal: function () {
        if (this.enableOnly()) {
            if (this.form.isError()) {
                this.form.setError(false, null);
            }
            return;
        }
        var globalItems = this.form.dependency.checkRuleTree.globalItems;
        if (!globalItems)
            return;
        for (var i = 0, size = globalItems.length; i < size; i++) {
            var exp = globalItems[i];
            if (!exp.content)
                continue;
            var result = this.form.eval(exp.content, this.newContext(this.form, -1, -1));
            if (typeof result === 'string') {
                if (result) {
                    if (!this.form.isError) {
                        this.form.setError(true, result, this.form.formKey);
                    }
                    break;
                } else {
                    if (this.form.isError() && this.form.errorInfo.errorSource &&
                        this.form.errorInfo.errorSource === this.form.formKey) {
                        this.form.setError(false, null, null);
                    }
                }
            } else {
                if (result) {
                    if (this.form.isError() && this.form.errorInfo.errorSource &&
                        this.form.errorInfo.errorSource === this.form.formKey) {
                        this.form.setError(false, null, null);
                    }
                } else {
                    this.form.setError(true, exp.errorMsg, this.form.formKey);
                    break;
                }
            }
        }
    },

    calcAllComponents: function (enableOnly) {
        var items = this.form.dependency.checkRuleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            var component = this.form.getComponent(items[i].source);
            if (!component || component.getMetaObj().isSubDetail)
                continue;
            switch (items[i].objectType) {
                case YIUI.ExprItem_Type.Item:
                    this.checkHead(component, items[i], enableOnly, false);
                    break;
                case YIUI.ExprItem_Type.Set:
                    this.checkGrid(component, this.initTree(items[i]), enableOnly, false);
                    break;
            }
        }
    },

    checkHead: async function (component, item, enableOnly, checkBindCell) {
        if (component.type == YIUI.CONTROLTYPE.GRID) {
            return;
            if (!item.target)
                return;
            var cellLocation = this.form.getCellLocation(item.target);
            var index = item.pos.index;

            var cellData = component.getCellDataAt(cellLocation.row, index);
            var editOpt = component.getCellEditOpt(item.target);
            if (enableOnly && !cellData[2]) {
                if (cellData[3]) {
                    component.setCellRequired(cellLocation.row, index, false);
                }
                if (cellData[4]) {
                    component.setCellError(cellLocation.row, index, false, "");
                }
                return;
            }
            // 计算必填
            if (editOpt.isRequired) {
                component.setCellRequired(cellLocation.row, index, cellData[1] == null || cellData[1] == "");
            }
            // 计算检查规则
            if (item.content) {
                var result = await this.calcCheckRule(item, this.newContext(this.form, -1, -1));
                if (typeof result === 'string') {
                    component.setCellError(cellLocation.row, index, result, result);
                } else {
                    component.setCellError(cellLocation.row, index, !result, result ? null : item.errorMsg);
                }
            }
        } else {
            if (enableOnly && !component.isEnable()) {
                if (component.isRequired()) {
                    component.setRequired(false);
                }
                if (component.isError()) {
                    component.setError(false, null);
                }
                return;
            }
            // 计算必填
            if (component.getMetaObj().required) {
                component.setRequired(component.isNull());
            }
            if (item.content) {
                var result = await this.calcCheckRule(item, this.newContext(this.form, -1, -1));
                if (typeof result === 'string') {
                    component.setError(result, result);
                } else {
                    component.setError(!result, result ? null : item.errorMsg);
                }
            }
            // 如果是子明细组件
            if (component.getMetaObj().isSubDetail) {
                var cellData = YIUI.SubDetailUtil.getBindingCellData(this.form, component);
                if (cellData) {
                    if (!component.getMetaObj().required) {
                        component.setRequired[cellData[3]];
                    }
                    if (!item.content && cellData[4]) {
                        component.setError(true, cellData[5]);
                    }
                }
                // 检查绑定的表格当前行的单元格
                var grid = YIUI.SubDetailUtil.getBindingGrid(this.form, component);
                var rowIndex = grid.getFocusRowIndex();
                if (checkBindCell && cellData != null && rowIndex != -1) {
                    var bindingCellKey = component.bindingCellKey;
                    var location = this.form.getCellLocation(bindingCellKey);
                    grid.setCellError(rowIndex, location.column, component.isError(), component.getErrorMsg());
                }
            }
            // 如果当前控件不可见,那么将错误显示在表头
            if (!component.isVisible()) {
                if (!this.form.isError() || this.form.formKey != this.form.errorInfo.errorSource) {
                    if (component.isError()) {
                        this.form.setError(true, component.getErrorMsg(), component.key);
                    }
                    if (component.isRequired()) {
                        this.form.setError(true, component.caption + "is Required", component.key);
                    }
                }
            } else {
                if (this.form.isError() && this.form.errorInfo.errorSource === component.key) {
                    this.form.setError(false, null, null);
                }
            }
        }
    },

    checkGrid: function (grid, item, enableOnly, checkSubDetails) {
        for (var i = 0, size = grid.getRowCount(); i < size; i++) {
            // var row = grid.getRowDataAt(i);
            if (!grid.isRowDetail())
                continue;
            this.checkGridRowCell(grid, i, null, item, enableOnly, checkSubDetails);
        }
    },

    checkGridRowCell: async function (grid, rowIndex, specialInfo, item, enableOnly, checkSubDetail) {
        if (!item.items)
            return;

        var _this = this;

        var checkSingleItem = async function (grid, rowIndex, editOpt, idx, cxt, item, enableOnly) {
            var cellData = grid.getCellDataAt(rowIndex, idx);

            if (enableOnly && !cellData[2]) {
                if (cellData[3]) {
                    grid.setCellRequired(rowIndex, idx, false);
                }
                if (cellData[4]) {
                    grid.setCellError(rowIndex, idx, false, null);
                }
                return;
            }
            // 计算必填
            if (editOpt.isRequired) {
                grid.setCellRequired(rowIndex, idx, cellData[0] == null || cellData[0] == "");
            }
            // 计算检查规则
            if (item.content) {
                var result = await _this.calcCheckRule(item, cxt);
                if (typeof result === 'string') {
                    grid.setCellError(rowIndex, idx, result, result);
                } else {
                    grid.setCellError(rowIndex, idx, !result, result ? null : item.errorMsg);
                }
            }
        }

        var exp, pos, cxt, editOpt, specialLoc = specialInfo || -1, specialKey = specialInfo || null;
        for (var i = 0, size = item.items.length; i < size; i++) {
            exp = item.items[i], pos = exp.pos;

            cxt = this.newContext(this.form, rowIndex, -1);
            editOpt = grid.getCellEditOpt(exp.target);

            if (pos.columnExpand) {
                // 计算多次
                for (var p = 0, length = pos.indexes.length; p < length; p++) {

                    // 拓展单元格跳过不需要计算的
                    if (specialLoc != -1 && exp.target === specialKey && p !== specialLoc)
                        continue;

                    cxt.colIndex = pos.indexes[p];

                    await checkSingleItem(grid, rowIndex, editOpt, pos.indexes[p], cxt, exp, this.enableOnly());
                }
            } else {

                await checkSingleItem(grid, rowIndex, editOpt, pos.index, cxt, exp, this.enableOnly());

                // 子明细
                if (checkSubDetail && grid.getFocusRowIndex() == rowIndex) {
                    var subDetails = this.form.getCellSubDtlComps(grid.key, exp.target);
                    if (subDetails && subDetails.length > 0) {
                        var cellData = grid.getCellDataAt(rowIndex, pos.index);
                        for (var c = 0, count = subDetails.length; c < count; c++) {
                            subDetails[c].setError(cellData[4], cellData[5]);
                        }
                    }
                }
            }
        }
    },

    doAfterInsertRow: function (component, rowIndex) {
        if (component.type != YIUI.CONTROLTYPE.GRID)
            return;
        // var row = component.getRowDataAt(rowIndex);
        if (!component.isRowDetail(rowIndex))
            return;
        var items = this.form.dependency.checkRuleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            if (items[i].objectType == YIUI.ExprItem_Type.Set && items[i].source === component.key) {
                this.checkGridRowCell(component, rowIndex, null, items[i], this.enableOnly(), false);
            }
        }
        this.checkGridRowCheckRule(component, rowIndex);

        this.impl_valueChanged(component, component.key + ":RowCount");

        this.checkGlobal();
    },

    doAfterDeleteRow: function (grid) {

        this.impl_valueChanged(grid, grid.key + ":RowCount");

        this.checkGlobal();
    },

    checkGridRows: function () {
        if (this.enableOnly())
            return;
        var gridMap = this.form.getGridInfoMap();
        for (var i = 0, size = gridMap.length; i < size; i++) {
            var gridInfo = gridMap[i];
            var grid = this.form.getComponent(gridInfo.key);
            for (var c = 0, length = grid.getRowCount(); c < length; c++) {
                this.checkGridRowCheckRule(grid, c);
            }
        }
    },

    checkGridRowCheckRule: function (grid, rowIndex) {
        var rowCheckRules = grid.getMetaObj().rowCheckRules;
        // var rowData = grid.getRowDataAt(rowIndex);
        if (!rowCheckRules || grid.getRowType(rowIndex) !== 'Detail')
            return;
        for (var k = 0, len = rowCheckRules.length; k < len; k++) {
            var rowCheckRule = rowCheckRules[k];
            var result = this.calcCheckRule(rowCheckRule, this.newContext(this.form, rowIndex, -1));
            if (typeof result === 'string') {
                grid.setRowError(rowIndex, result, result);
            } else {
                grid.setRowError(rowIndex, !result, result ? null : rowCheckRule.errorMsg);
            }
        }
    },

    reCalcComponent: function (component) {
        var items = this.form.dependency.checkRuleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            if (items[i].objectType != YIUI.ExprItem_Type.Set)
                continue;
            if (items[i].source !== component.key)
                continue;

            // 检查表格
            this.checkGrid(component, this.initTree(items[i]), this.enableOnly(), true);
        }
        if (component.type == YIUI.CONTROLTYPE.GRID) {
            for (var i = 0, size = component.getRowCount(); i < size; i++) {
                this.checkGridRowCheckRule(component, i);
            }
        }
        this.checkGlobal();
    },

    valueChanged: async function (component) {
        var needCheck = false;
        if (component.getMetaObj().isSubDetail) {
            var grid = YIUI.SubDetailUtil.getBindingGrid(this.form, component);
            needCheck = component.bindingCellKey && grid.getCellEditOpt(component.bindingCellKey).isRequired;
        }
        if (component.getMetaObj().required || needCheck) {
            component.setRequired(component.isNull());
        }

        // 计算影响项
        await this.impl_valueChanged(component, component.key);

        // 如果是子明细组件,如果绑定了单元格,则联动显示,如果没有绑定单元格,检查一下当前行行的检查规则
        if (component.getMetaObj().required && component.bindingCellKey) {
            var grid = YIUI.SubDetailUtil.getBindingGrid(this.form, component);
            if (grid && grid.getFocusRowIndex() != -1) {
                this.checkGridRowCheckRule(grid, grid.getFocusRowIndex());
            }
        }

        //算全局的检查规则
        this.checkGlobal();
    },

    impl_valueChanged: async function (component, key) {
        var items = this.form.dependency.checkRuleTree.affectItems[key];
        if (!items)
            return;
        for (var i = 0, size = items.length; i < size; i++) {
            var exp = items[i];
            var com = this.form.getComponent(exp.source);
            if (!com)
                continue;
            switch (exp.type) {
                case YIUI.ExprItem_Type.Item:
                    await this.checkHead(com, exp, this.enableOnly(), true);
                    break;
                case YIUI.ExprItem_Type.Set:

                    var calcParGrid = YIUI.SubDetailUtil.isSubDetail(this.form, component, com.key);

                    if (calcParGrid) {
                        this.checkGridRowCell(com, com.getFocusRowIndex(), null, this.initTree(exp), this.enableOnly(), true);
                    } else {
                        this.checkGrid(com, this.initTree(exp), this.enableOnly(), true);
                    }
                    break;
                default:
                    break;
            }
        }
    },

    cellValueChanged: async function (grid, rowIndex, colIndex) {
        var rowData = grid.getRowDataAt(rowIndex);
        if (rowData.rowType !== "Detail" && rowData.rowType !== "Fix")
            return;
        // var rowData = grid.getRowDataAt(rowIndex);
        var cellKey = rowData.cellKeys[colIndex];
        var editOpt = grid.getCellEditOpt(cellKey);

        var cellData = grid.getCellDataAt(rowIndex, colIndex);
        if (editOpt.isRequired) {
            grid.setCellRequired(rowIndex, colIndex, cellData == null || cellData == "");
        }
        var affectItems = this.form.dependency.checkRuleTree.affectItems;
        var items = null;
        for (var i = 0, size = affectItems.length; i < size; i++) {
            if (affectItems[i].key === cellKey) {
                items = affectItems[i];
                break;
            }
        }
        if (items) {
            for (var i = 0, size = items.expItems.length; i < size; i++) {
                var exp = items.expItems[i];
                var component = this.form.getComponent(exp.source);
                if (!component)
                    continue;
                switch (exp.objectType) {
                    case YIUI.ExprItem_Type.Item:
                        await this.checkHead(component, exp, this.enableOnly(), true);
                        break;
                    case YIUI.ExprItem_Type.Set:
                        if (rowData.isDetail && component.key == grid.key) {
                            await this.checkGridRowCell(component, rowIndex, { specialLoc: colIndex, specialKey: cellKey }, exp, this.enableOnly(), true);
                        } else {
                            await this.checkGrid(component, this.initTree(exp), this.enableOnly(), true);
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        //重算当前行的检查规则
        this.checkGridRowCheckRule(grid, rowIndex);

        //算全局的检查规则
        this.checkGlobal();
    },

    calcSubDetail: function (grid) {
        var items = this.form.dependency.checkRuleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            var exp = items[i];
            var component = this.form.getComponent(exp.source);
            if (!component)
                continue;
            switch (exp.objectType) {
                case YIUI.ExprItem_Type.Item:
                    this.checkHead(component, exp, this.enableOnly(), false);
                    break;
                case YIUI.ExprItem_Type.Set:
                    this.checkGrid(component, this.initTree(exp), this.enableOnly(), false);
                    break;
                default:
                    break;
            }
        }
    }

});
// })();
