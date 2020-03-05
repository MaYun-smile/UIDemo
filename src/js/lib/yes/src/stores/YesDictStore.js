/*
 * @Author: gmf
 * @Date:   2016-03-28 16:56:02
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-03-29 10:08:58
 */

import Immutable from "immutable";
import { Store } from "flux/utils";
import AppDispatcher from "../dispatchers/AppDispatcher";
import _ from "underscore";
/**
 * 以树状结构保存字典数据的对象
 * @type {Immutable}
 */
var dictDataTree = new Immutable.Map();
/**
 * 以平铺方式保存字典数据的对象,用于搜索的时候
 * @type {Immutable}
 */
var dictDataPlain = new Immutable.Map();
class YESDictStore extends Store {
    onReceiveDictData(action) {
        var parentoid = action.oid;
        var dictType = action.itemKey;
        var dictGroup = dictDataPlain.get(dictType);
        if (!dictGroup) {
            dictDataPlain = dictDataPlain.set(dictType, new Immutable.Map());
        }
        dictGroup = dictDataTree.get(dictType);
        if (!dictGroup) {
            dictDataTree = dictDataTree.set(dictType, new Immutable.Map());
        }
        _.each(action.data, (item) => item.parentId = parentoid);
        var mapData = Immutable.fromJS(_.indexBy(action.data, 'OID'));
        dictDataPlain = dictDataPlain.mergeDeepIn([dictType], mapData);
        var dt = new Immutable.Map();
        dt = dt.set('' + parentoid, mapData);
        dictDataTree = dictDataTree.mergeDeepIn([dictType], dt);
    }

    getDictState(dictType, oid) {
        if (oid == null)
            oid = 0;
        return dictDataTree.getIn([dictType, '' + oid]);
    }

    getDictItem(dictType, oid) {
        if (oid == null)
            oid = 0;
        return dictDataPlain.getIn([dictType, '' + oid]);
    }

    __onDispatch(action) {
        switch (action.type) {
            case 'RECEIVEDICTDATA':
                this.onReceiveDictData(action);
                this.__emitChange();
                break;
            case 'CHANGED':
                this.__emitChange();
                break;
        }
    }
}
export default new YESDictStore(AppDispatcher);
