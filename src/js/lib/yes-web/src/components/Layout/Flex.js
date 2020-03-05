/* 
 * @Author: zjy
 * @Date:   2016-10-09 10:42:12
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-28 14:50:48
 */


import React, {Component} from "react";
import classNames from "classnames";
/**
 *  flex 必须作为flexlayout的子元素存在
 *  其children有且仅有一个
 *  @property {Number} flex=1 占据父元素容器的比例大小
 */
class Flex extends Component {
    render() {
        let children = this.props.children,
            flex = "flex-1";
        if (this.props.flex) {
            flex = "flex-" + this.props.flex;
        }
        let cls = classNames({
            [flex]: flex,
        });
        return <div className={cls}>{this.props.children}</div>
        // if(React.Children.only(children)){
        //     return React.cloneElement(children,{'className':cls});
        // }
    }

}
export default Flex;