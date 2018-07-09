import React from 'react';
import BaseTableActivityComponent from "../BaseTableActivityComponent";
import DialogCommonManage from "../acommonview/dialog/dialog.common.manage";
import NetworkCommonUtil from "../../utils/network.common.util";
import BaseActivityComponent from "../BaseActivityComponent";

import {Col, Grid, Icon, Input, Layout, Modal, Row, Upload, Button, Spin} from "antd";

import DateFormatUtil from "../../utils/date/date.format.util";
import DialogModalMmanage from "../acommonview/dialog/dialog.modal.manage";
import BaseUploadImagePictureWall from "../acommonview/base.upload.image.picture.wall";


const {TextArea} = Input;


class FirstClassClassificationActivityEditModalContent extends BaseActivityComponent {


    constructor(props) {
        super(props);
        this.state = {
            typeName: null,//分类名称
            typeParentId: -1,//父级id
            typeLevel: 1,//类型级别
            typeCoverImg: null,//封面图片
            typeDesc: null,//类型描述
            isDetialModel: false,//是否为详情模式
        };
    }


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


    render() {
        const {value, onChange} = this.props;
        const suffix = value ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        return (
            <div>
                <span>名称：</span>
                <br/>
                <Input
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增一级分类名称"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={suffix}
                    value={this.state.typeName}
                    onChange={this.onNewTypeNameChange}
                    ref={node => this.typeNameInput = node}
                />
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


export default class FirstClassClassificationActivity extends BaseTableActivityComponent {


    constructor(props) {
        super(props);
        //使用...this.state,继承父类state
        this.state = {
            ...this.state,
            newTypeName: '',
            newTypeDesc: '',
            newTypeCoverImg: '',
            newTypeLevel: 1,
            newTypeParentId: -1,
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
                level: this.state.newTypeLevel,
            }
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_COMMON_TYPE_FINDPAGES).then((data: any) => {
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
                            item['showDelete'] = true;
                            item['edit'] = "删除";
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
     * 新建一条
     * @returns {Array}
     */
    netWorkCreateNew(): boolean {
        if (!this.state.newTypeName) {
            DialogCommonManage.showNormalMessage('新类型名称不能为空');
            return;
        }
        if (!this.state.newTypeCoverImg) {
            DialogCommonManage.showNormalMessage('新类型封面图片不能为空');
            return;
        }
        //加载中
        this.setState(preState => ({
            modalIsConfirmLoading: !preState.modalIsConfirmLoading,
        }));
        let param = {
            name: this.state.newTypeName,
            desc: this.state.newTypeName,
            coverImg: this.state.newTypeCoverImg,
            level: this.state.newTypeLevel,
            parentId: this.state.newTypeParentId,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_COMMON_TYPE_CREATE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('新增一级分类成功');
                this.loadNetWorkData();
            } else if (data) {
                DialogCommonManage.showNormalMessage(data.msg + '');
            } else {
                DialogCommonManage.showNormalMessage('请求网络出错');
            }
            this.setState(preState => ({
                modalIsConfirmLoading: !preState.modalIsConfirmLoading,
                modalIsNeedShow: !preState.modalIsNeedShow,
                newTypeName: '',
                newTypeDesc: '',
                newTypeCoverImg: ''
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
            DialogCommonManage.showNormalMessage('一级分类不能为空');
            return;
        }

        //加载中
        this.setState(preState => ({
            tableIsLoading: !preState.tableIsLoading,
        }));
        let param = {
            id: data.id,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_COMMON_TYPE_DELETE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('删除一级类成功');
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


    //新增
    modalOnAddBtnClick(e): void {
        super.modalOnAddBtnClick(e);
    }


    //删除
    editOperationAction(data, index): void {
        super.editOperationAction(data, index);
        DialogModalMmanage.showDeleteConfirm('提示', '你确定要删除么？', '确定', '取消', () => {
            this.netWorkDeleteOld(data, index);
        }, null)
    }


    modalOnGengerModalTitle(): null {
        return '新增一级分类';
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

    onNewTypeCoverImgChange = (data) => {
        //adCoverUrl 广告封面图URL
        this.setState({
            newTypeCoverImg: data,
        });
    };

    //-----------------------------
    modalOnGengerModalContent(): * {
        return (
            <FirstClassClassificationActivityEditModalContent
                onNewTypeNameChange={(e) => this.onNewTypeNameChange(e)}
                onNewTypeDescChange={(e) => this.onNewTypeDescChange(e)}
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


    render(): * {
        return (
            <div>
                {super.render()}
            </div>
        );

    }
}