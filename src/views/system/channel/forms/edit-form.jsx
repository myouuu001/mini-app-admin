import React, { Component } from "react";
import { Form, Input, Modal, Radio } from "antd";
class EditForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } = this.props;
    const { id, channel_no, status } = currentRowData;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 12 },
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
        title={id ? "编辑渠道" : "新增渠道"}
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          { id ? <Form.Item label="渠道ID:" style={{ display: 'none' }}>
            {getFieldDecorator("id", {
              initialValue: id || null,
            })(<Input type="hidden" />)}
          </Form.Item> : null }
          <Form.Item label="渠道号:">
            {getFieldDecorator("channel_no", {
              initialValue: channel_no || '',
              rules: [{ required: true, message: "请输入渠道号!" }],
            })(<Input placeholder="请输入渠道号" />)}
          </Form.Item>
          <Form.Item label="渠道状态:">
            {getFieldDecorator("status", {
                initialValue: status === 0 ? 0 : 1
            })(<Radio.Group options={[
              { value: 1, label: '启用' },
              { value: 0, label: '禁用' }]} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditForm" })(EditForm);
