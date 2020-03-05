import React, { PropTypes, PureComponent } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { propTypes } from 'yes'; // eslint-disable-line

class TabView extends PureComponent {
    static contextTypes = {
        uiTheme: PropTypes.object.isRequired,
    }

    state = {
        index: 0,
        routes: [
        ],
    }

    renderLabel = props => ({ route, index }) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? '#D6356C' : '#222'),
        );
        const color = props.position.interpolate({
            inputRange,
            outputRange,
        });
        return (
            <Animated.Text style={[styles.label, { color }]}>
                {route.title}
            </Animated.Text>
        );
    }

    renderHeader = props => {
        return (
            <TabBar
                {...props}
                pressColor="rgba(255, 64, 129, .5)"
                renderLabel={this.renderLabel(props)}
                indicatorStyle={styles.indicator}
                tabStyle={styles.tab}
                style={styles.tabbar}
            />
        );
    }

    componentWillMount() {
        const routes = this.props.children.map((child, index) => {
            return {
                key: child.key || index,
                title: child.props.tabLabel,
            };
        });
        this.setState({
            routes,
            loading: false,
        });
    }

    renderScene = ({ route }) => {
        const result = this.props.children.find((child) => {
            return child.key === route.key;
        });
        return result;
    }

    handleChangeTab = (index) => {
        this.setState({
            index,
        });
    }

    render() {
        const { primaryColor, accentColor, alternateTextColor } = this.context.uiTheme.palette;
        return (
            <TabViewAnimated
                style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onRequestChangeTab={this.handleChangeTab}
            />
            /* <ScrollableTabView
                tabBarBackgroundColor={primaryColor}
                tabBarActiveTextColor={alternateTextColor}
                tabBarInactiveTextColor={alternateTextColor}
                tabBarUnderlineStyle={{ backgroundColor: accentColor }}
                {...this.props}
            >
                {this.props.children}
            </ScrollableTabView>*/
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicator: {
        backgroundColor: '#ff4081',
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        margin: 8,
    },
    tabbar: {
        backgroundColor: '#fff',
    },
    tab: {
        opacity: 1,
        // width: 90,
    },
    page: {
        backgroundColor: '#f9f9f9',
    },
});
TabView.propTypes = propTypes.TabView;
export default TabView;
export { default as  TabPanel } from './TabPanel';
