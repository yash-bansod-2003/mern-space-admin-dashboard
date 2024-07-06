import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Col, Input, Row, Select, Space } from "antd"

type UserFiltersProps = React.PropsWithChildren & {

}

export const UserFilters: React.FC<UserFiltersProps> = ({ children }) => {
      return (
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
                              {children}
                        </Col>
                  </Row>
            </Card>
      )
}