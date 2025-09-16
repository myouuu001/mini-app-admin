import React, { Component } from "react";
import { Card, Button, message, Pagination, Modal, Collapse, Form, Input, Select, DatePicker, Icon } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import clip from "@/utils/clipboard"; 
import { deleteUser } from "@/api/user";
import { reqOrder } from '@/api/order';
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
    orderTypeList: [
      {
        id: 1,
        name: '预约'
      },
      {
        id: 2,
        name: '充值'
      }
    ],
    orderStatusList: [
      {
        id: 0,
        name: '待支付'
      },
      {
        id: 1,
        name: '已支付'
      },
      {
        id: -1,
        name: '已取消'
      },
      {
        id: -2,
        name: '支付失败'
      }
    ],
    currencyList: [
      {
        id: 1,
        name: 'UPI'
      },
      {
        id: 2,
        name: 'USDT'
      },
      {
        id: 3,
        name: 'TON'
      },
      {
        id: 4,
        name: 'PHP'
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
            title: '订单ID',
            dataIndex: 'id',
            align: 'center',
            width: 100,
        },
        {
            title: '订单号',
            dataIndex: 'order_no',
            align: 'center',
            width: 120,
            render: (text, row) => (
              <div className="white-space-nowrap pointer" onClick={(e) => {
              this.handleCopy(row.order_no, e);
            }}><Icon type="copy" /> {row.order_no}</div>
            )
        },
        {
            title: '用户ID',
            dataIndex: 'user_id',
            align: 'center',
            width: 100,
        },
        {
            title: '原价金额',
            dataIndex: 'amount',
            align: 'center',
            width: 100,
        },
        {
            title: '实付金额',
            dataIndex: 'real_amount',
            align: 'center',
            width: 100,
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            align: 'center',
            width: 100,
            render: (text, row) => (
              <span>{row.status === 2 ? '待支付' : row.status === 1 ? '已支付' : row.status === 0 ? '已取消' : '支付失败'}</span>
            )
        },
        {
            title: '订单类型',
            dataIndex: 'order_type',
            align: 'center',
            width: 100,
            render: (text, row) => (
              <span>{row.order_type === 2 ? '充值' : '预约'}</span>
            )
        },
        {
            title: '货币类型',
            dataIndex: 'currency',
            align: 'center',
            width: 120,
            render: (text, row) => (
              <span>{row.currency === 1 ? 'UPI' : row.currency === 2 ? 'USDT' : row.currency === 3 ? 'PHP' : 'TON'}</span>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            align: 'center',
            render: (text, row) => (
              <span>{ timestampToTimeString(row.created_at)}</span>
            )
        },
        // {
        //     title: '操作',
        //     align: 'center',
        //     fixed: 'right',
        //     width: 195,
        //     render: (text, row) => (
        //       <span>
        //         <Button type="link" onClick={this.handleEditRole.bind(null,row)}>详情</Button>
        //         <Divider type="vertical" />
        //         <Button type="link" onClick={this.handledeleteUser.bind(null,row)}>资产</Button>
        //       </span>
        //     )
        // },
    ]
  };

  handleCopy = (text, event) => {
    console.log(text, event);
    clip(text, event);
  };

  getOrder = async () => {
    const result = await reqOrder(this.state.listQuery)
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

  handledeleteUser = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      isModalOpen: true,
    });
  }

  handleDelete = () => {
    const { id } = this.state.currentRowData
    if(!id) return
    if (id === "admin") {
      message.error("不能删除管理员角色！")
      return
    }
    this.setState({ delUserModalLoading: true });
    deleteUser([id]).then(res => {
      message.success("删除成功")
      this.getOrder();
    }).catch(e => {
      message.error("删除失败,请重试!")
    }).finally(() => {
      this.setState({
        isModalOpen: false,
        delUserModalLoading: false
      });
    })
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
  filterUserIdChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        user_id: value,
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
              <Form.Item label="用户ID:">
                <Input onChange={this.filterUserIdChange} allowClear placeholder="请输入用户ID" />
              </Form.Item>
               <Form.Item label="订单类型:">
                <Select
                  allowClear
                  placeholder="全部"
                  style={{ width: 120 }}
                  onChange={this.filterOrderTypeChange}>
                    {this.state.orderTypeList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="订单状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                    {this.state.orderStatusList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="货币类型:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterCurrencyChange}>
                    {this.state.currencyList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
               <Form.Item label="创建时间:">
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
