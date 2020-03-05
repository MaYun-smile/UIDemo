import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, View } from 'react-native';
import { AbstractApp } from 'yes';
import { ThemeProvider } from 'react-native-material-ui';
import Components from '../components';

import { defaultControlMapping } from '../controlMappings';

const { BusyLoading } = Components;

export default class WebApp extends AbstractApp {

    renderRootComponent() {
        const uiTheme = {
        };
        // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

        const Login = (function Login() {
            return (
                <this.loginConfig.template
                    tooltip={this.loginConfig.tooltip}
                    companyName={this.loginConfig.companyName}
                    logoImage={this.loginConfig.logoImage}
                    bgImage={this.loginConfig.bgImage}
                />
            );
        }).bind(this);
        const AuthRouter = Components.AuthenticatedRoute(this.router, Login, 'key');
        // const AuthRouter = this.router;
        function getMappedComponent(tagName) {
            return defaultControlMapping.get(tagName);
        }
        class App extends Component {
            static childContextTypes = {
                getMappedComponent: PropTypes.func,
            };
            getChildContext() {
                return {
                    getMappedComponent,
                };
            }
            render() {
                return (
                    <ThemeProvider uiTheme={uiTheme}>
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <AuthRouter />
                            <BusyLoading />
                        </View>
                    </ThemeProvider>
                );
            }
        }
        AppRegistry.registerComponent(this.appName, () => App);
    }
}
