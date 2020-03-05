/*
 * @Author: gmf
 * @Date:   2016-06-22 15:12:55
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-22 15:14:14
 */


import React, {Component, PropTypes} from "react";
import {ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
class MuiGridRow extends Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    onClick(e) {
        this.props.onClick(e);
    }

    render() {
        const {onClick, children, ...others} = this.props;
        return (<div><ListItem onTouchTap={(e) => this.onClick(e)} {...others}>
        </ListItem><Divider /></div>);
    }
}
export default MuiGridRow;
