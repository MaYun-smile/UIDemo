import { YIUI } from './YIUI-base';
import { HashMap } from './YIUI-common';
import { View } from './YIUI-parser';
import './YIUI-svr';
import './formIdGenerator';
import './yes-ui';
import './utils/totalrowcountutil';
import './utils/gridutil';
import './statusproxy';
import './utils/rowgroup';
// (function () {
export const ShowData = YIUI.ShowData = function (form) {
    var Return = {
        prepare: function () {
            // 1.重置文档状态，主要是将每个表的游标移到第一行
            var document = form.getDocument();
            if (document == null) {
                return;
            }
            var table = null;
            for (var i = 0, len = document.tbls.length; i < len; i++) {
                table = document.tbls[i];
                table.first();
            }
            // 2.处理流程关联表单的权限代理类
            // var workitemInfo = form.getDocument().getExpData(YIUI.BPMConstants.WORKITEM_INFO);
            // if (workitemInfo != null) {
            //     form.setBPMStatusProxy(new YIUI.BPMStatusProxy(workitemInfo));
            // }
        },
        loadHeader: async function (cmp) {
            var document = form.getDocument();
            if (!document) return;
            var tableKey = cmp.tableKey;
            var table = tableKey && document.getByKey(tableKey);
            if (!table) {
                return;
            }
            var columnKey = cmp.columnKey, value = "";
            if (table.getRowCount() > 0) {
                value = table.getByKey(columnKey);
                if (cmp.type == YIUI.CONTROLTYPE.DYNAMICDICT) {
                    var itemKey = table.getByKey(columnKey + "ItemKey");
                    cmp.itemKey = itemKey;
                }
            }
            await cmp.setValue(value, false, false);
        },
        loadListView: function (listView) {
            var showLV = new YIUI.ShowListView(form, listView);
            showLV.load();
        },
        loadGrid: async function (grid) {
            YIUI.SubDetailUtil.clearSubDetailData(form, grid);
            var showGrid = new YIUI.ShowGridData(form, grid);
            // grid.loadData();
            await showGrid.load();
            // grid.refreshGrid();
        },
        loadChart: function (chart) {
            var document = form.getDocument();
            var metaChart = chart.getMetaObj();
            var dataJSON = {};
            var dataSource = metaChart.dataSource;
            var sourceType = metaChart.sourceType;
            var categoryKey = new HashMap();
            if (dataSource != null) {
                // 来源于数据对象
                if ("DataObject".toLowerCase() === sourceType.toLowerCase()) {
                    var table = document.getByKey(dataSource.bindingKey);
                    // 计算项目列表
                    var metaCategory = dataSource.category;
                    table.beforeFirst();
                    var index = 0;
                    var categoryCount = 0;
                    var categories = [];
                    while (table.next()) {
                        var o = table.getByKey(metaCategory.dataKey);
                        var value = YIUI.TypeConvertor.toString(o);
                        if (!categoryKey.containsKey(value)) {
                            categories.push(value);
                            categoryKey.put(value, index);
                            ++index;
                            ++categoryCount;
                        }
                    }
                    dataJSON.categories = categories;
                    var metaSeriesArray = dataSource.series;
                    var series = [];
                    var metaSeries = null;
                    metaSeriesArray.forEach(function (metaSeries) {
                        var splitDataKey = metaSeries.splitDataKey;
                        var splitSeries = splitDataKey;
                        if (splitSeries) {
                            var seriesMap = new HashMap();
                            table.beforeFirst();
                            var jsonObj = null;
                            while (table.next()) {
                                jsonObj = {};
                                var splitData = table.getByKey(splitDataKey);
                                var o = table.getByKey(metaSeries.dataKey);
                                var value = YIUI.TypeConvertor.toInt(o);
                                var seriesData = seriesMap.get(splitData);
                                if (seriesData == null) {
                                    seriesData = {};
                                    var data = [];
                                    for (var i = 0; i < categoryCount; ++i) {
                                        data.push(parseInt(0));
                                    }
                                    jsonObj.data = data;
                                    jsonObj.name = splitData.toString();
                                    seriesMap.put(splitData, jsonObj);
                                    series.push(jsonObj);
                                } else {
                                    jsonObj.data = data;
                                    jsonObj.name = splitData.toString();
                                }
                                o = table.getByKey(metaCategory.dataKey);
                                var c_value = YIUI.TypeConvertor.toString(o);
                                var c_index = categoryKey.get(c_value);
                                if (c_index != null) {
                                    var data = jsonObj["data"];
                                    data[c_index] = value;
                                }
                            }
                        } else {
                            table.beforeFirst();
                            var jsonObj = { "name": metaSeries.title };
                            var data = [];
                            while (table.next()) {
                                var o = table.getByKey(metaSeries.dataKey);
                                var value = YIUI.TypeConvertor.toInt(o);
                                data.push(value);
                            }
                            jsonObj.data = data;
                            series.push(jsonObj);
                        }
                    });
                    dataJSON.series = series;
                }
            }
            chart.setDataModel(dataJSON);
        },
        loadBPMGraph: function (graph) {
            var meta = graph.getMetaObj();
            var processKey = "";
            var processVer = -1;
            var path = null;
            var keyFormula = meta.processKey;
            var verFormula = meta.processVer;
            var pathFormula = meta.processPath;
            var cxt = { form: form };
            if (keyFormula != null && !keyFormula.isEmpty()) {
                processKey = form.eval(keyFormula, cxt);
            }
            if (verFormula != null && !verFormula.isEmpty()) {
                processVer = form.eval(verFormula, cxt);
            }
            if (pathFormula != null && !pathFormula.isEmpty()) {
                path = form.eval(pathFormula, cxt);
            }

            var data = {
                cmd: "DownloadProcessGraph",
                service: "BPMDefService",
                processKey: processKey,
                processVer: processVer
            };
            var transGraph = Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, data);
            if (transGraph != null) {
                graph.transPath = path;
                graph.swims = transGraph.swims;
                var nodes = transGraph.nodes;
                var transitions = [];
                for (var j = 0, len = nodes.length; j < len; j++) {
                    var node = nodes[j];
                    var n_transitions = node.transitions;
                    if (n_transitions) {
                        for (var i = 0, size = n_transitions.length; i < size; ++i) {
                            var n_transition = n_transitions[i];
                            var transition = {
                                "lineStyle": n_transition["line-style"],
                                "source": node["key"],
                                "tagName": n_transition["tag-name"],
                                "target": n_transition["target-node-key"]
                            };
                            transitions.push(transition);
                        }
                    }
                    delete node.transitions;
                }
                graph.nodes = nodes;
                graph.transitions = transitions;
                graph.refreshGraph();
            }
        },
        /**
         * 进度指示器的数据处理
         */
        loadProgressIndictor: function (progressIndictor) {
            var document = form.getDocument();
            if (!document) { return }
            var metaProgressIndictor = progressIndictor.getMetaObj();
            var sourceType = metaProgressIndictor.sourceType;
            var tableKey = metaProgressIndictor.tableKey;
            var titleColumnKey = metaProgressIndictor.titleColumnKey;
            var messageColumnKey = metaProgressIndictor.messageColumnKey;
            var dateTimeColumnKey = metaProgressIndictor.dateTimeColumnKey
            if ("Data" === sourceType) {
                var table = document.getByKey(tableKey);
                var title = [];
                var message = [];
                var dateTime = [];
                if (table.pos != -1) { table.pos = -1 } // 这里不是正确的做法，还需要完善
                while (table.next()) {
                    title.push(table.getByKey(titleColumnKey));
                    message.push(table.getByKey(messageColumnKey));
                    dateTime.push(table.getByKey(dateTimeColumnKey));
                }
            }
            progressIndictor.setDataModel({ title, message, dateTime })
        },

        /**
         * 默认不提交值,下推后提交值
         * @param commitValue 是否提交值
         * @returns {boolean}
         */
        show: async function (commitValue) {
            form.setShowing(true);
            console.time('prepare');
            this.prepare();
            console.timeEnd('prepare');
            console.time('load data');
            var cmpList = form.getComponentList(), cmp;
            for (var i in cmpList) {
                cmp = cmpList[i];
                if (cmp.isSubDetail) continue;
                switch (cmp.type) {
                    case YIUI.CONTROLTYPE.LISTVIEW:
                        this.loadListView(cmp);
                        break;
                    case YIUI.CONTROLTYPE.GRID:
                        cmp.rootGroupBkmk = null;
                        await this.loadGrid(cmp);
                        break;
                    case YIUI.CONTROLTYPE.CHART:
                        this.loadChart(cmp);
                        break;
                    case YIUI.CONTROLTYPE.BPM_GRAPH:
                        this.loadBPMGraph(cmp);
                        break;
                    case YIUI.CONTROLTYPE.PROGRESSINDICATOR:
                        this.loadProgressIndictor(cmp);
                        break;
                    default:
                        if (cmp.hasDataBinding()) {
                            // if (cmp.needClean()) {
                            //     cmp.setValue(null);
                            // }
                            this.loadHeader(cmp);
                        }
                        break;
                }
            }
            console.timeEnd('load data');
            await this.postShowData(commitValue);
            form.setShowing(false);
            return true;
        },
        postShowData: async function (commitValue) {
            await form.getUIProcess().doPostShowData(commitValue);
            console.log('postShowData over');
            console.time('addoperation');
            await form.getUIProcess().addOperation();
            console.log('toolbar over');
            console.timeEnd('addoperation');
        }
    };
    return Return;
};
export const ShowListView = YIUI.ShowListView = function (form, listView) {
    var Return = {
        load: function () {
            listView.clearAllRows();
            var document = form.getDocument();
            if (!document) {
                return;
            }
            var tableKey = listView.tableKey;
            if (!tableKey) return;
            var table = document.getByKey(tableKey);
            listView.totalRowCount = YIUI.TotalRowCountUtil.getRowCount(document, tableKey);
            var cxt = new View.Context(form), backColor, rowList = [];
            for (var j = 0, length = table.getRowCount(); j < length; j++) {
                const row = {};
                // listView.data.push(row);
                table.setPos(j);
                // var bkmkRow = new YIUI.DetailRowBkmk();
                // bkmkRow.setBookmark(table.getBkmk());
                row.bkmkRow = table.getBkmk();
                for (var m = 0, size = listView.columnInfo.length; m < size; m++) {
                    var column = listView.columnInfo[m];
                    var columnKey = column.columnKey;
                    var value = null;
                    if (columnKey) {
                        value = table.getByKey(columnKey);
                    } else {
                        if (column.type == YIUI.CONTROLTYPE.HYPERLINK ||
                            column.type == YIUI.CONTROLTYPE.BUTTON ||
                            column.type == YIUI.CONTROLTYPE.LABEL) {
                            value = column.caption;
                        } else if (column.type == YIUI.CONTROLTYPE.HYPERLINK) {
                            value = false;
                        }
                    }
                    // listView.setValueAt(j, m, value);
                    row[columnKey] = value;
                }
                rowList.push(row);
            }
            listView.resetData(rowList);
            //TODO::
            // if (listView._pagination) {
            //     if (!listView.pageRowCount || listView.totalRowCount < listView.pageRowCount) {
            //         listView._pagination.hidePagination();
            //     } else if (listView.totalRowCount) {
            //         var reset = true;
            //         if (listView.curPageIndex > 1) {
            //             reset = false;
            //         }
            //         listView._pagination.setTotalRowCount(listView.totalRowCount, reset);
            //         listView.curPageIndex = -1;
            //     }
            // }
            // listView.repaint();
            // listView.refreshSelectEnable();
        }
    };
    return Return;
};
// })();