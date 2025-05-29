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
  Progress
} from 'antd';
import {
  ArrowLeftOutlined,
  AccountBookOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  DollarOutlined,
  BulbOutlined,
  RiseOutlined,
  TeamOutlined,
  WarningOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 客户回款排行数据
interface CustomerPaymentRecord {
  key: string;
  rank: number;
  customerName: string;
  paymentAmount: number;
  contractAmount: number;
  paymentRate: number;
  region: string;
  salesperson: string;
}

const customerPaymentData: CustomerPaymentRecord[] = [
  {
    key: '1',
    rank: 1,
    customerName: '北京央企集团',
    paymentAmount: 2580,
    contractAmount: 2800,
    paymentRate: 92.1,
    region: '北京市朝阳区',
    salesperson: '张三'
  },
  {
    key: '2',
    rank: 2,
    customerName: '深圳创新科技集团',
    paymentAmount: 1850,
    contractAmount: 2100,
    paymentRate: 88.1,
    region: '深圳市南山区',
    salesperson: '王五'
  },
  {
    key: '3',
    rank: 3,
    customerName: '上海智能制造龙头',
    paymentAmount: 1560,
    contractAmount: 1800,
    paymentRate: 86.7,
    region: '上海市浦东新区',
    salesperson: '李四'
  },
  {
    key: '4',
    rank: 4,
    customerName: '广州汽车制造巨头',
    paymentAmount: 1280,
    contractAmount: 1520,
    paymentRate: 84.2,
    region: '广州市天河区',
    salesperson: '孙七'
  },
  {
    key: '5',
    rank: 5,
    customerName: '天津重工设备',
    paymentAmount: 1050,
    contractAmount: 1280,
    paymentRate: 82.0,
    region: '天津市滨海新区',
    salesperson: '赵六'
  }
];

// 业务员回款排行数据
interface SalespersonPaymentRecord {
  key: string;
  rank: number;
  salesperson: string;
  paymentAmount: number;
  targetAmount: number;
  completionRate: number;
  customerCount: number;
  avgPaymentCycle: number;
}

const salespersonPaymentData: SalespersonPaymentRecord[] = [
  {
    key: '1',
    rank: 1,
    salesperson: '张三',
    paymentAmount: 3580,
    targetAmount: 3200,
    completionRate: 111.9,
    customerCount: 45,
    avgPaymentCycle: 32
  },
  {
    key: '2',
    rank: 2,
    salesperson: '王五',
    paymentAmount: 2850,
    targetAmount: 2800,
    completionRate: 101.8,
    customerCount: 38,
    avgPaymentCycle: 28
  },
  {
    key: '3',
    rank: 3,
    salesperson: '李四',
    paymentAmount: 2560,
    targetAmount: 2500,
    completionRate: 102.4,
    customerCount: 42,
    avgPaymentCycle: 35
  },
  {
    key: '4',
    rank: 4,
    salesperson: '孙七',
    paymentAmount: 2180,
    targetAmount: 2000,
    completionRate: 109.0,
    customerCount: 32,
    avgPaymentCycle: 30
  },
  {
    key: '5',
    rank: 5,
    salesperson: '赵六',
    paymentAmount: 1850,
    targetAmount: 1800,
    completionRate: 102.8,
    customerCount: 28,
    avgPaymentCycle: 40
  }
];

// 逾期回款合同数据
interface OverduePaymentRecord {
  key: string;
  contractCode: string;
  customerName: string;
  contractAmount: number;
  paidAmount: number;
  overdueAmount: number;
  overdueDays: number;
  salesperson: string;
  dueDate: string;
  riskLevel: string;
}

const overduePaymentData: OverduePaymentRecord[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    customerName: '杭州新材料有限公司',
    contractAmount: 580,
    paidAmount: 200,
    overdueAmount: 380,
    overdueDays: 45,
    salesperson: '赵六',
    dueDate: '2024-01-15',
    riskLevel: '高'
  },
  {
    key: '2',
    contractCode: 'HT2024002',
    customerName: '成都精密仪器',
    contractAmount: 420,
    paidAmount: 150,
    overdueAmount: 270,
    overdueDays: 32,
    salesperson: '钱八',
    dueDate: '2024-01-28',
    riskLevel: '中'
  },
  {
    key: '3',
    contractCode: 'HT2024003',
    customerName: '西安电子科技',
    contractAmount: 680,
    paidAmount: 450,
    overdueAmount: 230,
    overdueDays: 18,
    salesperson: '周九',
    dueDate: '2024-02-12',
    riskLevel: '低'
  }
];

