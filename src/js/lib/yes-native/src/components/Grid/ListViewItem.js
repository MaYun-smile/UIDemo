import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ImmutableVirtualizedList } from '../List';
import { ListItem, ActionButton } from 'react-native-material-ui';
import { GridRowWrap as gridRowWrap, DynamicControl, propTypes } from 'yes'; // eslint-disable-line

export default class ListViewItem extends PureComponent {
    static propsTypes = {
        // Image:
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    primary: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})
