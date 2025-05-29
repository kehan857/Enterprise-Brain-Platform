import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Table, 
  Space,
  Breadcrumb,
  Statistic,
  Select,
  Tag
} from 'antd';
import {
  ArrowLeftOutlined,
  CrownOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  DollarOutlined,
  BulbOutlined,
  RiseOutlined,
  StarOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 大客户列表数据
interface BigCustomerRecord {
  key: string;
  salesperson: string;
  customerName: string;
  scale: string;
  industry: string;
  contractCount: number;
  totalAmount: number;
  contributionRatio: number;
  growthRate: number;
  region: string;
  firstContract: string;
  lastContract: string;
  riskLevel: string;
  serviceSatisfaction: number;
}

const bigCustomerData: BigCustomerRecord[] = [
  {
    key: '1',
    salesperson: '王五',
    customerName: '深圳创新科技集团',
    scale: '大型企业',
    industry: '电子信息',
    contractCount: 24,
    totalAmount: 18500,
    contributionRatio: 11.8,
    growthRate: 15.2,
    region: '深圳市南山区',
    firstContract: '2020-08-15',
    lastContract: '2024-03-01',
    riskLevel: '低',
    serviceSatisfaction: 95
  },
  {
    key: '2',
    salesperson: '张三',
    customerName: '北京央企集团',
    scale: '特大型企业',
    industry: '制造业',
    contractCount: 32,
    totalAmount: 25800,
    contributionRatio: 16.5,
    growthRate: 8.9,
    region: '北京市朝阳区',
    firstContract: '2019-03-10',
    lastContract: '2024-02-28',
    riskLevel: '极低',
    serviceSatisfaction: 98
  },
  {
    key: '3',
    salesperson: '李四',
    customerName: '上海智能制造龙头',
    scale: '大型企业',
    industry: '智能制造',
    contractCount: 18,
    totalAmount: 15600,
    contributionRatio: 9.9,
    growthRate: 22.1,
    region: '上海市浦东新区',
    firstContract: '2021-06-20',
    lastContract: '2024-01-15',
    riskLevel: '低',
    serviceSatisfaction: 92
  },
  {
    key: '4',
    salesperson: '赵六',
    customerName: '天津重工设备',
    scale: '大型企业',
    industry: '重工设备',
    contractCount: 21,
    totalAmount: 12800,
    contributionRatio: 8.2,
    growthRate: 5.6,
    region: '天津市滨海新区',
    firstContract: '2020-11-05',
    lastContract: '2024-02-10',
    riskLevel: '中',
    serviceSatisfaction: 88
  },
  {
    key: '5',
    salesperson: '孙七',
    customerName: '广州汽车制造巨头',
    scale: '特大型企业',
    industry: '汽车制造',
    contractCount: 28,
    totalAmount: 22300,
    contributionRatio: 14.2,
    growthRate: 18.7,
    region: '广州市天河区',
    firstContract: '2019-09-15',
    lastContract: '2024-03-05',
    riskLevel: '极低',
    serviceSatisfaction: 96
  }
];

// 大客户合同额贡献分析数据
const contributionAnalysisData = [
  { year: '2024年', amount: 4568, percent: 29.1, growth: 18.5, color: '#52c41a' },
  { year: '2023年', amount: 3850, percent: 26.8, growth: 12.3, color: '#1890ff' },
  { year: '2022年', amount: 3430, percent: 25.2, growth: 8.9, color: '#722ed1' },
  { year: '2021年', amount: 3150, percent: 23.8, growth: 15.6, color: '#faad14' }
];

// 大客户行业分布数据
const industryDistributionData = [
  { industry: '制造业', count: 28, percent: 31.5, amount: 1450, color: '#1890ff' },
  { industry: '电子信息', count: 22, percent: 24.7, amount: 1280, color: '#52c41a' },
  { industry: '智能制造', count: 18, percent: 20.2, amount: 980, color: '#722ed1' },
  { industry: '汽车制造', count: 12, percent: 13.5, amount: 680, color: '#faad14' },
  { industry: '其他行业', count: 9, percent: 10.1, amount: 178, color: '#13c2c2' }
];

// 大客户关键产品/服务分析数据
const productServiceAnalysisData = [
  { product: '智能化产线', count: 45, amount: 1850, percent: 40.5, satisfaction: 94, color: '#1890ff' },
  { product: '大型设备', count: 32, amount: 1320, percent: 28.9, satisfaction: 92, color: '#52c41a' },
  { product: '系统集成', count: 28, amount: 890, percent: 19.5, satisfaction: 90, color: '#722ed1' },
  { product: '技术服务', count: 23, amount: 508, percent: 11.1, satisfaction: 96, color: '#faad14' }
];

// 大客户满意度/健康度数据
const healthScoreData = [
  { level: '优秀', score: '90-100', count: 52, percent: 58.4, color: '#52c41a' },
  { level: '良好', score: '80-89', count: 25, percent: 28.1, color: '#1890ff' },
  { level: '一般', score: '70-79', count: 9, percent: 10.1, color: '#faad14' },
  { level: '待改善', score: '<70', count: 3, percent: 3.4, color: '#ff4d4f' }
];

// 大客户风险预警数据
const riskWarningData = [
  { risk: '极低风险', count: 42, percent: 47.2, indicators: '持续增长,高满意度', color: '#52c41a' },
  { risk: '低风险', count: 28, percent: 31.5, indicators: '稳定合作,满意度良好', color: '#1890ff' },
  { risk: '中风险', count: 15, percent: 16.9, indicators: '增长放缓,需要关注', color: '#faad14' },
  { risk: '高风险', count: 4, percent: 4.4, indicators: '满意度下降,流失风险', color: '#ff4d4f' }
];

const BigCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedSatisfaction, setSelectedSatisfaction] = useState<string>('all');

  const columns: ColumnsType<BigCustomerRecord> = [
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => console.log(`查看${name}的详情`)}>
          {name}
        </Button>
      )
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string, record: BigCustomerRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => navigate(`/customer-360/${record.key}`)}
        >
          {name}
        </Button>
      )
    },
    {
      title: '规模',
      dataIndex: 'scale',
      width: 100,
      render: (scale: string) => {
        const color = scale === '特大型企业' ? 'red' : 'orange';
        return <Tag color={color}>{scale}</Tag>;
      }
    },
    {
      title: '行业',
      dataIndex: 'industry',
      width: 100
    },
    {
      title: '合同数量',
      dataIndex: 'contractCount',
      width: 100,
      sorter: (a, b) => a.contractCount - b.contractCount,
      render: (count: number) => `${count}单`
    },
    {
      title: '累计金额(万)',
      dataIndex: 'totalAmount',
      width: 120,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '贡献占比',
      dataIndex: 'contributionRatio',
      width: 100,
      sorter: (a, b) => a.contributionRatio - b.contributionRatio,
      render: (ratio: number) => `${ratio}%`
    },
    {
      title: '增长率',
      dataIndex: 'growthRate',
      width: 100,
      sorter: (a, b) => a.growthRate - b.growthRate,
      render: (rate: number) => (
        <span style={{ color: rate > 0 ? '#52c41a' : '#ff4d4f' }}>
          {rate > 0 ? '↑' : '↓'}{Math.abs(rate)}%
        </span>
      )
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      width: 100,
      render: (level: string) => {
        let color = 'default';
        if (level === '极低') color = 'green';
        else if (level === '低') color = 'blue';
        else if (level === '中') color = 'orange';
        else if (level === '高') color = 'red';
        return <Tag color={color}>{level}风险</Tag>;
      }
    },
    {
      title: '满意度',
      dataIndex: 'serviceSatisfaction',
      width: 100,
      sorter: (a, b) => a.serviceSatisfaction - b.serviceSatisfaction,
      render: (score: number) => (
        <span style={{ 
          color: score >= 95 ? '#52c41a' : score >= 90 ? '#1890ff' : score >= 80 ? '#faad14' : '#ff4d4f' 
        }}>
          {score}分
        </span>
      )
    },
    {
      title: '省市区',
      dataIndex: 'region',
      width: 140
    },
    {
      title: '最近签约',
      dataIndex: 'lastContract',
      width: 100
    }
  ];

  // 渲染分析卡片
  const renderAnalysisCard = (
    title: string, 
    data: any[], 
    icon: React.ReactNode,
    valueKey: string = 'count',
    unitSuffix: string = '位'
  ) => (
    <Card 
      title={
        <div className="flex-start">
          {icon}
          {title}
        </div>
      }
      className="analysis-card"
      size="small"
    >
      <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
        {data.map((item, index) => (
          <div key={index} className="data-item">
            <div className="data-item-left">
              <div 
                className="data-item-indicator"
                style={{ backgroundColor: item.color }}
              />
              <span className="data-item-label">
                {item.year || item.industry || item.product || item.level || item.risk}
              </span>
            </div>
            <div className="data-item-right">
              <div className="data-item-value">
                {item[valueKey]}{unitSuffix}
                {item.score && ` (${item.score})`}
              </div>
              <div className="data-item-desc">
                占比: {item.percent}%
                {item.growth && ` | 增长: ${item.growth}%`}
                {item.amount && ` | 金额: ¥${item.amount}万`}
                {item.satisfaction && ` | 满意度: ${item.satisfaction}分`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="page-container">
      {/* 面包屑导航 */}
      <Breadcrumb className="page-breadcrumb">
        <Breadcrumb.Item>
          <Button 
            icon={<ArrowLeftOutlined />} 
            type="link" 
            onClick={() => navigate('/marketing-analytics')}
            className="btn-link"
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>营销数据板块</Breadcrumb.Item>
        <Breadcrumb.Item>大客户分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <CrownOutlined style={{ marginRight: 8, color: '#722ed1' }} />
            大客户分析看板
          </Title>
        </div>
      </div>

      {/* 核心指标回顾区 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="大客户数量"
                value={89}
                suffix="位"
                valueStyle={{ fontSize: '24px', color: '#722ed1' }}
                prefix={<CrownOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">目标: 80位</Text>
                <Tag color="green" style={{ marginLeft: 8 }}>111.3%</Tag>
                <Tag color="green">同比↑8.9%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="大客户合同金额"
                value={4568}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                prefix={<DollarOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">目标: 4200万元</Text>
                <Tag color="green" style={{ marginLeft: 8 }}>108.8%</Tag>
                <Tag color="green">同比↑18.5%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="合同金额占比"
                value={29.1}
                suffix="%"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<TrophyOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">目标: 28%</Text>
                <Tag color="green" style={{ marginLeft: 8 }}>103.9%</Tag>
                <Tag color="green">同比↑2.3%</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          {renderAnalysisCard(
            '合同额贡献趋势',
            contributionAnalysisData,
            <RiseOutlined style={{ color: '#1890ff', marginRight: 8 }} />,
            'amount',
            '万元'
          )}
        </Col>
        
        <Col xs={24} lg={12}>
          {renderAnalysisCard(
            '行业分布分析',
            industryDistributionData,
            <BarChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          {renderAnalysisCard(
            '关键产品/服务分析',
            productServiceAnalysisData,
            <StarOutlined style={{ color: '#722ed1', marginRight: 8 }} />,
            'count',
            '项'
          )}
        </Col>
        
        <Col xs={24} lg={12}>
          {renderAnalysisCard(
            '客户健康度分析',
            healthScoreData,
            <SafetyOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
          )}
        </Col>
      </Row>

      {/* 大客户风险预警 */}
      <Card 
        title={
          <div className="flex-start">
            <SafetyOutlined style={{ color: '#faad14', marginRight: 8 }} />
            大客户风险预警分析
          </div>
        }
        className="analysis-card card-mb-24"
        size="small"
      >
        <Row gutter={16}>
          {riskWarningData.map((risk, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <div className="data-item" style={{ 
                background: risk.color === '#52c41a' ? '#f6ffed' : 
                           risk.color === '#1890ff' ? '#f0f9ff' :
                           risk.color === '#faad14' ? '#fff7e6' : '#fff2f0',
                border: `1px solid ${risk.color}40`
              }}>
                <div style={{ width: '100%' }}>
                  <div style={{ 
                    color: risk.color, 
                    fontWeight: 'bold', 
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div 
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: risk.color,
                        borderRadius: '50%',
                        marginRight: '8px'
                      }}
                    />
                    {risk.risk}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {risk.count}位 ({risk.percent}%)
                  </div>
                  <div style={{ fontSize: '11px', color: '#666' }}>
                    {risk.indicators}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 大客户列表明细 */}
      <Card 
        title="大客户列表明细" 
        className="analysis-card"
      >
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <span className="filter-label">行业筛选:</span>
              <Select
                value={selectedIndustry}
                onChange={setSelectedIndustry}
                style={{ width: 150 }}
              >
                <Option value="all">全部行业</Option>
                <Option value="制造业">制造业</Option>
                <Option value="电子信息">电子信息</Option>
                <Option value="智能制造">智能制造</Option>
                <Option value="汽车制造">汽车制造</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <span className="filter-label">风险等级:</span>
              <Select
                value={selectedRisk}
                onChange={setSelectedRisk}
                style={{ width: 150 }}
              >
                <Option value="all">全部等级</Option>
                <Option value="极低">极低风险</Option>
                <Option value="低">低风险</Option>
                <Option value="中">中风险</Option>
                <Option value="高">高风险</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <span className="filter-label">满意度:</span>
              <Select
                value={selectedSatisfaction}
                onChange={setSelectedSatisfaction}
                style={{ width: 150 }}
              >
                <Option value="all">全部等级</Option>
                <Option value="excellent">优秀(95+)</Option>
                <Option value="good">良好(90-94)</Option>
                <Option value="average">一般(80-89)</Option>
                <Option value="poor">待提升(&lt;80)</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={bigCustomerData}
          className="custom-table"
          scroll={{ x: 1500 }}
          pagination={{
            total: 89,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>
    </div>
  );
};

export default BigCustomerAnalysis; 