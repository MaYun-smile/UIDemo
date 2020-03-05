import { YIUI } from '../YIUI-base';
import { DataDef } from '../YIUI-common';
import { View } from '../YIUI-parser';
import '../YIUI-svr';
import '../yes-ui';
import Decimal from 'decimal.js'
import GridHandler from '../handlers/gridhandler';
import { lodash as $ } from 'yes-common';

YIUI.GridColumnExpand = YIUI.extend({
    form: null,
    grid: null,
    groups: null,

    init: function (form, grid) {
        this.form = form;
        this.grid = grid;
        this.groups = [];
    },

    extractExpandSources: async function (metaColumn) {
        var columnExpand = metaColumn.columnExpand;
        var colKey = metaColumn.key;
        var tableKey = this.grid.tableKey;
        if (!tableKey) {
            tableKey = columnExpand.tableKey;
        }
        var dataTable = this.form.getDocument().getByKey(tableKey),
            columnKey = columnExpand.columnKey;
        var column = dataTable.getColByKey(columnKey),
            dataType = column.type, items = [];

        var cxt = new View.Context(this.form);

        if (columnExpand.expandSourceType == YIUI.ExpandSourceType.DATA) {
            var set = [];
            dataTable.beforeFirst();
            while (dataTable.next()) {
                value = dataTable.getByKey(columnKey);
                if (set.indexOf(value) == -1) {
                    set.push(value);
                }
            }
            for (var i = 0; value = set[i]; i++) {
                if (value == null || (dataType == YIUI.DataType.INT && YIUI.TypeConvertor.toInt(value) == 0)) {
                    continue;
                }
                items.push(new YIUI.ExpandItem(value, value.toString(), dataType));
            }
        } else {
            var source = columnExpand.content;
            if (!source) {
                throw new Error("expand content undefind");
            }

            var result = await this.form.eval(source, cxt),
                value,
                caption;

            if (result instanceof DataDef.DataTable) {
                result.beforeFirst();
                while (result.next()) {
                    value = YIUI.TypeConvertor.toDataType(dataType, result.get(0));
                    caption = YIUI.TypeConvertor.toString(result.get(1));
                    items.push(new YIUI.ExpandItem(value, caption, dataType));
                }
            } else if (typeof result == "string") {
                var ret = YIUI.TypeConvertor.toString(result);
                if (ret.length > 0) {
                    var v = ret.split(";"), item, idx, value, caption;
                    for (var j = 0; item = v[j]; j++) {
                        idx = item.indexOf(",");
                        value = item.substring(0, idx);
                        caption = item.substring(idx + 1);
                        items.push(new YIUI.ExpandItem(YIUI.TypeConvertor.toDataType(dataType, value), caption, dataType));
                    }
                }
            }
        }
        return items;
    },
    initGroups: function (metaGrid) {
        var columns = metaGrid.columns,
            orgMeta = this.grid.getOrgMetaObj(),
            expandModel = this.grid.dataModel.expandModel,
            metaColumn,
            area = 0,
            info;
        for (var i = 0, len = columns.length; i < len; i++) {
            metaColumn = columns[i], info = [];
            var columnExpand = metaColumn.columnExpand;
            if (columnExpand) {
                var root = new YIUI.ColumnExpandGroup();
                root.setColumn(metaColumn);
                root.setArea(area);

                if (columnExpand.expandType == YIUI.ColumnExpandType.DATA) {
                    info.push(columnExpand.columnKey);
                }

                this.fillColumnGroups(root, info, metaColumn, area);

                root.calcCount();
                root.left = orgMeta.leafIndexMap[root.getFirst().key];
                root.right = root.left + root.count;

                this.groups.push(root);

                expandModel.push(info);

                area++;
            }
        }
    },
    fillColumnGroups: function (parent, info, column, area) {
        var columns = column.columns,
            metaGrid = this.grid.getOrgMetaObj(),
            rows = metaGrid.rows;
        var child, metaRow, columnExpand;
        if (columns) {
            for (var i = 0, len = columns.length; i < len; i++) {
                child = columns[i],
                    columnExpand = child.columnExpand;
                if (columnExpand) {
                    var group = new YIUI.ColumnExpandGroup();
                    group.setColumn(child);
                    group.area = area;
                    parent.add(group);

                    if (columnExpand.expandType == YIUI.ColumnExpandType.DATA) {
                        info.push(columnExpand.columnKey);
                    }

                    this.fillColumnGroups(group, info, child, area);
                } else {
                    var cells = new YIUI.ColumnExpandCells();
                    cells.setColumn(child);
                    var idx = metaGrid.leafIndexMap[child.key];
                    for (var j = 0, count = rows.length; j < count; j++) {
                        metaRow = rows[j];
                        cells.addCell(metaRow.cells[idx]);
                    }
                    parent.add(cells);
                }
            }
        } else {
            var cells = new YIUI.ColumnExpandCells();
            cells.setColumn(column);
            var idx = metaGrid.leafIndexMap[column.key];
            for (var j = 0, count = rows.length; j < count; j++) {
                metaRow = rows[j];
                cells.addCell(metaRow.cells[idx]);
            }
            parent.add(cells);
        }
    },
    expandColumns: async function (metaGrid) {
        await this.expandColumn(metaGrid.columns);
    },
    expandColumn: async function (collection) {
        if (collection == null) {
            return;
        }
        var columns = [], metaColumn;
        for (var i = 0; metaColumn = collection[i]; i++) {
            if (metaColumn.columnExpand != null) {
                var expand = metaColumn.columnExpand;
                if (expand.expandType == YIUI.ColumnExpandType.DATA) {

                    var items = await this.extractExpandSources(metaColumn);
                    if (items == null || items.length == 0) {
                        metaColumn.invalidExpand = true;
                        return;
                    }
                    for (var j = 0, item; item = items[j]; j++) {
                        var cloneColumn = YIUI.UIUtil.copyObject(metaColumn);
                        var secondKey = YIUI.TypeConvertor.toString(item.value);
                        cloneColumn.key = cloneColumn.key + secondKey;
                        cloneColumn.caption = item.caption;
                        cloneColumn.expValue = item.value;
                        columns.push(cloneColumn);
                    }
                } else {
                    columns.push(metaColumn);
                }
            } else {
                columns.push(metaColumn);
            }
        }

        collection.length = 0;
        for (var i = 0, _column; _column = columns[i]; i++) {
            collection.push(_column);
        }

        for (var k = 0, child; child = collection[k]; k++) {
            if (child.columnExpand != null) {
                this.form.setPara("PEV", child.expValue);
                await this.expandColumn(child.columns);
            }
        }
    },
    expandGroups: async function () {
        for (var i = 0, len = this.groups.length; i < len; i++) {
            await this.expandOneGroup(this.groups[i]);
        }
    },
    expandOneGroup: async function (group) {
        var column = group.getColumn(),
            columnExpand = column.columnExpand;
        if (columnExpand.expandType == YIUI.ColumnExpandType.DATA) {
            await this.impl_expandGroup(column, group);
        }

        for (var i = 0, obj; obj = group.columnArray[i]; i++) {
            if (obj.getObjectType() == YIUI.ColumnExpandObjectType.Group) {
                this.form.setPara("PEV", obj.expValue);
                await this.expandOneGroup(obj);
            }
        }
    },
    impl_expandGroup: async function (column, group) {
        var columnExpand = column.columnExpand,
            columnKey = columnExpand.columnKey;

        var items = await this.extractExpandSources(column);

        if (!items || items.length == 0) {
            return;
        }

        var item,
            obj,
            newObj,
            tempList = [];

        for (var i = 0, size = items.length; i < size; i++) {
            item = items[i];
            for (var k = 0, length = group.size(); k < length; k++) {
                obj = group.get(k);
                newObj = obj.clone();
                newObj.expValue = item.value;

                newObj.traversal(item, function (item, cell) {
                    var key = cell.key;

                    cell.columnArea = group.area;
                    cell.isColExpand = true;
                    var crossValue = cell.crossValue,
                        crossValueMap = cell.crossValueMap;

                    if (!crossValue) {
                        crossValue = new YIUI.MultiKey();
                        cell.crossValue = crossValue;
                    }
                    if (!crossValueMap) {
                        crossValueMap = {};
                        cell.crossValueMap = crossValueMap;
                    }

                    var value = item.value,
                        javaType = YIUI.UIUtil.dataType2JavaDataType(item.dataType);

                    var node = new YIUI.MultiKeyNode(javaType, value);
                    crossValue.addValue(node);
                    crossValueMap[columnKey] = node;
                });
                tempList.push(newObj);
            }
        }

        group.clear();
        group.addAll(tempList);
    },
    replaceGroups: function (targetMetaGrid) {
        for (var i = this.groups.length - 1; i >= 0; i--) {
            var group = this.groups[i];
            var left = group.left, count = group.count;
            for (var j = 0, len = targetMetaGrid.rows.length; j < len; j++) {
                var metaRow = targetMetaGrid.rows[j];
                metaRow.cells.splice(left, count);
                metaRow.cellKeys.splice(left, count);
                var leafCells = group.getLeafCells(j);
                for (var m = 0, mLen = leafCells.length; m < mLen; m++) {
                    metaRow.cells.splice(left + m, 0, leafCells[m]);
                    metaRow.cellKeys.splice(left + m, 0, leafCells[m].key);
                }
            }
        }
    },
    expand: async function () {
        // 每次拓展需要使用原始的配置对象
        var targetMetaGrid = YIUI.UIUtil.copyObject(this.grid.getOrgMetaObj());

        //初始化分组区域
        this.initGroups(targetMetaGrid);

        //扩展组
        await this.expandGroups();

        //替换列
        await this.expandColumns(targetMetaGrid);

        // 分区域替换单元格,从后往前替换
        this.replaceGroups(targetMetaGrid);

        // 设置表格的配置对象
        this.grid.setMetaObj(targetMetaGrid);
    },
});
YIUI.ColumnExpandObjectType = {
    Column: 0,
    Group: 1
};
YIUI.ColumnExpandCells = YIUI.extend({
    column: null,
    cellArray: null,
    init: function () {
        this.cellArray = [];
    },
    addCell: function (cellOpt) {
        this.cellArray.push(cellOpt);
    },
    setColumn: function (column) {
        this.column = column;
    },
    getColumn: function () {
        return this.column;
    },
    getObjectType: function () {
        return YIUI.ColumnExpandObjectType.Column;
    },
    clone: function () {
        var newObj = new YIUI.ColumnExpandCells(this.column);
        for (var i = 0, len = this.cellArray.length; i < len; i++) {
            var cell = this.cellArray[i];
            var cloneCell = Object.assign({ extendInfo: {} }, YIUI.UIUtil.copyObject(cell));
            if (cell.crossValue != null) {
                cloneCell.crossValue = cell.crossValue.clone();
            }
            newObj.addCell(cloneCell);
        }
        return newObj;
    },
    getCell: function (index) {
        return this.cellArray[index];
    },
    traversal: function (context, process) {
        for (var i = 0, obj; obj = this.cellArray[i]; i++) {
            process.call(this, context, obj);
        }
    },
    getColumnCount: function () {
        return 1;
    }
});
YIUI.ColumnExpandGroup = YIUI.extend({
    columnArray: null,
    expandCell: null,
    rowIndex: -1,
    column: null,
    left: -1,
    count: -1,
    firstColumn: null,
    area: -1,
    init: function () {
        this.columnArray = [];
        this.count = 0;
    },
    setColumn: function (column) {
        this.column = column;
    },
    getColumn: function () {
        return this.column;
    },
    setArea: function (area) {
        this.area = area;
    },
    getLeafColumnList: function (list) {
        for (var i = 0, len = this.columnArray.length; i < len; i++) {
            var obj = this.columnArray[i];
            if (obj.getObjectType() == YIUI.ColumnExpandObjectType.Column) {
                list.push(obj);
            } else {
                obj.getLeafColumnList(list);
            }
        }
    },
    getLeafCells: function (rowIndex) {
        var list = [], leafColumnList = [], column;
        this.getLeafColumnList(leafColumnList);
        for (var i = 0, len = leafColumnList.length; i < len; i++) {
            column = leafColumnList[i];
            list.push(column.getCell(rowIndex));
        }
        return list;
    },
    calcCount: function () {
        this.count = 0;
        var obj;
        for (var i = 0, len = this.columnArray.length; i < len; i++) {
            obj = this.columnArray[i];
            if (obj.getObjectType() == YIUI.ColumnExpandObjectType.Group) {
                obj.calcCount();
                this.count += obj.count;
            } else {
                this.count += 1;
            }
        }
    },
    getFirst: function () {
        var obj = this.columnArray[0];
        if (obj.getObjectType() == YIUI.ColumnExpandObjectType.Group) {
            return obj.getFirst();
        } else {
            return obj.getColumn();
        }
    },
    add: function (obj) {
        this.columnArray.push(obj);
    },
    size: function () {
        return this.columnArray.length;
    },
    clear: function () {
        this.columnArray = [];
    },
    addAll: function (list) {
        for (var i = 0, len = list.length; i < len; i++) {
            this.columnArray.push(list[i]);
        }
    },
    replace: function (index, list) {
        this.columnArray.splice(index, 1);
        for (var i = 0, len = list.length; i < len; i++) {
            this.columnArray.splice(index + i, 0, list[i]);
        }
    },
    get: function (index) {
        return this.columnArray[index];
    },
    getObjectType: function () {
        return YIUI.ColumnExpandObjectType.Group;
    },
    clone: function () {
        var newObj = new YIUI.ColumnExpandGroup();
        newObj.setColumn(this.column);
        for (var i = 0, len = this.columnArray.length; i < len; i++) {
            newObj.add(this.columnArray[i].clone());
        }
        newObj.area = this.area;
        return newObj;
    },
    traversal: function (context, process) {
        for (var i = 0, obj; obj = this.columnArray[i]; i++) {
            obj.traversal(context, process);
        }
    }
});
export default YIUI.ShowGridData = YIUI.extend({
    form: null,
    grid: null,
    init: function (form, grid) {
        this.form = form;
        this.grid = grid;
        this.grid.hasRowExpand = false;
    },
    load: async function () {
        var doc = this.form.getDocument();
        if (doc == null) return;
        var dataTable = doc.getByKey(this.grid.tableKey);
        await this.constructGrid();
        await this.constructGrid();
        var gridRowGroup = new YIUI.GridRowGroup(this.form, this.grid);
        gridRowGroup.group();
        // if (this.grid.getMetaObj().treeType != -1) {
        //     builder = new YIUI.GridTreeBuilder(this.form, this.grid);
        // } else if (this.grid.hasRowExpand) {
        //     builder = new YIUI.GridRowExpandBuilder(this.form, this.grid);
        // } else {
        const builder = new YIUI.GridNormalRowBuilder(this.form, this.grid);
        // }
        builder.build();
    },
    constructGrid: async function () {
        if (this.grid.hasColExpand) {
            this.grid.dataModel.expandModel = [];
            var columnExpand = new YIUI.GridColumnExpand(this.form, this.grid);
            await columnExpand.expand();
            this.buildColumnHeader();

            // 更新单元格位置信息
            YIUI.GridLookupUtil.buildCellLookup(this.form, this.grid);
        }
        if (this.grid.hasRowExpand) {
            // var rowExpand = new YIUI.GridRowExpand(this.form, this.grid);
            // rowExpand.dealRowExpand();
        }
        this.grid.initLeafColumns();

        this.grid.initDataModel();
    },
    buildColumnHeader: function () {
        var leafColumns = [];
        var initLeafColumns = function (columns, leafColumns) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = columns[i];
                if (column.columns != null && column.columns.length > 0) {
                    initLeafColumns(column.columns, leafColumns);
                } else {
                    leafColumns.push(column);
                }
            }
        };
        initLeafColumns(this.grid.getMetaObj().columns, leafColumns);
        var gridColumns = [], cells = {};
        for (var i = 0, len = leafColumns.length; i < len; i++) {
            var metaColumn = leafColumns[i], colObj = {};
            colObj.key = metaColumn.key;
            colObj.label = metaColumn.caption;
            colObj.formulaCaption = metaColumn.formulaCaption;
            if (metaColumn.refColumn != null) {
                colObj.isExpandCol = true;
                colObj.refColumn = metaColumn.refColumn.key;
            }
            colObj.name = "column" + i;
            colObj.index = i;
            colObj.width = metaColumn.width;
            colObj.hidden = false;
            colObj.sortable = metaColumn.sortable;
            colObj.visible = metaColumn.visible;
            colObj.visibleDependency = metaColumn.visibleDependency;
            colObj.columnType = metaColumn.columnType;
            if (this.grid.treeColIndex >= 0 && i == this.grid.treeColIndex) {
                colObj.editable = false;
            }
            gridColumns.push(colObj);
        }
        for (var j = 0, jLen = this.grid.getMetaObj().rows.length; j < jLen; j++) {
            var metaRow = this.grid.getMetaObj().rows[j];
            for (var m = 0, mLen = metaRow.cells.length; m < mLen; m++) {
                var metaCell = metaRow.cells[m], cellObj = YIUI.UIUtil.copyObject(metaCell);
                cellObj.colIndex = m;
                if (metaCell.cellType == YIUI.CONTROLTYPE.COMBOBOX || metaCell.cellType == YIUI.CONTROLTYPE.CHECKLISTBOX) {
                    var items = [], item;
                    switch (metaCell.sourceType) {
                        case YIUI.COMBOBOX_SOURCETYPE.STATUS:
                            var statusItems = this.form.statusItems;
                            if (statusItems != null && statusItems.length > 0) {
                                for (var k = 0, kLen = statusItems.length; k < kLen; k++) {
                                    item = { value: statusItems[k].value, caption: statusItems[k].caption };
                                    items.push(item);
                                }
                                cellObj.option.items = items;
                            }
                            break;
                        case YIUI.COMBOBOX_SOURCETYPE.PARAGROUP:
                            var paraGroups = this.form.paraGroups;
                            if (paraGroups != null && paraGroups.length > 0) {
                                for (var h = 0, hLen = paraGroups.length; h < hLen; k++) {
                                    item = { value: paraGroups[h].value, caption: paraGroups[h].caption };
                                    items.push(item);
                                }
                                cellObj.option.items = items;
                            }
                            break;
                    }
                }
                cells[cellObj.key] = cellObj;
                if (metaRow.rowType == "Detail" && metaCell.cellType == YIUI.CONTROLTYPE.CHECKBOX && metaCell.isSelect) {
                    gridColumns[j].isSelect = true;
                }
            }
        }
        this.grid.dataModel.colModel.columns = gridColumns;
        this.grid.dataModel.colModel.cells = cells;
    },
    // calcRowDataByLayer: function (form, grid, dataTable) {  //层次数据过滤计算。
    //     var defaultLayer = grid.getMetaObj().defaultLayer;
    //     if (dataTable == null || defaultLayer == -1) return;
    //     if (dataTable.getColByKey("Layer") == null || dataTable.getColByKey("Hidden") == null) {
    //         YIUI.ViewException.throwException(YIUI.ViewException.LAYER_OR_HIDDEN_NO_DEFINE);
    //     }
    //     var layerTree = {};
    //     dataTable.beforeFirst();
    //     while (dataTable.next()) {
    //         var layer = dataTable.getByKey("Layer");
    //         layer = (layer == null ? 0 : layer);
    //         var rows = layerTree[layer];
    //         if (rows == null) {
    //             rows = [];
    //             layerTree[layer] = rows;
    //         }
    //         var curBookmark = dataTable.getBookmark();
    //         if (!$.inArray(curBookmark, rows)) {
    //             rows.push(curBookmark);
    //         }
    //         dataTable.setByKey("Hidden", 0);
    //         //TODO 没处理完，主要是DataTable的过滤没法处理
    //     }
    // }
});
YIUI.GridNormalRowBuilder = YIUI.extend({
    form: null,
    grid: null,
    init: function (form, grid) {
        this.form = form;
        this.grid = grid;
    },
    build: function () {
        this.grid.clearGridData();
        var document = this.form.getDocument(), dataTable = document.getByKey(this.grid.tableKey),
            rootRowLayer = this.grid.getMetaObj().rowLayer, metaRow;
        for (var i = 0, len = rootRowLayer.objectArray.length; i < len; i++) {
            var rowObj = rootRowLayer.objectArray[i];
            if (rowObj.objectType == YIUI.MetaGridRowObjectType.ROW) {
                metaRow = this.grid.getMetaObj().rows[rowObj.rowIndex];

                var newRowIndex = YIUI.GridUtil.insertRow(this.grid, -1, metaRow, null, 0);
                if (newRowIndex != null) {
                    GridHandler.showFixRowData(this.form, this.grid, newRowIndex);
                }

            } else if (rowObj.objectType == YIUI.MetaGridRowObjectType.AREA) {
                var root = this.grid.dataModel.rootBkmk, groupLevel = 0;
                for (var j = 0, jLen = rowObj.objectArray.length; j < jLen; j++) {
                    var subObj = rowObj.objectArray[j];
                    if (subObj.objectType == YIUI.MetaGridRowObjectType.ROW) {
                        metaRow = this.grid.getMetaObj().rows[subObj.rowIndex];
                        YIUI.GridUtil.insertRow(this.grid, -1, metaRow, null, 0);
                    } else if (subObj.objectType == YIUI.MetaGridRowObjectType.GROUP) {
                        for (var k = 0, kLen = root.getRowCount(); k < kLen; k++) {
                            this.buildGroupRows(this.grid, dataTable, groupLevel, root.getRowAt(k));
                        }
                    }
                }
            }
        }
        //重建表头
        // YIUI.GridUtil.buildGroupHeaders(this.grid);
    },
    buildGroupRows: function (grid, dataTable, groupLevel, parentgroup) {
        var gridData = grid.dataModel.data;
        var metaGridRowGroup = parentgroup.getMetaGroup(), objectCount = metaGridRowGroup.objectArray.length, metaRow;
        if (parentgroup.isLeaf) {
            for (var i = 0; i < objectCount; i++) {
                var subObj = metaGridRowGroup.objectArray[i];
                metaRow = this.grid.getMetaObj().rows[subObj.rowIndex];
                switch (metaRow.rowType) {
                    case "Group":
                        // YIUI.GridUtil.insertRow(this.grid, -1, metaRow, null, groupLevel);
                        break;
                    case "Detail":
                        groupLevel++;
                        var rowCount = parentgroup.getRowCount();
                        var start = 0, end = rowCount;

                        // if (this.grid.getMetaObj().pageLoadType == YIUI.PageLoadType.UI) {
                        //     var curPageIndex = this.grid.pageInfo.curPageIndex,
                        //         pageRowCount = this.grid.getMetaObj().pageRowCount;
                        //     curPageIndex = curPageIndex == null ? 0 : curPageIndex;
                        //     start = curPageIndex <= 0 ? 0 : curPageIndex * pageRowCount;
                        //     end = start + pageRowCount > rowCount ? rowCount : start + pageRowCount;
                        // }

                        for (var m = start; m < end; m++) {
                            var bkmkRow = parentgroup.getRowAt(m);
                            var newRowIndex = YIUI.GridUtil.insertRow(grid, -1, metaRow, bkmkRow, groupLevel);

                            GridHandler.showDetailRowData(this.form, this.grid, newRowIndex, false);
                        }
                        groupLevel--;
                        break;
                }
            }
        } else {
            for (var j = 0; j < objectCount; j++) {
                var rowObj = metaGridRowGroup.objectArray[j];
                metaRow = this.grid.getMetaObj().rows[rowObj.rowIndex];
                if (rowObj.objectType == YIUI.MetaGridRowObjectType.ROW) {
                    YIUI.GridUtil.insertRow(grid, -1, metaRow, null, groupLevel);
                } else {
                    for (var k = 0, kLen = parentgroup.getRowCount(); k < kLen; k++) {
                        groupLevel++;
                        this.buildGroupRows(grid, dataTable, groupLevel, parentgroup.getRowAt(k));
                        groupLevel--;
                    }
                }
            }
        }
    }
});
YIUI.GridRowExpandBuilder = YIUI.extend({
    form: null,
    grid: null,
    init: function (form, grid) {
        this.form = form;
        this.grid = grid;
    },
    build: function () {
        this.grid.clearGridData();
        var dataTable = this.form.getDocument().getByKey(this.grid.tableKey);
        var detailRow = this.grid.getDetailMetaRow();
        var rowExpandIndex = this.grid.rowExpandIndex;
        var expandCell = detailRow.cells[rowExpandIndex];
        var leafGroup = this.getLeafGroupBkmkFromRoot(this.grid.dataModel.rootBkmk);
        if (leafGroup == null)
            return;
        var bkmkMap = {}, detailRowBkmk, bkmk, value;
        for (var i = 0, len = leafGroup.getRowCount(); i < len; i++) {
            bkmk = leafGroup.getRowAt(i);
            if (this.grid.hasColExpand) {
                detailRowBkmk = bkmk.getAt(0);
            } else {
                detailRowBkmk = bkmk;
            }
            dataTable.setByBkmk(detailRowBkmk.getBookmark());
            var colInfo = dataTable.getColByKey(expandCell.columnKey);
            value = YIUI.TypeConvertor.toDataType(colInfo.type, dataTable.getByKey(expandCell.columnKey));
            if (value != null) {
                bkmkMap[value] = bkmk;
            }
        }
        var expandModel = this.grid.getRowExpandModel();
        for (var j = 0, size = expandModel.length; j < size; j++) {
            value = expandModel[j];
            bkmk = bkmkMap[value];
            var newRowIndex = YIUI.GridUtil.insertRow(this.grid, -1, detailRow, bkmk, 0);
            if (bkmk != undefined) {
                GridHandler.showDetailRowData(this.form, this.grid, newRowIndex);
            } else {
                this.grid.setValueAt(newRowIndex, rowExpandIndex, value);
            }
        }
    },

    getLeafGroupBkmkFromRoot: function (groupRowBkmk) {
        for (var i = 0, len = groupRowBkmk.getRowCount(); i < len; i++) {
            var bkmk = groupRowBkmk.getRowAt(i);
            if (bkmk.getRowType() == YIUI.IRowBkmk.Group) {
                if (bkmk.isLeaf) {
                    return bkmk;
                }
            }
        }
        return null;
    }
});

