import React from "react";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";

import MainActivityComponent from "../view/MainActivityComponent";
import ExampleOfAntDesignButton from "../view/zzzzdemo/general/ExampleOfAntDesignButton";
import ExampleOfAntDesignIcon from "../view/zzzzdemo/general/ExampleOfAntDesignIcon";


export const AppConfigRoutes = [
    {
        path: "/",
        // component: MainActivityComponent
    },
    {
        path: "/view/demo/ExampleOfAntDesignButton",
        component: ExampleOfAntDesignButton,
    },
    {
        path: "/view/demo/ExampleOfAntDesignIcon",
        component: ExampleOfAntDesignIcon,
    }
];



export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes}/>
        )}
    />
);

//
// export default AppConfigRoutes;