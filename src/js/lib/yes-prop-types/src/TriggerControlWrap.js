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
import { Text } from 'react-native';
export default {
    disabled: bool.isRequired,
    textLoading: bool,
    displayValue: string,
    onChangePopupState: func,
    textStyle: Text.propTypes.style,
    isVirtual: bool.isRequired,
    onlyShow: bool,
    visible: bool,
};
