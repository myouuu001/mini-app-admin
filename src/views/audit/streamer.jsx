import React, { Component } from "react";
import { Card, Button, Pagination, Modal, Collapse, Form, Input, Select, DatePicker } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import clip from "@/utils/clipboard"; 
import { reqMediaList } from '@/api/audit';
import ResizeTable from '@/utils/resizeTable'
import { timestampToTimeString } from '@/utils'
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
moment.locale('zh');

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
        id: 0,
        name: '待审核'
      },
      {
        id: 1,
        name: '已通过'
      },
      {
        id: -1,
        name: '已拒绝'
      },
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
            dataIndex: 'id',
            align: 'center',
            width: 100,
        },
        {
            title: '用户名称',
            dataIndex: 'username',
            align: 'center',
            width: 100,
        },
        {
            title: '媒体数量',
            dataIndex: 'medio',
            align: 'center',
            width: 120
        },
        {
            title: '预览',
            dataIndex: 'amount',
            align: 'center',
            width: 100,
        },
        {
            title: '审核状态',
            dataIndex: 'status',
            align: 'center',
            width: 100,
            render: (text, row) => (
              <span>{row.status === 2 ? '待支付' : row.status === 1 ? '已支付' : row.status === 0 ? '已取消' : '支付失败'}</span>
            )
        },
        {
            title: '提交时间',
            dataIndex: 'done_at',
            align: 'center',
            render: (text, row) => (
              <span>{ timestampToTimeString(row.created_at)}</span>
            )
        },
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 195,
            render: (text, row) => (
              <span>
                <Button type="link" onClick={this.handleEditRole.bind(null,row)}>详情</Button>
                {/* <Divider type="vertical" /> */}
                {/* <Button type="link" onClick={this.handledeleteUser.bind(null,row)}>资产</Button> */}
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
    const result = await reqMediaList(this.state.listQuery)
    const { data, code } = result.data
    if (code === 200) {
      this.setState({ loading: false });
      const list = data.items;
      const total = data.total;
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
        status: value,
      }
    }));
  };
  filterCurrencyChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        currency: value,
      }
    }));
  };
  filterKeywordChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        keyword: value,
      }
    }));
  };
  filterReviewerIdChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        reviewer_id: value,
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
                <Input onChange={this.filterKeywordChange} allowClear placeholder="用户ID/名称" />
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
              <Form.Item label="审核人:">
                <Input onChange={this.filterReviewerIdChange} allowClear placeholder="审核人ID/名称" />
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
          title="提示" style={{top:'32%'}}
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
