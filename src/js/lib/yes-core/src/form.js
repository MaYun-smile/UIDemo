import { YIUI } from './YIUI-base';
import { DataType } from './YIUI-common';
import { View } from './YIUI-parser';
import './YIUI-svr';
import './formIdGenerator';
import './yes-ui';
import { FilterMap, TableFilterDetail } from './filtermap';
import './showdata';
import './formadapt';
import './paras';
import './formstack';
import './process/viewdatamonitor';
import { MemoryAdapter } from './cache/memoryAdapter';
import CacheWrap from './cache/cache';
import Decimal from 'decimal.js';
import getDispatcher from './dispatchers';

export default YIUI.Form = YIUI.extend({
    init: function (metaForm, formID) {
        this.formID = formID != null ? formID : YIUI.Form_allocFormID();
        this.metaForm = metaForm;
        this.setOperationState(metaForm.initState == YIUI.Form_OperationState.Edit ? metaForm.operationState : metaForm.initState);

        this.type = metaForm.type;
        this.operations = metaForm.operations;
        this.metaOpts = metaForm.metaOpts;// 只有可见可用的配置
        this.defTbr = metaForm.defTbr;
        this.formKey = metaForm.formKey;
        this.caption = metaForm.caption;
        this.abbrCaption = metaForm.abbrCaption;
        this.formulaCaption = metaForm.formulaCaption;
        this.formulaAbbrCaption = metaForm.formulaAbbrCaption;
        this.target = metaForm.target;
        this.mainTableKey = metaForm.mainTableKey;
        this.onLoad = metaForm.onLoad;
        var rootObj = metaForm.root;
        this.standalone = metaForm.standalone;
        this.relations = metaForm.relations;
        this.macroMap = metaForm.macroMap;
        this.statusItems = metaForm.statusItems;
        this.paraGroups = metaForm.paraGroups;
        this.sysExpVals = metaForm.sysExpVals;
        //        this.filterMap = metaForm.filterMap;
        this.dependency = metaForm.dependency;
        this.paras = metaForm.paras;
        this.callParas = metaForm.callParas;
        this.paraCollection = metaForm.paraCollection;
        this.checkRules = metaForm.checkRules;
        this.subDetailInfo = metaForm.subDetailInfo;
        this.mapGrids = metaForm.mapGrids;
        this.errorInfo = metaForm.errorInfo;
        this.dataObjectKey = metaForm.dataObjectKey;
        //this.refObjectKey = metaForm.refObjectKey;
        //this.refTableKey = metaForm.refTableKey;
        this.postShow = metaForm.postShow;
        this.parser = new View.Parser(this);
        // this.uiProcess = new YIUI.UIProcess(this);
        // this.focusManager = new FocusPolicy(this);
        // this.viewDataMonitor = new YIUI.ViewDataMonitor(this);
        this.result = null;
        this.eventList = {};
        this.timerTask = metaForm.timerTask;
        this.metaComps = metaForm.metaComps;
        this.metaCells = metaForm.metaCells;
        // this.metaOpts = metaForm.metaOpts;
        this.buddyKeys = metaForm.buddyKeys || [];

        this.popWidth = metaForm.popWidth;
        this.popHeight = metaForm.popHeight;
        this.topMargin = metaForm.topMargin;
        this.bottomMargin = metaForm.bottomMargin;
        this.leftMargin = metaForm.leftMargin;
        this.rightMargin = metaForm.rightMargin;
        this.templateKey = metaForm.templateKey;

        var options = {
            form: this,
            rootObj: rootObj,
            // focusManager:this.focusManager
        };
        console.log(options)
        this.mergeOptContainer = null;

        this.formAdapt = new YIUI.FormAdapt(options);
        this.formAdapt.load();

        var fm = new FilterMap();
        var map = this.formAdapt.LVMap.concat(this.formAdapt.gridMap);
        for (var i = 0, len = map.length; i < len; i++) {
            var key = map[i].key;
            var tableKey = map[i].tableKey;

            if (tableKey) {
                var comp = this.getComponent(key);
                var meta = comp.getMetaObj();
                if (meta.pageLoadType == YIUI.PageLoadType.DB) {
                    var tblDetail = new TableFilterDetail();
                    tblDetail.setTableKey(meta.tableKey);
                    tblDetail.setStartRow(0);
                    tblDetail.setMaxRows(meta.pageRowCount || 50);
                    tblDetail.setPageIndicatorCount(meta.pageIndicatorCount || 5);
                    fm.addTblDetail(tblDetail);
                }
            }
        }
        this.filterMap = fm;
        const ma = new MemoryAdapter();
        const cxt = new View.Context(this);
        this.formulaCache = new CacheWrap(ma, 'formula', async (table, key) => {
            cxt.rowIndex = this.formulaRowIndex;
            const data = await this.parser.eval(key, cxt);
            return {
                data
            };
        });
        YIUI.FormStack.addForm(this);
    },
    convertValue: function (value, type) {
        var ret;
        switch (type) {
            case DataType.STRING:
                if (value == null || value == undefined) {
                    ret = '';
                } else {
                    ret = '' + value;
                }
                break;
            case DataType.INT:
            case DataType.LONG:
            case DataType.DOUBLE:
            case DataType.FLOAT:
            case DataType.NUMERIC:
                if (value == undefined || value == null || value == '') {
                    ret = 0;
                } else {
                    if (value.toString().toLowerCase() == "true") value = 1;
                    if (value.toString().toLowerCase() == "false") value = 0;
                    ret = new Decimal(value, 10);
                }
                break;
            case DataType.BOOLEAN:
                ret = value ? true : false;
                break;
            // case DataType.DATETIME:
            // case DataType.DATE:
            //     if(value instanceof Date){
            //         ret = value.getTime();
            //     }else{
            //         ret = null;
            //     }
            //     break;
            default:
                ret = value;
        }
        return ret;
    },

    setUniqueId(id) {
        this.uniqueId = id;
    },

    getUniqueId() {
        return this.uniqueId;
    },

    getRadios: function (groupKey) {
        return this.formAdapt.getRadios(groupKey);
    },

    isError: function () {
        return this.errorInfo.error;
    },

    /**
     * 设置工作流权限处理类
     * @param proxy
     */
    setBPMStatusProxy: function (proxy) {
        this.BPMStatusProxy = proxy;
    },

    /**
     * 获取工作流权限处理类
     * @returns {*|YIUI.HostStatusProxy}
     */
    getBPMStatusProxy: function () {
        return this.BPMStatusProxy;
    },

    hasEnableRight: function (fieldKey) {
        return fieldKey && this.formRights &&
            (this.formRights.allEnableRights || (this.formRights.enableRights && !this.formRights.enableRights.includes(fieldKey)));
    },

    hasVisibleRight: function (fieldKey) {
        return fieldKey && this.formRights &&
            (this.formRights.allVisibleRights || (this.formRights.visibleRights && !this.formRights.visibleRights.includes(fieldKey)));
    },

    hasOptRight: function (optKey) {
        return optKey && this.formRights &&
            (this.formRights.allOptRights || (this.formRights.optRights && this.formRights.optRights.includes(optKey)));
    },

    /**
     * 初始化界面处理逻辑
     */
    initViewDataMonitor: function () {
        this.viewDataMonitor = new YIUI.ViewDataMonitor(this);
    },

    /**
     *  获取需要合并操作的容易标识
     * @returns {mergeOptContainer}
     */
    getMergeOptContainer: function () {
        return this.mergeOptContainer;
    },

    getCaption: function () {
        var caption = "";
        var formula = this.formulaCaption;
        if (formula) {
            var cxt = new View.Context(this);
            caption = this.eval(formula, cxt);
        }
        if (!caption) {
            caption = this.caption;
        }
        return caption;
    },
    setTemplateKey: function (templateKey) {
        this.templateKey = templateKey;
    },
    getTemplateKey: function () {
        return this.templateKey;
    },
    getAbbrCaption: function () {
        var abbr = "";
        var formula = this.formulaAbbrCaption;
        if (formula) {
            var cxt = new View.Context(this);
            abbr = this.eval(formula, cxt);
        }
        if (!abbr) {
            abbr = this.abbrCaption;
        }
        if (!abbr) {
            abbr = this.getCaption();
        }
        return abbr;
    },

    doOnLoad: async function () {
        const metaForm = this.metaForm;
        const scriptCollection = metaForm.scriptCollection;
        const loadScript = scriptCollection["load"];
        const cxt = new View.Context(this);
        const onLoad = this.onLoad;

        if (this.getOID() == -1 || this.operationState === YIUI.Form_OperationState.New) { // 非具体单据
            const data = await YIUI.DocService.newDocument(this.getFormKey());
            const doc = YIUI.DataUtil.fromJSONDoc(data);
            this.setDocument(doc);
            if (onLoad) {
                await this.eval(onLoad, cxt);
            }
            getDispatcher().dispatch({
                type: 'STOPEVENT',
            });
            try {
                await this.showDocument();
            } finally {
                getDispatcher().dispatch({
                    type: 'ENABLEEVENT',
                });
            }
        } else {
            if (!this.getDocument()) {
                const data = await YIUI.DocService.newDocument(this.getFormKey());
                const doc = YIUI.DataUtil.fromJSONDoc(data);
                const oid = this.getOID();
                doc.oid = oid;
                this.setDocument(doc);
            }
            if (loadScript && this.getDocument().oid > 0) {
                await this.eval(loadScript, cxt, null);
            }
            if (onLoad) {
                await this.eval(onLoad, cxt);
            }
        }
    },

    setOptQueue: function (optQueue) {
        this.optQueue = optQueue;
    },

    doOptQueue: function () {
        var optQueue = this.optQueue;
        if (optQueue) {
            return optQueue.doOpt();
        }
        return $.Deferred(function (def) {
            def.resolve(false);
        });
    },

    setOperationEnable: function (key, enable) {
        if (!this.defaultToolBar)
            return;
        this.defaultToolBar.setItemEnable(key, enable);
    },

    setOperationVisible: function (key, visible) {
        if (!this.defaultToolBar)
            return;
        this.defaultToolBar.setItemVisible(key, visible);
    },

    getMetaComp: function (key) {
        return this.metaComps[key];
    },

    getMetaOpt: function (key) {
        return this.metaOpts[key];
    },

    getMetaCell: function (key) {
        return this.metaCells[key];
    },

    setOID: function (oid) {
        this.filterMap.setOID(oid);
    },

    getOID: function () {
        var document = this.getDocument();
        if (document) {
            return document.oid;
        } else {
            return this.filterMap.getOID();
        }
    },

    setSysExpVals: function (key, value) {
        if (!this.sysExpVals) {
            this.sysExpVals = {};
        }
        this.sysExpVals[key] = value;
    },

    getSysExpVals: function (key) {
        if (this.sysExpVals) {
            return this.sysExpVals[key];
        }
        return null;
    },

    removeSysExpVals: function (key) {
        if (this.sysExpVals) {
            delete this.sysExpVals[key];
        }
    },

    isStandalone: function () {
        return this.standalone;
    },
    setResult: function (result) {
        this.result = result;
    },
    getResult: function () {
        return this.result;
    },

    getFormAdapt: function () {
        return this.formAdapt;
    },
    //
    // addOpt: function(tbr, expOpts, optMap) {
    // 	if(!expOpts || !expOpts.items) return;
    // 	var items = expOpts.items;
    //
    //     var metaTbl = tbr.getMetaObj();
    //     var metaItems = metaTbl.metaItems;
    //     $.extend(metaItems, expOpts.metaItems)
    // 	for (var i = 0, len = items.length; i < len; i++) {
    // 	var item = items[i];
    // 	item.formID = expOpts.formID;
    // 	tbr.items.push(item);
    // 	optMap[item.key] = {
    // 		barKey: this.defTbr,
    // 		opt: item
    // 	};
    // }
    // this.cFormID = expOpts.formID;
    // this.hasMerge = true;
    // },
    //
    // delOpt: function(tbr, expOpts, optMap) {
    // 	var items = expOpts.items;
    // var len = items.length;
    // var len2 = tbr.items.length;
    // tbr.items.splice(len2 - len, len);
    //
    //     var metaTbl = tbr.getMetaObj();
    //     var metaItems = metaTbl.metaItems;
    //
    // this.hasMerge = false;
    // for (var i = 0, len = items.length; i < len; i++) {
    // 	var item = items[i];
    // 	delete optMap[item.key];
    //        delete metaItems[item.key];
    // }
    // },

    getOptMap: function () {
        return this.formAdapt.getOptMap();
        // var expOpts = this.expOpts;
        // if(this.mergeOpt) {
        // 	if(this.cFormID) {
        // 		var cFormID = expOpts.formID;
        // 	var cForm = YIUI.FormStack.getForm(cFormID);
        // 	this.delOpt(this.defaultToolBar, expOpts, optMap);
        // 		if(!cForm) {
        // 		this.cFormID = null;
        // 		} else {
        // 		expOpts.formID = cForm.formID;
        // 		this.addOpt(this.defaultToolBar, expOpts, optMap);
        // 		}
        // 	} else if(!this.hasMerge) {
        // 	this.addOpt(this.defaultToolBar, expOpts, optMap);
        // 	}
        // }
        // return optMap;
    },

    setError: function (error, errorMsg, errorSource) {
        this.errorInfo = { error: error, errorMsg: errorMsg, errorSource: errorSource };
        if (error) {
            this.showErrMsg(errorMsg);
        } else {
            this.hideErrMsg();
        }
    },
    getCellSubDtlComps: function (gridKey, cellKey) {
        var map = this.formAdapt.getCellSubDtlCompMap();
        if (map == null) return null;
        var gridMap = map[gridKey];
        if (gridMap == null) return null;
        return gridMap[cellKey];
    },
    getGridInfoMap: function () {
        return this.formAdapt.getGridMap();
    },
    getGridInfoByTableKey: function (tableKey) {
        var gridMap = this.getGridInfoMap(), grid;
        for (var i = 0, len = gridMap.length; i < len; i++) {
            grid = gridMap[i];
            if (grid.tableKey == tableKey) {
                return grid;
            }
        }
    },
    getGridInfoByKey: function (key) {
        var gridMap = this.getGridInfoMap(), grid;
        for (var i = 0, len = gridMap.length; i < len; i++) {
            grid = gridMap[i];
            if (grid.key == key) {
                return grid;
            }
        }
    },
    getListView: function (arg) {
        return this.formAdapt.getListView(arg);
    },

    setDefaultToolBar: function (toolBar) {
        this.defaultToolBar = toolBar;
    },

    getComponentList: function () {
        return this.formAdapt.getCompList();
    },
    getComponent: function (comKey) {
        return this.formAdapt.getComp(comKey);
    },
    getCompByDataBinding: function (tableKey, columnKey) {
        var compList = this.formAdapt.compList, com;
        for (var key in compList) {
            com = compList[key];
            if (com.tableKey === tableKey && com.columnKey === columnKey)
                return com;
        }
        return null;
    },
    getPanel: function (key) {
        return this.formAdapt.getPanel(key);
    },
    setFormKey: function (formKey) {
        this.formKey = formKey;
    },
    getFormKey: function () {
        return this.formKey;
    },
    setCaption: function (caption) {
        this.caption = caption;
    },
    getCaption: function () {
        return this.caption;
    },
    getDataObjectKey: function () {
        return this.dataObjectKey;
    },
    getDataObject: function () {
        return this.metaForm.dataObject;
    },
    getRoot: function () {
        return this.formAdapt.getRoot();
    },
    setDocument: function (document) {
        this.documentNotShow = true;
        this.document = document;
    },
    getDocument: function () {
        return this.document;
    },
    showDocument: async function (commitValue) {
        if (this.isShowing || !this.documentNotShow) {
            return;
        }
        this.isShowing = true;
        try {
            await this.reloadFormRights();
            var showData = new YIUI.ShowData(this);
            await showData.show(commitValue);

            if (this.postShow) {
                var cxt = { form: this };
                await this.eval(this.postShow, cxt);
            }
        } finally {
            this.documentNotShow = false;
            this.isShowing = false;
        }
    },
    async reloadFormRights() {
        const info = this.getSysExpVals(YIUI.BPMKeys.WORKITEM_INFO);
        let workitemID = -1;
        if (info) {
            workitemID = info.WorkitemID;
        }
        const formKey = this.metaForm.formKey;
        const params = {
            formKey,
            OID: this.getOID(),
            workitemID,
            parameters: this.getParas().toJSON(),
        };
        const rights = await YIUI.RightsService.loadFormRights(formKey, params);
        this.setFormRights(rights);
    },
    setWillShow: function (show) {
        this.show = show;
    },
    willShow: function () {
        return this.show;
    },
    setShowing: function (showing) {
        this.showing = showing;
    },
    showing: function () {
        return this.showing();
    },
    setComponentValue: async function (key, value, fireEvent) {
        await this.formAdapt.setCompValue(key, value, fireEvent);
    },
    setCellValByIndex: function (key, rowIndex, colIndex, value, fireEvent) {
        this.formAdapt.setCellValByIndex(key, rowIndex, colIndex, value, fireEvent);
    },
    getCellValByIndex: function (key, rowIndex, colIndex) {
        return this.formAdapt.getCellValByIndex(key, rowIndex, colIndex);
    },
    setCellValByKey: function (key, rowIndex, colKey, value, fireEvent) {
        this.formAdapt.setCellValByKey(key, rowIndex, colKey, value, fireEvent);
    },
    getCellValByKey: function (key, rowIndex, colKey) {
        return this.formAdapt.getCellValByKey(key, rowIndex, colKey);
    },
    getValueFromDocument: function (tableKey, columnKey) {
        const table = this.document.getByKey(tableKey);
        if (table) {
            return table.getByKey(columnKey);
        }
        return null;
    },
    getValue: function (key) {
        var com = this.getComponent(key);
        var cellLocation = this.getCellLocation(key);
        var row, column, value = null;
        if (cellLocation) {
            com = this.getComponent(cellLocation.key);
            switch (com.getMetaObj().type) {
                case YIUI.CONTROLTYPE.GRID:
                    row = cellLocation.row;
                    if (row == null || row == -1) {
                        row = com.getFocusRowIndex();
                    }
                    value = com.getValueAt(row, cellLocation.column);
                    break;
                case YIUI.CONTROLTYPE.LISTVIEW:
                    row = com.getFocusRowIndex();
                    value = com.getValue(row, cellLocation.column);
                    break;
                case YIUI.CONTROLTYPE.TABLEVIEW:
                    value = this.getValueFromDocument(cellLocation.tableKey, cellLocation.columnKey);
                    break;
            }
        } else { // 直接写表格key,取焦点行列值
            com = this.getComponent(key);
            if (!com) {
                return null;
            }
            switch (com.getMetaObj().type) {
                case YIUI.CONTROLTYPE.GRID:
                    var row = com.getFocusRowIndex(),
                        column = com.getFocusColIndex();
                    if (row != -1 && column != -1) {
                        value = com.getValueAt(row, column);
                    }
                    break;
                default:
                    value = com.getValue();
                    break;
            }
        }
        return value;
    },
    getCellLocation: function (key) {
        return this.formAdapt.getCellLocation(key);
    },
    getColumnInfo: function (key) {
        return this.formAdapt.getColumnInfo(key);
    },
    setFilterMap: function (filterMap) {
        this.filterMap = filterMap;
    },
    getFilterMap: function () {
        return this.filterMap;
    },
    getMainTableKey: function () {
        return this.mainTableKey;
    },
    setCondParas: function (conParas) {
        this.conParas = conParas;
    },
    getCondParas: function () {
        return this.conParas == null ? {} : this.conParas;
    },
    setInitOperationState: function (initOperationState) {
        this.initOperationState = initOperationState;
    },
    getInitOperationState: function () {
        return this.initOperationState;
    },
    setOperationState: function (operationState) {
        this.operationState = operationState;
    },
    getOperationState: function () {
        return this.operationState;
    },
    // setOperationEnable: function (key, enable) {
    //     var opts = this.getOptMap();
    //     var opt = opts[key];
    //     var barKey = opt.barKey;
    //     var toolbar = this.getComponent(barKey);
    //     toolbar.setItemEnable(key, enable);
    // },
    resetUIStatus: async function (mask) {
        await this.getUIProcess().resetUIStatus(mask);
    },
    getUIProcess: function () {
        return this.viewDataMonitor.getUIProcess();
    },
    getViewDataMonitor: function () {
        return this.viewDataMonitor;
    },
    setDefContainer: function (defContainer) {
        this.formAdapt.setDefContainer(defContainer);
    },
    getDefContainer: function () {
        return this.formAdapt.getDefContainer(this.defCtKey);
    },
    setContainer: function (container) {
        var self = this;
        this.formAdapt.setContainer(container);
        //        self.initFirstFocus();
    },
    render: function () {
        // var ct = this.getContainer();
        // if(ct) {
        // 	ct.renderDom(this);
        //     if(this.defCtKey) {
        //     	var ct = this.getComponent(this.defCtKey);
        //     	ct && this.setDefContainer(ct);
        //     }
        //     this.rendered = true;
        //     var errDiv = $('<div class="errorinfo"><label/><span class="closeIcon"></span></div>');
        //     errDiv.prependTo(this.getRoot().el);
        //     this.setErrDiv(errDiv);
        // }

    },
    getContainer: function () {
        // return this.formAdapt.getContainer();
    },
    newCxt: function () {
        var cxt = new View.Context(this);
        return cxt;
    },
    getRelations: function () {
        return this.dependency.relations;
    },
    setPara: function (key, value) {
        this.paras.put(key, value);
    },
    hasRelation: function (key) {
        for (const relations in this.dependency.relationTree) {
            if (relations.includes(key)) {
                return true;
            }
        }
        return false;
    },
    getPara: function (key) {
        return this.paras != null ? this.paras.get(key) : null;
    },
    setCallPara: function (key, value) {
        this.callParas.put(key, value);
    },
    getCallPara: function (key) {
        return this.callParas.get(key);
    },
    getParaCollection: function () {
        return this.paraCollection;
    },
    getParas: function () {
        if (this.paras == undefined) {
            this.paras = {};
        }
        return this.paras;
    },
    getCallParas: function () {
        if (this.callParas == undefined) {
            this.callParas = {};
        }
        return this.callParas;
    },
    getUIProcess: function () {
        return this.viewDataMonitor.getUIProcess();
    },
    refreshParas: async function () {
        return await this.getUIProcess().refreshParas();
    },
    //    setWorkitemInfo: function (workitemInfo) {
    //        this.workitemInfo = workitemInfo;
    //    },
    //    getWorkitemInfo: function () {
    //        return this.workitemInfo;
    //    },
    setErrDiv: function (errDiv) {
        // this.errDiv = errDiv;
        // var self = this;
        // setTimeout(function () {
        //     if (!self.isDestroyed) {
        //         self.setError(self.errorInfo.error, self.errorInfo.errorMsg, self.errorInfo.errorSource);
        //     }
        // }, 0);
    },
    showErrMsg: function (msg) {
        // if (!this.errDiv || this.errDiv.css("display") == "block") return;
        // $("label", this.errDiv).text(msg);
        // this.errDiv.show();
        // var newH = this.getRoot().getHeight() - this.errDiv.height();
        // var newW = this.getRoot().getWidth();
        // this.getRoot().doLayout(newW, newH);
    },
    hideErrMsg: function () {
        // if (!this.errDiv || this.errDiv.css("display") == "none") return;
        // this.errDiv.hide();
        // var newH = this.getRoot().getHeight();
        // var newW = this.getRoot().getWidth();
        // this.getRoot().doLayout(newW, newH);
    },
    reloadTable: function (key) {
        var document = this.getDocument();
        var filterMap = this.getFilterMap();
        filterMap.setType(YIUI.DocumentType.DETAIL);
        var condParas = this.getCondParas();
        var paras = {};
        paras.service = "PureOpt";
        paras.cmd = "ReloadTable";
        paras.tableKey = key;
        paras.formKey = this.formKey;
        paras.filterMap = $.toJSON(filterMap);
        paras.condParas = $.toJSON(condParas);
        var table = Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
        if (table) {
            document.remove(key);
            document.add(key, table);
        }
    },
    initFirstFocus: function () {
        // var size = this.formAdapt.getOrderList().length;
        // this.focusManager.focusNextNode(0,size);
    },
    getParentForm: function () {
        return YIUI.FormStack.getForm(this.pFormID);
    },
    fireClose: function () {
        if (this.type != YIUI.Form_Type.Entity) {
            this.close();
            return true;
        }

        if (this.operationState == YIUI.Form_OperationState.Default || this.operationState == YIUI.Form_OperationState.Delete) {
            this.close();
            return true;
        }
        // var options = {
        //     msg: YIUI.I18N.form.closeInterface,
        //     msgType: YIUI.Dialog_MsgType.YES_NO
        // };
        // var dialog = new YIUI.Control.Dialog(options);
        // dialog.render();
        // var $form = this;
        // dialog.regEvent(YIUI.Dialog_Btn.STR_YES, function () {
        //     $form.close();
        // });
        // dialog.regEvent(YIUI.Dialog_Btn.STR_NO, function () {
        // });
    },
    close: function () {
        var callback = this.getEvent(YIUI.FormEvent.Close);
        if (callback) {
            callback.doTask(this, null);
        }
        // if (this.target == 2) {
        //     $("#" + this.formID).close();
        //     YIUI.FormStack.removeForm(this.formID);
        // } else {
        //     this.getContainer().removeForm(this);
        // }
    },
    evalFormula: async function (formula, context, callback, noCache = false) {
        if (typeof formula != 'string') {
            return formula;
        }
        const rowIndex = context ? context.rowIndex : null;
        if (rowIndex != this.formulaRowIndex) {
            this.formulaRowIndex = context.rowIndex;
            this.clearFormulaCache();
        }
        return await this.formulaCache.get(formula, noCache);
        // return await this.parser.eval(formula, ctx);
    },
    eval: async function (formula, context, callback) {
        if (formula) {
            //异步调用可能 form 已destory
            //debugger;
            if (this.parser) {
                // console.log(formula);
                if (!context) {
                    context = new View.Context(this);
                }
                const result = await this.parser.eval(formula, context, callback);
                return result;
            } else {
                console.error('form is destroyed ' + formula + '  formKey' + this.formKey);
            }
        }
        return null;
    },
    eval2: async function (formula, syntaxTree, evalContext, scope) {
        if (formula) {
            return await this.parser.eval2(formula, syntaxTree, evalContext, scope);
        }
        return null;
    },
    evalByTree: async function (tree, context, callback) {
        if (tree !== null && tree !== undefined) {
            return await this.parser.evalByTree(tree, context, callback);
        }
        return null;
    },
    getSyntaxTree: function (script) {
        if (script.length == 0) {
            return null;
        } else {
            return this.parser.getSyntaxTree(script);
        }
    },
    toJSON: function () {
        var json = {};
        var jsonArr = this.formAdapt.toJSON();
        json.key = this.formKey;
        json.items = jsonArr;
        json.filterMap = this.getFilterMap();
        json.condParas = this.getCondParas();
        json.operationState = this.operationState;
        return $.toJSON(json);
    },
    destroy: function () {
        this.uiProcess = null;
        this.parser = null;
        this.document = null;
        this.dependency = null;
        this.isDestroyed = true;

        // YIUI.Print.del(this.formID);
    },

    regEvent: function (key, callback) {
        if (!this.eventList) {
            this.eventList = {};
        }
        this.eventList[key] = callback;
    },

    getEvent: function (key) {
        var event = null;
        if (this.eventList) {
            event = this.eventList[key]
        }
        return event;
    },

    removeEvent: function (key) {
        if (this.eventList) {
            delete this.eventList[key];
        }
    },

    getTabCompList: function () {
        return this.formAdapt.getOrderList();
    },

    getFocusManager: function () {
        return this.focusManager;
    },

    dealTabOrder: function () {
        // var orderList = this.formAdapt.getOrderList(),com;
        // orderList.sort(function (comp1, comp2) {
        //     return comp1.tabOrder - comp2.tabOrder;
        // });
        // orderList = orderList.concat(this.formAdapt.getUnOrderList());
        // for (var i = 0, len = orderList.length; i < len; i++) {
        //     orderList[i].setTabIndex(i);
        // }
        // this.formAdapt.orderList = orderList;
        // this.formAdapt.unOrderList = null;
    },
    setFormRights: function (rights) {
        this.formRights = rights;
    },
    getFormRights: function () {
        return this.formRights || null;
    },
    setValueToDocument: function (control, dataTable, columnKey, bookmark, newValue) {
        if (dataTable.indexByKey(columnKey) == -1) return;
        var type = control.type;
        var dataType = dataTable.cols[dataTable.indexByKey(columnKey)].type;
        bookmark == -1 ? dataTable.first() : dataTable.setByBkmk(bookmark);
        if (newValue == undefined || newValue == null) {
            newValue = this.convertValue(newValue, dataType);
            dataTable.setByKey(columnKey, newValue);
        } else {
            switch (type) {
                case YIUI.CONTROLTYPE.DICT:
                case YIUI.CONTROLTYPE.DYNAMICDICT:
                case YIUI.CONTROLTYPE.COMPDICT:
                    if (control.multiSelect) {
                        if (newValue.length > 0) {
                            var str = '';
                            for (var i = 0; i < newValue.length; i++) {
                                str += ',' + newValue[i].oid;
                            }
                            str = str.substring(1);
                            dataTable.setByKey(columnKey, str);

                            // if (type == YIUI.CONTROLTYPE.DYNAMICDICT || type == YIUI.CONTROLTYPE.COMPDICT) {
                            //     dataTable.setByKey(columnKey + 'ItemKey', newValue[0].itemKey);
                            // }
                        }
                    } else {
                        dataTable.setByKey(columnKey, newValue);
                        // if (type == YIUI.CONTROLTYPE.DYNAMICDICT || type == YIUI.CONTROLTYPE.COMPDICT) {
                        //     dataTable.setByKey(columnKey + 'ItemKey', newValue.itemKey);
                        // }
                    }
                    break;
                // case YIUI.CONTROLTYPE.DATEPICKER:
                //     if (newValue instanceof Date) {
                //         newValue = newValue.getTime();
                //     } else {
                //         newValue = new Date(newValue).getTime();
                //     }
                //     dataTable.setByKey(columnKey, newValue);
                //     break;
                default:
                    newValue = this.convertValue(newValue, dataType);
                    dataTable.setByKey(columnKey, newValue);
            }
        }
    },
    clearFormulaCache() {
        this.formulaCache.clear();
    },
    /**
     * 各控件的值变化事件
     * formID: 控件所在表单的ID
     * controlKey: 控件自身的key
     * newValue: 新的存储值
     */
    doValueChanged: async function (control, newValue, commitValue, fireEvent) {
        let form = this,
            columnKey = control.columnKey,
            tableKey = control.tableKey, dataTable,
            document = form.getDocument();
        this.formulaCache.clear();
        if (commitValue && document) {
            if (tableKey) {
                dataTable = document.getByKey(tableKey);
            }
            // 子明细设置值
            if (control.isSubDetail) {
                var cellKey = control.bindingCellKey;
                var grid = form.getComponent(control.parentGridKey), row, colIndex,
                    rowIndex = (grid == null ? -1 : grid.getFocusRowIndex());
                if (isNaN(rowIndex) || rowIndex == -1) {
                    rowIndex = grid.getLastDetailRowIndex();
                    if (rowIndex != -1) {
                        grid.setFocusRowIndex(rowIndex);
                        grid.setCellFocus(rowIndex, grid.getCellIndexByKey(cellKey));
                    }
                }
                if (rowIndex >= 0) {
                    if (cellKey) { //  绑定单元格
                        colIndex = grid.getCellIndexByKey(cellKey);
                        if (colIndex !== -1) {
                            grid.setValueAt(rowIndex, colIndex, newValue, true, fireEvent);
                        }
                    } else { // 自有数据绑定
                        row = grid.dataModel.data[rowIndex];
                        if (row.isDetail && row.bookmark !== undefined) {
                            if (dataTable) {
                                if (dataTable.tableMode == YIUI.TableMode.HEAD) {
                                    this.setValueToDocument(control, dataTable, columnKey, -1, newValue);
                                } else {
                                    this.setValueToDocument(control, dataTable, columnKey, row.bookmark, newValue);
                                }
                            }
                        }
                    }
                }
            } else {
                if (dataTable) {
                    this.setValueToDocument(control, dataTable, columnKey, -1, newValue);
                }
            }
        }
        // 触发事件之前需要做的事
        await form.getViewDataMonitor().preFireValueChanged(control);

        // 触发事件
        if (fireEvent) {
            await form.getViewDataMonitor().fireValueChanged(control);
        }
        // 触发事件之后需要做的事
        await form.getViewDataMonitor().postFireValueChanged(control);
    },
});

