import React, { Component } from "react";
import { Form, Modal, Input } from "antd";

class EditAuthForm extends Component {
  render() {
    const { visible, onCancel, onOk, confirmLoading, currentRowData, form } = this.props;
    // const { getFieldDecorator } = form;
    const { id, menu_ids } = currentRowData;
    
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
        title="权限管理"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form {...formItemLayout} form={form} initialValues={{ id, menu_ids }}>
          <Form.Item name="id" label="ID:" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
          {/* <Form.Item name="menu_ids" label="菜单权限:">
            <Tree
              checkable
              defaultExpandAll
              fieldNames={{ title: 'label', key: 'value', children: 'children' }}
              defaultCheckedKeys={menu_ids}
              treeData={treeData}
            />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }
};

export default Form.create({ name: "EditAuthForm" })(EditAuthForm);
