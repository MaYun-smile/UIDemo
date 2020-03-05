/**
 * 界面逻辑处理
 * @author 陈瑞
 */
import { YIUI } from './YIUI-base';
import './YIUI-common';
import './YIUI-parser';
import './YIUI-svr';
import './process/uienableprocess';
import './process/uivisibleprocess';
import './process/uicalcprocess';
import './process/uicheckruleprocess';
import './process/uidependencyprocess';
import './process/uiparaprocess';
import './bpm';

export default YIUI.UIProcess = function (form) {
    this.form = form;
    this.enableProcess = new YIUI.UIEnableProcess(form);
    this.visibleProcess = new YIUI.UIVisibleProcess(form);
    this.calcProcess = new YIUI.UICalcProcess(form);
    this.checkRuleProcess = new YIUI.UICheckRuleProcess(form);

    this.resetUIStatus = async function (mask) {
        const calcEnable = (mask & YIUI.FormUIStatusMask.ENABLE) !== 0;
        const calcVisible = (mask & YIUI.FormUIStatusMask.VISIBLE) !== 0;
        const addOperation = (mask & YIUI.FormUIStatusMask.OPERATION) !== 0;
        if (calcEnable) {
            await this.enableProcess.calcAll();
        }
        if (calcVisible) {
            await this.visibleProcess.calcAll();
        }
        if (addOperation) {
            await this.addOperation();
        }
    };

    this.hasOptRights = function (operation) {
        if (!operation.key)
            return false;
        if (operation.type == YIUI.OPERATIONTYPE.OPERATION && operation.managed)
            return true;
        return this.form.hasOptRight(operation.key);
        // var host = this.form.getBPMStatusProxy();
        // if (host && host.hasOptRights(operation.key))
        //     return true;
        // var formRights = this.form.getFormRights();
        // return formRights.allOptRights || $.inArray(operation.key, formRights.optRights) != -1;
    };

    this.addOperation = async function (defaultToolbar) {

        var toolbar = defaultToolbar || this.form.defaultToolBar;

        if (!toolbar || toolbar.isDestroyed)
            return;

        // var container = this.form.getContainer();
        // if (!container.mergeOperation) {
        //     toolbar.items.length = 0;
        // }

        var _this = this;

        async function addOneOperation(toolbar, item) {
            if (!_this.hasOptRights(item))
                return;
            // var metaItem = _this.form.getMetaOpt(item.key);
            const cxt = { form: _this.form };
            const visibleCnt = item.visibleCnt;
            const enableCnt = item.enableCnt;
            // var visibleCnt = metaItem ? metaItem.visible : item.visibleCnt;
            // var enableCnt = metaItem ? metaItem.enable : item.enableCnt;
            // item.visible = visibleCnt ? _this.form.eval(visibleCnt, cxt, null) : true;
            // item.enable = enableCnt ? _this.form.eval(enableCnt, cxt, null) : true;
            item.visible = visibleCnt ? await _this.form.evalFormula(visibleCnt, cxt, null) : true;
            if (item.visible) {
                item.enable = enableCnt ? await _this.form.evalFormula(enableCnt, cxt, null) : true;
            }
            toolbar.addItem(item);
            // toolbar.items.push(item);
        }

        async function addOneMenuOperation(toolbar, item) {
            if (!_this.hasOptRights(item))
                return;
            if (!item.items)
                return;
            var _item, cxt = { form: _this.form };
            const visibleCnt = item.visibleCnt;
            const enableCnt = item.enableCnt;
            item.visible = visibleCnt ? await _this.form.evalFormula(visibleCnt, cxt, null) : true;
            item.enable = true;
            if (!item.selfDisable && item.visible) {
                item.enable = enableCnt ? await _this.form.evalFormula(enableCnt, cxt, null) : true;
            }
            for (var m = 0, length = item.items.length; m < length; m++) {
                _item = item.items[m];
                const subVisibleCnt = _item.visibleCnt;
                const subEnableCnt = _item.enableCnt;
                if(item.visible) {
                    _item.visible = subVisibleCnt ? await _this.form.evalFormula(subVisibleCnt, cxt, null) : true;
                    if (_item.visible) {
                        _item.enable = subEnableCnt ? await _this.form.evalFormula(subEnableCnt, cxt, null) : true;
                    }
                }else {
                    _item.visible = false;
                    _item.enable = false;
                }
            }
            // toolbar.items.push(item);
            toolbar.addItem(item);
        }

        function replaceInplaceToolBar(item) {
            var instance = new YIUI.InplaceToolBar({ tag: item.tag });
            var opts = instance.replace(form, item);
            var items = [];
            if (!opts)
                return items;
            for (var n = 0, length = opts.length; n < length; n++) {
                items.push({
                    type: YIUI.OPERATIONTYPE.OPERATION,
                    key: opts[n].key,
                    caption: opts[n].caption,
                    action: opts[n].action,
                    tag: opts[n].tag,
                    preAction: opts[n].preAction,
                    managed: true, // 受管理,有权限
                    enableCnt: opts[n].enable,
                    visibleCnt: opts[n].visible
                });
            }
            return items;
        }

        async function addDefaultOperation(form, toolbar) {
            var item, i, len, m, size, items;
            for (i = 0, len = form.operations.length; i < len; i++) {
                item = form.operations[i];
                // if (item.tag === "WORKITEM" || item.tag === "BPM" || item.key === "StartInstance") {//TODO:暂时在天和中这样修改一下
                    if (item.type == YIUI.OPERATIONTYPE.OPERATION) {
                        if (item.tag) {
                            items = replaceInplaceToolBar(item);
                            if (items != null && items.length > 0) {
                                for (m = 0, size = items.length; m < size; m++) {
                                    await addOneOperation(toolbar, items[m]);
                                }
                            }
                        } else {
                            await addOneOperation(toolbar, item);
                        }
                    } else {
                        await addOneMenuOperation(toolbar, item);
                    }
                // }
            }
        }
        // 处理合并
        // var mergeOptContainer = form.getMergeOptContainer();
        // if (mergeOptContainer) {
        //     var ctn = form.getComponent(mergeOptContainer);
        //     var activePane = ctn.getActivePane();
        //     if (activePane) {
        //         activePane.getUIProcess().addOperation(toolbar);
        //     }
        // }
        console.time('root');
        toolbar.clear();
        this.form.clearFormulaCache();
        await addDefaultOperation(this.form, toolbar);
        console.timeEnd('root');

        // if (toolbar.rendered) {
        //     toolbar.repaint();
        // }
    };

    this.doPostShowData = async function (commitValue) {
        console.time('calc value')
        await this.calcProcess.calcAll(commitValue);
        console.timeEnd('calc value');
        console.time('calc enable')
        await this.enableProcess.calcAll();
        console.timeEnd('calc enable');
        console.time('calc visible')
        await this.visibleProcess.calcAll();
        console.timeEnd('calc visible');
        console.time('calc rule')
        await this.checkRuleProcess.calcAll();
        console.timeEnd('calc rule');
        console.time('calc para');
        await YIUI.UIParaProcess.calcAll(this.form);
        console.timeEnd('calc para');
    };

    this.doPreCellValueChanged = async function (grid, rowIndex, colIndex, cellKey) {
        await YIUI.UIDependencyProcess.cellValueChanged(form, grid, rowIndex, colIndex, cellKey);
    };
    this.doCellValueChanged = async function (grid, rowIndex, colIndex, cellKey) {
        await this.calcProcess.cellValueChanged(grid, rowIndex, colIndex, cellKey);
    };
    this.doPostCellValueChanged = async function (grid, rowIndex, colIndex, cellKey) {
        if (this.calcProcess.isInAllCalculating()) {
            return;
        }
        await this.enableProcess.cellValueChanged(grid, rowIndex, colIndex, cellKey);
        await this.visibleProcess.cellValueChanged(grid, rowIndex, colIndex, cellKey);
        await this.checkRuleProcess.cellValueChanged(grid, rowIndex, colIndex, cellKey);
    };
    this.calcSubDetail = function (gridKey) {
        this.calcProcess.calcSubDetail(gridKey);
        this.enableProcess.calcSubDetail(gridKey);
        this.visibleProcess.calcSubDetail(gridKey);
        this.checkRuleProcess.calcSubDetail(gridKey);
    };
    this.doPostInsertRow = async function (grid, rowIndex, emptyRow) {
        await this.calcProcess.doAfterInsertRow(grid, rowIndex, emptyRow);
        await this.enableProcess.doAfterInsertRow(grid, rowIndex);
        await this.visibleProcess.doAfterInsertRow(grid, rowIndex);
        await this.checkRuleProcess.doAfterInsertRow(grid, rowIndex);
        if (emptyRow) {
            await YIUI.UIDependencyProcess.doAfterInsertRow(grid, rowIndex);
        }
    };
    this.doPostDeleteRow = function (grid) {
        this.calcProcess.doAfterDeleteRow(grid);
        this.enableProcess.doAfterDeleteRow(grid);
        this.checkRuleProcess.doAfterDeleteRow(grid);
    };
    this.resetComponentStatus = function (component) {
        this.calcProcess.reCalcComponent(component);
        this.enableProcess.reCalcComponent(component);
        this.visibleProcess.reCalcComponent(component);
        this.checkRuleProcess.reCalcComponent(component);
    };
    this.doPostClearAllRow = function (grid) {
        this.enableProcess.doAfterDeleteRow(grid, -1);
    };
    this.preFireValueChanged = function (component) {
        YIUI.UIDependencyProcess.valueChanged(this.form, component);
    };
    this.fireValueChanged = async function (component) {
        await this.calcProcess.valueChanged(component);
        if (component.valueChanged) {
            await this.form.eval(component.valueChanged, { form: this.form });
        }
    };
    this.postFireValueChanged = async function (component) {
        if (this.calcProcess.isInAllCalculating()) {
            return;
        }
        await this.enableProcess.valueChanged(component);
        await this.visibleProcess.valueChanged(component);
        await this.checkRuleProcess.valueChanged(component);
        await YIUI.UIParaProcess.valueChanged(this.form, component);
    };
    this.refreshParas = async function () {
        await YIUI.UIParaProcess.calcAll(this.form);
    };
    this.doAfterRowChanged = function (component) {
        this.enableProcess.doAfterRowChanged(component);
    };
    this.calcItems = function (items) {
        this.calcProcess.calcAllItems(true, items, false);
    };
};
