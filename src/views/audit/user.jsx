import React, { Component } from "react";
import { Card, Button, Pagination, Modal, Collapse, Form, Input, Select, DatePicker, Divider } from "antd";
import clip from "@/utils/clipboard"; 
import { reqMediaUpload } from '@/api/audit';
import ResizeTable from '@/utils/resizeTable'
import { timestampToTimeString } from '@/utils'
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

class roleUser extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    users: [],
    editUserModalVisible: false,
    editUserModalLoading: false,
    currentRowData: {},
    addUserModalVisible: false,
    addUserModalLoading: false,
    delUserModalLoading: false,
    isModalOpen: false,

    list: [],
    auditStatusList: [
      {
        id: 1,
        name: '待审核'
      },
      {
        id: 2,
        name: '已通过'
      },
      {
        id: 3,
        name: '已拒绝'
      },
      {
        id: -1,
        name: '用户已取消'
      }
    ],
    treeData: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
    },

    columns: [
        {
            title: '用户ID',
            dataIndex: 'user_id',
            align: 'center',
            width: 100,
        },
        {
            title: '用户昵称',
            dataIndex: 'nickname',
            align: 'center',
            width: 120
        },
        {
            title: '资料数量',
            dataIndex: 'media_uploads',
            align: 'center',
            width: 100,
            render: (text, row) => (
              <span>{row.media_uploads.length}</span>
            )
        },
        {
            title: '资料预览',
            dataIndex: 'media',
            align: 'center',
            width: 100,
            render: (text, row) => (
              row.media_uploads.length > 0 ? (
                <img alt="media" style={ {width: "40px", height: "40px"} } src={row.media_uploads[0].media} />
              ) : null
            )
        },
        {
            title: '审核状态',
            dataIndex: 'status',
            align: 'center',
            width: 100,
            render: (text, row) => (
              <div className="warnning" size="small">待审核:{row.media_uploads.length}</div>
            )
        },
        {
            title: '提交时间',
            dataIndex: 'apply_time',
            align: 'center',
            render: (text, row) => (
              <span>{ timestampToTimeString(row.apply_time)}</span>
            )
        },
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 280,
            render: (text, row) => (
              <span>
                <Button type="primary" size="small" onClick={this.handleEditRole.bind(null,row)}>查看详情</Button>
                <Divider type="vertical" />
                <Button className="warnning-btn" size="small" onClick={this.handledeleteUser.bind(null,row)}>设为主播</Button>
                <Divider type="vertical" />
                <Button type="danger" size="small" onClick={this.handledeleteUser.bind(null,row)}>拒绝</Button>
              </span>
            )
        },
    ]
  };

  handleCopy = (text, event) => {
    console.log(text, event);
    clip(text, event);
  };

  getOrder = async () => {
    const result = await reqMediaUpload(this.state.listQuery)
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
        this.getOrder();
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
        this.getOrder();
      }
    );
  };

  handleSwitchChange = (checked, type) => {
    console.log(checked, type);
  };

  handledeleteUser = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      isModalOpen: true,
    });
  }

  handleCancelDel = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.getOrder()
    // this.getRoles()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  filterOrderTypeChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        order_type: value,
      }
    }));
  };

  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        audit_status: value,
      }
    }));
  };
  onPickerChange = (value, dateStr) => {
    console.log(value, dateStr);
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        start_date: dateStr[0],
        end_date: dateStr[1],
      }
    }));
  };
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="关键词:">
                <Input onChange={this.filterUserIdChange} allowClear placeholder="用户名/ID" />
              </Form.Item>
              <Form.Item label="审核状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                    {this.state.auditStatusList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
               <Form.Item label="提交时间:">
                 <RangePicker  allowClear format="YYYY-MM-DD"
                  style={{ width: 220 }} onChange={this.onPickerChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.getOrder}>
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

        <Modal
          title="Basic Modal"
          visible={this.state.isModalOpen}
          confirmLoading={this.state.delUserModalLoading}
          onOk={this.handleDelete}
          onCancel={this.handleCancelDel}
        >
        <p>确认删除所选中数据？</p>
      </Modal>
      </div>
    );
  }
}

export default roleUser;
