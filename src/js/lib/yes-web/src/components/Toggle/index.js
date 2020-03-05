/*
 * @Author: zjy
 * @Date:   2016-06-23 15:26:40
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-12 13:36:16
 */

import React, {Component} from "react";
import {Cell, CellHeader, CellBody, CellFooter} from "react-weui";
import empty from "empty";
import Toggle from "material-ui/Toggle";
/*const toggleStyle = {
 height: 48,
 };
 const iconStyle = {
 marginTop: 12,
 };*/
class YESToggle extends Component {
    static defaultProps = {
        onChange: empty.func,
    }

    onChange(e, checked) {
        this.props.onChange({
            label: '',
            value: checked,
        });
    }

    render() {
        const {label, type, multiLine, rows} = this.props;
        var state = this.props.controlState, mainDiv;
        if (state.get('loading')) {
            mainDiv = (
                <Toggle
                    style={this.props.style}
                    className={this.props.className}
                    disabled
                    toggled={false}
                ></Toggle>);
        } else {
            mainDiv = (
                <Toggle
                    style={this.props.style}
                    className={this.props.className}
                    id={this.props.yigoid}
                    disabled={!state.get('enable')}
                    onToggle={(e, checked) => this.onChange(e, checked)}
                    toggled={state.get('value')}
                    defaultToggled={state.get('value')}
                ></Toggle>);
        }
        if (!this.props.label || this.props.label == null) {
            return mainDiv;
        }
        return (
            <Cell>
                <CellHeader><label className="weui_label">{this.props.label}</label></CellHeader>
                <CellBody>{mainDiv}</CellBody>
                <CellFooter></CellFooter>
            </Cell>
        );
    }
}
export default YESToggle;
