import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

export default class RouteRouterInitlize extends Component {

    constructor() {
        super();
    }

    _initlizeRouterWithData = () => {
        if (this.props.routes) {
            return this._initlizeRouter(this.props.routes);
        }
    };

    /**
     * 暂时不支持多级装载
     * */
    _initlizeRouter = (routes) => {
        // alert(JSON.stringify(routes))
        return routes.map((routeItem) => {
            // if (routeItem.routes) {
            //     return this._initlizeRouter(routeItem.routes);
            // }
            if (routeItem && routeItem.path && routeItem.component) {
                return (
                    <Route exact key={routeItem.key} path={routeItem.path}
                           component={routeItem.component}/>
                );
            }
        });
    };

    render() {
        return (
            <div>
                {/*<Route path="/gallery" component={ExampleOfAntDesignIcon}/>*/}
                {/*<Route path="/view/demo/ExampleOfAntDesignButton"*/}
                {/*component={ExampleOfAntDesignButton}/>*/}
                {this._initlizeRouterWithData()}
            </div>
        );
    }


}