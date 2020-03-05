/* 
 * @Author: gmf
 * @Date:   2016-12-08 16:30:39
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-09 10:00:04
 */


import React, {Component} from "react";
import defaultControlMapping from '../util/defaultControlMapping';
/**
 * 用于设计器中的自定义布局,自定义布局中仅设置了yigoid,并没有相关控件的其他信息
 * 这里需要到父组件中根据yigoid获取控件类型,根据类型获取React控件
 */
class LayoutItem extends Component {
    render() {
        var comp = this.props.comp;
        var tagName = comp.tagName;
        var Control = defaultControlMapping.get(tagName);
        return <Control yigoid={this.props.yigoid}/>;
    }
}

export default LayoutItem