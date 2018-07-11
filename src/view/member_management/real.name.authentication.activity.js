import React from 'react';
import BaseTableActivityComponent from "../BaseTableActivityComponent";
import DialogCommonManage from "../acommonview/dialog/dialog.common.manage";
import NetworkCommonUtil from "../../utils/network.common.util";
import BaseActivityComponent from "../BaseActivityComponent";
import {Select, Icon, Input, Layout, Modal, Row, Col, Upload, Button} from "antd";
import DateFormatUtil from "../../utils/date/date.format.util";
import DialogModalMmanage from "../acommonview/dialog/dialog.modal.manage";
import BaseUploadImagePictureWall from "../acommonview/base.upload.image.picture.wall";


const Option = Select.Option;
const {TextArea} = Input;
const ButtonGroup = Button.Group;


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
                    // onChange={this.handleChange}
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

class OrderDemandActivityDetailModalContent extends BaseActivityComponent {

    constructor() {
        super();
        this.state = {
            typeName: null,//分类名称
            typeParentId: -1,//父级id
            typeLevel: 1,//类型级别
            typeCoverImg: null,//封面图片
            typeDesc: null,//类型描述
            isDetialModel: false,//是否为详情模式
            selectHandleResponseData: [],
        };
    }


    componentDidMount() {
        super.componentDidMount();
        this.selectHandleInitData();
    }


    componentWillUnmount() {
        super.componentWillUnmount();
        this.setState({
            selectHandleResponseData: [],
        });
    }

    //----------------------------

