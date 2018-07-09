import React from 'react';
import {Button, Icon, Input, Layout, Modal, Popconfirm, Table} from "antd";
import BaseActivityComponent from "./BaseActivityComponent";
import TmemeStylesheetConfig from '../config/tmeme.stylesheet.config'
import DialogCommonManage from "./acommonview/dialog/dialog.common.manage";
import {ModalFunc} from "antd/lib/modal/Modal";


class BaseTableActivityComponentColumn extends BaseActivityComponent {
    static  _baseColumn = (detialInfoOperationAction, editOperationAction, showMoreOperationAction) => {
        return [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: false,
                fixed: false,
                width: '10%',
                align: 'left',
                render: (text, record, index) => BaseTableActivityComponentCell._baseColumnCellRender(text, record, index),
            },
            {
                title: '名称',
                dataIndex: 'name',
                sorter: false,
                fixed: false,
                width: '20%',
                align: 'left',
                render: (text, record, index) => BaseTableActivityComponentCell._baseColumnCellRender(text, record, index),
            },
            {
                title: '创建时间',
                dataIndex: 'createdDateTime',
                sorter: false,
                width: '20%',
                align: 'left',
                render: (text, record, index) => BaseTableActivityComponentCell._baseColumnCellRender(text, record, index),
            },
            {
                title: '更新时间',
                dataIndex: 'modifiedDateTime',
                sorter: false,
                width: '20%',
                align: 'left',
                render: (text, record, index) => BaseTableActivityComponentCell._baseColumnCellRender(text, record, index),
            },
            {
                title: '是否启用',
                dataIndex: 'isDeleted',
                sorter: false,
                width: '10%',
                align: 'center',
                render: (text, record, index) => BaseTableActivityComponentCell._baseColumnCellRender(text === 0 ? '已启用' : '已禁用', record, index),
            },
            {
                title: '操作',
                dataIndex: 'edit',
                sorter: false,
                width: '30%',
                align: 'center',
                // render: (text, record, index) => this._baseColumnCellRender(text, record, index),
                render: (text, record, index) => BaseTableActivityComponentEditCell._baseColunmoEditOperationsCellRender(text, record, detialInfoOperationAction, editOperationAction, showMoreOperationAction, index),
            },
        ];
    };
}

class BaseTableActivityComponentCell extends BaseActivityComponent {


    _isBaseNumber = (index) => {
        return index % 2;
    };


    static  _baseColumnCellRender = (text, data, index) => {
        return (
            <BaseTableActivityComponentCell key={index} text={text} data={data} index={index}/>
        );
    };


    render() {
        const {text, data, index} = this.props;
        return (
            <div style={{
                backgroundColor: this._isBaseNumber(index) ? "transparent" : 'transparent',
                fontSize: 14,
                color: TmemeStylesheetConfig.baseColor,
            }}>

                {text}
            </div>
        )
    }
}

class BaseTableActivityComponentEditCell extends BaseActivityComponent {

    static _baseColunmoEditOperationsCellRender = (text, data, detialInfoOperationAction, editOperationAction, showMoreOperationAction, index) => {
        return (
            <BaseTableActivityComponentEditCell key={index}
                                                text={text}
                                                index={index}
                                                data={data}
                                                detialInfoOperationAction={detialInfoOperationAction}
                                                editOperationAction={editOperationAction}
                                                showMoreOperationAction={showMoreOperationAction}
            />);
    };

