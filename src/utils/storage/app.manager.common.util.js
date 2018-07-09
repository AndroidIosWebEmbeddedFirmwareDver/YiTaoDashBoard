import React, {PropTypes} from 'react';
import DataManagerCommonUtil from "./data.manager.common.util";
import SessionStorageCommonUtil from "./session.storage.common.util";


export default class AppManagerCommonUtil {
    user = {
        workspaceKey: 'com.hack.wang.yi.tao.desgin.web.back.site.user',
        workspaceValue: 'data',
    };
    system = {
        workspaceKey: 'com.hack.wang.yi.tao.desgin.web.back.site.system',
        workspaceValue: 'data',
    };


    static instanceThis: AppManagerCommonUtil;

    static instance(): AppManagerCommonUtil {
        if (!AppManagerCommonUtil.instanceThis) {
            AppManagerCommonUtil.instanceThis = new AppManagerCommonUtil();
        }
        return AppManagerCommonUtil.instanceThis;
    }

    init(): AppManagerCommonUtil {
        DataManagerCommonUtil.instance()
            .init(this.user.workspaceKey, this.user.workspaceValue)
            .init(this.system.workspaceKey, this.system.workspaceValue);
    }

    constructor() {
        this.init();
    }

    save(workspaceKey: String, key: String, dataStr: String): void {
        DataManagerCommonUtil.instance().setItem(workspaceKey, key, dataStr);
    }

    remove(workspaceKey: String, key: String): void {
        DataManagerCommonUtil.instance().removeItem(workspaceKey, key);
    }

    load(workspaceKey: String, key: String): void {
        return DataManagerCommonUtil.instance().getItem(workspaceKey, key);
    }

    //-----------------------------------------

    saveUser(userData: JSON): void {
        if (userData) {
            this.save(this.user.workspaceKey, this.user.workspaceValue, JSON.stringify(userData));
        }
    }

    removeUser(): void {
        this.remove(this.user.workspaceKey, this.user.workspaceValue);
    }

    loadUser(): JSON {
        let result = this.load(this.user.workspaceKey, this.user.workspaceValue);
        if (result) {
            return JSON.parse(result);
        } else {
            return result;
        }
    }

    saveSystem(userData: JSON): void {
        if (userData) {
            this.save(this.system.workspaceKey, this.system.workspaceValue, JSON.stringify(userData));
        }
    }

    removeSystem(): void {
        this.remove(this.system.workspaceKey, this.system.workspaceValue);
    }

    loadSystem(): JSON {
        let result = this.load(this.system.workspaceKey, this.system.workspaceValue);
        if (result) {
            return JSON.parse(result);
        } else {
            return result;
        }
    }


    //---------------
    isLogin(): boolean {
        let result = this.loadUser();
        return !!(result && result.sessionId);
    }

    sessionId(): String {
        let result = this.loadUser();
        if (result && result.sessionId) {
            SessionStorageCommonUtil.instance().setItem('sessionId', result.sessionId);
            return result.sessionId;
        } else {
            return null;
        }
    }


}