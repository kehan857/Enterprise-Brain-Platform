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
  TeamOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  DollarOutlined,
  BulbOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 老客户列表数据
interface OldCustomerRecord {
  key: string;
  salesperson: string;
  customerName: string;
  scale: string;
  industry: string;
  source: string;
  contractCount: number;
  totalAmount: number;
  shipmentAmount: number;
  paymentAmount: number;
  region: string;
  firstContract: string;
  lastContract: string;
  productType: string;
  productName: string;
  department: string;
  team: string;
}

const oldCustomerData: OldCustomerRecord[] = [
  {
    key: '1',
    salesperson: '李四',
    customerName: '上海智能制造公司',
    scale: '中型企业',
    industry: '智能制造',
    source: '网络推广',
    contractCount: 8,
    totalAmount: 3200,
    shipmentAmount: 3000,
    paymentAmount: 2850,
    region: '上海市浦东新区',
    firstContract: '2022-05-15',
    lastContract: '2024-01-10',
    productType: '箱柜',
    productName: '隔爆型三相异步电动机',
    department: '工控事业部',
    team: '隔爆组'
  },
  {
    key: '2',
    salesperson: '王五',
    customerName: '深圳创新科技集团',
    scale: '大型企业',
    industry: '电子信息',
    source: '老客户推荐',
    contractCount: 12,
    totalAmount: 8500,
    shipmentAmount: 7800,
    paymentAmount: 7200,
    region: '深圳市南山区',
    firstContract: '2021-08-15',
    lastContract: '2024-03-01',
    productType: '仪电',
    productName: '防爆话站',
    department: '智能制造部',
    team: '通讯电热组'
  },
  {
    key: '3',
    salesperson: '孙七',
    customerName: '广州汽车零部件公司',
    scale: '中型企业',
    industry: '汽车制造',
    source: '展会',
    contractCount: 6,
    totalAmount: 2800,
    shipmentAmount: 2500,
    paymentAmount: 2300,
    region: '广州市天河区',
    firstContract: '2023-01-20',
    lastContract: '2024-02-25',
    productType: '灯具开关',
    productName: '防爆扬声器',
    department: '客户服务部',
    team: '生产组'
  },
  {
    key: '4',
    salesperson: '赵六',
    customerName: '天津重工设备',
    scale: '大型企业',
    industry: '制造业',
    source: '直销',
    contractCount: 15,
    totalAmount: 12500,
    shipmentAmount: 11800,
    paymentAmount: 10500,
    region: '天津市滨海新区',
    firstContract: '2020-03-10',
    lastContract: '2024-02-15',
    productType: '暖通',
    productName: '防爆空调机',
    department: '空调事业部',
    team: '空调组'
  },
  {
    key: '5',
    salesperson: '钱八',
    customerName: '成都精密仪器',
    scale: '中型企业',
    industry: '精密仪器',
    source: '老客户推荐',
    contractCount: 4,
    totalAmount: 1680,
    shipmentAmount: 1500,
    paymentAmount: 1350,
    region: '成都市高新区',
    firstContract: '2023-06-20',
    lastContract: '2024-01-25',
    productType: '仪电',
    productName: '防爆摄像仪',
    department: '技术管理部',
    team: '技术组'
  }
];

// 老客户复购行为分析数据
const repurchaseBehaviorData = [
  { period: '6个月内', count: 89, percent: 32.4, avgAmount: 580, color: '#52c41a' },
  { period: '6-12个月', count: 125, percent: 45.5, avgAmount: 420, color: '#1890ff' },
  { period: '12-24个月', count: 48, percent: 17.5, avgAmount: 320, color: '#faad14' },
  { period: '24个月以上', count: 12, percent: 4.6, avgAmount: 180, color: '#ff4d4f' }
];

// 老客户产品偏好分析数据
const productPreferenceData = [
  { product: '智能设备', count: 456, percent: 37.0, amount: 5200, color: '#1890ff' },
  { product: '自动化产线', count: 298, percent: 24.1, amount: 3800, color: '#52c41a' },
  { product: '检测仪器', count: 234, percent: 19.0, amount: 2100, color: '#722ed1' },
  { product: '配套软件', count: 156, percent: 12.6, amount: 980, color: '#faad14' },
  { product: '其他产品', count: 90, percent: 7.3, amount: 485, color: '#13c2c2' }
];

const OldCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const columns: ColumnsType<OldCustomerRecord> = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string, record: OldCustomerRecord) => (
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
      width: 80,
      render: (scale: string) => {
        const color = scale === '大型企业' ? 'red' : scale === '中型企业' ? 'orange' : 'green';
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
      title: '回款金额(万)',
      dataIndex: 'paymentAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '省市区',
      dataIndex: 'region',
      width: 140
    },
    {
      title: '首次签约',
      dataIndex: 'firstContract',
      width: 100
    },
    {
      title: '最近签约',
      dataIndex: 'lastContract',
      width: 100
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      width: 100
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      width: 100
    },
    {
      title: '部门名称',
      dataIndex: 'department',
      width: 100
    },
    {
      title: '班组名称',
      dataIndex: 'team',
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
              <span className="data-item-label">{item.period || item.product}</span>
            </div>
            <div className="data-item-right">
              <div className="data-item-value">{item[valueKey]}{unitSuffix}</div>
              <div className="data-item-desc">
                占比: {item.percent}%
                {item.avgAmount && ` | 均额: ¥${item.avgAmount}万`}
                {item.amount && ` | 金额: ¥${item.amount}万`}
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
        <Breadcrumb.Item>老客户分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <HeartOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            老客户分析看板
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
                title="老客户数量"
                value={1234}
                suffix="位"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<TeamOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑3.8%</Tag>
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
                title="累计合同金额"
                value={8765}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                prefix={<DollarOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑6.2%</Tag>
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
                title="复购率"
                value={68.2}
                suffix="%"
                valueStyle={{ fontSize: '24px', color: '#722ed1' }}
                prefix={<TrophyOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑2.5%</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          {renderAnalysisCard(
            '复购行为分析',
            repurchaseBehaviorData,
            <ClockCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
          )}
        </Col>
        
        <Col xs={24} lg={12}>
          {renderAnalysisCard(
            '产品偏好分析',
            productPreferenceData,
            <PieChartOutlined style={{ color: '#722ed1', marginRight: 8 }} />
          )}
        </Col>
      </Row>

      {/* 老客户列表明细 */}
      <Card 
        title="老客户列表明细" 
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
                <Option value="智能制造">智能制造</Option>
                <Option value="电子信息">电子信息</Option>
                <Option value="汽车制造">汽车制造</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={oldCustomerData}
          className="custom-table"
          scroll={{ x: 1800 }}
          pagination={{
            total: 1234,
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

export default OldCustomerAnalysis; 