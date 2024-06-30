import * as React from "react";
import { Layout, Card, Space, Form, Checkbox, Input, Button, Flex } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";

const CardTitle = () => {
  return (
    <Space style={{ width: "100%", justifyContent: "center" }}>
      <LockFilled />
      Login
    </Space>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Card title={<CardTitle />} bordered={false} style={{ width: 300 }}>
        <Form>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Flex
            style={{ alignItems: "start", justifyContent: "space-between" }}
          >
            <Form.Item
              name="remember"
              valuePropName="checked"
              htmlFor="Remember me"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/auth/forgot" style={{ marginTop: 6, display: "block" }}>
              Forgot Password{" "}
            </a>
          </Flex>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};
