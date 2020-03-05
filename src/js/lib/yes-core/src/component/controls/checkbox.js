/*
 * @Author: gmf
 * @Date:   2016-06-23 09:45:37
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-23 11:03:14
 */

import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
const Checkbox = YIUI.extend(BaseControl, {

    async calculateDisplayValue(v) {
        const { icon, selectedIcon } = this.getMetaObj();
        if (icon) {
            this.getMetaObj().icon = await YIUI.Base64ImageService.getBase64Image(icon, this.ofFormID);
        }
        if (selectedIcon) {
            this.getMetaObj().selectedIcon = await YIUI.Base64ImageService.getBase64Image(selectedIcon, this.ofFormID);
        }
        return !!v;
    },
    setInnerValue(v) {
        let newV = v;
        if (typeof v === 'string') {
            newV = (v.toLowerCase() === 'true');
        }
        const state = this.state.set('value', newV);
        this.changeState(state);
    }
});
YIUI.reg('checkbox', Checkbox);
YIUI.reg('switch', Checkbox);
regControlType(YIUI.CONTROLTYPE.CHECKBOX, 'checkbox');
regControlType(YIUI.CONTROLTYPE.SWITCH, 'switch');
export default Checkbox;
