import React, { Component } from "react";
import { Descriptions, Modal, Avatar, Tag } from "antd";
class UserInfo extends Component {
  render() {
    const { visible, onCancel, onOk, confirmLoading, userInfo } = this.props;
    return (
      <Modal
        title="用户详情"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width={ '70%' }
        footer={null}
      >
        <Descriptions bordered size="middle" column={2}>
            <Descriptions.Item label="用户ID">{ userInfo.id }</Descriptions.Item>
            <Descriptions.Item label="用户名">{ userInfo.username }</Descriptions.Item>
            <Descriptions.Item label="头像">
              <Avatar size={64} icon="user" src={userInfo.avatar} />
            </Descriptions.Item>
            <Descriptions.Item label="UID">{ userInfo.uid }</Descriptions.Item>
            <Descriptions.Item label="昵称">{ userInfo.nickname }</Descriptions.Item>
            <Descriptions.Item label="角色">
            {  userInfo.role === 'streamer' ? <Tag color="gold">主播</Tag> : <Tag color="blue">用户</Tag> }
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">{  userInfo.email }</Descriptions.Item>
            <Descriptions.Item label="手机号">{  userInfo.telephone }</Descriptions.Item>
            <Descriptions.Item label="状态">
              { userInfo.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">禁用</Tag> }
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              { userInfo.created_at }
            </Descriptions.Item>
            <Descriptions.Item label="最后登录">{  userInfo.updated_at }</Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}

export default UserInfo;
