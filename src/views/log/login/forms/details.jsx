import React, { Component } from "react";
import { Descriptions, Modal, Switch } from "antd";
import JsonView from "@/components/JsonView";

class Details extends Component {
  render() {
    const { visible, onCancel, onOk, confirmLoading, details } = this.props;
    return (
      <Modal
        title="详情"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width={ '70%' }
        footer={null}
      >
        <Descriptions bordered size="middle" column={2}>
           <Descriptions.Item label="编号">
              { details.id }
            </Descriptions.Item>
            <Descriptions.Item label="手机号">{ details.telephone }</Descriptions.Item>
            <Descriptions.Item label="登录状态"><Switch defaultChecked={details.status} disabled /></Descriptions.Item>
            <Descriptions.Item label="登录平台">
              {details.platform === '0' ? 'PC管理后台' : ''}
            </Descriptions.Item>
            <Descriptions.Item label="认证方式">
              {details.platform === '0' ? '密码登录' : ''}
            </Descriptions.Item>
            <Descriptions.Item label="登录地址">
              {details.ip}
            </Descriptions.Item>
            <Descriptions.Item label="浏览器信息">
              {details.browser}
            </Descriptions.Item>
            <Descriptions.Item label="操作系统">
              {details.system}
            </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered size="middle" column={1}>
          <Descriptions.Item label="响应信息">
              <JsonView value={details.response || ""} />
            </Descriptions.Item>
            <Descriptions.Item label="请求信息">
              <JsonView value={details.request || ""} />
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {details.create_datetime}
            </Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}

export default Details;
