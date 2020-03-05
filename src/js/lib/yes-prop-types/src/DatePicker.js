/*eslint-disable*/
import {
    array,
    bool,
    func,
    number,
    object,
    string,
    symbol,
    any,
    arrayOf,
    element,
    instanceOf,
    node,
    objectOf,
    oneOf,
    oneOfType,
    shape,
} from 'prop-types';
/*eslint-enable*/

export default {
    value: oneOfType([
        string,
        instanceOf(Date),
    ]),
    disabled: bool,
    modalVisible: bool,
    onChange: func,
    onChangePopupState: func,
};
