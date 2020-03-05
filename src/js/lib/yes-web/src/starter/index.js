/*
 * @Author: gmf
 * @Date:   2016-05-13 09:12:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-15 09:27:35
 */
// import App from './app/scm'
// import App from './cmcc'
// eslint-disable-next-line import/no-unresolved
import { YESInit as yesInit } from 'yes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import IndexedDBCacheAdapter from '../cacheAdapter';
import LocalStorageSessionAdapter from '../sessionAdapter';
import History from '../history';
import util from '../util';

// generate required css
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import materialIcons from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

function injectFont(font, fontName) {
    const reactNativeVectorIconsRequiredStyles = `@font-face { src:url(${font});font-family: ${fontName}; }`;
    // create stylesheet
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
    } else {
        style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
    }
    // inject stylesheet
    document.head.appendChild(style);
}
export default async function (App) {
    injectFont(fontAwesome, 'FontAwesome');
    injectFont(materialIcons, 'Material Icons');
    async function onDeviceReady() {
        injectTapEventPlugin();
        await yesInit({
            cacheAdapter: IndexedDBCacheAdapter,
            history: History,
            sessionAdapter: LocalStorageSessionAdapter,
            sessionKey: App.sessionKey,
            util,
        });
        App.start(document.getElementById('app'));
    }
    await onDeviceReady();
}
