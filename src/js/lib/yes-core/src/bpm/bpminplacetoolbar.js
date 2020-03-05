import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import '../YIUI-svr';
import '../yes-ui';
import './inplacetoolbar';
export default YIUI.BPMInplaceToolBar = (function() {
	var Return = {
		replace: function(form, operation) {
			var ret = [];
	
			var doc = form.getDocument();
			if (doc == null)
				return ret;
			var table = doc.getExpData(YIUI.BPMKeys.LoadBPM_KEY);
	
			if (table != null) {
				table = YIUI.DataUtil.fromJSONDataTable(table);
				table.first();
				var instanceID = table.getByKey(YIUI.BPMConstants.BPM_INSTANCE_ID);
				var instanceState = table.getByKey(YIUI.BPMConstants.ELEMENT_STATE);
				var processKey = table.getByKey(YIUI.BPMConstants.BPM_PROCESS_KEY);
				if ((instanceID >= 0 && instanceState == YIUI.InstanceState.SIGN) || (instanceID < 0 && processKey != null && processKey.length > 0)) {
					var caption = table.getByKey(YIUI.BPMConstants.BPM_STARTCAPTION);
					var action = table.getByKey(YIUI.BPMConstants.BPM_STARTACTION);
					if (action == null || action.length == 0) {
						action = "StartInstance(\"" + processKey + "\")";
					}
	
					var op = {};
					if( !caption) {
	                    caption = YIUI.I18N.toolbar.startUp;
					}
					op.caption = caption;
					op.action = action;
					op.key = operation.key;
                    op.tag = 'bpm';
					op.enable = operation.enableCnt || "ReadOnly()";
					op.visible = operation.visibleCnt || "";
					op.managed = true;
	
					ret.push(op);
				}
			}
	
			return ret;
		}
	};
	return Return;
})();

YIUI.BPM_TAG["BPM"] = YIUI.BPMInplaceToolBar;