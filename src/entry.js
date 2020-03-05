/*
 * @Author: gmf
 * @Date:   2016-05-13 09:12:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-15 09:27:35
 */
// import App from './app/scm'
// import App from './cmcc'
// import App from './js/projects/demoui';
// import App from './js/projects/thgn/src';
// import App from './js/projects/yes-framework/src';
// import App from './js/projects/huayi/sr';
// import App from './js/projects/hmzs/src';
// import App from './js/projects/wechat-ui/src';
import App from './js/projects/demoui';
// import App from './js/projects/bpm/src';
import { start } from 'yes-platform';
import 'antd-mobile/dist/antd-mobile.css';

export default () => {
    if (window.cordova) {
        document.addEventListener('deviceready', () => {
            start(App);
        }, false);
    } else {
        start(App);
    }
};
