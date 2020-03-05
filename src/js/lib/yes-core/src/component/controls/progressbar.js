import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
const ProgressBar = YIUI.extend(BaseControl, {
});
YIUI.reg('progressbar', ProgressBar);
regControlType(YIUI.CONTROLTYPE.PROGRESSBAR, 'progressbar');
export default ProgressBar;
