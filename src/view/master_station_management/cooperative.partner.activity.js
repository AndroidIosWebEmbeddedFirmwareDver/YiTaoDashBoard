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
                    url: this.props.detialModelData.partnersCoverUrl ? this.props.detialModelData.partnersCoverUrl : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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


class CooperativePartnerActivityEditModalContent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            partnersName: null,//合作伙伴名称
            partnersDesc: null,//合作伙伴描述
            partnersLinks: null,//合作伙伴链接
            partnersCoverUrl: null,//合作伙伴头像图URL
        };
    }

    componentDidMount() {
        super.componentDidMount();
        if (this.props.contentType && this.props.contentType === 'detial' && this.props.contentTypeDetialData) {
            this.setState({
                isDetialModel: !this.state.isDetialModel,
                partnersName: this.props.contentTypeDetialData.partnersName,//合作伙伴名称
                partnersDesc: this.props.contentTypeDetialData.partnersDesc,//合作伙伴描述
                partnersLinks: this.props.contentTypeDetialData.partnersLinks,//合作伙伴链接
                partnersCoverUrl: this.props.contentTypeDetialData.partnersCoverUrl,//合作伙伴头像图URL
            });
        }
    }

    emitEmpty = (type) => {
        switch (type) {
            case 'partnersName':
                this.partnersNameInput.focus();
                this.setState({partnersName: null,});
                break;
            case 'partnersDesc':
                this.partnersDescInput.focus();
                this.setState({partnersDesc: null,});
                break;
            case 'partnersLinks':
                this.partnersLinksInput.focus();
                this.setState({partnersLinks: null,});
                break;
        }

        if (this.props.onChange) {
            this.props.onChange(null);
        }
    };

    onNewPartnersNameChange = (e) => {
        //partnersName 合作伙伴名称
        this.setState({
            partnersName: e.target.value,
        });
        if (this.props.onNewPartnersNameChange) {
            this.props.onNewPartnersNameChange(e.target.value);
        }
    };
    onNewPartnersDescChange = (e) => {
        //partnersDesc 合作伙伴描述
        this.setState({
            partnersDesc: e.target.value,
        });
        if (this.props.onNewPartnersDescChange) {
            this.props.onNewPartnersDescChange(e.target.value);
        }
    };
    onNewPartnersLinksChange = (e) => {
        //partnersLinks 合作伙伴链接
        this.setState({
            partnersLinks: e.target.value,
        });
        if (this.props.onNewPartnersLinksChange) {
            this.props.onNewPartnersLinksChange(e.target.value);
        }
    };
    onNewPartnersCoverUrlChange = (data) => {
        //partnersCoverUrl 合作伙伴头像图URL
        console.log('下载链接：' + data);
        this.setState({
            partnersCoverUrl: data,
        });
        if (this.props.onNewPartnersCoverUrlChange) {
            this.props.onNewPartnersCoverUrlChange(data);
        }
    };


    render() {
        return (
            <div>
                <span>合作伙伴名称：</span>
                <br/>
                <Input
                    disabled={this.state.isDetialModel}
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增合作伙伴名称"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={this.state.isDetialModel ? null :this.state.partnersName ? <Icon type="close-circle"
                                                            onClick={(type) => this.emitEmpty('partnersName')}/> : null}
                    value={this.state.partnersName}
                    onChange={this.onNewPartnersNameChange}
                    ref={node => this.partnersNameInput = node}
                />
                <br/>
                <br/>
                <span>合作伙伴链接：</span>
                <br/>
                <Input
                    disabled={this.state.isDetialModel}
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增合作伙伴链接(例如：http://wwww.xxx.com/abc?id=1212)"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={this.state.isDetialModel ? null :this.state.partnersLinks ? <Icon type="close-circle"
                                                             onClick={(type) => this.emitEmpty('partnersLinks')}/> : null}
                    value={this.state.partnersLinks}
                    onChange={this.onNewPartnersLinksChange}
                    ref={node => this.partnersLinksInput = node}
                />
                <br/>
                <br/>
                <div>
                    <Row>
                        <Col span={8} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>合作伙伴头像：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <PicturesWall
                                        isDetialModel={this.props.contentType === 'detial'}
                                        detialModelData={this.props.contentTypeDetialData}
                                        onSuccessUploadImg={this.onNewPartnersCoverUrlChange}/>
                                </div>
                            </div>
                        </Col>
                        <Col span={16} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>合作伙伴描述：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <TextArea
                                        disabled={this.state.isDetialModel}
                                        rows={5}
                                        placeholder="请输入新增合作伙伴描述（例如：xxxxxxxxxxxxxxxxxxxxxxxxx）"
                                        suffix={this.state.isDetialModel ? null :this.state.partnersDesc ? <Icon type="close-circle"
                                                                                onClick={(type) => this.emitEmpty('partnersDesc')}/> : null}
                                        value={this.state.partnersDesc}
                                        onChange={this.onNewPartnersDescChange}
                                        ref={node => this.partnersDescInput = node}
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


export default class CooperativePartnerActivity extends BaseTableActivityComponent {


    constructor(props) {
        super(props);
        //使用...this.state,继承父类state
        this.state = {
            ...this.state,
            newAdsConfigPartnersName: null,//名称
            newAdsConfigPartnersDesc: null,//描述
            newAdsConfigPartnersLinks: null,//链接
            newAdsConfigPartnersCoverUrl: null,//头像
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
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_PARTNERS_CONFIG_FIND_PAGES).then((data: any) => {
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
                            item['name'] = item.partnersName;
                            item['createdDateTime'] = DateFormatUtil.format(new Date(item.createdDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['modifiedDateTime'] = DateFormatUtil.format(new Date(item.modifiedDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['edit'] = "删除";
                            item['showDetial'] = true;
                            item['showDelete'] = true;
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

        if (!this.state.newAdsConfigPartnersName) {
            DialogCommonManage.showNormalMessage('新合作伙伴名称不能为空');
            return;
        }
        if (!this.state.newAdsConfigPartnersLinks) {
            DialogCommonManage.showNormalMessage('新合作伙伴链接不能为空');
            return;
        }
        if (!this.state.newAdsConfigPartnersCoverUrl) {
            DialogCommonManage.showNormalMessage('新合作伙伴头像不能为空');
            return;
        }
        if (!this.state.newAdsConfigPartnersDesc) {
            DialogCommonManage.showNormalMessage('新广描述不能为空');
            return;
        }
        //加载中
        this.setState(preState => ({
            modalIsConfirmLoading: !preState.modalIsConfirmLoading,
        }));
        let param = {
            partnersName: this.state.newAdsConfigPartnersName,
            partnersCoverUrl: this.state.newAdsConfigPartnersCoverUrl,
            partnersDesc: this.state.newAdsConfigPartnersDesc,
            partnersLinks: this.state.newAdsConfigPartnersLinks,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_PARTNERS_CONFIG_CREATE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('新增合作伙伴成功');
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
                newAdsConfigPartnersName: null,//名称
                newAdsConfigPartnersDesc: null,//描述
                newAdsConfigPartnersLinks: null,//链接
                newAdsConfigPartnersCoverUrl: null,//头像
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
            DialogCommonManage.showNormalMessage('合作伙伴不能为空');
            return;
        }

        //加载中
        this.setState(preState => ({
            tableIsLoading: !preState.tableIsLoading,
        }));
        let param = {
            id: data.id,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_PARTNERS_CONFIG_DELETE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('删除合作伙伴成功');
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

    onNewPartnersNameChange = (data) => {
        //partnersName 合作伙伴名称
        this.setState({
            newAdsConfigPartnersName: data,
        });
    };
    onNewPartnersDescChange = (data) => {
        //partnersDesc 合作伙伴描述
        this.setState({
            newAdsConfigPartnersDesc: data,
        });
    };
    onNewPartnersLinksChange = (data) => {
        //partnersLinks 合作伙伴链接
        this.setState({
            newAdsConfigPartnersLinks: data,
        });
    };
    onNewPartnersCoverUrlChange = (data) => {
        //partnersCoverUrl 合作伙伴头像图URL
        this.setState({
            newAdsConfigPartnersCoverUrl: data,
        });
    };

    //-----------------------------

    modalOnGengerModalContent(): * {
        return (
            <CooperativePartnerActivityEditModalContent
                contentType={this.state.modalIsNeedShowType}
                contentTypeDetialData={this.state.modalIsNeedDetialData}
                onNewPartnersNameChange={(e) => this.onNewPartnersNameChange(e)}
                onNewPartnersDescChange={(e) => this.onNewPartnersDescChange(e)}
                onNewPartnersLinksChange={(e) => this.onNewPartnersLinksChange(e)}
                onNewPartnersCoverUrlChange={(e) => this.onNewPartnersCoverUrlChange(e)}
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
            newAdsConfigPartnersName: ''
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