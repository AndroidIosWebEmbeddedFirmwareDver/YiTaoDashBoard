import React from 'react';
import BaseTableActivityComponent from "../BaseTableActivityComponent";
import DialogCommonManage from "../acommonview/dialog/dialog.common.manage";
import DialogModalMmanage from "../acommonview/dialog/dialog.modal.manage";
import NetworkCommonUtil from "../../utils/network.common.util";
import DateFormatUtil from "../../utils/date/date.format.util";
import BaseActivityComponent from "../BaseActivityComponent";
import {Col, Grid, Icon, Input, Layout, Modal, Row, Upload, Button, Spin} from "antd";

const {TextArea} = Input;


class PicturesWall extends BaseActivityComponent {
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
                    url: this.props.detialModelData.certChainTempleUrl ? this.props.detialModelData.certChainTempleUrl : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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


class CertificateChainTemplateSettingActivityEditModalContent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            certChainName: null,//证书模板名称
            certChainDesc: null,//证书模板描述
            certChainTempleUrl: null,//证书模板封面图URL
            isDetialModel: false,//是否为详情模式
        };
    }


    componentDidMount() {
        super.componentDidMount();
        //contentType={this.state.modalIsNeedShowType}
        if (this.props.contentType && this.props.contentType === 'detial' && this.props.contentTypeDetialData) {
            this.setState({
                isDetialModel: !this.state.isDetialModel,//证书模板名称
                certChainName: this.props.contentTypeDetialData.certChainName,//证书模板名称
                certChainDesc: this.props.contentTypeDetialData.certChainDesc,//证书模板描述
                certChainTempleUrl: this.props.contentTypeDetialData.certChainTempleUrl,//证书模板封面图URL
            });
        }
    }

    emitEmpty = (type) => {
        switch (type) {
            case 'certChainName':
                this.certChainNameInput.focus();
                this.setState({certChainName: null,});
                break;
            case 'certChainDesc':
                this.certChainDescInput.focus();
                this.setState({certChainDesc: null,});
                break;
        }

        if (this.props.onChange) {
            this.props.onChange(null);
        }
    };

    onNewCertChainNameChange = (e) => {
        //certChainName 证书模板名称
        this.setState({
            certChainName: e.target.value,
        });
        if (this.props.onNewCertChainNameChange) {
            this.props.onNewCertChainNameChange(e.target.value);
        }
    };
    onNewCertChainDescChange = (e) => {
        //certChainDesc 证书模板描述
        this.setState({
            certChainDesc: e.target.value,
        });
        if (this.props.onNewCertChainDescChange) {
            this.props.onNewCertChainDescChange(e.target.value);
        }
    };

    onNewCertChainTempleUrlChange = (data) => {
        //certChainTempleUrl 证书模板封面图URL
        console.log('下载链接：' + data);
        this.setState({
            certChainTempleUrl: data,
        });
        if (this.props.onNewCertChainTempleUrlChange) {
            this.props.onNewCertChainTempleUrlChange(data);
        }
    };


    render() {
        return (
            <div>
                <span>证书模板名称：</span>
                <br/>
                <Input
                    disabled={this.state.isDetialModel}
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增证书模板名称"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={this.state.isDetialModel ? null : this.state.certChainName ?
                        <Icon type="close-circle"
                              onClick={(type) => this.emitEmpty('certChainName')}/> : null}
                    value={this.state.certChainName}
                    onChange={this.onNewCertChainNameChange}
                    ref={node => this.certChainNameInput = node}
                />

                <br/>
                <br/>
                <div>
                    <Row>
                        <Col span={8} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>证书模板封面：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <PicturesWall
                                        isDetialModel={this.props.contentType === 'detial'}
                                        detialModelData={this.props.contentTypeDetialData}
                                        onSuccessUploadImg={this.onNewCertChainTempleUrlChange}/>
                                </div>
                            </div>
                        </Col>
                        <Col span={16} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>证书模板描述：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <TextArea
                                        disabled={this.state.isDetialModel}
                                        rows={5}
                                        placeholder="请输入新增证书模板描述（例如：xxxxxxxxxxxxxxxxxxxxxxxxx）"
                                        suffix={this.state.isDetialModel ? null : this.state.certChainDesc ?
                                            <Icon type="close-circle"
                                                  onClick={(type) => this.emitEmpty('certChainDesc')}/> : null}
                                        value={this.state.certChainDesc}
                                        onChange={this.onNewCertChainDescChange}
                                        ref={node => this.certChainDescInput = node}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}


export default class CertificateChainTemplateSettingActivity extends BaseTableActivityComponent {


    constructor(props) {
        super(props);
        //使用...this.state,继承父类state
        this.state = {
            ...this.state,
            newConfigCertChainName: null,//名称
            newConfigCertChainDesc: null,//描述
            newConfigCertChainTempleUrl: null,//封面
        };
    }


    componentDidMount(): void {
        super.componentDidMount();
        this.loadNetWorkData(this.state.tableNowPage);
    }


