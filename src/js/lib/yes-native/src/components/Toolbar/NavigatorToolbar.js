import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { IconToggle } from 'react-native-material-ui';
// import ActionSheet from 'react-native-actionsheet';
import { propTypes, Util } from 'yes'; // eslint-disable-line
import { ActionSheet } from 'antd-mobile';

function getStyles(props, context) {
    const { isSearchActive } = props;
    const { toolbar, toolbarSearchActive } = context.uiTheme;

    return {
        rightElement: [
            toolbar.rightElement,
            isSearchActive && toolbarSearchActive.rightElement,
            props.style.rightElement,
        ],
    };
}

class NavigatorToolbar extends PureComponent {
    static contextTypes = {
        uiTheme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    onMenuPressed = () => {
        if (this.state.menus.size > 1) {
            // const items = this.getItems();
            // const toolbarItems = [];
            // items.forEach((item) => {
            //     if (item.get('visible') && item.get('enable')) {
            //         toolbarItems.push(item.get('caption'));
            //     }
            // });
            // toolbarItems.push('取消');
            ActionSheet.showActionSheetWithOptions({
                options: this.state.menus,
                cancelButtonIndex: this.state.menus.length - 1,
                message: null,
                maskClosable: true,
            }, this.onMenuItemPressed);
            // this.ActionSheet.show();
        }
    }

    onMenuItemPressed = (index) => {
        if (index >= this.state.actions.length) {
            return;
        }
        const action = this.state.actions[index];
        Util.waitBlurExec(() => {
            this.props.onClick(action);
        });
    }

    getItems() {
        return this.props.controlState.get('items');
    }

    componentWillMount() {
        this.calculdateMenus(this.props);
    }

    calculdateMenus(props) {
        const items = props.controlState.get('items');
        const toolbarItems = [];
        const toolbarActions = [];
        items.forEach((item) => {
            if (item.get('visible') && item.get('enable')) {
                toolbarItems.push(item.get('caption'));
                toolbarActions.push(item.get('action'));
            }
        });
        toolbarItems.push('取消');
        this.setState({
            menus: toolbarItems,
            actions: toolbarActions,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.calculdateMenus(nextProps);
    }

    render() {
        const styles = getStyles(this.props, this.context, this.state);
        const flattenRightElement = StyleSheet.flatten(styles.rightElement);
        if (this.state.menus && this.state.menus.length > 1) {
            return (<View><IconToggle
                name="more-vert"
                onPress={this.onMenuPressed}
                size={this.props.size}
                color={this.context.uiTheme.palette.activeIcon}
                style={flattenRightElement}
            />
                {/* <ActionSheet
                ref={(o) => this.ActionSheet = o}
                title={this.props.title}
                options={toolbarItems}
                cancelButtonIndex={0}
                destructiveButtonIndex={1}
                onPress={this.onMenuItemPressed}
            /> */}
            </View>
            );
        }
        return null;
    }
}
NavigatorToolbar.propTypes = propTypes.Toolbar;
export default NavigatorToolbar;
