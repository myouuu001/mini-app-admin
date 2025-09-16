import React, { Component } from "react";
import { Card, Button, Pagination, Modal, Collapse, Form, Input, Select, Switch } from "antd";
import { reqRecordLogins } from '@/api/log'
import ResizeTable from '@/utils/resizeTable'
import Details from "./forms/details"
const { Panel } = Collapse;
class LogLogin extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  loginClientType = [
    { label: '浏览器', value: 1 },
    { label: 'Telegram', value: 2 },
    { label: 'PWA', value: 3 },
  ]
  statusType = [
    { label: '登录成功', value: 1 },
    { label: '登录失败', value: 2 },
  ]
  state = {
    users: [],
    editModalVisible: false,
    editModalLoading: false,
    currentRowData: {},
    delModalLoading: false,
    isModalOpen: false,

    list: [],
    treeData: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
    },

    columns: [
      {
          title: '编号',
          dataIndex: 'id',
          align: 'center',
          width: 80,
      },
      {
          title: '手机号',
          dataIndex: 'telephone',
          align: 'center',
          width: 100,
      },
      {
          title: '登录状态',
          dataIndex: 'status',
          align: 'center',
          width: 100,
          render: (text, row) => (
            <Switch defaultChecked={row.status} disabled />
            // <span>{row.status === 1 ? '正常' : '禁用'}</span>
          )
      },
      {
          title: '登录平台',
          dataIndex: 'platform',
          align: 'center',
          width: 100,
          render: (text, row) => (
            <span>{row.platform === '0' ? 'PC管理后台' : ''}</span>
          )
      },
      {
          title: '认证方式',
          dataIndex: 'login_method',
          align: 'center',
          width: 120,
          render: (text, row) => (
            <span>{row.platform === '0' ? '密码登录' : ''}</span>
          )
      },
      {
          title: '登录地址',
          dataIndex: 'ip',
          align: 'center',
          width: 120,
      },
      {
          title: '浏览器信息',
          dataIndex: 'browser',
          align: 'center',
          width: 100,
      },
      {
          title: '操作系统',
          dataIndex: 'system',
          align: 'center',
          width: 100,
      },
      {
          title: '登录时间',
          dataIndex: 'create_datetime',
          align: 'center',
          width: 160,
      },
      {
          title: '操作',
          align: 'center',
          width: 195,
          render: (text, row) => (
            <span>
              <Button type="primary" size="small" onClick={this.handleEdit.bind(null,row)}>详情</Button>
            </span>
          )
      },
  ]
  };
  getList = async () => {
    const result = await reqRecordLogins(this.state.listQuery)
    const { data, code, count } = result.data
    if (code === 200) {
      this.setState({ loading: false });
      const list = data;
      const total = count;
      if (this._isMounted) {
        this.setState({ list, total });
      }
    }
  }

  changePage = (page, limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page,
        },
      }),
      () => {
        this.getList();
      }
    );
  };
  changelimit = (current, limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 1,
          limit,
        },
      }),
      () => {
        this.getList();
      }
    );
  };

  handleEdit = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleCancel = _ => {
    this.setState({
      editModalVisible: false
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.getList()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        status: value,
      }
    }));
  };
  filterChange = (field, e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        [field]: value,
      }
    }));
  };
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="手机号:">
                <Input onChange={(e) => this.filterChange('telephone', e)} allowClear placeholder="请输入手机号" />
              </Form.Item>
              <Form.Item label="登录地址:">
                <Input onChange={(e) => this.filterChange('ip', e)} allowClear placeholder="请输入登录地址" />
              </Form.Item>
              <Form.Item label="登录状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                  {this.statusType.map(item => (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.getList}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br/>
        <Card>
          <ResizeTable
            bordered
            rowKey="id"
            list={this.state.list}
            columns={this.state.columns}
            pagination={false}
            loading={this.state.loading}
          />
        </Card>
        <br />
        <Pagination
          total={this.state.total}
          limitOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.page}
          onShowSizeChange={this.changelimit}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={false}
        />

        <Details
          details={this.state.currentRowData}
          visible={this.state.editModalVisible}
          confirmLoading={this.state.editModalLoading}
          onCancel={this.handleCancel}
        />

        <Modal
          title="提示" style={{top:'32%'}}
          visible={this.state.isModalOpen}
          confirmLoading={this.state.delModalLoading}
          onOk={this.handleDelete}
          onCancel={this.handleCancelDel}
        >
        <p>确认删除所选中数据？</p>
      </Modal>
      </div>
    );
  }
}

export default LogLogin;
