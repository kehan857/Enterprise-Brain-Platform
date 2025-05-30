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
  ShoppingCartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  DollarOutlined,
  BulbOutlined,
  RiseOutlined,
  TeamOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getProductId, getTeamId, getSalespersonId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

// 客户欠款排行数据
interface CustomerDebtRecord {
  key: string;
  rank: number;
  customerName: string;
  receivableAmount: number;
  contractAmount: number;
  debtRatio: number;
  overdueAmount: number;
  region: string;
  salesperson: string;
  riskLevel: string;
}

const customerDebtData: CustomerDebtRecord[] = [
  {
    key: '1',
    rank: 1,
    customerName: '杭州新材料有限公司',
    receivableAmount: 680,
    contractAmount: 850,
    debtRatio: 80.0,
    overdueAmount: 380,
    region: '杭州市西湖区',
    salesperson: '赵六',
    riskLevel: '高'
  },
  {
    key: '2',
    rank: 2,
    customerName: '西安电子科技',
    receivableAmount: 520,
    contractAmount: 750,
    debtRatio: 69.3,
    overdueAmount: 230,
    region: '西安市高新区',
    salesperson: '周九',
    riskLevel: '中'
  },
  {
    key: '3',
    rank: 3,
    customerName: '成都精密仪器',
    receivableAmount: 450,
    contractAmount: 620,
    debtRatio: 72.6,
    overdueAmount: 270,
    region: '成都市高新区',
    salesperson: '钱八',
    riskLevel: '中'
  },
  {
    key: '4',
    rank: 4,
    customerName: '武汉光电技术',
    receivableAmount: 380,
    contractAmount: 580,
    debtRatio: 65.5,
    overdueAmount: 120,
    region: '武汉市光谷区',
    salesperson: '李四',
    riskLevel: '低'
  },
  {
    key: '5',
    rank: 5,
    customerName: '长沙智能装备',
    receivableAmount: 320,
    contractAmount: 480,
    debtRatio: 66.7,
    overdueAmount: 95,
    region: '长沙市开福区',
    salesperson: '孙七',
    riskLevel: '低'
  }
];

// 业务员欠款分布数据
interface SalespersonDebtRecord {
  key: string;
  rank: number;
  salesperson: string;
  receivableAmount: number;
  customerCount: number;
  avgDebtAmount: number;
  overdueRatio: number;
  businessUnit: string;
}

const salespersonDebtData: SalespersonDebtRecord[] = [
  {
    key: '1',
    rank: 1,
    salesperson: '赵六',
    receivableAmount: 1280,
    customerCount: 12,
    avgDebtAmount: 106.7,
    overdueRatio: 35.2,
    businessUnit: '精密仪器事业部'
  },
  {
    key: '2',
    rank: 2,
    salesperson: '钱八',
    receivableAmount: 890,
    customerCount: 8,
    avgDebtAmount: 111.3,
    overdueRatio: 28.5,
    businessUnit: '智能制造事业部'
  },
  {
    key: '3',
    rank: 3,
    salesperson: '周九',
    receivableAmount: 720,
    customerCount: 6,
    avgDebtAmount: 120.0,
    overdueRatio: 32.1,
    businessUnit: '自动化设备事业部'
  },
  {
    key: '4',
    rank: 4,
    salesperson: '李四',
    receivableAmount: 580,
    customerCount: 10,
    avgDebtAmount: 58.0,
    overdueRatio: 18.6,
    businessUnit: '系统集成事业部'
  },
  {
    key: '5',
    rank: 5,
    salesperson: '孙七',
    receivableAmount: 460,
    customerCount: 7,
    avgDebtAmount: 65.7,
    overdueRatio: 22.4,
    businessUnit: '技术服务事业部'
  }
];

// 逾期应收账款数据
interface OverdueReceivableRecord {
  key: string;
  contractCode: string;
  customerName: string;
  contractAmount: number;
  receivableAmount: number;
  overdueAmount: number;
  overdueDays: number;
  dueDate: string;
  salesperson: string;
  riskLevel: string;
  action: string;
  productType: string;
  productName: string;
  department: string;
  team: string;
}

