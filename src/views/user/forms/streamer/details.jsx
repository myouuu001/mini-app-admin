import React, { Component } from "react";
import { Descriptions, Modal, Avatar, Tag, Badge } from "antd";
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
        <Descriptions bordered size="middle" column={2} title="基本信息">
           <Descriptions.Item label="头像">
            <Badge status={details.live_status ? 'success' : 'default'}>
              <Avatar size={64} icon="user" src={details.avatar} />
            </Badge>
            </Descriptions.Item>
            <Descriptions.Item label="用户ID">{ details.id }</Descriptions.Item>
            <Descriptions.Item label="主播名">{ details.username }</Descriptions.Item>
            <Descriptions.Item label="注册时间">
              { details.created_at }
            </Descriptions.Item>
            <Descriptions.Item label="标签">
              { details.tags.map((tag) => (
                <Tag color="blue">{tag}</Tag>
              )) }
            </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered size="middle" column={2} title="直播数据">
           <Descriptions.Item label="总粉丝数">0</Descriptions.Item>
            <Descriptions.Item label="总时长">0</Descriptions.Item>
            <Descriptions.Item label="总收益">0</Descriptions.Item>
            <Descriptions.Item label="总礼物收益">0</Descriptions.Item>
            <Descriptions.Item label="今日粉丝增长">{ 0 }</Descriptions.Item>
            <Descriptions.Item label="今日直播时长">{ 0 }</Descriptions.Item>
            <Descriptions.Item label="近7日粉丝增长数">0</Descriptions.Item>
            <Descriptions.Item label="近7日直播时长">0</Descriptions.Item>
            <Descriptions.Item label="周收益">0</Descriptions.Item>
            <Descriptions.Item label="周礼物收益">0</Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }
}

export default Details;
