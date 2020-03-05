import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line

const styles = StyleSheet.create({
    FullScreen: {
        flex: 1,
        alignItems: 'stretch',
    },
});

export default class FullScreenView extends Component {
    render() {
        return (
            <View style={styles.FullScreen}>
                {this.props.children}
            </View>
        );
    }
}

FullScreenView.propTypes = propTypes.FullScreenView;
