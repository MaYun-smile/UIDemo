import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import BaseControl from './control';
import '../../YIUI-common';
import '../../YIUI-parser';

const Icon = YIUI.extend(BaseControl, {
    calculateDisplayValue: async function (v) {
        const icon = this.getMetaObj().icon;
        if (icon) {
            return await YIUI.Base64ImageService.getBase64Image(icon, this.ofFormID);
        }
    }
});
YIUI.reg('icon', Icon);
YIUI.reg('imagebutton', Icon);
regControlType(YIUI.CONTROLTYPE.ICON, 'icon');
regControlType(YIUI.CONTROLTYPE.IMAGEBUTTON, 'icon');
export default Icon;
