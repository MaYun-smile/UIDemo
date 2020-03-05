/**
 * @providesModule yes
 */
import { injectDispatcher } from 'yes-core';
// export * from './yes_ext'
// export * from './datacontrols'
import AppDispatcher from './dispatchers/AppDispatcher';
export { AppDispatcher };
export ControlWrap from './components/ControlWrap';
export StyleAttributeWrap from './components/StyleAttributeWrap';
export AuthenticatedRouteWrap from './components/AuthenticatedRoute';
export RefreshControlWrap from './components/RefreshControlWrap';
export DictWrap from './components/DictWrap';
export ListWrap from './components/ListWrap';
export GridWrap from './components/GridControlWrap';
export GridRowWrap from './components/GridRowWrap';
export ListRowWrap from './components/ListRowWrap';
export ComboboxWrap from './components/ComboboxWrap';
export MetaControlWrap from './components/MetaControlWrap';
export MetaBillFormWrap from './components/MetaBillFormWrap';
export controlVisibleWrapper from './components/ControlVisibleWrapper';
export equalVisibleWrapper from './components/VisibleEqual.js';
export notEmptyVisibleWrapper from './components/VisibleNotEmpty.js';
export TableViewRowWrap from './components/TableViewRowWrap';
export TableViewRowItemWrap from './components/TableViewRowItemWrap';
export PanelWrap from './components/PanelWrap';
export LoginWrap from './components/LoginWrap';
export WorkitemWrap from './components/YESWorkitem';
export App from './app';
export BillFormWrap from './components/YESBillForm';
export DynamicBillFormWrap from './components/DynamicBillFormWrap';
export ControlMapping from './components/util/defaultControlMapping';
export AbstractApp from './app';
export DynamicControl from './components/DynamicControl';
export LayoutWrap from './components/LayoutWrap';
export OperationWrap from './components/OperationWrap';
export languageWrapper from './components/languageWrapper';
export internationalWrap from './components/InternationalWrap';
export BusyLoadingUtil from './components/busyLoadingWrapper';
export * as propTypes from 'yes-prop-types';
export BillformStore from './stores/BillFormStore';
export AppStatusStore from './stores/AppStatus';
export getMappedComponentHOC from './getMappedComponentHOC';
export Util from './util';
export BackHandler from './api/HardwareBackButton';
export attachmentActionWrap from './components/Attachment/AttachmentWrap';
export TextWrap from './components/TextWrap';
export DefaultListRow from './components/DefaultListRow';

import { cacheSystem, injectServer, injectEncrypt, injectConfirm } from 'yes-core';
import { InitSession } from 'yes-core';
import { InitHistory } from './history';
import { init as InitUtil } from './util';
injectDispatcher(AppDispatcher);
window.dispather = AppDispatcher;

export async function YESInit(options) {
    injectEncrypt(options.util.encrypt);
    injectConfirm(options.util.confirm);
    await cacheSystem.injectCache(options.cacheAdapter);
    // TODO injectSession
    // TODO initSession
    await InitSession(options.sessionKey, options.sessionAdapter);
    InitHistory(options.history);
    InitUtil(options.util);
    InitUtil({
        cacheGet: options.sessionAdapter.getItem,
        cacheSet: options.sessionAdapter.setItem,
    });
}
