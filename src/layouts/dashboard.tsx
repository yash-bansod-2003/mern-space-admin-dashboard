import * as React from "react";
import { useAuthStore } from "@/store/auth";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Layout, Menu, Breadcrumb, MenuProps, theme } from "antd";
import {
  GiftOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: <Link to="/users">Users</Link>,
  },
  {
    key: "/restaurants",
    icon: <ShopOutlined />,
    label: <Link to="/restaurants">Restaurants</Link>,
  },
  {
    key: "/products",
    icon: <ShoppingCartOutlined />,
    label: <Link to="/products">Products</Link>,
  },
  {
    key: "/promos",
    icon: <GiftOutlined />,
    label: <Link to="/promos">Promos</Link>,
  },
];
export const Dashboard = () => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 64 }} className="demo-logo-vertical">
          Logo
        </div>
        <Menu defaultSelectedKeys={["/"]} mode="inline" items={items} />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ padding: 0, background: colorBgContainer }} />
        <Layout.Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          Mern Space ©{new Date().getFullYear()} Created by Better Developers
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};
