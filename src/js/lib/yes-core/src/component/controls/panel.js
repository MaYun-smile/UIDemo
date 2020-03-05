import { lodash as _ } from 'yes-common';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
import BaseControl from './control';

YIUI.Panel = YIUI.extend(BaseControl, {
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
	init: async function (options) {
		this.base(options);
		var items = this.items;
		const backImage = this.backImage;
		if (items) {
			delete this.items;
			this.add(items);
		}
		if (backImage) {
			this.backImage = await YIUI.Base64ImageService.getBase64Image(backImage, this.ofFormID);
		}
	},
	initItems: function () {
		if (!this.items) {
			this.items = [];
		}
	},

	add: function (comp) {
		if (comp) {
			this.initItems();
			if (_.isArray(comp)) {
				for (let cc of comp) {
					this.add(cc);
				}
				return;
			}
			if (this.get(comp.id)) return;

			var c = this.lookupComponent(comp);
			this.items.push(c);
			c.ownerCt = this;
		}
	},

	lookupComponent: function (comp) {
		if (_.isString(comp)) {
			return YIUI.ComponentMgr.get(comp);
		} else if (!(comp instanceof YIUI.Component)) {
			return YIUI.create(comp, this.defaultType);
		}
		return comp;
	},

	get: function (comp) {
		if (_.isNumber(comp)) {
			return this.items[comp];
		} else if (_.isString(comp)) {
			var items = this.items,
				item;
			for (var i = 0, len = items.length; i < len; i++) {
				item = items[i];
				if (item && (item.id === comp || item.key === comp)) {
					return item;
				}
			}
		}
		return null;
	},
	build: function (form) {
		var rootpanel = form.getRootPanel();
		this.add(rootpanel);
		form.setContainer(this);
	},
	//增加: 设置tabIndex的值
	setTabIndex(index) {
		const state = this.state.set("tabIndex", index);
		this.changeState(state)
	}
});

YIUI.reg('panel', YIUI.Panel);
YIUI.reg('tabpanel', YIUI.Panel);
YIUI.reg('separator', YIUI.Panel);
YIUI.reg('splitpanel', YIUI.Panel);
YIUI.reg('shrinkview', YIUI.Panel);
YIUI.reg('refreshcontrol', YIUI.Panel);
YIUI.reg('flowlayoutpanel', YIUI.Panel);
YIUI.reg('linearlayoutpanel', YIUI.Panel);
YIUI.reg('borderlayoutpanel', YIUI.Panel);
YIUI.reg('columnlayoutpanel', YIUI.Panel);
YIUI.reg('flexflowlayoutpanel', YIUI.Panel);
YIUI.reg('fluidtablelayoutpanel', YIUI.Panel);
regControlType(280, 'shrinkview');
regControlType(268, 'refreshcontrol');
regControlType(YIUI.CONTROLTYPE.PANEL, 'panel');
regControlType(YIUI.CONTROLTYPE.TABPANEL, 'tabpanel');
regControlType(YIUI.CONTROLTYPE.SEPARATOR, 'separator');
regControlType(YIUI.CONTROLTYPE.SPLITPANEL, 'splitpanel');
regControlType(YIUI.CONTROLTYPE.FLOWLAYOUTPANEL, 'flowlayoutpanel');
regControlType(YIUI.CONTROLTYPE.GRIDLAYOUTPANEL, 'linearlayoutpanel');
regControlType(YIUI.CONTROLTYPE.BORDERLAYOUTPANEL, 'borderlayoutpanel');
regControlType(YIUI.CONTROLTYPE.COLUMNLAYOUTPANEL, 'columnlayoutpanel');
regControlType(YIUI.CONTROLTYPE.FLEXFLOWLAYOUTPANEL, 'flexflowlayoutpanel');
regControlType(YIUI.CONTROLTYPE.FLUIDTABLELAYOUTPANEL, 'fluidtablelayoutpanel');
// YIUI.reg('stackcontainer', YIUI.Panel);

export default YIUI.Panel;
