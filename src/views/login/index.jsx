import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";

const Login = (props) => {
  const { token, login } = props;
  const [form] = Form.useForm();
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

  const handleSubmit = (values) => {
    const { username, password } = values;
    handleLogin(username, password);
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <DocumentTitle title="用户登录">
      {/* <Helmet>
        <title>用户登录</title>
      </Helmet> */}
      <div className="login-container">
        <Form 
          form={form}
          onFinish={handleSubmit} 
          className="content"
          initialValues={{
            username: "15020221010",
            password: "kinit2022"
          }}
        >
          <div className="title">
            <h2>Admin User Login</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入密码",
                },
              ]}
            >
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
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

export default connect((state) => state.user, { login, getUserInfo })(Login);
