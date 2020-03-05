import { YESInit as yesInit } from 'yes';
import AsyncStorageSessionAdapter from '../sessionAdapter';
import History from '../history';
import Util from '../util';

export default function (App) {
    yesInit({
        sessionKey: App.sessionKey,
        history: History,
        sessionAdapter: AsyncStorageSessionAdapter,
        Util,
    });

    App.start();
}
