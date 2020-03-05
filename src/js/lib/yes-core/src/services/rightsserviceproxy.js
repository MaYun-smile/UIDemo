import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';

YIUI.RightsService = (function () {
    var _default = {
        service: "SessionRights",
        cmd: "LoadFormRights",
    }

    var Return = {
		/**
		 * 表单字段，操作权限
		 */
        loadFormRights: async function (formKey, params) {
            const newParams = Object.assign({}, _default, params);

            return await Svr.Request.getData(newParams);
        }
    }
    return Return;
})();