export const MetaForm = YIUI.MetaForm = YIUI.extend({
    init: function (jsonObj) {
        this.operationState = jsonObj["operationState"] ? jsonObj["operationState"] : YIUI.Form_OperationState.Default;
        this.initState = jsonObj["initState"] || YIUI.Form_OperationState.Default;
        this.type = jsonObj["type"] || YIUI.Form_Type.Normal;
        this.operations = jsonObj["operations"];
        this.metaOpts = jsonObj["metaOpts"];
        this.defTbr = jsonObj["defTbr"];
        this.formKey = jsonObj["key"];
        this.caption = jsonObj["caption"];
        this.abbrCaption = jsonObj["abbrCaption"];
        this.formulaCaption = jsonObj["formulaCaption"];
        this.formulaAbbrCaption = jsonObj["formulaAbbrCaption"];
        this.target = jsonObj["target"];
        this.mainTableKey = jsonObj["mainTableKey"];
        this.onLoad = jsonObj["onLoad"];
        this.scriptCollection = jsonObj["scriptCollection"];
        this.cellTypeGroup = jsonObj["cellTypeGroup"];

        var body = jsonObj["body"];
        var indexOfblock = body["index_of_block"];
        var block = body["items"][indexOfblock];

        var root = block["root"];
        root.topMargin = jsonObj["topMargin"];
        root.bottomMargin = jsonObj["bottomMargin"];
        root.leftMargin = jsonObj["leftMargin"];
        root.rightMargin = jsonObj["rightMargin"];
        root.abbrCaption = jsonObj["abbrCaption"];
        root.hAlign = jsonObj["hAlign"];
        root.height = "100%";
        this.root = root;
        this.authenticate = jsonObj["authenticate"];
        this.standalone = jsonObj["standalone"] || false;
        this.relations = jsonObj["relations"];
        this.macroMap = jsonObj["macroMap"];
        this.statusItems = jsonObj["statusItems"];
        this.paraGroups = jsonObj["paraGroups"];
        this.sysExpVals = jsonObj["sysExpVals"];
        this.dependency = jsonObj["dependency"];
        this.paras = new YIUI.Paras(jsonObj["parameters"]);
        this.callParas = new YIUI.Paras(jsonObj["callParameters"]);
        this.paraCollection = jsonObj["paraCollection"];
        this.checkRules = jsonObj["checkRules"];
        this.subDetailInfo = jsonObj["subDetailInfo"];
        this.mapGrids = jsonObj["mapGrids"];
        this.errorInfo = { error: jsonObj["isError"], errorMsg: jsonObj["errorMsg"], errorSource: jsonObj["errorSource"] };
        this.dataObject = jsonObj["dataObject"] || {};
        this.dataObjectKey = this.dataObject.key || null;
        //this.refObjectKey = jsonObj["refObjectKey"] || null;
        //this.refTableKey = jsonObj["refTableKey"] || null;
        this.postShow = jsonObj["postShow"] || null;
        this.timerTask = jsonObj["timerTask"];
        this.metaComps = jsonObj["metaComps"] || {};
        this.metaCells = jsonObj["metaCells"] || {};
        this.buddyKeys = jsonObj["buddyKeys"] || [];

        this.popWidth = jsonObj["popWidth"];
        this.popHeight = jsonObj["popHeight"];
        this.topMargin = jsonObj["topMargin"];
        this.bottomMargin = jsonObj["bottomMargin"];
        this.leftMargin = jsonObj["leftMargin"];
        this.rightMargin = jsonObj["rightMargin"];

        this.templateKey = jsonObj["templateKey"];
    },

    getComponent: function (key) {
        return this.metaComps[key];
    }
});