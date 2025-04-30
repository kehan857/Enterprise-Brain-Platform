import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AgentMonitor: React.FC = () => {
  return (
    <Card title="Agent监控" bordered={false}>
      <Typography>
        <Title level={4}>Agent监控</Title>
        <Paragraph>
          这里是Agent监控页面，您可以查看和管理Agent的运行状态。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default AgentMonitor;