import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AgentDevelop: React.FC = () => {
  return (
    <Card title="Agent开发" bordered={false}>
      <Typography>
        <Title level={4}>Agent开发</Title>
        <Paragraph>
          这里是Agent开发页面，您可以创建和配置自定义Agent。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default AgentDevelop;