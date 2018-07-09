import React, {Component} from 'react';
import BaseActivityComponent from "../BaseActivityComponent";


export default class MembersViewActivity extends BaseActivityComponent {

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
            <div>
                MembersViewActivity
                {JSON.stringify(this.props)}
            </div>
        );
    }
}
