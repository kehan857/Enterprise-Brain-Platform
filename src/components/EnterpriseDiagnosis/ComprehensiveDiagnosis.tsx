import React from 'react';
import { Card, Typography, Button, Space, List } from 'antd';
import { RightOutlined, FileTextOutlined, BarChartOutlined, ApartmentOutlined, RobotOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface ComprehensiveDiagnosisProps {
  onSave?: (values: any) => void;
  onPreview?: () => void;
}

const ComprehensiveDiagnosis: React.FC<ComprehensiveDiagnosisProps> = () => {
  const diagnosticFeatures = [
    {
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: '全面的诊断维度',
      description: '从企业基础设施、管理体系、业务流程、数据应用等多个维度进行深入诊断'
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      title: '精准的评估体系',
      description: '采用标准化的评估指标，确保诊断结果的客观性和可比性'
    },
    {
      icon: <ApartmentOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      title: '系统的分析方法',
      description: '运用先进的分析方法，识别企业数字化转型中的关键问题和机会'
    },
    {
      icon: <RobotOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
      title: 'AI辅助决策',
      description: '利用人工智能技术，为企业提供个性化的转型建议和解决方案'
    }
  ];

  const handleStartDiagnosis = () => {
    window.location.href = '/enterprise-diagnosis';
  };

  return (
    <div style={{ padding: 24 }}>
      <Card bordered={false}>
        <Title level={4}>企业全面诊断系统</Title>
        <Paragraph>
          通过系统化的诊断方法，全面评估企业数字化现状，为企业数字化转型提供专业指导。
        </Paragraph>

        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4 }}
          dataSource={diagnosticFeatures}
          renderItem={item => (
            <List.Item>
              <Card>
                <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
                  {item.icon}
                  <Title level={5}>{item.title}</Title>
                  <Paragraph style={{ marginBottom: 0 }}>{item.description}</Paragraph>
                </Space>
              </Card>
            </List.Item>
          )}
        />

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Space direction="vertical" size="large">
            <Paragraph>
              开始全面诊断，深入了解企业数字化现状，获取专业的转型建议。
            </Paragraph>
            <Button type="primary" size="large" icon={<RightOutlined />} onClick={handleStartDiagnosis}>
              开始全面诊断
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ComprehensiveDiagnosis;