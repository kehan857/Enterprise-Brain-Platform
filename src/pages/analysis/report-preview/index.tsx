import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Row, Col, Statistic, Divider, Progress, List } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface DiagnosisReport {
  id: string;
  title: string;
  summary: string;
  score: number;
  createTime: string;
  dimensions: {
    name: string;
    score: number;
    status: 'good' | 'warning' | 'danger';
    suggestions: string[];
  }[];
  recommendations: string[];
}

const mockReport: DiagnosisReport = {
  id: 'QD1705722600000',
  title: '企业AI快速诊断报告',
  summary: '根据对贵公司各维度的综合分析，企业整体运营状况良好，但在数字化转型和创新能力方面仍有提升空间。建议加强技术创新投入，优化业务流程数字化水平。',
  score: 85,
  createTime: '2024-01-20 10:30:00',
  dimensions: [
    {
      name: '经营效率',
      score: 88,
      status: 'good',
      suggestions: [
        '当前经营效率处于良好水平',
        '建议进一步优化库存周转率',
        '可考虑引入智能预测系统提升计划准确性'
      ]
    },
    {
      name: '创新能力',
      score: 75,
      status: 'warning',
      suggestions: [
        '研发投入比例低于行业平均水平',
        '建议增加技术创新项目',
        '可以考虑建立创新激励机制'
      ]
    },
    {
      name: '运营效率',
      score: 92,
      status: 'good',
      suggestions: [
        '生产线自动化水平较高',
        '设备利用率达到预期目标',
        '建议持续推进精益生产'
      ]
    },
    {
      name: '数字化水平',
      score: 78,
      status: 'warning',
      suggestions: [
        '核心业务系统需要升级',
        '数据分析能力有待提升',
        '建议加快数字化转型进程'
      ]
    }
  ],
  recommendations: [
    '加大研发投入，提升技术创新能力',
    '推进业务流程数字化改造',
    '建立健全创新激励机制',
    '优化供应链管理系统',
    '加强员工数字技能培训'
  ]
};

const ReportPreview: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const report = mockReport; // 实际项目中应该根据reportId从后端获取数据

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#52c41a';
      case 'warning':
        return '#faad14';
      case 'danger':
        return '#f5222d';
      default:
        return '#1890ff';
    }
  };

  return (
    <div className="report-preview" style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>{report.title}</Title>
        <Paragraph type="secondary">报告编号：{report.id} | 生成时间：{report.createTime}</Paragraph>
        
        <Card type="inner" title="诊断总览" style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Statistic
                title="综合评分"
                value={report.score}
                suffix="/ 100"
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={12}>
              <Progress
                type="circle"
                percent={report.score}
                format={percent => `${percent}分`}
                status={report.score >= 80 ? 'success' : 'normal'}
              />
            </Col>
          </Row>
          <Divider />
          <Title level={4}>诊断摘要</Title>
          <Paragraph>{report.summary}</Paragraph>
        </Card>

        <Card type="inner" title="维度分析" style={{ marginBottom: 24 }}>
          <Row gutter={[24, 24]}>
            {report.dimensions.map(dimension => (
              <Col span={12} key={dimension.name}>
                <Card>
                  <Statistic
                    title={dimension.name}
                    value={dimension.score}
                    suffix="分"
                    valueStyle={{ color: getStatusColor(dimension.status) }}
                  />
                  <Divider />
                  <List
                    size="small"
                    dataSource={dimension.suggestions}
                    renderItem={item => (
                      <List.Item>
                        <Typography.Text>
                          {dimension.status === 'good' ? (
                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                          ) : (
                            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
                          )}
                          {item}
                        </Typography.Text>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <Card type="inner" title="改进建议">
          <List
            dataSource={report.recommendations}
            renderItem={(item, index) => (
              <List.Item>
                <Typography.Text>
                  {index + 1}. {item}
                </Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      </Card>
    </div>
  );
};

export default ReportPreview;