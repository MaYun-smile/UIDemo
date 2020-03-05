import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';
import { lodash as $ } from 'yes-common';
export default YIUI.BPMService = (function () {
	var Return = {
		/**
		 * 关闭流程
		 */
		killInstance: function (instanceID) {


			var params = {
				service: "BPM",
				cmd: "KillInstance",
				instanceID: instanceID
			};

			return Svr.Request.getData(params);
		},

		/**
	 * 重启流程
	 */
		restartInstance: function (instanceID) {
			var params = {
				service: "BPM",
				cmd: "RestartInstance",
				instanceID: instanceID
			};

			return Svr.Request.getData(params);
		},

		/**
 * 启动流程
 */
		startInstance: async function (formKey, oid, processKey, formDoc) {
			var doc = YIUI.DataUtil.toJSONDoc(formDoc);
			var params = {
				service: "BPM",
				cmd: "StartInstance",
				formKey: formKey,
				oid: oid,
				processKey: processKey,
				document: $.toJSON(doc)
			};

			return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
		},

		/**
	     * 直送启动
	     */
	    dirStartInstance: function(instanceID, auditResult, formDoc){
	    	var doc = YIUI.DataUtil.toJSONDoc(formDoc);
	    	var params = {
		    		service:"BPM",
		    		cmd:"DirStartInstance",
		    		InstanceID: instanceID,
		    		document: $.toJSON(doc),
		    		auditResult: auditResult
		    };

            return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
	    },
		// startInstance: function (formKey, oid, processKey) {
		// 	var params = {
		// 		service: "BPM",
		// 		cmd: "StartInstance",
		// 		formKey: formKey,
		// 		oid: oid,
		// 		processKey: processKey
		// 	};

		// 	return Svr.Request.getData(params);
		// },

		/**
 * 重启流程
 */
		restartInstanceByOID: function (oid) {
			var params = {
				service: "BPM",
				cmd: "RestartInstanceByOID",
				OID: oid
			};

			return Svr.Request.getData(params);
		},

		/**
		 * 单据对应的流程是否启动
		 */
		isInstanceStarted: function (oid) {
			var params = {
				service: "BPM",
				cmd: "IsInstanceStarted",
				OID: oid
			};
			return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			//return Svr.Request.getData(params);
		},

		/**
	 * 结束一个流程实例
	 */
		endInstance: async function (form, instanceID, userinfo) {
			form.refreshParas();
			var parameters = form.getParas();
			var params = {
				service: "BPM",
				cmd: "EndInstance",
				instanceID: instanceID,
				userInfo: userinfo
			};
			if (parameters) {
				params.parameters = parameters.toJSON();
			}
			return await Svr.Request.getData(params);
		},


		/**
 * 暂停一个流程实例
 */
		// 	pauseInstance: async function (wid) {
		// 		var params = {
		// 			service: "BPM",
		// 			cmd: "PauseInstance",
		// 			workitemID: wid
		// 		};

		// 		return await Svr.Request.getData(params);
		// 	},

		// 	/**
		//  * 取消暂停一个流程实例
		//  */
		// 	canclePause: async function (wid) {
		// 		var params = {
		// 			service: "BPM",
		// 			cmd: "CanclePause",
		// 			workitemID: wid
		// 		};

		// 		return await Svr.Request.getData(params);
		// 	},
		pauseInstance: async function (form, instanceID, userinfo) {
			form.refreshParas();
			var parameters = form.getParas();
			var params = {
				service: "BPM",
				cmd: "PauseInstance",
				instanceID: instanceID,
				userInfo: userinfo
			};

			// var def = $.Deferred();
			// var success = function (ret) {
			// 	def.resolve(ret);
			// };
			if (parameters) {
				params.parameters = parameters.toJSON();
			}
			return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			// return Svr.Request.getData(params);
		},

		/**
	 * 取消暂停一个流程实例
	 */
		resume: async function (form, instanceID, userinfo) {
			form.refreshParas();
			var parameters = form.getParas();
			var params = {
				service: "BPM",
				cmd: "Resume",
				instanceID: instanceID,
				userInfo: userinfo
			};
			if (parameters) {
				params.parameters = parameters.toJSON();
			}
			return await Svr.Request.getData(params);
		},
		/**
	 * 提交一个工作项
	 */
		commitWorkitem: async function (workitemInfo, formDoc) {
			var doc = YIUI.DataUtil.toJSONDoc(formDoc);
	        var params = {
	    		service: "BPM",
	    		cmd: "CommitWorkitem",
	    		workitemInfo: $.toJSON(workitemInfo),
	    		document:  $.toJSON(doc)
	        };

			return await Svr.Request.getData(params);
		},

		/**
 * 查询一个工作项
 */
		loadWorkitemInfo: async function (workitemID) {
			var params = {
				service: "BPM",
				cmd: "LoadWorkitemInfo",
				workitemID: workitemID
			};

			return await Svr.Request.getData(params);
		},

		/**
	 * 批量提交工作项
	 */
		batchCommitWorkitem: function (oids, result, userInfo) {
			var params = {
				service: "BPM",
				cmd: "BatchCommitWorkitem",
				OIDListStr: $.toJSON(oids),
				binaryResult: result,
				userInfo: userInfo
			};

			return Svr.Request.getData(params);
		},

		/**
	 * 批量提交工作项
	 */
		batchCommitWorkitemByWID: function (wids, result, userInfo) {
			var params = {
				service: "BPM",
				cmd: "BatchCommitWorkitemByWID",
				WIDListStr: $.toJSON(wids),
				binaryResult: result,
				userInfo: userInfo
			};

			return Svr.Request.getData(params);
		},

		/**
	 * 回滚
	 */
		rollbackToWorkitem: function (workitemID, logicCheck) {
			var params = {
				service: "BPM",
				cmd: "RollbackToWorkitem",
				workitemID: workitemID,
				logicCheck: logicCheck
			};

			return Svr.Request.getData(params);
		},

		/**
 * 跳至某个节点
 */
		skipToNode: function (workitemID, nodeID) {
			var params = {
				service: "BPM",
				cmd: "SkipToNode",
				workitemID: workitemID,
				nodeID: nodeID
			};

			return Svr.Request.getData(params);
		},

		/**
	 * 在叙事薄界面为勾选的若个单据，进行批量审批
	 */
		batchStateAction: function (processKey, actionNodeKey, oids, result, userInfo) {
			var params = {
				service: "BPM",
				cmd: "BatchStateAction",
				OIDListStr: $.toJSON(oids),
				processKey: processKey,
				binaryResult: result,
				userInfo: userInfo,
				actionNodeKey: actionNodeKey
			};

			return Svr.Request.getData(params);
		},

		/**
 * 添加代理
 */
		addDelegateData: function (delegateType, srcOperatorID, tgtOperatorID, objectType, objectKey, nodeKey, startTime, endTime, alwaysValid) {
			var params = {
				service: "BPM",
				cmd: "AddDelegateData",
				delegateType: delegateType,
				srcOperatorID: srcOperatorID,
				tgtOperatorID: tgtOperatorID,
				objectType: objectType,
				objectKey: objectKey,
				nodeKey: nodeKey,
				startTime: startTime.getTime(),
				endTime: endTime.getTime(),
				alwaysValid: alwaysValid
			};

			//return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			return Svr.Request.getData(params);
		},

		/**
 * 删除代理
 */
		deleteDelegateData: function (delegateID) {
			var params = {
				service: "BPM",
				cmd: "DeleteDelegateData",
				delegateID: delegateID
			};

			return Svr.Request.getData(params);
		},
		/**
 * 修改代理
 */
		updateDelegateDataState: function (delegateID, onUse) {
			var params = {
				service: "BPM",
				cmd: "UpdateDelegateDataState",
				delegateID: delegateID,
				onUse: onUse
			};

			return Svr.Request.getData(params);
		},
		/**
	 * 注册附件
	 */
		registerAttachment: function (oid, key, attachmentOID, attachmentInfo, attachmentPara) {
			var params = {
				service: "BPM",
				cmd: "RegisterAttachment",
				OID: oid,
				Key: key,
				AttachmentOID: attachmentOID,
				AttachmentInfo: attachmentInfo,
				AttachmentPara: attachmentPara
			};
			return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			//return Svr.Request.getData(params);
		},

		/**
	 * 生成当前流程运转路径
	 */
		loadProcessPath: function (oid) {
			var params = {
				service: "BPMDefService",
				cmd: "LoadProcessPath",
				OID: oid
			};
			return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			//return Svr.Request.getData(params);
		},
		/**
	 * 在指定的工作项上发起加签动作，会产生一个新的加签工作项，只有这个加签工作项被提交了，当前工作项才可以被提交
	 */
		launchTask: function (wid, nodeKey, ppObject, launchInfo, hideActiveWorkitem) {
			var params = {
				service: "BPMExtend",
				cmd: "LaunchTask",
				WorkitemID: wid,
				NodeKey: nodeKey,
				HideActiveWorkitem: hideActiveWorkitem,
				LaunchInfo: launchInfo,
				PPObject: $.toJSON(ppObject.toJSON())
			};
			//return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			return Svr.Request.getData(params);
		},
		/**
	 * 在指定的工作项上发起加签动作，会产生一个新的加签工作项，只有这个加签工作项被提交了，当前工作项才可以被提交
	 */
		endorseTask: async function (wid, operatorID, launchInfo, hide) {
			var params = {
				service: "BPMExtend",
				cmd: "EndorseTask",
				WorkitemID: wid,
				OperatorID: operatorID,
				LaunchInfo: launchInfo,
				HideActiveWorkitem: hide
			};
			return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			//return Svr.Request.getData(params);
		},
		endorseTask: function (wid, operatorID, launchInfo) {
			var params = {
				service: "BPMExtend",
				cmd: "EndorseTask",
				WorkitemID: wid,
				OperatorID: operatorID,
				LaunchInfo: launchInfo
			};
			//return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
			return Svr.Request.getData(params);
		},
		/**
	 * 移交工作项
	 */
		transferTask: async function(wid, operatorID, createRecord, userinfo, auditResult, srcOperator, transferType) {
	        var params = {
	    		service: "BPMExtend",
	    		cmd: "TransferTask",
	    		WorkitemID: wid,
	    		OperatorID: operatorID,
	    		CreateRecord: createRecord,
	    		UserInfo: userinfo,
	    		AuditResult: auditResult,
	    		SrcOpt:srcOperator,
	    		TransferType:transferType
	        };
			return await Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
            // return Svr.Request.getData(params);
	    },
		transferToNode: async function(workiteminfo, formDoc) {
	    	var doc = YIUI.DataUtil.toJSONDoc(formDoc);
	    	var params = {
		    		service:"BPM",
		    		cmd:"TransferToNode",
		    		workiteminfo: $.toJSON(workiteminfo),
		    		document: $.toJSON(doc)
		    };

            return await Svr.Request.getData(params);
	    },
		// transferTask: function (wid, operatorID, createRecord) {
		// 	var params = {
		// 		service: "BPMExtend",
		// 		cmd: "TransferTask",
		// 		WorkitemID: wid,
		// 		OperatorID: operatorID,
		// 		CreateRecord: createRecord
		// 	};
		// 	//return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, params);
		// 	return Svr.Request.getData(params);
		// },
		/**
		 * 根据参数获取指定单据对应的别名单据
		 * 现在系统中会为手机实现一个Alias单据
		 */
		getAliasKey: async function (platform, formKey) {
			const params = {
				cmd: "GetAliasKey",
				service: "WebMetaService",
				PlatForm: platform || 'mobile',
				FormKey: formKey
			}
			return await Svr.Request.getData(params);
		}
	}
	return Return;
})();