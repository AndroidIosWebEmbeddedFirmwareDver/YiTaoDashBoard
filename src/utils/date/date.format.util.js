/**
 *
 */
export default class DateFormatUtil {
    //定义一些默认参数
    static _options = {
        ZH: {
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            shortDayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            shortMonthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        US: {
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            shortDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    };


    //定义内部常量
    static  WEEKTYPE: {
        ZH_DAYNAME: 0,
        ZH_SDAYNAME: 1,
        US_DAYNAME: 2,
        US_SDAYNAME: 3,
    };


    /**
     * 格式化时间
     * @param date
     * @param fmt
     * @returns {*}
     */
    static format(date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (!DateFormatUtil.isNotEmpty(fmt)) {
            fmt = 'yyyy-MM-dd hh:mm:ss';
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }

    static formatToDate(dateStr) {
        if (DateFormatUtil.isNotEmpty(dateStr)) {
            return new Date(Date.parse(dateStr.replace(/-/g, "/")));
        }
        return '';
    }

    /**
     * 得到一天的开始 date类型
     * @param date
     */
    static getDateStart(date) {
        let fmt = 'yyyy-MM-dd';
        let dateStartStr = DateFormatUtil.getDateStartStr(date, fmt);
        return new Date(Date.parse(dateStartStr));
    }

    /**
     * 得到一天的开始 str 类型
     * @param date
     * @param fmt
     */
    static getDateStartStr(date, fmt) {
        if (typeof fmt === 'undefined') {
            fmt = 'yyyy-MM-dd';
        }
        let dateStr = DateFormatUtil.format(date, fmt);
        dateStr += ' 00:00:00';
        return dateStr;
    }

    /**
     * 得到一天的结束 date类型
     * @param date
     */
    static getDateEnd(date) {
        let fmt = 'yyyy-MM-dd';
        let dateEndStr = DateFormatUtil.getDateEndStr(date, fmt);
        return new Date(Date.parse(dateEndStr));
    }

    /**
     * 得到一天的结束 str 类型
     * @param date
     * @param fmt
     */
    static getDateEndStr(date, fmt) {
        if (typeof fmt === 'undefined') {
            fmt = 'yyyy-MM-dd';
        }
        let endStr = DateFormatUtil.format(date, fmt);
        endStr += ' 23:59:59';
        return endStr;
    }

    /**
     * 两个时间比较大小
     * @param d1
     * @param d2
     */
    static compareDate(d1, d2) {
        if (d1 && d2) {
            if (d1.getTime() > d2.getTime()) {
                return 1;
            } else if (d1.getTime() === d2.getTime()) {
                return 0;
            } else if (d1.getTime() < d2.getTime()) {
                return -1;
            }
        }
    }

    /**
     * 得到星期几, 支持中英
     * @param date
     * @param type
     * @returns {string}
     */
    static getWeek(date, type) {
        if (date) {
            if (!DateFormatUtil.isNotEmpty(type)) {
                type = 0;
            }
            let index = date.getDay();
            let dateStr = '';
            switch (type) {
                case DateFormatUtil.WEEKTYPE.ZH_DAYNAME:
                    dateStr = DateFormatUtil._options.ZH.dayNames[index];
                    break;
                case DateFormatUtil.WEEKTYPE.ZH_SDAYNAME:
                    dateStr = DateFormatUtil._options.ZH.shortDayNames[index];
                    break;
                case DateFormatUtil.WEEKTYPE.US_DAYNAME:
                    dateStr = DateFormatUtil._options.US.dayNames[index];
                    break;
                case DateFormatUtil.WEEKTYPE.US_SDAYNAME:
                    dateStr = DateFormatUtil._options.US.shortDayNames[index];
                    break;
            }
            return dateStr;
        }
    }

    /**
     * 是否为闰年
     * @param date
     * @returns {boolean}
     */
    static isLeapYear(date) {
        if (date instanceof Date) {
            return (0 === date.getYear() % 4 && ((date.getYear() % 100 !== 0) || (date.getYear() % 400 === 0)));
        }
        console.warn('argument format is wrong');
        return false;
    }

    /**
     * 字符串是否为正确的时间格式，支持 - /
     * @param dateStr
     * @returns {boolean}
     */
    static isValidDate(dateStr) {
        if (DateFormatUtil.isNotEmpty(dateStr)) {
            let r = dateStr.match(/^(\d{1,4})([-\/])(\d{1,2})\2(\d{1,2})$/);
            if (r === null) {
                return false;
            }
            let d = new Date(r[1], r[3] - 1, r[4]);
            let num = (d.getFullYear() === r[1] && (d.getMonth() + 1) === r[3] && d.getDate() === r[4]);
            return (num !== 0);
        }
    }

    /**
     * 增加天数
     * @param date
     * @param dayNum
     */
    static addDay(date, dayNum) {
        if (DateFormatUtil.isNotEmpty(date) && DateFormatUtil.isNotEmpty(dayNum) && date instanceof Date && typeof dayNum === 'number') {
            date.setDate(date.getDate() + dayNum);
        } else {
            console.warn('date or dayNum format wrong');
        }
        return date;
    }

    static addDayStr(dateStr, dayNum) {
        let date = '';
        if (DateFormatUtil.isNotEmpty(dateStr) && DateFormatUtil.isNotEmpty(dayNum) && typeof dayNum === 'number') {
            date = DateFormatUtil.formatToDate(dateStr);
            date.setDate(date.getDate() + dayNum);
        } else {
            console.warn('dateStr or dayNum format wrong');
        }
        return date;
    }

    /**
     * 增加月份
     * @param date
     * @param monthNum
     */
    static addMonth(date, monthNum) {
        if (DateFormatUtil.isNotEmpty(date) && DateFormatUtil.isNotEmpty(monthNum) && date instanceof Date && typeof monthNum === 'number') {
            date.setMonth(date.getMonth() + monthNum);
        } else {
            console.warn('date or monthNum format wrong');
        }
        return date;
    }

    static addMonthStr(dateStr, monthNum) {
        let date = '';
        if (DateFormatUtil.isNotEmpty(dateStr) && DateFormatUtil.isNotEmpty(monthNum) && typeof monthNum === 'number') {
            date = DateFormatUtil.formatToDate(dateStr);
            date.setMonth(date.getMonth() + monthNum);
        } else {
            console.warn('date or monthNum format wrong');
        }
        return date;
    }

    /**
     * 增加年份
     * @param date
     * @param yearNum
     */
    static addYear(date, yearNum) {
        if (DateFormatUtil.isNotEmpty(date) && DateFormatUtil.isNotEmpty(yearNum) && date instanceof Date && typeof yearNum === 'number') {
            date.setYear(date.getFullYear() + yearNum);
        } else {
            console.warn('date or yearNum format wrong');
        }
        return date;
    }

    static addYearStr(dateStr, yearNum) {
        let date = '';
        if (DateFormatUtil.isNotEmpty(dateStr) && DateFormatUtil.isNotEmpty(yearNum) && typeof yearNum === 'number') {
            date = DateFormatUtil.formatToDate(dateStr);
            date.setYear(date.getFullYear() + yearNum);
        } else {
            console.warn('date or yearNum format wrong');
        }
        return date;
    }


    /**
     * 是否为空
     * @param str
     * @returns {boolean}
     */
    static isNotEmpty(str) {
        if (str !== '' && str != null && typeof str !== 'undefined') {
            return true;
        }
        console.warn('argument format is wrong');
        return false;
    }


}

