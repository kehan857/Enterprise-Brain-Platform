import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const SystemConfig: React.FC = () => {
  return (
    <Card title="系统配置" bordered={false}>
      <Typography>
        <Title level={4}>系统配置</Title>
        <Paragraph>
          这里是系统配置页面，您可以管理系统的全局设置和参数。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default SystemConfig;