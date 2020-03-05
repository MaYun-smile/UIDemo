/**
 * 控件类型和React控件的对应关系，为了根据配置直接生成界面
 * 没一个 yigo的控件类型都要注册一个唯一的React控件.
 * 单例模式
 */
class ControlMapping {
    constructor() {
        this.data = new Map();
    }

    reg(type, Control) {
        this.data.set(type, Control);
    }

    get(type) {
        const result = this.data.get(type);
        if (!result) {
            console.log(`control ${type} not supported!`); // eslint-disable-line
        }
        return result;
    }

    getMap(){
        return this.data;
    }
}

// const defaultControlMapping = new ControlMapping();
export default ControlMapping;

