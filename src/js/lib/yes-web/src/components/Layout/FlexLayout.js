/* 
 * @Author: zjy
 * @Date:   2016-10-09 10:41:39
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-25 09:58:18
 */


import React, {Component} from "react";
import classNames from "classnames";
/**
 * flexlayout 用于线性布局
 *     布局的children请使用 flex 组件分配所占大小比例，指定高度的childre组件可不用flex
 * @property {horizontal|vertical} Orientation=vertical 布局方向属性
 * @property {Number} flex=1 大小权重
 * @property {String} className - The CSS class name of the root element.
 * @property {Object} style - Override the inline-styles of the root element.
 */
class FlexLayout extends Component {
    render() {
        //TODO: 根据linerlayout的属性调整style以及flex
        const {Orientation, className, children, ...others} = this.props;
        let style = this.props.style;
        let isVertical = true,
            flex = "flex-1";
        if (Orientation == "horizontal") {
            isVertical = false;
        }
        if (this.props.flex) {
            flex = "flex-" + this.props.flex;
        }
        const cls = classNames({
            'flexbox': true,
            'flex-dir-row': !isVertical,
            'flex-dir-col': isVertical,
            [flex]: flex,
            [className]: this.props.className,
        });
        return (<div
            className={cls}
            style={style}>{children}</div>);
    }
}

export default FlexLayout;