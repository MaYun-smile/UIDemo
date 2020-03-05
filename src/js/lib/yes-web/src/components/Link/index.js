/*
 * @Author: gmf
 * @Date:   2016-07-22 14:52:23
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-14 13:42:21
 */

import React, {Component, PropTypes} from "react";
import {CellsTitle, Cells, Cell, CellHeader, CellBody, CellFooter} from "react-weui";
import classNames from "classnames";
class MuiLink extends Component {
    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        var state = this.props.controlState;
        let className = this.props.className;
        let cls = classNames({
            'form_value flexbox flex-align-center': true,
            [className]: className,
        });
        var mainDiv = (
            <div
                style={this.props.style}
                className={cls}
            >{state.get("displayValue")}</div>
        );
        if (!this.props.label || this.props.label == null) {
            return mainDiv;
        }
        return (
            <Cell className="weui_cells_access" onClick={(e) => this.onClick(e)}>
                <CellHeader><label className="weui_label">{this.props.label}</label></CellHeader>
                <CellBody>{mainDiv}</CellBody>
                <CellFooter></CellFooter>
            </Cell>
        );
    }
}
export default MuiLink;
