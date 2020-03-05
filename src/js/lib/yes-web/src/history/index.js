import EventEmitter from 'eventemitter3';
import { Linking, BackAndroid, PathChange } from 'react-navigation/lib-rn/PlatformHelpers';
const navEventEmitter = new EventEmitter();
var initialURL = '';
Linking.addEventListener = (event, fn) => {
    navEventEmitter.on(event, fn);
};
Linking.removeEventListener = (event, fn) => {
    navEventEmitter.removeListener(event, fn);
};
Linking.getInitialURL = () => {
    const hash = (window || this).location.hash;
    const relativePath = hash.slice(1);
    return Promise.resolve(`://${relativePath}`);
};
BackAndroid.addEventListener = (event, fn) => {
    navEventEmitter.on(event, fn);
    return {
        remove() {
            navEventEmitter.removeListener(event, fn);
        },
    };
};
PathChange.trigger = function (event, path) {
    navEventEmitter.emit(event, path);
};
navEventEmitter.on('pathchange', function (path) {
    history.pushState({}, '', `#${decodeURIComponent(path)}`);
});
export function resetInitialUrl(url) {
    // initialUrl = url
}
export default {
    push: (url) => {
        navEventEmitter.emit('url', { url: `:\/\/${url}` });
    },
    goBack: () => {
        navEventEmitter.emit('backPress');
    },
};
window.onpopstate = function () {
    navEventEmitter.emit('backPress');
};
// BackHandler.addEventListener('hardwareBackPress', function() {
//     navEventEmitter.emit('backPress');
//     return true;
// });
