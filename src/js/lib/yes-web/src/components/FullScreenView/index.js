/*
 * @Author: gmf
 * @Date:   2016-06-01 10:07:05
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-01 10:39:18
 */

import React, {Component} from "react";
import classNames from "classnames";
class FullScreenView extends Component {
    render() {
        const {className, children, ...others} = this.props;
        const cls = classNames({
            'fixed-page-container': true,
            [className]: className,
        });
        return (
            <div className={cls} {...others}>{children}</div>
        );
    }
}
export default FullScreenView;
