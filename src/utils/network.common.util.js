import Base64 from '../utils/base64/base64'

import DialogCommonManage from "../view/acommonview/dialog/dialog.common.manage";
import AppManagerCommonUtil from "./storage/app.manager.common.util";

/**
 *网络请求组件
 */
export default class NetworkCommonUtil {

    static NETWORKCOMMONUTIL_DEBUG_LOG = true;
    static NETWORKCOMMONUTIL_DEBUG_TAG = 'NETWORK_REQUEST_RESPONSE_DATA:\n';

    // 处理状态
    static SERVER_HTTP_TASK_STATUS_SUCCESS = 1001;
    static SERVER_HTTP_TASK_STATUS_ERROR = 1002;
    // static SERVERURL = 'http://127.0.0.1:8080'; // 服务端URL
    static SERVERURL = 'http://106.15.90.77/back/site/api'; // 服务端URL
    // static FILE_SERVERURL = 'http://192.168.2.111:8080'; // 文件服务端
    static FILE_SERVERURL = 'http://106.15.90.77:7777/YtFileCenterApi'; // 文件服务端


    //文件上传
    static API_COMMON_FILE_CREATE = NetworkCommonUtil.FILE_SERVERURL + '/site/file/cenetr/api/upload/create';
    //API_COMMON_FILE_GET_FILE+'?uid=xxxxxxxx'
    static API_COMMON_FILE_GET_FILE = NetworkCommonUtil.FILE_SERVERURL + '/site/file/cenetr/api/download/getFile';


    //分类管理
    static API_COMMON_TYPE_CREATE = NetworkCommonUtil.SERVERURL + '/back/site/api/common/type/create';
    static API_COMMON_TYPE_DELETE = NetworkCommonUtil.SERVERURL + '/back/site/api/common/type/delete';
    static API_COMMON_TYPE_FIND_ALL_BY_LEVEL = NetworkCommonUtil.SERVERURL + '/back/site/api/common/type/find';
    static API_COMMON_TYPE_FINDPAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/common/type/findPages';


    //轮播广告管理
    static API_BANAR_ADS_CONFIG_CREATE = NetworkCommonUtil.SERVERURL + '/back/site/api/asd/banar/config/create';
    static API_BANAR_ADS_CONFIG_DELETE = NetworkCommonUtil.SERVERURL + '/back/site/api/asd/banar/config/delete';
    static API_BANAR_ADS_CONFIG_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/asd/banar/config/findPages';


    //页面广告管理
    static API_PAGER_ADS_CONFIG_CREATE = NetworkCommonUtil.SERVERURL + '/back/site/api/asd/pager/config/create';
    static API_PAGER_ADS_CONFIG_DELETE = NetworkCommonUtil.SERVERURL + '/back/site/api/asd/pager/config/delete';
    static API_PAGER_ADS_CONFIG_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/asd/pager/config/findPages';


    //合作伙伴
    static API_PARTNERS_CONFIG_CREATE = NetworkCommonUtil.SERVERURL + '/back/site/api/partners/config/create';
    static API_PARTNERS_CONFIG_DELETE = NetworkCommonUtil.SERVERURL + '/back/site/api/partners/config/delete';
    static API_PARTNERS_CONFIG_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/partners/config/findPages';

    //证书模板
    static API_CERT_CHAIN_CONFIG_CREATE = NetworkCommonUtil.SERVERURL + '/back/site/api/cert/chain/config/create';
    static API_CERT_CHAIN_CONFIG_DELETE = NetworkCommonUtil.SERVERURL + '/back/site/api/cert/chain/config/delete';
    static API_CERT_CHAIN_CONFIG_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/cert/chain/config/findPages';


    //登录相关
    static API_USER_API_GENER_SMS_BY_ACCOUNT = NetworkCommonUtil.SERVERURL + '/back/site/api/user/config/gener/sms/by/account';
    static API_USER_API_LOGIN_WITH_SMS_CODE = NetworkCommonUtil.SERVERURL + '/back/site/api/user/config/login/with/sms';



    //发布审核
    // 设计需求
    static API_RELEASE_MANAGEMENT_OF_COMMONIDITY_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/commodity/order/find/pages/by/status';
    static API_RELEASE_MANAGEMENT_OF_COMMONIDITY_CHANGE_STATUS = NetworkCommonUtil.SERVERURL + '/back/site/api/commodity/order/status/update/by/admin';

    // 设计服务
    static API_RELEASE_MANAGEMENT_OF_SERVICE_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/service/order/find/pages/by/status';
    static API_RELEASE_MANAGEMENT_OF_SERVICE_CHANGE_STATUS = NetworkCommonUtil.SERVERURL + '/back/site/api/service/order/status/update/by/admin';

    // 原创商品
    static API_RELEASE_MANAGEMENT_OF_DEMAND_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/demand/order/find/pages/by/status';
    static API_RELEASE_MANAGEMENT_OF_DEMAND_CHANGE_STATUS = NetworkCommonUtil.SERVERURL + '/back/site/api/demand/order/status/update/by/admin';

    // 会员管理
    // 实名认证
    static API_RELEASE_MANAGEMENT_OF_AUTHENTICATION_FIND_PAGES = NetworkCommonUtil.SERVERURL + '/back/site/api/font/siete/user/rna/page/orders';
    static API_RELEASE_MANAGEMENT_OF_AUTHENTICATION_CHANGE_STATUS = NetworkCommonUtil.SERVERURL + '/back/site/api/font/siete/user/rna/update/rnastatus';

