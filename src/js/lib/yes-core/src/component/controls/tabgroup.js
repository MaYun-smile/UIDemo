import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';

const TabGroup = YIUI.extend(BaseControl, {
    async calculateDisplayValue(v) {
        for (let i = 0; i < this.metaObj.items.length; i++) {
            let icon = this.metaObj.items[i].icon
            let selectedIcon = this.metaObj.items[i].selectedIcon
            if (icon) {
                this.metaObj.items[i].icon = await YIUI.Base64ImageService.getBase64Image(this.metaObj.items[i].icon, this.ofFormID);
            }
            if (selectedIcon) {
                this.metaObj.items[i].selectedIcon = await YIUI.Base64ImageService.getBase64Image(this.metaObj.items[i].selectedIcon, this.ofFormID);
            };
        }
    },
    //增加: TabIndex的值
    getTabIndex() {
        return this.state.get("value")
    }
});
YIUI.reg('tabgroup', TabGroup);
regControlType(YIUI.CONTROLTYPE.TABGROUP, 'tabgroup');
export default TabGroup;