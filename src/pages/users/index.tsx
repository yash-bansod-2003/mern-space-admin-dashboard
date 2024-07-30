import * as React from "react";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { Link, Navigate } from "react-router-dom";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { getUsers, createUser } from "@/http/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: handleGetUsers,
  });

  const { mutate: userMutate, isPending } = useMutation({
    mutationKey: ["users/create"],
    mutationFn: createUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async () => {
    await form.validateFields();
    userMutate(form.getFieldsValue());
    form.resetFields();
    setOpen(false);
  };
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
        onClose={() => {
          setOpen(false);
          form.resetFields();
        }}
        styles={{ body: { backgroundColor: colorBgLayout } }}
        open={open}
        destroyOnClose
        extra={
          <Space>
            <Button
              onClick={() => {
                setOpen(false);
                form.resetFields();
              }}
              disabled={isPending}
            >
              Cancle
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              type="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <UserForm />
        </Form>
      </Drawer>
    </Space>
  );
};
