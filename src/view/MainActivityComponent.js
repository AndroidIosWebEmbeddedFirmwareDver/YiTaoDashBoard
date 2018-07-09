import React from "react";
import BaseActivityComponent from "./BaseActivityComponent";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Alert,
    Button,
    Radio,
    Dropdown,
    Avatar,
    Tag,
    Col, Row, Popconfirm
} from 'antd';
import MainMenuData from '../config/main.menu.config'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter} from "react-router-dom";
import RouteRouterInitlize from "../route/route.router.initlize";
import RouteRouterMange from "../route/route.router.mange";
import {BaseContentHeaderComponent} from "./acommonview/base.content.header.component";
import {BaseContentFooterComponent} from "./acommonview/base.content.footer.component";
import DialogCommonManage from "./acommonview/dialog/dialog.common.manage";
import DialogModalMmanage from "./acommonview/dialog/dialog.modal.manage";
import AppManagerCommonUtil from "../utils/storage/app.manager.common.util";
import NetworkCommonUtil from "../utils/network.common.util";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


class MainActivityMenuLoginUserComponent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name: "kk",
                phone: "18702839327",
                email: "18702839327@163.com",
                avatarUrl: null,
                isRoot: 0,
                loginTimes: 43,
            }
        };
    }


    componentDidMount() {
        super.componentDidMount();
        this.setState({
            userData: {...AppManagerCommonUtil.instance().loadUser()}
        });
    }

    onPopconfirmActionOfLoginOut = () => {
        DialogModalMmanage.showConfirm('确定要退出系统么？', '', '确定', '取消', () => {
            if (this.props.onLogOutSuccess) {
                this.props.onLogOutSuccess();
            }
        }, null);

    };
    onPopconfirmActionOfGoToRoot = () => {
        this._push_to_compoent_by_route_history('/', {});
    };

    render(): * {
        console.log((NetworkCommonUtil.API_COMMON_FILE_GET_FILE + '?uid=' + this.state.userData.avatarUrl));
        return (
            <div style={{
                fontSize: 12,
                color: '#ffffff',
                padding: 24,
                textAlign: 'center',
            }}>
                <Popconfirm placement="bottom"
                            title={'欢迎你，' + this.state.userData.name}
                            onConfirm={() => this.onPopconfirmActionOfLoginOut()}
                            onCancel={() => this.onPopconfirmActionOfGoToRoot()}
                            okText="退出登录"
                            cancelText="默认主页"
                >
                    <a onClick={(e) => {
                        console.log(e)
                    }}>
                        <img style={{
                            width: 128,
                            height: 128,
                            resizeMode: 'cover',
                            borderRadius: 128 / 2,
                            borderColor: '#FBFBFB',
                            borderWidth: 2,
                        }} alt="example"
                             src={this.state.userData.avatarUrl ? (NetworkCommonUtil.API_COMMON_FILE_GET_FILE + '?uid=' + this.state.userData.avatarUrl) : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}/>
                        <br/>
                        <br/>
                        <span>{(this.state.userData.isRoot === 0 ? '欢迎你，管理员：' : '欢迎你，超级管理员：') + this.state.userData.name}</span>
                    </a>
                </Popconfirm>
            </div>
        );
    }
}

class MainActivityMenuComponent extends BaseActivityComponent {

    constructor(props) {
        super(props);
        this.state = {
            isNeedToPushToRoot: false,
            openKeys: null,
        };
    }

    componentWillMount() {
        super.componentWillMount();

    }

    componentDidMount() {
        super.componentDidMount();
    }


    /////-----------------------------------------------
    //关联折叠效果
    onOpenChange = (openKeys) => {
        // console.log(openKeys);
        if (this.state.openKeys) {
            const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        } else {
            this.setState({openKeys});
        }
    };

    _get_Menu_Item = (item_key) => {
        for (let a in MainMenuData.Menu.SubMenu) {
            for (let b in MainMenuData.Menu.SubMenu[a].Items) {
                if (MainMenuData.Menu.SubMenu[a].Items[b].key === item_key) {
                    return MainMenuData.Menu.SubMenu[a].Items[b];
                }
            }
        }
        return null;
    };

