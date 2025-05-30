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
  Progress,
  Input
} from 'antd';
import {
  ArrowLeftOutlined,
  CustomerServiceOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  FunnelPlotOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  TrophyOutlined,
  DollarOutlined,
  BulbOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 待转化客户列表数据
interface PotentialCustomerRecord {
  key: string;
  salesperson: string;
  customerName: string;
  scale: string;
  industry: string;
  stage: string;
  expectedAmount: number;
  quoteDate: string;
  followUpStatus: string;
  expectedCloseDate: string;
}

const potentialCustomerData: PotentialCustomerRecord[] = [
  {
    key: '1',
    salesperson: '张三',
    customerName: '苏州精密设备公司',
    scale: '大型企业',
    industry: '制造业',
    stage: '商务谈判',
    expectedAmount: 680,
    quoteDate: '2024-02-15',
    followUpStatus: '积极跟进',
    expectedCloseDate: '2024-04-30'
  },
  {
    key: '2',
    salesperson: '李四',
    customerName: '天津智能科技',
    scale: '中型企业',
    industry: '智能制造',
    stage: '方案沟通',
    expectedAmount: 420,
    quoteDate: '2024-03-08',
    followUpStatus: '正常跟进',
    expectedCloseDate: '2024-05-15'
  },
  {
    key: '3',
    salesperson: '王五',
    customerName: '西安电子设备厂',
    scale: '中型企业',
    industry: '电子信息',
    stage: '有效询盘',
    expectedAmount: 290,
    quoteDate: '2024-03-20',
    followUpStatus: '待跟进',
    expectedCloseDate: '2024-06-10'
  },
  {
    key: '4',
    salesperson: '赵六',
    customerName: '济南新材料集团',
    scale: '大型企业',
    industry: '新材料',
    stage: '商务谈判',
    expectedAmount: 520,
    quoteDate: '2024-02-28',
    followUpStatus: '积极跟进',
    expectedCloseDate: '2024-04-15'
  },
  {
    key: '5',
    salesperson: '孙七',
    customerName: '南京汽车零配件',
    scale: '小型企业',
    industry: '汽车制造',
    stage: '方案沟通',
    expectedAmount: 180,
    quoteDate: '2024-03-12',
    followUpStatus: '正常跟进',
    expectedCloseDate: '2024-05-20'
  }
];

// 销售阶段漏斗数据
const salesFunnelData = [
  { stage: '有效询盘', count: 500, amount: 8500, color: '#f0f0f0', conversion: 100 },
  { stage: '方案沟通', count: 320, amount: 6800, color: '#d9d9d9', conversion: 64 },
  { stage: '商务谈判', count: 180, amount: 4200, color: '#bfbfbf', conversion: 36 },
  { stage: '合同签订', count: 45, amount: 1876, color: '#52c41a', conversion: 9 }
];

// 报价金额区间占比数据
const priceRangeData = [
  { range: '100万以上', count: 42, percent: 17.9, amount: 1250, color: '#1890ff' },
  { range: '50-100万', count: 68, percent: 29.1, amount: 480, color: '#52c41a' },
  { range: '20-50万', count: 85, percent: 36.3, amount: 120, color: '#722ed1' },
  { range: '20万以下', count: 39, percent: 16.7, amount: 26, color: '#faad14' }
];

// 行业分布数据
const industryData = [
  { name: '制造业', count: 89, percent: 38.0, amount: 720, color: '#1890ff' },
  { name: '智能制造', count: 56, percent: 23.9, amount: 480, color: '#52c41a' },
  { name: '电子信息', count: 42, percent: 17.9, amount: 320, color: '#722ed1' },
  { name: '新材料', count: 28, percent: 12.0, amount: 235, color: '#faad14' },
  { name: '其他', count: 19, percent: 8.2, amount: 121, color: '#13c2c2' }
];

// 丢失原因分析数据
const lossReasonData = [
  { reason: '价格过高', count: 125, percent: 35.8, color: '#ff4d4f' },
  { reason: '产品不匹配', count: 89, percent: 25.5, color: '#faad14' },
  { reason: '交期太长', count: 67, percent: 19.2, color: '#13c2c2' },
  { reason: '服务不满意', count: 42, percent: 12.0, color: '#722ed1' },
  { reason: '其他原因', count: 26, percent: 7.5, color: '#8c8c8c' }
];

// 阶段分布时长分析数据
const stageDurationData = [
  { stage: '有效询盘', avgDays: 7, maxDays: 15, color: '#1890ff' },
  { stage: '方案沟通', avgDays: 21, maxDays: 45, color: '#52c41a' },
  { stage: '商务谈判', avgDays: 35, maxDays: 60, color: '#faad14' },
  { stage: '合同签订', avgDays: 14, maxDays: 30, color: '#722ed1' }
];

const PotentialCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const columns: ColumnsType<PotentialCustomerRecord> = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string, record: PotentialCustomerRecord) => (
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
      title: '阶段',
      dataIndex: 'stage',
      width: 100,
      render: (stage: string) => {
        let color = 'default';
        if (stage === '合同签订') color = 'green';
        else if (stage === '商务谈判') color = 'orange';
        else if (stage === '方案沟通') color = 'blue';
        else if (stage === '有效询盘') color = 'purple';
        return <Tag color={color}>{stage}</Tag>;
      }
    },
    {
      title: '预计金额(万)',
      dataIndex: 'expectedAmount',
      width: 120,
      sorter: (a, b) => a.expectedAmount - b.expectedAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '报价日期',
      dataIndex: 'quoteDate',
      width: 100
    },
    {
      title: '跟进状态',
      dataIndex: 'followUpStatus',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '积极跟进') color = 'green';
        else if (status === '正常跟进') color = 'blue';
        else if (status === '待跟进') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '预计成交时间',
      dataIndex: 'expectedCloseDate',
      width: 120
    }
  ];

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
        <Breadcrumb.Item>待转化客户分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <CustomerServiceOutlined style={{ marginRight: 8, color: '#faad14' }} />
            待转化客户分析看板
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
                title="待转化客户数"
                value={234}
                suffix="位"
                valueStyle={{ fontSize: '24px', color: '#faad14' }}
                prefix={<CustomerServiceOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑22.1%</Tag>
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
                title="预计合同金额"
                value={1876}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#13c2c2' }}
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
                title="预计转化率"
                value={15.8}
                suffix="%"
                valueStyle={{ fontSize: '24px', color: '#722ed1' }}
                prefix={<TrophyOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑1.8%</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} sm={12}>
          <Card 
            title={
              <div className="flex-start">
                <FunnelPlotOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                销售阶段漏斗分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '240px', overflowY: 'auto' }} className="custom-scrollbar">
              {salesFunnelData.map((stage, index) => (
                <div key={index} className="data-item" style={{ 
                  border: `2px solid ${stage.color}20`,
                  background: `${stage.color}05`
                }}>
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span style={{ fontWeight: 'bold' }}>{stage.stage}</span>
                  </div>
                  <div className="data-item-right">
                    <div style={{ color: stage.color, fontWeight: 'bold' }}>
                      {stage.count}位
                    </div>
                    <div className="data-item-desc">
                      占比: {stage.conversion}% | ¥{stage.amount.toLocaleString()}万
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12}>
          <Card 
            title={
              <div className="flex-start">
                <PieChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                报价金额区间占比
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
              {priceRangeData.map((range, index) => (
                <div key={index} className="data-item" style={{ 
                  border: `2px solid ${range.color}20`
                }}>
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: range.color }}
                    />
                    <span className="data-item-label">{range.range}</span>
                  </div>
                  <div className="data-item-right">
                    <div className="data-item-value">{range.count}位</div>
                    <div className="data-item-desc">
                      {range.percent}% | ¥{range.amount.toLocaleString()}万
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} sm={12}>
          <Card 
            title={
              <div className="flex-start">
                <ClockCircleOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                阶段分布时长分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
              {stageDurationData.map((duration, index) => (
                <div key={index} className="data-item">
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: duration.color }}
                    />
                    <span className="data-item-label">{duration.stage}</span>
                  </div>
                  <div className="data-item-right">
                    <div className="data-item-value">{duration.avgDays}天</div>
                    <div className="data-item-desc">平均停留时长</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12}>
          <Card 
            title={
              <div className="flex-start">
                <WarningOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                丢失原因分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
              {lossReasonData.map((reason, index) => (
                <div key={index} className="data-item">
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: reason.color }}
                    />
                    <span className="data-item-label">{reason.reason}</span>
                  </div>
                  <div className="data-item-right">
                    <div className="data-item-value">{reason.count}位</div>
                    <div className="data-item-desc">占比: {reason.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 待转化客户列表明细 */}
      <Card 
        title="待转化客户列表明细" 
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
              <span className="filter-label">阶段筛选:</span>
              <Select
                value={selectedStage}
                onChange={setSelectedStage}
                style={{ width: 150 }}
              >
                <Option value="all">全部阶段</Option>
                <Option value="有效询盘">有效询盘</Option>
                <Option value="方案沟通">方案沟通</Option>
                <Option value="商务谈判">商务谈判</Option>
                <Option value="合同评审">合同评审</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <span className="filter-label">金额筛选:</span>
              <Select
                value={selectedPriceRange}
                onChange={setSelectedPriceRange}
                style={{ width: 150 }}
              >
                <Option value="all">全部金额</Option>
                <Option value="10万以下">10万以下</Option>
                <Option value="10-50万">10-50万</Option>
                <Option value="50-100万">50-100万</Option>
                <Option value="100万以上">100万以上</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={potentialCustomerData}
          className="custom-table"
          scroll={{ x: 1400 }}
          pagination={{
            total: 234,
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

export default PotentialCustomerAnalysis; 