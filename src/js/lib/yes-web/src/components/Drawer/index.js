/*
 * @Author: zjy
 * @Date:   2016-06-21 11:15:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-20 15:16:26
 */

import React, {Component} from "react";
import HashHistory from "../../history";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppDispatcher from "../../../yes/dispatchers/AppDispatcher";
import AppStatus from "../../../yes/stores/AppStatus";
import {OpenDrawer} from "../../../yes/actions/AppStatusAction";
import {Container} from "flux/utils";
class DrawerView extends Component {
    static getStores() {
        return [AppStatus];
    }

    static calculateState(prevState, props) {
        return {
            state: AppStatus.getState(),
        };
    }

    onItemClick(to) {
        this.handleClose(false);
        HashHistory.push(`${to}`);
    }

    handleClose() {
        AppDispatcher.dispatch(OpenDrawer(false));
    }

    render() {
        var state = this.state.state;
        var {className, children, ...others} = this.props,
            disableSwipeToOpen = !this.props.disableSwipeToOpen ? this.props.disableSwipeToOpen : true,
            width = this.props.width ? this.props.width : 200;
        var MenuItems = [];
        if (this.props.menuItems) {
            this.props.menuItems.map((item, index) => MenuItems.push(<MenuItem
                    primaryText={item.label}
                    leftIcon={item.icon}
                    onTouchTap={(e) => this.onItemClick(item.to)}
                    key={index}
                ></MenuItem>)
            );
        }
        return (
            <Drawer
                disableSwipeToOpen
                docked={false}
                width={width}
                open={state.get('opendrawer')}
                onRequestChange={() => this.handleClose()}
                {...others}
            >
                {MenuItems}
                {children}
            </Drawer>
        );
    }
}
export default Container.create(DrawerView);
