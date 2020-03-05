import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ImmutableVirtulized from '../List/ImmutableVirtulizedList';
import { ListItem } from 'react-native-material-ui';
import { propTypes } from 'yes'; // eslint-disable-line
import styles from '../../style';

export default class CheckList extends PureComponent {
    handleItemPress = (oid) => {
        if (this.props.multiSelect) {
            let items =  this.props.value ? new Set(this.props.value.split(',')) : new Set();
            if(items.has(oid)){
                items.delete(oid);
            }else{
                items.add(oid);
            }
            this.props.handleValueChange(Array.from(items).join(','));
        } else {
            this.props.handleValueChange(oid);
        }
    }

    renderItem = ({ item, index }) => {
        const itemValue = item.get('value').toString();
        const items = this.props.value ? this.props.value.split(',') : [];
        return (
            <ListItem
                centerElement={item.get('caption')}
                rightElement={items.includes(itemValue) ? 'done' : <View />}
                onPress={this.handleItemPress}
                divider
                onPressValue={itemValue}
                key={index}
                numberOfLines={1}
            />
        );
    }
    render() {
        const { controlState } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[styles.flex1, styles.centerchildren]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }
        return (
            <ImmutableVirtulized
                rowHeight={20}
                data={this.props.items}
                extraData={this.props.value}
                renderItem={this.renderItem}
            />
        );
    }
}
