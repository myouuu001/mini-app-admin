import React, { Component } from "react";
import { Form, Input, InputNumber, Modal, Select } from "antd";
class EditRoleForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } = this.props;
    console.log('currentRowData', currentRowData);
    
    const { id, name, status, product_type, label, gift_quantity, description, price, total_quantity, currency, available_quantity } = currentRowData;
    const { getFieldDecorator } = form;
    const { TextArea } = Input
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const category = [
      { label: '虚拟商品', value: 2 },
      { label: '实物商品', value: 1 },
      { label: '服务类商品', value: 3 },
    ]
    const statusArray = [
      { label: '上架', value: 1 },
      { label: '下架', value: 0 },
      { label: '售罄', value: 2 },
    ]
    const currencyArray = [
      { label: '人民币', unit: '¥', value: 1 },
      { label: '美元', unit: '$', value: 2 },
      { label: '欧元', unit: '€', value: 3 },
    ]
    const handleOk = () => {
      form.validateFields().then((values) => {
        onOk(values, form);
      }).catch((info) => {
        console.log('Validate Failed:', info);
      });
    };

    return (
      <Modal
        title={id ? "编辑商品" : "新增商品"}
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          { id ? <Form.Item label="商品ID:" style={{ display: 'none' }}>
            {getFieldDecorator("id", {
              initialValue: id || null,
            })(<Input type="hidden" />)}
          </Form.Item> : null }
          <Form.Item label="商品名称:">
            {getFieldDecorator("name", {
              initialValue: name || '',
              rules: [{ required: true, message: "请输入商品名称!" }],
            })(<Input placeholder="请输入商品名称" />)}
          </Form.Item>

          <Form.Item label="商品类型:">
            {getFieldDecorator("product_type", {
              initialValue: product_type || '',
              rules: [{ required: true, message: "请选择商品分类!" }],
            })(<Select placeholder="请选择商品分类">
              {category.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)}
            </Select>)}
          </Form.Item>

          <Form.Item label="商品标签:">
            {getFieldDecorator("label", {
              initialValue: label || '',
              rules: [{ required: false, message: "请输入商品标签!" }],
            })(<Input placeholder="请输入商品标签" />)}
          </Form.Item>

          <Form.Item label="价格:">
            {getFieldDecorator("price", {
              initialValue: price,
              rules: [{ required: true, message: "请输入价格!" }]
            })(<InputNumber min={0} placeholder="请输入价格" style={{ width: 235 }} />)}
          </Form.Item>

          <Form.Item label="货币:">
            {getFieldDecorator("currency", {
              initialValue: currency || '',
              rules: [{ required: true, message: "请选择货币!" }],
            })(<Select placeholder="请选择货币">
              {currencyArray.map(item => <Select.Option key={item.value} value={item.value}>{item.label}{`(${item.unit})`}</Select.Option>)}
            </Select>)}
          </Form.Item>
          
          <Form.Item label="总数量:">
            {getFieldDecorator("total_quantity", {
              initialValue: total_quantity,
              rules: [{ required: false, message: "请输入总数量!" }]
            })(<InputNumber min={0} placeholder="请输入总数量" style={{ width: 235 }} />)}
          </Form.Item>

          <Form.Item label="可售数量:">
            {getFieldDecorator("available_quantity", {
              initialValue: available_quantity || 0,
              rules: [{ required: false, message: "请输入可售数量!" }]
            })(<InputNumber min={0} placeholder="请输入可售数量" style={{ width: 235 }} />)}
          </Form.Item>

          <Form.Item label="赠送数量:">
            {getFieldDecorator("gift_quantity", {
              initialValue: gift_quantity || 0,
              rules: [{ required: true, message: "请输入赠送数量!" }]
            })(<InputNumber min={0} placeholder="请输入赠送数量" style={{ width: 235 }} />)}
          </Form.Item>

          <Form.Item label="商品状态:">
            {getFieldDecorator("status", {
                initialValue: status,
                rules: [{ required: true, message: "请选择商品状态!" }]
            })(<Select placeholder="请选择商品状态">
              {statusArray.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)}
            </Select>)}
          </Form.Item>

          <Form.Item label="用户描述:">
            {getFieldDecorator("description", {
              initialValue: description || '',
            })(<TextArea rows={4} placeholder="请输入用户描述" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditRoleForm" })(EditRoleForm);
