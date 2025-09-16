import React, { Component } from "react";
import ReactJsonView from "react-json-view";
class JsonView extends Component {
  render() {
    const { value } = this.props;
    return (
      <ReactJsonView
        name={false} // 根节点名称显示
        collapsed={true} // 是否折叠
        indentWidth={4} // 缩进宽度
        iconStyle="triangle" // 图标样式
        src={typeof value === "string" ? JSON.parse(value) : value} // json数据
        theme={"summer"} // 主题
        enableClipboard // 是否允许复制
        displayObjectSize={false} // 是否显示有多少item属性
        displayDataTypes={false} // 是否显示数据类型
        sortKeys // 键的排序
        quotesOnKeys={false} // 是否显示键的引号
      />
    );
  }
};

export default JsonView;


// https://github.com/mac-s-g/react-json-view