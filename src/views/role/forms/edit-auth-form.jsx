import React, { Component } from "react";
import { Form, Modal, Input, Tree } from "antd";

class EditAuthForm extends Component {
  render() {
    const { visible, onCancel, onOk, confirmLoading, currentRowData, form, treeData } = this.props;
    const { getFieldDecorator } = form;
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
        <Form {...formItemLayout}>
          <Form.Item name="id" label="ID:" style={{ display: 'none' }}>
            {getFieldDecorator("id", {
              initialValue: id,
            })(<Input type="hidden" />)}
          </Form.Item>
          <Form.Item name="menu_ids" label="菜单权限:">
             {getFieldDecorator('menu_ids', {
              initialValue: menu_ids
            })(<Tree
              checkable
              defaultExpandAll={true}
              fieldNames={{ title: 'label', key: 'value', children: 'children' }}
              defaultCheckedKeys={menu_ids}
              treeData={treeData}
              onCheck={checkedKeys => {
                console.log('onCheck', checkedKeys);
                form.setFieldsValue({ menu_ids: checkedKeys });
              }}
            />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
};

export default Form.create({ name: "EditAuthForm" })(EditAuthForm);
