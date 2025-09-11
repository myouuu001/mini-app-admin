import React, { Component } from "react";
import { Card, Button, Divider, Pagination, Collapse, Form, Input, Select } from "antd";
import { getStreamerUsers } from "@/api/user";
import { reqRoles } from '@/api/role';
import ResizeTable from '@/utils/resizeTable'
const { Panel } = Collapse;

class roleUser extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  state = {
    users: [],
    currentRowData: {},

    list: [],
    liveStatusList: [
      {
        id: 1,
        name: '直播中'
      },
      {
        id: 0,
        name: '未直播'
      }
    ],
    auditStatusList: [
      {
        id: 1,
        name: '通过'
      },
      {
        id: 2,
        name: '待审核'
      },
      {
        id: 0,
        name: '拒绝'
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
            title: '主播id',
            dataIndex: 'id',
            align: 'center',
            width: 100,
        },
        {
            title: '用户id',
            dataIndex: 'user_id',
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
            dataIndex: 'nickname',
            align: 'center',
            width: 100,
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
            title: '标签',
            dataIndex: 'tags',
            align: 'center',
            width: 250,
            render: (text, row) => (
              row.tags && row.tags.map(item => (
                <span key={item}>{item}</span>
              ))
            )
        },
        {
            title: '粉丝数',
            dataIndex: 'followers',
            align: 'center',
            width: 100,
        },
        {
            title: '总礼物数',
            dataIndex: 'total_gifts',
            align: 'center',
            width: 100,
        },
        {
            title: '推荐权重',
            dataIndex: 'recommend_weight',
            align: 'center',
            width: 100,
        },
        {
            title: '直播状态',
            dataIndex: 'live_status',
            align: 'center',
            width: 80,
            render: (text, row) => (
              <span>{row.live_status === 1 ? '直播中' : '未直播'}</span>
            )
        },
        {
            title: '审核状态',
            dataIndex: 'audit_status',
            align: 'center',
            width: 80,
            render: (text, row) => (
              <span>{row.audit_status === 1 ? '通过' : row.audit_status === 2 ? '待审核' : '拒绝'}</span>
            )
        },
        {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 220,
            render: (text, row) => (
              <span>
                <Button type="link" onClick={this.handleEditRole.bind(null,row)}>详情</Button>
                <Divider type="vertical" />
                <Button type="link" onClick={this.handledeleteUser.bind(null,row)}>直播记录</Button>
              </span>
            )
        },
    ]
  };

  getUsers = async () => {
    const result = await getStreamerUsers(this.state.listQuery)
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

  getRoles = async () => {
    const result = await reqRoles()
    const { data, code } = result.data
    if (code === 200) {
      this.setState({ roleList: data });
    }
  }

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
  filterAuditStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        audit_status: value,
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
  render() {
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="关键词:">
                <Input onChange={this.filterKeywordChange} allowClear placeholder="用户名/昵称/ID" />
              </Form.Item>
              <Form.Item label="直播状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                    {this.state.liveStatusList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="审核状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterAuditStatusChange}>
                    {this.state.auditStatusList.map(item => (
                      <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
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
      </div>
    );
  }
}

export default roleUser;
