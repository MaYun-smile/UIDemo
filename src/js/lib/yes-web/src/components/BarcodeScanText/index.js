/*
 * @Author: gmf
 * @Date:   2016-05-13 11:23:17
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-05-13 12:00:04
 */

import {isCordova, isWeixin} from "yes/dist/components/Env";
import WechatBarCodeText from "yes/dist/components/wechat/WechatBarCodeText";
import YESText from "../Text";
var result = YESText;
if (isWeixin() || isCordova()) {
    result = WechatBarCodeText;
}
export default result;
