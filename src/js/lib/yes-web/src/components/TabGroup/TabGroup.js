/*
 * @Author: zjy
 * @Date:   2016-06-20 09:17:16
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-25 10:31:09
 */

import React, {Component} from "react";
import {Tabs, Tab} from "material-ui/Tabs";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Swipeable from "react-swipeable";
import classNames from "classnames";
import s from "./tabgroup.scss";
/**
 * MuiTabGroup tab组件，由MuiTabPanel组成其子元素
 * @property {String} className - 根元素的css类名
 * @property {Object} style - 重写根元素的样式
 */
class MuiTabGroup extends Component {
    state = {
        activeTab: 1,
        animate: 'page-transition-reverse',
    }

    setActive(index, e) {
        e.preventDefault();
        var animate = 'page-transition-reverse';
        if (this.state.activeTab > index) {
            animate = 'page-transition';
        }
        this.setState({
            activeTab: index,
            animate,
        });
    }

    onSwipedRight() {
        if (this.state.activeTab == 1)
            return;
        this.setState({
            activeTab: --this.state.activeTab,
            animate: 'page-transition',
        });
    }

    onSwipedLeft() {
        if (this.state.activeTab == this.props.children.length)
            return;
        this.setState({
            activeTab: ++this.state.activeTab,
            animate: 'page-transition-reverse',
        });
    }

    render() {
        const {className, children, ...others} = this.props;
        const cls = classNames({
            'tab-group': true,
            'flexbox': true,
            'flex-dir-col': true,
            [className]: className,
        });
        var index = this.state.activeTab - 1;
        var panel = this.props.children[index];
        return (
            <div className={cls}
                 style={this.props.style}>
                <Tabs
                    value={index}
                >
                    {
                        this.props.children.map((item, index) =>
                            <Tab
                                label={item.props.label}
                                value={index}
                                onClick={e => this.setActive(index + 1, e)}
                                key={'MaterialTab' + index}
                            >
                            </Tab>)
                    }
                </Tabs>
                <Swipeable
                    onSwipedLeft={() => this.onSwipedLeft()}
                    onSwipedRight={() => this.onSwipedRight()}
                    className="flex-1 flexbox"
                >
                    <ReactCSSTransitionGroup component="div"
                                             className="tab-content flex-1"
                                             transitionName={this.state.animate}
                                             transitionEnterTimeout={500}
                                             transitionLeaveTimeout={500}
                    >
                        {panel}
                    </ReactCSSTransitionGroup>
                </Swipeable>
            </div>
        );
    }
}
s._insertCss();
export default MuiTabGroup;
