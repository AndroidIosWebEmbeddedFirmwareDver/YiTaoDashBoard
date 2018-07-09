import React from 'react'
import {Icon} from "antd";
import RouteRouterMange from "../../../route/route.router.mange";


class IconWithHeader extends React.Component {
    render() {
        return (
            <div>
                <h1>Icon</h1>
                <br/>
                <h4>Icon</h4>
                <br/>
                <hr/>


                <div style={{margin: 12, padding: 12, textAlign: 'left'}}>

                    Icon图标<br/>
                    语义化的矢量图形。<br/>

                    图标的命名规范<br/>
                    我们为每个图标赋予了语义化的命名，命名规则如下:<br/>

                    实心和描线图标保持同名，用 -o 来区分，比如 question-circle（实心） 和 question-circle-o（描线）；<br/>

                    命名顺序：[图标名]-[形状?]-[描线?]-[方向?]。<br/>

                    ? 为可选。<br/>

                    完整的图标设计规范请访问 图标规范。<br/>

                    如何使用<br/>
                    使用 <Icon/> 标签声明组件，指定图标对应的 type 属性，示例代码如下:<br/>

                    <Icon type="link"/><br/>
                    本地部署#<br/>
                    图标默认托管在 iconfont.cn，默认公网可访问。如需本地部署，可参考 示例。<br/>

                </div>
                图标列表#
            </div>
        );
    }
}

class IconWithDirection extends React.Component {


    render() {
        return (<div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>方向性图标</span>
                <br/>
                <br/>
                <div style={{fontSize: 32, color: '#1DA57A'}}>

                    <Icon type="step-backward"/>
                    <Icon type="step-forward"/>
                    <Icon type="fast-backward"/>
                    <Icon type="fast-forward"/>
                    <Icon type="shrink"/>
                    <Icon type="arrows-alt"/>
                    <Icon type="down"/>
                    <Icon type="up"/>
                    <Icon type="left"/>
                    <Icon type="right"/>
                    <Icon type="caret-up"/>
                    <Icon type="caret-down"/>
                    <Icon type="caret-left"/>
                    <Icon type="caret-right"/>
                    <Icon type="up-circle"/>
                    <Icon type="down-circle"/>
                    <Icon type="left-circle"/>
                    <Icon type="right-circle"/>
                    <Icon type="up-circle-o"/>
                    <Icon type="down-circle-o"/>
                    <Icon type="right-circle-o"/>
                    <Icon type="left-circle-o"/>
                    <Icon type="double-right"/>
                    <Icon type="double-left"/>
                    <Icon type="verticle-left"/>
                    <Icon type="verticle-right"/>
                    <Icon type="forward"/>
                    <Icon type="backward"/>
                    <Icon type="rollback"/>
                    <Icon type="enter"/>
                    <Icon type="retweet"/>
                    <Icon type="swap"/>
                    <Icon type="swap-left"/>
                    <Icon type="swap-right"/>
                    <Icon type="arrow-up"/>
                    <Icon type="arrow-down"/>
                    <Icon type="arrow-left"/>
                    <Icon type="arrow-right"/>
                    <Icon type="play-circle"/>
                    <Icon type="play-circle-o"/>
                    <Icon type="up-square"/>
                    <Icon type="down-square"/>
                    <Icon type="left-square"/>
                    <Icon type="right-square"/>
                    <Icon type="up-square-o"/>
                    <Icon type="down-square-o"/>
                    <Icon type="left-square-o"/>
                    <Icon type="right-square-o"/>
                    <Icon type="login"/>
                    <Icon type="logout"/>
                    <Icon type="menu-fold"/>
                    <Icon type="menu-unfold"/>
                </div>

                <hr/>
            </div>
        )
    }
}


class IconWithNotification extends React.Component {


    render() {
        return (<div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>提示建议性图标</span>
                <br/>
                <br/>
                <div style={{fontSize: 32, color: '#1DA57A'}}>
                    <Icon type="question"/>
                    <Icon type="question-circle-o"/>
                    <Icon type="question-circle"/>
                    <Icon type="plus"/>
                    <Icon type="plus-circle-o"/>
                    <Icon type="plus-circle"/>
                    <Icon type="pause"/>
                    <Icon type="pause-circle-o"/>
                    <Icon type="minus"/>
                    <Icon type="minus"/>
                    <Icon type="minus-circle-o"/>
                    <Icon type="minus-circle"/>
                    <Icon type="plus-square"/>
                    <Icon type="plus-square-o"/>
                    <Icon type="minus-square"/>
                    <Icon type="minus-square-o"/>
                    <Icon type="info"/>
                    <Icon type="info-circle-o"/>
                    <Icon type="info-circle"/>
                    <Icon type="exclamation"/>
                    <Icon type="exclamation-circle-o"/>
                    <Icon type="exclamation-circle"/>
                    <Icon type="close"/>
                    <Icon type="close-circle"/>
                    <Icon type="close-circle-o"/>
                    <Icon type="close-square"/>
                    <Icon type="close-square-o"/>
                    <Icon type="check"/>
                    <Icon type="check-circle"/>
                    <Icon type="check-circle-o"/>
                    <Icon type="check-square"/>
                    <Icon type="check-square-o"/>
                    <Icon type="clock-circle-o"/>
                    <Icon type="clock-circle"/>
                    <Icon type="warning"/>


                </div>

                <hr/>
            </div>
        )
    }
}


