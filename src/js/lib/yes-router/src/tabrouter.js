import React, { Component } from 'react';
import { AppDispatcher } from 'yes';
import { LoadingComp } from 'yes-platform';   // eslint-disable-line
import {
    StackNavigator as stackNavigator,
    TabNavigator as tabNavigator,
    withNavigation,
} from 'react-navigation';
import routerComponent from './routercomponent';
import DynamicView from './DynamicView';

const defaultRoutes = {
    DynamicDetail: {
        screen: withNavigation(DynamicView),
        path: 'YESMOBILE/:metaKey/:id/:status',
    },
    DynamicDetail1: {
        screen: withNavigation(DynamicView),
        path: 'YES/:metaKey/:id/:status',
    },
    DynamicMulti: {
        screen: withNavigation(DynamicView),
        path: 'YESMOBILE/:metaKey/:status',
    },
}

export default (entries, routes = defaultRoutes, generateRouteComponent = routerComponent) => {
    const tabPages = {};
    entries.forEach((entry) => {
        tabPages[entry.formKey] = {
            screen: generateRouteComponent(entry),
            path: entry.formKey,
        };
    });
    const mainTabNavigator = tabNavigator(
        tabPages,
        {
            tabBarPosition: 'bottom',
            // animationEnabled: true,
            // swipeEnabled: true,
        }
    );

    function generateStackNavigator(customStackConfig, customRouteConfigMap) {
        const defaultRouteConfigMap = {
            Master: {
                screen: mainTabNavigator,
                path: 'master',
            },
            ...routes
            // DynamicDetail: {
            //     screen: withNavigation(DynamicView),
            //     path: 'YESMOBILE/:metaKey/:id/:status',
            // },
            // DynamicDetail1: {
            //     screen: withNavigation(DynamicView),
            //     path: 'YES/:metaKey/:id/:status',
            // },
            // DynamicMulti: {
            //     screen: withNavigation(DynamicView),
            //     path: 'YESMOBILE/:metaKey/:status',
            // },
        };
        const defaultStackConfig = {
            headerMode: 'none',
        };
        const routeConfigMap = Object.assign(defaultRouteConfigMap, customRouteConfigMap);
        const stackConfig = Object.assign(customStackConfig, defaultStackConfig);
        return stackNavigator(routeConfigMap, stackConfig);
    }
    const stackConfigOfCard = {
        mode: 'float',
    };
    const stackConfigOfModal = {
        mode: 'modal',
        cardStyle: {
            backgroundColor: 'rgba(0,0,0,0.25)',
            justifyContent: 'center',
            // TODO shadow not added successfully.
            // boxShadow: styled.div`box-shadow: 0 -2px 25px 0 rgba(0, 0, 0, 0.15), 0 13px 25px 0 rgba(0, 0, 0, 0.3)`,
            paddingLeft: 24,
            paddingRight: 24,
        },
        navigationOptions: {
            header: null,
        },
    };
    const MainCardNavigator = generateStackNavigator(stackConfigOfCard);
    const MainModalNavigator = generateStackNavigator(stackConfigOfModal, {
        globalLoading: {
            screen: LoadingComp,
            path: 'globalLoading',
        },
    });

    const MainNavigator = stackNavigator(
        {
            Card: {
                screen: MainCardNavigator,
                path: 'card',
            },
            Modal: {
                screen: MainModalNavigator,
                path: 'modal',
            },

        },
        {
            mode: 'card',
            headerMode: 'screen',
            cardStyle: {
                backgroundColor: 'rgba(0,0,0,0.25)',
                opacity: 1,
            },
            onTransitionStart: () => {
                AppDispatcher.dispatch({
                    type: 'TRANSITIONSTART',
                });
            },
            onTransitionEnd: () => {
                AppDispatcher.dispatch({
                    type: 'TRANSITIONEND',
                });
            },
        },
    );
    return MainNavigator;
};
