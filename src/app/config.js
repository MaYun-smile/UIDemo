import React from 'react';
import { Components } from 'yes-native';   // eslint-disable-line
import {
    StackNavigator as stackNavigator,
    TabNavigator as tabNavigator,
    withNavigation,
} from 'react-navigation';
import ReceiptView from './ReceiptView';
import PutawayView from './PutawayView';
import CountView from './CountView';
import Receipt from './Receipt';
import Icon from 'react-native-vector-icons/FontAwesome';
const { Login } = Components;
let rootEl = null;
try {
    if (document) {
        rootEl = document.getElementById('app');
    }
} catch (e) {
    console.info(e.message);    // eslint-disable-line no-console
}

const appOptions = {
    sessionKey: 'demo-native',
    serverPath: 'http://1.1.8.24:8089/yigo', // yigo的服务地址
    Login,
    appName: 'yesdemo',
    rootEl,
};
const TabNav = tabNavigator({
    ReceiptTab: {
        screen: withNavigation(ReceiptView),
        path: '/ReceiptView',
        navigationOptions: {
            tabBarLabel: 'Receipt',
            tabBarIcon: ({ tintColor }) => (    // eslint-disable-line react/prop-types
                <Icon
                    name="rocket"
                    size={26} color={tintColor}
                />
            ),
        },
    },
    PutawayTab: {
        screen: withNavigation(PutawayView),
        path: '/PutawayView',
        navigationOptions: {
            tabBarLabel: 'Putaway',
            tabBarIcon: ({ tintColor }) => (    // eslint-disable-line react/prop-types
                <Icon
                    name="rocket"
                    size={26} color={tintColor}
                />
            ),
        },
    },
    CountTab: {
        screen: withNavigation(CountView),
        path: '/CountView',
        navigationOptions: {
            tabBarLabel: 'Count',
            tabBarIcon: ({ tintColor }) => (    // eslint-disable-line react/prop-types
                <Icon
                    name="rocket"
                    size={26} color={tintColor}
                />
            ),
        },
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
});
const StacksOverTabs = stackNavigator(
    {
        Master: {
            screen: TabNav,
        },
        Receipt: {
            screen: withNavigation(Receipt),
            path: '/YES/Receipt/:id/:status',
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.params.id}'s Profile!`,
            }),
        },
    },
    {
        headerMode: 'none',
    }
);
appOptions.router = StacksOverTabs;
appOptions.mock = true;
appOptions.debug = true;
export default appOptions;
