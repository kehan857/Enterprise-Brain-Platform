import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ModelMarket: React.FC = () => {
  return (
    <Card title="模型市场" bordered={false}>
      <Typography>
        <Title level={4}>模型市场</Title>
        <Paragraph>
          这里是模型市场页面，您可以浏览和选择各种预训练模型。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default ModelMarket;