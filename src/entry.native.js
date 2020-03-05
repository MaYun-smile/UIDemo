import App from './js/projects/thgn';
import { YESInit as yesInit } from './js/lib/yes';
import { AsyncStorageSessionAdapter, History, Util } from './js/lib/yes-native';

yesInit({
    sessionKey: App.sessionKey,
    history: History,
    sessionAdapter: AsyncStorageSessionAdapter,
    Util,
});

App.start();
