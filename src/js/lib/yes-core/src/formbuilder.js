import { YIUI } from './YIUI-base';
import Form, { MetaForm } from './form';

YIUI.FormBuilder = {
    build(formObj, target, pFormID, formID) {
        const metaForm = new MetaForm(formObj);
        const form = new Form(metaForm, formID);
        form.target = target || form.target;
        form.pFormID = pFormID || form.parentID;
        // form.dealTabOrder();//手机中用不到
        return form;
    },
};

export default YIUI.FormBuilder;
