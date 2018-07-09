import React, {Component} from 'react';


// ~~~
// React组件生命周期小结 https://www.jianshu.com/p/4784216b8194
// UI
//https://www.zhihu.com/question/39452825/answers/created
// antd.design
//
// Materail
//
// 强推这两个，主要是好看好用
//
// ~~~~~

export default class BaseActivityComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // alert("componentWillMount");
    }

    componentDidMount() {
        // alert("componentDidMount");
    }

    componentWillReceiveProps(nextProps) {
        // alert("componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        // alert("shouldComponentUpdate");
        return true;        // 记得要返回true
    }


    componentWillUpdate() {
        // alert("componentWillUpdate");
    }

    componentDidUpdate() {
        // alert("componentDidUpdate");
    }

    componentWillUnmount() {
        // alert("componentWillUnmount");
    }


    /**
     * 返回对象所有属性及值
     * @param obj
     * @returns {string}
     * @private
     */
    _gener_displayProps = (obj) => {
        let props = "";
        for (let prop in obj) {
            props += prop + ": " + obj[prop] + ", ";
        }
        return props;
    };

    /**
     *根据Menu.Item点击返回获取真实跳转路径
     * @param item Menu.Item点击返回
     * @returns {string}
     * @private
     */
    _gener_real_push_pathname = (item) => {
        let resut = '';
        if (item && item.keyPath) {
            let itemKeyPathSplitArray = (item.keyPath + '').split(',');
            itemKeyPathSplitArray.reverse();

            for (let a in itemKeyPathSplitArray) {
                resut += itemKeyPathSplitArray[a];
            }
        }
        return resut;
    };

    /**
     * JSrouter跳转
     * @param pathname
     * @param state
     * @private
     */
    _push_to_compoent_by_route_history = (pathname, state) => {
        if (pathname && this.props && this.props.history) {
            let location = {
                pathname: pathname,
                state: state
            };
            this.props.history.push(location)
            // history.replace(location)
        }
    };
    /**
     * JSrouter覆盖跳转
     * @param pathname
     * @param state
     * @private
     */
    _replace_to_compoent_by_route_history = (pathname, state) => {
        if (pathname && this.props && this.props.history) {
            let location = {
                pathname: pathname,
                state: state
            };
            this.props.history.replace(location)
        }
    };

    render() {
        return (
            <div>
                BaseActivityComponent
                {this.props.toString()}
            </div>
        );
    };
}