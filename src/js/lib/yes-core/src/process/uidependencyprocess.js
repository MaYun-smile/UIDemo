/**
 * Created by 陈瑞 on 2017/3/14 use WebStorm.
 */
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import '../YIUI-svr';
import { lodash as $ } from 'yes-common';
import '../uiprocess';
import '../abstractuiprocess';
import '../yes-ui';
export default YIUI.UIDependencyProcess = (function () {

    // 单例对象
    var Return = {
        valueChanged: async function (form, component) {
            var relations = form.relations, target;
            for (var i = 0, r; r = relations[i]; i++) {
                if (r.dependency === component.key) {
                    target = r.target;
                    var loc = form.getCellLocation(target);
                    if (loc) {
                        var grid = form.getComponent(loc.key);
                        grid.gridHandler.dependedValueChange(form, grid, target, r.dependency, null);
                    } else {
                        var _com = form.getComponent(target);
                        _com && _com.dependedValueChange(target, r.dependency, null);
                    }
                }
            }
        },

        cellValueChanged: async function (form, grid, rowIndex, colIndex, cellKey) {
            var relations = form.dependency.relationTree, targetFields;
            for (var field in relations) {
                if (field !== cellKey)
                    continue;
                targetFields = relations[field];
                for (var i = 0, len = targetFields.length; i < len; i++) {
                    let loc = form.getCellLocation(targetFields[i]);

                    if (loc.expand) {
                        var columns = loc.columns;
                        for (var j = 0; j < columns.length; j++) {
                            await grid.setValueAt(rowIndex, columns[j], null, true, true);
                        }
                    } else {
                        await grid.setValueAt(rowIndex, loc.column, null, true, true);
                    }
                    // grid.doPostCellValueChanged(rowIndex, field, targetFields[i], null);
                }
            }
        },

        doAfterInsertRow: function (grid, rowIndex) {
            // var gridRow = grid.getRowDataAt(rowIndex), metaRow = grid.getMetaObj().rows[gridRow.metaRowIndex];
            // for (var i = 0, len = metaRow.cells.length; i < len; i++) {
            //     var metaCell = metaRow.cells[i];
            //     if (metaCell.cellType == YIUI.CONTROLTYPE.DYNAMIC) {
            //         //TODO 刷新动态单元格
            //     }
            // }
        }
    }

    return Return;
})();
