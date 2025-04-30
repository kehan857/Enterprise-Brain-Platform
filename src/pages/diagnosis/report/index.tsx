import { useState } from 'react';
import { Card, Typography, Row, Col, Divider, Button, Space, Progress, Table } from 'antd';
import { DownloadOutlined, PrinterOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface DiagnosisData {
  dimension: string;
  score: number;
  level: string;
  problems: string[];
  suggestions: string[];
}

const DiagnosisReport = () => {
  // 模拟诊断数据
  const [reportData] = useState({
    basicInfo: {
      companyName: '示例企业有限公司',
      industry: '制造业',
      scale: '中型企业',
      date: '2024-01-05',
      duration: '30分钟',
    },
    overallScore: 75,
    dimensionData: [
      {
        dimension: '经营管理',
        score: 80,
        level: '良好',
        problems: [
          '企业战略规划不够清晰',
          '管理流程有待优化'
        ],
        suggestions: [
          '制定详细的战略发展规划',
          '优化内部管理流程，提高运营效率'
        ]
      },
      {
        dimension: '生产运营',
        score: 70,
        level: '中等',
        problems: [
          '生产设备利用率不高',
          '库存管理效率待提升'
        ],
        suggestions: [
          '优化生产排程，提高设备利用率',
          '实施精益库存管理'
        ]
      },
      {
        dimension: '财务状况',
        score: 85,
        level: '优秀',
        problems: [
          '应收账款周转率较低',
          '成本控制有待加强'
        ],
        suggestions: [
          '加强应收账款管理',
          '建立全面预算管理体系'
        ]
      },
      {
        dimension: '创新能力',
        score: 65,
        level: '待改进',
        problems: [
          '研发投入不足',
          '创新机制不完善'
        ],
        suggestions: [
          '增加研发投入',
          '建立创新激励机制'
        ]
      }
    ]
  });

  const columns: TableProps<DiagnosisData>['columns'] = [
    {
      title: '诊断维度',
      dataIndex: 'dimension',
      key: 'dimension',
      width: 120,
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      width: 100,
      render: (score: number) => (
        <Progress
          percent={score}
          size="small"
          status={score >= 80 ? 'success' : score >= 60 ? 'normal' : 'exception'}
        />
      ),
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      width: 100,
    },
    {
      title: '主要问题',
      dataIndex: 'problems',
      key: 'problems',
      render: (problems: string[]) => (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {problems.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
      ),
    },
    {
      title: '改进建议',
      dataIndex: 'suggestions',
      key: 'suggestions',
      render: (suggestions: string[]) => (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card>
        {/* 报告头部 */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2}>企业诊断报告</Title>
          <Text type="secondary">生成时间：{reportData.basicInfo.date}</Text>
        </div>

        {/* 操作按钮 */}
        <div style={{ textAlign: 'right', marginBottom: 24 }}>
          <Space>
            <Button icon={<DownloadOutlined />}>下载报告</Button>
            <Button icon={<PrinterOutlined />}>打印报告</Button>
            <Button icon={<ShareAltOutlined />}>分享报告</Button>
          </Space>
        </div>

        {/* 基本信息 */}
        <Card title="基本信息" bordered={false}>
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <Text>企业名称：{reportData.basicInfo.companyName}</Text>
            </Col>
            <Col span={8}>
              <Text>所属行业：{reportData.basicInfo.industry}</Text>
            </Col>
            <Col span={8}>
              <Text>企业规模：{reportData.basicInfo.scale}</Text>
            </Col>
            <Col span={8}>
              <Text>诊断日期：{reportData.basicInfo.date}</Text>
            </Col>
            <Col span={8}>
              <Text>诊断用时：{reportData.basicInfo.duration}</Text>
            </Col>
          </Row>
        </Card>

        <Divider />

        {/* 总体评分 */}
        <Card title="总体评分" bordered={false}>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Progress
              type="circle"
              percent={reportData.overallScore}
              width={120}
              format={(percent) => (
                <div>
                  <div style={{ fontSize: 24, fontWeight: 'bold' }}>{percent}</div>
                  <div style={{ fontSize: 14 }}>总分</div>
                </div>
              )}
            />
            <Paragraph style={{ marginTop: 20 }}>
              根据诊断结果，贵企业整体运营状况良好，但在部分领域仍有提升空间。
              建议重点关注创新能力建设和生产运营效率提升。
            </Paragraph>
          </div>
        </Card>

        <Divider />

        {/* 维度分析 */}
        <Card title="维度分析" bordered={false}>
          <Table
            columns={columns}
            dataSource={reportData.dimensionData}
            pagination={false}
            rowKey="dimension"
          />
        </Card>

        <Divider />

        {/* 总结建议 */}
        <Card title="总结建议" bordered={false}>
          <Paragraph>
            1. <Text strong>战略规划优化：</Text>
            建议企业进一步明确发展战略，制定详细的实施路径和量化指标。
          </Paragraph>
          <Paragraph>
            2. <Text strong>运营效率提升：</Text>
            通过流程再造和信息化建设，提高企业整体运营效率。
          </Paragraph>
          <Paragraph>
            3. <Text strong>创新能力建设：</Text>
            加大研发投入，完善创新激励机制，培育企业持续创新能力。
          </Paragraph>
          <Paragraph>
            4. <Text strong>人才梯队建设：</Text>
            加强人才培养和引进，建立健全人才发展体系。
          </Paragraph>
        </Card>
      </Card>
    </div>
  );
};

export default DiagnosisReport;