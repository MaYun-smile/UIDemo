/* 
 * @Author: gmf
 * @Date:   2016-11-14 14:17:57
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-13 09:51:01
 */



import React, {Component} from "react";
import defaultControlMapping from '../util/defaultControlMapping';
import classNames from "classnames";

export default class TableView extends Component {
    render() {
        const comp = this.props.comp;
        const itemList = comp.items;
        const {className} = this.props;
        const cls = classNames({
            'tableview': true,
            'fullwidth': true,
            [className]: className,
        });
        return (
            <div className={cls}>
                {itemList.map((item) => {
                    const Control = defaultControlMapping.get(item.tagName);
                    return (<div key={item.metaObj.key}><Control yigoid={item.metaObj.key}></Control></div>);
                })}
            </div>
        )
    }
}