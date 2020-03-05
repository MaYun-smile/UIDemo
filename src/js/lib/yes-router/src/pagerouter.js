import React, { Component } from 'react';
import { AppDispatcher } from 'yes';
import { LoadingComp } from 'yes-platform';   // eslint-disable-line
import {
    createStackNavigator,
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

export default (homeScreen, routes = defaultRoutes) => {
    function generateStackNavigator(customStackConfig, customRouteConfigMap) {
        const defaultRouteConfigMap = {
            Master: {
                screen: homeScreen,
                path: 'master',
            },
            ...routes,
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
            headerMode: 'screen',
            disableKeyboardHandling: true,
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
        };
        const routeConfigMap = Object.assign(defaultRouteConfigMap, customRouteConfigMap);
        const stackConfig = Object.assign(customStackConfig, defaultStackConfig);
        return createStackNavigator(routeConfigMap, stackConfig);
    }
    const stackConfigOfCard = {
        mode: 'float',
    };
    const stackConfigOfModal = {
        mode: 'modal',
        cardStyle: {
            backgroundColor: 'rgba(255,255,255,0.25)',
            justifyContent: 'center',
            // TODO shadow not added successfully.
            // boxShadow: styled.div`box-shadow: 0 -2px 25px 0 rgba(0, 0, 0, 0.15), 0 13px 25px 0 rgba(0, 0, 0, 0.3)`,
            // paddingLeft: 24,
            // paddingRight: 24,
        },
        transitionConfig: () => {
            return {
                backgroundColor: 'rgba(255,255,255,0.25)',
            };
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

    const MainNavigator = createStackNavigator(
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
            headerMode: 'none',
            cardStyle: {
                backgroundColor: 'white',
            },
            disableKeyboardHandling: true,
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