    //------------------------------------
    /**
     * 加载数据
     * @returns {Array}
     */
    loadNetWorkData(page: number): Array {
        this.setState({
            tableIsLoading: true,
        });
        console.log("page--->", page);
        let param = {
            page: page >= 0 ? page : this.state.tableNowPage,
            size: this.state.tablePageSize,
            sort: this.state.tablePageDateSort,
            sortDirecion: this.state.tablePageDateSortDirecion,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_CERT_CHAIN_CONFIG_FIND_PAGES).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                if (data.data) {
                    this.setState(preState => ({
                        tableNowPage: data.data.nowPage,
                        tableTotalSize: data.data.totalSize + '',
                        tablePagination: {
                            total: data.data.totalSize,
                        }
                    }));

                    this.setState({
                        tableNowPage: data.data.nowPage,
                        tableTotalSize: data.data.totalSize + '',

                    });
                    if (data.data.data && data.data.data.length > 0) {

                        data.data.data.map((item) => {
                            item['name'] = item.certChainName;
                            item['createdDateTime'] = DateFormatUtil.format(new Date(item.createdDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['modifiedDateTime'] = DateFormatUtil.format(new Date(item.modifiedDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['name'] = item.certChainName;
                            item['edit'] = "删除";
                            item['showDelete'] = true;
                            item['showDetial'] = true;
                        });
                        this.setState({
                            responseData: data.data.data,
                        });
                    } else {
                        this.setState({
                            responseData: [],
                        });
                    }
                }
            } else if (data) {
                DialogCommonManage.showNormalMessage(data.msg + '');
            } else {
                DialogCommonManage.showNormalMessage('请求网络出错');
            }

            this.setState({
                tableIsLoading: false,
            });
        });


        return super.loadNetWorkData();
    }


    /**
     * 新建一条
     * @returns {Array}
     */
    netWorkCreateNew(): boolean {

        if (!this.state.newConfigCertChainName) {
            DialogCommonManage.showNormalMessage('新证书模板名称不能为空');
            return;
        }

        if (!this.state.newConfigCertChainTempleUrl) {
            DialogCommonManage.showNormalMessage('新证书模板封面不能为空');
            return;
        }
        if (!this.state.newConfigCertChainDesc) {
            DialogCommonManage.showNormalMessage('新广描述不能为空');
            return;
        }
        //加载中
        this.setState(preState => ({
            modalIsConfirmLoading: !preState.modalIsConfirmLoading,
        }));
        let param = {
            certChainName: this.state.newConfigCertChainName,
            certChainTempleUrl: this.state.newConfigCertChainTempleUrl,
            certChainDesc: this.state.newConfigCertChainDesc,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_CERT_CHAIN_CONFIG_CREATE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('新增证书模板成功');
                this.loadNetWorkData();
                this.setState(preState => ({
                    modalIsNeedShow: !preState.modalIsNeedShow,
                }));
            } else if (data) {
                DialogCommonManage.showNormalMessage(data.msg + '');
            } else {
                DialogCommonManage.showNormalMessage('请求网络出错');
            }
            this.setState(preState => ({
                modalIsConfirmLoading: !preState.modalIsConfirmLoading,
                newConfigCertChainName: null,//名称
                newConfigCertChainDesc: null,//描述
                newConfigCertChainTempleUrl: null,//封面
            }));
        });
    }

    /**
     * 删除一条
     * @returns {Array}
     */
    netWorkDeleteOld(data: any, index: number): boolean {
        if (!data || index < 0) {
            return;
        }
        if (!data.id) {
            DialogCommonManage.showNormalMessage('证书模板不能为空');
            return;
        }

        //加载中
        this.setState(preState => ({
            tableIsLoading: !preState.tableIsLoading,
        }));
        let param = {
            id: data.id,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_CERT_CHAIN_CONFIG_DELETE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('删除证书模板成功');
                this.loadNetWorkData();
            } else if (data) {
                DialogCommonManage.showNormalMessage(data.msg + '');
            } else {
                DialogCommonManage.showNormalMessage('请求网络出错');
            }
            this.setState(preState => ({
                tableIsLoading: !preState.tableIsLoading,
            }));
        });
    }

    //------------------------------------


    onAddBtnClick(e): void {
        super.onAddBtnClick(e);
    }

    consoleLogTag(): string {
        return 'FirstClassClassificationActivity:\n';
    }

    //删除
    editOperationAction(data, index): void {
        super.editOperationAction(data, index);
        DialogModalMmanage.showDeleteConfirm('提示', '你确定要删除么？', '确定', '取消', () => {
            this.netWorkDeleteOld(data, index);
        }, null)
    }

    //详情
    detialInfoOperationAction(data, index): void {
        super.detialInfoOperationAction(data, index);

    }

    //新增
    modalOnAddBtnClick(e): void {
        super.modalOnAddBtnClick(e);
    }


    modalOnGengerModalTitle(): null {
        if (this.state.modalIsNeedShowType === 'create') {
            return '新增证书模板';
        } else {
            return '证书模板详情';
        }
    }


    //-----------------------------

    onNewCertChainNameChange = (data) => {
        //certChainName 证书模板名称
        this.setState({
            newConfigCertChainName: data,
        });
    };
    onNewCertChainDescChange = (data) => {
        //certChainDesc 证书模板描述
        this.setState({
            newConfigCertChainDesc: data,
        });
    };

    onNewCertChainTempleUrlChange = (data) => {
        //certChainTempleUrl 证书模板封面图URL
        this.setState({
            newConfigCertChainTempleUrl: data,
        });
    };

    //-----------------------------
    modalOnGengerModalContent(): * {
        return (
            <CertificateChainTemplateSettingActivityEditModalContent
                contentType={this.state.modalIsNeedShowType}
                contentTypeDetialData={this.state.modalIsNeedDetialData}
                onNewCertChainNameChange={(e) => this.onNewCertChainNameChange(e)}
                onNewCertChainDescChange={(e) => this.onNewCertChainDescChange(e)}
                onNewCertChainTempleUrlChange={(e) => this.onNewCertChainTempleUrlChange(e)}
            />
        );
    }


    modalOnAddModalSureClick(e): void {
        super.modalOnAddModalSureClick(e);
        this.netWorkCreateNew();
    }

    modalOnAddModalCancleClick(e): void {
        super.modalOnAddModalCancleClick(e);
        this.setState({
            newConfigCertChainName: ''
        });
    }


    render(): * {
        return (
            <div>
                {super.render()}
            </div>
        );

    }
}