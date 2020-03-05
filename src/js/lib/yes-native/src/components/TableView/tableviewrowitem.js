import React, { PropTypes, PureComponent } from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import { TableViewRowItemWrap, DynamicControl } from 'yes';
import { Divider } from 'react-native-material-ui';
class TableViewRowItem extends PureComponent {
    onPress = () => {
        this.props.onPress(this.props.rowIndex);
    }
    render() {
        if(this.props.hasRowClickEvent){
            return (
                <TouchableHighlight
                    onPress={this.onPress}
                >
                    <View
                        style={this.props.layoutStyles}
                    >
                        <DynamicControl yigoid={this.props.rootYigoId} />
                        <Divider />
                    </View>
                </TouchableHighlight>
            );
        }else{
            return <View
                style={this.props.layoutStyles}
            >
                <DynamicControl yigoid={this.props.rootYigoId} />
                <Divider />
            </View>
        }
    }
}

export default TableViewRowItemWrap(TableViewRowItem);
