import React, { Component } from "react";
import { Form, Input, Modal, Radio, Select } from "antd";
import { reqRoles } from '@/api/role';

// const { TextArea } = Input;
let list = []
const getRoles = async () => {
  const result = await reqRoles()
  const { data, code } = result.data
  if (code === 200) {
    list = data;
  }
}
getRoles()

class AddRoleForm extends Component {
  render() {
    const { visible, onCancel, onOk, confirmLoading, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };

    const handleOk = () => {
      form.validateFields().then((values) => {
        onOk(values, form);
      }).catch((info) => {
        console.log('Validate Failed:', info);
      });
    };

    return (
      <Modal
        title="新增用户"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="用户名称:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入用户名称!" }],
            })(<Input placeholder="请输入用户名称" />)}
          </Form.Item>
           <Form.Item label="用户昵称:">
            {getFieldDecorator("nickname", {
              rules: [{ required: false, message: "请输入用户昵称!" }],
            })(<Input placeholder="请输入用户昵称" />)}
          </Form.Item>
          <Form.Item label="手机号:">
            {getFieldDecorator("telephone", {
              rules: [{ required: true, message: "请输入手机号!" }],
            })(<Input placeholder="请输入手机号" />)}
          </Form.Item>
          <Form.Item label="邮箱:">
            {getFieldDecorator("email", {
              rules: [{ required: false, message: "请输入邮箱!" }],
            })(<Input placeholder="请输入邮箱" />)}
          </Form.Item>
           <Form.Item label="角色:" required>
            {getFieldDecorator("role_ids", {
              initialValue: [] 
            })(<Select
                mode="multiple"
                allowClear
                style={{ width: 315 }}
                placeholder="请选择角色"
                // onChange={this.filterStatusChange}
                >
                {
                  list.map(item => (                    
                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Select>)}
          </Form.Item>
          <Form.Item label="用户状态:">
            {getFieldDecorator("is_active", {
                initialValue: true 
            })(<Radio.Group options={[
              { value: true, label: '正常' },
              { value: false, label: '禁用' }]} />)}
          </Form.Item>
          <Form.Item label="">
            默认密码 手机号后六位
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddRoleForm" })(AddRoleForm);