YIUI.GridTreeBuilder = YIUI.extend({
    form: null,
    grid: null,
    init: function (form, grid) {
        this.form = form;
        this.grid = grid;
    },
    build: function () {
        this.grid.clearGridData();
        var metaGrid = this.grid.getMetaObj(), detailRow = this.grid.getDetailMetaRow();
        if (detailRow == null) {
            YIUI.ViewException.throwException(YIUI.ViewException.NO_DETAIL_ROW_DEFINE);
        }
        var dataTable = this.form.getDocument().getByKey(this.grid.tableKey);
        var treeIndex = this.grid.treeIndex, treeCell = detailRow.cells[treeIndex],
            metaTree = treeCell.tree, bkmkMap = {}, id, bkmk;
        dataTable.beforeFirst();
        switch (metaTree.treeType) {
            case YIUI.TreeType.DICT:
                if (treeCell.cellType != YIUI.CONTROLTYPE.DICT) {
                    YIUI.ViewException.throwException(YIUI.ViewException.GRID_TREE_COLUMN_DEFINE_ERROR);
                }
                var editOpt = treeCell.editOptions, itemKey = editOpt.itemKey,
                    dictFilter = YIUI.DictHandler.getDictFilter(this.form, treeCell.key, editOpt.itemFilters, itemKey);
                while (dataTable.next()) {
                    id = YIUI.TypeConvertor.toLong(dataTable.getByKey(treeCell.columnKey));
                    bkmk = new YIUI.DetailRowBkmk();
                    bkmk.setBookmark(dataTable.getBkmk());
                    bkmkMap[id] = bkmk;
                }
                this.buildTreeRelation(bkmkMap, dictFilter, metaTree.isExpand, itemKey, editOpt.sortColumns, detailRow);
                break;
            case YIUI.TreeType.CUSTOM:// 根据数据,主关系字段的值唯一
                var fgn2RowMap = {}, fgnValue, rows;
                while (dataTable.next()) {
                    id = dataTable.getByKey(metaTree.reference);
                    if (id != null) {
                        bkmk = new YIUI.DetailRowBkmk();
                        bkmk.setBookmark(dataTable.getBkmk());
                        bkmkMap[id] = bkmk;
                    }
                    fgnValue = dataTable.getByKey(metaTree.foreign);
                    rows = fgn2RowMap[fgnValue ? fgnValue : "_root"];
                    if (!rows) {
                        rows = [];
                        fgn2RowMap[fgnValue ? fgnValue : "_root"] = rows;
                    }
                    rows.push(id);
                }
                var rootItems = fgn2RowMap["_root"];// 根节点
                this.buildCustomRow(fgn2RowMap, bkmkMap, metaTree.isExpand, rootItems, detailRow);
                break;
            default:
                break;
        }
    },

    buildCustomRow: function (fgn2RowMap, bkmkMap, expand, references, metaRow, parentRow) {
        for (var i = 0, len = references.length; i < len; i++) {
            var bkmkRow = bkmkMap[references[i]];

            var newRowIndex = YIUI.GridUtil.insertRow(this.grid, -1, metaRow, bkmkRow, 0);
            var rowData = this.grid.dataModel.data[newRowIndex];
            rowData.treeLevel = parentRow ? parentRow.treeLevel + 1 : 0;
            GridHandler.showDetailRowData(this.form, this.grid, newRowIndex);
            if (parentRow != null) {
                var childRows = parentRow.childRows;
                if (!childRows) {
                    childRows = [];
                    parentRow.childRows = childRows;
                }
                childRows.push(rowData.rowID);
                rowData.parentRow = parentRow;
            }
            var referItems = fgn2RowMap[references[i]];
            if (referItems) {
                rowData.isExpand = expand;
                this.buildCustomRow(fgn2RowMap, bkmkMap, expand, referItems, metaRow, rowData);
            } else {
                rowData.isLeaf = true;
            }
        }
    },

    buildTreeRelation: function (bkmkMap, filter, expand, itemKey, sortColumns, metaRow) {
        var items = YIUI.DictService.getAllItems(itemKey, filter, YIUI.DictStateMask.Enable);
        var getParentID = function (item, colKey) {
            var table = item.itemTables[item.mainTableKey];
            var value;
            if (table.itemRows.length > 0) {
                if (table.tableMode == YIUI.TableMode.HEAD) {
                    value = table.itemRows[0][colKey];
                } else {
                    var list = [];
                    for (var j = 0, jlen = table.itemRows.length; j < jlen; j++) {
                        list.push(table.itemRows[j][colKey]);
                    }
                    value = list;
                }
            }
            return value;
        };
        var PID2ItemMap = {};
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i], parentID = getParentID(item, "ParentID");
            var itemsList = PID2ItemMap[parentID];
            if (itemsList == null) {
                itemsList = [];
                PID2ItemMap[parentID] = itemsList;
            }
            itemsList.push(item);
        }
        var roots = PID2ItemMap["0"];
        if (roots) {
            this.buildTreeRow(PID2ItemMap, bkmkMap, expand, roots, metaRow, 0);// 根据层次关系构建表格行
        }
    },
    buildTreeRow: function (PID2ItemMap, bkmkMap, expand, items, metaRow, parentRow) {
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i],

                opts = { oid: item.oid, caption: item.caption, itemKey: item.itemKey },
                itemData = new YIUI.ItemData(opts);

            var bkmkRow = bkmkMap[itemData.oid];

            var newRowIndex = YIUI.GridUtil.insertRow(this.grid, -1, metaRow, bkmkRow, 0);
            var rowData = this.grid.dataModel.data[newRowIndex];
            rowData.treeLevel = parentRow ? parentRow.treeLevel + 1 : 0;
            if (bkmkRow) {
                GridHandler.showDetailRowData(this.form, this.grid, newRowIndex);
            } else {
                this.grid.setValueAt(newRowIndex, this.grid.treeIndex, itemData);
            }
            if (parentRow != null) {
                var childRows = parentRow.childRows;
                if (childRows == null) {
                    childRows = [];
                    parentRow.childRows = childRows;
                }
                childRows.push(rowData.rowID);
                rowData.parentRow = parentRow;
            }
            var itemsList = PID2ItemMap[item.oid];
            if (itemsList != null) {
                rowData.isExpand = expand;
                this.buildTreeRow(PID2ItemMap, bkmkMap, expand, itemsList, metaRow, rowData);
            } else {
                rowData.isLeaf = true;
            }
        }
    }
});
// })();

