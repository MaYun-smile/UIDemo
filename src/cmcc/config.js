import React from 'react';
import { Components } from 'yes-native';   // eslint-disable-line
import {
    StackNavigator as stackNavigator,
    TabNavigator as tabNavigator,
    withNavigation,
} from 'react-navigation';
import DispatchList from './DispatchList';
import DispatchFinished from './DispatchFinished';
import My from './My';
import Icon from 'react-native-vector-icons/FontAwesome';
const { MobileLogin } = Components;
let rootEl = null;
try {
    if (document) {
        rootEl = document.getElementById('app');
    }
} catch (e) {
    console.info(e.message);    // eslint-disable-line no-console
}

const appOptions = {
    sessionKey: 'cmcc',
    serverPath: 'http://192.168.1.116:8089/yigo2', // yigo的服务地址
    Login: MobileLogin,
    appName: 'yesdemo',
    rootEl,
};
const TabNav = tabNavigator({
    ReceiptTab: {
        screen: withNavigation(DispatchList),
        path: '/DispatchList',
        navigationOptions: {
            tabBarLabel: 'DispatchList',
            tabBarIcon: ({ tintColor }) => (    // eslint-disable-line react/prop-types
                <Icon
                    name="rocket"
                    size={26} color={tintColor}
                />
            ),
        },
    },
    PutawayTab: {
        screen: withNavigation(DispatchFinished),
        path: '/DispatchFinished',
        navigationOptions: {
            tabBarLabel: 'DispatchFinished',
            tabBarIcon: ({ tintColor }) => (    // eslint-disable-line react/prop-types
                <Icon
                    name="rocket"
                    size={26} color={tintColor}
                />
            ),
        },
    },
    CountTab: {
        screen: withNavigation(My),
        path: '/My',
        navigationOptions: {
            tabBarLabel: 'My',
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
        // Receipt: {
        //     screen: withNavigation(Receipt),
        //     path: '/YES/Receipt/:id/:status',
        //     navigationOptions: ({ navigation }) => ({
        //         title: `${navigation.state.params.id}'s Profile!`,
        //     }),
        // },
    },
    {
        headerMode: 'none',
    }
);
appOptions.router = StacksOverTabs;
appOptions.mock = true;
appOptions.debug = true;
export default appOptions;