    /**
     * GET 网络请求
     * @param {string} url posturl地址
     * @returns {any} 返回数据
     */
    static httpGetRequest(url: string): any {
        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                    ' remember-me',
                    'Access-Token': AppManagerCommonUtil.instance().sessionId(),
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch(this.handleError);
    }

    /**
     * GET 网络请求(带请求数据)
     * @param params
     * @param {string} url posturl地址
     * @returns {any} 返回数据
     */
    static httpGetWithDataRequest(params: JSON, url: string): any {
        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                    ' remember-me',
                    'Access-Token': AppManagerCommonUtil.instance().sessionId(),
                },
                body: params
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (NetworkCommonUtil.NETWORKCOMMONUTIL_DEBUG_LOG) {
                    console.log(NetworkCommonUtil.NETWORKCOMMONUTIL_DEBUG_TAG, responseJson);
                }
                return responseJson;
            })
            .catch(this.handleError);
    }

    /**
     * POST 网络请求
     * @param params post请求参数
     * @param {string} url posturl地址
     * @returns {any} 返回数据
     */
    static httpPostRequest(params: JSON, url: string): any {
        return fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                    ' remember-me',
                    'Access-Token': AppManagerCommonUtil.instance().sessionId(),
                },
                body: params
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (NetworkCommonUtil.NETWORKCOMMONUTIL_DEBUG_LOG) {
                    console.log(NetworkCommonUtil.NETWORKCOMMONUTIL_DEBUG_TAG, responseJson);
                }
                return responseJson;
            })
            .catch(this.handleError);
    }

    static httpUpLoadImageWithProgress(params, url, onProgress): any {
        let opts = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                ' remember-me',
                'sessionId': AppManagerCommonUtil.instance().sessionId(),
            }
        };
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (let k in opts.headers || {}) {
                xhr.setRequestHeader(k, opts.headers[k]);
            }
            xhr.onload = e => res(e.target);
            xhr.onerror = rej;
            if (xhr.upload && onProgress)
                xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(params);
        });

    }


    /**
     *
     * @param image
     * @param url
     * @returns {Promise.<TResult>}
     */
    static httpUpLoadSingleImage(image, url): any {
        if (!image || !image.data || !image.path) {
            return;
        }
        // let data = image.data;
        let uri = 'file:///' + image.path;
        let index = uri.lastIndexOf("\/");
        let name = uri.substring(index + 1, uri.length);
        let formData = new FormData();
        let file = {uri: uri, type: 'multipart/form-data', name: name};   //这里的key(uri和type和name)不能改变,
        formData.append("file", file);   //这里的file就是后台需要的key
        return fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                    // 'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                    ' remember-me',
                    'Access-Token': AppManagerCommonUtil.instance().sessionId(),
                },
                body: formData,
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch(this.handleError);
    }

    /**
     *
     * @param image
     * @param url
     * @returns {Promise.<TResult>}
     */
    static httpUpLoadSingleBase64Image(image, url): any {
        if (!image || !image.data || !image.path) {
            return;
        }
        let data = image.data;
        let uri = 'file:///' + image.path;
        let index = uri.lastIndexOf("\/");
        let name = uri.substring(index + 1, uri.length);
        let params = {
            fileName: name,
            baseFileStr: data,
        };
        //NetworkCommonUtil.SERVERURL_POST_IMAGE_UPLOAD_BASE64
        return fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                    ' remember-me',
                    'Access-Token': AppManagerCommonUtil.instance().sessionId(),
                },
                body: JSON.stringify(params),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch(this.handleError);
    }

    /**
     *
     * @param imgAry {name,uri,}
     * @param url
     * @returns {Promise.<TResult>}
     */
    static httpUpLoadMultiImage(imgAry, url): any {
        let formData = new FormData();//因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
        for (let i = 0; i < imgAry.length; i++) {
            let file = {uri: imgAry[i], type: 'multipart/form-data', name: 'image.png'};   //这里的key(uri和type和name)不能改变,
            formData.append("files", file);   //这里的files就是后台需要的key
        }
        return fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With,' +
                    ' remember-me',
                    'Access-Token': AppManagerCommonUtil.instance().sessionId(),
                },
                body: formData,
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch(this.handleError);

    }

    static handleError(error: any): Promise<any> {
        // console.error('An error occurred', error); // for demo purposes only
        // console.warn('An error occurred', error); // for demo purposes only
        // ToastManager.show('' + error, ToastManager.DURATION.SHORT, ToastManager.POSITION.BOTTOM);
        return Promise.reject(error.message || error);
    }

    static baseEncode(responseJson: any) {
        if (Base64.encode) {
            // you have to explicitly extend String.prototype
            // alert(JSON.stringify(responseJson));
            return Base64.encode(JSON.stringify(responseJson));
        }
        return responseJson;
    }

    static baseDecode(encodeResponseStr: any) {
        if (Base64.decode) {
            // you have to explicitly extend String.prototype
            // alert(JSON.stringify(responseJson));
            // alert(Base64.decode(encodeResponseStr));
            return JSON.parse(Base64.decode(encodeResponseStr));
        }
        return encodeResponseStr;
    }

}

