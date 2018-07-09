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


class PageBannerActivityEditModalContent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            adName: null,//广告名称
            adDesc: null,//广告描述
            adLinks: null,//广告链接
            adCoverUrl: null,//广告封面图URL
            isDetialModel: false,//是否为详情模式
        };
    }


    componentDidMount() {
        super.componentDidMount();
        //contentType={this.state.modalIsNeedShowType}
        if (this.props.contentType && this.props.contentType === 'detial' && this.props.contentTypeDetialData) {
            this.setState({
                isDetialModel: !this.state.isDetialModel,//广告名称
                adName: this.props.contentTypeDetialData.adName,//广告名称
                adDesc: this.props.contentTypeDetialData.adDesc,//广告描述
                adLinks: this.props.contentTypeDetialData.adLinks,//广告链接
                adCoverUrl: this.props.contentTypeDetialData.adCoverUrl,//广告封面图URL
            });
        }
    }

    emitEmpty = (type) => {
        switch (type) {
            case 'adName':
                this.adNameInput.focus();
                this.setState({adName: null,});
                break;
            case 'adDesc':
                this.adDescInput.focus();
                this.setState({adDesc: null,});
                break;
            case 'adLinks':
                this.adLinksInput.focus();
                this.setState({adLinks: null,});
                break;
        }

        if (this.props.onChange) {
            this.props.onChange(null);
        }
    };

    onNewAdNameChange = (e) => {
        //adName 广告名称
        this.setState({
            adName: e.target.value,
        });
        if (this.props.onNewAdNameChange) {
            this.props.onNewAdNameChange(e.target.value);
        }
    };
    onNewAdDescChange = (e) => {
        //adDesc 广告描述
        this.setState({
            adDesc: e.target.value,
        });
        if (this.props.onNewAdDescChange) {
            this.props.onNewAdDescChange(e.target.value);
        }
    };
    onNewAdLinksChange = (e) => {
        //adLinks 广告链接
        this.setState({
            adLinks: e.target.value,
        });
        if (this.props.onNewAdLinksChange) {
            this.props.onNewAdLinksChange(e.target.value);
        }
    };
    onNewAdCoverUrlChange = (data) => {
        //adCoverUrl 广告封面图URL
        console.log('下载链接：' + data);
        this.setState({
            adCoverUrl: data,
        });
        if (this.props.onNewAdCoverUrlChange) {
            this.props.onNewAdCoverUrlChange(data);
        }
    };


    render() {
        return (
            <div>
                <span>广告名称：</span>
                <br/>
                <Input
                    disabled={this.state.isDetialModel}
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增广告名称"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={this.state.isDetialModel ? null : this.state.adName ?
                        <Icon type="close-circle"
                              onClick={(type) => this.emitEmpty('adName')}/> : null}
                    value={this.state.adName}
                    onChange={this.onNewAdNameChange}
                    ref={node => this.adNameInput = node}
                />
                <br/>
                <br/>
                <span>广告链接：</span>
                <br/>
                <Input
                    disabled={this.state.isDetialModel}
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增广告链接(例如：http://wwww.xxx.com/abc?id=1212)"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={this.state.isDetialModel ? null : this.state.adLinks ?
                        <Icon type="close-circle"
                              onClick={(type) => this.emitEmpty('adLinks')}/> : null}
                    value={this.state.adLinks}
                    onChange={this.onNewAdLinksChange}
                    ref={node => this.adLinksInput = node}
                />
                <br/>
                <br/>
                <div>
                    <Row>
                        <Col span={8} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>广告封面：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <PicturesWall
                                        isDetialModel={this.props.contentType === 'detial'}
                                        detialModelData={this.props.contentTypeDetialData}
                                        onSuccessUploadImg={this.onNewAdCoverUrlChange}/>
                                </div>
                            </div>
                        </Col>
                        <Col span={16} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>广告描述：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <TextArea
                                        disabled={this.state.isDetialModel}
                                        rows={5}
                                        placeholder="请输入新增广告描述（例如：xxxxxxxxxxxxxxxxxxxxxxxxx）"
                                        suffix={this.state.isDetialModel ? null : this.state.adDesc ?
                                            <Icon type="close-circle"
                                                  onClick={(type) => this.emitEmpty('adDesc')}/> : null}
                                        value={this.state.adDesc}
                                        onChange={this.onNewAdDescChange}
                                        ref={node => this.adDescInput = node}
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


export default class AsdBannerConfigActivity extends BaseTableActivityComponent {


    constructor(props) {
        super(props);
        //使用...this.state,继承父类state
        this.state = {
            ...this.state,
            newAdsConfigAdName: null,//名称
            newAdsConfigAdDesc: null,//描述
            newAdsConfigAdLinks: null,//链接
            newAdsConfigAdCoverUrl: null,//封面
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

        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_BANAR_ADS_CONFIG_FIND_PAGES).then((data: any) => {
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
                            item['name'] = item.adName;
                            item['createdDateTime'] = DateFormatUtil.format(new Date(item.createdDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['modifiedDateTime'] = DateFormatUtil.format(new Date(item.modifiedDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['name'] = item.adName;
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

        if (!this.state.newAdsConfigAdName) {
            DialogCommonManage.showNormalMessage('新广告名称不能为空');
            return;
        }
        if (!this.state.newAdsConfigAdLinks) {
            DialogCommonManage.showNormalMessage('新广告链接不能为空');
            return;
        }
        if (!this.state.newAdsConfigAdCoverUrl) {
            DialogCommonManage.showNormalMessage('新广告封面不能为空');
            return;
        }
        if (!this.state.newAdsConfigAdDesc) {
            DialogCommonManage.showNormalMessage('新广描述不能为空');
            return;
        }
        //加载中
        this.setState(preState => ({
            modalIsConfirmLoading: !preState.modalIsConfirmLoading,
        }));
        let param = {
            adName: this.state.newAdsConfigAdName,
            adCoverUrl: this.state.newAdsConfigAdCoverUrl,
            adDesc: this.state.newAdsConfigAdDesc,
            adLinks: this.state.newAdsConfigAdLinks,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_BANAR_ADS_CONFIG_CREATE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('新增广告成功');
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
                newAdsConfigAdName: null,//名称
                newAdsConfigAdDesc: null,//描述
                newAdsConfigAdLinks: null,//链接
                newAdsConfigAdCoverUrl: null,//封面
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
            DialogCommonManage.showNormalMessage('广告不能为空');
            return;
        }

        //加载中
        this.setState(preState => ({
            tableIsLoading: !preState.tableIsLoading,
        }));
        let param = {
            id: data.id,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_BANAR_ADS_CONFIG_DELETE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('删除广告成功');
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
            return '新增页面广告';
        } else {
            return '页面广告详情';
        }
    }


    //-----------------------------

    onNewAdNameChange = (data) => {
        //adName 广告名称
        this.setState({
            newAdsConfigAdName: data,
        });
    };
    onNewAdDescChange = (data) => {
        //adDesc 广告描述
        this.setState({
            newAdsConfigAdDesc: data,
        });
    };
    onNewAdLinksChange = (data) => {
        //adLinks 广告链接
        this.setState({
            newAdsConfigAdLinks: data,
        });
    };
    onNewAdCoverUrlChange = (data) => {
        //adCoverUrl 广告封面图URL
        this.setState({
            newAdsConfigAdCoverUrl: data,
        });
    };

    //-----------------------------

    modalOnGengerModalContent(): * {
        return (
            <PageBannerActivityEditModalContent
                contentType={this.state.modalIsNeedShowType}
                contentTypeDetialData={this.state.modalIsNeedDetialData}
                onNewAdNameChange={(e) => this.onNewAdNameChange(e)}
                onNewAdDescChange={(e) => this.onNewAdDescChange(e)}
                onNewAdLinksChange={(e) => this.onNewAdLinksChange(e)}
                onNewAdCoverUrlChange={(e) => this.onNewAdCoverUrlChange(e)}
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
            newAdsConfigAdName: ''
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