class IconWithCommonWebSite extends React.Component {


    render() {
        return (<div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>网站通用图标</span>
                <br/>
                <br/>
                <div style={
                    {fontSize: 32, color: '#28A2E3'}}>
                    <Icon type="lock"/>
                    <Icon type="unlock"/>
                    <Icon type="area-chart"/>
                    <Icon type="pie-chart"/>
                    <Icon type="bar-chart"/>
                    <Icon type="dot-chart"/>
                    <Icon type="bars"/>
                    <Icon type="book"/>
                    <Icon type="calendar"/>
                    <Icon type="cloud"/>
                    <Icon type="cloud-download"/>
                    <Icon type="code"/>
                    <Icon type="code-o"/>
                    <Icon type="copy"/>
                    <Icon type="credit-card"/>
                    <Icon type="delete"/>
                    <Icon type="desktop"/>
                    <Icon type="download"/>
                    <Icon type="edit"/>
                    <Icon type="ellipsis"/>
                    <Icon type="file"/>
                    <Icon type="file-text"/>
                    <Icon type="file-unknown"/>
                    <Icon type="file-pdf"/>
                    <Icon type="file-word"/>
                    <Icon type="file-excel"/>
                    <Icon type="file-jpg"/>
                    <Icon type="file-ppt"/>
                    <Icon type="file-markdown"/>
                    <Icon type="file-add"/>
                    <Icon type="folder"/>
                    <Icon type="folder-open"/>
                    <Icon type="folder-add"/>
                    <Icon type="hdd"/>
                    <Icon type="frown"/>
                    <Icon type="frown-o"/>
                    <Icon type="meh"/>
                    <Icon type="meh-o"/>
                    <Icon type="smile"/>
                    <Icon type="smile-o"/>
                    <Icon type="inbox"/>
                    <Icon type="laptop"/>
                    <Icon type="appstore-o"/>
                    <Icon type="appstore"/>
                    <Icon type="line-chart"/>
                    <Icon type="link"/>
                    <Icon type="mail"/>
                    <Icon type="mobile"/>
                    <Icon type="notification"/>
                    <Icon type="paper-clip"/>
                    <Icon type="picture"/>
                    <Icon type="poweroff"/>
                    <Icon type="reload"/>
                    <Icon type="search"/>
                    <Icon type="setting"/>
                    <Icon type="share-alt"/>
                    <Icon type="shopping-cart"/>

                    <Icon type="tablet"/>
                    <Icon type="tag"/>
                    <Icon type="tag-o"/>
                    <Icon type="tags"/>
                    <Icon type="tags-o"/>

                    <Icon type="to-top"/>
                    <Icon type="upload"/>
                    <Icon type="user"/>
                    <Icon type="video-camera"/>
                    <Icon type="home"/>
                    <Icon type="loading"/>

                    <Icon type="loading-3-quarters"/>
                    <Icon type="cloud-upload-o"/>
                    <Icon type="cloud-download-o"/>
                    <Icon type="cloud-upload"/>
                    <Icon type="cloud-o"/>

                    <Icon type="star-o"/>
                    <Icon type="star"/>
                    <Icon type="heart-o"/>
                    <Icon type="heart"/>

                    <Icon type="environment"/>
                    <Icon type="environment-o"/>
                    <Icon type="eye"/>
                    <Icon type="eye-o"/>


                    <Icon type="camera"/>
                    <Icon type="camera-o"/>
                    <Icon type="save"/>
                    <Icon type="team"/>
                    <Icon type="solution"/>
                    <Icon type="phone"/>
                    <Icon type="filter"/>
                    <Icon type="exception"/>
                    <Icon type="export"/>
                    <Icon type="customer-service"/>
                    <Icon type="qrcode"/>
                    <Icon type="scan"/>
                    <Icon type="like"/>
                    <Icon type="like-o"/>
                    <Icon type="dislike"/>
                    <Icon type="dislike-o"/>
                    <Icon type="message"/>
                    <Icon type="pay-circle"/>
                    <Icon type="pay-circle-o"/>
                    <Icon type="calculator"/>
                    <Icon type="pushpin"/>
                    <Icon type="pushpin-o"/>
                    <Icon type="bulb"/>
                    <Icon type="select"/>
                    <Icon type="switcher"/>
                    <Icon type="rocket"/>
                    <Icon type="bell"/>
                    <Icon type="disconnect"/>
                    <Icon type="database"/>
                    <Icon type="compass"/>
                    <Icon type="barcode"/>
                    <Icon type="hourglass"/>
                    <Icon type="key"/>
                    <Icon type="flag"/>
                    <Icon type="layout"/>
                    <Icon type="printer"/>
                    <Icon type="sound"/>
                    <Icon type="usb"/>
                    <Icon type="skin"/>
                    <Icon type="tool"/>
                    <Icon type="sync"/>
                    <Icon type="wifi"/>
                    <Icon type="car"/>
                    <Icon type="schedule"/>
                    <Icon type="user-add"/>
                    <Icon type="user-delete"/>
                    <Icon type="usergroup-add"/>
                    <Icon type="usergroup-delete"/>
                    <Icon type="man"/>
                    <Icon type="woman"/>
                    <Icon type="shop"/>
                    <Icon type="gift"/>
                    <Icon type="idcard"/>
                    <Icon type="medicine-box"/>
                    <Icon type="red-envelope"/>
                    <Icon type="coffee"/>
                    <Icon type="copyright"/>
                    <Icon type="trademark"/>
                    <Icon type="safety"/>
                    <Icon type="wallet"/>
                    <Icon type="bank"/>
                    <Icon type="trophy"/>
                    <Icon type="contacts"/>
                    <Icon type="global"/>
                    <Icon type="shake"/>
                    <Icon type="api"/>
                    <Icon type="fork"/>
                    <Icon type="dashboard"/>
                    <Icon type="form"/>
                    <Icon type="table"/>
                    <Icon type="profile"/>


                </div>

                <hr/>
            </div>
        )
    }
}


