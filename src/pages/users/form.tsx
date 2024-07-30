import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Roles } from "@/lib/constants";
import { getRestaurants } from "@/http/api";
import { Tenant } from "@/types";

const handleGetRestaurants = async () => {
  const response = await getRestaurants();
  return response.data;
};

export const UserForm = () => {
  const { data: restaurants, isLoading: isRestaurantsLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: handleGetRestaurants,
  });
  return (
    <Form layout="vertical">
      <Space direction="vertical">
        <Card title="Basic Information" bordered={false}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Email is invalid",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Security Information" bordered={false}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Role Information" bordered={false}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Role is required" }]}
              >
                <Select
                  size="large"
                  placeholder="Select Role"
                  options={[
                    { value: Roles.ADMIN, label: "Admin" },
                    { value: Roles.MANAGER, label: "Manager" },
                    { value: Roles.CUSTOMER, label: "Customer" },
                  ]}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Restaurant" name="tenantId">
                <Select
                  size="large"
                  placeholder="Select Restaurant"
                  style={{ width: "100%" }}
                  allowClear
                  disabled={isRestaurantsLoading}
                >
                  {restaurants?.data.map((restaurant: Tenant) => (
                    <Select.Option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Space>
    </Form>
  );
};