    render() {
        const {text, data, detialInfoOperationAction, editOperationAction, showMoreOperationAction, index} = this.props;
        return (
            <div>
                {data && data.showDetial ?
                    <a style={{
                        border: "1px solid " + TmemeStylesheetConfig.baseColor,
                        backgroundColor: TmemeStylesheetConfig.baseColor,
                        borderTopRightRadius: 4.8,
                        borderTopLeftRadius: 4.8,
                        borderBottomLeftRadius: 4.8,
                        borderBottomRightRadius: 4.8,
                        padding: 4.8,
                        color: '#FFFFFF',
                        fontSize: 12,
                    }}
                       onClick={() => detialInfoOperationAction(data, index)}>{data.showDetialMsg ? data.showDetialMsg : '详情'}</a>
                    : null
                }
                {data && data.showDelete ?
                    <a style={{
                        border: "1px solid " + TmemeStylesheetConfig.baseColor,
                        backgroundColor: TmemeStylesheetConfig.baseColor,
                        borderTopRightRadius: 4.8,
                        borderTopLeftRadius: 4.8,
                        borderBottomLeftRadius: 4.8,
                        borderBottomRightRadius: 4.8,
                        marginLeft: 9.6,
                        padding: 4.8,
                        color: '#FFFFFF',
                        fontSize: 12,
                    }} onClick={() => editOperationAction(data, index)}>{text}</a>
                    : null
                }
                {data && data.showMore && data.showMoreMsg ?
                    <a style={{
                        border: "1px solid " + TmemeStylesheetConfig.baseColor,
                        backgroundColor: TmemeStylesheetConfig.baseColor,
                        borderTopRightRadius: 4.8,
                        borderTopLeftRadius: 4.8,
                        borderBottomLeftRadius: 4.8,
                        borderBottomRightRadius: 4.8,
                        marginLeft: 9.6,
                        padding: 4.8,
                        color: '#FFFFFF',
                        fontSize: 12,
                    }} onClick={() => showMoreOperationAction(data, index)}>{data.showMoreMsg}</a>
                    : null
                }
            </div>
        );
    }
}


export default class BaseTableActivityComponent extends BaseActivityComponent {
    state = {
        rowKey: "id",
        responseData: [],
        tableNowPage: 0,
        tablePageSize: 5,
        tablePageDateSort: 'id',
        tablePageDateSortDirecion: 1,
        tableTotalSize: '0',
        tableIsLoading: false,
        tablePagination: {
            position: 'bottom',//'top' | 'bottom' | 'both'
            defaultCurrent: 1,
            defaultPageSize: 5,
            total: 0,
            size: '5',
            onChange: (page, pageSize) => this.onTablePaginationChange(page, pageSize)
        },
        modalIsNeedShowType: 'create',//'create','detial'
        modalIsNeedDetialData: null,//显示详情的data
        modalIsNeedShow: false,
        modalIsConfirmLoading: false,
        modalIsMaskClosable: false,
        modalIsDestroyOnClose: true,
        modalIsShowRightTopClosable: false,
        modalShowCancleText: '取消',
        modalShowSureText: '确定',
        isShowAddPlugi: true,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        // //初始化数据
        // // 方法二：使用preState、concat创建新数组
        // this.setState(preState => ({
        //     responseData: preState.responseData.concat(this.initLoadDatas())
        // }));

    }


    componentWillUnmount() {
        super.componentWillUnmount();
    }

    consoleLogTag() {
        return 'BASETABLEACTIVITY:\n';
    }


    /***
     * cell 操作按钮1
     * @param data
     * @param index
     */
    detialInfoOperationAction(data, index) {
        this.setState({
            modalIsNeedShowType: 'detial',
            modalIsNeedShow: !this.state.modalIsNeedShow,
            modalIsNeedDetialData: data,
        });
        console.log(this.consoleLogTag(), 'detial\n:index->' + index + "\n data->" + JSON
            .stringify(data));
        // DialogCommonManage.showNormalMessage("edit  index->" + index);
        // let editable = !this.state.editable;
        // this.setState({
        //     editable: editable,
        // });
    };

    /**
     * cell 操作按钮2
     * @param data
     * @param index
     */
    editOperationAction(data, index) {
        console.log(this.consoleLogTag(), 'index->' + index + "\n data->" + JSON
            .stringify(data));
        // DialogCommonManage.showNormalMessage("edit  index->" + index);
        // let editable = !this.state.editable;
        // this.setState({
        //     editable: editable,
        // });
    };

    /**
     * cell 操作按钮3
     * @param data
     * @param index
     */
    showMoreOperationAction(data, index) {

    };


    /**
     * 加载网络数据
     * @returns {Array}
     */
    loadNetWorkData(page) {
        return ([]);
    }

