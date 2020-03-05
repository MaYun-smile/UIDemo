import React, { Component } from 'react';
import { propTypes } from 'yes'; // eslint-disable-line
import { TouchableHighlight, Image, StyleSheet } from 'react-native';

export default class YESImage extends Component {
    static propTypes = propTypes.Image;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        // TODO: get width and height
        return (
            <TouchableHighlight
                onPress={this.onClick}
            >
                <Image
                    style={this.props.layoutStyles}
                    source={{ uri: this.props.displayValue }}
                />
            </TouchableHighlight>

        );
    }
}

