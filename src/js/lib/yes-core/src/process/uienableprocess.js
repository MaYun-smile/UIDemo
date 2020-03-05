/**
 * Created by 陈瑞 on 2017/3/2 use WebStorm.
 */
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import '../YIUI-svr';
import { lodash as $ } from 'yes-common';
import '../uiprocess';
import '../abstractuiprocess';
import '../yes-ui';
import '../utils/viewutil';
// var YIUI = YIUI || {};
// (function () {
export default YIUI.UIEnableProcess = YIUI.extend(YIUI.AbstractUIProcess, {
    EnableItemType: {
        Head: 0,
        List: 1,
        Column: 2,
        Operation: 3
    },

    init: function (form) {
        this.base(form);
    },

    calcExprItemObject: async function (com, item, fireEvent) {
        switch (item.objectType) {
            case YIUI.ExprItem_Type.Item:
                if (item.type == this.EnableItemType.Operation) {
                    this.form.setOperationEnable(item.target, await this.form.eval(item.content, this.newContext(this.form, -1, -1), null));
                } else {
                    await this.calcHeadItem(com, item, fireEvent);
                }
                break;
            case YIUI.ExprItem_Type.Set:
                switch (com.type) {
                    case YIUI.CONTROLTYPE.GRID:
                        await this.calcGrid(com, this.initTree(item), fireEvent);
                        break;
                    case YIUI.CONTROLTYPE.LISTVIEW:
                        await this.calcListView(com, this.initTree(item));
                        break;
                }
                break;
        }
    },

    calcHeadItem: async function (component, item, defaultValue, calcBindCell) {
        // 固定行单元格
        if (component.type == YIUI.CONTROLTYPE.GRID && item.target && item.source !== item.target) {
            return;
            // var cellLoc = this.form.getCellLocation(item.target);
            // var context = this.newContext(this.form, cellLoc.row, -1);

            // var accessControl = YIUI.ViewUtil.checkCellAccessControl(this.form, component, cellLoc.row, item.target);

            // var enable = await this.calcEnable(item, context, defaultValue, accessControl);

            // var pos = item.pos;
            // if (pos.columnExpand) {
            //     for (var i = 0, size = pos.indexes.length; i < size; i++) {
            //         component.setCellEnable(cellLoc.row, item.pos.indexes[i], enable);
            //     }
            // } else {
            //     component.setCellEnable(cellLoc.row, item.pos.index, enable);
            // }
        } else {
            var context = this.newContext(this.form, -1, -1);

            var accessControl = YIUI.ViewUtil.checkComAccessControl(this.form, component);

            var enable = await this.calcEnable(item, context, defaultValue, accessControl);

            component.setEnable(enable, false);

            if (calcBindCell && component.isSubDetail && component.bindingCellKey) {
                var grid = YIUI.SubDetailUtil.getBindingGrid(this.form, component);
                var rowIndex = grid.getFocusRowIndex();
                if (rowIndex != -1) {
                    var colIndex = grid.getCellIndexByKey(component.bindingCellKey);
                    grid.setCellEnable(rowIndex, colIndex, enable);
                }
            }
        }
    },

    calcGrid: async function (grid, item, formEnable, calcSubDetails) {

        // this.calcGridColumns(this.newContext(this.form,-1,-1),grid,item,this.getFormEnable());

        await this.calcGridRows(this.newContext(this.form, -1, -1), grid, item, await this.getFormEnable(), calcSubDetails);

        // 计算全选按钮,如果是新增,el没有,在reloadGrid中计算
        // grid.refreshSelectEnable();
    },

    // calcGridColumns:function (context,grid,item,formEnable) {
    //     var items = item.items;
    //     if( !items )
    //         return;
    //     for( var i = 0,size = items.length;i < size;i++ ) {
    //         if( items[i].type == this.EnableItemType.Column ) {
    //             var enable = this.calcEnable(items[i],this.newContext(this.form,-1,-1),this.getFormEnable(),true);
    //             var pos = items[i].pos;
    //             if( pos.columnExpand ) {
    //                 for( var i = 0,size = pos.indexes.length;i < size;i++ ) {
    //                     grid.setColumnEnable(pos.indexes[i],enable);
    //                 }
    //             } else {
    //                 grid.setColumnEnable(pos.index,enable);
    //             }
    //         }
    //     }
    // },

    calcGridRows: async function (context, grid, item, formEnable, calcSubDetails) {
        var items = item.items;
        if (!items)
            return;
        console.time('calcGridRows');
        for (var i = 0, size = grid.getRowCount(); i < size; i++) {
            if (!grid.isRowDetail(i))
                continue;
            context.rowIndex = i;
            await this.impl_calcGridRow(context, grid, i, item, formEnable, calcSubDetails);
        }
        console.timeEnd('calcGridRows');
    },

    impl_calcGridRow: async function (context, grid, rowIndex, item, calcSubDetails) {
        if (rowIndex == -1)
            return;
        for (var i = 0, exp, pos; (exp = item.items[i]) && (pos = exp.pos); i++) {
            if (exp.type != this.EnableItemType.List || !exp.target)
                continue;
            // console.time('calcgridrow_1');
            // var access = YIUI.ViewUtil.checkCellAccessControl(this.form, grid, rowIndex, exp.target);
            // console.timeEnd('calcgridrow_1');
            if (pos.columnExpand) {
                for (var c = 0, size = pos.indexes.length; c < size; c++) {
                    context.colIndex = pos.indexes[c];
                    enable = await this.calcEnable(exp, context, this.getFormEnable(), access);
                    grid.setCellEnable(rowIndex, pos.indexes[c], enable);
                }
            } else {
                var access = YIUI.ViewUtil.checkCellAccessControl(this.form, grid, rowIndex, exp.target);
                var enable = await this.calcEnable(exp, context, this.getFormEnable(), access);
                grid.setCellEnable(rowIndex, pos.index, enable);
                if (calcSubDetails && grid.getFocusRowIndex() != -1) {
                    var subDetails = this.form.getCellSubDtlComps(grid.key, exp.target);
                    if (!subDetails)
                        continue;
                    for (var j = 0, length = subDetails.length; j < length; j++) {
                        subDetails[j].setEnable(enable);
                    }
                }
            }
        }
    },

    calcListViewColumns: async function (listView, item, formEnable) {
        var items = item.items;
        if (!items)
            return;
        for (var i = 0, size = items.length; i < size; i++) {
            if (items[i].type != this.EnableItemType.Column)
                continue;
            var enable = await this.calcEnable(items[i], this.newContext(this.form, -1, -1), formEnable, true);
            listView.setColumnEnable(items[i].target, enable);
        }
    },

    calcSubDetail: function (gridKey) {
        var items = this.form.dependency.enableTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            var component = this.form.getComponent(items[i].source);
            if (!component || !YIUI.SubDetailUtil.isSubDetail(this.form, component, gridKey))
                continue;
            switch (items[i].objectType) {
                case YIUI.ExprItem_Type.Item:
                    var cell = YIUI.SubDetailUtil.getBindingCellData(this.form, component);
                    this.calcHeadItem(component, items[i], cell ? cell[2] : this.getFormEnable(), false);
                    break;
                case YIUI.ExprItem_Type.Set:
                    switch (component.type) {
                        case YIUI.CONTROLTYPE.GRID:
                            this.calcGrid(component, this.initTree(items[i]), this.getFormEnable(), false);
                            break;
                        case YIUI.CONTROLTYPE.LISTVIEW:
                            this.calcListViewColumns(component, this.initTree(items[i]), this.getFormEnable());
                            break;
                        default:
                            break;
                    }
            }
        }
    },

    cellValueChanged: async function (grid, rowIndex, colIndex) {
        var rowData = grid.getRowDataAt(rowIndex);
        var cellKey = rowData.cellKeys[colIndex];
        var context = this.newContext(this.form, rowIndex, colIndex);

        await this.impl_ValueChanged(grid, context, rowIndex, cellKey);
    },

    valueChanged: async function (comp) {
        var affectItem = this.form.dependency.enableTree.affectItems[comp.key];
        if (affectItem) {
            for (var i = 0, size = affectItem.length; i < size; i++) {
                var exp = affectItem[i];
                var com = this.form.getComponent(exp.source);
                switch (exp.objectType) {
                    case YIUI.ExprItem_Type.Item:
                        if (exp.type == this.EnableItemType.Operation) {
                            this.form.setOperationEnable(exp.target, await this.calcEnable(exp, this.newContext(this.form, -1, -1)), true);
                        } else {
                            await this.calcHeadItem(com, exp, await this.getFormEnable(), true);
                        }
                        break;
                    case YIUI.ExprItem_Type.Set:
                        switch (com.type) {
                            case YIUI.CONTROLTYPE.GRID:
                                await this.calcGrid(com, this.initTree(exp), await this.getFormEnable(), true);
                                break;
                            case YIUI.CONTROLTYPE.LISTVIEW:
                                await this.calcListViewColumns(com, this.initTree(exp), await this.getFormEnable());
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    },

    impl_ValueChanged: async function (grid, context, rowIndex, cellKey) {
        var items = this.form.dependency.enableTree.affectItems[cellKey];

        if (!items)
            return;

        var item,
            com;

        for (var i = 0; item = items[i]; i++) {
            com = this.form.getComponent(item.source);
            if (!com && item.type !== this.EnableItemType.Operation)
                continue;
            switch (item.objectType) {
                case YIUI.ExprItem_Type.Item:
                    if (item.type == this.EnableItemType.Operation) {
                        this.form.setOperationEnable(item.target, await this.form.eval(item.content, this.newContext(this.form, -1, -1), null));
                    } else {
                        await this.calcHeadItem(com, item, true);
                    }
                    break;
                case YIUI.ExprItem_Type.Set:
                    if (grid.key === com.key && cellKey.indexOf(":RowIndex") == -1) {
                        context.rowIndex = rowIndex;
                        await this.impl_calcGridRow(context, grid, rowIndex, item, true);
                    } else if (YIUI.SubDetailUtil.isSubDetail(this.form, grid, com.key)) {
                        context.rowIndex = com.getFocusRowIndex();
                        await this.impl_calcGridRow(context, com, com.getFocusRowIndex(), item, true);
                    } else {
                        await this.calcGrid(com, item, true);
                    }
                    break;
                default:
                    break;
            }
        }
    },

    doAfterDeleteRow: function (grid) {
        var ctx = this.newContext(this.form, -1, -1);

        // 计算行数改变的影响
        this.impl_ValueChanged(grid, ctx, -1, grid.key + ":RowCount");

        // 计算行号改变的影响
        this.impl_ValueChanged(grid, ctx, -1, grid.key + ":RowIndex");
    },

    doAfterInsertRow: async function (component, rowIndex) {
        if (component.type != YIUI.CONTROLTYPE.GRID)
            return;
        await this.calcGridRow(component, rowIndex);
    },

    doAfterRowChanged: function (grid) {
        var ctx = this.newContext(this.form, -1, -1);
        // 计算行号改变的影响
        this.impl_ValueChanged(grid, ctx, -1, grid.key + ":RowIndex");
    },

    calcGridRow: async function (grid, rowIndex) {
        var ctx = this.newContext(this.form, rowIndex, -1);
        var items = this.form.dependency.enableTree.items;

        for (var i = 0, size = items.length; i < size; i++) {
            if (items[i].objectType == YIUI.ExprItem_Type.Set && items[i].source === grid.key) {
                await this.impl_calcGridRow(ctx, grid, rowIndex, items[i], this.getFormEnable(), false);
            }
        }

        // 计算行数改变的影响
        this.impl_ValueChanged(grid, ctx, -1, grid.key + ":RowCount");

        // 计算行号改变的影响
        this.impl_ValueChanged(grid, ctx, -1, grid.key + ":RowIndex");
    },

    reCalcComponent: function (component) {
        var items = this.form.dependency.enableTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            if (items[i].source !== component.key)
                continue;
            switch (component.type) {
                case YIUI.CONTROLTYPE.GRID:
                    if (items[i].objectType == YIUI.ExprItem_Type.Set) {
                        this.calcGrid(component, items[i], this.getFormEnable(), false);
                    } else {
                        this.calcHeadItem(component, items[i], this.getFormEnable(), false);// 表格本身或者固定行单元格
                    }
                    break;
                case YIUI.CONTROLTYPE.LISTVIEW:
                    if (items[i].objectType == YIUI.ExprItem_Type.Set) {
                        this.calcListViewColumns(component, this.initTree(items[i]), this.getFormEnable(), false);
                    } else {
                        this.calcHeadItem(component, items[i], this.getFormEnable(), false);// ListView本身
                    }
                    break;
            }
        }
    },

    calcAll: async function () {
        var items = this.form.dependency.enableTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            var exp = items[i];
            var component = this.form.getComponent(exp.source);
            if (!component)
                continue;
            switch (exp.objectType) {
                case YIUI.ExprItem_Type.Item:
                    await this.calcHeadItem(component, exp, await this.getFormEnable(), false);
                    break;
                case YIUI.ExprItem_Type.Set:
                    switch (component.type) {
                        case YIUI.CONTROLTYPE.GRID:
                            await this.calcGrid(component, exp, await this.getFormEnable(), false);
                            break;
                        case YIUI.CONTROLTYPE.LISTVIEW:
                            await this.calcListViewColumns(component, exp, await this.getFormEnable());
                            break;
                    }
                    break;
            }
        }
    }
});
// })();