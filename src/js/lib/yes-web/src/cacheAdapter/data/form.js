export default [{
    "errorSource": "Receipt",
    "statusItems": [{"caption": "已输入", "value": 10, "key": "10"}, {
        "caption": "已确认",
        "value": 20,
        "key": "20"
    }, {"caption": "已配车", "value": 30, "key": "30"}, {"caption": "已拣货", "value": 40, "key": "40"}, {
        "caption": "已发货",
        "value": 50,
        "key": "50"
    }, {"caption": "已提货", "value": 60, "key": "60"}, {"caption": "已装货", "value": 70, "key": "70"}, {
        "caption": "已发车",
        "value": 80,
        "key": "80"
    }, {"caption": "已卸货", "value": 90, "key": "90"}, {"caption": "已签收", "value": 100, "key": "100"}, {
        "caption": "已入库",
        "value": 110,
        "key": "110"
    }, {"caption": "已回单", "value": 120, "key": "120"}, {
        "caption": "已完成",
        "value": 130,
        "key": "130"
    }, {"caption": "已关闭", "value": 140, "key": "140"}, {
        "caption": "已结案",
        "value": 150,
        "key": "150"
    }, {"caption": "已驳回", "value": 160, "key": "160"}],
    "operationState": 2,
    "mainTableKey": "WM_ReceiptHead",
    "caption": "收货单",
    "type": 1,
    "refObjectKey": "",
    "body": {
        "index_of_block": 0,
        "items": [{
            "rootPanel": {
                "layout": "FlexFlowLayout",
                "metaObj": {
                    "visible": true,
                    "hAlign": 1,
                    "editable": true,
                    "backImagePosition": "center",
                    "vAlign": 0,
                    "required": false,
                    "overflowX": "Visible",
                    "overflowY": "Visible",
                    "enable": true,
                    "crFocus": false,
                    "position": 0,
                    "hasBorder": false,
                    "key": "main"
                },
                "valueChanged": "",
                "isPanel": true,
                "type": 9,
                "tagName": "flexflowlayoutpanel",
                "items": [{
                    "metaObj": {
                        "visible": true,
                        "hAlign": 1,
                        "enable": true,
                        "editable": true,
                        "crFocus": false,
                        "position": 0,
                        "hasBorder": false,
                        "vAlign": 0,
                        "key": "main_toolbar",
                        "required": false
                    },
                    "valueChanged": "",
                    "isPanel": false,
                    "type": 223,
                    "tagName": "toolbar",
                    "items": [{
                        "customKey": "",
                        "visible": true,
                        "visibleCont": "!ReadOnly()",
                        "enableCont": "",
                        "enable": true,
                        "icon": "",
                        "caption": "保存",
                        "action": "SaveData();UpdateView();",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "Save"
                    }, {
                        "customKey": "",
                        "visible": false,
                        "visibleCont": "ReadOnly() && GetStatus()==10",
                        "enableCont": "",
                        "enable": true,
                        "icon": "",
                        "caption": "编辑",
                        "action": "Edit();",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "Edit"
                    }, {
                        "customKey": "",
                        "visible": false,
                        "visibleCont": "ReadOnly()&& GetStatus()==10",
                        "enableCont": "",
                        "enable": true,
                        "icon": "",
                        "caption": "删除",
                        "action": "KillInstance(-1);\n\t\t\t\tDeleteData();\n\t\t\t\tUpdateView();\n\t\t\t\tClose();",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "Delete"
                    }, {
                        "customKey": "",
                        "visible": true,
                        "visibleCont": "!ReadOnly()",
                        "enableCont": "",
                        "enable": true,
                        "icon": "",
                        "caption": "取消",
                        "action": "Cancel()",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "Cancel"
                    }, {
                        "customKey": "",
                        "visible": false,
                        "visibleCont": "ReadOnly() && GetStatus()>=130",
                        "enableCont": "",
                        "enable": true,
                        "icon": "",
                        "caption": "生成上架单",
                        "action": "Map('Receipt2Putaway','Putaway')",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "MapDispatch"
                    }, {
                        "customKey": "",
                        "visible": false,
                        "visibleCont": "ReadOnly()",
                        "enableCont": "",
                        "enable": true,
                        "icon": "",
                        "caption": "审批记录",
                        "action": "ShowModal('WFLog')",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "ShowAuditDetil"
                    }],
                    "height": "pref"
                }, {
                    "layout": "SplitLayout",
                    "metaObj": {
                        "orientation": "vertical",
                        "visible": true,
                        "hAlign": 1,
                        "editable": true,
                        "backImagePosition": "center",
                        "vAlign": 0,
                        "required": false,
                        "overflowX": "Visible",
                        "overflowY": "Visible",
                        "enable": true,
                        "crFocus": false,
                        "position": 0,
                        "hasBorder": false,
                        "key": "main_split"
                    },
                    "valueChanged": "",
                    "splitSizes": [{"size": "23%"}, {"size": "72%"}, {"size": "5%"}],
                    "isPanel": true,
                    "type": 3,
                    "tagName": "splitpanel",
                    "items": [{
                        "layout": "GridLayout",
                        "metaObj": {
                            "padding": "5px",
                            "visible": true,
                            "hAlign": 1,
                            "editable": true,
                            "backImagePosition": "center",
                            "rowGap": 5,
                            "title": "基本信息",
                            "vAlign": 0,
                            "required": false,
                            "overflowX": "Visible",
                            "overflowY": "Visible",
                            "enable": true,
                            "crFocus": false,
                            "position": 0,
                            "hasBorder": false,
                            "key": "Basic"
                        },
                        "valueChanged": "",
                        "heights": [25, 25, 25, 25, 25, 25, 25, 25, 25],
                        "minWidths": ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
                        "caption": "基本信息",
                        "isPanel": true,
                        "widths": [8, 100, "25%", 20, 100, "25%", 20, 100, "25%", 20, 120, "25%", 8],
                        "type": 2,
                        "tagName": "gridlayoutpanel",
                        "items": [{
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_RECEIPT_NO",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "收货单号",
                            "isPanel": false,
                            "text": "收货单号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": false,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "trim": false,
                                "enable": false,
                                "crFocus": true,
                                "x": 2,
                                "y": 0,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "columnKey": "NO",
                                "key": "RH_RECEIPT_NO",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "enableCont": "false",
                            "caption": "收货单号",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 4,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_Status",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "状态",
                            "isPanel": false,
                            "text": "状态",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": false,
                                "defaultValue": "10",
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "dynamicItems": false,
                                "sourceType": 3,
                                "enable": true,
                                "crFocus": true,
                                "x": 5,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "Status",
                                "key": "Status"
                            },
                            "valueChanged": "",
                            "filterItems": true,
                            "isPanel": false,
                            "text": "已输入",
                            "type": 204,
                            "tagName": "combobox",
                            "globalItems": "",
                            "value": "10",
                            "items": [{"caption": "已输入", "value": "10"}, {
                                "caption": "已确认",
                                "value": "20"
                            }, {"caption": "已配车", "value": "30"}, {"caption": "已拣货", "value": "40"}, {
                                "caption": "已发货",
                                "value": "50"
                            }, {"caption": "已提货", "value": "60"}, {"caption": "已装货", "value": "70"}, {
                                "caption": "已发车",
                                "value": "80"
                            }, {"caption": "已卸货", "value": "90"}, {"caption": "已签收", "value": "100"}, {
                                "caption": "已入库",
                                "value": "110"
                            }, {"caption": "已回单", "value": "120"}, {"caption": "已完成", "value": "130"}, {
                                "caption": "已关闭",
                                "value": "140"
                            }, {"caption": "已结案", "value": "150"}, {"caption": "已驳回", "value": "160"}]
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 7,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_ORG_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "机构",
                            "isPanel": false,
                            "text": "机构",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "x": 8,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_ORG_ID",
                                "key": "RH_ORG_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {},
                            "root": "",
                            "caption": "机构",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Organization"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_LOGISTICS_NO",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "物流订单号",
                            "isPanel": false,
                            "text": "物流订单号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "targetType": "NewTab",
                                "vAlign": 0,
                                "required": false,
                                "url": "",
                                "tableKey": "WM_ReceiptHead",
                                "enable": true,
                                "crFocus": true,
                                "x": 2,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_LOGISTICS_NO",
                                "key": "RH_LOGISTICS_NO"
                            },
                            "clickContent": "Open('LogisticsOrder', RH_LOGISTICS_HEADER_ID)",
                            "valueChanged": "",
                            "enableCont": "true",
                            "caption": "物流订单号",
                            "isPanel": false,
                            "text": "",
                            "type": 208,
                            "tagName": "hyperlink",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": false,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_LOGISTICS_HEADER_ID",
                                "required": false
                            },
                            "visibleCont": "false",
                            "valueChanged": "",
                            "caption": "物流订单ID",
                            "isPanel": false,
                            "text": "物流订单ID",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": false,
                                "hAlign": 1,
                                "editable": false,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "decScale": 2,
                                "enable": false,
                                "crFocus": true,
                                "x": 2,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_LOGISTICS_HEADER_ID",
                                "key": "RH_LOGISTICS_HEADER_ID",
                                "sep": ","
                            },
                            "visibleCont": "false",
                            "valueChanged": "",
                            "enableCont": "false",
                            "caption": "物流订单ID",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": false,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 10,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_RECV_DATETIME",
                                "required": false
                            },
                            "visibleCont": "false",
                            "valueChanged": "",
                            "caption": "收货日期时间",
                            "isPanel": false,
                            "text": "收货日期时间",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": false,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "enable": true,
                                "crFocus": true,
                                "x": 11,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_RECV_DATETIME",
                                "key": "RH_RECV_DATETIME"
                            },
                            "visibleCont": "false",
                            "valueChanged": "",
                            "caption": "收货日期时间",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 10,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_RECV_DATE",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "收货日期",
                            "isPanel": false,
                            "text": "收货日期",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "enable": true,
                                "crFocus": true,
                                "x": 11,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_RECV_DATE",
                                "key": "RH_RECV_DATE"
                            },
                            "valueChanged": "",
                            "caption": "收货日期",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 4,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_OWNER_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "货主",
                            "isPanel": false,
                            "text": "货主",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "x": 5,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_OWNER_ID",
                                "key": "RH_OWNER_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {},
                            "root": "",
                            "caption": "货主",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Owner"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 7,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_OWNER_NO",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "货主单号",
                            "isPanel": false,
                            "text": "货主单号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "trim": false,
                                "enable": true,
                                "crFocus": true,
                                "x": 8,
                                "y": 1,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "columnKey": "RH_OWNER_NO",
                                "key": "RH_OWNER_NO",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "caption": "货主单号",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 10,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_VENDOR_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "供应商",
                            "isPanel": false,
                            "text": "供应商",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "x": 11,
                                "y": 1,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_VENDOR_ID",
                                "key": "RH_VENDOR_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {},
                            "root": "",
                            "caption": "供应商",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "VendorCustomer"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 2,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_TX_TYPE_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "事务类型",
                            "isPanel": false,
                            "text": "事务类型",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "x": 2,
                                "y": 2,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_TX_TYPE_ID",
                                "key": "RH_TX_TYPE_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {
                                "TransactionType": [{
                                    "filterIndex": 0,
                                    "filterVals": [{"refVal": "inbound", "type": 2}],
                                    "dependency": "",
                                    "typeDefKey": "",
                                    "cond": ""
                                }]
                            },
                            "root": "",
                            "caption": "事务类型",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "TransactionType"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 4,
                                "y": 2,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_FLOW_HEADER_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "流程",
                            "isPanel": false,
                            "text": "流程",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "x": 5,
                                "y": 2,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_FLOW_HEADER_ID",
                                "key": "RH_FLOW_HEADER_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {
                                "Flow": [{
                                    "filterIndex": 0,
                                    "filterVals": [{"refVal": "inbound", "type": 2}],
                                    "dependency": "",
                                    "typeDefKey": "",
                                    "cond": ""
                                }]
                            },
                            "root": "",
                            "caption": "流程",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Flow"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 7,
                                "y": 2,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_MIGRATE_RECV_DATE",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "迁移入库日期",
                            "isPanel": false,
                            "text": "迁移入库日期",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "enable": true,
                                "crFocus": true,
                                "x": 8,
                                "isOnlyDate": true,
                                "y": 2,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_MIGRATE_RECV_DATE",
                                "key": "RH_MIGRATE_RECV_DATE"
                            },
                            "valueChanged": "",
                            "caption": "迁移入库日期",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_GROSS_WEIGHT",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总毛重",
                            "isPanel": false,
                            "text": "总毛重",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "decScale": 2,
                                "enable": true,
                                "crFocus": true,
                                "x": 2,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_TOTAL_GROSS_WEIGHT",
                                "key": "RH_TOTAL_GROSS_WEIGHT",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总毛重",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 4,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_NET_WEIGHT",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总净重",
                            "isPanel": false,
                            "text": "总净重",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "decScale": 2,
                                "enable": true,
                                "crFocus": true,
                                "x": 5,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_TOTAL_NET_WEIGHT",
                                "key": "RH_TOTAL_NET_WEIGHT",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总净重",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 7,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_CUBAGE",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总体积",
                            "isPanel": false,
                            "text": "总体积",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "decScale": 2,
                                "enable": true,
                                "crFocus": true,
                                "x": 8,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_TOTAL_CUBAGE",
                                "key": "RH_TOTAL_CUBAGE",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总体积",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 10,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_AMOUNT",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总金额",
                            "isPanel": false,
                            "text": "总金额",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "decScale": 2,
                                "enable": true,
                                "crFocus": true,
                                "x": 11,
                                "y": 3,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_TOTAL_AMOUNT",
                                "key": "RH_TOTAL_AMOUNT",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总金额",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 4,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_APPOINT_STOREROOM_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "指定仓间",
                            "isPanel": false,
                            "text": "指定仓间",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 5,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "x": 2,
                                "y": 4,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_APPOINT_STOREROOM_ID",
                                "key": "RH_APPOINT_STOREROOM_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {},
                            "root": "",
                            "caption": "指定仓间",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "StoreRoom"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 7,
                                "y": 4,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_PERMIT_FLAG",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "批准标志",
                            "isPanel": false,
                            "text": "批准标志",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": false,
                                "defaultValue": "none",
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "dynamicItems": false,
                                "sourceType": 0,
                                "enable": false,
                                "crFocus": true,
                                "x": 8,
                                "y": 4,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "RH_PERMIT_FLAG",
                                "key": "RH_PERMIT_FLAG"
                            },
                            "valueChanged": "",
                            "enableCont": "false",
                            "filterItems": true,
                            "caption": "批准标志",
                            "isPanel": false,
                            "text": "",
                            "type": 204,
                            "tagName": "combobox",
                            "globalItems": "",
                            "value": "",
                            "items": [{}, {"caption": "无需批准", "value": "none"}, {
                                "caption": "待批准",
                                "value": "need_permit"
                            }, {"caption": "已批准", "value": "permitted"}, {"caption": "不批准", "value": "rejected"}]
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 4,
                                "y": 4,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_LOT_STRING0",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "批号",
                            "isPanel": false,
                            "text": "批号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "trim": false,
                                "enable": true,
                                "crFocus": true,
                                "x": 5,
                                "y": 4,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "columnKey": "RH_LOT_STRING0",
                                "key": "RH_LOT_STRING0",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "caption": "批号",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 5,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_RH_REMARK",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "备注",
                            "isPanel": false,
                            "text": "备注",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "colspan": 7,
                                "tableKey": "WM_ReceiptHead",
                                "trim": false,
                                "enable": true,
                                "crFocus": true,
                                "x": 2,
                                "y": 5,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "columnKey": "RH_REMARK",
                                "key": "RH_REMARK",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "caption": "备注",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }],
                        "height": "100%"
                    }, {
                        "metaObj": {
                            "tableKey": "WM_RECEIPT_LINE",
                            "visible": true,
                            "hAlign": 1,
                            "enable": true,
                            "editable": true,
                            "crFocus": true,
                            "position": 0,
                            "hasBorder": false,
                            "vAlign": 0,
                            "key": "ReceipDtl",
                            "required": false
                        },
                        "expandModel": [],
                        "dataModel": {
                            "data": {
                                "addRowArray": [{"data": [[true, "true", true], [null, ""], [null, ""], [null, "", false, false], [null, "", false, false], [null, ""], [0, ""], [null, "", false, false], [0, ""], [null, "", false, false], [0, ""], [null, "", false, false], [0, ""], [null, "", false, false], [0, ""], [0, ""], [null, "", false, false], [0, ""], [null, "", false, false], [0, ""], [null, "", false, false], [null, ""], [null, ""], [null, "", false, false], [null, "", false, false], [null, ""], [null, ""], [null, ""], [null, ""], [null, ""], [0, "", false, false], [null, "", false, false], [0, "", false, false], [null, "", false, false], [0, ""], [null, "", false, false], [null, ""], [0, "", false, false], [null, ""], [null, ""]]}],
                                "modifyRowArray": [],
                                "rowIDMap": {"0": 0},
                                "isFirstShow": true,
                                "deleteRowArray": []
                            },
                            "colModel": {
                                "cells": {
                                    "RL_REJECT_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 20,
                                        "customedit": true,
                                        "key": "RL_REJECT_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_PUTAWAY_FINISH_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 33,
                                        "customedit": true,
                                        "key": "RL_PUTAWAY_FINISH_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_STATUS": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 37,
                                        "customedit": true,
                                        "columnKey": "RL_STATUS",
                                        "key": "RL_STATUS",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_LOST_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 18,
                                        "customedit": true,
                                        "key": "RL_LOST_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_RECV_CUBAGE": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 12,
                                        "customedit": true,
                                        "columnKey": "RL_RECV_CUBAGE",
                                        "key": "RL_RECV_CUBAGE",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_REJECT_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 19,
                                        "customedit": true,
                                        "columnKey": "RL_REJECT_QTY",
                                        "key": "RL_REJECT_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_RECV_NET_WEIGHT_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "吨", "value": "201"}, {
                                                "caption": "千克",
                                                "value": "202"
                                            }, {"caption": "克", "value": "203"}]
                                        },
                                        "colIndex": 11,
                                        "customedit": true,
                                        "key": "RL_RECV_NET_WEIGHT_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_PUTAWAY_FINISH_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 32,
                                        "customedit": true,
                                        "columnKey": "RL_PUTAWAY_FINISH_QTY",
                                        "key": "RL_PUTAWAY_FINISH_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_PALLET_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "Pallet",
                                            "multiSelect": false
                                        },
                                        "colIndex": 26,
                                        "customedit": true,
                                        "columnKey": "RL_PALLET_ID",
                                        "key": "RL_PALLET_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_RECV_CUBAGE_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "立方米", "value": "301"}, {
                                                "caption": "立方厘米",
                                                "value": "302"
                                            }, {"caption": "升", "value": "303"}, {"caption": "毫升", "value": "304"}]
                                        },
                                        "colIndex": 13,
                                        "customedit": true,
                                        "key": "RL_RECV_CUBAGE_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_RECVSTAGING_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "ReceivingArea",
                                            "multiSelect": false
                                        },
                                        "colIndex": 25,
                                        "customedit": true,
                                        "columnKey": "RL_RECVSTAGING_ID",
                                        "key": "RL_RECVSTAGING_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_LOGISTICS_LINE_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "embedText": "",
                                            "trim": false,
                                            "textCase": 0,
                                            "icon": "",
                                            "preIcon": "",
                                            "invalidChars": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "maxLength": 255,
                                            "mask": ""
                                        },
                                        "colIndex": 2,
                                        "customedit": true,
                                        "columnKey": "RL_LOGISTICS_LINE_ID",
                                        "key": "RL_LOGISTICS_LINE_ID",
                                        "hasDB": true,
                                        "edittype": "textEditor"
                                    },
                                    "RL_SOURCE_MATERIAL_STATUS_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "MaterialStatus",
                                            "multiSelect": false
                                        },
                                        "colIndex": 27,
                                        "customedit": true,
                                        "columnKey": "RL_SOURCE_MATERIAL_STATUS_ID",
                                        "key": "RL_SOURCE_MATERIAL_STATUS_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_MATERIAL_CATEGORY": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "MaterialType",
                                            "multiSelect": false
                                        },
                                        "colIndex": 5,
                                        "customedit": true,
                                        "key": "RL_MATERIAL_CATEGORY",
                                        "edittype": "dict"
                                    },
                                    "RL_MATERIAL_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {
                                                "Material": [{
                                                    "filterIndex": 0,
                                                    "filterVals": [{"refVal": "RH_OWNER_ID", "type": 0}],
                                                    "dependency": "RH_OWNER_ID",
                                                    "typeDefKey": "",
                                                    "cond": ""
                                                }]
                                            },
                                            "root": "",
                                            "itemKey": "Material",
                                            "multiSelect": false
                                        },
                                        "colIndex": 3,
                                        "customedit": true,
                                        "columnKey": "RL_MATERIAL_ID",
                                        "key": "RL_MATERIAL_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_SHIFT": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "embedText": "",
                                            "trim": false,
                                            "textCase": 0,
                                            "icon": "",
                                            "preIcon": "",
                                            "invalidChars": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "maxLength": 255,
                                            "mask": ""
                                        },
                                        "colIndex": 38,
                                        "customedit": true,
                                        "columnKey": "RL_SHIFT",
                                        "key": "RL_SHIFT",
                                        "hasDB": true,
                                        "edittype": "textEditor"
                                    },
                                    "RL_RECV_NET_WEIGHT": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 10,
                                        "customedit": true,
                                        "columnKey": "RL_RECV_NET_WEIGHT",
                                        "key": "RL_RECV_NET_WEIGHT",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_OWNER_SYSTEM_LINE_NO": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "embedText": "",
                                            "trim": false,
                                            "textCase": 0,
                                            "icon": "",
                                            "preIcon": "",
                                            "invalidChars": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "maxLength": 255,
                                            "mask": ""
                                        },
                                        "colIndex": 36,
                                        "customedit": true,
                                        "columnKey": "RL_OWNER_SYSTEM_LINE_NO",
                                        "key": "RL_OWNER_SYSTEM_LINE_NO",
                                        "hasDB": true,
                                        "edittype": "textEditor"
                                    },
                                    "RL_CONSUME_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 15,
                                        "customedit": true,
                                        "columnKey": "RL_CONSUME_QTY",
                                        "key": "RL_CONSUME_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_DEST_MATERIAL_STATUS_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "MaterialStatus",
                                            "multiSelect": false
                                        },
                                        "colIndex": 28,
                                        "customedit": true,
                                        "columnKey": "RL_DEST_MATERIAL_STATUS_ID",
                                        "key": "RL_DEST_MATERIAL_STATUS_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "SerialInput": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "embedText": "",
                                            "trim": false,
                                            "textCase": 0,
                                            "icon": "",
                                            "preIcon": "",
                                            "invalidChars": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "maxLength": 255,
                                            "mask": ""
                                        },
                                        "colIndex": 39,
                                        "customedit": true,
                                        "key": "SerialInput",
                                        "edittype": "textEditor"
                                    },
                                    "RL_PUTAWAY_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 31,
                                        "customedit": true,
                                        "key": "RL_PUTAWAY_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_LOST_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 17,
                                        "customedit": true,
                                        "columnKey": "RL_LOST_QTY",
                                        "key": "RL_LOST_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_STOREAREA_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {
                                                "StoreArea": [{
                                                    "filterIndex": 0,
                                                    "filterVals": [{"refVal": "RL_STOREROOM_ID", "type": 0}],
                                                    "dependency": "RL_STOREROOM_ID",
                                                    "typeDefKey": "",
                                                    "cond": "!IsNull(RL_STOREROOM_ID)"
                                                }]
                                            },
                                            "root": "",
                                            "itemKey": "StoreArea",
                                            "multiSelect": false
                                        },
                                        "colIndex": 23,
                                        "customedit": true,
                                        "columnKey": "RL_STOREAREA_ID",
                                        "key": "RL_STOREAREA_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_CONSUME_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 16,
                                        "customedit": true,
                                        "key": "RL_CONSUME_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_DISCARD_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 34,
                                        "customedit": true,
                                        "columnKey": "RL_DISCARD_QTY",
                                        "key": "RL_DISCARD_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_RECV_GROSS_WEIGHT": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 8,
                                        "customedit": true,
                                        "columnKey": "RL_RECV_GROSS_WEIGHT",
                                        "key": "RL_RECV_GROSS_WEIGHT",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_RECV_GROSS_WEIGHT_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "吨", "value": "201"}, {
                                                "caption": "千克",
                                                "value": "202"
                                            }, {"caption": "克", "value": "203"}]
                                        },
                                        "colIndex": 9,
                                        "customedit": true,
                                        "key": "RL_RECV_GROSS_WEIGHT_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_SPEC": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "embedText": "",
                                            "trim": false,
                                            "textCase": 0,
                                            "icon": "",
                                            "preIcon": "",
                                            "invalidChars": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "maxLength": 255,
                                            "mask": ""
                                        },
                                        "colIndex": 4,
                                        "customedit": true,
                                        "columnKey": "RL_SPEC",
                                        "key": "RL_SPEC",
                                        "hasDB": true,
                                        "edittype": "textEditor"
                                    },
                                    "RL_CHECK_RESULT": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "sourceType": 0,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{
                                                "caption": "同意入库",
                                                "value": "agree_inbound",
                                                "itemKey": "agree_inbound"
                                            }, {
                                                "caption": "不同意入库",
                                                "value": "refuse_inbound",
                                                "itemKey": "refuse_inbound"
                                            }]
                                        },
                                        "colIndex": 29,
                                        "customedit": true,
                                        "columnKey": "RL_CHECK_RESULT",
                                        "key": "RL_CHECK_RESULT",
                                        "hasDB": true,
                                        "edittype": "comboBox"
                                    },
                                    "RL_RECV_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 7,
                                        "customedit": true,
                                        "key": "RL_RECV_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_MATERIAL_STATUS_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "MaterialStatus",
                                            "multiSelect": false
                                        },
                                        "colIndex": 21,
                                        "customedit": true,
                                        "columnKey": "RL_MATERIAL_STATUS_ID",
                                        "key": "RL_MATERIAL_STATUS_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_STOREROOM_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {},
                                            "root": "",
                                            "itemKey": "StoreRoom",
                                            "multiSelect": false
                                        },
                                        "colIndex": 22,
                                        "customedit": true,
                                        "columnKey": "RL_STOREROOM_ID",
                                        "key": "RL_STOREROOM_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "Select": {
                                        "formatter": "checkbox",
                                        "editOptions": {},
                                        "colIndex": 0,
                                        "isAlwaysShow": true,
                                        "align": "center",
                                        "key": "Select",
                                        "edittype": "checkBox"
                                    },
                                    "RL_RECV_AMOUNT": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 14,
                                        "customedit": true,
                                        "columnKey": "RL_RECV_AMOUNT",
                                        "key": "RL_RECV_AMOUNT",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_LOCATION_ID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "isDynamic": false,
                                            "independent": false,
                                            "isCompDict": false,
                                            "stateMask": 1,
                                            "itemFilters": {
                                                "Location": [{
                                                    "filterIndex": 0,
                                                    "filterVals": [{"refVal": "RL_STOREAREA_ID", "type": 0}],
                                                    "dependency": "RL_STOREAREA_ID",
                                                    "typeDefKey": "",
                                                    "cond": "!IsNull(RL_STOREAREA_ID)"
                                                }, {
                                                    "filterIndex": 1,
                                                    "filterVals": [{"refVal": "RL_STOREROOM_ID", "type": 0}],
                                                    "dependency": "RL_STOREROOM_ID",
                                                    "typeDefKey": "",
                                                    "cond": "!IsNull(RL_STOREROOM_ID)"
                                                }]
                                            },
                                            "root": "",
                                            "itemKey": "Location",
                                            "multiSelect": false
                                        },
                                        "colIndex": 24,
                                        "customedit": true,
                                        "columnKey": "RL_LOCATION_ID",
                                        "key": "RL_LOCATION_ID",
                                        "hasDB": true,
                                        "edittype": "dict"
                                    },
                                    "RL_PUTAWAY_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 30,
                                        "customedit": true,
                                        "columnKey": "RL_PUTAWAY_QTY",
                                        "key": "RL_PUTAWAY_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    },
                                    "RL_DISCARD_UNIT": {
                                        "formatter": "custom",
                                        "editOptions": {
                                            "sourceType": 4,
                                            "dependedFields": [],
                                            "type": "combobox",
                                            "globalItems": "",
                                            "items": [{"caption": "个", "value": "401"}]
                                        },
                                        "colIndex": 35,
                                        "customedit": true,
                                        "key": "RL_DISCARD_UNIT",
                                        "edittype": "comboBox"
                                    },
                                    "RL_Dtl_OID": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "embedText": "",
                                            "trim": false,
                                            "textCase": 0,
                                            "icon": "",
                                            "preIcon": "",
                                            "invalidChars": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "maxLength": 255,
                                            "mask": ""
                                        },
                                        "colIndex": 1,
                                        "customedit": true,
                                        "columnKey": "OID",
                                        "key": "RL_Dtl_OID",
                                        "hasDB": true,
                                        "edittype": "textEditor"
                                    },
                                    "RL_RECV_QTY": {
                                        "formatter": "custom",
                                        "tableKey": "WM_RECEIPT_LINE",
                                        "editOptions": {
                                            "roundingMode": 4,
                                            "decScale": 2,
                                            "negtiveForeColor": "",
                                            "zeroString": "",
                                            "selectOnFocus": true,
                                            "promptText": "",
                                            "decPrecision": 16,
                                            "useSep": true,
                                            "groupingSize": 3,
                                            "decSep": ".",
                                            "sep": ","
                                        },
                                        "colIndex": 6,
                                        "customedit": true,
                                        "columnKey": "RL_RECV_QTY",
                                        "key": "RL_RECV_QTY",
                                        "hasDB": true,
                                        "edittype": "numberEditor"
                                    }
                                },
                                "columns": [{
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column0",
                                    "width": 100,
                                    "index": 0,
                                    "isSelect": true,
                                    "label": "选择",
                                    "sortable": false,
                                    "key": "Select"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "false",
                                    "visibleDependency": "",
                                    "hidden": true,
                                    "name": "column1",
                                    "width": 100,
                                    "index": 1,
                                    "label": "明细OID",
                                    "sortable": false,
                                    "key": "RL_Dtl_OID"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "false",
                                    "visibleDependency": "",
                                    "hidden": true,
                                    "name": "column2",
                                    "width": 100,
                                    "index": 2,
                                    "label": "物流订单明细ID",
                                    "sortable": false,
                                    "key": "RL_LOGISTICS_LINE_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column3",
                                    "width": 100,
                                    "index": 3,
                                    "label": "物料",
                                    "sortable": false,
                                    "key": "RL_MATERIAL_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column4",
                                    "width": 100,
                                    "index": 4,
                                    "label": "物料规格",
                                    "sortable": false,
                                    "key": "RL_SPEC"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column5",
                                    "width": 100,
                                    "index": 5,
                                    "label": "物料类别",
                                    "sortable": false,
                                    "key": "RL_MATERIAL_CATEGORY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column6",
                                    "width": 100,
                                    "index": 6,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_RECV_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column7",
                                    "width": 100,
                                    "index": 7,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_RECV_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column8",
                                    "width": 100,
                                    "index": 8,
                                    "label": "毛重",
                                    "sortable": false,
                                    "key": "RL_RECV_GROSS_WEIGHT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column9",
                                    "width": 100,
                                    "index": 9,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_RECV_GROSS_WEIGHT_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column10",
                                    "width": 100,
                                    "index": 10,
                                    "label": "净重",
                                    "sortable": false,
                                    "key": "RL_RECV_NET_WEIGHT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column11",
                                    "width": 100,
                                    "index": 11,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_RECV_NET_WEIGHT_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column12",
                                    "width": 100,
                                    "index": 12,
                                    "label": "体积",
                                    "sortable": false,
                                    "key": "RL_RECV_CUBAGE"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column13",
                                    "width": 100,
                                    "index": 13,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_RECV_CUBAGE_UNIT"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column14",
                                    "width": 100,
                                    "index": 14,
                                    "label": "收货金额",
                                    "sortable": false,
                                    "key": "RL_RECV_AMOUNT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column15",
                                    "width": 100,
                                    "index": 15,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_CONSUME_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column16",
                                    "width": 100,
                                    "index": 16,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_CONSUME_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column17",
                                    "width": 100,
                                    "index": 17,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_LOST_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column18",
                                    "width": 100,
                                    "index": 18,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_LOST_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column19",
                                    "width": 100,
                                    "index": 19,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_REJECT_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column20",
                                    "width": 100,
                                    "index": 20,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_REJECT_UNIT"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column21",
                                    "width": 100,
                                    "index": 21,
                                    "label": "物料状态",
                                    "sortable": false,
                                    "key": "RL_MATERIAL_STATUS_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column22",
                                    "width": 100,
                                    "index": 22,
                                    "label": "仓间",
                                    "sortable": false,
                                    "key": "RL_STOREROOM_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column23",
                                    "width": 100,
                                    "index": 23,
                                    "label": "库区",
                                    "sortable": false,
                                    "key": "RL_STOREAREA_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column24",
                                    "width": 100,
                                    "index": 24,
                                    "label": "收货储位",
                                    "sortable": false,
                                    "key": "RL_LOCATION_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column25",
                                    "width": 100,
                                    "index": 25,
                                    "label": "收货区",
                                    "sortable": false,
                                    "key": "RL_RECVSTAGING_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column26",
                                    "width": 100,
                                    "index": 26,
                                    "label": "托盘",
                                    "sortable": false,
                                    "key": "RL_PALLET_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column27",
                                    "width": 100,
                                    "index": 27,
                                    "label": "检验前物料状态",
                                    "sortable": false,
                                    "key": "RL_SOURCE_MATERIAL_STATUS_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column28",
                                    "width": 100,
                                    "index": 28,
                                    "label": "检验后物料状态",
                                    "sortable": false,
                                    "key": "RL_DEST_MATERIAL_STATUS_ID"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column29",
                                    "width": 100,
                                    "index": 29,
                                    "label": "验收结论",
                                    "sortable": false,
                                    "key": "RL_CHECK_RESULT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column30",
                                    "width": 100,
                                    "index": 30,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_PUTAWAY_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column31",
                                    "width": 100,
                                    "index": 31,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_PUTAWAY_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column32",
                                    "width": 100,
                                    "index": 32,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_PUTAWAY_FINISH_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column33",
                                    "width": 100,
                                    "index": 33,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_PUTAWAY_FINISH_UNIT"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column34",
                                    "width": 100,
                                    "index": 34,
                                    "label": "数量",
                                    "sortable": false,
                                    "key": "RL_DISCARD_QTY"
                                }, {
                                    "columnType": "Fix",
                                    "formulaCaption": "",
                                    "visible": "",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column35",
                                    "width": 100,
                                    "index": 35,
                                    "label": "单位",
                                    "sortable": false,
                                    "key": "RL_DISCARD_UNIT"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column36",
                                    "width": 100,
                                    "index": 36,
                                    "label": "货主系统明细号",
                                    "sortable": false,
                                    "key": "RL_OWNER_SYSTEM_LINE_NO"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column37",
                                    "width": 100,
                                    "index": 37,
                                    "label": "状态",
                                    "sortable": false,
                                    "key": "RL_STATUS"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column38",
                                    "width": 100,
                                    "index": 38,
                                    "label": "班组号",
                                    "sortable": false,
                                    "key": "RL_SHIFT"
                                }, {
                                    "columnType": "Detail",
                                    "formulaCaption": "",
                                    "visible": "true",
                                    "visibleDependency": "",
                                    "hidden": false,
                                    "name": "column39",
                                    "width": 100,
                                    "index": 39,
                                    "label": "序列号输入",
                                    "sortable": false,
                                    "key": "SerialInput"
                                }]
                            }
                        },
                        "caption": "收货物料明细",
                        "hasColExpand": false,
                        "type": 217,
                        "seqColumn": "SEQUENCE",
                        "newEmptyRow": true,
                        "hasRowChange": false,
                        "rootGroupBkmk": [],
                        "primaryKeys": [],
                        "groupHeaders": [[{
                            "startColumnName": "column6",
                            "numberOfColumns": 2,
                            "titleText": "收货数量"
                        }, {
                            "startColumnName": "column8",
                            "numberOfColumns": 2,
                            "titleText": "收货毛重"
                        }, {
                            "startColumnName": "column10",
                            "numberOfColumns": 2,
                            "titleText": "收货净重"
                        }, {
                            "startColumnName": "column12",
                            "numberOfColumns": 2,
                            "titleText": "收货体积"
                        }, {
                            "startColumnName": "column15",
                            "numberOfColumns": 2,
                            "titleText": "损耗数量"
                        }, {
                            "startColumnName": "column17",
                            "numberOfColumns": 2,
                            "titleText": "丢失数量"
                        }, {
                            "startColumnName": "column19",
                            "numberOfColumns": 2,
                            "titleText": "拒收数量"
                        }, {
                            "startColumnName": "column30",
                            "numberOfColumns": 2,
                            "titleText": "已上架数量"
                        }, {
                            "startColumnName": "column32",
                            "numberOfColumns": 2,
                            "titleText": "已上架完成数量"
                        }, {"startColumnName": "column34", "numberOfColumns": 2, "titleText": "已废弃数量"}]],
                        "hasGroupRow": false,
                        "canDelete": true,
                        "canShift": true,
                        "rowExpandIndex": -1,
                        "showRowHead": true,
                        "rowHeight": 32,
                        "treeExpand": false,
                        "valueChanged": "",
                        "errorInfoes": {"cells": [], "rows": []},
                        "canInsert": true,
                        "metaRowInfo": {
                            "rowGroupInfo": [[{
                                "rowType": "Detail",
                                "cells": [{
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 201,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "1",
                                    "caption": "选择",
                                    "defaultFormulaValue": "",
                                    "isSelect": true,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "Select"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "明细ID",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "OID",
                                    "key": "RL_Dtl_OID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物流订单明细ID",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_LOGISTICS_LINE_ID",
                                    "key": "RL_LOGISTICS_LINE_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物料",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_MATERIAL_ID",
                                    "key": "RL_MATERIAL_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "规格",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_SPEC')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_SPEC",
                                    "key": "RL_SPEC"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物料类别",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CATEGORY_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_MATERIAL_CATEGORY"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_QTY",
                                    "key": "RL_RECV_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_UNIT_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货毛重",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_GROSS_WEIGHT') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_GROSS_WEIGHT",
                                    "key": "RL_RECV_GROSS_WEIGHT"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_WEIGHT_UNIT_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_GROSS_WEIGHT_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货净重",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_NET_WEIGHT') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_NET_WEIGHT",
                                    "key": "RL_RECV_NET_WEIGHT"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_GROSS_WEIGHT_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_NET_WEIGHT_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货体积",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_CUBAGE",
                                    "key": "RL_RECV_CUBAGE"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE_UNIT_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_CUBAGE_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货金额",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_PRICE') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_AMOUNT",
                                    "key": "RL_RECV_AMOUNT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "损耗数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_CONSUME_QTY",
                                    "key": "RL_CONSUME_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_CONSUME_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "丢失数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_LOST_QTY",
                                    "key": "RL_LOST_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_LOST_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "拒收数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_REJECT_QTY",
                                    "key": "RL_REJECT_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_REJECT_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物料状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_MATERIAL_STATUS_ID",
                                    "key": "RL_MATERIAL_STATUS_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "仓间",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_STOREROOM_ID",
                                    "key": "RL_STOREROOM_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "库区",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_STOREAREA_ID",
                                    "key": "RL_STOREAREA_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货储位",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_LOCATION_ID",
                                    "key": "RL_LOCATION_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货区",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECVSTAGING_ID",
                                    "key": "RL_RECVSTAGING_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "托盘",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_PALLET_ID",
                                    "key": "RL_PALLET_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "检验前物料状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_SOURCE_MATERIAL_STATUS_ID",
                                    "key": "RL_SOURCE_MATERIAL_STATUS_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "检验后物料状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_DEST_MATERIAL_STATUS_ID",
                                    "key": "RL_DEST_MATERIAL_STATUS_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "验收结论",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_CHECK_RESULT",
                                    "key": "RL_CHECK_RESULT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "已上架数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_PUTAWAY_QTY",
                                    "key": "RL_PUTAWAY_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_PUTAWAY_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "已上架完成数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_PUTAWAY_FINISH_QTY",
                                    "key": "RL_PUTAWAY_FINISH_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_PUTAWAY_FINISH_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "0",
                                    "caption": "废弃数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_DISCARD_QTY",
                                    "key": "RL_DISCARD_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_DISCARD_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "货主系统明细号",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_OWNER_SYSTEM_LINE_NO",
                                    "key": "RL_OWNER_SYSTEM_LINE_NO"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_STATUS",
                                    "key": "RL_STATUS"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "班组号",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_SHIFT",
                                    "key": "RL_SHIFT"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "序列号输入",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "SerialInput"
                                }],
                                "defaultLayer": -1,
                                "cellKeys": ["Select", "RL_Dtl_OID", "RL_LOGISTICS_LINE_ID", "RL_MATERIAL_ID", "RL_SPEC", "RL_MATERIAL_CATEGORY", "RL_RECV_QTY", "RL_RECV_UNIT", "RL_RECV_GROSS_WEIGHT", "RL_RECV_GROSS_WEIGHT_UNIT", "RL_RECV_NET_WEIGHT", "RL_RECV_NET_WEIGHT_UNIT", "RL_RECV_CUBAGE", "RL_RECV_CUBAGE_UNIT", "RL_RECV_AMOUNT", "RL_CONSUME_QTY", "RL_CONSUME_UNIT", "RL_LOST_QTY", "RL_LOST_UNIT", "RL_REJECT_QTY", "RL_REJECT_UNIT", "RL_MATERIAL_STATUS_ID", "RL_STOREROOM_ID", "RL_STOREAREA_ID", "RL_LOCATION_ID", "RL_RECVSTAGING_ID", "RL_PALLET_ID", "RL_SOURCE_MATERIAL_STATUS_ID", "RL_DEST_MATERIAL_STATUS_ID", "RL_CHECK_RESULT", "RL_PUTAWAY_QTY", "RL_PUTAWAY_UNIT", "RL_PUTAWAY_FINISH_QTY", "RL_PUTAWAY_FINISH_UNIT", "RL_DISCARD_QTY", "RL_DISCARD_UNIT", "RL_OWNER_SYSTEM_LINE_NO", "RL_STATUS", "RL_SHIFT", "SerialInput"],
                                "key": "R3",
                                "groupKey": "",
                                "rowHeight": 32
                            }]],
                            "dtlRowIndex": 0,
                            "rows": [{
                                "rowGroupLevel": 0,
                                "rowType": "Detail",
                                "cells": [{
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 201,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "1",
                                    "caption": "选择",
                                    "defaultFormulaValue": "",
                                    "isSelect": true,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "Select"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "明细ID",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "OID",
                                    "key": "RL_Dtl_OID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物流订单明细ID",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_LOGISTICS_LINE_ID",
                                    "key": "RL_LOGISTICS_LINE_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物料",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_MATERIAL_ID",
                                    "key": "RL_MATERIAL_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "规格",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_SPEC')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_SPEC",
                                    "key": "RL_SPEC"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物料类别",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CATEGORY_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_MATERIAL_CATEGORY"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_QTY",
                                    "key": "RL_RECV_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_UNIT_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货毛重",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_GROSS_WEIGHT') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_GROSS_WEIGHT",
                                    "key": "RL_RECV_GROSS_WEIGHT"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_WEIGHT_UNIT_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_GROSS_WEIGHT_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货净重",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_NET_WEIGHT') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_NET_WEIGHT",
                                    "key": "RL_RECV_NET_WEIGHT"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_GROSS_WEIGHT_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_NET_WEIGHT_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货体积",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_CUBAGE",
                                    "key": "RL_RECV_CUBAGE"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE_UNIT_ID')",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_RECV_CUBAGE_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货金额",
                                    "defaultFormulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_PRICE') * RL_RECV_QTY",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECV_AMOUNT",
                                    "key": "RL_RECV_AMOUNT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "损耗数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_CONSUME_QTY",
                                    "key": "RL_CONSUME_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_CONSUME_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "丢失数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_LOST_QTY",
                                    "key": "RL_LOST_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_LOST_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "拒收数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_REJECT_QTY",
                                    "key": "RL_REJECT_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_REJECT_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "物料状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_MATERIAL_STATUS_ID",
                                    "key": "RL_MATERIAL_STATUS_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "仓间",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_STOREROOM_ID",
                                    "key": "RL_STOREROOM_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "库区",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_STOREAREA_ID",
                                    "key": "RL_STOREAREA_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货储位",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_LOCATION_ID",
                                    "key": "RL_LOCATION_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "收货区",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_RECVSTAGING_ID",
                                    "key": "RL_RECVSTAGING_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "托盘",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_PALLET_ID",
                                    "key": "RL_PALLET_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "检验前物料状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_SOURCE_MATERIAL_STATUS_ID",
                                    "key": "RL_SOURCE_MATERIAL_STATUS_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 206,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "检验后物料状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_DEST_MATERIAL_STATUS_ID",
                                    "key": "RL_DEST_MATERIAL_STATUS_ID"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "验收结论",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_CHECK_RESULT",
                                    "key": "RL_CHECK_RESULT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "已上架数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_PUTAWAY_QTY",
                                    "key": "RL_PUTAWAY_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_PUTAWAY_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "已上架完成数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_PUTAWAY_FINISH_QTY",
                                    "key": "RL_PUTAWAY_FINISH_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_PUTAWAY_FINISH_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "0",
                                    "caption": "废弃数量",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_DISCARD_QTY",
                                    "key": "RL_DISCARD_QTY"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 204,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "单位",
                                    "defaultFormulaValue": "RL_RECV_UNIT",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "RL_DISCARD_UNIT"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "货主系统明细号",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_OWNER_SYSTEM_LINE_NO",
                                    "key": "RL_OWNER_SYSTEM_LINE_NO"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 210,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "状态",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_STATUS",
                                    "key": "RL_STATUS"
                                }, {
                                    "tableKey": "WM_RECEIPT_LINE",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "班组号",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "RL_SHIFT",
                                    "key": "RL_SHIFT"
                                }, {
                                    "tableKey": "",
                                    "valueDependency": "",
                                    "cellType": 215,
                                    "valueChanged": "",
                                    "isColExpand": false,
                                    "defaultValue": "",
                                    "caption": "序列号输入",
                                    "defaultFormulaValue": "",
                                    "isSelect": false,
                                    "columnArea": -1,
                                    "columnKey": "",
                                    "key": "SerialInput"
                                }],
                                "defaultLayer": -1,
                                "cellKeys": ["Select", "RL_Dtl_OID", "RL_LOGISTICS_LINE_ID", "RL_MATERIAL_ID", "RL_SPEC", "RL_MATERIAL_CATEGORY", "RL_RECV_QTY", "RL_RECV_UNIT", "RL_RECV_GROSS_WEIGHT", "RL_RECV_GROSS_WEIGHT_UNIT", "RL_RECV_NET_WEIGHT", "RL_RECV_NET_WEIGHT_UNIT", "RL_RECV_CUBAGE", "RL_RECV_CUBAGE_UNIT", "RL_RECV_AMOUNT", "RL_CONSUME_QTY", "RL_CONSUME_UNIT", "RL_LOST_QTY", "RL_LOST_UNIT", "RL_REJECT_QTY", "RL_REJECT_UNIT", "RL_MATERIAL_STATUS_ID", "RL_STOREROOM_ID", "RL_STOREAREA_ID", "RL_LOCATION_ID", "RL_RECVSTAGING_ID", "RL_PALLET_ID", "RL_SOURCE_MATERIAL_STATUS_ID", "RL_DEST_MATERIAL_STATUS_ID", "RL_CHECK_RESULT", "RL_PUTAWAY_QTY", "RL_PUTAWAY_UNIT", "RL_PUTAWAY_FINISH_QTY", "RL_PUTAWAY_FINISH_UNIT", "RL_DISCARD_QTY", "RL_DISCARD_UNIT", "RL_OWNER_SYSTEM_LINE_NO", "RL_STATUS", "RL_SHIFT", "SerialInput"],
                                "key": "R3",
                                "groupKey": "",
                                "rowHeight": 32
                            }]
                        },
                        "treeColIndex": -1,
                        "treeType": -1,
                        "pageInfo": {
                            "pageRowCount": 0,
                            "isUsePaging": false,
                            "totalPage": 1,
                            "pageLoadType": "NONE",
                            "totalRowCount": 0,
                            "currentPage": 1
                        },
                        "hasRowExpand": false,
                        "hasRowClick": false,
                        "tagName": "grid",
                        "hasRowDblClick": false,
                        "rowCheckRules": [[]],
                        "hasSequenceCol": true,
                        "parentGrid": "",
                        "hideGroup4Editing": false,
                        "isPanel": false,
                        "selectFieldIndex": 0
                    }, {
                        "layout": "GridLayout",
                        "metaObj": {
                            "padding": "5px",
                            "visible": true,
                            "hAlign": 1,
                            "editable": true,
                            "backImagePosition": "center",
                            "rowGap": 5,
                            "title": "系统信息",
                            "vAlign": 0,
                            "required": false,
                            "overflowX": "Visible",
                            "overflowY": "Visible",
                            "enable": true,
                            "crFocus": false,
                            "position": 0,
                            "hasBorder": false,
                            "key": "SystemInfo"
                        },
                        "valueChanged": "",
                        "heights": [25],
                        "minWidths": ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"],
                        "caption": "系统信息",
                        "isPanel": true,
                        "widths": [8, 70, "25%", 20, 70, "25%", 20, 70, "25%", 20, 70, "25%", 8],
                        "type": 2,
                        "tagName": "gridlayoutpanel",
                        "items": [{
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 1,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_CREATOR",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "制单人",
                            "isPanel": false,
                            "text": "制单人",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": false,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": false,
                                "crFocus": true,
                                "x": 2,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "Creator",
                                "key": "CREATOR",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "enableCont": "false",
                            "itemFilters": {},
                            "root": "",
                            "caption": "制单人",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Operator"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 4,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_MODIFIER",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "修改人",
                            "isPanel": false,
                            "text": "修改人",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": false,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "stateMask": 1,
                                "enable": false,
                                "crFocus": true,
                                "x": 5,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "Modifier",
                                "key": "MODIFIER",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "enableCont": "false",
                            "itemFilters": {},
                            "root": "",
                            "caption": "修改人",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Operator"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 7,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_CREATETIME",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "制单日期",
                            "isPanel": false,
                            "text": "制单日期",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": false,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "enable": false,
                                "crFocus": true,
                                "x": 8,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "CreateTime",
                                "key": "CREATETIME"
                            },
                            "valueChanged": "",
                            "enableCont": "false",
                            "caption": "制单日期",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "x": 10,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "L_MODIFYTIME",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "修改日期",
                            "isPanel": false,
                            "text": "修改日期",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": false,
                                "vAlign": 0,
                                "required": false,
                                "tableKey": "WM_ReceiptHead",
                                "enable": false,
                                "crFocus": true,
                                "x": 11,
                                "y": 0,
                                "position": 0,
                                "hasBorder": false,
                                "columnKey": "ModifyTime",
                                "key": "MODIFYTIME"
                            },
                            "valueChanged": "",
                            "enableCont": "false",
                            "caption": "修改日期",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }],
                        "height": "100%"
                    }],
                    "height": "100%"
                }]
            }, "key": "rootBlock"
        }]
    },
    "dataObjectKey": "Receipt",
    "abbrCaption": "收货单",
    "isError": true,
    "options": [],
    "defTbr": "main_toolbar",
    "initOperationState": 0,
    "key": "Receipt",
    "subDetailInfo": {
        "ReceipDtl": {
            "cells": {
                "RL_REJECT_UNIT": [],
                "RL_PUTAWAY_FINISH_UNIT": [],
                "RL_STATUS": [],
                "RL_LOST_UNIT": [],
                "RL_RECV_CUBAGE": [],
                "RL_REJECT_QTY": [],
                "RL_RECV_NET_WEIGHT_UNIT": [],
                "RL_PUTAWAY_FINISH_QTY": [],
                "RL_PALLET_ID": [],
                "RL_RECV_CUBAGE_UNIT": [],
                "RL_RECVSTAGING_ID": [],
                "RL_LOGISTICS_LINE_ID": [],
                "RL_SOURCE_MATERIAL_STATUS_ID": [],
                "RL_MATERIAL_CATEGORY": [],
                "RL_MATERIAL_ID": [],
                "RL_SHIFT": [],
                "RL_RECV_NET_WEIGHT": [],
                "RL_OWNER_SYSTEM_LINE_NO": [],
                "RL_CONSUME_QTY": [],
                "RL_DEST_MATERIAL_STATUS_ID": [],
                "SerialInput": [],
                "RL_PUTAWAY_UNIT": [],
                "RL_LOST_QTY": [],
                "RL_STOREAREA_ID": [],
                "RL_CONSUME_UNIT": [],
                "RL_DISCARD_QTY": [],
                "RL_RECV_GROSS_WEIGHT": [],
                "RL_RECV_GROSS_WEIGHT_UNIT": [],
                "RL_SPEC": [],
                "RL_CHECK_RESULT": [],
                "RL_RECV_UNIT": [],
                "RL_MATERIAL_STATUS_ID": [],
                "RL_STOREROOM_ID": [],
                "Select": [],
                "RL_RECV_AMOUNT": [],
                "RL_LOCATION_ID": [],
                "RL_PUTAWAY_QTY": [],
                "RL_DISCARD_UNIT": [],
                "RL_Dtl_OID": [],
                "RL_RECV_QTY": []
            }, "compList": [], "info": {"sourceFields": [""], "linkType": 1, "targetFields": [""]}
        }
    },
    "paraGroups": {
        "WeightUnit": [{"caption": "吨", "value": "201", "key": "ton"}, {
            "caption": "千克",
            "value": "202",
            "key": "kilogram"
        }, {"caption": "克", "value": "203", "key": "gramme"}],
        "VolumeUnit": [{"caption": "立方米", "value": "301", "key": "stere"}, {
            "caption": "立方厘米",
            "value": "302",
            "key": "cubiccemtimeter"
        }, {"caption": "升", "value": "303", "key": "liter"}, {"caption": "毫升", "value": "304", "key": "milliliter"}],
        "MaterialUnit": [{"caption": "个", "value": "401", "key": "Peace"}],
        "LengthUnit": [{"caption": "千米", "value": "101", "key": "kilometre"}, {
            "caption": "米",
            "value": "102",
            "key": "metre"
        }, {"caption": "分米", "value": "103", "key": "decimetre"}, {
            "caption": "厘米",
            "value": "104",
            "key": "centimetre"
        }, {"caption": "毫米", "value": "105", "key": "millimetre"}]
    },
    "dependency": {
        "calcTree": {
            "affectItems": [{
                "key": "RL_MATERIAL_ID",
                "expItems": [{
                    "left": "RL_RECV_AMOUNT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_PRICE') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 39
                }, {
                    "left": "RH_TOTAL_AMOUNT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_AMOUNT')",
                    "source": "RH_TOTAL_AMOUNT",
                    "type": 0,
                    "order": 40
                }, {
                    "left": "RL_RECV_CUBAGE_UNIT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE_UNIT_ID')",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 41
                }, {
                    "left": "RL_RECV_CUBAGE",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 42
                }, {
                    "left": "RH_TOTAL_CUBAGE",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_CUBAGE')",
                    "source": "RH_TOTAL_CUBAGE",
                    "type": 0,
                    "order": 43
                }, {
                    "left": "RL_RECV_NET_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_NET_WEIGHT') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 44
                }, {
                    "left": "RH_TOTAL_NET_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_NET_WEIGHT')",
                    "source": "RH_TOTAL_NET_WEIGHT",
                    "type": 0,
                    "order": 45
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT_UNIT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_WEIGHT_UNIT_ID')",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 46
                }, {
                    "left": "RL_RECV_NET_WEIGHT_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_GROSS_WEIGHT_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 47
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_GROSS_WEIGHT') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 48
                }, {
                    "left": "RH_TOTAL_GROSS_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_GROSS_WEIGHT')",
                    "source": "RH_TOTAL_GROSS_WEIGHT",
                    "type": 0,
                    "order": 49
                }, {
                    "left": "RL_RECV_UNIT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_UNIT_ID')",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 50
                }, {
                    "left": "RL_DISCARD_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 51
                }, {
                    "left": "RL_PUTAWAY_FINISH_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 52
                }, {
                    "left": "RL_PUTAWAY_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 53
                }, {
                    "left": "RL_REJECT_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 54
                }, {
                    "left": "RL_LOST_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 55
                }, {
                    "left": "RL_CONSUME_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 56
                }, {
                    "left": "RL_MATERIAL_CATEGORY",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CATEGORY_ID')",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 57
                }, {
                    "left": "RL_SPEC",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_SPEC')",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 58
                }]
            }, {
                "key": "RL_RECV_NET_WEIGHT",
                "expItems": [{
                    "left": "RH_TOTAL_NET_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_NET_WEIGHT')",
                    "source": "RH_TOTAL_NET_WEIGHT",
                    "type": 0,
                    "order": 45
                }]
            }, {
                "key": "RL_RECV_UNIT",
                "expItems": [{
                    "left": "RL_DISCARD_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 51
                }, {
                    "left": "RL_PUTAWAY_FINISH_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 52
                }, {
                    "left": "RL_PUTAWAY_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 53
                }, {
                    "left": "RL_REJECT_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 54
                }, {
                    "left": "RL_LOST_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 55
                }, {
                    "left": "RL_CONSUME_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 56
                }]
            }, {
                "key": "RL_RECV_AMOUNT",
                "expItems": [{
                    "left": "RH_TOTAL_AMOUNT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_AMOUNT')",
                    "source": "RH_TOTAL_AMOUNT",
                    "type": 0,
                    "order": 40
                }]
            }, {
                "key": "RL_RECV_CUBAGE",
                "expItems": [{
                    "left": "RH_TOTAL_CUBAGE",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_CUBAGE')",
                    "source": "RH_TOTAL_CUBAGE",
                    "type": 0,
                    "order": 43
                }]
            }, {
                "key": "RL_RECV_GROSS_WEIGHT",
                "expItems": [{
                    "left": "RH_TOTAL_GROSS_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_GROSS_WEIGHT')",
                    "source": "RH_TOTAL_GROSS_WEIGHT",
                    "type": 0,
                    "order": 49
                }]
            }, {
                "key": "RL_RECV_QTY",
                "expItems": [{
                    "left": "RL_RECV_AMOUNT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_PRICE') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 39
                }, {
                    "left": "RH_TOTAL_AMOUNT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_AMOUNT')",
                    "source": "RH_TOTAL_AMOUNT",
                    "type": 0,
                    "order": 40
                }, {
                    "left": "RL_RECV_CUBAGE",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 42
                }, {
                    "left": "RH_TOTAL_CUBAGE",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_CUBAGE')",
                    "source": "RH_TOTAL_CUBAGE",
                    "type": 0,
                    "order": 43
                }, {
                    "left": "RL_RECV_NET_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_NET_WEIGHT') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 44
                }, {
                    "left": "RH_TOTAL_NET_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_NET_WEIGHT')",
                    "source": "RH_TOTAL_NET_WEIGHT",
                    "type": 0,
                    "order": 45
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_GROSS_WEIGHT') * RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 48
                }, {
                    "left": "RH_TOTAL_GROSS_WEIGHT",
                    "defaultValue": "",
                    "formulaValue": "Sum('RL_RECV_GROSS_WEIGHT')",
                    "source": "RH_TOTAL_GROSS_WEIGHT",
                    "type": 0,
                    "order": 49
                }]
            }, {
                "key": "RL_RECV_GROSS_WEIGHT_UNIT",
                "expItems": [{
                    "left": "RL_RECV_NET_WEIGHT_UNIT",
                    "defaultValue": "",
                    "formulaValue": "RL_RECV_GROSS_WEIGHT_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "order": 47
                }]
            }],
            "items": [{
                "left": "RH_RECV_DATETIME",
                "defaultValue": "",
                "formulaValue": "ServerDate()",
                "source": "RH_RECV_DATETIME",
                "type": 0,
                "order": 3
            }, {
                "left": "RH_RECV_DATE",
                "defaultValue": "",
                "formulaValue": "ServerDate()",
                "source": "RH_RECV_DATE",
                "type": 0,
                "order": 8
            }, {
                "left": "CREATETIME",
                "defaultValue": "",
                "formulaValue": "ServerDate()",
                "source": "CREATETIME",
                "type": 0,
                "order": 10
            }, {
                "left": "RL_DISCARD_QTY",
                "defaultValue": "0",
                "formulaValue": "",
                "source": "ReceipDtl",
                "type": 1,
                "order": 22
            }, {
                "left": "RL_RECV_AMOUNT",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_PRICE') * RL_RECV_QTY",
                "source": "ReceipDtl",
                "type": 1,
                "order": 39
            }, {
                "left": "RH_TOTAL_AMOUNT",
                "defaultValue": "",
                "formulaValue": "Sum('RL_RECV_AMOUNT')",
                "source": "RH_TOTAL_AMOUNT",
                "type": 0,
                "order": 40
            }, {
                "left": "RL_RECV_CUBAGE_UNIT",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE_UNIT_ID')",
                "source": "ReceipDtl",
                "type": 1,
                "order": 41
            }, {
                "left": "RL_RECV_CUBAGE",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CUBAGE') * RL_RECV_QTY",
                "source": "ReceipDtl",
                "type": 1,
                "order": 42
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "defaultValue": "",
                "formulaValue": "Sum('RL_RECV_CUBAGE')",
                "source": "RH_TOTAL_CUBAGE",
                "type": 0,
                "order": 43
            }, {
                "left": "RL_RECV_NET_WEIGHT",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_NET_WEIGHT') * RL_RECV_QTY",
                "source": "ReceipDtl",
                "type": 1,
                "order": 44
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "defaultValue": "",
                "formulaValue": "Sum('RL_RECV_NET_WEIGHT')",
                "source": "RH_TOTAL_NET_WEIGHT",
                "type": 0,
                "order": 45
            }, {
                "left": "RL_RECV_GROSS_WEIGHT_UNIT",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_WEIGHT_UNIT_ID')",
                "source": "ReceipDtl",
                "type": 1,
                "order": 46
            }, {
                "left": "RL_RECV_NET_WEIGHT_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_GROSS_WEIGHT_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 47
            }, {
                "left": "RL_RECV_GROSS_WEIGHT",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_GROSS_WEIGHT') * RL_RECV_QTY",
                "source": "ReceipDtl",
                "type": 1,
                "order": 48
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "defaultValue": "",
                "formulaValue": "Sum('RL_RECV_GROSS_WEIGHT')",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "type": 0,
                "order": 49
            }, {
                "left": "RL_RECV_UNIT",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_UNIT_ID')",
                "source": "ReceipDtl",
                "type": 1,
                "order": 50
            }, {
                "left": "RL_DISCARD_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 51
            }, {
                "left": "RL_PUTAWAY_FINISH_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 52
            }, {
                "left": "RL_PUTAWAY_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 53
            }, {
                "left": "RL_REJECT_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 54
            }, {
                "left": "RL_LOST_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 55
            }, {
                "left": "RL_CONSUME_UNIT",
                "defaultValue": "",
                "formulaValue": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "type": 1,
                "order": 56
            }, {
                "left": "RL_MATERIAL_CATEGORY",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_CATEGORY_ID')",
                "source": "ReceipDtl",
                "type": 1,
                "order": 57
            }, {
                "left": "RL_SPEC",
                "defaultValue": "",
                "formulaValue": "GetDictValue('Material',RL_MATERIAL_ID,'MAT_SPEC')",
                "source": "ReceipDtl",
                "type": 1,
                "order": 58
            }, {
                "left": "Select",
                "defaultValue": "1",
                "formulaValue": "",
                "source": "ReceipDtl",
                "type": 1,
                "order": 61
            }, {
                "left": "MODIFYTIME",
                "defaultValue": "",
                "formulaValue": "ServerDate()",
                "source": "MODIFYTIME",
                "type": 0,
                "order": 67
            }, {
                "left": "MODIFIER",
                "defaultValue": "",
                "formulaValue": "GetOperator()",
                "source": "MODIFIER",
                "type": 0,
                "order": 73
            }, {
                "left": "Status",
                "defaultValue": "10",
                "formulaValue": "",
                "source": "Status",
                "type": 0,
                "order": 75
            }, {
                "left": "CREATOR",
                "defaultValue": "",
                "formulaValue": "GetOperator()",
                "source": "CREATOR",
                "type": 0,
                "order": 78
            }, {
                "left": "RH_PERMIT_FLAG",
                "defaultValue": "none",
                "formulaValue": "",
                "source": "RH_PERMIT_FLAG",
                "type": 0,
                "order": 81
            }, {
                "left": "RH_MIGRATE_RECV_DATE",
                "defaultValue": "",
                "formulaValue": "ServerDate()",
                "source": "RH_MIGRATE_RECV_DATE",
                "type": 0,
                "order": 84
            }]
        },
        "visibleTree": {
            "affectItems": [],
            "unVisibleKeys": [],
            "items": [{
                "left": "SystemInfo",
                "source": "SystemInfo",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT",
                "source": "L_RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOGISTICS_NO",
                "source": "RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {"left": "RH_TOTAL_AMOUNT", "source": "RH_TOTAL_AMOUNT", "right": "", "type": 0}, {
                "left": "main",
                "source": "main",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_NO",
                "source": "L_RH_OWNER_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_APPOINT_STOREROOM_ID",
                "source": "RH_APPOINT_STOREROOM_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_AMOUNT",
                "source": "L_RH_TOTAL_AMOUNT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_MIGRATE_RECV_DATE",
                "source": "RH_MIGRATE_RECV_DATE",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {"left": "L_MODIFYTIME", "source": "L_MODIFYTIME", "right": "", "type": 0}, {
                "left": "RH_RECEIPT_NO",
                "source": "RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_PERMIT_FLAG",
                "source": "RH_PERMIT_FLAG",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_PERMIT_FLAG",
                "source": "L_RH_PERMIT_FLAG",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATETIME",
                "source": "L_RH_RECV_DATETIME",
                "right": "false",
                "type": 0
            }, {"left": "CREATOR", "source": "CREATOR", "right": "", "type": 0}, {
                "left": "L_Status",
                "source": "L_Status",
                "right": "",
                "type": 0
            }, {"left": "L_RH_TX_TYPE_ID", "source": "L_RH_TX_TYPE_ID", "right": "", "type": 0}, {
                "left": "Status",
                "source": "Status",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_APPOINT_STOREROOM_ID",
                "source": "L_RH_APPOINT_STOREROOM_ID",
                "right": "",
                "type": 0
            }, {"left": "MODIFIER", "source": "MODIFIER", "right": "", "type": 0}, {
                "left": "L_RH_MIGRATE_RECV_DATE",
                "source": "L_RH_MIGRATE_RECV_DATE",
                "right": "",
                "type": 0
            }, {"left": "RH_REMARK", "source": "RH_REMARK", "right": "", "type": 0}, {
                "left": "RH_OWNER_ID",
                "source": "RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_ORG_ID",
                "source": "L_RH_ORG_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_LOGISTICS_HEADER_ID",
                "source": "L_RH_LOGISTICS_HEADER_ID",
                "right": "false",
                "type": 0
            }, {"left": "MODIFYTIME", "source": "MODIFYTIME", "right": "", "type": 0}, {
                "left": "L_CREATETIME",
                "source": "L_CREATETIME",
                "right": "",
                "type": 0
            }, {"left": "RH_LOT_STRING0", "source": "RH_LOT_STRING0", "right": "", "type": 0}, {
                "left": "main_split",
                "source": "main_split",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT",
                "source": "L_RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "source": "RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "source": "RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {"left": "L_RH_LOT_STRING0", "source": "L_RH_LOT_STRING0", "right": "", "type": 0}, {
                "left": "RH_ORG_ID",
                "source": "RH_ORG_ID",
                "right": "",
                "type": 0
            }, {"left": "ReceipDtl", "source": "ReceipDtl", "right": "", "type": 0}, {
                "left": "Select",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_Dtl_OID",
                "source": "ReceipDtl",
                "right": "false",
                "type": 1
            }, {
                "left": "RL_LOGISTICS_LINE_ID",
                "source": "ReceipDtl",
                "right": "false",
                "type": 1
            }, {"left": "RL_MATERIAL_ID", "source": "ReceipDtl", "right": "true", "type": 1}, {
                "left": "RL_SPEC",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_MATERIAL_CATEGORY",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {"left": "RL_RECV_QTY", "source": "ReceipDtl", "right": "", "type": 1}, {
                "left": "RL_RECV_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_RECV_GROSS_WEIGHT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_RECV_GROSS_WEIGHT_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_RECV_NET_WEIGHT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_RECV_NET_WEIGHT_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_RECV_CUBAGE",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_RECV_CUBAGE_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {"left": "RL_RECV_AMOUNT", "source": "ReceipDtl", "right": "true", "type": 1}, {
                "left": "RL_CONSUME_QTY",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {"left": "RL_CONSUME_UNIT", "source": "ReceipDtl", "right": "", "type": 1}, {
                "left": "RL_LOST_QTY",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {"left": "RL_LOST_UNIT", "source": "ReceipDtl", "right": "", "type": 1}, {
                "left": "RL_REJECT_QTY",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_REJECT_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_MATERIAL_STATUS_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_STOREROOM_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_STOREAREA_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_LOCATION_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_RECVSTAGING_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_PALLET_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_SOURCE_MATERIAL_STATUS_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_DEST_MATERIAL_STATUS_ID",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {
                "left": "RL_CHECK_RESULT",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {"left": "RL_PUTAWAY_QTY", "source": "ReceipDtl", "right": "", "type": 1}, {
                "left": "RL_PUTAWAY_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_PUTAWAY_FINISH_QTY",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_PUTAWAY_FINISH_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {"left": "RL_DISCARD_QTY", "source": "ReceipDtl", "right": "", "type": 1}, {
                "left": "RL_DISCARD_UNIT",
                "source": "ReceipDtl",
                "right": "",
                "type": 1
            }, {
                "left": "RL_OWNER_SYSTEM_LINE_NO",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {"left": "RL_STATUS", "source": "ReceipDtl", "right": "true", "type": 1}, {
                "left": "RL_SHIFT",
                "source": "ReceipDtl",
                "right": "true",
                "type": 1
            }, {"left": "SerialInput", "source": "ReceipDtl", "right": "true", "type": 1}, {
                "left": "RH_TX_TYPE_ID",
                "source": "RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {"left": "RH_OWNER_NO", "source": "RH_OWNER_NO", "right": "", "type": 0}, {
                "left": "Basic",
                "source": "Basic",
                "right": "",
                "type": 0
            }, {"left": "L_MODIFIER", "source": "L_MODIFIER", "right": "", "type": 0}, {
                "left": "L_RH_REMARK",
                "source": "L_RH_REMARK",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_ID",
                "source": "L_RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_CUBAGE",
                "source": "L_RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {"left": "L_RH_RECV_DATE", "source": "L_RH_RECV_DATE", "right": "", "type": 0}, {
                "left": "CREATETIME",
                "source": "CREATETIME",
                "right": "",
                "type": 0
            }, {"left": "L_CREATOR", "source": "L_CREATOR", "right": "", "type": 0}, {
                "left": "RH_RECV_DATE",
                "source": "RH_RECV_DATE",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECEIPT_NO",
                "source": "L_RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_FLOW_HEADER_ID",
                "source": "RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }, {"left": "RH_VENDOR_ID", "source": "RH_VENDOR_ID", "right": "", "type": 0}, {
                "left": "L_RH_VENDOR_ID",
                "source": "L_RH_VENDOR_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATETIME",
                "source": "RH_RECV_DATETIME",
                "right": "false",
                "type": 0
            }, {
                "left": "L_RH_LOGISTICS_NO",
                "source": "L_RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOGISTICS_HEADER_ID",
                "source": "RH_LOGISTICS_HEADER_ID",
                "right": "false",
                "type": 0
            }, {
                "left": "L_RH_FLOW_HEADER_ID",
                "source": "L_RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }, {"left": "Save", "source": "Save", "right": "!ReadOnly()", "type": 2}, {
                "left": "Edit",
                "source": "Edit",
                "right": "ReadOnly() && GetStatus()==10",
                "type": 2
            }, {
                "left": "Delete",
                "source": "Delete",
                "right": "ReadOnly()&& GetStatus()==10",
                "type": 2
            }, {"left": "Cancel", "source": "Cancel", "right": "!ReadOnly()", "type": 2}, {
                "left": "MapDispatch",
                "source": "MapDispatch",
                "right": "ReadOnly() && GetStatus()>=130",
                "type": 2
            }, {"left": "ShowAuditDetil", "source": "ShowAuditDetil", "right": "ReadOnly()", "type": 2}]
        },
        "enableTree": {
            "affectItems": [{
                "key": "RH_OWNER_ID",
                "expItems": [{
                    "source": "ReceipDtl",
                    "type": 1,
                    "items": [{
                        "left": "RL_MATERIAL_ID",
                        "dependency": "",
                        "source": "ReceipDtl",
                        "right": "!ReadOnly() && !IsNull(RH_OWNER_ID)",
                        "type": 1
                    }]
                }]
            }, {
                "key": "RL_STOREROOM_ID",
                "expItems": [{
                    "source": "ReceipDtl",
                    "type": 1,
                    "items": [{
                        "left": "RL_STOREAREA_ID",
                        "dependency": "",
                        "source": "ReceipDtl",
                        "right": "!IsNull(RL_STOREROOM_ID) && !ReadOnly()",
                        "type": 1
                    }, {
                        "left": "RL_LOCATION_ID",
                        "dependency": "",
                        "source": "ReceipDtl",
                        "right": "!IsNull(RL_STOREAREA_ID) && !IsNull(RL_STOREROOM_ID) && !ReadOnly()",
                        "type": 1
                    }]
                }]
            }, {
                "key": "RL_STOREAREA_ID",
                "expItems": [{
                    "source": "ReceipDtl",
                    "type": 1,
                    "items": [{
                        "left": "RL_LOCATION_ID",
                        "dependency": "",
                        "source": "ReceipDtl",
                        "right": "!IsNull(RL_STOREAREA_ID) && !IsNull(RL_STOREROOM_ID) && !ReadOnly()",
                        "type": 1
                    }]
                }]
            }],
            "items": [{
                "left": "L_RH_TOTAL_GROSS_WEIGHT",
                "dependency": "",
                "source": "L_RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOGISTICS_NO",
                "dependency": "",
                "source": "RH_LOGISTICS_NO",
                "right": "true",
                "type": 0
            }, {
                "left": "RH_TOTAL_AMOUNT",
                "dependency": "",
                "source": "RH_TOTAL_AMOUNT",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_NO",
                "dependency": "",
                "source": "L_RH_OWNER_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_APPOINT_STOREROOM_ID",
                "dependency": "",
                "source": "RH_APPOINT_STOREROOM_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_AMOUNT",
                "dependency": "",
                "source": "L_RH_TOTAL_AMOUNT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_MIGRATE_RECV_DATE",
                "dependency": "",
                "source": "RH_MIGRATE_RECV_DATE",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "dependency": "",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "L_MODIFYTIME",
                "dependency": "",
                "source": "L_MODIFYTIME",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECEIPT_NO",
                "dependency": "",
                "source": "RH_RECEIPT_NO",
                "right": "false",
                "type": 0
            }, {
                "left": "RH_PERMIT_FLAG",
                "dependency": "",
                "source": "RH_PERMIT_FLAG",
                "right": "false",
                "type": 0
            }, {
                "left": "L_RH_PERMIT_FLAG",
                "dependency": "",
                "source": "L_RH_PERMIT_FLAG",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATETIME",
                "dependency": "",
                "source": "L_RH_RECV_DATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "CREATOR",
                "dependency": "",
                "source": "CREATOR",
                "right": "false",
                "type": 0
            }, {
                "left": "L_Status",
                "dependency": "",
                "source": "L_Status",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TX_TYPE_ID",
                "dependency": "",
                "source": "L_RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {
                "left": "Status",
                "dependency": "",
                "source": "Status",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_APPOINT_STOREROOM_ID",
                "dependency": "",
                "source": "L_RH_APPOINT_STOREROOM_ID",
                "right": "",
                "type": 0
            }, {
                "left": "MODIFIER",
                "dependency": "",
                "source": "MODIFIER",
                "right": "false",
                "type": 0
            }, {
                "left": "L_RH_MIGRATE_RECV_DATE",
                "dependency": "",
                "source": "L_RH_MIGRATE_RECV_DATE",
                "right": "",
                "type": 0
            }, {
                "left": "RH_REMARK",
                "dependency": "",
                "source": "RH_REMARK",
                "right": "",
                "type": 0
            }, {
                "left": "RH_OWNER_ID",
                "dependency": "",
                "source": "RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_ORG_ID",
                "dependency": "",
                "source": "L_RH_ORG_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_LOGISTICS_HEADER_ID",
                "dependency": "",
                "source": "L_RH_LOGISTICS_HEADER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "MODIFYTIME",
                "dependency": "",
                "source": "MODIFYTIME",
                "right": "false",
                "type": 0
            }, {
                "left": "L_CREATETIME",
                "dependency": "",
                "source": "L_CREATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOT_STRING0",
                "dependency": "",
                "source": "RH_LOT_STRING0",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT",
                "dependency": "",
                "source": "L_RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "dependency": "",
                "source": "RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "dependency": "",
                "source": "RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_LOT_STRING0",
                "dependency": "",
                "source": "L_RH_LOT_STRING0",
                "right": "",
                "type": 0
            }, {
                "left": "RH_ORG_ID",
                "dependency": "",
                "source": "RH_ORG_ID",
                "right": "",
                "type": 0
            }, {
                "left": "ReceipDtl",
                "dependency": "",
                "source": "ReceipDtl",
                "right": "",
                "type": 0
            }, {
                "source": "ReceipDtl",
                "type": 1,
                "items": [{
                    "left": "Select",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_Dtl_OID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_LOGISTICS_LINE_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_MATERIAL_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_SPEC",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_MATERIAL_CATEGORY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_NET_WEIGHT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_NET_WEIGHT_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_CUBAGE",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_CUBAGE_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECV_AMOUNT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_CONSUME_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_CONSUME_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_LOST_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_LOST_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_REJECT_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_REJECT_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_MATERIAL_STATUS_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_STOREROOM_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_STOREAREA_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_LOCATION_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_RECVSTAGING_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_PALLET_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_SOURCE_MATERIAL_STATUS_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_DEST_MATERIAL_STATUS_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_CHECK_RESULT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_PUTAWAY_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_PUTAWAY_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_PUTAWAY_FINISH_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_PUTAWAY_FINISH_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_DISCARD_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_DISCARD_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_OWNER_SYSTEM_LINE_NO",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_STATUS",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RL_SHIFT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "SerialInput",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 2
                }, {
                    "left": "Select",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "true",
                    "type": 1
                }, {
                    "left": "RL_Dtl_OID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_LOGISTICS_LINE_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_MATERIAL_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "!ReadOnly() && !IsNull(RH_OWNER_ID)",
                    "type": 1
                }, {
                    "left": "RL_SPEC",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_MATERIAL_CATEGORY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_RECV_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_RECV_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_RECV_NET_WEIGHT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_RECV_NET_WEIGHT_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_RECV_CUBAGE",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_RECV_CUBAGE_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_RECV_AMOUNT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_CONSUME_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_CONSUME_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_LOST_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_LOST_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_REJECT_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_REJECT_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_MATERIAL_STATUS_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_STOREROOM_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_STOREAREA_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "!IsNull(RL_STOREROOM_ID) && !ReadOnly()",
                    "type": 1
                }, {
                    "left": "RL_LOCATION_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "!IsNull(RL_STOREAREA_ID) && !IsNull(RL_STOREROOM_ID) && !ReadOnly()",
                    "type": 1
                }, {
                    "left": "RL_RECVSTAGING_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_PALLET_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_SOURCE_MATERIAL_STATUS_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_DEST_MATERIAL_STATUS_ID",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_CHECK_RESULT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_PUTAWAY_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_PUTAWAY_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_PUTAWAY_FINISH_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_PUTAWAY_FINISH_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_DISCARD_QTY",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_DISCARD_UNIT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_OWNER_SYSTEM_LINE_NO",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {
                    "left": "RL_STATUS",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "false",
                    "type": 1
                }, {
                    "left": "RL_SHIFT",
                    "dependency": "",
                    "source": "ReceipDtl",
                    "right": "",
                    "type": 1
                }, {"left": "SerialInput", "dependency": "", "source": "ReceipDtl", "right": "", "type": 1}]
            }, {
                "left": "RH_TX_TYPE_ID",
                "dependency": "",
                "source": "RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_OWNER_NO",
                "dependency": "",
                "source": "RH_OWNER_NO",
                "right": "",
                "type": 0
            }, {
                "left": "L_MODIFIER",
                "dependency": "",
                "source": "L_MODIFIER",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_REMARK",
                "dependency": "",
                "source": "L_RH_REMARK",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_ID",
                "dependency": "",
                "source": "L_RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_CUBAGE",
                "dependency": "",
                "source": "L_RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATE",
                "dependency": "",
                "source": "L_RH_RECV_DATE",
                "right": "",
                "type": 0
            }, {
                "left": "CREATETIME",
                "dependency": "",
                "source": "CREATETIME",
                "right": "false",
                "type": 0
            }, {
                "left": "L_CREATOR",
                "dependency": "",
                "source": "L_CREATOR",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATE",
                "dependency": "",
                "source": "RH_RECV_DATE",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECEIPT_NO",
                "dependency": "",
                "source": "L_RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_FLOW_HEADER_ID",
                "dependency": "",
                "source": "RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_VENDOR_ID",
                "dependency": "",
                "source": "RH_VENDOR_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_VENDOR_ID",
                "dependency": "",
                "source": "L_RH_VENDOR_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATETIME",
                "dependency": "",
                "source": "RH_RECV_DATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_LOGISTICS_NO",
                "dependency": "",
                "source": "L_RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOGISTICS_HEADER_ID",
                "dependency": "",
                "source": "RH_LOGISTICS_HEADER_ID",
                "right": "false",
                "type": 0
            }, {
                "left": "L_RH_FLOW_HEADER_ID",
                "dependency": "",
                "source": "L_RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }]
        },
        "checkRuleTree": {
            "affectItems": [],
            "items": [{
                "left": "L_RH_TOTAL_GROSS_WEIGHT",
                "source": "L_RH_TOTAL_GROSS_WEIGHT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_LOGISTICS_NO",
                "source": "RH_LOGISTICS_NO",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_TOTAL_AMOUNT",
                "source": "RH_TOTAL_AMOUNT",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_OWNER_NO",
                "source": "L_RH_OWNER_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_APPOINT_STOREROOM_ID",
                "source": "RH_APPOINT_STOREROOM_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_TOTAL_AMOUNT",
                "source": "L_RH_TOTAL_AMOUNT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_MIGRATE_RECV_DATE",
                "source": "RH_MIGRATE_RECV_DATE",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {"left": "L_MODIFYTIME", "source": "L_MODIFYTIME", "type": 0, "content": ""}, {
                "left": "RH_RECEIPT_NO",
                "source": "RH_RECEIPT_NO",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_PERMIT_FLAG",
                "source": "RH_PERMIT_FLAG",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_PERMIT_FLAG",
                "source": "L_RH_PERMIT_FLAG",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_RECV_DATETIME",
                "source": "L_RH_RECV_DATETIME",
                "type": 0,
                "content": ""
            }, {"left": "CREATOR", "source": "CREATOR", "type": 0, "content": "", "errorMsg": ""}, {
                "left": "L_Status",
                "source": "L_Status",
                "type": 0,
                "content": ""
            }, {"left": "L_RH_TX_TYPE_ID", "source": "L_RH_TX_TYPE_ID", "type": 0, "content": ""}, {
                "left": "Status",
                "source": "Status",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_APPOINT_STOREROOM_ID",
                "source": "L_RH_APPOINT_STOREROOM_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "MODIFIER",
                "source": "MODIFIER",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_MIGRATE_RECV_DATE",
                "source": "L_RH_MIGRATE_RECV_DATE",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_REMARK",
                "source": "RH_REMARK",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_OWNER_ID",
                "source": "RH_OWNER_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_ORG_ID",
                "source": "L_RH_ORG_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_LOGISTICS_HEADER_ID",
                "source": "L_RH_LOGISTICS_HEADER_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "MODIFYTIME",
                "source": "MODIFYTIME",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {"left": "L_CREATETIME", "source": "L_CREATETIME", "type": 0, "content": ""}, {
                "left": "RH_LOT_STRING0",
                "source": "RH_LOT_STRING0",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT",
                "source": "L_RH_TOTAL_NET_WEIGHT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "source": "RH_TOTAL_NET_WEIGHT",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "source": "RH_TOTAL_CUBAGE",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_LOT_STRING0",
                "source": "L_RH_LOT_STRING0",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_ORG_ID",
                "source": "RH_ORG_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "source": "ReceipDtl",
                "type": 1,
                "items": [{
                    "left": "Select",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_Dtl_OID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_LOGISTICS_LINE_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_MATERIAL_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_SPEC",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_MATERIAL_CATEGORY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_GROSS_WEIGHT_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_NET_WEIGHT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_NET_WEIGHT_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_CUBAGE",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_CUBAGE_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECV_AMOUNT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_CONSUME_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_CONSUME_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_LOST_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_LOST_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_REJECT_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_REJECT_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_MATERIAL_STATUS_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_STOREROOM_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_STOREAREA_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_LOCATION_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_RECVSTAGING_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_PALLET_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_SOURCE_MATERIAL_STATUS_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_DEST_MATERIAL_STATUS_ID",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_CHECK_RESULT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_PUTAWAY_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_PUTAWAY_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_PUTAWAY_FINISH_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_PUTAWAY_FINISH_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_DISCARD_QTY",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_DISCARD_UNIT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_OWNER_SYSTEM_LINE_NO",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_STATUS",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {
                    "left": "RL_SHIFT",
                    "source": "ReceipDtl",
                    "type": 1,
                    "content": "",
                    "errorMsg": ""
                }, {"left": "SerialInput", "source": "ReceipDtl", "type": 1, "content": "", "errorMsg": ""}]
            }, {
                "left": "RH_TX_TYPE_ID",
                "source": "RH_TX_TYPE_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_OWNER_NO",
                "source": "RH_OWNER_NO",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {"left": "L_MODIFIER", "source": "L_MODIFIER", "type": 0, "content": ""}, {
                "left": "L_RH_REMARK",
                "source": "L_RH_REMARK",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_OWNER_ID",
                "source": "L_RH_OWNER_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_CUBAGE",
                "source": "L_RH_TOTAL_CUBAGE",
                "type": 0,
                "content": ""
            }, {"left": "L_RH_RECV_DATE", "source": "L_RH_RECV_DATE", "type": 0, "content": ""}, {
                "left": "CREATETIME",
                "source": "CREATETIME",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {"left": "L_CREATOR", "source": "L_CREATOR", "type": 0, "content": ""}, {
                "left": "RH_RECV_DATE",
                "source": "RH_RECV_DATE",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_RECEIPT_NO",
                "source": "L_RH_RECEIPT_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_FLOW_HEADER_ID",
                "source": "RH_FLOW_HEADER_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "RH_VENDOR_ID",
                "source": "RH_VENDOR_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_VENDOR_ID",
                "source": "L_RH_VENDOR_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_RECV_DATETIME",
                "source": "RH_RECV_DATETIME",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {
                "left": "L_RH_LOGISTICS_NO",
                "source": "L_RH_LOGISTICS_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_LOGISTICS_HEADER_ID",
                "source": "RH_LOGISTICS_HEADER_ID",
                "type": 0,
                "content": "",
                "errorMsg": ""
            }, {"left": "L_RH_FLOW_HEADER_ID", "source": "L_RH_FLOW_HEADER_ID", "type": 0, "content": ""}]
        }
    },
    "paraCollection": [],
    "standalone": false,
    "mapGrids": {"Receipt2Putaway": "WM_RECEIPT_LINE"},
    "checkRules": [{"content": "\n\t\t\tGetRowCount(\"ReceipDtl\", false)>0\n\t\t", "errorMsg": "物料明细不能为空"}],
    "target": 0,
    "errorMsg": "物料明细不能为空",
    "hostUIStatusProxy": false,
    "filterMap": {"filterMap": [], "OID": -1, "needDocInfo": true, "type": 1},
    "refTableKey": "",
    "relations": {
        "RH_OWNER_ID": ["RL_MATERIAL_ID"],
        "RL_STOREROOM_ID": ["RL_STOREAREA_ID", "RL_LOCATION_ID"],
        "RL_STOREAREA_ID": ["RL_LOCATION_ID"]
    },
    "parameters": {}
}, {
    "statusItems": [{"caption": "已输入", "value": 10, "key": "10"}, {
        "caption": "已确认",
        "value": 20,
        "key": "20"
    }, {"caption": "已配车", "value": 30, "key": "30"}, {"caption": "已拣货", "value": 40, "key": "40"}, {
        "caption": "已发货",
        "value": 50,
        "key": "50"
    }, {"caption": "已提货", "value": 60, "key": "60"}, {"caption": "已装货", "value": 70, "key": "70"}, {
        "caption": "已发车",
        "value": 80,
        "key": "80"
    }, {"caption": "已卸货", "value": 90, "key": "90"}, {"caption": "已签收", "value": 100, "key": "100"}, {
        "caption": "已入库",
        "value": 110,
        "key": "110"
    }, {"caption": "已回单", "value": 120, "key": "120"}, {"caption": "已完成", "value": 130, "key": "130"}, {
        "caption": "已关闭",
        "value": 140,
        "key": "140"
    }, {"caption": "已结案", "value": 150, "key": "150"}, {"caption": "已驳回", "value": 160, "key": "160"}],
    "operationState": 2,
    "mainTableKey": "ReceiptHead",
    "caption": "收货单序时簿",
    "type": 3,
    "refObjectKey": "",
    "body": {
        "index_of_block": 0,
        "items": [{
            "rootPanel": {
                "layout": "GridLayout",
                "metaObj": {
                    "visible": true,
                    "hAlign": 1,
                    "editable": true,
                    "backImagePosition": "center",
                    "vAlign": 0,
                    "required": false,
                    "overflowX": "Visible",
                    "overflowY": "Visible",
                    "enable": true,
                    "crFocus": false,
                    "position": 0,
                    "hasBorder": false,
                    "key": "main"
                },
                "valueChanged": "",
                "heights": [40, "100%"],
                "minWidths": ["-1"],
                "isPanel": true,
                "widths": ["100%"],
                "type": 2,
                "tagName": "gridlayoutpanel",
                "items": [{
                    "metaObj": {
                        "visible": true,
                        "hAlign": 1,
                        "enable": true,
                        "editable": true,
                        "crFocus": false,
                        "x": 0,
                        "y": 0,
                        "position": 0,
                        "hasBorder": false,
                        "vAlign": 0,
                        "key": "main_toolbar",
                        "required": false
                    },
                    "valueChanged": "",
                    "isPanel": false,
                    "type": 223,
                    "tagName": "toolbar",
                    "items": [{
                        "customKey": "",
                        "visible": true,
                        "visibleCont": "",
                        "enableCont": "",
                        "enable": true,
                        "icon": "new.png",
                        "caption": "新增",
                        "action": "New('Receipt')",
                        "style": "Button",
                        "tag": "",
                        "type": 0,
                        "key": "New"
                    }]
                }, {
                    "layout": "SplitLayout",
                    "metaObj": {
                        "orientation": "vertical",
                        "visible": true,
                        "hAlign": 1,
                        "editable": true,
                        "backImagePosition": "center",
                        "vAlign": 0,
                        "required": false,
                        "overflowX": "Visible",
                        "overflowY": "Visible",
                        "enable": true,
                        "crFocus": false,
                        "x": 0,
                        "y": 1,
                        "position": 0,
                        "hasBorder": false,
                        "key": "main_split"
                    },
                    "valueChanged": "",
                    "splitSizes": [{"size": "20%"}, {"size": "80%"}],
                    "isPanel": true,
                    "type": 3,
                    "tagName": "splitpanel",
                    "items": [{
                        "layout": "FluidTableLayout",
                        "metaObj": {
                            "padding": "5px",
                            "visible": true,
                            "hAlign": 1,
                            "editable": true,
                            "backImagePosition": "center",
                            "rowGap": 5,
                            "repeatGap": 10,
                            "vAlign": 0,
                            "required": false,
                            "overflowX": "Visible",
                            "overflowY": "Visible",
                            "columnGap": 5,
                            "enable": true,
                            "crFocus": false,
                            "position": 0,
                            "hasBorder": false,
                            "key": "query",
                            "repeatCount": 4,
                            "rowHeight": 25
                        },
                        "valueChanged": "",
                        "isPanel": true,
                        "widths": [100, "100%"],
                        "type": 12,
                        "tagName": "fluidtablelayoutpanel",
                        "items": [{
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_RECEIPT_NO",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "收货单号",
                            "isPanel": false,
                            "text": "收货单号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 7,
                                "groupHead": false,
                                "type": 215,
                                "columnKey": "RH_RECEIPT_NO",
                                "key": "RH_RECEIPT_NO",
                                "group": ""
                            },
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_RECEIPT_NO",
                                "trim": false,
                                "enable": true,
                                "crFocus": true,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "key": "RH_RECEIPT_NO",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "caption": "收货单号",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_Status",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "状态",
                            "isPanel": false,
                            "text": "状态",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 0,
                                "groupHead": false,
                                "type": 204,
                                "columnKey": "Status",
                                "key": "Status",
                                "group": ""
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": false,
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_Status",
                                "dynamicItems": false,
                                "sourceType": 0,
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "Status"
                            },
                            "valueChanged": "",
                            "filterItems": true,
                            "caption": "状态",
                            "isPanel": false,
                            "text": "",
                            "type": 204,
                            "tagName": "combobox",
                            "globalItems": "",
                            "value": "",
                            "items": [{}, {"caption": "已输入", "value": "10"}, {
                                "caption": "已完成",
                                "value": "90"
                            }, {"caption": "已关闭", "value": "100"}]
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_LOGISTICS_NO",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "入库单号",
                            "isPanel": false,
                            "text": "入库单号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 7,
                                "groupHead": false,
                                "type": 215,
                                "columnKey": "RH_LOGISTICS_NO",
                                "key": "RH_LOGISTICS_NO",
                                "group": ""
                            },
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_LOGISTICS_NO",
                                "trim": false,
                                "enable": true,
                                "crFocus": true,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "key": "RH_LOGISTICS_NO",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "caption": "入库单号",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_OWNER_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "货主",
                            "isPanel": false,
                            "text": "货主",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 9,
                                "groupHead": false,
                                "type": 206,
                                "columnKey": "RH_OWNER_ID",
                                "key": "RH_OWNER_ID",
                                "group": ""
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_OWNER_ID",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_OWNER_ID",
                                "multiSelect": true
                            },
                            "valueChanged": "",
                            "itemFilters": {},
                            "root": "",
                            "caption": "货主",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Owner"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_OWNER_NO",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "货主单号",
                            "isPanel": false,
                            "text": "货主单号",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 7,
                                "groupHead": false,
                                "type": 215,
                                "columnKey": "RH_OWNER_NO",
                                "key": "RH_OWNER_NO",
                                "group": ""
                            },
                            "metaObj": {
                                "embedText": "",
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "icon": "",
                                "preIcon": "",
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_OWNER_NO",
                                "trim": false,
                                "enable": true,
                                "crFocus": true,
                                "invalidChars": "",
                                "position": 0,
                                "hasBorder": false,
                                "promptText": "",
                                "key": "RH_OWNER_NO",
                                "maxLength": 255
                            },
                            "valueChanged": "",
                            "caption": "货主单号",
                            "isPanel": false,
                            "type": 215,
                            "tagName": "texteditor",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_VENDOR_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "供应商",
                            "isPanel": false,
                            "text": "供应商",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 9,
                                "groupHead": false,
                                "type": 206,
                                "columnKey": "RH_VENDOR_ID",
                                "key": "RH_VENDOR_ID",
                                "group": ""
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_VENDOR_ID",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_VENDOR_ID",
                                "multiSelect": true
                            },
                            "valueChanged": "",
                            "itemFilters": {},
                            "root": "",
                            "caption": "供应商",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "VendorCustomer"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TX_TYPE_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "事务类型",
                            "isPanel": false,
                            "text": "事务类型",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 9,
                                "groupHead": false,
                                "type": 206,
                                "columnKey": "RH_TX_TYPE_ID",
                                "key": "RH_TX_TYPE_ID",
                                "group": ""
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_TX_TYPE_ID",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TX_TYPE_ID",
                                "multiSelect": true
                            },
                            "valueChanged": "",
                            "itemFilters": {
                                "TransactionType": [{
                                    "filterIndex": 0,
                                    "filterVals": [{"refVal": "inbound", "type": 2}],
                                    "dependency": "",
                                    "typeDefKey": "",
                                    "cond": ""
                                }]
                            },
                            "root": "",
                            "caption": "事务类型",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "TransactionType"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_FLOW_HEADER_ID",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "流程",
                            "isPanel": false,
                            "text": "流程",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "secondaryType": 3,
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 9,
                                "groupHead": false,
                                "type": 206,
                                "columnKey": "RH_FLOW_HEADER_ID",
                                "key": "RH_FLOW_HEADER_ID",
                                "group": ""
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "isDynamic": false,
                                "independent": false,
                                "editable": true,
                                "vAlign": 0,
                                "required": false,
                                "buddyKey": "L_RH_FLOW_HEADER_ID",
                                "stateMask": 1,
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_FLOW_HEADER_ID",
                                "multiSelect": false
                            },
                            "valueChanged": "",
                            "itemFilters": {
                                "Flow": [{
                                    "filterIndex": 0,
                                    "filterVals": [{"refVal": "inbound", "type": 2}],
                                    "dependency": "",
                                    "typeDefKey": "",
                                    "cond": ""
                                }]
                            },
                            "root": "",
                            "caption": "流程",
                            "isPanel": false,
                            "text": "",
                            "type": 206,
                            "tagName": "dict",
                            "itemKey": "Flow"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_GROSS_WEIGHT",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总毛重",
                            "isPanel": false,
                            "text": "总毛重",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 6,
                                "groupHead": true,
                                "type": 210,
                                "columnKey": "RH_TOTAL_GROSS_WEIGHT",
                                "key": "RH_TOTAL_GROSS_WEIGHT",
                                "group": "RH_TOTAL_GROSS_WEIGHT"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_GROSS_WEIGHT",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_GROSS_WEIGHT",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总毛重",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_GROSS_WEIGHT2",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "text": "到",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": true,
                                "condSign": -1,
                                "groupHead": false,
                                "type": 210,
                                "columnKey": "RH_TOTAL_GROSS_WEIGHT",
                                "key": "RH_TOTAL_GROSS_WEIGHT2",
                                "group": "RH_TOTAL_GROSS_WEIGHT"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_GROSS_WEIGHT2",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_GROSS_WEIGHT2",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_NET_WEIGHT",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总净重",
                            "isPanel": false,
                            "text": "总净重",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 6,
                                "groupHead": true,
                                "type": 210,
                                "columnKey": "RH_TOTAL_NET_WEIGHT",
                                "key": "RH_TOTAL_NET_WEIGHT",
                                "group": "RH_TOTAL_NET_WEIGHT"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_NET_WEIGHT",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_NET_WEIGHT",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总净重",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_NET_WEIGHT2",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "text": "到",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": true,
                                "condSign": -1,
                                "groupHead": false,
                                "type": 210,
                                "columnKey": "RH_TOTAL_NET_WEIGHT",
                                "key": "RH_TOTAL_NET_WEIGHT2",
                                "group": "RH_TOTAL_NET_WEIGHT"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_NET_WEIGHT2",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_NET_WEIGHT2",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_CUBAGE",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总体积",
                            "isPanel": false,
                            "text": "总体积",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 6,
                                "groupHead": true,
                                "type": 210,
                                "columnKey": "RH_TOTAL_CUBAGE",
                                "key": "RH_TOTAL_CUBAGE",
                                "group": "RH_TOTAL_CUBAGE"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_CUBAGE",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_CUBAGE",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总体积",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_CUBAGE2",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "text": "到",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": true,
                                "condSign": -1,
                                "groupHead": false,
                                "type": 210,
                                "columnKey": "RH_TOTAL_CUBAGE",
                                "key": "RH_TOTAL_CUBAGE2",
                                "group": "RH_TOTAL_CUBAGE"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_CUBAGE2",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_CUBAGE2",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_AMOUNT",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "总金额",
                            "isPanel": false,
                            "text": "总金额",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 6,
                                "groupHead": true,
                                "type": 210,
                                "columnKey": "RH_TOTAL_AMOUNT",
                                "key": "RH_TOTAL_AMOUNT",
                                "group": "RH_TOTAL_AMOUNT"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_AMOUNT",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_AMOUNT",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "总金额",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_TOTAL_AMOUNT2",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "text": "到",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": true,
                                "condSign": -1,
                                "groupHead": false,
                                "type": 210,
                                "columnKey": "RH_TOTAL_AMOUNT",
                                "key": "RH_TOTAL_AMOUNT2",
                                "group": "RH_TOTAL_AMOUNT"
                            },
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "editable": true,
                                "vAlign": 0,
                                "decPrecision": 16,
                                "groupingSize": 0,
                                "required": false,
                                "decScale": 2,
                                "buddyKey": "L_RH_TOTAL_AMOUNT2",
                                "enable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "key": "RH_TOTAL_AMOUNT2",
                                "sep": ","
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "type": 210,
                            "tagName": "numbereditor",
                            "value": "0"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_RECV_DATETIME",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "收货日期时间",
                            "isPanel": false,
                            "text": "收货日期时间",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": false,
                                "condSign": 6,
                                "groupHead": true,
                                "type": 205,
                                "columnKey": "RH_RECV_DATETIME",
                                "key": "RH_RECV_DATETIME",
                                "group": "RH_RECV_DATETIME"
                            },
                            "metaObj": {
                                "visible": true,
                                "buddyKey": "L_RH_RECV_DATETIME",
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "RH_RECV_DATETIME",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "收货日期时间",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": false,
                                "position": 0,
                                "hasBorder": false,
                                "buddy": true,
                                "vAlign": 0,
                                "key": "L_RH_RECV_DATETIME2",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "text": "到",
                            "type": 209,
                            "tagName": "label",
                            "value": ""
                        }, {
                            "condition": {
                                "limitToSource": false,
                                "tableKey": "ReceiptHead",
                                "groupTail": true,
                                "condSign": -1,
                                "groupHead": false,
                                "type": 205,
                                "columnKey": "RH_RECV_DATETIME",
                                "key": "RH_RECV_DATETIME2",
                                "group": "RH_RECV_DATETIME"
                            },
                            "metaObj": {
                                "visible": true,
                                "buddyKey": "L_RH_RECV_DATETIME2",
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "RH_RECV_DATETIME2",
                                "required": false
                            },
                            "valueChanged": "",
                            "caption": "到",
                            "isPanel": false,
                            "text": "",
                            "type": 205,
                            "tagName": "datepicker",
                            "value": ""
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "Query",
                                "required": false
                            },
                            "clickContent": "DealCondition();LoadData();ShowData();",
                            "valueChanged": "",
                            "enableCont": "true",
                            "caption": "查询",
                            "isPanel": false,
                            "type": 200,
                            "tagName": "button",
                            "value": "查询"
                        }, {
                            "metaObj": {
                                "visible": true,
                                "hAlign": 1,
                                "enable": true,
                                "editable": true,
                                "crFocus": true,
                                "position": 0,
                                "hasBorder": false,
                                "vAlign": 0,
                                "key": "cancel",
                                "required": false
                            },
                            "clickContent": "ResetCondition();",
                            "valueChanged": "",
                            "enableCont": "true",
                            "caption": "重置",
                            "isPanel": false,
                            "type": 200,
                            "tagName": "button",
                            "value": "重置"
                        }],
                        "height": "100%"
                    }, {
                        "metaObj": {
                            "loadType": -1,
                            "visible": true,
                            "hAlign": 1,
                            "editable": true,
                            "vAlign": 0,
                            "required": false,
                            "tableKey": "ReceiptHead",
                            "pageRowCount": 0,
                            "enable": true,
                            "crFocus": false,
                            "x": 0,
                            "y": 1,
                            "position": 0,
                            "hasBorder": false,
                            "key": "list"
                        },
                        "valueChanged": "",
                        "data": [{
                            "RH_TX_TYPE_ID_LV": {"caption": "05 仅入库", "value": 583395},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {
                                "caption": "LGORDER20151130000009",
                                "value": "LGORDER20151130000009"
                            },
                            "OID_LV": {"caption": "1,113,010.00", "value": 1113010},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "210,077,600.00", "value": 210077600},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20151204000021", "value": "STIN20151204000021"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "619204", "value": "619204"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "210,102,592.00", "value": 210102592},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "210,052,608.00", "value": 210052608},
                            "CREATETIME_LV": {
                                "caption": "2015-12-04 00:00:00",
                                "value": "Fri Dec 04 00:00:00 CST 2015"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "04 收货-上架", "value": 13006},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2015-12-04 14:38:26",
                                "value": "Fri Dec 04 14:38:26 CST 2015"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "05 仅入库", "value": 583395},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,142,359.00", "value": 1142359},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "900.00", "value": 900},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160503000001", "value": "STIN20160503000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "1,000.00", "value": 1000},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "800.00", "value": 800},
                            "CREATETIME_LV": {
                                "caption": "2016-05-03 00:00:00",
                                "value": "Tue May 03 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "04 收货-上架", "value": 13006},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-03 15:16:45",
                                "value": "Tue May 03 15:16:45 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "1112121", "value": "1112121"},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,142,370.00", "value": 1142370},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160503000002", "value": "STIN20160503000002"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-05-03 00:00:00",
                                "value": "Tue May 03 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-03 15:24:13",
                                "value": "Tue May 03 15:24:13 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,143,319.00", "value": 1143319},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160506000001", "value": "STIN20160506000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-05-06 00:00:00",
                                "value": "Fri May 06 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-06 10:04:08",
                                "value": "Fri May 06 10:04:08 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,144,257.00", "value": 1144257},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160511000001", "value": "STIN20160511000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-05-11 00:00:00",
                                "value": "Wed May 11 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-11 11:09:51",
                                "value": "Wed May 11 11:09:51 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,144,273.00", "value": 1144273},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160511000002", "value": "STIN20160511000002"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-05-11 00:00:00",
                                "value": "Wed May 11 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-11 14:07:33",
                                "value": "Wed May 11 14:07:33 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,148,150.00", "value": 1148150},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160512000001", "value": "STIN20160512000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-05-12 00:00:00",
                                "value": "Thu May 12 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-12 11:09:18",
                                "value": "Thu May 12 11:09:18 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,148,155.00", "value": 1148155},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160512000003", "value": "STIN20160512000003"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-05-12 00:00:00",
                                "value": "Thu May 12 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-05-12 11:12:37",
                                "value": "Thu May 12 11:12:37 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,150,670.00", "value": 1150670},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160613000001", "value": "STIN20160613000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "40"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-13 00:00:00",
                                "value": "Mon Jun 13 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": ""},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-13 14:11:42",
                                "value": "Mon Jun 13 14:11:42 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,150,701.00", "value": 1150701},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160613000002", "value": "STIN20160613000002"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-13 00:00:00",
                                "value": "Mon Jun 13 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-13 17:00:43",
                                "value": "Mon Jun 13 17:00:43 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,117.00", "value": 1153117},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160622000001", "value": "STIN20160622000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-22 00:00:00",
                                "value": "Wed Jun 22 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-22 11:03:31",
                                "value": "Wed Jun 22 11:03:31 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,210.00", "value": 1153210},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160622000002", "value": "STIN20160622000002"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "20"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-22 00:00:00",
                                "value": "Wed Jun 22 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-22 16:26:30",
                                "value": "Wed Jun 22 16:26:30 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,220.00", "value": 1153220},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160622000003", "value": "STIN20160622000003"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-22 00:00:00",
                                "value": "Wed Jun 22 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-22 16:54:51",
                                "value": "Wed Jun 22 16:54:51 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,230.00", "value": 1153230},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160622000004", "value": "STIN20160622000004"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-22 00:00:00",
                                "value": "Wed Jun 22 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-22 17:19:20",
                                "value": "Wed Jun 22 17:19:20 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,338.00", "value": 1153338},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160623000001", "value": "STIN20160623000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-23 00:00:00",
                                "value": "Thu Jun 23 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-23 16:06:44",
                                "value": "Thu Jun 23 16:06:44 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,376.00", "value": 1153376},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160623000002", "value": "STIN20160623000002"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-23 00:00:00",
                                "value": "Thu Jun 23 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-23 16:47:00",
                                "value": "Thu Jun 23 16:47:00 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,153,390.00", "value": 1153390},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160623000003", "value": "STIN20160623000003"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-23 00:00:00",
                                "value": "Thu Jun 23 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": ""},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-23 17:25:07",
                                "value": "Thu Jun 23 17:25:07 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,154,304.00", "value": 1154304},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160630000001", "value": "STIN20160630000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-30 00:00:00",
                                "value": "Thu Jun 30 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": ""},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-30 09:31:00",
                                "value": "Thu Jun 30 09:31:00 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,154,482.00", "value": 1154482},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160630000002", "value": "STIN20160630000002"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-06-30 00:00:00",
                                "value": "Thu Jun 30 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "", "value": 0},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-06-30 15:31:08",
                                "value": "Thu Jun 30 15:31:08 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,156,130.00", "value": 1156130},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160715000001", "value": "STIN20160715000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-07-15 00:00:00",
                                "value": "Fri Jul 15 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-07-15 09:16:27",
                                "value": "Fri Jul 15 09:16:27 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,156,834.00", "value": 1156834},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160727000001", "value": "STIN20160727000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "已输入", "value": "10"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-07-27 00:00:00",
                                "value": "Wed Jul 27 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-07-27 14:55:16",
                                "value": "Wed Jul 27 14:55:16 CST 2016"
                            }
                        }, {
                            "RH_TX_TYPE_ID_LV": {"caption": "", "value": 0},
                            "RH_OWNER_NO_LV": {"caption": "", "value": ""},
                            "POID_LV": {"caption": "0.00", "value": 0},
                            "RH_LOGISTICS_NO_LV": {"caption": "", "value": ""},
                            "OID_LV": {"caption": "1,157,067.00", "value": 1157067},
                            "RH_TOTAL_NET_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "VERID_LV": {"caption": "0.00", "value": 0},
                            "RH_RECEIPT_NO_LV": {"caption": "STIN20160728000001", "value": "STIN20160728000001"},
                            "RH_LOGISTICS_HEADER_ID_LV": {"caption": "0", "value": "0"},
                            "RH_TOTAL_GROSS_WEIGHT_LV": {"caption": "0.00", "value": 0},
                            "Status_LV": {"caption": "", "value": "130"},
                            "RH_TOTAL_AMOUNT_LV": {"caption": "0.00", "value": 0},
                            "RH_TOTAL_CUBAGE_LV": {"caption": "0.00", "value": 0},
                            "CREATETIME_LV": {
                                "caption": "2016-07-28 00:00:00",
                                "value": "Thu Jul 28 00:00:00 CST 2016"
                            },
                            "DVERID_LV": {"caption": "0.00", "value": 0},
                            "RH_OWNER_ID_LV": {"caption": "IKEA 宜家家居", "value": 10003},
                            "RH_FLOW_HEADER_ID_LV": {"caption": "", "value": 0},
                            "RH_RECV_DATETIME_LV": {
                                "caption": "2016-07-28 17:14:05",
                                "value": "Thu Jul 28 17:14:05 CST 2016"
                            }
                        }],
                        "rowDblClick": "Open('Receipt', OID_LV)",
                        "columnInfo": [{
                            "columnType": 210,
                            "decScale": 2,
                            "visible": false,
                            "enable": true,
                            "width": "30",
                            "caption": "对象标识",
                            "tagName": "numbereditor",
                            "columnKey": "OID",
                            "decPrecision": 16,
                            "key": "OID_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": false,
                            "enable": true,
                            "width": "30",
                            "caption": "父对象标识",
                            "tagName": "numbereditor",
                            "columnKey": "POID",
                            "decPrecision": 16,
                            "key": "POID_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": false,
                            "enable": true,
                            "width": "30",
                            "caption": "对象版本",
                            "tagName": "numbereditor",
                            "columnKey": "POID",
                            "decPrecision": 16,
                            "key": "VERID_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": false,
                            "enable": true,
                            "width": "30",
                            "caption": "对象明细版本",
                            "tagName": "numbereditor",
                            "columnKey": "DVERID",
                            "decPrecision": 16,
                            "key": "DVERID_LV"
                        }, {
                            "columnType": 205,
                            "visible": true,
                            "enable": true,
                            "width": "100",
                            "caption": "单据日期",
                            "tagName": "datepicker",
                            "columnKey": "CREATETIME",
                            "key": "CREATETIME_LV"
                        }, {
                            "columnType": 204,
                            "visible": true,
                            "enable": true,
                            "width": "80",
                            "caption": "状态",
                            "tagName": "combobox",
                            "columnKey": "Status",
                            "items": [{"caption": "已输入", "value": "10"}, {
                                "caption": "已完成",
                                "value": "90"
                            }, {"caption": "已关闭", "value": "100"}],
                            "key": "Status_LV"
                        }, {
                            "columnType": 208,
                            "visible": true,
                            "clickContent": "Open('Receipt', OID_LV)",
                            "enable": true,
                            "width": "80",
                            "caption": "收货单号",
                            "targetType": 1,
                            "tagName": "hyperlink",
                            "columnKey": "RH_RECEIPT_NO",
                            "key": "RH_RECEIPT_NO_LV"
                        }, {
                            "columnType": 206,
                            "visible": true,
                            "enable": true,
                            "width": "120",
                            "caption": "货主",
                            "tagName": "dict",
                            "columnKey": "RH_OWNER_ID",
                            "key": "RH_OWNER_ID_LV",
                            "itemKey": "Owner"
                        }, {
                            "columnType": 215,
                            "visible": true,
                            "enable": true,
                            "width": "80",
                            "caption": "货主单号",
                            "tagName": "texteditor",
                            "columnKey": "RH_OWNER_NO",
                            "key": "RH_OWNER_NO_LV",
                            "maxLength": 255
                        }, {
                            "columnType": 215,
                            "visible": false,
                            "enable": true,
                            "width": "80",
                            "caption": "物流订单ID",
                            "tagName": "texteditor",
                            "columnKey": "RH_LOGISTICS_HEADER_ID",
                            "key": "RH_LOGISTICS_HEADER_ID_LV",
                            "maxLength": 255
                        }, {
                            "columnType": 208,
                            "visible": true,
                            "clickContent": "Open('LogisticsOrder', RH_LOGISTICS_HEADER_ID_LV)",
                            "enable": true,
                            "width": "80",
                            "caption": "物流订单号",
                            "targetType": 1,
                            "tagName": "hyperlink",
                            "columnKey": "RH_LOGISTICS_NO",
                            "key": "RH_LOGISTICS_NO_LV"
                        }, {
                            "columnType": 206,
                            "visible": true,
                            "enable": true,
                            "width": "120",
                            "caption": "事务类型",
                            "tagName": "dict",
                            "columnKey": "RH_TX_TYPE_ID",
                            "key": "RH_TX_TYPE_ID_LV",
                            "itemKey": "TransactionType"
                        }, {
                            "columnType": 206,
                            "visible": true,
                            "enable": true,
                            "width": "120",
                            "caption": "流程",
                            "tagName": "dict",
                            "columnKey": "RH_FLOW_HEADER_ID",
                            "key": "RH_FLOW_HEADER_ID_LV",
                            "itemKey": "Flow"
                        }, {
                            "columnType": 205,
                            "visible": true,
                            "enable": true,
                            "width": "100",
                            "caption": "收货日期时间",
                            "tagName": "datepicker",
                            "columnKey": "RH_RECV_DATETIME",
                            "key": "RH_RECV_DATETIME_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": true,
                            "enable": true,
                            "width": "70",
                            "caption": "总毛重",
                            "tagName": "numbereditor",
                            "columnKey": "RH_TOTAL_GROSS_WEIGHT",
                            "decPrecision": 16,
                            "key": "RH_TOTAL_GROSS_WEIGHT_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": true,
                            "enable": true,
                            "width": "70",
                            "caption": "总净重",
                            "tagName": "numbereditor",
                            "columnKey": "RH_TOTAL_NET_WEIGHT",
                            "decPrecision": 16,
                            "key": "RH_TOTAL_NET_WEIGHT_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": true,
                            "enable": true,
                            "width": "70",
                            "caption": "总体积",
                            "tagName": "numbereditor",
                            "columnKey": "RH_TOTAL_CUBAGE",
                            "decPrecision": 16,
                            "key": "RH_TOTAL_CUBAGE_LV"
                        }, {
                            "columnType": 210,
                            "decScale": 2,
                            "visible": true,
                            "enable": true,
                            "width": "70",
                            "caption": "总金额",
                            "tagName": "numbereditor",
                            "columnKey": "RH_TOTAL_AMOUNT",
                            "decPrecision": 16,
                            "key": "RH_TOTAL_AMOUNT_LV"
                        }],
                        "isPanel": false,
                        "totalRowCount": 0,
                        "type": 216,
                        "tagName": "listview",
                        "hasDblClick": true
                    }],
                    "height": "100%"
                }],
                "height": "100%"
            }, "key": "rootBlock"
        }]
    },
    "dataObjectKey": "ReceiptView",
    "abbrCaption": "收货单列表",
    "options": [],
    "defTbr": "main_toolbar",
    "initOperationState": 0,
    "key": "ReceiptView",
    "subDetailInfo": {},
    "paraGroups": {
        "WeightUnit": [{"caption": "吨", "value": "201", "key": "ton"}, {
            "caption": "千克",
            "value": "202",
            "key": "kilogram"
        }, {"caption": "克", "value": "203", "key": "gramme"}],
        "VolumeUnit": [{"caption": "立方米", "value": "301", "key": "stere"}, {
            "caption": "立方厘米",
            "value": "302",
            "key": "cubiccemtimeter"
        }, {"caption": "升", "value": "303", "key": "liter"}, {"caption": "毫升", "value": "304", "key": "milliliter"}],
        "MaterialUnit": [{"caption": "个", "value": "401", "key": "Peace"}],
        "LengthUnit": [{"caption": "千米", "value": "101", "key": "kilometre"}, {
            "caption": "米",
            "value": "102",
            "key": "metre"
        }, {"caption": "分米", "value": "103", "key": "decimetre"}, {
            "caption": "厘米",
            "value": "104",
            "key": "centimetre"
        }, {"caption": "毫米", "value": "105", "key": "millimetre"}]
    },
    "dependency": {
        "calcTree": {"affectItems": [], "items": []},
        "visibleTree": {
            "affectItems": [],
            "unVisibleKeys": [],
            "items": [{"left": "cancel", "source": "cancel", "right": "", "type": 0}, {
                "left": "RH_TX_TYPE_ID",
                "source": "RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {"left": "RH_OWNER_NO", "source": "RH_OWNER_NO", "right": "", "type": 0}, {
                "left": "Query",
                "source": "Query",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT",
                "source": "L_RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOGISTICS_NO",
                "source": "RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {"left": "RH_TOTAL_AMOUNT", "source": "RH_TOTAL_AMOUNT", "right": "", "type": 0}, {
                "left": "main",
                "source": "main",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_NO",
                "source": "L_RH_OWNER_NO",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_AMOUNT",
                "source": "L_RH_TOTAL_AMOUNT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_AMOUNT2",
                "source": "RH_TOTAL_AMOUNT2",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECEIPT_NO",
                "source": "RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATETIME",
                "source": "L_RH_RECV_DATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_ID",
                "source": "L_RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATETIME2",
                "source": "RH_RECV_DATETIME2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_AMOUNT2",
                "source": "L_RH_TOTAL_AMOUNT2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_CUBAGE",
                "source": "L_RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {"left": "L_Status", "source": "L_Status", "right": "", "type": 0}, {
                "left": "L_RH_TX_TYPE_ID",
                "source": "L_RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATETIME2",
                "source": "L_RH_RECV_DATETIME2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT2",
                "source": "L_RH_TOTAL_GROSS_WEIGHT2",
                "right": "",
                "type": 0
            }, {"left": "Status", "source": "Status", "right": "", "type": 0}, {
                "left": "RH_OWNER_ID",
                "source": "RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {"left": "query", "source": "query", "right": "", "type": 0}, {
                "left": "RH_TOTAL_GROSS_WEIGHT2",
                "source": "RH_TOTAL_GROSS_WEIGHT2",
                "right": "",
                "type": 0
            }, {"left": "list", "source": "list", "right": "", "type": 0}, {
                "left": "OID_LV",
                "source": "list",
                "right": "false",
                "type": 1
            }, {"left": "POID_LV", "source": "list", "right": "false", "type": 1}, {
                "left": "VERID_LV",
                "source": "list",
                "right": "false",
                "type": 1
            }, {"left": "DVERID_LV", "source": "list", "right": "false", "type": 1}, {
                "left": "CREATETIME_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {"left": "Status_LV", "source": "list", "right": "", "type": 1}, {
                "left": "RH_RECEIPT_NO_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {"left": "RH_OWNER_ID_LV", "source": "list", "right": "", "type": 1}, {
                "left": "RH_OWNER_NO_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {
                "left": "RH_LOGISTICS_HEADER_ID_LV",
                "source": "list",
                "right": "false",
                "type": 1
            }, {"left": "RH_LOGISTICS_NO_LV", "source": "list", "right": "", "type": 1}, {
                "left": "RH_TX_TYPE_ID_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {
                "left": "RH_FLOW_HEADER_ID_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {
                "left": "RH_RECV_DATETIME_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {
                "left": "RH_TOTAL_NET_WEIGHT_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {"left": "RH_TOTAL_CUBAGE_LV", "source": "list", "right": "", "type": 1}, {
                "left": "RH_TOTAL_AMOUNT_LV",
                "source": "list",
                "right": "",
                "type": 1
            }, {
                "left": "L_RH_RECEIPT_NO",
                "source": "L_RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_FLOW_HEADER_ID",
                "source": "RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }, {"left": "RH_VENDOR_ID", "source": "RH_VENDOR_ID", "right": "", "type": 0}, {
                "left": "RH_TOTAL_CUBAGE2",
                "source": "RH_TOTAL_CUBAGE2",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_NET_WEIGHT2",
                "source": "RH_TOTAL_NET_WEIGHT2",
                "right": "",
                "type": 0
            }, {"left": "L_RH_VENDOR_ID", "source": "L_RH_VENDOR_ID", "right": "", "type": 0}, {
                "left": "main_split",
                "source": "main_split",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_CUBAGE2",
                "source": "L_RH_TOTAL_CUBAGE2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT",
                "source": "L_RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "source": "RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATETIME",
                "source": "RH_RECV_DATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "source": "RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT2",
                "source": "L_RH_TOTAL_NET_WEIGHT2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_LOGISTICS_NO",
                "source": "L_RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {"left": "L_RH_FLOW_HEADER_ID", "source": "L_RH_FLOW_HEADER_ID", "right": "", "type": 0}]
        },
        "enableTree": {
            "affectItems": [],
            "items": [{
                "left": "cancel",
                "dependency": "",
                "source": "cancel",
                "right": "true",
                "type": 0
            }, {
                "left": "RH_TX_TYPE_ID",
                "dependency": "",
                "source": "RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_OWNER_NO",
                "dependency": "",
                "source": "RH_OWNER_NO",
                "right": "",
                "type": 0
            }, {
                "left": "Query",
                "dependency": "",
                "source": "Query",
                "right": "true",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT",
                "dependency": "",
                "source": "L_RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_LOGISTICS_NO",
                "dependency": "",
                "source": "RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_AMOUNT",
                "dependency": "",
                "source": "RH_TOTAL_AMOUNT",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_NO",
                "dependency": "",
                "source": "L_RH_OWNER_NO",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_AMOUNT",
                "dependency": "",
                "source": "L_RH_TOTAL_AMOUNT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_AMOUNT2",
                "dependency": "",
                "source": "RH_TOTAL_AMOUNT2",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "dependency": "",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECEIPT_NO",
                "dependency": "",
                "source": "RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATETIME",
                "dependency": "",
                "source": "L_RH_RECV_DATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_OWNER_ID",
                "dependency": "",
                "source": "L_RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATETIME2",
                "dependency": "",
                "source": "RH_RECV_DATETIME2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_AMOUNT2",
                "dependency": "",
                "source": "L_RH_TOTAL_AMOUNT2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_CUBAGE",
                "dependency": "",
                "source": "L_RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {
                "left": "L_Status",
                "dependency": "",
                "source": "L_Status",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TX_TYPE_ID",
                "dependency": "",
                "source": "L_RH_TX_TYPE_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_RECV_DATETIME2",
                "dependency": "",
                "source": "L_RH_RECV_DATETIME2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT2",
                "dependency": "",
                "source": "L_RH_TOTAL_GROSS_WEIGHT2",
                "right": "",
                "type": 0
            }, {"left": "Status", "dependency": "", "source": "Status", "right": "", "type": 0}, {
                "left": "RH_OWNER_ID",
                "dependency": "",
                "source": "RH_OWNER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT2",
                "dependency": "",
                "source": "RH_TOTAL_GROSS_WEIGHT2",
                "right": "",
                "type": 0
            }, {"left": "list", "dependency": "", "source": "list", "right": "", "type": 0}, {
                "source": "list",
                "type": 1,
                "items": [{
                    "left": "OID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {"left": "POID_LV", "dependency": "", "source": "list", "right": "", "type": 2}, {
                    "left": "VERID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "DVERID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "CREATETIME_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "Status_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_RECEIPT_NO_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_OWNER_ID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_OWNER_NO_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_LOGISTICS_HEADER_ID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_LOGISTICS_NO_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_TX_TYPE_ID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_FLOW_HEADER_ID_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_RECV_DATETIME_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_TOTAL_GROSS_WEIGHT_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_TOTAL_NET_WEIGHT_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {
                    "left": "RH_TOTAL_CUBAGE_LV",
                    "dependency": "",
                    "source": "list",
                    "right": "",
                    "type": 2
                }, {"left": "RH_TOTAL_AMOUNT_LV", "dependency": "", "source": "list", "right": "", "type": 2}]
            }, {
                "left": "L_RH_RECEIPT_NO",
                "dependency": "",
                "source": "L_RH_RECEIPT_NO",
                "right": "",
                "type": 0
            }, {
                "left": "RH_FLOW_HEADER_ID",
                "dependency": "",
                "source": "RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_VENDOR_ID",
                "dependency": "",
                "source": "RH_VENDOR_ID",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_CUBAGE2",
                "dependency": "",
                "source": "RH_TOTAL_CUBAGE2",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_NET_WEIGHT2",
                "dependency": "",
                "source": "RH_TOTAL_NET_WEIGHT2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_VENDOR_ID",
                "dependency": "",
                "source": "L_RH_VENDOR_ID",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_CUBAGE2",
                "dependency": "",
                "source": "L_RH_TOTAL_CUBAGE2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT",
                "dependency": "",
                "source": "L_RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "dependency": "",
                "source": "RH_TOTAL_NET_WEIGHT",
                "right": "",
                "type": 0
            }, {
                "left": "RH_RECV_DATETIME",
                "dependency": "",
                "source": "RH_RECV_DATETIME",
                "right": "",
                "type": 0
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "dependency": "",
                "source": "RH_TOTAL_CUBAGE",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT2",
                "dependency": "",
                "source": "L_RH_TOTAL_NET_WEIGHT2",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_LOGISTICS_NO",
                "dependency": "",
                "source": "L_RH_LOGISTICS_NO",
                "right": "",
                "type": 0
            }, {
                "left": "L_RH_FLOW_HEADER_ID",
                "dependency": "",
                "source": "L_RH_FLOW_HEADER_ID",
                "right": "",
                "type": 0
            }]
        },
        "checkRuleTree": {
            "affectItems": [],
            "items": [{
                "left": "RH_TX_TYPE_ID",
                "source": "RH_TX_TYPE_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_OWNER_NO",
                "source": "RH_OWNER_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT",
                "source": "L_RH_TOTAL_GROSS_WEIGHT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_LOGISTICS_NO",
                "source": "RH_LOGISTICS_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_AMOUNT",
                "source": "RH_TOTAL_AMOUNT",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_OWNER_NO",
                "source": "L_RH_OWNER_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_AMOUNT",
                "source": "L_RH_TOTAL_AMOUNT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_AMOUNT2",
                "source": "RH_TOTAL_AMOUNT2",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT",
                "source": "RH_TOTAL_GROSS_WEIGHT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_RECEIPT_NO",
                "source": "RH_RECEIPT_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_RECV_DATETIME",
                "source": "L_RH_RECV_DATETIME",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_OWNER_ID",
                "source": "L_RH_OWNER_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_RECV_DATETIME2",
                "source": "RH_RECV_DATETIME2",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_AMOUNT2",
                "source": "L_RH_TOTAL_AMOUNT2",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_CUBAGE",
                "source": "L_RH_TOTAL_CUBAGE",
                "type": 0,
                "content": ""
            }, {"left": "L_Status", "source": "L_Status", "type": 0, "content": ""}, {
                "left": "L_RH_TX_TYPE_ID",
                "source": "L_RH_TX_TYPE_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_RECV_DATETIME2",
                "source": "L_RH_RECV_DATETIME2",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_GROSS_WEIGHT2",
                "source": "L_RH_TOTAL_GROSS_WEIGHT2",
                "type": 0,
                "content": ""
            }, {"left": "Status", "source": "Status", "type": 0, "content": ""}, {
                "left": "RH_OWNER_ID",
                "source": "RH_OWNER_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_GROSS_WEIGHT2",
                "source": "RH_TOTAL_GROSS_WEIGHT2",
                "type": 0,
                "content": ""
            }, {"left": "list", "source": "list", "type": 0, "content": ""}, {
                "left": "L_RH_RECEIPT_NO",
                "source": "L_RH_RECEIPT_NO",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_FLOW_HEADER_ID",
                "source": "RH_FLOW_HEADER_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_VENDOR_ID",
                "source": "RH_VENDOR_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_CUBAGE2",
                "source": "RH_TOTAL_CUBAGE2",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_NET_WEIGHT2",
                "source": "RH_TOTAL_NET_WEIGHT2",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_VENDOR_ID",
                "source": "L_RH_VENDOR_ID",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_CUBAGE2",
                "source": "L_RH_TOTAL_CUBAGE2",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT",
                "source": "L_RH_TOTAL_NET_WEIGHT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_NET_WEIGHT",
                "source": "RH_TOTAL_NET_WEIGHT",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_RECV_DATETIME",
                "source": "RH_RECV_DATETIME",
                "type": 0,
                "content": ""
            }, {
                "left": "RH_TOTAL_CUBAGE",
                "source": "RH_TOTAL_CUBAGE",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_TOTAL_NET_WEIGHT2",
                "source": "L_RH_TOTAL_NET_WEIGHT2",
                "type": 0,
                "content": ""
            }, {
                "left": "L_RH_LOGISTICS_NO",
                "source": "L_RH_LOGISTICS_NO",
                "type": 0,
                "content": ""
            }, {"left": "L_RH_FLOW_HEADER_ID", "source": "L_RH_FLOW_HEADER_ID", "type": 0, "content": ""}]
        }
    },
    "paraCollection": [],
    "standalone": false,
    "mapGrids": {},
    "target": 0,
    "hostUIStatusProxy": false,
    "filterMap": {
        "filterMap": [{
            "tableKey": "ReceiptHead",
            "maxRows": 0,
            "SourceKey": "",
            "startRow": 0,
            "OID": -1,
            "INDICATORCOUNT": 1,
            "fieldValues": {}
        }], "OID": -1, "needDocInfo": true, "type": 1
    },
    "refTableKey": "",
    "relations": {},
    "parameters": {}
}]
