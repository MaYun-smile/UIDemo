import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import { regControlType } from './controlUtil';
import '../../YIUI-svr';
import '../../YIUI-common';
import '../../YIUI-parser';

const TabContainer = YIUI.extend(BaseControl, {
    async init(options) {
        this.base(options);
        let tabGroup = this.tabGroup;
        if (tabGroup) {
            let tabGroupItems = tabGroup.metaObj.items;
            if (tabGroupItems) {
                this.getMetaObj().tabGroupItems = tabGroupItems
            }
        }
    },
    async calculateDisplayValue(v, cxt) {
        var form = YIUI.FormStack.getForm(this.ofFormID);
        let defaultFormKey = this.getMetaObj().defaultFormKey;
        let formulaFormKey = this.formulaFormKey;
        if (defaultFormKey) {
            this.getMetaObj().defaultFormKey = defaultFormKey;
        }
        if (formulaFormKey) {
            this.getMetaObj().defaultFormKey = await form.eval(formulaFormKey, cxt, null);
        }
        return v
    },
});
YIUI.reg('tabcontainer', TabContainer);
regControlType(YIUI.CONTROLTYPE.CONTAINER, 'tabcontainer');
export default TabContainer;
