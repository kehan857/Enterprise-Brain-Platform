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

  // 渲染分布图表卡片
  const renderDistributionCard = (
    title: string, 
    data: typeof industryData, 
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
                {item.value.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {item.percent}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div style={{ padding: '0' }}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Button 
            icon={<ArrowLeftOutlined />} 
            type="link" 
            onClick={() => navigate('/marketing-analytics')}
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>营销数据板块</Breadcrumb.Item>
        <Breadcrumb.Item>客户总体分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <TeamOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        客户总体分析看板
      </Title>

      {/* 核心指标回顾区 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24} align="middle">
          <Col span={8}>
            <Statistic
              title="总客户数"
              value={15627}
              suffix="位"
              valueStyle={{ fontSize: '32px', color: '#1890ff' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">目标: 15,000位</Text>
              <Tag color="green" style={{ marginLeft: 8 }}>104.18%</Tag>
              <Tag color="green">同比↑5.2%</Tag>
            </div>
          </Col>
          <Col span={16}>
            <div style={{ 
              height: '80px', 
              backgroundColor: '#f6ffed',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed #52c41a'
            }}>
              <LineChartOutlined style={{ fontSize: '24px', color: '#52c41a', marginRight: '12px' }} />
              <Text type="secondary">12个月客户数量趋势图 (图表组件待集成)</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 - 6个模块 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          {renderDistributionCard('行业分布图', industryData, <BarChartOutlined style={{ color: '#1890ff' }} />)}
        </Col>
        <Col span={8}>
          {renderDistributionCard('来源分布图', sourceData, <PieChartOutlined style={{ color: '#52c41a' }} />)}
        </Col>
        <Col span={8}>
          {renderDistributionCard('区域分布图', regionData, <EnvironmentOutlined style={{ color: '#722ed1' }} />)}
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PieChartOutlined style={{ color: '#faad14', marginRight: 8 }} />
                客户类型占比
              </div>
            }
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
                <Text type="secondary">占比: 29.2%</Text>
              </Col>
              <Col span={12}>
                <Statistic
                  title="老客户"
                  value={1234}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                />
                <Text type="secondary">占比: 79.0%</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrophyOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
                客户规模分析
              </div>
            }
            size="small"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>大型企业</span>
                <span><strong>89位</strong> (5.7%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>中型企业</span>
                <span><strong>1,245位</strong> (79.7%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>小型企业</span>
                <span><strong>2,293位</strong> (14.6%)</span>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                客户活跃度
              </div>
            }
            size="small"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="活跃客户"
                  value={12580}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                />
                <Text type="secondary">近3月有交易</Text>
              </Col>
              <Col span={12}>
                <Statistic
                  title="沉睡客户"
                  value={3047}
                  suffix="位"
                  valueStyle={{ fontSize: '18px', color: '#faad14' }}
                />
                <Text type="secondary">超3月无交易</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 筛选控件 */}
      <Card title="客户列表明细" style={{ marginBottom: 24 }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Select
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              style={{ width: '100%' }}
              placeholder="选择行业"
            >
              <Option value="all">全部行业</Option>
              <Option value="制造业">制造业</Option>
              <Option value="智能制造">智能制造</Option>
              <Option value="电子信息">电子信息</Option>
              <Option value="新材料">新材料</Option>
              <Option value="汽车制造">汽车制造</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              value={selectedSource}
              onChange={setSelectedSource}
              style={{ width: '100%' }}
              placeholder="选择来源"
            >
              <Option value="all">全部来源</Option>
              <Option value="展会">展会</Option>
              <Option value="网络推广">网络推广</Option>
              <Option value="老客户推荐">老客户推荐</Option>
              <Option value="直销">直销</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              value={selectedRegion}
              onChange={setSelectedRegion}
              style={{ width: '100%' }}
              placeholder="选择区域"
            >
              <Option value="all">全部区域</Option>
              <Option value="华东区">华东区</Option>
              <Option value="华北区">华北区</Option>
              <Option value="华南区">华南区</Option>
              <Option value="西南区">西南区</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Button type="primary">导出Excel</Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={customerData}
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