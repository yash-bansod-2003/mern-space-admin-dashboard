import * as React from "react";
import { useAuthStore } from "@/store/auth";
import { Link, Navigate, Outlet } from "react-router-dom";
import {
  Layout,
  Menu,
  MenuProps,
  theme,
  Flex,
  Badge,
  Space,
  Dropdown,
  Avatar,
} from "antd";
import {
  BellFilled,
  GiftOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLogout } from "@/hooks/useLogout";
import { Logo } from "@/components/logo";
import { Roles } from "@/types";

type MenuItem = Required<MenuProps>["items"][number];

const getMenuItems = (role: Roles): MenuItem[] => {
  const baseItems: MenuItem[] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
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
  if (role === "admin") {
    const menus = [...baseItems];
    menus.splice(1, 0, {
      key: "/users",
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    });
    return menus;
  }
  return baseItems;
};

export const Dashboard = () => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useAuthStore();
  const { mutate } = useLogout();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  const items = getMenuItems(user.role);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 1.5rem",
          }}
          className="demo-logo-vertical"
        >
          <Logo />
        </div>
        <Menu defaultSelectedKeys={["/"]} mode="inline" items={items} />
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            paddingRight: 16,
            paddingLeft: 16,
            background: colorBgContainer,
          }}
        >
          <Flex align="start" justify="space-between">
            <Badge
              text={user?.tenant ? user.tenant.name : "Global"}
              status="success"
            />
            <Space align="center" size="large">
              <Badge dot>
                <BellFilled />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      label: "Logout",
                      icon: <LogoutOutlined />,
                      onClick: () => mutate(),
                    },
                  ],
                }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          </Flex>
        </Layout.Header>
        <Layout.Content style={{ padding: "1rem" }}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          Mern Space ©{new Date().getFullYear()} Created by Better Developers
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};
