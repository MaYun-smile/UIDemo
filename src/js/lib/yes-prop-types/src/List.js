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
    onClick: func,
    yigoid: string,
    primaryKey: string,
    secondKey: oneOfType([string, arrayOf(string)]),
    controlState: object,
};
