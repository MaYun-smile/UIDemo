import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';

export default YIUI.Base64ImageService = (function () {
    var Return = {
        getBase64Image: async function (path, ofFormID) {
            var reg = /^\s*data:([a-z]*)+(;base64,)+([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)/;
            if (reg.test(path)) return path
            const form = YIUI.FormStack.getForm(ofFormID);
            var formKey = form ? form.getFormKey() : "";
            var params = {
                service: "Base64Image",
                path, formKey,
                r: Math.random()
            };
            return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
        }
    }
    return Return
})();