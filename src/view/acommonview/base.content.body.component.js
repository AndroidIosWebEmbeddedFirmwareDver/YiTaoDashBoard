import React from "react";
import BaseActivityComponent from "../BaseActivityComponent";


export class BaseContentBodyComponent extends BaseActivityComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{flex: 8, backgroundColor: '#123123'}}>


            </div>);
    }
}