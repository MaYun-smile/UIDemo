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
    controlState: object,
    items: object,
    modalVisible: bool,
    loading: bool,
    onChangePopupState: func,
    displayValue: string,
    disabled: bool,
    onQuery: func,
    onChange: func,
    isMultipleChoice: bool,
    caption: string,
    onLoadMore: func,
    textLoading: bool,
};
