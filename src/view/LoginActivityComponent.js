import React from "react";
import BaseActivityComponent from "./BaseActivityComponent";
import {Button, Col, Row, Layout, Input, Icon} from 'antd';
import DialogCommonManage from "./acommonview/dialog/dialog.common.manage";
import {BaseContentFooterComponent} from "./acommonview/base.content.footer.component";
import NetworkCommonUtil from "../utils/network.common.util";

import {Player} from 'video-react';
import "video-react/dist/video-react.css"
import VidoBackGroundActivityCompoent from "./VidoBackGroundActivityCompoent";


const {Header, Content, Footer, Sider} = Layout;
const defaultGenerSmsCodeTime = 60;

class LoginActivityComponentLoginContent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            loginUserNamePlaceholder: '请输入账号',
            loginUserPwdPlaceholder: '请输入密码',
            loginUserSmsPhonePlaceholder: '请输入手机号',
            loginUserSmsCodePlaceholder: '请输入授权码',
            loginUserName: null,
            loginUserPwd: null,
            loginUserSmsPhone: null,
            loginUserSmsCode: null,
            loginUserNameInputTag: 1001,
            loginUserPwdInputTag: 1002,
            loginUserSmsPhoneInputTag: 1003,
            loginUserSmsCodeInputTag: 1004,

            loginUserSmsCodeGenerBtnShow: '获取授权码',
            loginUserSmsCodeGenerDisable: false,
            loginUserSmsCodeGenerTimerCount: defaultGenerSmsCodeTime,
        };
    }

    componentDidMount() {
        super.componentDidMount();
    }

    onInputChange = (e, inputTag) => {
        // console.log(e.target.value);
        switch (inputTag) {
            case this.state.loginUserNameInputTag:
                this.setState({loginUserName: e && e.target && e.target.value ? e.target.value : null});
                return;

            case this.state.loginUserPwdInputTag:
                this.setState({loginUserPwd: e && e.target && e.target.value ? e.target.value : null});
                return;

            case this.state.loginUserSmsPhoneInputTag:
                this.setState({loginUserSmsPhone: e && e.target && e.target.value ? e.target.value : null});
                return;

            case this.state.loginUserSmsCodeInputTag:
                this.setState({loginUserSmsCode: e && e.target && e.target.value ? e.target.value : null});
                return;
        }
    };
    onInputEmitEmpty = (e, inputTag) => {
        switch (inputTag) {
            case this.state.loginUserNameInputTag:
                this.setState({loginUserName: null});
                return;

            case this.state.loginUserPwdInputTag:
                this.setState({loginUserPwd: null});
                return;

            case this.state.loginUserSmsPhoneInputTag:
                this.setState({loginUserSmsPhone: null});
                return;

            case this.state.loginUserSmsCodeInputTag:
                this.setState({loginUserSmsCode: null});
                return;
        }
    };
    onInputGenerBtnClick = (e, inputTag) => {

        switch (inputTag) {
            case this.state.loginUserSmsCodeInputTag:
                if (this.state.loginUserName == null || this.state.loginUserName.length <= 0) {
                    DialogCommonManage.showNormalMessage('账号不能为空');
                    return;
                }
                if (this.state.loginUserPwd == null || this.state.loginUserPwd.length <= 0) {
                    DialogCommonManage.showNormalMessage('密码不能为空');
                    return;
                }
                this.props.netWorkLoadGenerSmsCode(this.state.loginUserName, this.state.loginUserPwd);
                this.generSmsCodeStartInterval();
                return;
        }
    };
    onGenerToLoginBtnClick = (e) => {
        // console.log(e);
        if (this.state.loginUserName == null || this.state.loginUserName.length <= 0) {
            DialogCommonManage.showNormalMessage('账号不能为空');
            return;
        }
        if (this.state.loginUserPwd == null || this.state.loginUserPwd.length <= 0) {
            DialogCommonManage.showNormalMessage('密码不能为空');
            return;
        }
        if (this.state.loginUserSmsCode == null || this.state.loginUserSmsCode.length <= 0) {
            DialogCommonManage.showNormalMessage('授权码不能为空');
            return;
        }
        if (this.props.netWorkLoadGenerToLogin) {
            this.props.netWorkLoadGenerToLogin(this.state.loginUserName, this.state.loginUserPwd, this.state.loginUserSmsCode);
        }
    };


    generSmsCodeStartInterval = () => {
        //正在倒计时中，不能重复点击
        if (this.state.loginUserSmsCodeGenerDisable) {
            console.log('正在倒计时中，不能重复点击');
            return;
        }
        this.interval = setInterval(() => {
            const timer = this.state.loginUserSmsCodeGenerTimerCount - 1;
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    loginUserSmsCodeGenerTimerCount: defaultGenerSmsCodeTime,
                    loginUserSmsCodeGenerDisable: false,
                    loginUserSmsCodeGenerBtnShow: '重新获取',
                })
            } else {
                this.setState({
                    loginUserSmsCodeGenerTimerCount: timer,
                    loginUserSmsCodeGenerDisable: true,
                    loginUserSmsCodeGenerBtnShow: timer + 's',
                })
            }

        }, 1000);

    };

    generSmsCodeStopInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };


    componentWillUnmount() {
        super.componentWillUnmount();
        //当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，可以做一些组件相关的清理工作，例如取消计时器、网络请求等
        this.generSmsCodeStopInterval();
    }

    render(): * {
        return (
            <div style={{
                width: 'auto',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                padding: 16,
                fontSize: 16,
                color: '#080808'
            }}>
                <div style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 16,
                }}>
                    <span>登录后台管理系统</span>
                    <Input value={this.state.loginUserName}
                           placeholder={this.state.loginUserNamePlaceholder}
                           style={{padding: 9.6,}}
                           addonBefore={<Icon type="bell"/>}
                           onChange={(e) => this.onInputChange(e, this.state.loginUserNameInputTag)}
                           suffix={this.state.loginUserName ? <Icon type="close-circle"
                                                                    onClick={(e) => this.onInputEmitEmpty(e, this.state.loginUserNameInputTag)}/> : null}
                    />
                    <Input value={this.state.loginUserPwd}
                           placeholder={this.state.loginUserPwdPlaceholder}
                           style={{padding: 9.6,}}
                           addonBefore={<Icon type="disconnect"/>}
                           type={'password'}//number, color, checkbox, radio, date, file, month, password, range 和 time.
                        // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%E5%B1%9E%E6%80%A7
                           onChange={(e) => this.onInputChange(e, this.state.loginUserPwdInputTag)}
                           suffix={this.state.loginUserPwd ? <Icon type="close-circle"
                                                                   onClick={(e) => this.onInputEmitEmpty(e, this.state.loginUserPwdInputTag)}/> : null}
                    />
                    <Input value={this.state.loginUserSmsCode}
                           placeholder={this.state.loginUserSmsCodePlaceholder}
                           style={{padding: 9.6,}}
                           addonBefore={<Icon type="database"/>}
                           addonAfter={<a
                               onClick={(e) => this.onInputGenerBtnClick(e, this.state.loginUserSmsCodeInputTag)}>
                               <span>{this.state.loginUserSmsCodeGenerBtnShow}</span></a>}
                           onChange={(e) => this.onInputChange(e, this.state.loginUserSmsCodeInputTag)}
                           suffix={this.state.loginUserSmsCode ? <Icon type="close-circle"
                                                                       onClick={(e) => this.onInputEmitEmpty(e, this.state.loginUserSmsCodeInputTag)}/> : null}
                    />
                </div>

                <div style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 12,
                    padding: 9.6,
                    marginTop: 9.6,
                }}>
                    <span style={{
                        flex: 1,
                    }}>点击登录即同意<a>《淘一设计管理员守则》</a> </span>
                    <Button onClick={(e) => this.onGenerToLoginBtnClick(e)}
                            type={'primary'}>登录</Button>
                </div>
            </div>
        );
    }
}


