import React, { Component } from "react";
import { Form, Input, InputNumber, Modal, Radio, Select, Badge } from "antd";
class EditForm extends Component {
  render() {
    const { visible, onCancel, onOk, form, confirmLoading, currentRowData } = this.props;
    const { id, name, sort_order, status, tag_type, category, color } = currentRowData;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const tagType = [
      { label: '年龄', value: 'age' },
      { label: '种族', value: 'ethnicity' },
      { label: '体型', value: 'body_type' },
      { label: '发型', value: 'hair' },
      { label: '特征', value: 'trait' },
      { label: '活动', value: 'activities' },
      { label: '其他', value: 'miscellaneous' },
    ]
    const colorArray = [
      { label: '蓝色', value: '#1890ff' },
      { label: '红色', value: '#f5222d' },
      { label: '绿色', value: '#52c41a' },
      { label: '黄色', value: '#fadb14' },
      { label: '橙色', value: '#fa8c16' },
      { label: '紫色', value: '#722ed1' },
      { label: '粉色', value: '#eb2f96' },
      { label: '青色', value: '#13c2c2' },
      { label: '深蓝色', value: '#2f54eb' },
      { label: '火山色', value: '#fa541c' },
      { label: '金色', value: '#faad14' },
      { label: '青绿色', value: '#a0d911' },
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
        title={id ? '编辑标签' : '新增标签'}
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout}>
          { id ? <Form.Item label="标签ID:" style={{ display: 'none' }}>
            {getFieldDecorator("id", {
              initialValue: id || null,
            })(<Input type="hidden" />)}
          </Form.Item> : null }
          <Form.Item label="标签名称:">
            {getFieldDecorator("name", {
              initialValue: name || '',
              rules: [{ required: true, message: "请输入标签名称!" }],
            })(<Input placeholder="请输入标签名称" />)}
          </Form.Item>
          <Form.Item label="标签类型:">
            {getFieldDecorator("tag_type", {
              initialValue: tag_type || '',
              rules: [{ required: true, message: "请选择标签类型!" }],
            })(<Select placeholder="请选择标签类型">
              <Select.Option value={1}>系统标签</Select.Option>
              <Select.Option value={2}>用户标签</Select.Option>
            </Select>)}
          </Form.Item>
          <Form.Item label="标签分类:">
            {getFieldDecorator("category", {
              initialValue: category || '',
              rules: [{ required: true, message: "请选择标签分类!" }],
            })(<Select placeholder="请选择标签分类">
              {tagType.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)}
            </Select>)}
          </Form.Item>
          <Form.Item label="显示排序:">
            {getFieldDecorator("sort_order", {
              initialValue: sort_order ? Number(sort_order) : 1,
              rules: [{ required: false, message: "请输入显示排序!" }]
            })(<InputNumber min={1}  placeholder="请输入显示排序" style={{ width: 150 }} />)}
          </Form.Item>
          <Form.Item label="标签颜色:">
            {getFieldDecorator("color", {
              initialValue: color || '',
              rules: [{ required: false, message: "请选择标签颜色!" }],
            })(<Select placeholder="请选择标签颜色">
              {colorArray.map(item => <Select.Option key={item.value} value={item.value}><Badge color={item.value} />{item.label}</Select.Option>)}
            </Select>)}
          </Form.Item>
          <Form.Item label="标签状态:">
            {getFieldDecorator("status", {
                initialValue: status === 0 ? 0 : 1
            })(<Radio.Group options={[
              { value: 1, label: '正常' },
              { value: 0, label: '禁用' }]} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "EditForm" })(EditForm);
