/**
 * Created by 陈瑞 on 2017/3/1.
 */
import { YIUI } from './YIUI-base';
import './YIUI-common';
import './YIUI-parser';
import './YIUI-svr';
import { lodash as $ } from 'yes-common';
// var YIUI = YIUI || {};
// (function () {
export default YIUI.AbstractUIProcess = YIUI.extend({
    form: null,
    // formRights: null,
    // allEnableRights : true,
    // allVisibleRights : true,

    init: function (form) {
        this.form = form;
        // this.formRights = form.getFormRights();
        // if( form.metaForm.authenticate ) {
        //     this.allEnableRights = this.formRights.allEnableRights;
        //     this.allVisibleRights = this.formRights.allVisibleRights;
        // }
    },

    getFormEnable: function () {
        return this.form.operationState == YIUI.Form_OperationState.New ||
            this.form.operationState == YIUI.Form_OperationState.Edit;
    },

    enableOnly: function () {
        return (this.form.operationState == YIUI.Form_OperationState.New ||
            this.form.operationState == YIUI.Form_OperationState.edit) ? false :
            this.form.operationState == YIUI.Form_OperationState.Default;
    },

    newContext: function (form, rowIndex, colIndex) {
        var cxt = {};
        cxt.form = form;
        cxt.rowIndex = rowIndex;
        cxt.colIndex = colIndex;
        return cxt;
    },

    isNullValue: function (v) {
        if (v == null || v == '')
            return true;
        if (v instanceof Decimal)
            return parseFloat(v) == 0;
        return false;
    },

    initTree: function (item) {
        if (!item.items)
            return;
        for (var i = 0, exp, cnt; exp = item.items[i]; i++) {
            cnt = exp.content || exp.formulaValue;
            if (cnt) {
                exp.syntaxTree = this.form.getSyntaxTree(cnt);
            }
        }
        return item;
    },

    // hasEnableRights: function (key) {
    //     var host = this.form.getBPMStatusProxy();
    //     if (host) {
    //         return host.hasEnableRights(key);
    //     }
    //     return this.allEnableRights || $.inArray(key, this.formRights.enableRights) == -1;
    // },

    // hasVisibleRights: function (key) {
    //     var host = this.form.getBPMStatusProxy();
    //     if (host) {
    //         return host.hasVisibleRights(key);
    //     }
    //     return this.allVisibleRights || $.inArray(key, this.formRights.visibleRights) == -1;
    // },

    calcFormulaValue: async function (item, context) {
        var result = null;
        if (item.syntaxTree) {
            result = await this.form.evalByTree(item.syntaxTree, context, null);
        } else if (item.formula) {
            result = await this.form.eval(item.formula, context, null);
        } else if (item.formulaValue) {
            result = await this.form.eval(item.formulaValue, context, null);
        } else if (item.defaultValue) {
            result = item.defaultValue;
        }
        return result;
    },
    calcEnable: async function (item, context, defaultValue) {
        if (!this.checkEnableRights(item)) {
            return false;
        }
        if (item.items.length == 0) {
            return defaultValue;
        }
        if (!item.treeInit) {
            this.initTree(item);
        }
        for (var i = 0, o; o = item.items[i]; i++) {
            if (o.syntaxTree && !YIUI.TypeConvertor.toBoolean(await this.form.evalByTree(o.syntaxTree, context))) {
                return false;
            }
        }
        return true;
    },
    checkEnableRights: function (item) {
        if (item.type == YIUI.UIEnableProcess.Operation) {
            return this.form.hasOptRight(item.target);
        }
        return this.form.hasEnableRight(item.target);
    },
    calcVisible: async function (item, context, defaultValue) {
        if (!this.checkVisibleRights(item)) {
            return false;
        }
        // if (item.items.length == 0) {
        //     return defaultValue;
        // }
        if (!item.treeInit) {
            this.initTree(item);
        }
        for (var i = 0, o; o = item.items[i]; i++) {
            if (o.syntaxTree && !YIUI.TypeConvertor.toBoolean(await this.form.evalByTree(o.syntaxTree, context))) {
                return false;
            }
        }
        return true;
    },

    checkVisibleRights: function (item) {
        if (item.type == YIUI.UIVisibleProcess.Operation) {
            return this.form.hasOptRight(item.target);
        }
        return this.form.hasVisibleRight(item.target);
    },


    calcCheckRule: async function (item, context) {
        var result = null;
        if (item.syntaxTree) {
            result = await this.form.evalByTree(item.syntaxTree, context, null);
        } else if (item.content) {
            result = await this.form.evalFormula(item.content, context, null);
        }
        return result;
    }

})
// })();