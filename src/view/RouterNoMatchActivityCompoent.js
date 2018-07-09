import React, {Component} from 'react';
import BaseActivityComponent from "./BaseActivityComponent";


export default class RouterNoMatchActivityCompoent extends BaseActivityComponent {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div style={{fontSize: 64, color: "#000000"}}>
                No match for <code>{this.props.location.pathname}</code>
            </div>
        );
    }
}
