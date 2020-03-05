import YESException from './yesexception';
import { YIUI } from '../YIUI-base';
import '../YIUI-common';

export default class ComponentMissing extends YESException {
    constructor(type) {
        super(YIUI.ViewException.NO_COMPONENT, type, `Component ${type} missing!`);
    }
}
