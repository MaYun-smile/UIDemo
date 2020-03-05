/*
 * @Author: gmf
 * @Date:   2016-05-03 12:14:50
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 15:43:05
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import Svr from '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
const Label = YIUI.extend(BaseControl, {
    calculateDisplayValue: async function (v) {
        let icon = this.getMetaObj().icon;
        if (icon) {
            this.getMetaObj().icon = await YIUI.Base64ImageService.getBase64Image(icon, this.ofFormID);
        }
        this.text = v || this.caption;
        return this.text;
    }
});
YIUI.reg('label', Label);
regControlType(YIUI.CONTROLTYPE.LABEL, 'label');
export default Label;
