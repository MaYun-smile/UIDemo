import { lodash as _ } from 'yes-common';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
// import { regControlType } from './controlUtil';
import BaseControl from './control';

YIUI.StackContainer = YIUI.extend(BaseControl, {
	/** 如果items未定义type，默认为component */
	defaultType: 'component',
	/** 容器中子控件布局方式 */
	layout: 'auto',

	// overflowX: 'visible',

	// overflowY: 'visible',

	// backImage: '',

	// backImagePosition: '',

	// isBackImageRepeatX: false,

	// isBackImageRepeatY: false,

	// padding: 1,
	init: function (options) {
		this.base(options);
		this.state = this.state.merge({
			formKey: '',
			oid: '',
		});
	},
	build: function (form) {
		// var rootpanel = form.getRootPanel();
		// this.add(rootpanel);
		// form.setContainer(this);
	},
	open(formKey, oid) {
		this.formID = YIUI.Form_allocFormID();
		const state = this.state.merge({
			formKey,
			oid,
			formID: this.formID,
		});
		this.changeState(state);
	},
	getActivePane() {
		return YIUI.FormStack.getForm(this.formID);
	},
});

YIUI.reg('stackcontainer', YIUI.StackContainer);

export default YIUI.StackContainer;
