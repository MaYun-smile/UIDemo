export class MemoryAdapter {
    constructor() {
        if (!this.tableData) {
            this.tableData = {};
        }
    }
    get(key) {
        return this.tableData[key];
    }
    put(key, val) {
        this.tableData[key] = val;
    }
    clear(){
        this.tableData={};
    }
}
export default new MemoryAdapter();
