import React from 'react';
import BaseActivityComponent from "./BaseActivityComponent";
import {Map, Marker} from "react-amap";
import {Button, Layout} from "antd";

import Geolocation from 'react-amap-plugin-geolocation';
import DateFormatUtil from "../utils/date/date.format.util";

const {Header, Footer, Sider, Content} = Layout;


class WelcomeActivityTimerShowComponent extends BaseActivityComponent {

    constructor(props) {
        super(props);
        this.state = {
            now_time_str: '',
            timer_interval: null,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this._gener_timer_ever_second();

    }

    _gener_timer_ever_second = () => {
        let timer_interval = setInterval(() => {
            this.setState({
                now_time_str: DateFormatUtil.format(new Date(Date.now()))
            });
        }, 1000);
        this.setState({
            timer_interval: timer_interval,
        });
    };


    componentWillUnmount() {
        super.componentWillUnmount();
        clearInterval(this.state.timer_interval);
    }

    render() {
        return (
            <div style={{fontSize: 16, color: "#000000", textAlign: 'right'}}>
                {this.state.now_time_str}
            </div>
        );
    }
}

class WelcomeActivityComponentAmap extends BaseActivityComponent {
    constructor(props) {
        super(props);
        this.state = {
            amap_key: '6b09b475913fe6abc894ebba5e4c37dd',
            amap_version: '1.4.0',
            mapCenter: {
                longitude: 120 + Math.random() * 20,
                latitude: 30 + Math.random() * 10,
            },
            mapGeoPluginProps: {
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                // buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            },
        };
        this.amapEvents = {
            created: (mapInstance) => {
                // console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log(mapInstance.getZoom());
            }
        };
        this.markerEvents = {
            created: (markerInstance) => {
                // console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log(markerInstance.getPosition());
            }
        };
        this.markerPosition = {longitude: 120, latitude: 30};
    }

    componentDidMount() {
        super.componentDidMount();

    }

    changeCenter() {
        this.setState({
            mapCenter: {
                longitude: 120 + Math.random() * 20,
                latitude: 30 + Math.random() * 10,
            },
        })
    }

    //定位--------
    ongeolocationComplete = (geolocationResult) => {
        console.log(geolocationResult)
    };
    ongeolocationError = (geolocationError) => {
        console.log(geolocationError)
    };


    render() {
        return <div>
            <div style={{
                flex: 1,
                width: '100%',
                height: 600,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Map zoom={5}
                     center={this.state.mapCenter}
                     amapkey={this.state.amap_key}
                     version={this.state.amap_version}
                     events={this.amapEvents}>
                    <Geolocation {...this.state.mapGeoPluginProps}
                                 complete={(geolocationResult) => this.ongeolocationComplete(geolocationResult)}
                                 error={(geolocationError) => this.ongeolocationError(geolocationError)}
                    />
                    <WelcomeActivityTimerShowComponent/>
                    {/*<Marker position={this.markerPosition}*/}
                    {/*events={this.markerEvents}*/}
                    {/*/>*/}
                </Map>
            </div>
        </div>
    }

}

export default class WelcomeActivityComponent extends BaseActivityComponent {

    render() {
        return (
            <div style={{
                height: '100vh',
                width: '100%',
                left: 0,
            }}>
                <Layout>
                    <Content style={{flex: 1, minHeight: 600,}}>
                        <WelcomeActivityComponentAmap/>
                    </Content>
                </Layout>
            </div>
        );
    }
}
