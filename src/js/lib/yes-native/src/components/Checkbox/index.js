import React, { Component } from 'react';
import empty from 'empty';
import { Checkbox } from 'react-native-material-ui';
import { propTypes } from 'yes'; // eslint-disable-line

export default class MuiCheckbox extends Component {
    static defaultProps = {
        onChange: empty.func,
        showLabel: true,
    }

    onChange = (checked) => {
        this.props.onChange({
            label: '',
            value: checked,
        });
    }

    render() {
        const { label } = this.props;// Combobox wrap attributes
        const state = this.props.controlState;
        const labelStyle = {};
        if (!this.props.showLabel) {
            labelStyle.display = 'none';
        }
        if (state.get('loading')) {
            return (
                <Checkbox
                    style={{
                        container: {
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                        },
                    }}
                    style={{
                        label: labelStyle,
                    }}
                    disabled
                    checked={false}
                />);
        } else {
            return (
                <Checkbox
                    style={{
                        container: {
                            justifyContent: 'flex-end',
                            // flexDirection: 'row',
                        },
                        label: {
                            // flex: 'none',
                            // marginLeft: 0,
                        }
                    }}
                    id={this.props.yigoid}
                    disabled={this.props.disabled}
                    onCheck={this.onChange}
                    style={{
                        label: labelStyle,
                    }}
                    label={this.props.caption}
                    checked={!!state.get('value')}
                />);
        }
    }
}
MuiCheckbox.propTypes = propTypes.Checkbox;
