export default class PatterCommonUtil {

    /**
     * 正则表达式：验证用户名
     */
    static REGEX_USERNAME = "^[a-zA-Z]\\w{5,17}$";

    /**
     * 正则表达式：验证密码
     */
    static REGEX_PASSWORD = "^[a-zA-Z0-9]{6,16}$";

    /**
     * 正则表达式：验证手机号
     */
    static REGEX_MOBILE = "^((13[0-9])|(15[^4,\\D])|(18[0-9])|(17[0-9]))\\d{8}$";

    /**
     * 正则表达式：验证邮箱
     */
    static REGEX_EMAIL = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";

    /**
     * 正则表达式：验证汉字
     */
    static REGEX_CHINESE = "^[\u4e00-\u9fa5],{0,}$";

    /**
     * 正则表达式：验证身份证
     */
    static REGEX_ID_CARD = "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)";

    /**
     * 正则表达式：验证URL
     */
    static REGEX_URL = "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";

    /**
     * 正则表达式：验证IP地址
     */
    static REGEX_IP_ADDR = "(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)";

    static isPhone = (toValidStr) => {
        if (toValidStr === null || toValidStr.length <= 0) {
            return false;
        } else {
            return (/^((13[0-9])|(15[^4,\D])|(18[0-9])|(17[0-9]))\d{8}$/.test(toValidStr));
        }
    };
    static isIdCard = (toValidStr) => {
        if (toValidStr === null || toValidStr.length <= 0) {
            return false;
        } else {
            return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(toValidStr));
        }
    };

    static getIdCardSex = (idCardStr) => {
        if (!PatterCommonUtil.isIdCard(idCardStr)) {
            return -1;
        }
        if (parseInt(idCardStr.substr(16, 1)) % 2 === 1) {
            return 1;//男
        } else {
            return 0;//女
        }
    };

    static getIdCardAge = (idCardStr) => {
        if (!PatterCommonUtil.isIdCard(idCardStr)) {
            return -1;
        }
        let myDate = new Date();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();
        let age = myDate.getFullYear() - idCardStr.substring(6, 10) - 1;
        if (idCardStr.substring(10, 12) < month || idCardStr.substring(10, 12) === month && idCardStr.substring(12, 14) <= day) {
            age++;
        }
        return age;
    };


}