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
const WebBrowser = YIUI.extend(BaseControl, {
    // handler: YIUI.ButtonHandler,
});
YIUI.reg('webbrowser', WebBrowser);
regControlType(YIUI.CONTROLTYPE.WEBBROWSER, 'webbrowser');
export default WebBrowser;
