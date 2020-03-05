/*
 * @Author: gmf
 * @Date:   2016-06-20 16:23:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-29 17:04:21
 */
import { regControlType } from './controlUtil';
import { YIUI } from '../../YIUI-base';
import BaseControl from './control';
import Svr from '../../YIUI-svr';
import '../../YIUI-common';
import '../../YIUI-parser';

const ImageList = YIUI.extend(BaseControl, {
    //增加:默认显示image
    calculateDisplayValue: async function (v) {
        const { items, image, sourceType, promptImage, showThumbnail, maskImage } = this.getMetaObj();
        let value = items.find((item) => item.value = v);
        v = value.image;
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
        return await this.getBase64Image(displayImage);;
    },
    //增加:所有图片需要请求服务器地址,封装个方法
    getBase64Image: async function (image) {
        return await YIUI.Base64ImageService.getBase64Image(image, this.ofFormID);
    },
});
YIUI.reg('imagelist', ImageList);
regControlType(YIUI.CONTROLTYPE.IMAGELIST, 'imagelist');
export default ImageList;
