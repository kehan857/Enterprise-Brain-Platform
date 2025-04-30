import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ModelDeploy: React.FC = () => {
  return (
    <Card title="模型部署" bordered={false}>
      <Typography>
        <Title level={4}>模型部署</Title>
        <Paragraph>
          这里是模型部署页面，您可以管理已训练模型的部署和服务。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default ModelDeploy;