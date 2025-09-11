import React, { Component } from "react";
import { Card, Button, Divider, Pagination, Collapse, Form, Input, Select, DatePicker, message } from "antd";
import moment from 'moment';
import 'moment/locale/zh-cn';
import { reqUsers, reqUserInfoData, reqUserAssets } from "@/api/user";
import UserInfo from "./forms/user-info"
import UserProperty from "./forms/user-property"
import ResizeTable from '@/utils/resizeTable'
import { timestampToTimeString } from '@/utils'
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
moment.locale('zh');

class roleUser extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    users: [],
    currentRowData: {},
    userInfo: {},
    userProperty: {},

    userInfoModalVisible: false,
    userInfoModalLoading: false,
    userPropertyModalVisible: false,

    list: [],
    roleList: [
      {
        id: 'user',
        name: '用户'
      },
      {
        id: 'streamer',
        name: '主播'
      },
      {
        id: 'agent',
        name: '代理'
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
            title: 'UID',
            dataIndex: 'uid',
            align: 'center',
            width: 100,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            align: 'center',
            width: 100,
        },
        {
            title: '昵称',
            dataIndex: 'first_name',
            align: 'center',
            width: 100,
        },
        {
            title: 'Telegram_ID',
            dataIndex: 'telegram_user_id',
            align: 'center',
            width: 120,
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            align: 'center',
            width: 100,
            render: (text, row) => (
             <img alt="avatar" style={ {width: "40px", height: "40px"} } src={row.avatar} />
            )
        },
        {
            title: '角色',
            dataIndex: 'role',
            align: 'center',
            width: 100,
            render: (text, row) => (
              <span>{row.role === 'streamer' ? '主播' : '用户'}</span>
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            width: 80,
            render: (text, row) => (
              <span>{row.status === 1 ? '正常' : '禁用'}</span>
            )
        },
        {
            title: '注册时间',
            dataIndex: 'created_at',
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
                <Button type="link" onClick={this.handleUserInfo.bind(null,row)}>详情</Button>
                <Divider type="vertical" />
                <Button type="link" onClick={this.handleUserProperty.bind(null,row)}>资产</Button>
              </span>
            )
        },
    ]
  };

  getUserInfo = async (row, isGetAssets) => {
    // 检查 row.id 是否有效
    if (!row || !row.id) {
      message.error('用户ID无效');
      return;
    }
    
    this.setState({ userInfoModalLoading: true });
    try {
      const result = await reqUserInfoData(row.id);
      const { data, code } = result.data;
      this.setState({ userInfoModalLoading: false });
      if (code === 200) {
        this.setState({ 
          userInfo: data
        });
      }
      if(isGetAssets){
        const res = await reqUserAssets(row.id)
        if(res.data.code === 200){
          this.setState({ 
            userProperty: data
          });
        }
        
      }
    } catch (error) {
      this.setState({ userInfoModalLoading: false });
      message.error('获取用户信息失败');
    }
  }

  getUsers = async () => {
    const result = await reqUsers(this.state.listQuery)
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
        this.getUsers();
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
        this.getUsers();
      }
    );
  };

  handleUserInfo = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      userInfoModalVisible: true,
    });
    this.getUserInfo(row)
  };

  handleUserProperty = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      userPropertyModalVisible: true,
    });
    this.getUserInfo(row, true)
  };

  handleCancel = _ => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleUserInfoCancel = _ => {
    this.setState({
      userInfoModalVisible: false,
    });
  };

  handleUserPropertyCancel = _ => {
    this.setState({
      userPropertyModalVisible: false,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.getUsers()
    // this.getRoles()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  filterRoleChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        role: value,
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
  filterKeywordChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        keyword: value,
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
                <Input onChange={this.filterKeywordChange} allowClear placeholder="用户名/昵称/UID/Telegram_ID" />
              </Form.Item>
               <Form.Item label="角色:">
                <Select
                  allowClear
                  placeholder="全部"
                  style={{ width: 120 }}
                  onChange={this.filterRoleChange}>
                    {this.state.roleList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                  <Select.Option value={1}>正常</Select.Option>
                  <Select.Option value={0}>禁用</Select.Option>
                </Select>
              </Form.Item>
               <Form.Item label="注册时间:">
                 <RangePicker  allowClear format="YYYY-MM-DD"
                  style={{ width: 220 }} onChange={this.onPickerChange} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.getUsers}>
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

        <UserInfo
          visible={this.state.userInfoModalVisible}
          confirmLoading={this.state.userInfoModalLoading}
          userInfo={this.state.userInfo}
          onCancel={this.handleUserInfoCancel}
          onOk={this.handleUserInfoCancel}
        />

        <UserProperty
          visible={this.state.userPropertyModalVisible}
          confirmLoading={this.state.userInfoModalLoading}
          userInfo={this.state.userInfo}
          userProperty={this.state.userProperty}
          onCancel={this.handleUserPropertyCancel}
          onOk={this.handleUserPropertyCancel}
        />
      </div>
    );
  }
}

export default roleUser;
