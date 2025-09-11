import React, { Component } from "react";
import { Descriptions, Modal, Card, Pagination } from "antd";
import ResizeTable from '@/utils/resizeTable'

import { reqUserTransactions } from '@/api/user'
class UserInfo extends Component {
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
    },

    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
        width: 60,
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        align: 'center',
        width: 100,
      },
      {
        title: '交易方式',
        dataIndex: 'type2',
        align: 'center',
        width: 100,
      },
      {
        title: '票数',
        dataIndex: 'ticket_count',
        align: 'center',
        width: 100,
      },
      {
        title: '交易前金额',
        dataIndex: 'before_amount',
        align: 'center',
        width: 100,
      },
      {
        title: '交易后金额',
        dataIndex: 'after_amount',
        align: 'center',
        width: 100,
      },
      {
        title: '交易时间',
        dataIndex: 'created_at',
        align: 'center',
        width: 100,
      },
    ]
  };

  getTransactions = async (id) => {
    const result = await reqUserTransactions(id)
    const { data, code, count } = result.data
    if (code === 200) {
      this.setState({ loading: false });
      const list = data;
      const total = count;
      if (this._isMounted) {
        this.setState({ list, total });
      }
    }
  }

  changePage = (page, limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page,
        },
      }),
      () => {
        this.getTransactions();
      }
    );
  };

  changelimit = (current, limit) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 1,
          limit,
        },
      }),
      () => {
        this.getTransactions();
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && nextProps.userInfo.id !== this.props.userInfo.id) {
      this.getTransactions(nextProps.userInfo.id);
    }
  }

  render() {
    const { visible, onCancel, onOk, confirmLoading, userInfo, userProperty } = this.props;
    return (
      <Modal
        title="用户资产"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width={ '70%' }
        footer={null}
      >
        <Descriptions title="用户信息" bordered size="middle" column={3}>
            <Descriptions.Item label="用户ID">{ userInfo.id }</Descriptions.Item>
            <Descriptions.Item label="用户名">{ userInfo.username }</Descriptions.Item>
            <Descriptions.Item label="昵称">{ userInfo.nickname }</Descriptions.Item>
        </Descriptions>
        <Descriptions title="资产信息" bordered size="middle" column={2}>
            <Descriptions.Item label="当前票数">{ userProperty.ticket_count || 0 }</Descriptions.Item>
            <Descriptions.Item label="总票数">{ userProperty.total_ticket_count || 0 }</Descriptions.Item>

            <Descriptions.Item label="当前积分">{ userProperty.points || 0 }</Descriptions.Item>
            <Descriptions.Item label="总积分">{ userProperty.total_points || 0 }</Descriptions.Item>

            <Descriptions.Item label="首次充值金额">{ userProperty.first_recharge_amount || 0 }</Descriptions.Item>
            <Descriptions.Item label="总充值金额">{ userProperty.total_recharge_amount || 0 }</Descriptions.Item>
        </Descriptions>
        <Card>
          <ResizeTable
            bordered
            rowKey="id"
            list={this.state.list}
            columns={this.state.columns}
            pagination={true}
            loading={this.state.loading}
          />
        </Card>
        <br />
        <Pagination
          total={this.state.total}
          limitOptions={["10", "20", "40"]}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.page}
          onShowSizeChange={this.changelimit}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={false}
        />
      </Modal>
    );
  }
}

export default UserInfo;
