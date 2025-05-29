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
  TeamOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 客户列表数据
interface CustomerRecord {
  key: string;
  salesperson: string;
  customerName: string;
  scale: string;
  industry: string;
  type: string;
  source: string;
  orderAmount: number;
  shipmentAmount: number;
  paymentAmount: number;
  region: string;
  createTime: string;
  firstContract: string;
  lastContract: string;
}

const customerData: CustomerRecord[] = [
  {
    key: '1',
    salesperson: '张三',
    customerName: '北京科技有限公司',
    scale: '大型企业',
    industry: '制造业',
    type: '新客户',
    source: '展会',
    orderAmount: 580,
    shipmentAmount: 520,
    paymentAmount: 450,
    region: '北京市朝阳区',
    createTime: '2024-01-15',
    firstContract: '2024-02-20',
    lastContract: '2024-02-20'
  },
  {
    key: '2',
    salesperson: '李四',
    customerName: '上海智能制造公司',
    scale: '中型企业',
    industry: '智能制造',
    type: '老客户',
    source: '网络推广',
    orderAmount: 320,
    shipmentAmount: 320,
    paymentAmount: 280,
    region: '上海市浦东新区',
    createTime: '2022-03-10',
    firstContract: '2022-05-15',
    lastContract: '2024-01-10'
  },
  {
    key: '3',
    salesperson: '王五',
    customerName: '深圳创新科技集团',
    scale: '大型企业',
    industry: '电子信息',
    type: '大客户',
    source: '老客户推荐',
    orderAmount: 1250,
    shipmentAmount: 1100,
    paymentAmount: 980,
    region: '深圳市南山区',
    createTime: '2021-06-20',
    firstContract: '2021-08-15',
    lastContract: '2024-03-01'
  },
  {
    key: '4',
    salesperson: '赵六',
    customerName: '杭州新材料有限公司',
    scale: '中型企业',
    industry: '新材料',
    type: '新客户',
    source: '直销',
    orderAmount: 180,
    shipmentAmount: 120,
    paymentAmount: 90,
    region: '杭州市西湖区',
    createTime: '2024-02-05',
    firstContract: '2024-03-10',
    lastContract: '2024-03-10'
  },
  {
    key: '5',
    salesperson: '孙七',
    customerName: '广州汽车零部件公司',
    scale: '中型企业',
    industry: '汽车制造',
    type: '老客户',
    source: '展会',
    orderAmount: 450,
    shipmentAmount: 380,
    paymentAmount: 320,
    region: '广州市天河区',
    createTime: '2023-01-20',
    firstContract: '2023-03-15',
    lastContract: '2024-02-25'
  }
];

// 行业分布数据
const industryData = [
  { name: '制造业', value: 4680, percent: 35.2, color: '#1890ff' },
  { name: '智能制造', value: 3240, percent: 24.3, color: '#52c41a' },
  { name: '电子信息', value: 2850, percent: 21.4, color: '#722ed1' },
  { name: '新材料', value: 1520, percent: 11.4, color: '#faad14' },
  { name: '汽车制造', value: 1037, percent: 7.7, color: '#13c2c2' }
];

// 来源分布数据
const sourceData = [
  { name: '展会', value: 5627, percent: 36.0, color: '#1890ff' },
  { name: '网络推广', value: 3540, percent: 22.6, color: '#52c41a' },
  { name: '老客户推荐', value: 2890, percent: 18.5, color: '#722ed1' },
  { name: '直销', value: 2345, percent: 15.0, color: '#faad14' },
  { name: '其他', value: 1225, percent: 7.9, color: '#13c2c2' }
];

// 区域分布数据
const regionData = [
  { name: '华东区', value: 5240, percent: 33.5, color: '#1890ff' },
  { name: '华北区', value: 3680, percent: 23.6, color: '#52c41a' },
  { name: '华南区', value: 3125, percent: 20.0, color: '#722ed1' },
  { name: '西南区', value: 2180, percent: 13.9, color: '#faad14' },
  { name: '其他区域', value: 1402, percent: 9.0, color: '#13c2c2' }
];

