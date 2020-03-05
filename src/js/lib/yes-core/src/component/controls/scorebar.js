import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';

const ScoreBar = YIUI.extend(BaseControl, {
    async calculateDisplayValue(v) {
        const { icon, selectIcon } = this.getMetaObj();
        if (icon) {
            this.getMetaObj().icon = await YIUI.Base64ImageService.getBase64Image(icon, this.ofFormID);
        }
        if (selectIcon) {
            this.getMetaObj().selectIcon = await YIUI.Base64ImageService.getBase64Image(selectIcon, this.ofFormID);
        }
        return v;
    }
});
YIUI.reg('scorebar', ScoreBar);
regControlType(YIUI.CONTROLTYPE.SCOREBAR, 'scorebar');
export default ScoreBar;