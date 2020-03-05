/*
 * @Author: gmf
 * @Date:   2016-03-09 09:43:08
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-10-19 14:49:49
 */

import React, {Component} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import AppStatus from "../stores/AppStatus";
class Layout extends Component {
    render() {
        var name = this.props.location.pathname;
        var transitionName = AppStatus.getState().get('transitionType') == 'PUSH' ?
            'page-transition-reverse' : 'page-transition';
        return (
            <ReactCSSTransitionGroup component="div"
                                     className="flex-1"
                                     transitionName={transitionName}
                                     transitionEnterTimeout={500}
                                     transitionLeaveTimeout={500}
            >
                {React.cloneElement(this.props.children, {
                    key: this.props.children.type.key || name,
                })}
            </ReactCSSTransitionGroup>
        );
    }
}
export default Layout;
