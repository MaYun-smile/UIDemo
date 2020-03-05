/*
 * @Author: gmf
 * @Date:   2016-03-08 15:27:21
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-20 09:15:19
 */

import React, { Component } from 'react';
import AppStatus from '../../stores/AppStatus';
import { Container } from 'flux/utils';
// import { UIOptCenter } from '../../yes_ext';
import { Svr, getUserInfo, loadHistory, setSession } from 'yes-core';
import { Logined as logined, Logouted as logouted } from '../../actions/AppStatusAction';
import AppDispatcher from '../../dispatchers/AppDispatcher';
// import { getUserInfo, loadHistory } from '../../session';

const AuthenticatedRoute = (BaseComponent, LoginComponent, ToastComponent, key) => {
    class AuthenticatedComponent extends Component {
        static getStores() {
            return [AppStatus];
        }

        static calculateState() {
            return {
                state: AppStatus.getState(),
            };
        }

        async componentDidMount() {
            await loadHistory();
            // 这里需要与服务器进行环境同步，主要是根据当前前台的cookie
            // 读取后台对应的登录信息,
            if (!this.state.state.get('inited')) {
                try {
                    await loadHistory();
                    // await UIOptCenter.checkLogin();
                    await Svr.SvrMgr.loadTreeMenu();
                    // 能执行到这里说明缓存中的session没有过期，可以拿出来直接使用
                    const userinfo = getUserInfo();
                    setTimeout(() => AppDispatcher.dispatch(logined(userinfo)), 0);
                } catch (ex) {
                    setTimeout(AppDispatcher.dispatch(logouted()), 0);
                }
            }
        }

        render() {
            if (this.state.state.get('inited')) {
                if (AppStatus.isLogined()) {
                    return (<BaseComponent {...this.props} />);
                }
                return (<LoginComponent {...this.props} />);
            }
            return <ToastComponent icon="loading" show>初始化...</ToastComponent>;
        }
    }
    const result = Container.create(AuthenticatedComponent);
    if (key) {
        result.prototype.key = key;
    }
    return result;
};
export default AuthenticatedRoute;
