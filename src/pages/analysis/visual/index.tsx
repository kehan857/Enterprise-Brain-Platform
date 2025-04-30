import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const VisualEditor: React.FC = () => {
  return (
    <Card title="可视化编辑器" bordered={false}>
      <Typography>
        <Title level={4}>可视化编辑器</Title>
        <Paragraph>
          这里是可视化编辑器页面，您可以创建和编辑数据可视化图表。
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default VisualEditor;