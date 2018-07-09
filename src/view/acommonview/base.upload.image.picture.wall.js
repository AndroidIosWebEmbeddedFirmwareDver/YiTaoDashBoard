import React from 'react';
import NetworkCommonUtil from "../../utils/network.common.util";
import DialogCommonManage from "./dialog/dialog.common.manage";
import BaseActivityComponent from "../BaseActivityComponent";

import {Col, Grid, Icon, Input, Layout, Modal, Row, Upload, Button, Spin} from "antd"

export  default class BaseUploadImagePictureWall extends BaseActivityComponent {
    state = {
        previewVisible: false,
        previewImage: '',
        uploadImagResultData: null,
        fileList: [],
    };


    componentDidMount() {
        super.componentDidMount();
        if (this.props.isDetialModel && this.props.detialModelData) {
            this.setState({
                fileList: [{
                    uid: -1,
                    name: 'xxx.png',
                    status: 'done',
                    url: this.props.detialModelData.adCoverUrl ? this.props.detialModelData.adCoverUrl : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }]
            });
        }
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = (file) => {
        // console.log(file);
        if (file.file && file.file.status === "done" && file.file.response) {
            if (file.file.response && file.file.response.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                this.setState({
                    uploadImagResultData: file.file.response.data,
                });
                if (this.props.onSuccessUploadImg) {
                    this.props.onSuccessUploadImg(file.file.response.data && file.file.response.data.fileUid ? NetworkCommonUtil.API_COMMON_FILE_GET_FILE + '?uid=' + file.file.response.data.fileUid : null);
                }
            } else if (file.file.response) {
                DialogCommonManage.showNormalMessage(file.file.response.msg + '');
            } else {
                DialogCommonManage.showNormalMessage('请求网络出错');
            }
        }
        this.setState({
            fileList: file.fileList,
        });
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={NetworkCommonUtil.API_COMMON_FILE_CREATE}
                    name={'file'}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}