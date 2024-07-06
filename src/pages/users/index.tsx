import { Breadcrumb, Space, Table } from "antd";
import { Link, Navigate } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { getUsers } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import { useAuthStore } from "@/store/auth";

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
      ;
      <Table dataSource={data} columns={columns} />;
    </Space>
  );
};
