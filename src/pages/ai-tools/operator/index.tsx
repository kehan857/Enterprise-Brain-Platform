import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Operator: React.FC = () => {
  return (
    <Card title="操作符" bordered={false}>
      <Typography>
        <Title level={4}>操作符</Title>
        <Paragraph>
          这里是操作符页面，您可以管理AI工作流中的操作符组件。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default Operator;