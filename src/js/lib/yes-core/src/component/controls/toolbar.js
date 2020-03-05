/*
 * @Author: gmf
 * @Date:   2016-03-18 09:58:48
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-03-18 14:27:15
 */

import BaseControl from './control';
import empty from 'empty';
import Immutable from 'immutable';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
const Toolbar = YIUI.extend(BaseControl, {
    handler: YIUI.ListViewHandler,
    repaint: empty.func,
    init: function (options) {
        this.base(options);
        this.isDefault = this.getMetaObj().isDefault == null ? true : this.getMetaObj().isDefault;
        this.state = this.state.set('items', Immutable.fromJS(this.items || []));
    },
    setItemVisible: function (key, visible) {
        const optItem = this.state.get('items').find((item) => item.get('key') === key);
        if (optItem) {
            const index = this.state.get('items').indexOf(optItem);
            const state = this.state.setIn(['items', index, 'visible'], visible);
            this.changeState(state);
        }
    },
    setItemEnable: function (key, enable) {
        const optItem = this.state.get('items').find((item) => item.get('key') === key);
        if (optItem) {
            const index = this.state.get('items').indexOf(optItem);
            const state = this.state.setIn(['items', index, 'enable'], enable);
            this.changeState(state);
        }
    },
    setItems: function (items) {
        this.items = items;
        const state = this.state.set('items', Immutable.fromJS(items));
        this.changeState(state);
    },
    hasItem: function (key) {
        const optItem = this.state.get('items').find((item) => item.get('key') === key);
        return optItem;
    },
    addItem: function (item) {
        const index = this.state.get('items').size;
        const state = this.state.setIn(['items', index], Immutable.fromJS(item));
        this.changeState(state);
        if (item.items) {
            this.getEveryItem(item.items, index);
        }
    },

    getEveryItem: function (items, index) {
        for (let i = 0; i < items.length; i++) {
            let state = this.state.setIn(['items', index + i + 1], Immutable.fromJS(items[i]));
            this.changeState(state);
            if (items[i].items) {
                this.getEveryItem(items[i].items, index + i + 1)
            }
        }
    },
    getItems: function () {
        return this.getState.get('items');
    },
    clear: function (item) {
        this.setItems([]);
    },
});
YIUI.reg('toolbar', Toolbar);
regControlType(YIUI.CONTROLTYPE.TOOLBAR, 'toolbar');
export default Toolbar;
