import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { resetInitialUrl } from '../history';
import { AbstractApp } from 'yes';// eslint-disable-line import/no-unresolved
import { defaultControlMapping } from '../controlMappings';
import Components from '../components';
import { ThemeProvider } from 'react-native-material-ui';
import { AppRegistry } from 'react-native';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { getLanguage } from '../util';
// import zh_CN from '../../translation/zh-CN';
// import en_US from '../../translation/en-US';

addLocaleData([...en, ...zh]);
const { View } = Components;
export default class WebApp extends AbstractApp {

    // beforeStart(el) {
    //     this.rootEl = el || document.body;
    //     if (navigator.userAgent.match(/iPhone/i)) {
    //         $('body').addClass('ios');
    //     }
    // }

    /* 获取当前地址的Hash部分以这部分地址作为整个系统的初始化地址
    */
    getHash() {
        return (window || this).location.hash.slice(1);
    }

    Login() {
        console.log('tooltip', this.loginConfig.tooltip);
        return (
            <this.Login
                tooltip={this.loginConfig.tooltip}
                companyName={this.loginConfig.companyName}
            />
        );
    }

    renderRootComponent() {
        const uiTheme = {};
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
        // eslint-disable-next-line new-cap
        const AuthRouter = Components.AuthenticatedRoute(this.router, Login, 'root');
        // const AuthRouter = this.router;
        const { BusyLoading } = Components;
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
                const language = getLanguage();
                const locale = language ? language.split('-')[0] : "zh-CN";
                return (
                    <IntlProvider
                        locale={locale}
                        language={language}
                        messages={locale}
                    >
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
                    </IntlProvider>
                );
            }
        }

        const fragment = this.getHash();
        if (fragment) {
            resetInitialUrl(fragment);
        }
        AppRegistry.registerComponent(this.appName, () => App);
        AppRegistry.runApplication(this.appName, { rootTag: this.rootEl });
    }
}
