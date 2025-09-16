import React, { Component } from "react";
import { Descriptions, Modal, Card, Pagination } from "antd";
import ResizeTable from '@/utils/resizeTable'

import { reqUserStreamersLiveData } from '@/api/user'
class LiveLog extends Component {
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
        title: '用户ID',
        dataIndex: 'id',
        align: 'center',
        width: 60,
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        align: 'center',
        width: 100,
      },
      {
        title: '直播标题',
        dataIndex: 'title',
        align: 'center',
        width: 100,
      },
      {
        title: '状态',
        dataIndex: 'ticket_count',
        align: 'status',
        width: 100,
      },
      {
        title: '开始时间',
        dataIndex: 'actual_start',
        align: 'center',
        width: 100,
      },
      {
        title: '结束时间',
        dataIndex: 'actual_end',
        align: 'center',
        width: 100,
      },
      {
        title: '总时长',
        dataIndex: 'total_duration',
        align: 'center',
        width: 100,
      },
      {
        title: '中断次数',
        dataIndex: 'interrupt_count',
        align: 'center',
        width: 100,
      },
      {
        title: '中断时长(秒)',
        dataIndex: 'interruption_duration',
        align: 'center',
        width: 100,
      },
      {
        title: '观众数量',
        dataIndex: 'view_count',
        align: 'center',
        width: 100,
      },
      {
        title: '最高观众',
        dataIndex: 'highest_view_count',
        align: 'center',
        width: 100,
      },
      {
        title: '礼物总数',
        dataIndex: 'gift_count',
        align: 'center',
        width: 100,
      },
      {
        title: '消息数',
        dataIndex: 'message_count',
        align: 'center',
        width: 100,
      },
      {
        title: '群组增长人数',
        dataIndex: 'group_count',
        align: 'center',
        width: 100,
      },
      {
        title: '直播UUID',
        dataIndex: 'uuid',
        align: 'center',
        width: 100,
      },
    ]
  };

  getTransactions = async (id) => {
    const result = await reqUserStreamersLiveData(id)
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
    if (nextProps.visible && nextProps.liveLog.id !== this.props.liveLog.id) {
      this.getTransactions(nextProps.liveLog.id);
    }
  }

  render() {
    const { visible, onCancel, onOk, confirmLoading, liveLog } = this.props;
    return (
      <Modal
        title="直播记录"
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={confirmLoading}
        width={ '70%' }
        footer={null}
      >
        <Descriptions title="直播数据" bordered size="middle" column={3}>
            <Descriptions.Item label="总观看">{ liveLog.id }</Descriptions.Item>
            <Descriptions.Item label="总礼物">{ liveLog.username }</Descriptions.Item>
            <Descriptions.Item label="最高在线">{ liveLog.nickname }</Descriptions.Item>
            <Descriptions.Item label="群组人数">{ liveLog.nickname }</Descriptions.Item>
        </Descriptions>
        <Descriptions bordered size="middle" column={2}>
            <Descriptions.Item label="总时长">{ liveLog.id }</Descriptions.Item>
            <Descriptions.Item label="直播次数">{ liveLog.username }</Descriptions.Item>
            <Descriptions.Item label="平均观众">{ liveLog.nickname }</Descriptions.Item>
            <Descriptions.Item label="最近直播">{ liveLog.nickname }</Descriptions.Item>
            <Descriptions.Item label="总收益">{ liveLog.nickname }</Descriptions.Item>
            <Descriptions.Item label="平均收益">{ liveLog.nickname }</Descriptions.Item>
            <Descriptions.Item label="礼物收益">{ liveLog.nickname }</Descriptions.Item>
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

export default LiveLog;
