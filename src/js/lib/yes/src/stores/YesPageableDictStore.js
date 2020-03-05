/*
 * @Author: gmf
 * @Date:   2016-06-06 14:45:41
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-08 15:35:25
 */

import Immutable from "immutable";
import {Store} from "flux/utils";
import {UIHandler} from "../yes_ext";
import AppDispatcher from "../dispatchers/AppDispatcher";
import _ from "underscore";
import md5 from "md5";
import {ReceiveDict} from "../actions/DictAction";
/**
 * 以平铺方式保存字典数据的对象,用于搜索的时候
 * dictType
 *    |--filterHash(MD5)
 *         |--fuzzyValue
 *               |----0
 *               |    |---status//[loading,loaded]
 *               |    |---data
 *               |----1
 *               |----...
 * @type {Immutable}
 */
var dictDataPlain = new Immutable.Map();
var dictKeyMap = new Immutable.Map();
const ROWS_PER_PAGE = 20;
/**
 * 这个是链式字典的store
 */
class YESDictStore extends Store {
    onReceiveDictData(action) {
        var filterKey = md5(JSON.stringify(action.filter));
        var mapData = Immutable.fromJS(action.data.data);
        dictDataPlain = dictDataPlain.updateIn([action.dictType, filterKey, action.fuzzyValue, action.page], item => item.set('status', 'loaded').set('data', mapData)
        );
        var dictGroup = dictKeyMap.get(action.dictType);
        if (!dictGroup) {
            dictKeyMap = dictKeyMap.set(action.dictType, new Immutable.Map());
        }
        var keyMapData = Immutable.fromJS(_.indexBy(action.data.data, 'OID'));
        dictKeyMap = dictKeyMap.mergeDeepIn([action.dictType], keyMapData);
    }

    onStartFetchingData(action) {
        var filterKey = md5(JSON.stringify(action.filter));
        if (!dictDataPlain.getIn([action.dictType])) {
            dictDataPlain = dictDataPlain.setIn([action.dictType], new Immutable.Map());
        }
        if (!dictDataPlain.getIn([action.dictType, filterKey])) {
            dictDataPlain = dictDataPlain.setIn([action.dictType, filterKey], new Immutable.Map());
        }
        if (!dictDataPlain.getIn([action.dictType, filterKey, action.fuzzyValue])) {
            dictDataPlain = dictDataPlain.setIn([action.dictType, filterKey, action.fuzzyValue],
                new Immutable.List());
        }
        dictDataPlain = dictDataPlain.setIn([action.dictType, filterKey, action.fuzzyValue, action.page], Immutable.fromJS({
            status: 'loading',
            data: []
        }));
    }

    /**
     * 根据输入参数返回Store中已经存在的字典数据
     * @param  {string} dictType   字典metaKey
     * @param  {string} fuzzyValue 界面输入的模糊过滤条件
     * @param  {object} filter     其他关联过滤条件
     * @return {Immutable.Map}     返回字典信息
     */
    getDictState(dictType, fuzzyValue, filter) {
        var filterKey = md5(JSON.stringify(filter));
        return dictDataPlain.getIn([dictType, filterKey, fuzzyValue]);
    }

    getDictItem(dictType, oid) {
        if (oid == null)
            oid = 0;
        return dictKeyMap.getIn([dictType, '' + oid]);
    }

    async __onDispatch(action) {
        switch (action.type) {
            case 'FETCHDICT':
                this.onStartFetchingData(action);
                this.__emitChange();
                var result = await UIHandler.getQueryData(action.dictType,
                    action.page * ROWS_PER_PAGE,
                    ROWS_PER_PAGE,
                    action.fuzzyValue || '',
                    true,
                    action.filter,
                    {'oid': '0', 'itemKey': action.dictType, 'caption': ''}
                );
                AppDispatcher.dispatch(ReceiveDict(action.dictType, action.filter,
                    action.fuzzyValue, action.page, result));
                break;
            case 'RECEIVEDICT':
                this.onReceiveDictData(action);
                this.__emitChange();
        }
    }
}
export default new YESDictStore(AppDispatcher);
