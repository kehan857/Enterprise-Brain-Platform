import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { DownloadOutlined, PrinterOutlined, ShareAltOutlined } from '@ant-design/icons';
import DiagnosisReport from '../../components/EnterpriseDiagnosis/DiagnosisReport';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;

const mockReportData = {
  reportId: 'QD1745387453890',
  basicInfo: {
    industry: '电子制造业',
    scale: '大型企业（1000人以上）',
    reportDate: '2024-01-22'
  },
  overview: {
    readinessScore: 82,
    digitalLevel: 'L4',
    systemCoverage: 90,
    dataQuality: 85
  },
  systemStatus: [
    {
      name: 'ERP系统',
      status: 'connected',
      score: 92,
      suggestions: [
        '建议进一步优化成本管理模块',
        '加强与供应商系统的数据对接'
      ]
    },
    {
      name: 'MES系统',
      status: 'connected',
      score: 88,
      suggestions: [
        '建议优化生产计划排程算法',
        '加强设备预测性维护功能'
      ]
    },
    {
      name: '数据中台',
      status: 'connected',
      score: 78,
      suggestions: [
        '完善数据质量监控机制',
        '加强数据安全管理体系建设'
      ]
    }
  ],
  dimensionAnalysis: [
    {
      dimension: '数字化基础设施',
      score: 88,
      strengths: [
        '信息系统架构完善',
        '网络及硬件设施先进'
      ],
      weaknesses: [
        '部分系统定制化程度高，维护成本较大',
        '边缘计算能力需要提升'
      ]
    },
    {
      dimension: '数据管理能力',
      score: 85,
      strengths: [
        '已建立完整的数据治理体系',
        '数据标准化程度高'
      ],
      weaknesses: [
        '跨部门数据共享机制有待优化',
        '实时数据分析能力需要提升'
      ]
    },
    {
      dimension: 'AI应用水平',
      score: 75,
      strengths: [
        '已在多个场景成功应用AI技术',
        '具备专业的AI研发团队'
      ],
      weaknesses: [
        'AI模型的可解释性需要加强',
        'AI应用的ROI评估体系不完善'
      ]
    }
  ],
  recommendations: [
    {
      category: '智能制造升级',
      priority: 'high',
      content: '建议在现有智能制造基础上，进一步推进5G+工业互联网建设，打造柔性智能产线，提升生产效率和产品质量。',
      expectedBenefit: '预计可提升生产效率25%，降低不良品率40%'
    },
    {
      category: '数据价值挖掘',
      priority: 'high',
      content: '加强数据分析平台建设，引入高级分析工具，深化数据挖掘应用，为经营决策提供数据支持。',
      expectedBenefit: '提升决策准确率30%，创造新的数据价值'
    },
    {
      category: 'AI创新应用',
      priority: 'medium',
      content: '扩大AI技术应用范围，在产品质检、需求预测、智能客服等领域开展创新应用，打造AI驱动的智能工厂。',
      expectedBenefit: '预计可降低运营成本20%，提升客户满意度15%'
    }
  ]
};

const ReportPreview: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId');

  const handleDownload = () => {
    // TODO: 实现报告下载功能
    console.log('下载报告');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // TODO: 实现报告分享功能
    console.log('分享报告');
  };

  return (
    <div style={{ padding: 24, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={4}>企业诊断报告预览</Title>
          <Space>
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              下载报告
            </Button>
            <Button icon={<PrinterOutlined />} onClick={handlePrint}>
              打印报告
            </Button>
            <Button icon={<ShareAltOutlined />} onClick={handleShare}>
              分享报告
            </Button>
          </Space>
        </Space>
      </Card>
      
      <DiagnosisReport {...mockReportData} />
    </div>
  );
};

export default ReportPreview;