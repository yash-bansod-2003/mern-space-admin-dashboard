import { Card, Col, Form, Input, Row, Select, Space } from "antd";

export const UserForm = () => {
  return (
    <Form layout="vertical">
      <Space direction="vertical">
        <Card title="Basic Information" bordered={false}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Security Information" bordered={false}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Password" name="password">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Role Information" bordered={false}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Role" name="role">
                <Select
                  size="large"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "manager", label: "Manager" },
                  ]}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Restaurant" name="tenantId">
                <Select
                  size="large"
                  options={[
                    { value: "1", label: "Restaurant 1" },
                    { value: "2", label: "Restaurant 2" },
                  ]}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Space>
    </Form>
  );
};
