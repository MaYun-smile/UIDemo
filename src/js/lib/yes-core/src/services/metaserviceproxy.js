import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';
export default YIUI.MetaService = (function () {
	var Return = {
		/**
		 * 获取web配置对象
		 */
	    getMetaForm: async function(formKey) {
            //这里的formKey可能会带有一个templateKey用于反向模版类单据显示
            let [fKey,tKey] = formKey.split('|');
            var params = {
                cmd: "GetForm",
                service: "WebMetaService",
                formKey: fKey,
                templateKey:tKey,
            };
            return await Svr.Request.getData(params);
        },

	    /**
		 * 根据EntryPath获取web配置对象
		 */
	    getMetaFormByEntry: async function(entryPath) {
			var params = {
				cmd: "GetFormByEntry",
				service: "WebMetaService",
			    path: entryPath
			};
			return await Svr.Request.getData(params);

			// var key = "getMetaFormByEntry_"+entryPath;
			
			// if(!reqMap[key]){
			//     reqMap[key] = cache.get(key)
			//                         .then(function(metaForm){
			//                                 if(metaForm){
			//                                     return metaForm;
			//                                 }else{
			// 									var params = {
			// 										cmd: "GetFormByEntry",
			// 										service: "WebMetaService",
			// 									    path: entryPath
			// 									};

			//                                     return Svr.Request.getData(params).then(function(data){
			//                                         cache.put(key, data);
			//                                         return data;
			//                                     }); 
			//                                 }
			//                         },function(error){
			//                             console.log('error ......'+error);
			//                         }).always(function(){
			//                             setTimeout(function(){
			//                                 delete reqMap[key];
			//                             },100);
			//                         });
			// }

			// return reqMap[key];  

	    },

	    /**
		 * 获取预加载表单列表
		 */
	    getPreLoadItems: function() {
	        var params = {
	    		cmd: "GetPreLoadItems",
	    		service: "WebMetaService"
	        };
	        return Svr.Request.getData(params);
	    },

	   	/**
		 * 获取菜单
		 */
	    getEntry: function(rootEntry, appKey) {
	        var params = {
	    		cmd: "GetEntry",
	    		service: "WebMetaService",
	    		rootEntry: rootEntry,
	    		appKey: appKey
	        };
	        return Svr.Request.getData(params);
	    },

	   	/**
		 * 获取ParaGroup
		 */ 
	    getParaGroup: function(groupKey, formKey){
	        var paras = {
	                service: "WebMetaService",
	                cmd: "GetParaGroup",
	                formKey: formKey,
	                groupKey: groupKey
	            };
	        return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
	    },

	    getClientAppStatusInfo: function(){
	    	var params = {
	    		cmd: "GetClientAppStatusInfo",
	    		service: "WebMetaService"
	        };
	        return Svr.Request.getData(params);
	    },

	    getServerList: function(){
	    	var params = {
	    		service: "GetServerList"
	        };
	        return Svr.Request.getData(params);
	    }
	}
	return Return;
})(); 