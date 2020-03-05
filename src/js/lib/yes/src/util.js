/*
 * @Author: gmf
 * @Date:   2016-04-11 17:04:01
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-11-16 15:33:32
 */
import AppDispatcher from './dispatchers/AppDispatcher';
import { Error } from './actions/AppStatusAction';
import BusyLoadingUtil from './components/busyLoadingWrapper';
let blurCount = 0;
const util = {
    // getCellData (rowData, column) {
    //     var index = this.getColumnIndex(rowData, column);
    //     if (index == null)
    //         return '';
    //     return rowData.getIn(['data', index, 1]);
    // },
    buildFormKey(formKey, oid) {
        var result = formKey;
        if (oid) {
            result += ('.' + oid);
        }
        return result;
    },
    // getColumnIndex (rowData, column) {
    //     var result = rowData.get('cellKeys').findEntry((item) => item == column);
    //     if (result == null) {
    //         console.log('there is no column named ' + column);
    //         return null;
    //     }
    //     return result[0];
    // },
    processError(err) {
        // if (typeof (err) == 'string') {
        //     this.alert(err);
        // }
        AppDispatcher.dispatch(Error(err));
    },
    wait(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    },
    waitBlur() {
        return new Promise((resolve, reject) => {
            if (blurCount === 0) {
                resolve();
                return;
            }
            let intval = null;
            const timeout = setTimeout(() => {
                clearInterval(intval);
                reject('timeout');
            }, 60000);
            intval = setInterval(() => {
                if (blurCount === 0) {
                    clearTimeout(timeout);
                    clearInterval(intval);
                    resolve();
                }
            }, 100);
        });
    },
    /**
     * 一般在blur事件中调用
     */
    async blurExec(fn) {
        blurCount += 1;
        try {
            await fn();
        } finally {
            blurCount -= 1;
        }
    },
    /**
     * 一般在按钮点击等事件中调用，保证blur事件对应的相应代码完成之后才执行
     */
    waitBlurExec: BusyLoadingUtil.busyLoadingWrapper(async function (fn) {
        try {
            console.log('1');
            await this.wait(2000);
            console.log('2');
            await this.waitBlur();
            console.log('3');
            await fn();
        } catch (ex) {
            util.processError(ex.message);
        }
    }),
    safeExec: BusyLoadingUtil.busyLoadingWrapper(async function (fn) {
        try {
            await fn();
        } catch (ex) {
            util.processError(ex.message);
        }
    }),
};

export default util;

export function init(utilImpl) {
    Object.assign(util, utilImpl);
}
