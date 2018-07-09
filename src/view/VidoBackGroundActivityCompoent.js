import React, {Component} from 'react';
import {Player, ControlBar, BigPlayButton} from 'video-react';

import BaseActivityComponent from "./BaseActivityComponent";

export default class VidoBackGroundActivityCompoent extends BaseActivityComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            viderPlayerProps: {
                autoPlay: true,//自动播放
                muted: true,//静音
                poster: require('../static/images/video_cover.jpeg'),//封面图
                src: require('../static/videos/night.mp4')//资源文件
            },
        };
    }


    componentDidMount() {
        super.componentDidMount();
        this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        // this.setState({
        //     player: state,
        //     currentTime: state.currentTime
        // });
        //是否已经播放完毕播放完毕就重播
        if (state && state.ended) {
            this.refs.player.play();
        }
    }

    render() {
        return (
            <div style={{zIndex: -100, width: '100%', height: '100%'}}>
                <Player
                    width={1000}
                    height={1000}
                    ref="player"
                    {...this.state.viderPlayerProps}>
                    <BigPlayButton position="center"/>
                </Player>
            </div>
        );
    }

}
