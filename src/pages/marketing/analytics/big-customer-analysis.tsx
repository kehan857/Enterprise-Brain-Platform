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
  Tag,
  Input
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
  SearchOutlined
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
    lastContract: '2024-03-01'
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
    lastContract: '2024-02-28'
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
    lastContract: '2024-01-15'
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
    lastContract: '2024-02-10'
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
    lastContract: '2024-03-05'
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

const BigCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const columns: ColumnsType<BigCustomerRecord> = [
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
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${name === '张三' ? '1' : name === '李四' ? '2' : '3'}`)}>
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
        <Row gutter={[16, 16]} style={{ display: 'flex', alignItems: 'stretch' }}>
          <Col xs={24} sm={8}>
            <Card 
              size="small" 
              className="metric-card"
              style={{ height: '160px' }}
            >
              <Statistic
                title="大客户数量"
                value={89}
                suffix="位"
                valueStyle={{ fontSize: '24px', color: '#722ed1' }}
                prefix={<CrownOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑8.9%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              size="small" 
              className="metric-card"
              style={{ height: '160px' }}
            >
              <Statistic
                title="大客户合同金额"
                value={4568}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                prefix={<DollarOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑18.5%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              size="small" 
              className="metric-card"
              style={{ height: '160px' }}
            >
              <Statistic
                title="合同金额占比"
                value={29.1}
                suffix="%"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<TrophyOutlined />}
              />
              <div className="mt-8">
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

      {/* 大客户列表明细 */}
      <Card 
        title="大客户列表明细" 
        className="analysis-card"
      >
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <span className="filter-label">搜索:</span>
              <Input
                placeholder="搜索客户名称、业务员"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                allowClear
              />
            </div>

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