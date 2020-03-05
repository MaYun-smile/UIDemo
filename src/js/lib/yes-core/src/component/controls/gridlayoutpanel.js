import { lodash as _ } from 'yes-common';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
import Panel from './panel';

YIUI.GridLayoutPanel = YIUI.extend(Panel, {
    init : function(options) {
        this.base(options);
        this.metaObj.rowGap = this.rowGap;
        this.metaObj.columnGap = this.columnGap;
    }
})

YIUI.reg('gridlayoutpanel', YIUI.GridLayoutPanel);

regControlType(YIUI.CONTROLTYPE.GRIDLAYOUTPANEL, 'gridlayoutpanel');

export default YIUI.GridLayoutPanel