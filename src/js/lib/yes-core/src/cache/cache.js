import EventEmitter from 'eventemitter3';
// Table Access 数据访问
// tableName 表名
class TableAccess extends EventEmitter {
    constructor(adapter, tableName, fetchFn, cacheFirst = true) {
        super();
        this.fetchFn = fetchFn;
        this.tableName = tableName;
        this.adapter = adapter;
        this.cacheFirst = cacheFirst;//默认加载规则，cacheFirst = true的时候先读取Cache 
    }
    // 此处table为数据表，不是html中的table
    fetchingItems = []
    async get(key, replace = false, args) {
        let result = await this.adapter.get(key, this.tableName);
        if (result && (!result.time || Date.now() - result.time > 3600000)) {
            result = null;
        }
        if (this.cacheFirst && result && !replace) {
            return result.data;
        }
        // if (!result || replace) {
        if (!this.fetchFn) {
            return null;
        }
        try {
            if (this.fetchingItems.includes(key)) {
                // 当前指定的key正在获取中，重复的请求不处理，等待之前的任务完成或者超时
                result = await this.wait(key);
            } else {
                this.fetchingItems.push(key);
                try {
                    result = await this.fetchFn(this.tableName, key, args);
                    this.emit('receive', key, result);
                } finally {
                    const index = this.fetchingItems.indexOf(key);
                    this.fetchingItems.splice(index, 1);
                }
                // console.log('fetch item: ', this.fetchingItems);
                // console.log('receive: ',key);
            }
            result.time = Date.now();
            await this.put(key, result);
        } catch (ignore) {
            //当出现错误的时候，如果有Cache则返回Cache的内容
            console.log(ignore);
            if (!result) {
                throw ignore;
            }
        }
        // }
        return result ? result.data : null;
    }
    async put(key, val) {
        await this.adapter.put(key, val, this.tableName);
    }
    clear() {
        this.adapter.clear(this.tableName);
    }
    wait(key) {
        return new Promise((resolve, reject) => {
            const fn = (receiveKey, receiveValue) => {
                // console.log(key,' === ',receiveKey, `${key === receiveKey}`);
                if (key === receiveKey) {
                    // console.log('wait: ',key);
                    // console.log('clearTimeout');
                    clearTimeout(timer);
                    resolve(receiveValue);
                }
            };
            const fnTimeout = () => {
                // console.log(Date.now());
                this.removeListener('receive', fn);
                // console.log('timeout: ',key);
                reject('timeout');
            };
            this.on('receive', fn);
            // console.log(`${key}:::BEGIN:::`,Date.now());
            const timer = setTimeout(fnTimeout, 2 * 1000);
        });
    }
}
export default TableAccess;
