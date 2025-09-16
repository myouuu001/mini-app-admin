import React, { Component } from "react";
import { Card, Button, message, Divider, Pagination, Switch, Modal, Collapse, Form, Input, Select } from "antd";
import { reqRoleUsers, deleteRole, reqAuthUser, addRole, reqRoleTreeOptions } from "@/api/role";
// import TypingCard from '@/components/TypingCard'
import EditUserForm from "./forms/edit-user-form"
import AddUserForm from "./forms/add-user-form"
import ResizeTable from '@/utils/resizeTable'
const { Panel } = Collapse;
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
    treeData: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
    },

    columns: [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            width: 60,
        },
        {
            title: '姓名',
            dataIndex: 'name',
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
            title: '手机号',
            dataIndex: 'telephone',
            align: 'center',
            width: 120,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            align: 'center',
            width: 100,
        },
        {
            title: '权限',
            dataIndex: 'role_key',
            align: 'center',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: 'is_active',
            align: 'center',
            width: 80,
            render: (text, row) => (
              <Switch defaultChecked={row.is_active} disabled onChange={checked => this.handleSwitchChange(checked, 'is_active')} />
            )
        },
        {
            title: '最近登录时间',
            dataIndex: 'update_datetime',
            align: 'center',
            width: 120,
        },
        {
            title: '操作',
            align: 'center',
            width: 195,
            render: (text, row) => (
              <span>
                <Button type="primary" shape="circle" icon="edit" title="编辑" onClick={this.handleEditRole.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="danger" shape="circle" icon="delete" title="删除" onClick={this.handleDeleteRole.bind(null,row)}/>
              </span>
            )
        },
    ]
  };

  getRoles = async () => {
    const result = await reqRoleUsers(this.state.listQuery)
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
        this.getRoles();
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
        this.getRoles();
      }
    );
  };

  handleSwitchChange = (checked, type) => {
    console.log(checked, type);
  };

  getOptions = async () => {
    return new Promise(async (resolve, reject) => {
      const result = await reqRoleTreeOptions()
      const { data, code } = result.data
      if (code === 200) {
        // 递归转换属性名
        const transformData = (items) => {
          return items.map(item => ({
            ...item,
            title: item.label,
            key: item.value,
            children: item.children ? transformData(item.children) : undefined
          }));
        };
        const treeData = transformData(data)
        this.setState({ treeData });
        resolve()
      } else {
        reject()
      }
    })
  }

  handleEditRole = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editUserModalVisible: true,
    });
  };

  handleDeleteRole = (row) => {
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
    deleteRole([id]).then(res => {
      message.success("删除成功")
      this.getRoles();
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
  
  handleEditRoleOk = (values, form) => {
    this.setState({ editModalLoading: true });
    reqAuthUser(values).then((response) => {
      form.resetFields();
      this.setState({ editUserModalVisible: false, editUserModalLoading: false });
      message.success("编辑成功!")
      this.getRoles()
    }).catch(e => {
      this.setState({ editUserModalLoading: false });
      message.error("编辑失败,请重试!")
    })
  };

  handleCancel = _ => {
    this.setState({
      editUserModalVisible: false,
      addUserModalVisible: false,
    });
  };

  handleAddCancel = _ => {
    this.setState({
      addUserModalVisible: false,
    });
  };

  handleAddUser = () => {
    this.setState({
      addUserModalVisible: true,
    });
  };

  handleAddUserOk = _ => {
    const { form } = this.addUserFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ addUserModalLoading: true, });
      addRole(values).then((response) => {
        form.resetFields();
        this.setState({ addUserModalVisible: false, addUserModalLoading: false });
        message.success("添加成功!")
        this.getRoles()
      }).catch(e => {
        this.setState({ addUserModalLoading: false });
        message.error("添加失败,请重试!")
      })
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.getRoles()
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  filterStatusChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        is_active:!!value,
      }
    }));
  };
  filterNameChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        name: value,
      }
    }));
  };
  filterPhoneChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        telephone: value,
      }
    }));
  };
  render() {
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAddUser}>添加角色</Button>
      </span>
    )
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="姓名:">
                <Input onChange={this.filterNameChange} allowClear />
              </Form.Item>
              <Form.Item label="手机号:">
                <Input onChange={this.filterPhoneChange} allowClear />
              </Form.Item>
              <Form.Item label="状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  onChange={this.filterStatusChange}>
                  <Select.Option value={0}>正常</Select.Option>
                  <Select.Option value={1}>禁用</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.getRoles}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br/>
        <Card title={title}>
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
        <EditUserForm
          wrappedComponentRef={formRef => this.editUserFormRef = formRef}
          currentRowData={this.state.currentRowData}
          visible={this.state.editUserModalVisible}
          confirmLoading={this.state.editUserModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditRoleOk}
        />
        <AddUserForm
          wrappedComponentRef={formRef => this.addUserFormRef = formRef}
          visible={this.state.addUserModalVisible}
          confirmLoading={this.state.addUserModalLoading}
          onCancel={this.handleAddCancel}
          onOk={this.handleAddUserOk}
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
