/*
 * @Author: gmf
 * @Date:   2016-03-09 10:12:13
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-06-23 09:27:15
 */

import Immutable from 'immutable';
import { Store } from 'flux/utils';
import AppDispatcher from '../dispatchers/AppDispatcher';
var status = Immutable.fromJS({
    inited: false, // 未与后台进行过交互
    logined: false,
    userinfo: {
        name: 'guest',
        id: '-1',
    },
    opendrawer: false,
    busyLoading: 0,
    busyLoadingPause: false,
    language: '',
    busyLoadingPauseCount: 0,
});
class AppStatus extends Store {
    isLogined() {
        return status.get('logined');
    }

    setState(logined, userinfo) {
        status = status.set('logined', logined);
        status = status.set('inited', true);
        if (userinfo) {
            status = status.setIn(['userinfo', 'name'], userinfo.name);
            status = status.setIn(['userinfo', 'id'], userinfo.id);
        }
        this.__emitChange();
    }

    getState() {
        return status;
    }

    setTransitionType(type) {
        status = status.set('transitionType', type);
    }

    __onDispatch(action) {
        switch (action.type) {
            case 'ERROR':
                // 当接收到未登陆信息错误的时候，需要重置状态
                if (action.error && action.error.error_code == '-2146828285') {
                    this.setState(false, {
                        name: 'guest',
                        id: '-1',
                    });
                }
                break;
            case 'LOGINED':
                this.setState(true, action.userinfo);
                break;
            case 'LOGOUTED':
                this.setState(false, {
                    name: 'guest',
                    id: '-1',
                });
                break;
            case 'OPENDRAWER':
                status = status.set('opendrawer', action.opendrawer);
                this.__emitChange();
                break;
            case 'BUSYLOADING':
                status = status.set('busyLoading', status.get('busyLoading') + (action.busyLoading ? 1 : -1));
                console.log(`action action.busyLoading=${action.busyLoading}`);
                console.log(`action status.busyLoading=${status.get('busyLoading')}`);
                this.__emitChange();
                break;
            case 'PAUSEBUSYLOADING':
                status = status.withMutations((item) =>
                    item.set('busyLoadingPause', true).set('busyLoadingPauseCount', item.get('busyLoading')).set('busyLoading', 0)
                );
                console.log(`action pauseBusyLoading=${status.get('busyLoading')}`);
                // status = status.set('busyLoading', action.busyLoading);
                this.__emitChange();
                break;
            case 'CHANGELANGUAGE':
                status = status.set('language', action.language);
                this.__emitChange();
                break;
            case 'RESUMEBUSYLOADING':
                status = status.withMutations((item) =>
                    item.set('busyLoadingPause', false).set('busyLoading', item.get('busyLoadingPauseCount'))
                );
                console.log(`action resumeBusyLoading=${status.get('busyLoading')}`);
                // status = status.set('busyLoading', action.busyLoading);
                this.__emitChange();
                break;
            default:
        }
    }
}
export default new AppStatus(AppDispatcher);
