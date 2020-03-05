import { View, ListView, ActivityIndicator } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { ListItem } from 'react-native-material-ui';
class ListViewBasics extends Component {
    static propTypes = {
        items: PropTypes.object,
        modalLoading: PropTypes.bool,
        handleValueChange: PropTypes.func,
        value: PropTypes.array,
        style: PropTypes.object,
        onLoadMore: PropTypes.func,
    };
    handleItemPress(e, oid, caption) {
        this.props.handleValueChange(oid, caption);
    }
    handleReachEnd = () => {
        // TODO loadmore
        // this.props.onLoadMore();
    };
    renderRow = (rowData) => {
        const rowDataOid = rowData.oid.toString();
        return (
            <ListItem
                centerElement={rowData.Name}
                rightElement={this.props.value.indexOf(rowDataOid) !== -1 ? 'done' : <View style={{ minHeight: 48 }} />}
                onPress={(e) => this.handleItemPress(e, rowData.oid, rowData.caption)}
                onRightElementPress={(e) => this.handleItemPress(e, rowData.oid, rowData.caption)}
                divider
            />
        );
    };
    render() {
        if (this.props.modalLoading) {
            return (
                <View style={this.props.style}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let dataSource;
        if (this.props.items && this.props.items.data) {
            dataSource = ds.cloneWithRows(this.props.items.data);
        }
        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                    onEndReached={this.handleReachEnd}
                />
            </View>
        );
    }
}
export default ListViewBasics;
