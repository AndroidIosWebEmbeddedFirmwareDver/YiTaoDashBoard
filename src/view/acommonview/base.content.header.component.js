import React from "react";
import BaseActivityComponent from "../BaseActivityComponent";
import {Col, Divider, Icon, Layout, Row} from "antd";


const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export class BaseContentHeaderComponent extends BaseActivityComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout style={{
                flex: 1,
                paddingTop: 24,
                paddingBottom: 24,
                paddingLeft: 16,
                paddingRight: 16,
                marginBottom: 0,
                backgroundColor: 'transparent',
            }}>

                <div style={{fontSize: 16, color: '#000000', textAlign: 'left'}}>

                    <Icon
                        type="file-text"/>&nbsp;&nbsp;&nbsp;{this.props.titileDesc ? this.props.titileDesc : null}
                </div>

            </Layout>
        );
    }
}

