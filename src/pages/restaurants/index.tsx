import * as React from "react";
import {
  Breadcrumb,
  Button,
  Drawer,
  Space,
  Table,
  theme,
  Card,
  Select,
  Row,
  Col,
  Input,
} from "antd";
import { Link, Navigate } from "react-router-dom";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { getRestaurants } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

const handleGetRestaurants = async () => {
  const response = await getRestaurants();
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
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export const RestaurantsPage = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const { data } = useQuery({
    queryKey: ["restaurants"],
    queryFn: handleGetRestaurants,
  });

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <Link to="/">Dashboard</Link> },
          { title: "Restaurants" },
        ]}
      />
      <Card>
        <Row justify="space-between">
          <Col>
            <Space>
              <Input.Search placeholder="Search" />

              <Select placeholder="Select Role" style={{ width: 150 }}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
              </Select>

              <Select placeholder="Status" style={{ width: 150 }}>
                <Select.Option value="avtive">Active</Select.Option>
                <Select.Option value="blocked">Blocked</Select.Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Button
              onClick={() => setOpen(true)}
              type="primary"
              icon={<PlusOutlined />}
            >
              Add Restaurant
            </Button>
          </Col>
        </Row>
      </Card>
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
        <h1>Hello Form</h1>
      </Drawer>
    </Space>
  );
};
