import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';

const ProgressIndicator = YIUI.extend(BaseControl, {
    async calculateDisplayValue(v) {
        const { defaultIcon, completedIcon, attentionIcon } = this.getMetaObj();
        if (defaultIcon) {
            this.getMetaObj().defaultIcon = await YIUI.Base64ImageService.getBase64Image(defaultIcon, this.ofFormID);
        }
        if (completedIcon) {
            this.getMetaObj().completedIcon = await YIUI.Base64ImageService.getBase64Image(completedIcon, this.ofFormID);
        }
        if (attentionIcon) {
            this.getMetaObj().attentionIcon = await YIUI.Base64ImageService.getBase64Image(attentionIcon, this.ofFormID);
        }
        return v
    },
    setDataModel({ title, message, dateTime }) {
        this.getMetaObj().title = title
        this.getMetaObj().message = message
        this.getMetaObj().dateTime = dateTime
    }
});
YIUI.reg('progressindicator', ProgressIndicator);
regControlType(YIUI.CONTROLTYPE.PROGRESSINDICATOR, 'progressindicator');
export default ProgressIndicator;