    render() {
        const {value, onChange} = this.props;
        const suffix = value ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        return (
            <div>
                <span>名称：</span>
                <br/>
                {this.props.detail_data}
                <br/>
                <br/>
                <span>绑定一级分类：</span>
                <Select
                    showSearch
                    style={{width: '100%', marginTop: 9.6,}}
                    placeholder="请选择要绑定的一级分类"
                    optionFilterProp="children"
                    onChange={(value) => this.selectHandleChange(value)}
                    onFocus={() => this.selectHandleFocus()}
                    onBlur={() => this.selectHandleBlur()}
                    // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.selectHandleContent()}
                </Select>
                <div style={{marginTop: 9.6,}}>
                    <Row>
                        <Col span={8} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>分类封面：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <BaseUploadImagePictureWall
                                        isDetialModel={this.props.contentType === 'detial'}
                                        detialModelData={this.props.contentTypeDetialData}
                                        onSuccessUploadImg={this.onNewTypeCoverImgChange}/>
                                </div>
                            </div>
                        </Col>
                        <Col span={16} style={{backgroundColor: "transparent", textAlign: "left",}}>
                            <div>
                                <span>分类描述：</span>
                                <br/>
                                <div style={{marginTop: 9.6, textAlign: 'center'}}>
                                    <TextArea
                                        disabled={this.state.isDetialModel}
                                        rows={5}
                                        placeholder="请输入新增分类描述（例如：xxxxxxxxxxxxxxxxxxxxxxxxx）"
                                        suffix={this.state.isDetialModel ? null : this.state.typeDesc ?
                                            <Icon type="close-circle"
                                                  onClick={(type) => this.emitEmpty('adDesc')}/> : null}
                                        value={this.state.typeDesc}
                                        onChange={this.onNewTypeDescChange}
                                        ref={node => this.typeDescInput = node}
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


export default class OrderDemandActivity extends BaseTableActivityComponent {



    constructor(props) {
        super(props);
        //使用...this.state,继承父类state
        this.state = {
            ...this.state,
            isShowAddPlugi:false,
            newTypeName: '',
            newTypeDesc: '',
            newTypeCoverImg: '',
            newTypeLevel: 2,
            newTypeParentId: -1,
            status: 1,
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
            data: {
                rnaStatus: this.state.status,
            }
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_RELEASE_MANAGEMENT_OF_AUTHENTICATION_FIND_PAGES).then((data: any) => {
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
                            if (item.rnaStatus === 1) {
                                item['showDelete'] = true;
                                item['showMore'] = true;
                                item['showMoreMsg'] = '不通过';
                                item['edit'] = "通过";
                            }
                            if (item.rnaStatus === 2) {
                                item['showMore'] = true;
                                item['showMoreMsg'] = '不通过';
                            }
                            if (item.rnaStatus === 3) {
                                item['showDelete'] = true;
                                item['edit'] = "通过";
                            }

                            item['showDetial'] = true;
                            item['showDetialMsg'] = '详情';
                            item['name'] = item.rnaNmae;
                            item['createdDateTime'] = DateFormatUtil.format(new Date(item.createdDateTime), 'yyyy-MM-dd hh:mm:ss');
                            item['modifiedDateTime'] = DateFormatUtil.format(new Date(item.modifiedDateTime), 'yyyy-MM-dd hh:mm:ss');
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

    //------------------------------------

    /**
     * 变更状态
     * @returns {Array}
     */
    changeOrderStatus(data: any, status): boolean {
        if (!data || status < 0) {
            return;
        }
        if (!data.id) {
            DialogCommonManage.showNormalMessage('用户不能为空');
            return;
        }

        //加载中
        this.setState(preState => ({
            tableIsLoading: !preState.tableIsLoading,
        }));
        let param = {
            id: data.id,
            status:status,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_RELEASE_MANAGEMENT_OF_AUTHENTICATION_CHANGE_STATUS).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('成功');
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

    consoleLogTag(): string {
        return 'FirstClassClassificationActivity:\n';
    }

    /***
     * cell 操作按钮1
     * @param data
     * @param index
     */
    detialInfoOperationAction(data, index) {
        DialogModalMmanage.showInfo('详情',
            <div>
                <span>名称：</span>
                <br/>
                <Input
                    disabled={true}
                    style={{marginTop: 9.6,}}
                    value={data.rnaNmae}
                />
                <br/>
                <br/>
                <span>身份证号：</span>
                <br/>
                <Input
                    disabled={true}
                    style={{marginTop: 9.6,}}
                    value={data.rnaIdCardNo}
                />
                <br/>
                <br/>
                <Row>
                    <Col span={14}>
                        <span>身份证：</span>
                        <br/>
                        <div style={{marginTop: 9.6, textAlign: 'center', float: 'left'}}>
                            <PicturesWall
                                isDetialModel={ true }
                                detialModelData={data.rnaIdCardFontFileUid}/>
                        </div>
                        <div style={{marginTop: 9.6, textAlign: 'center', float: 'left' }}>
                            <PicturesWall
                                isDetialModel={ true }
                                detialModelData={data.rnaIdCardBackFileUid}/>
                        </div>
                    </Col>
                    <Col span={10}>
                        <span>工作证：</span>
                        <br />
                        <div style={{marginTop: 9.6, textAlign: 'center', float: 'left' }}>
                            <PicturesWall
                                isDetialModel={ true }
                                detialModelData={data.rnaWorkCardFontFileUid}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    };

    /**
     * cell 操作按钮2
     * @param data
     * @param index
     */
    editOperationAction(data, index) {
        DialogModalMmanage.showDeleteConfirm('提示', '请确定要通过认证么？', '确定', '取消', () => {
            this.changeOrderStatus(data, 2);
        }, null)
    };

    /**
     * cell 操作按钮3
     * @param data
     * @param index
     */
    showMoreOperationAction(data, index) {
        DialogModalMmanage.showDeleteConfirm('提示', '请确定不通过认证么？', '确定', '取消', () => {
            this.changeOrderStatus(data, 3);
        }, null)
    };

    modalOnGengerModalTitle(): null {
        return '新增二级分类';
    }

    //-----------------------------

    onNewTypeNameChange = (data) => {
        this.setState({
            newTypeName: data,
        });
    };
    onNewTypeDescChange = (data) => {
        this.setState({
            newTypeDesc: data,
        });
    };
    onNewTypeParentIdChange = (data) => {
        this.setState({
            newTypeParentId: data,
        });
    };

    onNewTypeCoverImgChange = (data) => {
        //adCoverUrl 广告封面图URL
        this.setState({
            newTypeCoverImg: data,
        });
    };

    //-----------------------------

    modalOnGengerModalContent(): * {
        return (
            <OrderDemandActivityDetailModalContent
                onNewTypeNameChange={(e) => this.onNewTypeNameChange(e)}
                onNewTypeDescChange={(e) => this.onNewTypeDescChange(e)}
                onNewTypeParentIdChange={(e) => this.onNewTypeParentIdChange(e)}
                onNewTypeCoverImgChange={(e) => this.onNewTypeCoverImgChange(e)}
            />
        );
    }

    /**
     * 顶部tab选择器
     * @param e
     * @param index
     */
    onStatusTabGroupChange(e, index) {
        this.state.status = index;
        this.state.tableNowPage = 0;
        this.setState({
            status: index,
            tableNowPage: 0,
        });
        this.loadNetWorkData(this.state.tableNowPage);
    };

    render(): * {
        return (
            <div>
                <div style={{textAlign: 'right', marginBottom: 19.2,}}>
                    <ButtonGroup>
                        <Button type={'primary'}  onClick={(e) => this.onStatusTabGroupChange(e, 1)}>待认证</Button>
                        <Button type={'primary'} onClick={(e) => this.onStatusTabGroupChange(e, 2)}>已通过</Button>
                        <Button type={'primary'} onClick={(e) => this.onStatusTabGroupChange(e, 3)}>未通过</Button>
                    </ButtonGroup>
                </div>
                {super.render()}
            </div>
        );

    }
}