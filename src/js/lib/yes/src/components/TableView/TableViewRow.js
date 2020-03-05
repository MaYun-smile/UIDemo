/* 
 * @Author: gmf
 * @Date:   2016-11-14 14:18:13
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-11-25 16:41:46
 */



import React, {Component} from "react";
import defaultControlMapping from '../util/defaultControlMapping';

export default class TableViewRow extends Component {
    render() {
        const comp = this.props.comp;
        const item = comp.items[0];
        const Control = defaultControlMapping.get(item.tagName);
        return (
            <Control yigoid={item.metaObj.key}></Control>
        )
    }
}