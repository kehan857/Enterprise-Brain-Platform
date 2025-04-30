import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const BiAnalysis: React.FC = () => {
  return (
    <Card title="BI分析" bordered={false}>
      <Typography>
        <Title level={4}>BI分析</Title>
        <Paragraph>
          这里是BI分析页面，您可以进行数据分析和可视化。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default BiAnalysis;