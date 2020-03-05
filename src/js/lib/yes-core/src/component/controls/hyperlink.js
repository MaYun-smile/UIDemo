/*
 * @Author: gmf
 * @Date:   2016-06-20 16:25:51
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-20 16:28:15
 */

import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
const Hyperlink = YIUI.extend(BaseControl, {
    // handler: YIUI.ButtonHandler,
});
YIUI.reg('hyperlink', Hyperlink);
regControlType(YIUI.CONTROLTYPE.HYPERLINK, 'hyperlink');
export default Hyperlink;
