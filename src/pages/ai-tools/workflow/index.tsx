import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Workflow: React.FC = () => {
  return (
    <Card title="工作流" bordered={false}>
      <Typography>
        <Title level={4}>工作流</Title>
        <Paragraph>
          这里是工作流页面，您可以设计和管理AI工作流程。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default Workflow;