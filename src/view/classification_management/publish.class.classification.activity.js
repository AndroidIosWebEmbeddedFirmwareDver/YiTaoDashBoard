import React from 'react';
import {Select, Icon, Input, Layout, Modal} from "antd";
import BaseActivityComponent from "../BaseActivityComponent";
import DateFormatUtil from "../../utils/date/date.format.util";
import NetworkCommonUtil from "../../utils/network.common.util";
import BaseTableActivityComponent from "../BaseTableActivityComponent";
import DialogModalMmanage from "../acommonview/dialog/dialog.modal.manage";
import DialogCommonManage from "../acommonview/dialog/dialog.common.manage";

const Option = Select.Option;


class PublishClassClassificationActivitySelect extends BaseActivityComponent {
    constructor() {
        super();
        this.state = {
            selectHandleDataQueryUrl: null,
            selectHandleDataQueryParams: null,
            selectHandleDataShowIndex: null,
            selectHandleResponseData: [],
        };
    }


    componentDidMount() {
        super.componentDidMount();
        this.selectHandleInitData();
    }


    componentWillMount() {
        super.componentWillMount();
        this.setState({
            selectHandleDataQueryUrl: this.props.selectHandleDataQueryUrl,
            selectHandleDataQueryParams: this.props.selectHandleDataQueryParams,
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.setState({
            selectHandleResponseData: [],
        });
    }


    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        if (
            (this.props.selectHandleDataQueryParams === null && nextProps.selectHandleDataQueryParams !== null)
            ||
            (nextProps.selectHandleDataQueryParams && this.props.selectHandleDataQueryParams &&
                nextProps.selectHandleDataQueryParams.data && this.props.selectHandleDataQueryParams.data
                && (nextProps.selectHandleDataQueryParams.data.id !== this.props.selectHandleDataQueryParams.data.id)
            )
        ) {

            console.log('init data..........');
            this.state.selectHandleDataQueryUrl = nextProps.selectHandleDataQueryUrl;
            this.state.selectHandleDataQueryParams = nextProps.selectHandleDataQueryParams;
            this.setState({
                selectHandleDataQueryUrl: nextProps.selectHandleDataQueryUrl,
                selectHandleDataQueryParams: nextProps.selectHandleDataQueryParams,
            });
            this.selectHandleInitData();
        } else if (this.props.selectHandleDataQueryParams !== null && nextProps.selectHandleDataQueryParams === null) {
            this.state.selectHandleDataShowIndex = null;
            this.setState({
                selectHandleDataShowIndex: null,
            });
        }
    }


    componentDidUpdate() {
        super.componentDidUpdate();

    }

    selectHandleInitData = () => {
        if (this.state.selectHandleDataQueryUrl && this.state.selectHandleDataQueryParams && this.state.selectHandleDataQueryParams.data) {
            this.setState({
                selectHandleDataShowIndex: null,
            });

            NetworkCommonUtil.httpPostRequest(JSON.stringify(this.state.selectHandleDataQueryParams), this.state.selectHandleDataQueryUrl).then((data: any) => {
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
                                selectHandleResponseData: [],
                            });
                        }
                    }
                } else if (data) {
                    DialogCommonManage.showNormalMessage(data.msg + '');
                } else {
                    DialogCommonManage.showNormalMessage('请求网络出错');
                }
            });
        }
    };

    selectHandleChange = (value) => {
        // console.log(`selected ${value}`);
        if (this.state.selectHandleResponseData && this.state.selectHandleResponseData.length > value - 1) {
            // this.state.selectHandleDataShowIndex=value;
            this.setState({
                ...this.state,
                selectHandleDataShowIndex: value,
            });

            if (this.props.selectHandleChange) {
                this.props.selectHandleChange(this.state.selectHandleResponseData[value - 1]);
            }
        }
    };

    selectHandleBlur = () => {
        // console.log('blur');
    };

    selectHandleFocus = () => {
        // console.log('focus');
    };

    selectHandleContent = () => {
        if (this.state.selectHandleResponseData) {
            return this.state.selectHandleResponseData.map((item) => {
                return (
                    <Option value={item.value} key={item.key}>
                        <Icon type="select" style={{color: 'rgba(0,0,0,.25)'}}/>&nbsp; {item.name}
                    </Option>
                );
            });
        } else {
            return null;
        }
    };

    render(): * {
        console.log('selectHandleDataShowIndex->' + this.state.selectHandleDataShowIndex);
        return (
            <Select
                showSearch
                style={{width: '100%', marginTop: 9.6,}}
                placeholder={this.props.selectPlaceholder}
                optionFilterProp="children"
                onChange={(value) => this.selectHandleChange(value)}
                onFocus={() => this.selectHandleFocus()}
                onBlur={() => this.selectHandleBlur()}
                value={this.state.selectHandleDataShowIndex}
                // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                ref={node => this.selectHandleSelectRef = node}
            >
                {this.selectHandleContent()}
            </Select>
        );
    }
}

class PublishClassClassificationActivityEditModalContent extends BaseActivityComponent {

    constructor() {
        super();
        this.state = {
            selectOfFirstType: null,//一级分类
            selectOfPublisher: null,//推广人员
            selectOfPublishCom: null,//推广作品
        };
    }


    componentDidMount() {
        super.componentDidMount();
    }


