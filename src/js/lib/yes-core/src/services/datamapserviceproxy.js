/**
 * 下推服务代理
 *  WebMapData 为 临时 后台服务， 之后会与MapData 合并。
 */
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import Svr from '../YIUI-svr';
import { lodash as $ } from 'yes-common';

export default YIUI.DataMapService = (function () {

	function _DataMapService(f){
        // this.request = new Svr.Request(f);
        this.request = Svr.Request;
	}

	/**
	 * 中间层批量下推
	 */
	_DataMapService.prototype.batchMidMap = async function(mapKey, oids) {
        var paras = {
            service: "MapData",
            cmd: "BatchMidMap",
            MapKey: mapKey,
            OIDListStr: $.toJSON(oids)
        };
        await this.request.getSyncData(null, paras);
        return true;
    };

	_DataMapService.prototype.mapData = async function(mapKey, srcFormKey, tgtFormKey, srcDoc, tgtDoc){
    	var paras = {
    		service: "WebMapData",
    		cmd: "Map",
    		mapKey: mapKey,
            tgtFormKey: tgtFormKey,
            srcFormKey: srcFormKey,
            srcDoc: $.toJSON(srcDoc),
            tgtDoc: tgtDoc ? $.toJSON(tgtDoc) : ""
        };

        return await this.request.getData(paras);
    };

	_DataMapService.prototype.midMap = async function(mapKey, oid){
    	var paras = {
    		service: "MapData",
    		cmd: "MidMap",
    		mapKey: mapKey,
            srcOID: oid
        };

        return await this.request.getData(paras);
    };

	_DataMapService.prototype.autoMap = async function(mapKey, srcDoc){
    	var paras = {
    		service: "MapData",
    		cmd: "MidMap",
    		mapKey: mapKey,
    		srcOrignalDocument: $.toJSON(srcDoc),
            saveTarget: true
        };

        return await this.request.getData(paras);
    };

	return _DataMapService;
})();