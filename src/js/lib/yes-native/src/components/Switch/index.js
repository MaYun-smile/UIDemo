import React, { Component } from 'react';
import empty from 'empty';
import { View, Switch, Text } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line

const styles = {
    container: {
        flexDirection: 'row',
    },
};
export default class MuiSwitch extends Component {
    static defaultProps = {
        onChange: empty.func,
    }

    onChange = (checked) => {
        this.props.onChange({
            label: '',
            value: checked,
        });
    }

    render() {
        const state = this.props.controlState;
        if (state.get('loading')) {
            return (
                <View
                    style={{
                        ...styles.container,
                        ...this.props.layoutStyles,
                    }}
                >
                    {this.props.caption ? <Text> {this.props.caption} </Text> : null}
                    <Switch
                        disabled
                        value={false}
                    />
                </View>
            );
        }
        return (
            <View
                style={{
                    ...styles.container,
                    ...this.props.layoutStyles,
                }}
            >
                {this.props.caption & this.props.showLabel ? <Text> {this.props.caption} </Text> : null}
                <Switch
                    disabled={this.props.disabled}
                    onValueChange={this.onChange}
                    value={state.get('value')}
                />
            </View>
        );
    }
}
MuiSwitch.propTypes = propTypes.Checkbox;