    componentWillUnmount() {
        super.componentWillUnmount();
    }

    emitEmpty = () => {
        this.typeNameInput.focus();
        if (this.props.onChange) {
            this.props.onChange(null);
        }
    };

    selectHandleChange = (data, type) => {

        console.log(`selected ${data} --- ${type}`);
        switch (type) {
            case 'selectOfFirstType':
                this.setState({
                    selectOfFirstType: data,
                    selectOfPublisher: null,
                    selectOfPublishCom: null,
                });
                return;
            case 'selectOfPublisher':
                this.setState({
                    selectOfPublisher: data,
                    selectOfPublishCom: null,
                });
                return;
            case 'selectOfPublishCom':
                this.setState({
                    selectOfPublishCom: data,
                });
                return;
        }
    };


    render() {
        const {value, onChange} = this.props;
        const suffix = value ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;
        return (
            <div>
                <span>推广理由：</span>
                <br/>
                <Input
                    style={{marginTop: 9.6,}}
                    placeholder="请输入新增推广理由"
                    prefix={<Icon type="file-add" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    suffix={suffix}
                    value={value}
                    onChange={onChange}
                    ref={node => this.typeNameInput = node}
                />

                <div>
                    <br/>
                    <span>绑定一级分类：</span>
                    <PublishClassClassificationActivitySelect
                        selectPlaceholder="请选择要绑定的一级分类"
                        selectHandleDataQueryUrl={NetworkCommonUtil.API_COMMON_TYPE_FIND_ALL_BY_LEVEL}
                        selectHandleDataQueryParams={{level: 1, data: {}}}
                        selectHandleChange={(data) => this.selectHandleChange(data, 'selectOfFirstType')}
                    />
                </div>

                <div>
                    <br/>
                    <span>绑定推广人员：</span>
                    <PublishClassClassificationActivitySelect
                        selectPlaceholder="请选择要绑定的推广人员"
                        selectHandleDataQueryUrl={NetworkCommonUtil.API_COMMON_TYPE_FIND_ALL_BY_LEVEL}
                        selectHandleDataQueryParams={this.state.selectOfFirstType ? {
                            level: 1,
                            data: this.state.selectOfFirstType
                        } : null}
                        selectHandleChange={(data) => this.selectHandleChange(data, 'selectOfPublisher')}
                    />

                </div>
                <div>
                    <br/>
                    <span>绑定推广作品：</span>
                    <PublishClassClassificationActivitySelect
                        selectPlaceholder="请选择要绑定的推广作品"
                        selectHandleDataQueryUrl={NetworkCommonUtil.API_COMMON_TYPE_FIND_ALL_BY_LEVEL}
                        selectHandleDataQueryParams={this.state.selectOfFirstType && this.state.selectOfPublisher ? {
                            level: 1,
                            data: this.state.selectOfPublisher,
                        } : null}
                        selectHandleChange={(data) => this.selectHandleChange(data, 'selectOfPublishCom')}
                    />
                </div>
            </div>
        );
    }

}


export default class PublishClassClassificationActivity extends BaseTableActivityComponent {


    constructor(props) {
        super(props);
        //使用...this.state,继承父类state
        this.state = {
            ...this.state,
            newTypeName: '',
            newTypeLevel: 2,
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
        if (this.state.newTypeParentId <= 0) {
            DialogCommonManage.showNormalMessage('二级分类必须绑定一个一级分类');
            return;
        }
        //加载中
        this.setState(preState => ({
            modalIsConfirmLoading: !preState.modalIsConfirmLoading,
        }));
        let param = {
            name: this.state.newTypeName,
            level: this.state.newTypeLevel,
            parentId: this.state.newTypeParentId,
        };
        NetworkCommonUtil.httpPostRequest(JSON.stringify(param), NetworkCommonUtil.API_COMMON_TYPE_CREATE).then((data: any) => {
            // DialogCommonManage.showNormalMessage(JSON.stringify(data));
            if (data && data.code === NetworkCommonUtil.SERVER_HTTP_TASK_STATUS_SUCCESS) {
                DialogCommonManage.showNormalMessage('新增二级分类成功');
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
                newTypeParentId: -1,
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
            DialogCommonManage.showNormalMessage('二级分类不能为空');
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
                DialogCommonManage.showNormalMessage('删除二级分类成功');
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
        return 'PublishClassClassificationActivity:\n';
    }


    //删除
    editOperationAction(data, index): void {
        super.editOperationAction(data, index);
        DialogModalMmanage.showDeleteConfirm('提示', '你确定要删除么？', '确定', '取消', () => {
            this.netWorkDeleteOld(data, index);
        }, null)
    }

    //新增

    modalOnAddBtnClick(e): void {
        super.modalOnAddBtnClick(e);
    }

    modalOnGengerModalTitle(): null {
        return '新增分类推广';
    }

    onSelectParentHandleChange(data) {
        console.log(this.consoleLogTag(), JSON.stringify(data));
        this.setState({
            newTypeParentId: data.id,
        });
    }

    modalOnGengerModalContent(): * {
        return (
            <PublishClassClassificationActivityEditModalContent
                value={this.state.newTypeName}
                onChange={(e) => this.onNewInputChange(e)}
                onSelectParentHandleChange={(e) => this.onSelectParentHandleChange(e)}
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