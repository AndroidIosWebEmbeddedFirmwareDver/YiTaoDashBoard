import React from "react";
import BaseActivityComponent from "../BaseActivityComponent";
import {Col, Divider, Icon, Layout, Row} from "antd";


const {Header, Content, Footer, Sider} = Layout;

export class BaseContentFooterComponent extends BaseActivityComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer style={{
                paddingTop: 9.6,
                paddingBottom: 9.6,
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 0,
                fontSize: 12,
                color: '#B4C4CF',
                textAlign: 'center'
            }}>
                YiTao Design ©2018 Created By Hacker Wang
            </Footer>
        );
    }
}

