import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const Login = (props) => {
  const { form, token, login } = props;
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    setLoading(true);
    login(username, password)
      .then((data) => {
        message.success("登录成功");
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { username, password } = values;
        handleLogin(username, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <DocumentTitle title={"Admin User Login"}>
          <div className="login-container">
            <Form onSubmit={handleSubmit} className="content">
              <div className="title">
                <h2>Admin User Login</h2>
              </div>
              <Spin spinning={loading} tip="Logining...">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter your username",
                      },
                    ],
                    initialValue: "15020221010", // 初始值
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="username"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter your password",
                      },
                    ],
                    initialValue: "kinit2022", // 初始值
                  })(
                    <Input
                      prefix={
                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      type="password"
                      placeholder="password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Spin>
            </Form>
          </div>
        </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);
export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);