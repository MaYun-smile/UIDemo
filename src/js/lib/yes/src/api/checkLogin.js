import AppDispatcher from '../dispatchers/AppDispatcher';
import { Logined as logined } from '../actions/AppStatusAction';
import { Util, Svr } from '../yes_ext';
import { DummyDocument as document } from 'yes-common';

async function login(loginInfo, params = {}) {
    try {
        const { user, password, mode = 2 } = loginInfo;
        const result = await Svr.SvrMgr.doLogin(user, password, params, mode);
        document.clientID = result.clientID;
        if (result) {
            AppDispatcher.dispatch(logined({
                id: result.UserID,
                name: result.Name,
                clientID: result.clientID,
            }));
        }
    } catch (ex) {
        Util.processError(ex);
        // Util.alert(ex.error.error_info);
    }
}
AppDispatcher.register((action) => {
    switch (action.type) {
        case 'LOGINING':
            login(action.loginInfo);
            break;
        default:
    }
});

export default login;
