import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';

const Slider = YIUI.extend(BaseControl, {
});
YIUI.reg('slider', Slider);
regControlType(YIUI.CONTROLTYPE.SLIDER, 'slider');
export default Slider;