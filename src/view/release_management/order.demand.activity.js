import React from 'react';
import BaseTableActivityComponent from "../BaseTableActivityComponent";
import DialogCommonManage from "../acommonview/dialog/dialog.common.manage";
import NetworkCommonUtil from "../../utils/network.common.util";
import BaseActivityComponent from "../BaseActivityComponent";
import {Select, Icon, Input, Layout, Modal, Row, Col, Button} from "antd";
import DateFormatUtil from "../../utils/date/date.format.util";
import DialogModalMmanage from "../acommonview/dialog/dialog.modal.manage";
import BaseUploadImagePictureWall from "../acommonview/base.upload.image.picture.wall";


const Option = Select.Option;
const {TextArea} = Input;
const ButtonGroup = Button.Group;

class OrderDemandActivityEditModalContent extends BaseActivityComponent {

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
    emitEmpty = (type) => {
        switch (type) {
            case 'typeName':
                this.typeNameInput.focus();
                this.setState({typeName: null,});
                break;
            case 'typeDesc':
                this.typeDescInput.focus();
                this.setState({typeDesc: null,});
                break;
        }

        if (this.props.onChange) {
            this.props.onChange(null);
        }
    };

    onNewTypeNameChange = (e) => {
        this.setState({
            typeName: e.target.value,
        });
        if (this.props.onNewTypeNameChange) {
            this.props.onNewTypeNameChange(e.target.value);
        }
    };
    onNewTypeDescChange = (e) => {
        this.setState({
            typeDesc: e.target.value,
        });
        if (this.props.onNewTypeDescChange) {
            this.props.onNewTypeDescChange(e.target.value);
        }
    };


    onNewTypeCoverImgChange = (data) => {
        this.setState({
            typeCoverImg: data,
        });

        if (this.props.onNewTypeCoverImgChange) {
            this.props.onNewTypeCoverImgChange(data);
        }
    };

    //----------------------------

    selectHandleInitData = () => {
        let param = {
            level: 1,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_COMMON_TYPE_FIND_ALL_BY_LEVEL).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                if (data.data) {
                    if (data.data.length > 0) {
                        data.data.map((item) => {
                            item['key'] = item.id;
                            item['value'] = item.id;
                        });

                        this.setState({
                            selectHandleResponseData: data.data,
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
    };

    selectHandleChange = (value) => {
        console.log(`selected ${value}`);
        if (this.props.onNewTypeParentIdChange && this.state.selectHandleResponseData && this.state.selectHandleResponseData.length > value - 1) {
            this.props.onNewTypeParentIdChange(this.state.selectHandleResponseData[value - 1].id);
        }
    };

    selectHandleBlur = () => {
        console.log('blur');
    };

    selectHandleFocus = () => {
        console.log('focus');
    };

    selectHandleContent = () => {
        let datas = [
            {key: '1', value: 'a'},
        ];
        if (this.state.selectHandleResponseData) {
            return this.state.selectHandleResponseData.map((item) => {
                return (
                    <Option value={item.value} key={item.key}>
                        <Icon type="select" style={{color: 'rgba(0,0,0,.25)'}}/>&nbsp; {item.name}
                    </Option>
                );
            });
        } else {
            return datas.map((item) => {
                return (
                    <Option value={item.value} key={item.key}>
                        <Icon type="select" style={{color: 'rgba(0,0,0,.25)'}}/>{item.name}
                    </Option>
                );
            });
        }
    };

    render() {
        const {value, onChange} = this.props;
        const suffix = value ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        return (
            <div>
                <span>名称：</span>
                <br/>
                <Input
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增二级分类名称"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={suffix}
                    value={this.state.typeName}
                    onChange={this.onNewTypeNameChange}
                    ref={node => this.typeNameInput = node}
                />
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
            status: 0,
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
                status: this.state.status,
            }
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_RELEASE_MANAGEMENT_OF_DEMAND_FIND_PAGES).then((data: any) => {
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
                            if (item.status === 0) {
                                item['showDelete'] = true;
                                item['showMore'] = true;
                                item['showMoreMsg'] = '不通过';
                                item['edit'] = "通过";
                            }
                            if (item.status === 1) {
                                item['showMore'] = true;
                                item['showMoreMsg'] = '不通过';
                            }

                            if (item.status === 2) {
                                item['showDelete'] = true;
                                item['edit'] = "通过";
                            }

                            item['showDetial'] = true;
                            item['showDetialMsg'] = '详情';
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

    /**
     * 删除一条
     * @returns {Array}
     */
    changeOrderStatus(data: any, status): boolean {
        if (!data || status < 0) {
            return;
        }
        if (!data.id) {
            DialogCommonManage.showNormalMessage('订单不能为空');
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
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_RELEASE_MANAGEMENT_OF_DEMAND_CHANGE_STATUS).then((data: any) => {
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

    //------------------------------------


    onAddBtnClick(e): void {
        super.onAddBtnClick(e);
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
        DialogModalMmanage.showInfo('提示', JSON.stringify(data))
    };

    /**
     * cell 操作按钮2
     * @param data
     * @param index
     */
    editOperationAction(data, index) {
        DialogModalMmanage.showDeleteConfirm('提示', '请确定要通过审核么？', '确定', '取消', () => {
            this.changeOrderStatus(data, 1);
        }, null)
    };

    /**
     * cell 操作按钮3
     * @param data
     * @param index
     */
    showMoreOperationAction(data, index) {
        DialogModalMmanage.showDeleteConfirm('提示', '请确定不通过审核么？', '确定', '取消', () => {
            this.changeOrderStatus(data, 2);
        }, null)
    };

    //新增
    modalOnAddBtnClick(e): void {
        DialogCommonManage.showNormalMessage('订单应当由用户创建');
    }

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
            <OrderDemandActivityEditModalContent
                onNewTypeNameChange={(e) => this.onNewTypeNameChange(e)}
                onNewTypeDescChange={(e) => this.onNewTypeDescChange(e)}
                onNewTypeParentIdChange={(e) => this.onNewTypeParentIdChange(e)}
                onNewTypeCoverImgChange={(e) => this.onNewTypeCoverImgChange(e)}
            />
        );
    }

    onNewInputChange(e) {
        if (e) {
            this.setState({
                newTypeName: e.target.value
            });
        } else {
            this.setState({
                newTypeName: ''
            });
        }
    }


    modalOnAddModalSureClick(e): void {
        super.modalOnAddModalSureClick(e);
        this.netWorkCreateNew();
    }

    modalOnAddModalCancleClick(e): void {
        super.modalOnAddModalCancleClick(e);
        this.setState({
            newTypeName: ''
        });
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
                        <Button type={'primary'}  onClick={(e) => this.onStatusTabGroupChange(e, 0)}>待审核</Button>
                        <Button type={'primary'} onClick={(e) => this.onStatusTabGroupChange(e, 1)}>已通过</Button>
                        <Button type={'primary'} onClick={(e) => this.onStatusTabGroupChange(e, 2)}>未通过</Button>
                    </ButtonGroup>
                </div>
                {super.render()}
            </div>
        );

    }
}