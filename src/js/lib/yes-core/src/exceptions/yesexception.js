export default class YESException extends Error {
    constructor(errorCode, args, msg) {
        super(msg);
        this.code = errorCode;
        this.args = args;
    }
}
