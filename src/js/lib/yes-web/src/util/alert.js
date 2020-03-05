/*
 * @Author: gmf
 * @Date:   2016-07-22 09:53:34
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-07-22 09:57:03
 */

import React from "react";
import ReactDOM from "react-dom";
import {Dialog, Button} from "react-weui";
import {Error} from "../../yes/actions/AppStatusAction";
const {Alert} = Dialog;
export default function (error) {
    var buttons = [
        {
            label: '确认',
            onClick() {
                ReactDOM.render(<Alert show={false} title="错误">{error}</Alert>, document.getElementById('modal'));
            },
        },
    ];
    ReactDOM.render(<Alert show title="错误" buttons={buttons}>{error}</Alert>, document.getElementById('modal'));
}
