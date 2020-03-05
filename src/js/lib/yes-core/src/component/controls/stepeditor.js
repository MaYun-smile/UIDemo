/*
 * @Author: gmf
 * @Date:   2016-05-03 11:17:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-05-03 11:20:02
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
const StepEditor = YIUI.extend(BaseControl, {
    init(options) {
        this.base(options);
        this.getMetaObj().step = Number(this.getMetaObj().step);
    },
    getText() {
        return this.value;
    },
});
YIUI.reg('stepeditor', StepEditor);
regControlType(YIUI.CONTROLTYPE.STEPEDITOR, 'stepeditor');
export default StepEditor;
