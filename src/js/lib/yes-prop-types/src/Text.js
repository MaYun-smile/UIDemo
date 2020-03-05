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
import stylePropType, { supportingArrays } from 'react-style-proptype';

export default {
    displayValue: string,
    style: supportingArrays,
};
