import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Spin } from 'antd';

const { Title, Text } = Typography;

const ReportPreview: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();

  // TODO: 根据reportId从后端获取报告数据
  const loading = false;
  const reportData = null;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="加载报告内容..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>企业诊断报告</Title>
        <Text type="secondary">报告编号：{reportId}</Text>
        
        {reportData ? (
          <div style={{ marginTop: '24px' }}>
            {/* TODO: 根据reportData渲染报告内容 */}
            <Text>报告内容加载中...</Text>
          </div>
        ) : (
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Text type="secondary">未找到相关报告内容</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReportPreview;