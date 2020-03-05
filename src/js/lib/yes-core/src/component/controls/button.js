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
const Button = YIUI.extend(BaseControl, {
    async calculateDisplayValue(v) {
        const icon = this.getMetaObj().icon;
        if (icon) {
            this.getMetaObj().icon = await YIUI.Base64ImageService.getBase64Image(icon, this.ofFormID);
        }
        return v || this.caption;
    }
    // handler: YIUI.ButtonHandler,
});
YIUI.reg('button', Button);
YIUI.reg('textbutton', Button);
regControlType(YIUI.CONTROLTYPE.BUTTON, 'button');
regControlType(YIUI.CONTROLTYPE.TEXTBUTTON, 'textbutton');
export default Button;
