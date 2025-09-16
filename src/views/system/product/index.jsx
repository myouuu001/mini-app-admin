import React, { Component } from "react";
import { Card, Button, message, Pagination, Modal, Collapse, Form, Input, Select } from "antd";
import { platformProducts, delPlatformProducts, addPlatformProducts, editPlatformProducts } from "@/api/system";
import ResizeTable from '@/utils/resizeTable'
import EditForm from "./forms/edit-form"
const { Panel } = Collapse;
class Tags extends Component {
  _isMounted = false; // 这个变量是用来标志当前组件是否挂载
  category = [
    { label: '虚拟商品', value: 2 },
    { label: '实物商品', value: 1 },
    { label: '服务类商品', value: 3 },
  ]
  statusArray = [
      { label: '上架', value: 1 },
      { label: '下架', value: 0 },
      { label: '售罄', value: 2 },
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
          title: 'ID',
          dataIndex: 'id',
          align: 'center',
          width: 100,
      },
      {
          title: '商品名',
          dataIndex: 'name',
          align: 'center',
          width: 120,
      },
      {
          title: '标签',
          dataIndex: 'label',
          align: 'center',
          width: 120,
      },
      {
          title: '价格',
          dataIndex: 'price',
          align: 'center',
          width: 100,
      },
      {
          title: '商品类型',
          dataIndex: 'product_type',
          align: 'center',
          width: 120,
          render: (text, row) => (
            <span>{this.category.find(item => item.value === row.product_type) && this.category.find(item => item.value === row.product_type).label}</span>
          )
      },
      {
          title: '总数量',
          dataIndex: 'quantity',
          align: 'center',
          width: 100,
      },
      {
          title: '赠送数量',
          dataIndex: 'gift_quantity',
          align: 'center',
          width: 100,
      },
      {
          title: '状态',
          dataIndex: 'status',
          align: 'center',
          width: 80,
          render: (text, row) => (
            <span>{this.statusArray.find(item => item.value === row.status) && this.statusArray.find(item => item.value === row.status).label}</span>
          )
      },
      {
          title: '创建时间',
          dataIndex: 'created_at',
          align: 'center',
          // width: 180,
      },
      {
          title: '操作',
          align: 'center',
          fixed: 'right',
          width: 120,
          render: (text, row) => (
            <span>
              <Button type="primary" size="small" onClick={this.handleEdit.bind(null,row)}>编辑</Button>
              {/* <Divider type="vertical" /> */}
              {/* <Button type="danger" size="small" onClick={this.handleDeleteDialog.bind(null,row)}>删除</Button> */}
            </span>
          )
      },
  ]
  };
  getList = async () => {
    const result = await platformProducts(this.state.listQuery)
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
    delPlatformProducts({ids: [id]}).then(res => {
      message.success("删除成功")
      this.getList();
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
    let Api = values.id ? editPlatformProducts : addPlatformProducts
    Api(values).then((response) => {
      form.resetFields();
      this.setState({ editModalVisible: false, editModalLoading: false });
      message.success(values.id ? "编辑成功!" : "新增成功!");
      this.getList()
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
        name: '', status: 1, product_type: 2, label: '', gift_quantity: 0, description: '', price: 0, total_quantity: 0, currency: 2, available_quantity: 0
      },
      editModalVisible: true,
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
        product_type:value,
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
        <Button type='primary' onClick={this.handleAdd}>添加商品</Button>
      </span>
    )
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="商品名称:">
                <Input onChange={this.filterNameChange} allowClear placeholder="请输入商品名称" />
              </Form.Item>
              <Form.Item label="商品类型:">
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
              <Form.Item label="状态:">
                <Select
                  allowClear
                  style={{ width: 120 }}
                  placeholder="全部"
                  onChange={this.filterStatusChange}>
                  {this.statusArray.map((item, index) => {
                    return <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                  })}
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
