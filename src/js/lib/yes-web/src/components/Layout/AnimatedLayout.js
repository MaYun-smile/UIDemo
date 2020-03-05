/*
 * @Author: gmf
 * @Date:   2016-03-09 09:43:08
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-10-19 14:49:49
 */

import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import History from '../../history';

class Layout extends Component {
    transitionType = "page-transition-reverse"
    componentDidMount() {
        this.removeHistoryListener = History.listenBefore((location) => {
            this.transitionType = location.action=="PUSH"?'page-transition-reverse' : 'page-transition';
        });
    }

    componentWillUnmount() {
        if(this.removeHistoryListener){
            this.removeHistoryListener();
        }
    }

    render() {
        var name = this.props.location.pathname;
        return (
            <ReactCSSTransitionGroup component="div"
                className="flex-1"
                transitionName={this.transitionType}
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
