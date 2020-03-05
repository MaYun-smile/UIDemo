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
    title: string,
    message: string,
    actions: array.isRequired,
    onActionPress: func.isRequired,
};