    /**
     * 初始化数据
     * @returns {*[]}
     */
    initLoadDatas() {
        return [
            {
                "id": "1",
                "name": "wwww",
                "createdDateTime": "2018-04-15 10:58:04",
                "modifiedDateTime": "2018-04-15 10:58:04",
                "isDeleted": "0",
                "edit": "编辑"
            }
        ];
    }

    /**
     * 分页、排序、筛选变化时触发
     * @param pagination
     * @param filters
     * @param sorter
     * @private
     */
    _onTableChange = (pagination, filters, sorter) => {
        console.log(this.consoleLogTag(), '_onTableChange')
    };

    onTablePaginationChange(page, pageSize) {
        console.log(this.consoleLogTag(), 'onTablePaginationChange page->' + page + ' pageSize->' + pageSize);
        this.loadNetWorkData(page - 1);
    };

    modalOnAddBtnClick(e) {
        console.log(this.consoleLogTag(), '_onAddBtnClick:' + e);
        this.setState({
            modalIsNeedShowType: 'create',
            modalIsNeedShow: !this.state.modalIsNeedShow,
        });

    }

    modalOnGengerModalTitle() {
        return null;
    }

    modalOnGengerModalContent() {
        return (
            <div>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </div>
        );
    }

    modalOnGengerDetialInfoModalContent() {
        return (
            <div>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </div>
        );
    }

    modalOnAddModalSureClick(e) {
        console.log(this.consoleLogTag(), 'onAddModalSureClick:' + e)
    }

    modalOnAddModalCancleClick(e) {
        console.log(this.consoleLogTag(), 'onAddModalCancleClick:' + e);
        this.setState(preState => ({
            modalIsConfirmLoading: false,
            modalIsNeedShow: false,
        }));
    }

    render() {
        return (
            <div>

                <Modal
                    title={this.modalOnGengerModalTitle()}
                    visible={this.state.modalIsNeedShow}
                    onOk={this.state.modalIsNeedShowType === 'create' ? (e) => this.modalOnAddModalSureClick(e) : () => {
                        this.setState(preState => ({
                            modalIsConfirmLoading: false,
                            modalIsNeedShow: false,
                        }));
                    }}
                    onCancel={this.state.modalIsNeedShowType === 'create' ? (e) => this.modalOnAddModalCancleClick(e) : () => {
                        this.setState(preState => ({
                            modalIsConfirmLoading: false,
                            modalIsNeedShow: false,
                        }));
                    }}
                    confirmLoading={this.state.modalIsConfirmLoading}
                    maskClosable={this.state.modalIsMaskClosable}
                    destroyOnClose={this.state.modalIsDestroyOnClose}
                    closable={this.state.modalIsShowRightTopClosable}
                    cancelText={this.state.modalShowCancleText}
                    okText={this.state.modalShowSureText}
                >
                    {this.modalOnGengerModalContent()}
                    {/*{this.state.modalIsNeedShowType === 'create' ? this.modalOnGengerModalContent() : this.modalOnGengerDetialInfoModalContent()}*/}
                </Modal>

                {
                    this.state.isShowAddPlugi ?
                    <div style={{textAlign: 'right', marginBottom: 19.2,}}>

                        <Button type={'primary'} onClick={(e) => this.modalOnAddBtnClick(e)}><Icon
                            type={'file-add'}/>新增</Button>
                    </div>
                    : null
                }
                <Table
                    bordered
                    columns={BaseTableActivityComponentColumn._baseColumn((data, index) => this.detialInfoOperationAction(data, index), (data, index) => this.editOperationAction(data, index), (data, index) => this.showMoreOperationAction(data, index),)}
                    dataSource={this.state.responseData ? this.state.responseData : []}
                    rowKey={this.state.rowKey}
                    size={this.state.tableTotalSize}
                    pagination={this.state.tablePagination}
                    loading={this.state.tableIsLoading}
                    onChange={(pagination, filters, sorter) => this._onTableChange(pagination, filters, sorter)}
                    dropdownPrefixCls={''}
                />
            </div>
        );
    };
}