class LoginActivityComponent extends BaseActivityComponent {
    constructor() {
        super();
        this.state = {
            account: null,
            password: null,
            smsCode: null,
            smsVerifiToken: null,
        };
    }

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
    }

    shouldComponentUpdate() {
        return super.shouldComponentUpdate();
    }

    componentWillUpdate() {
        super.componentWillUpdate();
    }

    componentDidUpdate() {
        super.componentDidUpdate();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }


    //-------------------------------

    netWorkLoadGenerSmsCode = (dataAccount, dataPassword) => {
        if (dataAccount && dataPassword) {
            this.setState({
                account: dataAccount,
                password: dataPassword,
            });
            let param = {
                account: dataAccount,
                data: {
                    account: dataAccount,
                    password: dataPassword,
                }
            };
            NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_USER_API_GENER_SMS_BY_ACCOUNT).then((data: any) => {
                // DialogCommonManage.showNormalMessage(JSON.stringify(data));
                if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                    DialogCommonManage.showNormalMessage('获取验证码成功');
                    this.setState({
                        smsVerifiToken: data.data && data.data.smsVerifiToken ? data.data.smsVerifiToken : null,
                    });
                } else if (data) {
                    DialogCommonManage.showNormalMessage(data.msg + '');
                } else {
                    DialogCommonManage.showNormalMessage('请求网络出错');
                }
            });
        }
    };

    netWorkLoadGenerToLogin = (dataAccount, dataPassword, dataCode) => {
        if (dataAccount && dataPassword && dataCode) {
            this.setState({
                account: dataAccount,
                password: dataPassword,
                smsCode: dataCode,
            });
            let param = {
                smsCode: dataCode,
                smsVerifiToken: this.state.smsVerifiToken,
                data: {
                    account: dataAccount,
                    password: dataPassword,
                }
            };
            NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_USER_API_LOGIN_WITH_SMS_CODE).then((data: any) => {
                // DialogCommonManage.showNormalMessage(JSON.stringify(data));
                if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                    DialogCommonManage.showNormalMessage('登录成功');
                    if (data.data && this.props.onLoginSuccess) {
                        this.props.onLoginSuccess(data.data);
                    }
                } else if (data) {
                    DialogCommonManage.showNormalMessage(data.msg + '');
                } else {
                    DialogCommonManage.showNormalMessage('请求网络出错');
                }
            });
        }
    };

    //-------------------------------


    render() {

        return (
            <div>
                <Layout style={{
                    overflow: 'auto',
                    height: '100%',
                    // height: '100vh',
                    width: '100%',
                    position: 'fixed',
                    left: 0,
                    padding: 0,
                    backgroundColor: 'transparent',
                }}>
                    <VidoBackGroundActivityCompoent/>
                </Layout>
                <Layout style={{
                    overflow: 'auto',
                    height: '100%',
                    // height: '100vh',
                    width: '100%',
                    position: 'fixed',
                    left: 0,
                    padding: 0,
                    backgroundColor: 'transparent',
                }}>
                    <Layout style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}>
                        <LoginActivityComponentLoginContent
                            netWorkLoadGenerSmsCode={(dataAccount, dataPassword) => this.netWorkLoadGenerSmsCode(dataAccount, dataPassword)}
                            netWorkLoadGenerToLogin={(dataAccount, dataPassword, dataCode) => this.netWorkLoadGenerToLogin(dataAccount, dataPassword, dataCode)}
                        />
                    </Layout>
                    <BaseContentFooterComponent/>
                </Layout>

            </div>
        );
    }
}

export default LoginActivityComponent

