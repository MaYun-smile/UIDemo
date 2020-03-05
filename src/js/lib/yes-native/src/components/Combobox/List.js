import { View, ListView, ActivityIndicator } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { ListItem } from 'react-native-material-ui';
export default class ComboList extends Component {
    static propTypes = {
        items: PropTypes.array,
        handleValueChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.string,
        ]),
        style: PropTypes.object,
    };
    handleItemPress(e, oid) {
        this.props.handleValueChange(oid);
    }
    handleReachEnd = () => {
        // TODO loadmore
        // this.props.onLoadMore();
    }
    renderRow = (rowData) => {
        const rowDataOid = rowData.value.toString();
        return (
            <ListItem
                centerElement={rowData.caption}
                rightElement={this.props.value === rowDataOid ? 'done' : <View />}
                onPress={(e) => this.handleItemPress(e, rowData.value)}
                onRightElementPress={(e) => this.handleItemPress(e, rowData.value)}
                divider
            />
        );
    }
    render() {
        if (this.props.items == null) {
            return (
                <View style={this.props.style}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let dataSource;
        if (this.props.items) {
            dataSource = ds.cloneWithRows(this.props.items);
        }
        return (
            <ListView
                dataSource={dataSource}
                renderRow={this.renderRow}
                onEndReached={this.handleReachEnd}
            />
        );
    }
}