const overdueReceivableData: OverdueReceivableRecord[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    customerName: '杭州新材料有限公司',
    contractAmount: 850,
    receivableAmount: 680,
    overdueAmount: 380,
    overdueDays: 45,
    dueDate: '2024-01-15',
    salesperson: '赵六',
    riskLevel: '高',
    action: '法务介入',
    productType: '暖通',
    productName: '防爆空调机',
    department: '空调事业部',
    team: '空调组'
  },
  {
    key: '2',
    contractCode: 'HT2024005',
    customerName: '成都精密仪器',
    contractAmount: 620,
    receivableAmount: 450,
    overdueAmount: 270,
    overdueDays: 32,
    dueDate: '2024-01-28',
    salesperson: '钱八',
    riskLevel: '中',
    action: '催收函',
    productType: '仪电',
    productName: '防爆摄像仪',
    department: '技术管理部',
    team: '技术组'
  },
  {
    key: '3',
    contractCode: 'HT2024008',
    customerName: '西安电子科技',
    contractAmount: 750,
    receivableAmount: 520,
    overdueAmount: 230,
    overdueDays: 18,
    dueDate: '2024-02-12',
    salesperson: '周九',
    riskLevel: '低',
    action: '电话催收',
    productType: '灯具开关',
    productName: '防爆话站',
    department: '智能制造部',
    team: '通讯电热组'
  }
];

// 应收账款账龄分析数据
const ageAnalysisData = [
  { age: '0-30天', amount: 1850, percent: 59.0, count: 285, risk: '正常', color: '#52c41a' },
  { age: '31-60天', amount: 680, percent: 21.7, count: 98, risk: '关注', color: '#1890ff' },
  { age: '61-90天', amount: 380, percent: 12.1, count: 42, risk: '预警', color: '#faad14' },
  { age: '91-180天', amount: 155, percent: 4.9, count: 18, risk: '风险', color: '#ff7875' },
  { age: '180天以上', amount: 70, percent: 2.3, count: 8, risk: '坏账', color: '#ff4d4f' }
];

// 应收账款趋势数据
const receivableTrendData = [
  { month: '1月', amount: 3850, turnover: 2.1 },
  { month: '2月', amount: 3620, turnover: 2.3 },
  { month: '3月', amount: 3480, turnover: 2.5 },
  { month: '4月', amount: 3320, turnover: 2.4 },
  { month: '5月', amount: 3180, turnover: 2.6 },
  { month: '6月', amount: 3135, turnover: 2.7 }
];

const ReceivablesAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');

  // 客户欠款排行表格列
  const customerColumns: ColumnsType<CustomerDebtRecord> = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 60,
      render: (rank: number) => (
        <div style={{ 
          width: '24px', 
          height: '24px', 
          borderRadius: '50%', 
          background: rank <= 3 ? '#ff4d4f' : '#f0f0f0',
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
      render: (name: string, record: CustomerDebtRecord) => (
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
      title: '应收金额(万)',
      dataIndex: 'receivableAmount',
      width: 120,
      sorter: (a, b) => a.receivableAmount - b.receivableAmount,
      render: (amount: number) => (
        <span style={{ fontWeight: 'bold', color: '#ff4d4f' }}>
          ¥{amount.toLocaleString()}
        </span>
      )
    },
    {
      title: '欠款比例',
      dataIndex: 'debtRatio',
      width: 100,
      render: (ratio: number) => (
        <span style={{ 
          color: ratio >= 70 ? '#ff4d4f' : ratio >= 50 ? '#faad14' : '#52c41a' 
        }}>
          {ratio}%
        </span>
      )
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
      width: 80,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(name)}`)}>
          {name}
        </Button>
      )
    }
  ];

  // 业务员欠款分布表格列
  const salespersonColumns: ColumnsType<SalespersonDebtRecord> = [
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
      title: '业务员',
      dataIndex: 'salesperson',
      width: 100,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(name)}`)}>
          {name}
        </Button>
      )
    },
    {
      title: '应收金额(万)',
      dataIndex: 'receivableAmount',
      width: 120,
      sorter: (a, b) => a.receivableAmount - b.receivableAmount,
      render: (amount: number) => (
        <span style={{ fontWeight: 'bold', color: '#faad14' }}>
          ¥{amount.toLocaleString()}
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
      title: '平均欠款(万)',
      dataIndex: 'avgDebtAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toFixed(1)}`
    },
    {
      title: '逾期比例',
      dataIndex: 'overdueRatio',
      width: 100,
      render: (ratio: number) => (
        <span style={{ 
          color: ratio >= 30 ? '#ff4d4f' : ratio >= 20 ? '#faad14' : '#52c41a' 
        }}>
          {ratio}%
        </span>
      )
    },
    {
      title: '事业部',
      dataIndex: 'businessUnit',
      width: 140
    }
  ];

  // 逾期应收账款表格列
  const overdueColumns: ColumnsType<OverdueReceivableRecord> = [
    {
      title: '合同编码',
      dataIndex: 'contractCode',
      width: 120,
      render: (code: string, record: OverdueReceivableRecord) => (
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
      width: 180,
      render: (name: string, record: OverdueReceivableRecord) => (
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
      title: '合同金额(万)',
      dataIndex: 'contractAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '应收金额(万)',
      dataIndex: 'receivableAmount',
      width: 120,
      render: (amount: number) => (
        <span style={{ color: '#faad14', fontWeight: 'bold' }}>
          ¥{amount.toLocaleString()}
        </span>
      )
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
      title: '催收措施',
      dataIndex: 'action',
      width: 100,
      render: (action: string) => {
        const color = action === '法务介入' ? 'red' : action === '催收函' ? 'orange' : 'blue';
        return <Tag color={color}>{action}</Tag>;
      }
    },
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(name)}`)}>
          {name}
        </Button>
      )
    },
    {
      title: '产品类型',
      dataIndex: 'productType',
      width: 100,
      render: (type: string) => {
        const colorMap = {
          '箱柜': 'blue',
          '灯具开关': 'green', 
          '暖通': 'orange',
          '仪电': 'purple'
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      width: 180,
      render: (name: string, record: OverdueReceivableRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => {
            // 根据产品名称映射到产品ID
            const productId = getProductId(name);
            navigate(`/product-detail/${productId}`);
          }}
        >
          {name}
        </Button>
      )
    },
    {
      title: '部门名称',
      dataIndex: 'department',
      width: 120
    },
    {
      title: '班组名称',
      dataIndex: 'team',
      width: 120,
      render: (team: string, record: OverdueReceivableRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => {
            // 根据班组名称映射到班组ID
            const teamId = getTeamId(team);
            navigate(`/team-detail/${teamId}`);
          }}
        >
          {team}
        </Button>
      )
    }
  ];

  // 渲染应收账款趋势图
  const renderReceivableTrendChart = () => (
    <div style={{ height: '200px', padding: '20px', background: '#fafafa', borderRadius: '6px' }}>
      <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#262626' }}>
        应收账款趋势 (近6个月)
      </div>
      <div style={{ display: 'flex', alignItems: 'end', height: '120px', gap: '8px' }}>
        {receivableTrendData.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{ 
                width: '100%', 
                height: `${(item.amount / 4000) * 100}px`,
                background: index === receivableTrendData.length - 1 ? '#52c41a' : '#faad14',
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
            <div style={{ fontSize: '10px', color: '#52c41a' }}>{item.turnover}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#52c41a', textAlign: 'center' }}>
        <RiseOutlined /> 周转率: 2.7次/年 (环比↑7.4%)
      </div>
    </div>
  );

  // 渲染账龄分析
  const renderAgeAnalysis = () => (
    <Card 
      title={
        <div className="flex-start">
          <PieChartOutlined style={{ color: '#722ed1', marginRight: 8 }} />
          应收账款账龄分析
        </div>
      }
      className="analysis-card"
      size="small"
    >
      <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
        {ageAnalysisData.map((item, index) => (
          <div key={index} className="data-item">
            <div className="data-item-left">
              <div 
                className="data-item-indicator"
                style={{ backgroundColor: item.color }}
              />
              <span className="data-item-label">{item.age}</span>
            </div>
            <div className="data-item-right">
              <div className="data-item-value">¥{item.amount.toLocaleString()}万</div>
              <div className="data-item-desc">
                占比: {item.percent}% | {item.count}笔 | {item.risk}
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
        <Breadcrumb.Item>应收账款分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <ShoppingCartOutlined style={{ marginRight: 8, color: '#faad14' }} />
            应收账款分析看板
          </Title>
        </div>
      </div>

      {/* 核心指标回顾区 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="总应收账款"
                value={3135}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#faad14' }}
                prefix={<ShoppingCartOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">占营收: 20.0%</Text>
                <Tag color="orange" style={{ marginLeft: 8 }}>需关注</Tag>
                <Tag color="green">同比↓2.1%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="应收账款周转率"
                value={2.7}
                suffix="次/年"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<TrophyOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">目标: 2.5次/年</Text>
                <Tag color="green" style={{ marginLeft: 8 }}>108.0%</Tag>
                <Tag color="green">环比↑7.4%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" className="metric-card">
              <Statistic
                title="逾期应收账款"
                value={880}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#ff4d4f' }}
                prefix={<AlertOutlined />}
              />
              <div className="mt-8">
                <Text type="secondary">逾期率: 28.1%</Text>
                <Tag color="red" style={{ marginLeft: 8 }}>高风险</Tag>
                <Tag color="red">环比↑3.5%</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 应收账款趋势和账龄分析 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex-start">
                <LineChartOutlined style={{ color: '#faad14', marginRight: 8 }} />
                应收账款趋势分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            {renderReceivableTrendChart()}
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          {renderAgeAnalysis()}
        </Col>
      </Row>

      {/* 客户和业务员欠款排行 */}
      <Row gutter={[16, 16]} className="card-mb-24" style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col xs={24} lg={12} style={{ height: '100%' }}>
          <Card 
            title={
              <div className="flex-start">
                <WarningOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                客户欠款排行 TOP5
              </div>
            }
            className="analysis-card"
            size="small"
            style={{ height: '100%', minHeight: '400px' }}
            bodyStyle={{ padding: '16px 24px' }}
          >
            <Table
              columns={customerColumns}
              dataSource={customerDebtData}
              className="custom-table"
              pagination={false}
              size="small"
              style={{ minHeight: '300px' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12} style={{ height: '100%' }}>
          <Card 
            title={
              <div className="flex-start">
                <TeamOutlined style={{ color: '#faad14', marginRight: 8 }} />
                业务员欠款分布 TOP5
              </div>
            }
            className="analysis-card"
            size="small"
            style={{ height: '100%', minHeight: '400px' }}
            bodyStyle={{ padding: '16px 24px' }}
          >
            <Table
              columns={salespersonColumns}
              dataSource={salespersonDebtData}
              className="custom-table"
              pagination={false}
              size="small"
              style={{ minHeight: '300px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 逾期应收账款列表 */}
      <Card 
        title={
          <div className="flex-start">
            <ClockCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
            逾期应收账款列表
          </div>
        }
        className="analysis-card"
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
                <Option value="精密仪器">精密仪器事业部</Option>
                <Option value="智能制造">智能制造事业部</Option>
                <Option value="自动化设备">自动化设备事业部</Option>
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
            
            <div className="filter-item">
              <span className="filter-label">账龄筛选:</span>
              <Select
                value={selectedAge}
                onChange={setSelectedAge}
                style={{ width: 150 }}
              >
                <Option value="all">全部账龄</Option>
                <Option value="0-30">0-30天</Option>
                <Option value="31-60">31-60天</Option>
                <Option value="61-90">61-90天</Option>
                <Option value="90+">90天以上</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={overdueColumns}
          dataSource={overdueReceivableData}
          className="custom-table"
          scroll={{ x: 1900 }}
          pagination={{
            total: 72,
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

export default ReceivablesAnalysis; 