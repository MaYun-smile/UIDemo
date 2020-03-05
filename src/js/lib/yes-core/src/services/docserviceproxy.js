import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';
import { lodash as $ } from 'yes-common';
export default YIUI.DocService = (function () {
	// var cache = new YIUI.DocCache();
    // var reqMap = {};

	var Return = {
		/**
		 * 创建一个doc，头表新增一行。
		 */
	    newDocument: async function(formKey) {
            // if(!reqMap[formKey]){
            //     reqMap[formKey] = cache.get(formKey)
	         //                        .then(function(doc){
	         //                                if(doc){
	         //                                    return doc;
	         //                                }else{
            //
	         //                                }
	         //                        },function(error){
	         //                            console.log('error ......'+error);
	         //                        }).then(function(doc){
	         //                        	return YIUI.DataUtil.fromJSONDoc(doc);
	         //                        }).always(function(){
	         //                            setTimeout(function(){
	         //                                delete reqMap[formKey];
	         //                            },100);
	         //                        });
            // }
            //
            // return reqMap[formKey];
            var params = {
                cmd: "NewDocument",
                service: "DealWithDocument",
                formKey: formKey
            };

            return await Svr.Request.getData(params, null, false);
        },

	    // see remoteService.loadbyform
	    loadFormData: async function(form, oid, filterMap, condParas) {
	    	if(!form){
	    		throw new Error(YIUI.I18N.docserviceproxy.notNull);
	    	}

	    	await form.refreshParas();
        	var parameters = form.getParas();

    		var params = {
        		cmd: "",
        		service: "LoadFormData",
        		oid: oid,
                formKey: form.getFormKey()
            };

    		if(parameters){
    			params.parameters = parameters.toJSON();
    		}
    		if(filterMap){
                filterMap.OID = oid;
    			params.filterMap = $.toJSON(filterMap);
    		}
    		if(condParas){
    			params.condition = $.toJSON(condParas);
			}
			var _loadInfo = form.getSysExpVals(YIUI.BPMKeys.LOAD_WORKITEM_INFO);
    		if( _loadInfo != undefined ) {
    			params.loadWorkItemInfo = _loadInfo;
			}
            var templateKey = form.getTemplateKey();
    		if(templateKey){
    			params.templateKey = templateKey;
    		} 
            return await Svr.Request.getData(params,null,false);
        },

        // see remoteService.deletebyform
       	deleteFormData: function(formKey, oid) {
	        var params = {
	    		cmd: "DeleteFormData",
	    		service: "DeleteData",
	            formKey: formKey,
	            oid: oid
	        };
	        //return Svr.Request.getData(params);
	        return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
	    },

	    saveFormData: function(form) {
	    	form.refreshParas();
        	var parameters = form.getParas();

	        var formDoc = form.getDocument();
	        var docJson = YIUI.DataUtil.toJSONDoc(formDoc);

	        var params = {
	    		cmd: "",
	    		service: "SaveFormData",
	            formKey: formKey,
	          	document: $.toJSON(docJson)
	        };

	        if(parameters){
    			params.parameters = parameters.toJSON();
    		}

	        //return Svr.Request.getData(params);
	        return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
	    }
	}
	return Return;
})(); 