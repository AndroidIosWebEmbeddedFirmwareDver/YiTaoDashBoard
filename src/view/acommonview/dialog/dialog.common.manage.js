import {message} from 'antd';


export default class DialogCommonManage {

    /**
     * 显示默认样式消息
     * @param showMsg
     * @param duration
     */
    static  showNormalMessage = function (showMsg: String, duration: number) {
        message.info(showMsg ? showMsg : "", duration ? duration : 3)
    };


    /**
     * 显示成功样式消息
     * @param showMsg
     * @param duration
     */
    static  showSuccessMessage = function (showMsg: String, duration: number) {
        message.success(showMsg ? showMsg : "", duration ? duration : 3)
    };


    /**
     * 显示错误样式消息
     * @param showMsg
     * @param duration
     */
    static  showErrorMessage = function (showMsg: String, duration: number) {
        message.error(showMsg ? showMsg : "", duration ? duration : 3)
    };


    /**
     * 显示警告样式消息
     * @param showMsg
     * @param duration
     */
    static  showWarnMessage = function (showMsg: String, duration: number) {
        message.warn(showMsg ? showMsg : "", duration ? duration : 3)
    };


    /**
     * 显示警告样式消息
     * @param showMsg
     * @param duration
     */
    static  showWarningMessage = function (showMsg: String, duration: number) {
        message.warning(showMsg ? showMsg : "", duration ? duration : 3)
    };


    /**
     * 显示加载样式消息
     * @param showMsg
     * @param duration
     */
    static  showLoadingMessage = function (showMsg: String, duration: number) {
        message.loading(showMsg ? showMsg : "", duration ? duration : 3)
    };










}