import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const PromptFactory: React.FC = () => {
  return (
    <Card title="Prompt工厂" bordered={false}>
      <Typography>
        <Title level={4}>Prompt工厂</Title>
        <Paragraph>
          这里是Prompt工厂页面，您可以创建和管理AI提示模板。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default PromptFactory;