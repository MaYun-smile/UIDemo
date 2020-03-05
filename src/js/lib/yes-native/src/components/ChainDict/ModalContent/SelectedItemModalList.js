import { View, ListView } from 'react-native';
import React, { Component } from 'react';
import { ListItem } from 'react-native-material-ui';

class SelectedItemModalList extends Component {
    renderRow = (rowData) => (
        <ListItem
            centerElement={rowData}
            divider
        />
    );

    render() {
        const { captionList } = this.props;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        let dataSource;
        if (captionList) {
            dataSource = ds.cloneWithRows(captionList);
        }
        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

export default SelectedItemModalList;
