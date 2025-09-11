import React, { Component } from "react";
import { Table } from "antd";
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizeableTitle = props => {
  const { onResize, width, column, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

class ResizeTable extends Component {
  constructor(props) {
    super(props);
    // 在构造函数中初始化 columns
    this.state = {
      columns: this.getColumnsWithResize(props.columns)
    };
  }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  // 提取为单独方法
  getColumnsWithResize = (columns) => {
    return columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
  };

  // 当 props 改变时更新 columns
  componentDidUpdate(prevProps) {
    if (prevProps.columns !== this.props.columns) {
      this.setState({
        columns: this.getColumnsWithResize(this.props.columns)
      });
    }
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const { list, loading } = this.props;
    
    // 移除这里的 setState 调用
    return (
      <Table
        bordered
        rowKey="id"
        dataSource={list}
        columns={this.state.columns}
        components={this.components}
        pagination={false}
        loading={loading}
        scroll={{ x: '150%'}}
      />
    );
  }
}

export default ResizeTable;
