import { Card, Flex, Space, Typography } from "antd";
import { getCurrentGreatingMessage } from "@/components/lib/utils";
import { useAuthStore } from "@/store/auth";
import { BarChartOutlined } from "@ant-design/icons";
export const HomePage = () => {
  const { user } = useAuthStore();
  const name = user?.firstName + " " + user?.lastName;

  return (
    <div>
      <div>
        <Typography.Title level={4}>
          {getCurrentGreatingMessage()}, {name}
        </Typography.Title>
      </div>
      <Flex>
        <Space direction="vertical" style={{ flex: 1 / 2 }}>
          <Flex gap={8}>
            <Card
              size="small"
              bordered={false}
              title="Total Orders"
              style={{ flex: 1 / 2 }}
            >
              <p>58</p>
            </Card>
            <Card
              size="small"
              bordered={false}
              title="Total Sales"
              style={{ flex: 1 / 2 }}
            >
              <p>70,30,900</p>
            </Card>
          </Flex>
          <Card
            title={
              <Space>
                <BarChartOutlined />
                Sales
              </Space>
            }
            style={{ width: "100%" }}
          ></Card>
        </Space>
      </Flex>
    </div>
  );
};
