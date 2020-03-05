import { YIUI } from './YIUI-base';
import './YIUI-common';
import './YIUI-parser';
import './YIUI-svr';
let formID = 1;
YIUI.allotId = function () {
    return formID++;
};
export default YIUI.allotId;

