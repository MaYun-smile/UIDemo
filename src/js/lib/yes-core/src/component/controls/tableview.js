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
        this.state = this.state.set('items', this.items);
    }
});
YIUI.reg('tableview', YIUI.TableViewList);
export default YIUI.TableViewList;
