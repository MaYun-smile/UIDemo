/*
 * @Author: gmf
 * @Date:   2016-03-18 10:50:14
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-20 13:52:06
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';
import '../../YIUI-common';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
import Immutable from 'immutable';
const Chart = YIUI.extend(BaseControl, {
    init(options) {
        this.base(options);
        const chartType = this.getMetaObj().chartType;
        if (typeof chartType == "undefined") {
            this.getMetaObj().chartType = YIUI.Chart_Type.toString(8)
        }
        if (typeof chartType == "number") {
            this.getMetaObj().chartType = YIUI.Chart_Type.toString(chartType);
        }
    },
    setDataModel(data) {
        this.getMetaObj().items = data;
    },
});
YIUI.reg('chart', Chart);
regControlType(YIUI.CONTROLTYPE.CHART, 'chart');
export default Chart;
