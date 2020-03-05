/*
 * @Author: gmf
 * @Date:   2016-06-20 16:34:17
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-22 14:57:54
 */

import React, {Component} from "react";
import {browserHistory} from "react-router";
export default (BaseComponent) => {
    class HistoryBack extends Component {
        onClick() {
            browserHistory.goBack();
        }

        render() {
            return (<BaseComponent onTouchTap={() => this.onClick()} {...this.props}>
            </BaseComponent>);
        }
    }
    return HistoryBack;
};
