import React, {PropTypes} from 'react';
import LocalStorageCommonUtil from "./local.storage.common.util";


export default class DataManagerCommonUtil {


    dataWorkSpaces: Map = null;
    static instanceThis: DataManagerCommonUtil;

    static instance(): DataManagerCommonUtil {
        if (!DataManagerCommonUtil.instanceThis) {
            DataManagerCommonUtil.instanceThis = new DataManagerCommonUtil();
        }
        return DataManagerCommonUtil.instanceThis;
    }

    init(workspaceKey, workspaceValue): DataManagerCommonUtil {
        if (!this.dataWorkSpaces) {
            this.dataWorkSpaces = new Map();
        }
        this.dataWorkSpaces.set(workspaceKey, workspaceValue);
        return this;
    }


    check(workspaceKey): boolean {
        if (this.dataWorkSpaces) {
            return this.dataWorkSpaces.has(workspaceKey);
        }
        return false;
    }

    delete(workspaceKey): boolean {
        if (this.dataWorkSpaces && this.dataWorkSpaces.has(workspaceKey)) {
            return this.dataWorkSpaces.delete(workspaceKey);
        }
        return false;
    }

    generRealKey(workspaceKey, key): String {
        return workspaceKey + '.' + key;
    }

    //--------------------------------------------------------------------

    /**
     * 保存数据
     * @param workspaceKey
     * @param key
     * @param value
     */
    setItem(workspaceKey, key, value): void {
        if (this.check(workspaceKey)) {
            LocalStorageCommonUtil.instance().setItem(this.generRealKey(workspaceKey, key), value);
        }
    }

    /**
     * 读取数据
     * @param workspaceKey
     * @param key
     * @returns {*}
     */
    getItem(workspaceKey, key): any {
        if (this.check(workspaceKey)) {
            return LocalStorageCommonUtil.instance().getItem(this.generRealKey(workspaceKey, key));
        } else {
            return null;
        }
    }

    /**
     * 删除单个数据
     * @param workspaceKey
     * @param key
     */
    removeItem(workspaceKey, key): void {
        if (this.check(workspaceKey)) {
            LocalStorageCommonUtil.instance().removeItem(this.generRealKey(workspaceKey, key));
        }
    }

    /**
     * 删除所有数据
     * @param workspaceKey
     * @param key
     */
    clear(workspaceKey, key): void {
        if (this.check(workspaceKey)) {
            this.delete(workspaceKey);
            LocalStorageCommonUtil.instance().removeItem(this.generRealKey(workspaceKey, key));
        }
    }

    /**
     * 得到某个索引的key
     * @param workspaceKey
     * @param index
     */
    key(workspaceKey, index): void {
        if (this.check(workspaceKey)) {
            return LocalStorageCommonUtil.instance().key(index);
        } else {
            return null;
        }
    }

}