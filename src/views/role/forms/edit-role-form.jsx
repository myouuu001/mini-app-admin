import React, { Component } from "react";
import { Form, Input, InputNumber, Modal, Radio } from "antd";
// import { reqValidatUserName } from "@/api/user";
const { TextArea } = Input;
class EditRoleForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } = this.props;
    const { id, name, role_key, desc, order, disabled, is_admin } = currentRowData;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    return (
      <Modal
        title="编辑角色"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="角色ID:" style={{ display: 'none' }}>
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item label="角色名称:">
            {getFieldDecorator("name", {
              initialValue: name,
              rules: [{ required: true, message: "请输入角色名称!" }],
            })(<Input placeholder="请输入角色名称" />)}
          </Form.Item>
          <Form.Item label="权限字符:">
            {getFieldDecorator("role_key", {
              initialValue: role_key,
              rules: [{ required: true, message: "请输入权限字符!" }],
            })(<Input placeholder="请输入权限字符" />)}
          </Form.Item>
          <Form.Item label="角色描述:">
            {getFieldDecorator("desc", {
              initialValue: desc,
            })(<TextArea placeholder="请输入角色描述" />)}
          </Form.Item>
          <Form.Item label="显示排序:">
            {getFieldDecorator("order", {
              initialValue: order,
              rules: [{ required: true, message: "请输入显示排序!" }]
            })(<InputNumber min={1} max={10} placeholder="请输入显示排序" style={{ width: 150 }} />)}
          </Form.Item>
          <Form.Item label="角色状态:">
            {getFieldDecorator("disabled", {
                initialValue: disabled 
            })(<Radio.Group options={[
              { value: false, label: '正常' },
              { value: true, label: '禁用' }]} />)}
          </Form.Item>
          <Form.Item label="最高权限:">
            {getFieldDecorator("is_admin", {
              initialValue: is_admin 
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

export default Form.create({ name: "EditRoleForm" })(EditRoleForm);
