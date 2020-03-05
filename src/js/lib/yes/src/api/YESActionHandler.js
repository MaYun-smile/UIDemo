/*
 * @Author: gmf
 * @Date:   2016-11-16 14:19:09
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-21 09:19:13
 */

import AppDispatcher from '../dispatchers/AppDispatcher';
import { Logined as logined } from '../actions/AppStatusAction';
import { Util, Svr } from '../yes_ext';
import { DummyDocument as document } from 'yes-common';
import getHistory from '../history';

async function login(loginInfo, paras = {}) {
    // try {
    const { user, password, mode = 2 } = loginInfo;
    const result = await Svr.SvrMgr.doLogin(user, password, paras, mode);
    document.clientID = result.clientID;
    if (result) {
        AppDispatcher.dispatch(logined({
            id: result.UserID,
            name: result.Name,
            clientID: result.clientID,
        }));
    }
    // } catch (ex) {
    // Util.processError(ex);
    // Util.alert(ex.error.error_info);
    // }
}
AppDispatcher.register((action) => {
    switch (action.type) {
        case 'OPENWORKITEM':
            const wid = action.wid;
            setTimeout(() => {
                getHistory().push(`card/WORKITEM/${wid}/${action.onlyShow}/${action.loadInfo}`);
            });
            break;
        // case 'OPENCLIENTFORM':
        //     const formKey = action.formKey;
        //     const OID = action.oid;
        //     const status = action.status || 'EDIT';
        //     // let mobileFormKey = await YIUI.BPMService.getAliasKey(1,formKey);
        //     // if(formKey==mobileFormKey){
        //     setTimeout(() => {
        //         getHistory().push(`card/YES/${formKey}/${OID}/${status}/0`);
        //     });
        //     // }else{
        //     // getHistory().push(`card/YESMOBILE/${formKey}/${OID}/EDIT`);
        //     // }
        //     // getHistory().push(`/YES/${action.formKey}/${action.oid}/EDIT`);
        //     break;
        case 'OPENFORM':
            const formKey = action.formKey;
            const OID = action.oid;
            // let mobileFormKey = await YIUI.BPMService.getAliasKey(1,formKey);
            // if(formKey==mobileFormKey){
            setTimeout(() => {
                getHistory().push(`card/YES/${formKey}/${OID}/EDIT`);
            });
            // }else{
            // getHistory().push(`card/YESMOBILE/${formKey}/${OID}/EDIT`);
            // }
            // getHistory().push(`/YES/${action.formKey}/${action.oid}/EDIT`);
            break;
        case 'CLOSEFORM':
            setTimeout(() => {
                getHistory().goBack();
            }, 0);
            break;
        case 'LOGINING':
            Util.safeExec(async () => {
                await login(action.loginInfo);
            });
            // login(action.loginInfo);
            break;
        default:
    }
});
