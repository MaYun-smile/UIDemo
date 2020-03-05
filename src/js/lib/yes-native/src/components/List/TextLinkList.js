/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import ImmutableVirtulized from './ImmutableVirtulizedList';
import { ListItem } from 'react-native-material-ui';
import { propTypes } from 'yes'; // eslint-disable-line

import { ListRowWrap as listRowWrap, DynamicControl } from 'yes';
import styles from '../../style';
class TextLinkList extends ImmutableVirtulized {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        secondKey: PropTypes.string,
        tertiaryKey: PropTypes.string,
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
                {
                    fontWeight: 'bold',
                },
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
                {
                    fontWeight: 'bold',
                },
            ],
            tertiaryText: [
                listItem.tertiaryText,
                this.props.style.tertiaryText,
            ],
        };
    }
    generateTertiaryElement = () => {
        const el = [];
        const ownerStyles = this.getStyles();
        if (this.props.tertiaryKey) {
            this.props.tertiaryKey.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={ownerStyles.tertiaryText} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={ownerStyles.tertiaryText} {...item} />);
                    }
                }
            });
            return <View style={{ flexDirection: 'row' }}>{el}</View>;
        }
        return null;
    }
    generatePrimaryELement = () => {
        const primaryKey = this.props.primaryKey;
        const ownerStyles = this.getStyles();
        let el;
        if (!primaryKey) {
            return null;
        }
        let itemtype = typeof (primaryKey);
        if (itemtype === 'string') {
            el = <DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={ownerStyles.primaryText} yigoid={primaryKey} />;
        } else {
            if (primaryKey.$$typeof) {
                el = primaryKey;
            } else {
                el = <DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={ownerStyles.primaryText} {...primaryKey} />;
            }
        }
        return <View style={styles.firstline}>{el}</View>;
    }
    generateSecondaryElement = () => {
        const el = [];
        const styles = this.getStyles();
        if (this.props.secondKey) {
            this.props.secondKey.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={styles.secondaryText} key={item} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={styles.secondaryText} {...item} />);
                    }
                }
            });
            return <View style={{ flexDirection: 'row' }}>{el}</View>;
        }
        return null;
    }
    generateActions = () => (
        <View style={[styles.flexrow_r, this.props.actionContainerStyle]}>
            {
                this.props.actions.map((action) => {
                    const itemType = typeof (action);
                    if (itemType === 'string') {
                        return <DynamicControl yigoid={action} />;
                    }
                    if (itemType.$$typeof) {
                        return action;
                    }
                    return <DynamicControl {...action} />;
                })
            }
        </View>
    );

    centerComp = (
        <View style={this.getStyles().textViewContainer}>
            {this.generatePrimaryELement()}
            {this.generateSecondaryElement()}
            {this.generateTertiaryElement()}
        </View>
    )
    NewListItem = listRowWrap(ListItem, this.props.yigoid)
    RowView = listRowWrap(View, this.props.yigoid)
    renderItem = ({ item, index }) => {
        const NewListItem = this.NewListItem;
        const RowView = this.RowView;
        if (this.props.actions) {
            return (<RowView style={[styles.flexcol, this.props.rowContainerStyle]}>
                {/* <DynamicControl yigoid="xxx" /> */}
                <ListItem
                    centerElement={this.centerComp}
                    rightElement={this.props.rightElement}
                    onPress={() => this.onClick(index)}
                    divider={this.props.divider}
                    rowIndex={index}
                    numberOfLines={3}
                    leftElement={this.props.leftElement}
                />
                {
                    this.generateActions()
                }
            </RowView>);
        }
        return (
            <NewListItem
                centerElement={this.centerComp}
                rightElement={this.props.rightElement}
                onPress={() => this.onClick(index)}
                divider={this.props.divider}
                rowIndex={index}
                numberOfLines={3}
                leftElement={this.props.leftElement}
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
                rowHeight={60}
                data={controlState.get('data')}
                renderItem={this.renderItem}
            />
        );
    }
}
TextLinkList.propTypes = propTypes.List;

export default TextLinkList;
