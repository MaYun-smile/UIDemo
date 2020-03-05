/*
 * @Author: zjy
 * @Date:   2016-06-20 09:53:40
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-10 08:57:51
 */

import React, {Component} from "react";
import classNames from "classnames";
class MuiTabPanel extends Component {
    render() {
        const {className, children, ...others} = this.props;
        const cls = classNames({
            'tab-panel': true,
            'fittoparent': true,
            'flexbox': true,
            [className]: className,
        });
        return <div className={cls} {...others}>{children}</div>;
    }
}
export default MuiTabPanel;