YIUI.GridUtil = (function () {
    var Return = {
        appendDetailRow: function (grid) {
            const detailMetaRow = grid.getDetailMetaRow();
            const group = grid.dataModel.rootBkmk.getRowAt(0);
            var detailGridRow = new YIUI.DetailRowBkmk();
            detailGridRow.setBookmark(table.getBkmk());
            group.add(detailGridRow);
            this.insertRow(grid, -1, detailMetaRow, detailGridRow, group);
        },
        //表格数据模型中加行
        insertRow: function (grid, rowIndex, metaRow, bookmarkRow, groupLevel) {
            var initRowData = function (metaRow, groupLevel) {
                var rowData = {};
                rowData.rowType = metaRow.rowType;
                rowData.metaRowIndex = grid.getMetaObj().rows.indexOf(metaRow);
                rowData.cellKeys = metaRow.cellKeys;
                rowData.isDetail = metaRow.rowType == 'Detail' ? true : false;
                rowData.isEditable = (metaRow.rowType == 'Total' || metaRow.rowType == 'Group') ? false : true;
                rowData.rowHeight = metaRow.rowHeight || 32;
                rowData.rowID = grid.randID();
                rowData.data = [];
                rowData.cellBkmks = [];
                rowData.backColor = "";

                if (bookmarkRow) {
                    rowData.bkmkRow = bookmarkRow;
                    if (bookmarkRow instanceof YIUI.ExpandRowBkmk) {
                        rowData.bookmark = [];
                        for (var h = 0, hLen = bookmarkRow.size(); h < hLen; h++) {
                            rowData.bookmark.push(bookmarkRow.getAt(h).getBookmark());
                        }
                    } else {
                        rowData.bookmark = bookmarkRow.getBookmark();
                    }
                }

                if (groupLevel !== undefined) {
                    rowData.rowGroupLevel = groupLevel;
                }

                if (metaRow.rowType == 'Group') {
                    rowData.isGroupHead = metaRow.isGroupHead;
                    rowData.isGroupTail = metaRow.isGroupTail;
                }

                return rowData;
            },
                //添加明细行
                addDetailRow = function (metaRow, groupLevel) {
                    var rowData = initRowData(metaRow, groupLevel), metaCell, value, meta;

                    for (var i = 0, len = metaRow.cells.length; i < len; i++) {
                        metaCell = metaRow.cells[i], meta = metaCell.editOptions;

                        var value = null, caption = null;

                        switch (metaCell.cellType) {
                            case YIUI.CONTROLTYPE.LABEL:
                            case YIUI.CONTROLTYPE.BUTTON:
                            case YIUI.CONTROLTYPE.HYPERLINK:
                                if (!metaCell.hasDB) {
                                    caption = metaRow.cells[i].caption;
                                }
                                break;
                            case YIUI.CONTROLTYPE.NUMBEREDITOR:
                                value = new Decimal(0);
                                // if ( meta.zeroString ) {
                                //     caption = meta.zeroString;
                                // } else if (meta.showZero) {
                                //     var opt = {};
                                //     opt.mDec = meta.scale ? meta.scale : 2;
                                //     caption = YIUI.DecimalFormat.format(0, opt) ;
                                // }
                                break;
                            case YIUI.CONTROLTYPE.TEXTEDITOR:
                            case YIUI.CONTROLTYPE.TEXTBUTTON:
                            case YIUI.CONTROLTYPE.CHECKLISTBOX:
                                value = '';
                                break;
                        }
                        rowData.data.push([value, caption, true]);
                        rowData.cellBkmks.push(null);
                    }
                    return rowData;
                },
                //添加汇总行
                addTotalRow = function (metaRow, groupLevel) {
                    var rowData = initRowData(metaRow, groupLevel);

                    for (var i = 0, len = metaRow.cells.length; i < len; i++) {
                        var metaCell = metaRow.cells[i], cellData = {};
                        cellData = [metaCell.caption, metaCell.caption];
                        rowData.data.push(cellData);
                    }
                    return rowData;
                },
                //添加固定行
                addFixRow = function (metaRow) {
                    var rowData = initRowData(metaRow);

                    for (var i = 0, len = metaRow.cells.length; i < len; i++) {
                        var metaCell = metaRow.cells[i], cellData = {};
                        if (metaCell.tableKey) {
                            cellData = [null, '', true];
                            if (!metaCell.tableKey && !metaCell.columnKey
                                && (metaCell.cellType == YIUI.CONTROLTYPE.LABEL
                                    || metaCell.cellType == YIUI.CONTROLTYPE.BUTTON
                                    || metaCell.cellType == YIUI.CONTROLTYPE.HYPERLINK)) {
                                cellData[1] = metaRow.cells[i].caption;
                            }
                        } else {
                            cellData = [metaCell.caption, metaCell.caption, false];
                        }
                        rowData.data.push(cellData);
                    }
                    return rowData;
                };

            var rowData = null;
            switch (metaRow.rowType) {
                case "Group":
                case "Total":
                    return;
                    rowData = addTotalRow(metaRow, groupLevel);
                    break;
                case "Detail":
                    rowData = addDetailRow(metaRow, groupLevel);
                    break;
                case "Fix":
                    return;
                    rowData = addFixRow(metaRow, groupLevel);
                    break;
                default:
                    console.log("error row type");
            }

            // var data = grid.dataModel.data, len = data.length,
            // dtrRowIndex = grid.getMetaObj().detailMetaRowIndex;

            var newRowIndex = 0;
            if (rowIndex >= 0) {
                newRowIndex = rowIndex;
                grid.insertRow(rowIndex, rowData);
            } else {
                newRowIndex = grid.getRowCount();
                grid.appendRow(rowData);
            }

            // 插行以后,更新固定行位置
            // var form = YIUI.FormStack.getForm(grid.ofFormID);
            // YIUI.GridLookupUtil.updateFixPos(form, grid);

            return newRowIndex;
        },
        buildGroupHeaders: function (grid) {
            var groupHeaders = [];
            var calcLeafColumns = function (column, leafColumns) {
                for (var i = 0, len = column.columns.length; i < len; i++) {
                    var subCol = column.columns[i];
                    if (subCol.columns == null || subCol.columns.length == 0) {
                        leafColumns.push(subCol);
                    } else {
                        calcLeafColumns(subCol, leafColumns);
                    }
                }
            };
            var gridLeafColumns = [], rootColumn = { columns: grid.getMetaObj().columns };
            calcLeafColumns(rootColumn, gridLeafColumns);
            var initGroupHeaderArray = function (columns, groupHeaders) {
                var groupHeaderArray = [], nextColumns = [], column;
                for (var i = 0, len = columns.length; i < len; i++) {
                    column = columns[i];
                    if (column.columns != null && column.columns.length > 0) {
                        var leafColumns = [], groupHeaderObj = {}, index = -1;
                        calcLeafColumns(column, leafColumns);
                        index = gridLeafColumns.indexOf(leafColumns[0]);
                        groupHeaderObj.startColumnName = "column" + index;
                        groupHeaderObj.numberOfColumns = leafColumns.length;
                        groupHeaderObj.titleText = column.caption;
                        groupHeaderArray.push(groupHeaderObj);
                        nextColumns = nextColumns.concat(column.columns);
                    }
                }
                if (groupHeaderArray.length > 0) {
                    groupHeaders.push(groupHeaderArray);
                }
                if (nextColumns.length > 0) {
                    initGroupHeaderArray(nextColumns, groupHeaders);
                }
            };
            initGroupHeaderArray(grid.getMetaObj().columns, groupHeaders);
            grid.groupHeaders = groupHeaders;
        },

        isEmptyRow: function (rowData) {
            if (rowData) {
                return rowData.rowType == 'Detail' ? (rowData.bookmark == null && rowData.bkmkRow == null) : false;
            }
            return false;
        }
    };
    return Return;
})();