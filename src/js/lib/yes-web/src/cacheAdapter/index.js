import idb from 'idb';
const dbName = 'yes';
const objectStoreList = [
    {
        name: 'form',
        options: {
            keyPath: 'key',
        },
    },
    {
        name: 'formright',
        options: {
            keyPath: 'key',
        },
    },
    {
        name: 'formdata',
        options: {
            keyPath: 'key',
        },
    },
    {
        name: 'dict',
        options: {
            keyPath: 'key',
        },
    },
    {
        name: 'setting',
        options: {
            keyPath: 'key',
        },
    },
];
class IndexedDBAdapter {
    constructor() {
        this.dbName = dbName;
        this.tables = objectStoreList;

        if (!this.db) {
            const dbPromise = idb.open(dbName, 1, upgradeDB => {
                for (const table of this.tables) {
                    upgradeDB.createObjectStore(table.name, table.options);
                }
            });
            this.db = {
                get(objectStoreName, key) {
                    return dbPromise.then((db) => db.transaction(objectStoreName).objectStore(objectStoreName).get(key));
                },
                set(objectStoreName, key, val) {
                    return dbPromise.then(db => {
                        const tx = db.transaction(objectStoreName, 'readwrite');
                        tx.objectStore(objectStoreName).put(val);
                        return tx.complete;
                    });
                },
                clear(objectStoreName) {
                    dbPromise.then(db => db.transaction(objectStoreName, 'readwrite').objectStore(objectStoreName).clear());
                },
                getAll(objectStoreName) {
                    dbPromise.then(db => db.transaction(objectStoreName).objectStore(objectStoreName).getAll()).then(allObjs => console.log(JSON.stringify(allObjs)));
                },
            };
            window.idb = this.db;
            // 下面的代码应该在项目中，不应该在此处（yes-web）。
            if (true) {
                return;
            }
            for (const table of this.tables) {
                const storeName = table.name;
                let DataofStoreName = storeName.charAt(0).toUpperCase() + storeName.slice(1);
                DataofStoreName = `Dataof${DataofStoreName}`;
                localData[DataofStoreName].forEach((item) => {
                    if (!this.db.get(storeName, item.key)) {
                        // console.log(`ObjectStore: ${storeName}, set ${item.key}`);
                        this.db.set(storeName, item.key, item);
                    }
                });
            }
        }
    }
    async get(key, tableName) {
        const v = await this.db.get(tableName, key);
        return v;
    }
    put(key, val, tableName) {
        this.db.set(tableName, key, val);
    }
    clear(tableName) {
        this.db.clear(tableName);
    }
}
export default new IndexedDBAdapter();
