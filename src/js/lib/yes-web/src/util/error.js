/*
 * @Author: gmf
 * @Date:   2016-07-22 09:56:15
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-07-22 09:56:59
 */

import alert from "./alert";
import AppDispatcher from "../../yes/dispatchers/AppDispatcher";
export default function (err) {
    if (typeof(err) == 'string') {
        alert(err);
    }
    AppDispatcher.dispatch(Error(err));
}
