import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const UserManage: React.FC = () => {
  return (
    <Card title="用户管理" bordered={false}>
      <Typography>
        <Title level={4}>用户管理</Title>
        <Paragraph>
          这里是用户管理页面，您可以管理系统用户账号和权限。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default UserManage;