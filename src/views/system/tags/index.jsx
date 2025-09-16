import React, { Component } from "react";
import { Card, Button, message, Divider, Pagination, Modal, Collapse, Form, Input, Select, Switch } from "antd";
import { platformTags, delPlatformTags, addPlatformTags, editPlatformTags } from "@/api/system";
import ResizeTable from '@/utils/resizeTable'
import EditForm from "./forms/edit-form"
const { Panel } = Collapse;
class Tags extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  tagType = [
    { label: '年龄', value: 'age' },
    { label: '种族', value: 'ethnicity' },
    { label: '体型', value: 'body_type' },
    { label: '发型', value: 'hair' },
    { label: '特征', value: 'trait' },
    { label: '活动', value: 'activities' },
    { label: '其他', value: 'miscellaneous' },
  ]
  category = [
    { label: '系统标签', value: 1 },
    { label: '用户标签', value: 2 },
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
          title: '标签ID',
          dataIndex: 'id',
          align: 'center',
          width: 100,
      },
      {
          title: '标签名',
          dataIndex: 'name',
          align: 'center',
          width: 100,
      },
      {
          title: '显示颜色',
          dataIndex: 'color',
          align: 'center',
          width: 100,
      },
      {
          title: '标签类型',
          dataIndex: 'tag_type',
          align: 'center',
          width: 120,
          render: (text, row) => (
            <span>{this.category.find(item => item.value === row.tag_type) && this.category.find(item => item.value === row.tag_type).label}</span>
          )
      },
      {
          title: '分类',
          dataIndex: 'category',
          align: 'center',
          width: 120,
          render: (text, row) => (
            <span>{this.tagType.find(item => item.value === row.category) && this.tagType.find(item => item.value === row.category).label}</span>
          )
      },
      {
          title: '主播数量',
          dataIndex: 'role',
          align: 'center',
          width: 100,
      },
      {
          title: '排序',
          dataIndex: 'sort_order',
          align: 'center',
          width: 100,
      },
      {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          // width: 80,
          render: (text, row) => (
            <Switch defaultChecked={!!row.status} disabled />
            // <span>{row.status === 1 ? '正常' : '禁用'}</span>
          )
      },
      {
          title: '操作',
          align: 'center',
          fixed: 'right',
          width: 195,
          render: (text, row) => (
            <span>
              <Button type="primary" size="small" onClick={this.handleEdit.bind(null,row)}>编辑</Button>
              <Divider type="vertical" />
              <Button type="danger" size="small" onClick={this.handleDeleteDialog.bind(null,row)}>删除</Button>
            </span>
          )
      },
  ]
  };
  getRoles = async () => {
    const result = await platformTags(this.state.listQuery)
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

  handleEdit = (row) => {
    this.setState({
      currentRowData:Object.assign({}, row),
      editModalVisible: true,
    });
  };

  handleDeleteDialog = (row) => {
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
    this.setState({ delModalLoading: true });
    delPlatformTags({ids: [id]}).then(res => {
      message.success("删除成功")
      this.getRoles();
    }).catch(e => {
      message.error("删除失败,请重试!")
    }).finally(() => {
      this.setState({
        isModalOpen: false,
        delModalLoading: false
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
    let Api = values.id ? editPlatformTags : addPlatformTags
    Api(values).then((response) => {
      form.resetFields();
      this.setState({ editModalVisible: false, editModalLoading: false });
      message.success(values.id ? "编辑成功!" : "新增成功!");
      this.getRoles()
    }).catch(e => {
      this.setState({ editModalLoading: false });
      message.error(values.id ? "编辑失败,请重试!" : "新增失败,请重试!");
    })
  };

  handleCancel = _ => {
    this.setState({
      editModalVisible: false
    });
  };

  handleAddCancel = _ => {
    this.setState({
      editModalVisible: false,
    });
  };

  handleAdd = () => {
    this.setState({
      currentRowData:{
        name: '', sort_order: 1, status: 1, tag_type: 1, category: 'miscellaneous', color: '#1890ff'
      },
      editModalVisible: true,
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
        status: value,
      }
    }));
  };
  filterNameChange = (e) => {
    let value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        name: value,
      }
    }));
  };
  filterTagsChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        tag_type:value,
      }
    }));
  };

  filterCategoryChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        category:value,
      }
    }));
  }
  render() {
    const title = (
      <span>
        <Button type='primary' onClick={this.handleAdd}>添加标签</Button>
      </span>
    )
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="标签名称:">
                <Input onChange={this.filterNameChange} allowClear placeholder="请输入标签名称" />
              </Form.Item>
              <Form.Item label="标签类型:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  onChange={this.filterTagsChange}
                  placeholder="全部"
                  >
                  {this.category.map((item, index) => {
                    return <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="分类:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterCategoryChange}>
                    {this.tagType.map((item, index) => {
                      return <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                    })}
                  {/* <Select.Option value={'age'}>年龄</Select.Option>
                  <Select.Option value={'ethnicity'}>种族</Select.Option>
                  <Select.Option value={'body_type'}>体型</Select.Option>
                  <Select.Option value={'hair'}>发型</Select.Option>
                  <Select.Option value={'trait'}>特征</Select.Option>
                  <Select.Option value={'activities'}>活动</Select.Option>
                  <Select.Option value={'miscellaneous'}>其他</Select.Option> */}
                </Select>
              </Form.Item>
              <Form.Item label="状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={0}>禁用</Select.Option>
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

        <EditForm
          wrappedComponentRef={formRef => this.editFormRef = formRef}
          currentRowData={this.state.currentRowData}
          visible={this.state.editModalVisible}
          confirmLoading={this.state.editModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleEditRoleOk}
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

export default Tags;