// 事业部回款分析数据
const businessUnitPaymentData = [
  { unit: '智能制造事业部', amount: 4850, percent: 38.7, target: 4500, completion: 107.8, color: '#1890ff' },
  { unit: '自动化设备事业部', amount: 3240, percent: 25.8, target: 3100, completion: 104.5, color: '#52c41a' },
  { unit: '精密仪器事业部', amount: 2180, percent: 17.4, target: 2000, completion: 109.0, color: '#722ed1' },
  { unit: '系统集成事业部', amount: 1580, percent: 12.6, target: 1500, completion: 105.3, color: '#faad14' },
  { unit: '技术服务事业部', amount: 693, percent: 5.5, target: 700, completion: 99.0, color: '#13c2c2' }
];

// 回款趋势数据
const paymentTrendData = [
  { month: '1月', amount: 1850, rate: 85.2 },
  { month: '2月', amount: 2100, rate: 87.5 },
  { month: '3月', amount: 2350, rate: 88.9 },
  { month: '4月', amount: 2580, rate: 89.8 },
  { month: '5月', amount: 2120, rate: 86.3 },
  { month: '6月', amount: 2543, rate: 90.1 }
];

const PaymentAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  // 客户回款排行表格列
  const customerColumns: ColumnsType<CustomerPaymentRecord> = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 60,
      render: (rank: number) => (
        <div style={{ 
          width: '24px', 
          height: '24px', 
          borderRadius: '50%', 
          background: rank <= 3 ? '#faad14' : '#f0f0f0',
          color: rank <= 3 ? 'white' : '#666',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {rank}
        </div>
      )
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string, record: CustomerPaymentRecord) => (
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
      title: '回款金额(万)',
      dataIndex: 'paymentAmount',
      width: 120,
      sorter: (a, b) => a.paymentAmount - b.paymentAmount,
      render: (amount: number) => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>
          ¥{amount.toLocaleString()}
        </span>
      )
    },
    {
      title: '回款率',
      dataIndex: 'paymentRate',
      width: 100,
      render: (rate: number) => (
        <span style={{ 
          color: rate >= 90 ? '#52c41a' : rate >= 80 ? '#faad14' : '#ff4d4f' 
        }}>
          {rate}%
        </span>
      )
    },
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80
    },
    {
      title: '省市区',
      dataIndex: 'region',
      width: 140
    }
  ];

  // 业务员回款排行表格列
  const salespersonColumns: ColumnsType<SalespersonPaymentRecord> = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 60,
      render: (rank: number) => (
        <div style={{ 
          width: '24px', 
          height: '24px', 
          borderRadius: '50%', 
          background: rank <= 3 ? '#1890ff' : '#f0f0f0',
          color: rank <= 3 ? 'white' : '#666',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {rank}
        </div>
      )
    },
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 100,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => console.log(`查看${name}的详情`)}>
          {name}
        </Button>
      )
    },
    {
      title: '回款金额(万)',
      dataIndex: 'paymentAmount',
      width: 120,
      sorter: (a, b) => a.paymentAmount - b.paymentAmount,
      render: (amount: number) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          ¥{amount.toLocaleString()}
        </span>
      )
    },
    {
      title: '完成率',
      dataIndex: 'completionRate',
      width: 100,
      render: (rate: number) => (
        <span style={{ 
          color: rate >= 100 ? '#52c41a' : rate >= 90 ? '#faad14' : '#ff4d4f' 
        }}>
          {rate}%
        </span>
      )
    },
    {
      title: '客户数',
      dataIndex: 'customerCount',
      width: 80,
      render: (count: number) => `${count}位`
    },
    {
      title: '平均回款周期',
      dataIndex: 'avgPaymentCycle',
      width: 120,
      render: (days: number) => `${days}天`
    }
  ];

  // 逾期回款合同表格列
  const overdueColumns: ColumnsType<OverduePaymentRecord> = [
    {
      title: '合同编码',
      dataIndex: 'contractCode',
      width: 120,
      render: (code: string, record: OverduePaymentRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => navigate(`/contract-detail/${record.key}`)}
        >
          {code}
        </Button>
      )
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180
    },
    {
      title: '合同金额(万)',
      dataIndex: 'contractAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '已回款(万)',
      dataIndex: 'paidAmount',
      width: 100,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '逾期金额(万)',
      dataIndex: 'overdueAmount',
      width: 120,
      render: (amount: number) => (
        <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
          ¥{amount.toLocaleString()}
        </span>
      )
    },
    {
      title: '逾期天数',
      dataIndex: 'overdueDays',
      width: 100,
      sorter: (a, b) => a.overdueDays - b.overdueDays,
      render: (days: number) => (
        <span style={{ color: days > 30 ? '#ff4d4f' : '#faad14' }}>
          {days}天
        </span>
      )
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      width: 100,
      render: (level: string) => {
        const color = level === '高' ? 'red' : level === '中' ? 'orange' : 'blue';
        return <Tag color={color}>{level}风险</Tag>;
      }
    },
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80
    }
  ];

  // 渲染回款趋势图
  const renderPaymentTrendChart = () => (
    <div style={{ height: '200px', padding: '20px', background: '#fafafa', borderRadius: '6px' }}>
      <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#262626' }}>
        回款金额趋势 (近6个月)
      </div>
      <div style={{ display: 'flex', alignItems: 'end', height: '120px', gap: '8px' }}>
        {paymentTrendData.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{ 
                width: '100%', 
                height: `${(item.amount / 3000) * 100}px`,
                background: index === paymentTrendData.length - 1 ? '#52c41a' : '#13c2c2',
                borderRadius: '2px 2px 0 0',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                paddingBottom: '2px'
              }}
            >
              {(item.amount / 1000).toFixed(1)}k
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{item.month}</div>
            <div style={{ fontSize: '10px', color: '#52c41a' }}>{item.rate}%</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#52c41a', textAlign: 'center' }}>
        <RiseOutlined /> 回款率: 90.1% (环比↑3.8%)
      </div>
    </div>
  );

  // 渲染事业部回款分析
  const renderBusinessUnitAnalysis = () => (
    <Card 
      title={
        <div className="flex-start">
          <BarChartOutlined style={{ color: '#722ed1', marginRight: 8 }} />
          事业部回款分析
        </div>
      }
      className="analysis-card"
      size="small"
    >
      <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
        {businessUnitPaymentData.map((unit, index) => (
          <div key={index} className="data-item">
            <div className="data-item-left">
              <div 
                className="data-item-indicator"
                style={{ backgroundColor: unit.color }}
              />
              <span className="data-item-label">{unit.unit}</span>
            </div>
            <div className="data-item-right">
              <div className="data-item-value">¥{unit.amount.toLocaleString()}万</div>
              <div className="data-item-desc">
                占比: {unit.percent}% | 完成率: {unit.completion}%
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
        <Breadcrumb.Item>回款分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <AccountBookOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
            回款分析看板
          </Title>
        </div>
      </div>

      {/* 核心指标回顾区 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="总回款金额"
                value={12543}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#13c2c2' }}
                prefix={<AccountBookOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">目标: 12000万元</Text>
                <Tag color="green" style={{ marginLeft: 8 }}>104.5%</Tag>
                <Tag color="green">同比↑6.3%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="发货回款率"
                value={90.1}
                suffix="%"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<TrophyOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">目标: 88%</Text>
                <Tag color="green" style={{ marginLeft: 8 }}>102.4%</Tag>
                <Tag color="green">环比↑3.8%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="逾期回款金额"
                value={880}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#faad14' }}
                prefix={<WarningOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">占总回款: 7.0%</Text>
                <Tag color="orange" style={{ marginLeft: 8 }}>需关注</Tag>
                <Tag color="red">环比↑1.2%</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 回款趋势和事业部分析 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex-start">
                <LineChartOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
                回款金额趋势分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            {renderPaymentTrendChart()}
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          {renderBusinessUnitAnalysis()}
        </Col>
      </Row>

      {/* 客户和业务员回款排行 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex-start">
                <TrophyOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                客户回款排行 TOP5
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <Table
              columns={customerColumns}
              dataSource={customerPaymentData}
              className="custom-table"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex-start">
                <TeamOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                业务员回款排行 TOP5
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <Table
              columns={salespersonColumns}
              dataSource={salespersonPaymentData}
              className="custom-table"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* 回款洞察 */}
      <Card 
        title={
          <div className="flex-start">
            <BulbOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
            回款分析洞察
          </div>
        }
        className="analysis-card card-mb-24"
        size="small"
      >
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <div className="data-item" style={{ background: '#f6ffed', border: '1px solid #b7eb8f' }}>
              <div style={{ width: '100%' }}>
                <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '4px' }}>
                  ✓ 回款表现持续优化
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  发货回款率达90.1%，环比提升3.8%，智能制造事业部贡献最为突出。
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="data-item" style={{ background: '#fff7e6', border: '1px solid #ffd591' }}>
              <div style={{ width: '100%' }}>
                <div style={{ color: '#fa8c16', fontWeight: 'bold', marginBottom: '4px' }}>
                  ⚠ 关注逾期回款风险
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  逾期回款金额880万元，占比7.0%，需要加强客户信用管理和催收力度。
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="data-item" style={{ background: '#f0f9ff', border: '1px solid #91d5ff' }}>
              <div style={{ width: '100%' }}>
                <div style={{ color: '#1890ff', fontWeight: 'bold', marginBottom: '4px' }}>
                  🎯 优化回款周期
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  业务员平均回款周期33天，建议完善合同付款条件，提升资金周转效率。
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 逾期回款合同列表 */}
      <Card 
        title={
          <div className="flex-start">
            <ClockCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
            逾期回款合同列表
          </div>
        }
        className="analysis-card"
        extra={
          <Button type="primary" danger size="small">
            启动催收行动
          </Button>
        }
      >
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <span className="filter-label">事业部筛选:</span>
              <Select
                value={selectedUnit}
                onChange={setSelectedUnit}
                style={{ width: 150 }}
              >
                <Option value="all">全部事业部</Option>
                <Option value="智能制造">智能制造事业部</Option>
                <Option value="自动化设备">自动化设备事业部</Option>
                <Option value="精密仪器">精密仪器事业部</Option>
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
                <Option value="高">高风险</Option>
                <Option value="中">中风险</Option>
                <Option value="低">低风险</Option>
              </Select>
            </div>
            
            <Button type="primary" className="btn-primary">导出Excel</Button>
          </div>
        </div>

        <Table
          columns={overdueColumns}
          dataSource={overduePaymentData}
          className="custom-table"
          scroll={{ x: 1200 }}
          pagination={{
            total: 45,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条逾期记录`
          }}
        />
      </Card>
    </div>
  );
};

export default PaymentAnalysis; 