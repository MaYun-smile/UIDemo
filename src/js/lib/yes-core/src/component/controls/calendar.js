import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';

const Calendar = YIUI.extend(BaseControl, {
});
YIUI.reg('calendar', Calendar);
regControlType(YIUI.CONTROLTYPE.CALENDAR, 'calendar');
export default Calendar;