import wx from 'wx';
import wXPermissionVerification from '../wXPermissionVerification';

const uploadImageToYigo = async (serverId) => {
    return 'fakeData';
    // TODO 跟后端约定参数和返回值
    const data = {
        serverId,
    };
    try {
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        res = res.json();
        // TODO 如果返回失败，reject
        const fakeSuccess = true;
        if (fakeSuccess) {
            return res;
        } else {
            return Promise.reject(res);
        }
    } catch (e) {
        throw (e);
    }
};

const uploadImageToWechat = (localId) => {
    return new Promise((resolve, reject) => {
        wx.uploadImage({
            localId,
            isShowProgressTips: 1,
            success: (res) => {
                resolve(res);
            },
            fail: (r) => {
                reject(r.errMsg);
            },
            cancel: (r) => {
                reject(r.errMsg);
            },
        });
    });
};

const chooseImage = (sourceType) => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: 1, // czs说不支持多选
            sourceType,
            success: (res) => {
                resolve(res);
            },
            fail: (r) => {
                reject(r.errMsg);
            },
            cancel: (r) => {
                reject(r.errMsg);
            },
        });
    });
};

/*
* controlKey: 控件的key
* isUpload: 是否上传
* formKey: 上传的fromKey
* oid: 上传的oid
* isUpdateDB: 是否更新数据库
*
* */

const photo = (sourceType) => {
    return async (controlKey, isUpload, formKey, oid, isUpdateDB) => {
        // TODO delete fake 'isUpload'
        isUpload = true;
        const jsApiList = ['chooseImage', 'uploadImage'];
        await wXPermissionVerification.register(jsApiList);
        try {
            const chooseImageResponse = await chooseImage(sourceType);
            if (isUpload) {
                const uploadImageToWechatResponse = await uploadImageToWechat(chooseImageResponse.localIds[0]);
                const uploadImageToYigoResponse = await uploadImageToYigo(uploadImageToWechatResponse.serverId);
                return uploadImageToYigoResponse;
            }
        } catch (e) {
            throw e;
        }
    };
};
const takePhoto = photo(['camera']);
const selectPhoto = photo(['album']);
export {
    takePhoto,
    selectPhoto,
};
