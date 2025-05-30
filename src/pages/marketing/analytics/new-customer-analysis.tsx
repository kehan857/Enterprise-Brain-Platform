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
  UserAddOutlined,
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
import { getProductId, getTeamId, getSalespersonId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

// 新客户列表数据
interface NewCustomerRecord {
  key: string;
  salesperson: string;
  customerName: string;
  scale: string;
  industry: string;
  source: string;
  region: string;
  firstContractDate: string;
  firstOrderAmount: number;
  paymentStatus: string;
  shipmentStatus: string;
  productType: string;
  productName: string;
  department: string;
  team: string;
}

const newCustomerData: NewCustomerRecord[] = [
  {
    key: '1',
    salesperson: '张三',
    customerName: '北京科技有限公司',
    scale: '大型企业',
    industry: '制造业',
    source: '展会',
    region: '北京市朝阳区',
    firstContractDate: '2024-02-20',
    firstOrderAmount: 580,
    paymentStatus: '已回款',
    shipmentStatus: '已发货',
    productType: '箱柜',
    productName: '隔爆型三相异步电动机',
    department: '工控事业部',
    team: '隔爆组'
  },
  {
    key: '2',
    salesperson: '赵六',
    customerName: '杭州新材料有限公司',
    scale: '中型企业',
    industry: '新材料',
    source: '直销',
    region: '杭州市西湖区',
    firstContractDate: '2024-03-10',
    firstOrderAmount: 180,
    paymentStatus: '部分回款',
    shipmentStatus: '待发货',
    productType: '灯具开关',
    productName: '防爆扬声器',
    department: '物资部',
    team: '钣金组'
  },
  {
    key: '3',
    salesperson: '钱八',
    customerName: '成都智能科技',
    scale: '中型企业',
    industry: '智能制造',
    source: '网络推广',
    region: '成都市高新区',
    firstContractDate: '2024-01-25',
    firstOrderAmount: 320,
    paymentStatus: '已回款',
    shipmentStatus: '已发货',
    productType: '暖通',
    productName: '防爆空调机',
    department: '空调事业部',
    team: '空调组'
  },
  {
    key: '4',
    salesperson: '周九',
    customerName: '武汉光电设备',
    scale: '小型企业',
    industry: '电子信息',
    source: '老客户推荐',
    region: '武汉市东湖区',
    firstContractDate: '2024-02-15',
    firstOrderAmount: 150,
    paymentStatus: '待回款',
    shipmentStatus: '已发货',
    productType: '仪电',
    productName: '防爆显示控制终端',
    department: '技术管理部',
    team: '监控组'
  },
  {
    key: '5',
    salesperson: '吴十',
    customerName: '青岛海洋工程',
    scale: '大型企业',
    industry: '海洋工程',
    source: '展会',
    region: '青岛市市南区',
    firstContractDate: '2024-03-05',
    firstOrderAmount: 750,
    paymentStatus: '部分回款',
    shipmentStatus: '执行中',
    productType: '仪电',
    productName: '防爆网桥',
    department: '智能制造部',
    team: '通讯电热组'
  }
];

// 新客户来源分析数据
const sourceAnalysisData = [
  { name: '展会', count: 168, percent: 36.8, amount: 850, color: '#1890ff' },
  { name: '网络推广', count: 125, percent: 27.4, amount: 620, color: '#52c41a' },
  { name: '老客户推荐', count: 89, percent: 19.5, amount: 540, color: '#722ed1' },
  { name: '直销', count: 52, percent: 11.4, amount: 235, color: '#faad14' },
  { name: '其他', count: 22, percent: 4.9, amount: 100, color: '#13c2c2' }
];

// 新客户行业分布数据
const industryDistributionData = [
  { name: '制造业', count: 142, percent: 31.1, amount: 780, color: '#1890ff' },
  { name: '智能制造', count: 98, percent: 21.5, amount: 620, color: '#52c41a' },
  { name: '电子信息', count: 76, percent: 16.7, amount: 450, color: '#722ed1' },
  { name: '新材料', count: 68, percent: 14.9, amount: 320, color: '#faad14' },
  { name: '其他行业', count: 72, percent: 15.8, amount: 175, color: '#13c2c2' }
];

// 新客户区域分布数据
const regionDistributionData = [
  { name: '华东区', count: 165, percent: 36.2, amount: 890, color: '#1890ff' },
  { name: '华北区', count: 128, percent: 28.1, amount: 750, color: '#52c41a' },
  { name: '华南区', count: 92, percent: 20.2, amount: 520, color: '#722ed1' },
  { name: '西南区', count: 71, percent: 15.5, amount: 185, color: '#faad14' }
];

const NewCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const columns: ColumnsType<NewCustomerRecord> = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string, record: NewCustomerRecord) => (
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
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(name)}`)}>
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
      title: '来源',
      dataIndex: 'source',
      width: 100
    },
    {
      title: '省市区',
      dataIndex: 'region',
      width: 140
    },
    {
      title: '首次签约日期',
      dataIndex: 'firstContractDate',
      width: 120
    },
    {
      title: '首单金额(万)',
      dataIndex: 'firstOrderAmount',
      width: 120,
      sorter: (a, b) => a.firstOrderAmount - b.firstOrderAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '回款状态',
      dataIndex: 'paymentStatus',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '已回款') color = 'green';
        else if (status === '部分回款') color = 'orange';
        else if (status === '待回款') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '发货状态',
      dataIndex: 'shipmentStatus',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '已发货') color = 'green';
        else if (status === '执行中') color = 'blue';
        else if (status === '待发货') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
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
      render: (name: string, record: NewCustomerRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => {
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
      render: (team: string, record: NewCustomerRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => {
            const teamId = getTeamId(team);
            navigate(`/team-detail/${teamId}`);
          }}
        >
          {team}
        </Button>
      )
    }
  ];

  // 渲染分布图表卡片
  const renderDistributionCard = (
    title: string, 
    data: typeof sourceAnalysisData, 
    icon: React.ReactNode
  ) => (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <span style={{ marginLeft: 8 }}>{title}</span>
        </div>
      }
      size="small"
    >
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {data.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px',
            padding: '4px 8px',
            backgroundColor: index < 3 ? '#f6ffed' : '#fafafa',
            borderRadius: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: item.color,
                borderRadius: '50%',
                marginRight: '8px'
              }} />
              <span style={{ fontSize: '12px' }}>{item.name}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {item.count}位
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                ¥{item.amount}万 ({item.percent}%)
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
        <Breadcrumb.Item>新客户分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <UserAddOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            新客户分析看板
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
              style={{ height: '130px' }}
            >
              <Statistic
                title="新客户数量"
                value={456}
                suffix="位"
                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                prefix={<UserAddOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑15.2%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              size="small" 
              className="metric-card"
              style={{ height: '130px' }}
            >
              <Statistic
                title="新客户合同金额"
                value={8567}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<DollarOutlined />}
              />
              <div className="mt-8">
                <Tag color="green">同比↑12.8%</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              size="small" 
              className="metric-card"
              style={{ height: '130px' }}
            >
              <Statistic
                title="转化率"
                value={68.5}
                suffix="%"
                valueStyle={{ fontSize: '24px', color: '#faad14' }}
                prefix={<RiseOutlined />}
              />
              <div className="mt-8">
                <Tag color="red">同比↓2.1%</Tag>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex-start">
                <LineChartOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                新客户来源分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
              {sourceAnalysisData.map((source, index) => (
                <div key={index} className="data-item">
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="data-item-label">{source.name}</span>
                  </div>
                  <div className="data-item-right">
                    <div className="data-item-value">{source.count}位</div>
                    <div className="data-item-desc">占比: {source.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex-start">
                <BarChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                新客户行业分布
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
              {industryDistributionData.map((industry, index) => (
                <div key={index} className="data-item">
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: industry.color }}
                    />
                    <span className="data-item-label">{industry.name}</span>
                  </div>
                  <div className="data-item-right">
                    <div className="data-item-value">{industry.count}位</div>
                    <div className="data-item-desc">占比: {industry.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex-start">
                <EnvironmentOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                新客户区域分布
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }} className="custom-scrollbar">
              {regionDistributionData.map((region, index) => (
                <div key={index} className="data-item">
                  <div className="data-item-left">
                    <div 
                      className="data-item-indicator"
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="data-item-label">{region.name}</span>
                  </div>
                  <div className="data-item-right">
                    <div className="data-item-value">{region.count}位</div>
                    <div className="data-item-desc">占比: {region.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 新客户列表明细 */}
      <Card 
        title="新客户列表明细" 
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
                <Option value="新材料">新材料</Option>
              </Select>
            </div>
            
            <div className="filter-item">
              <span className="filter-label">来源筛选:</span>
              <Select
                value={selectedSource}
                onChange={setSelectedSource}
                style={{ width: 150 }}
              >
                <Option value="all">全部来源</Option>
                <Option value="展会">展会</Option>
                <Option value="网络推广">网络推广</Option>
                <Option value="老客户推荐">老客户推荐</Option>
                <Option value="直销">直销</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={newCustomerData}
          className="custom-table"
          scroll={{ x: 1800 }}
          pagination={{
            total: 456,
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

export default NewCustomerAnalysis; 