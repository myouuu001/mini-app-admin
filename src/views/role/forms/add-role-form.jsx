import React, { Component } from "react";
import { Form, Input, InputNumber, Modal, Radio } from "antd";

const { TextArea } = Input;
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
        title="新增角色"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="角色名称:">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入角色名称!" }],
            })(<Input placeholder="请输入角色名称" />)}
          </Form.Item>
          <Form.Item label="权限字符:">
            {getFieldDecorator("role_key", {
              rules: [{ required: true, message: "请输入权限字符!" }],
            })(<Input placeholder="请输入权限字符" />)}
          </Form.Item>
          <Form.Item label="角色描述:">
            {getFieldDecorator("desc", {
            })(<TextArea placeholder="请输入角色描述" />)}
          </Form.Item>
          <Form.Item label="显示排序:">
            {getFieldDecorator("order", {
              initialValue: 1,
              rules: [{ required: true, message: "请输入显示排序!" }]
            })(<InputNumber min={1} max={10} placeholder="请输入显示排序" style={{ width: 150 }} />)}
          </Form.Item>
          <Form.Item label="角色状态:">
            {getFieldDecorator("disabled", {
                initialValue: false 
            })(<Radio.Group options={[
              { value: false, label: '正常' },
              { value: true, label: '禁用' }]} />)}
          </Form.Item>
          <Form.Item label="最高权限:">
            {getFieldDecorator("is_admin", {
              initialValue: false 
            })(<Radio.Group>
            <Radio value={true}>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddRoleForm" })(AddRoleForm);
