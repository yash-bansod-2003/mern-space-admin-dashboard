import * as React from "react";
import {
  Layout,
  Card,
  Space,
  Form,
  Checkbox,
  Input,
  Button,
  Flex,
  Alert,
} from "antd";
import { LockFilled, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentials } from "@/types";
import { login, self } from "@/http/api";
import { useAuthStore } from "@/store/auth";
import { useLogout } from "@/hooks/useLogout";
import { usePermission } from "@/hooks/usePermission";

const CardTitle = () => {
  return (
    <Space style={{ width: "100%", justifyContent: "center" }}>
      <LockFilled />
      Login
    </Space>
  );
};

const handleLogin = async (values: Credentials) => {
  const { data } = await login(values);
  return data;
};

const handleGetSelfDetails = async () => {
  const { data } = await self();
  return data;
};

export const LoginPage: React.FC = () => {
  const { setUser, removeUser } = useAuthStore();
  const { mutate: logoutMutation } = useLogout();
  const { isAllowed } = usePermission();

  const { refetch } = useQuery({
    queryKey: ["auth/self"],
    queryFn: handleGetSelfDetails,
    enabled: false,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["auth/login"],
    mutationFn: handleLogin,
    onSuccess: async () => {
      const response = await refetch();
      if (!isAllowed(response.data)) {
        logoutMutation();
        removeUser();
        return;
      }
      setUser(response.data);
    },
  });
  return (
    <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Card title={<CardTitle />} bordered={false} style={{ width: 300 }}>
        {isError && (
          <Alert
            style={{ marginBottom: 16 }}
            message={error.message}
            type="error"
          />
        )}
        <Form onFinish={(values) => mutate(values)}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              disabled={isPending}
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              disabled={isPending}
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Flex
            style={{ alignItems: "start", justifyContent: "space-between" }}
          >
            <Form.Item
              name="remember"
              valuePropName="checked"
              htmlFor="Remember me"
            >
              <Checkbox disabled={isPending}>Remember me</Checkbox>
            </Form.Item>
            <a href="/auth/forgot" style={{ marginTop: 6, display: "block" }}>
              Forgot Password{" "}
            </a>
          </Flex>
          <Form.Item>
            <Button
              disabled={isPending}
              loading={isPending}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};
