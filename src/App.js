import React from 'react';
import LoginActivityComponent from "./view/LoginActivityComponent";
import MainActivityComponent from "./view/MainActivityComponent";
import {BrowserRouter as Router} from "react-router-dom";
import BaseActivityComponent from "./view/BaseActivityComponent";
import AppManagerCommonUtil from "./utils/storage/app.manager.common.util";

class App extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            isLoginSuccess: false,
            inJectIonFromLoginSuccess: false,
            userData: {
                sessionId: null,
                name: null,
                phone: null,
                email: null,
                avatarUrl: null,
                isRoot: null,
                loginTimes: null,
            }
        };
    }


    componentWillUnmount() {
        super.componentWillUnmount();
        console.log('APP with componentWillUnmount');
    }

    componentWillMount() {
        super.componentWillMount();
    }

    componentDidMount() {
        super.componentDidMount();
        this.state.isLoginSuccess = AppManagerCommonUtil.instance().isLogin();
        this.setState(preState => ({
            isLoginSuccess: this.state.isLoginSuccess,
        }));
    }


    onLogOutSuccess = (data: JSON) => {
        AppManagerCommonUtil.instance().removeUser();
        this.setState({
            isLoginSuccess: false,
            userData: {
                sessionId: null,
                name: null,
                phone: null,
                email: null,
                avatarUrl: null,
                isRoot: null,
                loginTimes: null,
            }
        });
    };

    onLoginSuccess = (data: JSON) => {
        if (data) {
            AppManagerCommonUtil.instance().saveUser(data);
            this.setState({
                isLoginSuccess: true,
                inJectIonFromLoginSuccess: true,
                userData: {
                    sessionId: data && data.sessionId ? data.sessionId : null,
                    name: data && data.name ? data.name : null,
                    phone: data && data.phone ? data.phone : null,
                    email: data && data.email ? data.email : null,
                    avatarUrl: data && data.avatarUrl ? data.avatarUrl : null,
                    isRoot: data && data.isRoot >= 0 ? data.isRoot : null,
                    loginTimes: data && data.loginTimes >= 0 ? data.loginTimes : null,
                }
            });
        }
    };

    render() {
        return (
            <Router>
                {this.state.isLoginSuccess ?
                    <MainActivityComponent
                        onLogOutSuccess={(data) => this.onLogOutSuccess(data)}
                        inJectIonFromLoginSuccess={this.state.inJectIonFromLoginSuccess}
                    />
                    :
                    <LoginActivityComponent
                        onLoginSuccess={(data) => this.onLoginSuccess(data)}
                    />
                }
            </Router>
        );
    }
}

export default App;
