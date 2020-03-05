/*
 * @Author: gmf
 * @Date:   2016-06-06 14:57:23
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-07 17:18:23
 */

export function FetchDict(dictType, filter, fuzzyValue, page) {
    return {
        type: 'FETCHDICT',
        dictType, filter, fuzzyValue, page,
    };
}
export function ReceiveDict(dictType, filter, fuzzyValue, page, data) {
    return {
        type: 'RECEIVEDICT',
        dictType, filter, fuzzyValue, page, data,
    };
}
