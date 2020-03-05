/*
 * @Author: zjy
 * @Date:   2016-06-23 09:32:55
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-07-26 15:08:11
 */

import React, {Component} from "react";
import AppDispatcher from "../../../yes/dispatchers/AppDispatcher";
import {OpenDrawer} from "../../../yes/actions/AppStatusAction";
export default (BaseComponent) => {
    class OpenDrawerWrap extends Component {
        handleOpen() {
            AppDispatcher.dispatch(OpenDrawer(true));
        }

        render() {
            return (<BaseComponent onTouchTap={(e) => this.handleOpen()} {...this.props}>
            </BaseComponent>);
        }
    }
    return OpenDrawerWrap;
};
/*
 可以使用该组件包装其他组件，使其可以点击打开drawer菜单,使用如下
 (需要在WebComponents中引用MaterialUI)
 var OpenDrawerBtn = MaterialUI.OpenDrawerWrap(IconButton);
 <OpenDrawerBtn></OpenDrawerBtn>
 */
