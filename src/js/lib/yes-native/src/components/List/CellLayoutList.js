/**
 * 每个ListItem都是一个CellLayout集合的列表
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import ImmutableVirtulized from './ImmutableVirtulizedList';
import { ListRowWrap as listRowWrap, DynamicControl, propTypes } from 'yes';
import styles from '../../style';
import Layout from '../Layout';

class CellLayoutList extends ImmutableVirtulized {
    static propTypes = {
        yigoid: PropTypes.string,
        divider: PropTypes.bool,
    };
    static contextTypes = {
        uiTheme: PropTypes.object.isRequired,
    };
    static defaultProps = {
        ...ImmutableVirtulized.defaultProps,
        style: {},
        divider: true,
    };
    onClick = (rowIndex) => {
        if (this.props.onClick) {
            this.props.onClick(rowIndex);
        }
    }
    getStyles() {
        const { listItem } = this.context.uiTheme;
        return {
            leftElementContainer: [
                listItem.leftElementContainer,
                // leftElementContainer,
                this.props.style.leftElementContainer,
            ],
            centerElementContainer: [
                listItem.centerElementContainer,
                this.props.style.centerElementContainer,
            ],
            textViewContainer: [
                listItem.textViewContainer,
                this.props.style.textViewContainer,
            ],
            primaryText: [
                listItem.primaryText,
                this.props.style.primaryText,
            ],
            firstLine: [
                listItem.firstLine,
                this.props.style.firstLine,
            ],
            primaryTextContainer: [
                listItem.primaryTextContainer,
                this.props.style.primaryTextContainer,
            ],
            secondaryText: [
                listItem.secondaryText,
                this.props.style.secondaryText,
            ],
            tertiaryText: [
                listItem.tertiaryText,
                this.props.style.tertiaryText,
            ],
        };
    }
    NewListItem = listRowWrap(Layout.CellGroupLayout, this.props.yigoid)
    items = this.props.items || this.generateItems()
    generateItems() { // 根据当前列表的列信息自动生成items
        return [];
    }
    renderItem = ({ item, index }) => {
        const NewListItem = this.NewListItem;
        return (
            <NewListItem
                onPress={() => this.onClick(index)}
                divider={this.props.divider}
                rowIndex={index}
                items={this.props.items}
                containerStyle={this.props.containerStyle}
            />
        );
    }
    render() {
        const { controlState, layoutStyles } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[styles.flex1, styles.centerchildren, layoutStyles]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }
        return (
            <ImmutableVirtulized
                style={layoutStyles}
                data={controlState.get('data')}
                renderItem={this.renderItem}
            />
        );
    }
}
CellLayoutList.propTypes = propTypes.List;
export default CellLayoutList;