class IconWithBrandAndIdentity extends React.Component {


    render() {
        return (<div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>品牌和标识</span>
                <br/>
                <br/>
                <div style={{fontSize: 32, color: '#ff5500'}}>
                    <Icon type="android"/>
                    <Icon type="android-o"/>

                    <Icon type="apple"/>
                    <Icon type="apple-o"/>

                    <Icon type="windows"/>
                    <Icon type="windows-o"/>

                    <Icon type="ie"/>

                    <Icon type="chrome"/>

                    <Icon type="github"/>

                    <Icon type="aliwangwang"/>
                    <Icon type="aliwangwang-o"/>

                    <Icon type="dingding"/>
                    <Icon type="dingding-o"/>

                    <Icon type="weibo"/>
                    <Icon type="weibo-square"/>
                    <Icon type="weibo-circle"/>

                    <Icon type="taobao-circle"/>

                    <Icon type="html5"/>

                    <Icon type="twitter"/>
                    <Icon type="wechat"/>
                    <Icon type="youtube"/>
                    <Icon type="alipay-circle"/>
                    <Icon type="taobao"/>
                    <Icon type="skype"/>
                    <Icon type="qq"/>
                    <Icon type="medium-workmark"/>
                    <Icon type="gitlab"/>
                    <Icon type="medium"/>
                    <Icon type="linkedin"/>
                    <Icon type="google-plus"/>
                    <Icon type="dropbox"/>
                    <Icon type="facebook"/>
                    <Icon type="codepen"/>
                    <Icon type="amazon"/>
                    <Icon type="google"/>
                    <Icon type="codepen-circle"/>
                    <Icon type="alipay"/>
                    <Icon type="ant-design"/>
                    <Icon type="aliyun"/>
                    <Icon type="zhihu"/>
                    <Icon type="slack"/>
                    <Icon type="slack-square"/>
                    <Icon type="behance"/>
                    <Icon type="behance-square"/>
                    <Icon type="dribbble"/>
                    <Icon type="dribbble-square"/>
                    <Icon type="instagram"/>
                    <Icon type="yuque"/>


                </div>

                <hr/>
            </div>
        )
    }
}


class IconWithFooter extends React.Component {
    render() {
        return (

            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>

                API<br/>
                由于图标字体本质上还是文字，可以使用 style 和 className 设置图标的大小和颜色。<br/>
                <code>{<Icon type="question" style={{fontSize: 16, color: '#08c'}}/>} </code>
                参数 说明 类型 默认值<br/>
                spin 是否有旋转动画 boolean false<br/>
                style 设置图标的样式，例如 fontSize 和 color object -<br/>
                type 图标类型 string -<br/>

            </div>
        );
    }
}

export default class ExampleOfAntDesignIcon extends React.Component {

    constructor() {
        super();
        // alert(this._common_localQuery(this,''));
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            // navigated!
        }
        // alert(JSON.stringify(this.props.location))
    }

    render() {
        return (
            <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
                <IconWithHeader/>
                <IconWithDirection/>
                <IconWithNotification/>
                <IconWithCommonWebSite/>
                <IconWithBrandAndIdentity/>
                <IconWithFooter/>
            </div>
        );
    }
}