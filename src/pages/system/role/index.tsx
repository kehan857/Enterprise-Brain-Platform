import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const RoleManage: React.FC = () => {
  return (
    <Card title="角色管理" bordered={false}>
      <Typography>
        <Title level={4}>角色管理</Title>
        <Paragraph>
          这里是角色管理页面，您可以设置和管理系统角色及其权限。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default RoleManage;