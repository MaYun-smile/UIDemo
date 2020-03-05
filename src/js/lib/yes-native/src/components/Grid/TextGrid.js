/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */

import React, { Component } from 'react';
import { TouchableHighlight, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ImmutableVirtualizedList } from '../List';
import { ListItem, ActionButton } from 'react-native-material-ui';
import { GridRowWrap as gridRowWrap, DynamicControl, propTypes } from 'yes'; // eslint-disable-line
import styles from '../../style';
const gridStyles = StyleSheet.create({
    actionContainer: {
        height: 54,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        backgroundColor: 'white',
    },
    action: {
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 10,
    }
});
class TextGrid extends Component {
    onRowClick = (rowIndex) => {
        if (this.props.onRowClick) {
            this.props.onRowClick(rowIndex);
        }
    };
    onActionPressed = () => {
        this.props.addNewRow();
    };
    generateSecondaryElement = () => {
        const el = [];
        if (this.props.secondKey) {
            this.props.secondKey.forEach((item) => {
                const itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<DynamicControl disabled textStyles={{ fontWeight: 'lighter' }} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl disabled textStyles={{ fontWeight: 'lighter' }} {...item} />);
                    }
                }
            });
        }
        return el;
    };
    generatePrimaryELement = () => {
        const primaryKey = this.props.primaryKey;
        let el = null;
        if (!primaryKey) {
            return null;
        }
        const itemtype = typeof (primaryKey);
        if (itemtype === 'string') {
            el = <DynamicControl disabled textStyles={{ fontWeight: 'bold' }} yigoid={primaryKey} />;
        } else {
            if (primaryKey.$$typeof) {
                el = primaryKey;
            } else {
                el = <DynamicControl disabled textStyles={{ fontWeight: 'bold' }} {...primaryKey} />;
            }
        }
        return el;
    };
    NewListItem = gridRowWrap(ListItem, ActivityIndicator, this.props.yigoid)
    RowView = gridRowWrap(TouchableHighlight, ActivityIndicator, this.props.yigoid)
    centerComp = (
        <View>
            {this.generatePrimaryELement()}
            {this.generateSecondaryElement()}
        </View>
    );

    generateActions = () => (
        <View style={[styles.flexrow_r, gridStyles.actionContainer, this.props.actionContainerStyle]}>
            {
                this.props.actions.map((action) => {
                    const itemType = typeof (action);
                    if (itemType === 'string') {
                        return <DynamicControl isCustomLayout layoutStyles={gridStyles.action} yigoid={action} />;
                    }
                    if (itemType.$$typeof) {
                        return action;
                    }
                    return <DynamicControl isCustomLayout layoutStyles={gridStyles.action} {...action} />;
                })
            }
        </View>
    );

    renderItem = ({ item, index }) => {
        const NewListItem = this.NewListItem;
        const RowView = this.RowView;
        if (this.props.actions) {
            return (<RowView
                style={[styles.flexcol, this.props.rowContainerStyle]}
                rowIndex={index}
                onPress={this.onRowClick}
            >
                <View>
                    <ListItem
                        rowIndex={index}
                        centerElement={this.centerComp}
                        rightElement={this.props.rightElement}
                        divider={this.props.divider}
                        numberOfLines={3}
                        leftElement={this.props.leftElement}
                    />
                    {
                        this.generateActions()
                    }
                </View>
            </RowView>);
        }
        return (
            <NewListItem
                rowIndex={index}
                centerElement={this.centerComp}
                onPress={this.onRowClick}
                style={this.props.itemStyle}
                leftElement={this.props.leftElement}
                rightElement={this.props.rightElement}
                numberOfLines={this.props.itemNumberOfLines}
            />
        );
    };

    render() {
        const { controlState } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[styles.flex1, styles.centerchildren]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }

        if (controlState.get('enable') && controlState.get('editable')) {
            return (
                <View style={{ flex: 1 }}>
                    <ImmutableVirtualizedList
                        data={controlState.getIn(['dataModel', 'data'])}
                        renderItem={this.renderItem}
                        rowHeight={this.props.rowHeight}
                    />
                    <ActionButton
                        hidden={false}
                        onPress={this.onActionPressed}
                        style={{
                            positionContainer: { bottom: 76 },
                        }}
                    />
                </View>
            );
        }
        return (
            <ImmutableVirtualizedList
                data={controlState.getIn(['dataModel', 'data'])}
                renderItem={this.renderItem}
                rowHeight={this.props.rowHeight}
            />
        );
    }
}
TextGrid.propTypes = propTypes.Grid;
export default TextGrid;
