import React from "react";
import {Layout, Menu, Breadcrumb, Icon, Alert, Button, Radio, Dropdown} from 'antd';
import {BaseContentHeaderComponent} from "../../acommonview/base.content.header.component";

class ButtonNormal extends React.Component {

    render() {
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>按钮类型</span>
                <br/>
                <span>按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。</span>
                <br/>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
                <hr/>
            </div>
        );
    }
}

class ButtonWithIcon extends React.Component {

    render() {
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>图标按钮</span>
                <br/>
                <span>当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。</span>
                <br/>
                <Button type="primary" shape="circle" icon="search"/>
                <Button type="primary" icon="search">Search</Button>
                <Button shape="circle" icon="search"/>
                <Button icon="search">Search</Button>
                <br/>
                <Button shape="circle" icon="search"/>
                <Button icon="search">Search</Button>
                <Button type="dashed" shape="circle" icon="search"/>
                <Button type="dashed" icon="search">Search</Button>
                <hr/>
            </div>
        );
    }
}


class ButtonSize extends React.Component {
    state = {
        size: 'large',
    };

    handleSizeChange = (e) => {
        this.setState({size: e.target.value});
    };

    render() {
        const size = this.state.size;
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                    <Radio.Button value="large">Large</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <br/><br/>
                <Button type="primary" size={size}>Primary</Button>
                <Button size={size}>Normal</Button>
                <Button type="dashed" size={size}>Dashed</Button>
                <Button type="danger" size={size}>Danger</Button>
                <br/>
                <Button type="primary" shape="circle" icon="download" size={size}/>
                <Button type="primary" icon="download" size={size}>Download</Button>
                <br/>
                <Button.Group size={size}>
                    <Button type="primary">
                        <Icon type="left"/>Backward
                    </Button>
                    <Button type="primary">
                        Forward<Icon type="right"/>
                    </Button>
                </Button.Group>
                <hr/>
            </div>
        );
    }
}


class ButtonWithDisabled extends React.Component {

    render() {
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>不可用状态</span>
                <br/>
                <span>添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。</span>
                <br/>
                <Button type="primary">Primary</Button>
                <Button type="primary" disabled>Primary(disabled)</Button>
                <br/>
                <Button>Default</Button>
                <Button disabled>Default(disabled)</Button>
                <br/>
                <Button>Ghost</Button>
                <Button disabled>Ghost(disabled)</Button>
                <br/>
                <Button type="dashed">Dashed</Button>
                <Button type="dashed" disabled>Dashed(disabled)</Button>
                <hr/>
            </div>
        );
    }
}

const ButtonGroup = Button.Group;


class ButtonWithButtonGroup extends React.Component {

    render() {
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>按钮组合</span>
                <br/>
                <span>可以将多个 Button 放入 Button.Group 的容器中。</span><br/>
                <span>通过设置 size 为 large small 分别把按钮组合设为大、小尺寸。若不设置 size，则尺寸为中。</span><br/>

                <h4>Basic</h4>
                <ButtonGroup>
                    <Button>Cancel</Button>
                    <Button>OK</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button disabled>L</Button>
                    <Button disabled>M</Button>
                    <Button disabled>R</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button>L</Button>
                    <Button>M</Button>
                    <Button>R</Button>
                </ButtonGroup>

                <h4>With Icon</h4>
                <ButtonGroup>
                    <Button type="primary">
                        <Icon type="left"/>Go back
                    </Button>
                    <Button type="primary">
                        Go forward<Icon type="right"/>
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button type="primary" icon="cloud"/>
                    <Button type="primary" icon="cloud-download"/>
                </ButtonGroup>

                <hr/>
            </div>
        );
    }
}

class ButtonWithDropdown extends React.Component {

    _handleMenuClick = (e) => {
        console.log('click', e);
    };

    _menu = () => {
        return (
            <Menu onClick={this._handleMenuClick()}>
                <Menu.Item key="1">1st item</Menu.Item>
                <Menu.Item key="2">2nd item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );
    };


    render() {
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>多个按钮组合</span>
                <br/>
                <span>按钮组合使用时，推荐使用1个主操作 + n 个次操作，3个以上操作时把更多操作放到 </span><br/>

                <Button type="primary">primary</Button>
                <Button>secondary</Button>
                {/*
                <Dropdown overlay={this._menu} key={'aaa'}>
                    <Button>
                        Actions <Icon type="down"/>
                    </Button>
                </Dropdown>
                */}
                <hr/>
            </div>
        );
    }
}

class ButtonWithGhost extends React.Component {


    render() {
        return (
            <div style={{margin: 12, padding: 12, textAlign: 'left'}}>
                <span>幽灵按钮</span>
                <br/>
                <span>幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。</span><br/>

                <Button type="primary" ghost>Primary</Button>
                <Button ghost>Default</Button>
                <Button type="dashed" ghost>Dashed</Button>
                <Button type="danger" ghost>danger</Button>

                <hr/>
            </div>
        );
    }
}

export default class ExampleOfAntDesignButton extends React.Component {
    render() {
        return (
            <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>

                <h1>button</h1>
                <br/>
                <h4>button</h4>
                <br/>
                <hr/>

                <ButtonNormal/>
                <ButtonWithIcon/>
                <ButtonSize/>
                <ButtonWithDisabled/>
                <ButtonWithButtonGroup/>
                <ButtonWithDropdown/>
                <ButtonWithGhost/>
            </div>
        );
    }
}