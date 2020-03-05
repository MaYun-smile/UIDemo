/*
 * @Author: gmf
 * @Date:   2016-06-20 16:23:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 17:04:21
 */

import BaseControl from './control';
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import Svr from '../../YIUI-svr';
import '../../YIUI-parser';
const Image = YIUI.extend(BaseControl, {
    calculateDisplayValue: async function (v) {
        const { image, sourceType, promptImage, showThumbnail, maskImage } = this.getMetaObj();
        if (maskImage) {
            this.getMetaObj().maskImage = await this.getBase64Image(maskImage);
        }
        let displayImage;
        if (sourceType == YIUI.IMAGE_SOURCETYPE.DATA) {
            if (v === undefined || v === null || v.length == 0) {
                displayImage = promptImage ? promptImage : null
            } else {
                if (showThumbnail == false) {
                    displayImage = v
                } else {
                    let result = await this.getBase64Image("temp/" + v);
                    displayImage = result.error ? v : "temp/" + v
                }
            }
        } else {
            displayImage = v ? v : (image ? image : null)
        }
        return await this.getBase64Image(displayImage);
    },
    //所有图片需要请求服务器地址
    getBase64Image: async function (image) {
        return await YIUI.Base64ImageService.getBase64Image(image, this.ofFormID);
    },
});
YIUI.reg('image', Image);
YIUI.reg('gifimage', Image);
regControlType(YIUI.CONTROLTYPE.IMAGE, 'image');
regControlType(YIUI.CONTROLTYPE.GIFIMAGE, 'image');
export default Image;
