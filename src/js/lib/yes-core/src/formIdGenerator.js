import { YIUI } from './YIUI-base';
import './YIUI-common';
import './YIUI-parser';
import './YIUI-svr';
let formID = 1;
YIUI.Form_allocFormID = function () {
    return formID++;
};
export default YIUI.Form_allocFormID;