const CustomerOverview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const columns: ColumnsType<CustomerRecord> = [
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
      render: (name: string, record: CustomerRecord) => (
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
      title: '类型',
      dataIndex: 'type',
      width: 80,
      render: (type: string) => {
        const color = type === '新客户' ? 'blue' : type === '老客户' ? 'green' : 'purple';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: '来源',
      dataIndex: 'source',
      width: 100
    },
    {
      title: '订货金额(万)',
      dataIndex: 'orderAmount',
      width: 120,
      sorter: (a, b) => a.orderAmount - b.orderAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '发货金额(万)',
      dataIndex: 'shipmentAmount',
      width: 120,
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
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100
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
    }
  ];

  // 渲染分布分析卡片
  const renderDistributionCard = (
    title: string, 
    data: typeof industryData, 
    icon: React.ReactNode
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
              <span className="data-item-label">{item.name}</span>
            </div>
            <div className="data-item-right">
              <div className="data-item-value">¥{item.value.toLocaleString()}万</div>
              <div className="data-item-desc">占比: {item.percent}%</div>
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
        <Breadcrumb.Item>客户总体分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <TeamOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            客户总体分析看板
          </Title>
        </div>
      </div>

      {/* 核心指标回顾区 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={24} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="总客户数"
              value={15627}
              suffix="位"
              valueStyle={{ fontSize: '32px', color: '#52c41a' }}
            />
            <div className="mt-8">
              <Text type="secondary">目标: 15,000位</Text>
              <Tag color="green" style={{ marginLeft: 8 }}>104.18%</Tag>
              <Tag color="green">同比↑5.2%</Tag>
            </div>
          </Col>
          <Col xs={24} sm={12} md={16}>
            <div className="chart-placeholder flex-center">
              <LineChartOutlined className="chart-placeholder-icon" />
              <Text type="secondary">客户数量/类型切换趋势图 (图表组件待集成)</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} sm={12} lg={8}>
          {renderDistributionCard(
            '行业分布分析',
            industryData,
            <BarChartOutlined style={{ color: '#1890ff', marginRight: 8 }} />
          )}
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          {renderDistributionCard(
            '来源分布分析',
            sourceData,
            <LineChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
          )}
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          {renderDistributionCard(
            '区域分布分析',
            regionData,
            <EnvironmentOutlined style={{ color: '#722ed1', marginRight: 8 }} />
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} sm={12}>
          <Card 
            title={
              <div className="flex-start">
                <PieChartOutlined style={{ color: '#faad14', marginRight: 8 }} />
                客户类型占比
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="新客户"
                  value={456}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#1890ff' }}
                />
                <Text type="secondary">29.2% | 转化率12.5%</Text>
              </Col>
              <Col span={12}>
                <Statistic
                  title="老客户"
                  value={1234}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                />
                <Text type="secondary">70.8% | 复购率68.2%</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col xs={24} sm={12}>
          <Card 
            title={
              <div className="flex-start">
                <TrophyOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
                客户规模分析
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="大型企业"
                  value={89}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#f50' }}
                />
                <Text type="secondary">5.7% | 高价值</Text>
              </Col>
              <Col span={12}>
                <Statistic
                  title="中小企业"
                  value={1538}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#722ed1' }}
                />
                <Text type="secondary">94.3% | 增长潜力</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 客户活跃度分析 */}
      <Card 
        title={
          <div className="flex-start">
            <LineChartOutlined style={{ color: '#fa8c16', marginRight: 8 }} />
            客户活跃度分析
          </div>
        }
        className="analysis-card card-mb-24"
        size="small"
      >
        <Row gutter={16}>
          <Col xs={12} sm={6}>
            <Statistic
              title="活跃客户"
              value={1245}
              suffix="位"
              valueStyle={{ fontSize: '18px', color: '#52c41a' }}
            />
            <Text type="secondary">近3个月有交易</Text>
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="沉睡客户"
              value={382}
              suffix="位"
              valueStyle={{ fontSize: '18px', color: '#faad14' }}
            />
            <Text type="secondary">3-12个月无交易</Text>
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="流失客户"
              value={156}
              suffix="位"
              valueStyle={{ fontSize: '18px', color: '#ff4d4f' }}
            />
            <Text type="secondary">超过12个月无交易</Text>
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="活跃率"
              value={78.5}
              suffix="%"
              valueStyle={{ fontSize: '18px', color: '#1890ff' }}
            />
            <Text type="secondary">同比↑3.2%</Text>
          </Col>
        </Row>
      </Card>

      {/* 客户列表明细 */}
      <Card 
        title="客户列表明细" 
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
            
            <div className="filter-item">
              <span className="filter-label">区域筛选:</span>
              <Select
                value={selectedRegion}
                onChange={setSelectedRegion}
                style={{ width: 150 }}
              >
                <Option value="all">全部区域</Option>
                <Option value="华东区">华东区</Option>
                <Option value="华北区">华北区</Option>
                <Option value="华南区">华南区</Option>
                <Option value="西南区">西南区</Option>
              </Select>
            </div>
            
            <Button type="primary" className="btn-primary">导出Excel</Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={customerData}
          className="custom-table"
          scroll={{ x: 1400 }}
          pagination={{
            total: 15627,
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

export default CustomerOverview; 