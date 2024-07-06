import { Breadcrumb } from "antd"
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";

export const UsersPage = () => {
  return (
    <div>
      <Breadcrumb
        separator={<RightOutlined />}
        items={[
          { title: <Link to="/">Dashboard</Link> },
          { title: 'Users' }
        ]}
      />;
    </div>
  )
};
