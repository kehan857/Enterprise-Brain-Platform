import React, { useState, useEffect } from 'react';
import { Modal, Tabs, message, Spin, Progress, Space, Typography, Button, Alert } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import QuickDiagnosis from './QuickDiagnosis';
import ComprehensiveDiagnosis from './ComprehensiveDiagnosis';

const { Text, Title } = Typography;

const quickDiagnosisData = {
  readinessLevel: 'medium' as const,
  coreSystems: [
    { name: 'ERP系统', status: 'connected' as const, lastSync: '2024-01-20 10:30:00' },
    { name: 'MES系统', status: 'interrupted' as const, lastSync: '2024-01-19 15:45:00' },
    { name: '数据中台', status: 'not_configured' as const }
  ],
  coverageRate: 75,
  stabilityRate: 85
};

interface EnterpriseDiagnosisProps {
  visible: boolean;
  onClose: () => void;
  isFirstLogin?: boolean;
  onReportGenerated?: (reportId: string) => void;
}

const EnterpriseDiagnosis: React.FC<EnterpriseDiagnosisProps> = ({ visible, onClose, isFirstLogin = false, onReportGenerated }) => {
  const [activeTab, setActiveTab] = useState('quick');
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportId, setReportId] = useState<string>('');

  useEffect(() => {
    if (isFirstLogin) {
      message.info('欢迎使用企业大脑！让我们先通过快速诊断了解您的企业情况。');
    }
  }, [isFirstLogin]);

  const handleQuickDiagnosisComplete = async (values: any) => {
    try {
      setLoading(true);
      // TODO: 调用后端API保存快速诊断结果
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockReportId = 'QD' + Date.now().toString();
      setReportId(mockReportId);
      setDiagnosisResult(values);
      setLoading(false);
      setReportGenerated(true);
      if (onReportGenerated) {
        onReportGenerated(mockReportId);
      }
    } catch (error) {
      setLoading(false);
      message.error('诊断结果保存失败，请重试');
      console.error('保存诊断结果失败:', error);
    }
  };

  const handleComprehensiveDiagnosisComplete = async (values: any) => {
    try {
      setLoading(true);
      // TODO: 调用后端API保存全面诊断结果
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockReportId = 'CD' + Date.now().toString();
      setReportId(mockReportId);
      setDiagnosisResult(values);
      setLoading(false);
      setReportGenerated(true);
      if (onReportGenerated) {
        onReportGenerated(mockReportId);
      }
    } catch (error) {
      setLoading(false);
      message.error('诊断结果保存失败，请重试');
      console.error('保存诊断结果失败:', error);
    }
  };

  const handlePreviewReport = () => {
    if (!reportId) {
      message.warning('请先完成诊断并保存');
      return;
    }
    window.open(`/report/ReportPreview?reportId=${reportId}`, '_blank');
  };

  const renderReportGenerationStatus = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
          <Title level={4} style={{ marginTop: '20px' }}>正在分析您的企业信息并生成诊断报告，请稍候...</Title>
          <Progress percent={75} status="active" />
          <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
            我们正在深入分析您提供的信息，这可能需要一些时间
          </Text>
        </div>
      );
    }

    if (reportGenerated) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
          <Title level={4} style={{ margin: '20px 0' }}>您的企业诊断报告已生成！</Title>
          <Alert
            message="诊断报告编号"
            description={reportId}
            type="success"
            showIcon
            style={{ width: 'fit-content', margin: '0 auto 20px' }}
          />
          <Space direction="vertical" size="middle">
            <Text>您可以前往【报告中心】下载查看完整的诊断报告，或直接预览报告内容。</Text>
            <Space>
              <Button onClick={handlePreviewReport}>预览报告</Button>
              <Button type="primary" onClick={() => window.location.href = `/report-center?reportId=${reportId}`}>
                前往报告中心
              </Button>
              <Button onClick={onClose}>返回首页</Button>
            </Space>
          </Space>
        </div>
      );
    }

    return (
      <>
        {isFirstLogin && (
          <Alert
            message="首次使用提示"
            description="建议您先完成快速诊断问卷，帮助我们了解您的企业情况，为您提供更精准的服务。"
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            style={{ marginBottom: 16 }}
          />
        )}
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={[
          {
            key: 'quick',
            label: '快速诊断',
            children: <QuickDiagnosis {...quickDiagnosisData} onComplete={handleQuickDiagnosisComplete} />
          },
          {
            key: 'comprehensive',
            label: '全面诊断',
            children: <ComprehensiveDiagnosis onSave={handleComprehensiveDiagnosisComplete} onPreview={handlePreviewReport} />
          }
        ]} />
      </>
    );
  };

  return (
    <Modal
      title="企业AI诊断"
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
    >
      {renderReportGenerationStatus()}
    </Modal>
  );
};

export default EnterpriseDiagnosis;