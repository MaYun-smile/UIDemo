import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import Svr from '../../YIUI-svr';

const CountDownView = YIUI.extend(BaseControl, {
    init(options) {
        this.base(options);
        this.state = this.state.set('resume', true);
    },
    resetState(resumeState) {
        let state = this.state.set('resume', resumeState);
        this.changeState(state);
    }
});
YIUI.reg('countdownview', CountDownView);
regControlType(YIUI.CONTROLTYPE.COUNTDOWNVIEW, 'countdownview');
export default CountDownView;