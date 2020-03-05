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
// (function () {
export default YIUI.UIVisibleProcess = YIUI.extend(YIUI.AbstractUIProcess, {
    VisibleItemType: {
        Head: 0,
        Column: 1,
        Operation: 2
    },
    init: function (form) {
        this.base(form);
    },

    calcExprItemObject: async function (component, item, defaultValue) {
        switch (item.objectType) {
            case YIUI.ExprItem_Type.Item:
                await this.calcHeadItem(component, item, defaultValue);
                break;
            case YIUI.ExprItem_Type.Set:
                switch (component.type) {
                    case YIUI.CONTROLTYPE.GRID:
                        await this.calcGrid(component, this.initTree(item), this.newContext(this.form, -1, -1));
                        break;
                    case YIUI.CONTROLTYPE.LISTVIEW:
                        await this.calcListView(component, this.initTree(item), this.newContext(this.form, -1, -1));
                        break;
                }
                break;
        }
    },

    calcAll: async function () {
        var items = this.form.dependency.visibleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            var exp = items[i];
            var component = this.form.getComponent(exp.source);
            if (!component)
                continue;
            await this.calcExprItemObject(component, exp);
        }
    },

    calcSubDetail: function (grid) {
        var items = this.form.dependency.visibleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            var exp = items[i];
            var component = this.form.getComponent(exp.source);
            if (!component || YIUI.SubDetailUtil.isSubDetail(this.form, component, grid.key));
            continue;
            this.calcExprItemObject(component, exp);
        }
    },

    calcHeadItem: async function (component, item, defaultValue) {
        // 伙伴组件不计算
        if ($.inArray(item.source, this.form.buddyKeys) !== -1)
            return;
        var visible = await this.calcVisible(item, this.newContext(this.form, -1, -1), defaultValue);
        var oldVisible = component.isVisible();
        // 设置可见性
        component.setVisible(visible, false);

        // 如果组件不可见且带有错误信息,那么显示在表单上
        // 如果此时为错误,计算检查规则后正确,不影响显示
        if (oldVisible !== visible) {
            if (!visible) {
                if (!this.form.isError() || this.form.formKey != this.form.errorInfo.errorSource) {
                    if (component.isError()) {
                        this.form.setError(true, component.errorInfo.msg, component.key);
                    }
                    if (component.isRequired() && !component.getValue()) {
                        this.form.setError(true, component.caption + "is Required", component.key);
                    }
                }
            } else { // 否则清除表单的错误信息
                if (this.form.isError() && this.form.errorInfo.errorSource == component.key) {
                    this.form.setError(false, null);
                }
            }
        }
    },

    calcListView: async function (listView, item, context) {
        var items = item.items;
        if (!items)
            return;
        for (var i = 0, size = item.items.length; i < size; i++) {
            var exp = item.items[i];
            if (exp.type != this.VisibleItemType.Column)
                continue;
            var visible = await this.calcVisible(exp, context);
            listView.setColumnVisible(exp.target, visible);
        }
    },

    calcGrid: async function (grid, item, cxt) {
        var items = item.items;
        if (!items)
            return;
        var unVisible = this.form.dependency.unVisibleKeys, visible, exp, pos;
        for (var i = 0, size = item.items.length; i < size; i++) {
            exp = item.items[i], pos = exp.pos;
            if (exp.type != this.VisibleItemType.Column)
                continue;
            if (pos.columnExpand) {
                for (var k = 0, length = pos.indexes.length; k < length; k++) {
                    cxt.colIndex = pos.indexes[k];
                    if (unVisible && $.inArray(exp.target, unVisible) != -1) {
                        visible = false;
                    } else {
                        visible = await this.calcVisible(exp, cxt);
                    }
                    grid.setColumnVisible(pos.indexes[k], visible);
                }
            } else {
                if (unVisible && $.inArray(exp.target, unVisible) != -1) {
                    visible = false;
                } else {
                    visible = await this.calcVisible(exp, cxt);
                }
                grid.setColumnVisible(pos.index, visible);
            }
        }
    },

    valueChanged: async function (comp) {
        var affectItem = this.form.dependency.visibleTree.affectItems[comp.key];
        if (affectItem) {
            for (var i = 0, size = affectItem.length; i < size; i++) {
                var exp = affectItem[i];
                var com = this.form.getComponent(exp.source);
                switch (exp.objectType) {
                    case YIUI.ExprItem_Type.Item:
                        if (exp.type == this.VisibleItemType.Operation) {
                            this.form.setOperationVisible(exp.target, await this.calcVisible(exp, this.newContext(this.form, -1, -1)), true);
                        } else {
                            await this.calcHeadItem(com, exp, true);
                        }
                        break;
                    case YIUI.ExprItem_Type.Set:
                        switch (com.type) {
                            case YIUI.CONTROLTYPE.GRID:
                                await this.calcGrid(com, exp, this.newContext(this.form, -1, -1));
                                break;
                            case YIUI.CONTROLTYPE.LISTVIEW:
                                await this.calcListView(com, exp, this.newContext(this.form, -1, -1));
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    },

    reCalcComponent: function (component) {
        var items = this.form.dependency.visibleTree.items;
        for (var i = 0, size = items.length; i < size; i++) {
            if (items[i].objectType != YIUI.ExprItem_Type.Set)
                continue;
            if (items[i].source !== component.key)
                continue;
            switch (component.type) {
                case YIUI.CONTROLTYPE.GRID:
                    this.calcGrid(component, items[i], this.newContext(this.form, -1, -1));
                    break;
                case YIUI.CONTROLTYPE.LISTVIEW:
                    this.calcListView(component, items[i], this.newContext(this.form, -1, -1));
                    break;
            }
        }
    },

    cellValueChanged: function (grid, rowIndex, colIndex) {
        var ctx = this.newContext(this.form, rowIndex, colIndex);
        var rowData = grid.getRowDataAt(rowIndex);
        var cellKey = rowData.cellKeys[colIndex];

        var affectItems = this.form.dependency.visibleTree.affectItems;
        var affectItem;
        for (var i = 0, len = affectItems.length; i < len; i++) {
            if (affectItems[i].key === cellKey) {
                affectItem = affectItems[i];
                break;
            }
        }
        if (affectItem) {
            for (var i = 0, size = affectItem.expItems.length; i < size; i++) {
                var exp = affectItem.expItems[i];

                var component = this.form.getComponent(exp.source);
                if (!component)
                    continue;

                switch (exp.objectType) {
                    case YIUI.ExprItem_Type.Item:
                        this.calcHeadItem(component, exp, true);
                        break;
                    case YIUI.ExprItem_Type.Set:
                        switch (component.type) {
                            case YIUI.CONTROLTYPE.Grid:
                                this.calcGrid(component, items[i], ctx);
                                break;
                            case YIUI.CONTROLTYPE.LISTVIEW:
                                this.calcListView(component, items[i], ctx);
                                break;
                        }
                }
            }
        }
    },

    doAfterDeleteRow: function (grid) {
        // TODO Auto-generated method stub
    },

    doAfterInsertRow: function (grid, rowIndex) {
        // TODO Auto-generated method stub
    }

});
// })();