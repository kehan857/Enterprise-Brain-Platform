import React from 'react';
import { Card, Typography, Row, Col, Progress, Space, Divider, Tag, List } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface DiagnosisReportProps {
  reportId: string;
  basicInfo: {
    industry: string;
    scale: string;
    reportDate: string;
  };
  overview: {
    readinessScore: number;
    digitalLevel: string;
    systemCoverage: number;
    dataQuality: number;
  };
  systemStatus: Array<{
    name: string;
    status: 'connected' | 'interrupted' | 'not_configured';
    score: number;
    suggestions: string[];
  }>;
  dimensionAnalysis: Array<{
    dimension: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
  }>;
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    content: string;
    expectedBenefit: string;
  }>;
}

const DiagnosisReport: React.FC<DiagnosisReportProps> = ({
  reportId,
  basicInfo,
  overview,
  systemStatus,
  dimensionAnalysis,
  recommendations
}) => {
  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { color: '#52c41a', text: '高度就绪' };
    if (score >= 60) return { color: '#faad14', text: '基本就绪' };
    return { color: '#ff4d4f', text: '待提升' };
  };

  const getSystemStatusTag = (status: 'connected' | 'interrupted' | 'not_configured') => {
    switch (status) {
      case 'connected':
        return <Tag icon={<CheckCircleOutlined />} color="success">已连接</Tag>;
      case 'interrupted':
        return <Tag icon={<ExclamationCircleOutlined />} color="warning">连接中断</Tag>;
      case 'not_configured':
        return <Tag icon={<ClockCircleOutlined />} color="default">未配置</Tag>;
    }
  };

  const getPriorityTag = (priority: 'high' | 'medium' | 'low') => {
    const config = {
      high: { color: '#ff4d4f', text: '高优先级' },
      medium: { color: '#faad14', text: '中优先级' },
      low: { color: '#52c41a', text: '低优先级' }
    };
    return <Tag color={config[priority].color}>{config[priority].text}</Tag>;
  };

  return (
    <div className="diagnosis-report">
      {/* 报告头部 */}
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Title level={4}>企业诊断报告</Title>
        <Paragraph type="secondary">报告编号：{reportId}</Paragraph>
        <Row gutter={24}>
          <Col span={8}>
            <Text>所属行业：{basicInfo.industry}</Text>
          </Col>
          <Col span={8}>
            <Text>企业规模：{basicInfo.scale}</Text>
          </Col>
          <Col span={8}>
            <Text>报告日期：{basicInfo.reportDate}</Text>
          </Col>
        </Row>
      </Card>

      {/* 诊断概览 */}
      <Card title="诊断结果概览" bordered={false} style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Card bordered={false}>
              <Paragraph>AI就绪度评分</Paragraph>
              <Title level={3}>{overview.readinessScore}</Title>
              <Progress
                percent={overview.readinessScore}
                status={overview.readinessScore >= 60 ? 'success' : 'exception'}
                strokeColor={getReadinessLevel(overview.readinessScore).color}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Paragraph>数字化等级</Paragraph>
              <Title level={3}>{overview.digitalLevel}</Title>
              <Text type="secondary">企业整体数字化水平评估</Text>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Paragraph>系统覆盖率</Paragraph>
              <Title level={3}>{overview.systemCoverage}%</Title>
              <Progress percent={overview.systemCoverage} size="small" />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Paragraph>数据质量评分</Paragraph>
              <Title level={3}>{overview.dataQuality}</Title>
              <Progress
                percent={overview.dataQuality}
                size="small"
                status={overview.dataQuality >= 60 ? 'success' : 'exception'}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 系统现状 */}
      <Card title="核心系统评估" bordered={false} style={{ marginBottom: 24 }}>
        <List
          dataSource={systemStatus}
          renderItem={item => (
            <List.Item>
              <Card style={{ width: '100%' }} bordered={false}>
                <Row align="middle">
                  <Col span={6}>
                    <Space>
                      <Text strong>{item.name}</Text>
                      {getSystemStatusTag(item.status)}
                    </Space>
                  </Col>
                  <Col span={6}>
                    <Progress percent={item.score} size="small" />
                  </Col>
                  <Col span={12}>
                    <List
                      size="small"
                      dataSource={item.suggestions}
                      renderItem={suggestion => (
                        <List.Item>
                          <Text type="secondary">· {suggestion}</Text>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </Card>

      {/* 维度分析 */}
      <Card title="多维度分析" bordered={false} style={{ marginBottom: 24 }}>
        {dimensionAnalysis.map((dimension, index) => (
          <div key={index}>
            <Row gutter={24} align="middle">
              <Col span={6}>
                <Text strong>{dimension.dimension}</Text>
              </Col>
              <Col span={6}>
                <Progress percent={dimension.score} size="small" />
              </Col>
              <Col span={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text type="success">优势：</Text>
                    {dimension.strengths.map((strength, i) => (
                      <Paragraph key={i} style={{ marginBottom: 4 }}>
                        · {strength}
                      </Paragraph>
                    ))}
                  </div>
                  <div>
                    <Text type="danger">不足：</Text>
                    {dimension.weaknesses.map((weakness, i) => (
                      <Paragraph key={i} style={{ marginBottom: 4 }}>
                        · {weakness}
                      </Paragraph>
                    ))}
                  </div>
                </Space>
              </Col>
            </Row>
            {index < dimensionAnalysis.length - 1 && <Divider />}
          </div>
        ))}
      </Card>

      {/* 改进建议 */}
      <Card title="改进建议" bordered={false}>
        <List
          dataSource={recommendations}
          renderItem={item => (
            <List.Item>
              <Card
                style={{ width: '100%' }}
                bordered={false}
                title={
                  <Space>
                    <Text strong>{item.category}</Text>
                    {getPriorityTag(item.priority)}
                  </Space>
                }
              >
                <Paragraph>{item.content}</Paragraph>
                <Text type="secondary">预期收益：{item.expectedBenefit}</Text>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DiagnosisReport;