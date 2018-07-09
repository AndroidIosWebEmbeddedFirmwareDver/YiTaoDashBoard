import React from 'react';
import DataManagerCommonUtil from "./data.manager.common.util";


export default class LocalStorageCommonUtil {
    static instanceThis: LocalStorageCommonUtil;

    static instance(): LocalStorageCommonUtil {
        if (!LocalStorageCommonUtil.instanceThis) {
            LocalStorageCommonUtil.instanceThis = new LocalStorageCommonUtil();
        }
        return LocalStorageCommonUtil.instanceThis;
    }

    isMeSupportStorage(): boolean {
        if (typeof(Storage) !== "undefined") {
            // console.log('是的! 支持 localStorage  sessionStorage 对象!');
            return !!localStorage;
        } else {
            // console.log('抱歉! 不支持 web 存储。');
            return false;
        }
    }

    /**
     * 保存数据
     * @param key
     * @param value
     */
    setItem(key, value): void {
        if (this.isMeSupportStorage() && key && value) {
            localStorage.setItem(key, value)
        }
    }

    /**
     * 读取数据
     * @param key
     * @returns {*}
     */
    getItem(key): any {
        if (this.isMeSupportStorage() && key) {
            return localStorage.getItem(key)
        } else {
            return null;
        }
    }

    /**
     * 删除单个数据
     * @param key
     */
    removeItem(key): void {
        if (this.isMeSupportStorage() && key) {
            localStorage.removeItem(key)
        }
    }

    /**
     * 删除所有数据
     */
    clear(): void {
        if (this.isMeSupportStorage()) {
            localStorage.clear()
        }
    }

    /**
     * 得到某个索引的key
     * @param index
     */
    key(index): any {
        if (this.isMeSupportStorage() && index >= 0) {
            return localStorage.key(index)
        } else {
            return null;
        }
    }


}