import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ModelTrain: React.FC = () => {
  return (
    <Card title="模型训练" bordered={false}>
      <Typography>
        <Title level={4}>模型训练</Title>
        <Paragraph>
          这里是模型训练页面，您可以配置和启动模型训练任务。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default ModelTrain;