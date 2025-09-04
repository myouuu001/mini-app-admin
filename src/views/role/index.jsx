import React, { Component } from "react";
import { Card, Button, Table, message, Divider, Pagination, Switch, Modal, Collapse, Form, Input, Select } from "antd";
import { reqRoles, deleteRole, editRole, addRole, reqRoleTreeOptions } from "@/api/role";
// import TypingCard from '@/components/TypingCard'
import EditUserForm from "./forms/edit-role-form"
import AddUserForm from "./forms/add-role-form"
import EditAuthForm from "./forms/edit-auth-form"
const { Column } = Table;
const { Panel } = Collapse;
class User extends Component {
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
    editAuthModalVisible: false,
    editAuthModalLoading: false,

    list: [],
    treeData: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
    },
  };
  getRoles = async () => {
    const result = await reqRoles(this.state.listQuery)
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
    const result = await reqRoleTreeOptions()
    const { data, code } = result.data
    if (code === 200) {
      this.setState({ treeData: data });
    }
  }

  handleRole = (row) => {
    this.getOptions()
    this.setState({
      currentRowData:Object.assign({}, row),
      editAuthModalVisible: true,
    });
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
    editRole(values).then((response) => {
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

  handleEditAuth = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editAuthModalVisible: true,
    });
  }
  handleEditAuthOk = _ => {
    const { form } = this.editAuthFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.setState({ editAuthModalLoading: true, });
      editRole(values).then((response) => {
        form.resetFields();
        this.setState({ editAuthModalVisible: false, editAuthModalLoading: false });
        message.success("编辑成功!")
        this.getRoles()
      }).catch(e => {
        this.setState({ editAuthModalLoading: false });
        message.error("编辑失败,请重试!")
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
        disabled:!!value,
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
  filterRoleKeyChange  = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        role_key:value,
      }
    }));
  };
  render() {
    const { list } = this.state
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
              <Form.Item label="角色名称:">
                <Input onChange={this.filterNameChange} allowClear />
              </Form.Item>
              <Form.Item label="权限字符:">
                <Input onChange={this.filterRoleKeyChange} allowClear />
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
          <Table bordered rowKey="id" dataSource={list} pagination={false}>
            <Column title="ID" dataIndex="id" key="id" align="center"/>
            <Column title="角色名称" dataIndex="name" key="name" align="center"/>
            <Column title="角色权限" dataIndex="role_key" key="role_key" align="center"/>
            <Column title="角色状态" dataIndex="disabled" key="disabled" align="center" render={(text, row) => (
              <Switch defaultChecked={!row.disabled} disabled onChange={checked => this.handleSwitchChange(checked, 'disabled')} />
            )}/>
            <Column title="最高权限" dataIndex="is_admin" key="is_admin" align="center" render={(text, row) => (
              <Switch defaultChecked={row.is_admin} disabled onChange={checked => this.handleSwitchChange(checked, 'is_admin')} />
            )}/>
            <Column title="角色描述" dataIndex="desc" key="desc" align="center" />
            <Column title="操作" key="action" width={195} align="center" render={(text, row) => (
              row.role_key === "admin" ? ('') : (<span>
                <Button type="primary" shape="circle" icon="key" title="权限管理" onClick={this.handleRole.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="delete" title="删除" onClick={this.handleDeleteRole.bind(null,row)}/>
                <Divider type="vertical" />
                <Button type="primary" shape="circle" icon="edit" title="编辑" onClick={this.handleEditRole.bind(null,row)}/>
              </span>
              )
            )}/>
          </Table>
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
          onCancel={this.handleCancel}
          onOk={this.handleAddUserOk}
        />  
        <EditAuthForm
          wrappedComponentRef={formRef => this.editAuthFormRef = formRef}
          currentRowData={this.state.currentRowData}
          treeData={this.state.treeData}
          visible={this.state.editAuthModalVisible}
          confirmLoading={this.state.editAuthModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditAuthOk}
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

export default User;
