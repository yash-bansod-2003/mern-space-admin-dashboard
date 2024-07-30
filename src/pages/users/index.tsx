import * as React from "react";
import { Breadcrumb, Button, Drawer, Space, Table, theme } from "antd";
import { Link, Navigate } from "react-router-dom";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { getUsers } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import { useAuthStore } from "@/store/auth";
import { UserFilters } from "./user-filters";
import { UserForm } from "./form";

const handleGetUsers = async () => {
  const response = await getUsers();
  return response.data;
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "name",
    render: (text: string, record: User) => `${text} ${record.lastName}`,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

export const UsersPage = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: handleGetUsers,
  });

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
      />
      <UserFilters>
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Add User
        </Button>
      </UserFilters>
      <Table
        dataSource={data?.data}
        columns={columns}
        rowKey={(row) => row.id}
      />
      <Drawer
        width={"38rem"}
        title="Create User"
        onClose={() => setOpen(false)}
        styles={{ body: { backgroundColor: colorBgLayout } }}
        open={open}
        destroyOnClose
        extra={
          <Space>
            <Button>Cancle</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <UserForm />
      </Drawer>
    </Space>
  );
};
