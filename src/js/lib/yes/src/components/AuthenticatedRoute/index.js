/*
 * @Author: gmf
 * @Date:   2016-05-13 16:20:08
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-05-13 16:27:11
 */

import { isWeixin } from "../Env";
// import WechatAuthRoute from "../wechat/WechatAuthRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
var result = AuthenticatedRoute;
// if (isWeixin()) {
//     result = WechatAuthRoute;
// }
export default result;
