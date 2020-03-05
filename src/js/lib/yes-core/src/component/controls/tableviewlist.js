/*
 * @Author: gmf
 * @Date:   2016-11-26 15:26:13
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 16:59:04
 */

import BaseControl from './control';
import Immutable from 'immutable';
import { lodash as _ } from 'yes-common';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
YIUI.TableViewList = YIUI.extend(BaseControl, {
    init: function(options) {
        this.base(options);
        // this.state = this.state.set('data',Immutable.fromJS(this.data));
        this.resetData(this.data);
    },
    getColumnEditor: function(key, isGroup) {
        if (this.detailView) {
            this.detailAdapt = new YIUI.FormAdapt({
                    rootPanelObj: this.detailView, formID: this.ofFormID });
        }
        if (this.groupView) {
            this.groupAdapt = new YIUI.FormAdapt({
                    rootPanelObj: this.groupView, formID: this.ofFormID });
        }
        if (isGroup) {
            return this.groupAdapt.getComp(key);
        }
        return this.detailAdapt.getComp(key);
    },
    changeData: function(path, v)  {
        const state = this.state.setIn(['data', ...path], v);
        this.changeState(state);
    },
    resetData: function(data) {
        this.data = data;
        let state = null;
        // this.state = this.state.set('data', Immutable.fromJS(this.data));
        if (this.metaObj.GroupColumnKeys) { // 是一个合并的列表
            const keys = this.metaObj.GroupColumnKeys.split(',');
            const groupData = _.groupBy(data, (row) =>
                keys.map((key) => row[key].value
                ).join()
            );
            state = this.state.set('data', Immutable.fromJS(groupData));
        } else {
            state = this.state.set('data', Immutable.fromJS(this.data));
        }
        this.changeState(state);
    },
});
YIUI.reg('tableviewlist', YIUI.TableViewList);
export default YIUI.TableViewList;
