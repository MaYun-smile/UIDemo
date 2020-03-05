// export { NativeHistory as default } from "react-router-native";
import { addNavigationHelpers } from 'react-navigation';
import { BackHandler } from 'react-native';
import EventEmitter from 'eventemitter3';

import { Linking , BackAndroid } from 'react-navigation/src/PlatformHelpers';

const navEventEmitter = new EventEmitter();

Linking.addEventListener = (event, fn) => {
    navEventEmitter.on(event, fn);
}

Linking.removeEventListener = (event, fn) => {
    navEventEmitter.removeListener(event, fn);
}

Linking.getInitialURL = () => {
    return Promise.resolve('/');
}

BackAndroid.addEventListener = (event,fn) => {
    navEventEmitter.on(event,fn);
    return {
        remove:function(){
            navEventEmitter.removeListener(event,fn);
        }
    }
}

export default {
    push: (url) => {
        navEventEmitter.emit('url', { url: `:\/\/${url}` });
    },
    goBack:() => {
        navEventEmitter.emit('backPress');
    }
}

BackHandler.addEventListener('hardwareBackPress', function() {
    navEventEmitter.emit('backPress');
    return true;
});
