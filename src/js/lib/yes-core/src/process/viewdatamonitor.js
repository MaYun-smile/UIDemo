/**
 * Created with IntelliJ IDEA.
 * User: 陈瑞
 * Date: 16-12-26
 * Time: 下午5:19
 */
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import '../YIUI-svr';
import { lodash as $ } from 'yes-common';
import '../uiprocess';

export default YIUI.ViewDataMonitor = function (form) {
    this.form = form;
    this.uiProcess = new YIUI.UIProcess(form);

    this.preFireCellValueChanged = function (grid, rowIndex, colIndex, cellKey) {
        this.uiProcess.doPreCellValueChanged(grid, rowIndex, colIndex, cellKey);
    }

    this.fireCellValueChanged = function (grid, rowIndex, colIndex) {
        var row = grid.dataModel.data[rowIndex],
            metaRow = grid.getMetaObj().rows[row.metaRowIndex],
            cellKey = row.cellKeys[colIndex];

        this.uiProcess.doCellValueChanged(grid, rowIndex, colIndex, cellKey);

        YIUI.GridSumUtil.evalAffectSum(form, grid, rowIndex, colIndex);

        var valueChanged = metaRow.cells[colIndex].valueChanged;
        if (valueChanged !== undefined && valueChanged.length > 0) {
            form.eval($.trim(valueChanged), { form: form, rowIndex: rowIndex }, null);
        }
    }

    this.postFireCellValueChanged = function (grid, rowIndex, colIndex, cellKey) {
        this.uiProcess.doPostCellValueChanged(grid, rowIndex, colIndex, cellKey);
    }

    this.preFireValueChanged = function (component) {
        this.uiProcess.preFireValueChanged(component);
    };

    this.fireValueChanged = async function (component) {
        await this.uiProcess.fireValueChanged(component);
    };

    this.postFireValueChanged = async function (component) {
        await this.uiProcess.postFireValueChanged(component);
    };

    this.getUIProcess = function () {
        return this.uiProcess;
    }

}