    /////-----------------------------------------------
    _render_menu = () => {
        let _this = this;
        return (
            <Menu
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                theme={MainMenuData.Menu.theme}
                mode={MainMenuData.Menu.mode}
                // defaultSelectedKeys={MainMenuData.Menu.defaultSelectedKeys}
                // defaultOpenKeys={MainMenuData.Menu.defaultOpenKeys}
                style={{height: '100%'}}
                onClick={(item, key, keyPath) => {
                    // alert(this._gener_displayProps(item.item));
                    // alert(JSON.stringify(this._get_Menu_Item(item.key)));
                    //点击 MenuItem 调用此函数
                    this._push_to_compoent_by_route_history(this._gener_real_push_pathname(item), this._get_Menu_Item(item.key));
                }}>
                {this._render_menuSubMenu(MainMenuData.Menu.SubMenu)}
            </Menu>
        );

    };

    _render_menuSubMenu = (subMenus) => {
        return subMenus.map((subMenu) => {
            return (<SubMenu
                    key={subMenu.key}
                    title={<span><Icon type={subMenu.titleIcon}/>{subMenu.title}</span>}
                    onTitleClick={(key, domEvent) => {
                        // alert(domEvent)
                    }}
                >
                    {this._render_menuSubMenuItems(subMenu.Items)}
                </SubMenu>
            );
        });
    };

    _render_menuSubMenuItems = (Items) => {
        return Items.map((item) => {
            return (
                <Menu.Item
                    key={item.key}
                >
                    {/*<Redirect to={item.exact_redirect_path}/>*/}
                    {/*{item.exact_redirect_location ?*/}
                    {/*<Link to={item.exact_redirect_location}>{item.desc}</Link>*/}
                    {/*:*/}
                    {/*item.desc*/}
                    {/*}*/}
                    {item.desc}
                </Menu.Item>
            );
        });
    };


    render() {
        return (
            <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                <MainActivityMenuLoginUserComponent
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}
                    onLogOutSuccess={this.props.onLogOutSuccess}
                />
                {this._render_menu()}
            </Sider>
        );
    }
}


class MainActivityContentComponent extends BaseActivityComponent {


    render() {
        const {match, location, history} = this.props;
        return (
            <Layout style={{marginLeft: 200, height: '100vh'}}>
                <div style={{flex: 0, backgroundColor: "#F0F2F5", textAlign: 'center'}}>
                    {this.props && this.props.location && this.props.location.state && this.props.location.state.desc ?
                        <BaseContentHeaderComponent
                            titileDesc={this.props.location.state.desc}/>
                        : null}
                </div>
                <div style={{flex: 8, backgroundColor: "#ffffff", overflow: 'auto',}}>
                    <Content
                        style={{margin: '24px 16px 0', overflow: 'initial'}}
                        id="123123123">
                        <RouteRouterInitlize routes={RouteRouterMange.AppRoutes}/>
                    </Content>
                </div>
                <div style={{flex: 0, backgroundColor: "#000000"}}>
                    <BaseContentFooterComponent/>
                </div>
            </Layout>
        );
    }
}

class MainActivityComponent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            isNeedToPushToRoot: false,
        };
    }

    componentWillMount() {
        super.componentWillMount();

    }

    componentDidMount() {
        super.componentDidMount();

        // withRouter(MainActivityMenuComponent);
        //处理效果，使得每次登陆都默认到根路径
        if (this.props.inJectIonFromLoginSuccess) {
            this.state.isNeedToPushToRoot = this.props.inJectIonFromLoginSuccess;
            this.setState({
                isNeedToPushToRoot: this.props.inJectIonFromLoginSuccess,
            });
        }
        if (this.state.isNeedToPushToRoot) {
            this._push_to_compoent_by_route_history('/', {aaa: ''});
            this.setState({
                isNeedToPushToRoot: false,
            });
        }

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

    // 固定侧边栏
    // 当内容较长时，使用固定侧边栏可以提供更好的体验。
    render() {
        const {match, location, history} = this.props;
        return (
            <Layout style={{backgroundColor: '#ffffff'}}>
                <MainActivityMenuComponent
                    onLogOutSuccess={this.props.onLogOutSuccess}
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}/>
                <MainActivityContentComponent
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}/>
            </Layout>
        );
    }

}

export default withRouter(MainActivityComponent);