/*
 * @Author: gmf
 * @Date:   2016-03-10 16:18:28
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-20 15:15:42
 */

import React, {Component} from "react";
import Swipeable from "react-swipeable";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import HashHistory from "../../history";
import {Tabs, Tab} from "material-ui/Tabs";
class MuiTabLayout extends Component {
    inkBarInTop = {
        position: 'absolute',
        top: '0px',
    }

    onClick(to, index) {
        const activeIndex = this.getActiveIndex();
        if (activeIndex === index) {
            return;
        }
        const direction = activeIndex > index ? 'page-transition' : 'page-transition-reverse';
        HashHistory.push(`${to}?direction=${direction}`);
    }

    getActiveIndex() {
        var name = this.props.location.pathname;
        return this.props.tabs.findIndex(function (item) {
            return item.to == name;
        });
    }

    onSwipedLeft() {
        let activeIndex = this.getActiveIndex();
        if (activeIndex == this.props.tabs.length - 1)
            return;
        const targetIndex = ++activeIndex;
        var tabInfo = this.props.tabs[targetIndex];
        this.onClick(tabInfo.to, targetIndex);
    }

    onSwipedRight() {
        let activeIndex = this.getActiveIndex();
        if (activeIndex == 0)
            return;
        const targetIndex = --activeIndex;
        var tabInfo = this.props.tabs[targetIndex];
        this.onClick(tabInfo.to, targetIndex);
    }

    render() {
        const name = this.props.location.pathname;
        const direction = this.props.location.query.direction;
        let transition = 'page-transition-reverse';
        if (direction) {
            transition = direction;
        }
        return (
            <div className="flexbox flex-dir-col fittoparent">
                <Swipeable
                    className="flexbox flex-1"
                    onSwipedLeft={() => this.onSwipedLeft()}
                    onSwipedRight={() => this.onSwipedRight()}
                >
                    <ReactCSSTransitionGroup
                        component="div"
                        className="flexbox tab-content flex-1"
                        transitionName={transition}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {React.cloneElement(this.props.children, {
                            key: name,
                        })}
                    </ReactCSSTransitionGroup>
                </Swipeable>
                <Tabs
                    className="flexbox flex-dir-col"
                    value={this.getActiveIndex()}
                    inkBarStyle={this.inkBarInTop}
                >
                    {
                        this.props.tabs.map((item, index) => <Tab
                            value={index}
                            label={item.label}
                            onActive={() => this.onClick(item.to, index)}
                            key={`TabLayout${index}`}
                        />)
                    }
                </Tabs>
            </div>
        );
    }
}
export default MuiTabLayout;
/*
 icon与文字同存在时，Tab高度为72px，暂无法调整至48px
 */
