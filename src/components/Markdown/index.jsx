import React, { Component } from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
class Markdown extends Component {
  render() {
    const { value } = this.props;
    return (
      <Editor
        initialValue={value ? value : "hello Admin!"}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    );
  }
};

export default Markdown;
