import Components from "./components";
import IndexedDBCacheAdapter from "./cacheAdapter";
import LocalStorageSessionAdapter from "./sessionAdapter";
import App from "./app";
import History from "./history";
import Styles from './style';
import start from './starter';
import Util from './util';
import { defaultControlMapping, plainControlMapping } from './controlMappings';
const ControlMappings = {
    defaultControlMapping,
    plainControlMapping,
}

const result = {
    Components,
    IndexedDBCacheAdapter,
    History,
    LocalStorageSessionAdapter,
    App,
    Styles,
    ControlMappings,
    start,
    Util,
    ...Components,
}

module.exports = result; // 此种写法属于commonjs的写法，顾老师明确说可以这么写。