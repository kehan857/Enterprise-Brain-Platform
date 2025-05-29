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
  DollarOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  UserOutlined,
  FundOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 合同列表数据
interface ContractRecord {
  key: string;
  contractCode: string;
  customerName: string;
  orderAmount: number;
  signDate: string;
  salesperson: string;
  status: string;
  businessUnit: string;
  deliveryDate: string;
}

const contractData: ContractRecord[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    customerName: '深圳创新科技集团',
    orderAmount: 1250,
    signDate: '2024-03-01',
    salesperson: '王五',
    status: '执行中',
    businessUnit: '华南事业部',
    deliveryDate: '2024-06-30'
  },
  {
    key: '2',
    contractCode: 'HT2024002',
    customerName: '北京科技有限公司',
    orderAmount: 580,
    signDate: '2024-02-20',
    salesperson: '张三',
    status: '已完成',
    businessUnit: '华北事业部',
    deliveryDate: '2024-05-20'
  },
  {
    key: '3',
    contractCode: 'HT2024003',
    customerName: '广州汽车零部件公司',
    orderAmount: 450,
    signDate: '2024-02-25',
    salesperson: '孙七',
    status: '执行中',
    businessUnit: '华南事业部',
    deliveryDate: '2024-07-25'
  },
  {
    key: '4',
    contractCode: 'HT2024004',
    customerName: '上海智能制造公司',
    orderAmount: 320,
    signDate: '2024-01-10',
    salesperson: '李四',
    status: '已发货',
    businessUnit: '华东事业部',
    deliveryDate: '2024-04-10'
  },
  {
    key: '5',
    contractCode: 'HT2024005',
    customerName: '杭州新材料有限公司',
    orderAmount: 180,
    signDate: '2024-03-10',
    salesperson: '赵六',
    status: '待发货',
    businessUnit: '华东事业部',
    deliveryDate: '2024-05-10'
  }
];

// 客户订货额排行榜数据
const topCustomers = [
  { rank: 1, customerName: '深圳创新科技集团', amount: 1250, percent: 8.0, growth: 15.2 },
  { rank: 2, customerName: '北京科技有限公司', amount: 980, percent: 6.3, growth: 8.5 },
  { rank: 3, customerName: '上海智能制造公司', amount: 750, percent: 4.8, growth: 12.1 },
  { rank: 4, customerName: '广州汽车零部件公司', amount: 680, percent: 4.3, growth: 6.8 },
  { rank: 5, customerName: '天津重工集团', amount: 580, percent: 3.7, growth: 9.2 },
  { rank: 6, customerName: '苏州精密制造', amount: 520, percent: 3.3, growth: 18.5 },
  { rank: 7, customerName: '武汉光电科技', amount: 480, percent: 3.1, growth: 22.3 },
  { rank: 8, customerName: '成都航空设备', amount: 420, percent: 2.7, growth: 11.8 },
  { rank: 9, customerName: '西安电子信息', amount: 380, percent: 2.4, growth: 5.6 },
  { rank: 10, customerName: '青岛海洋工程', amount: 350, percent: 2.2, growth: 14.7 }
];

// 事业部订货额数据
const businessUnitData = [
  { name: '华东事业部', amount: 5680, percent: 36.2, target: 5500, completion: 103.3, color: '#1890ff' },
  { name: '华北事业部', amount: 4250, percent: 27.1, target: 4000, completion: 106.3, color: '#52c41a' },
  { name: '华南事业部', amount: 3890, percent: 24.8, target: 3800, completion: 102.4, color: '#722ed1' },
  { name: '西南事业部', amount: 1858, percent: 11.9, target: 2000, completion: 92.9, color: '#faad14' }
];

// 业务员排行数据
const topSalespeople = [
  { rank: 1, name: '王五', amount: 2380, orders: 15, conversion: 68.5, color: '#f50' },
  { rank: 2, name: '张三', amount: 2180, orders: 18, conversion: 72.3, color: '#2f54eb' },
  { rank: 3, name: '李四', amount: 1950, orders: 12, conversion: 58.2, color: '#722ed1' },
  { rank: 4, name: '孙七', amount: 1680, orders: 14, conversion: 65.8, color: '#13c2c2' },
  { rank: 5, name: '赵六', amount: 1580, orders: 11, conversion: 61.4, color: '#52c41a' },
  { rank: 6, name: '钱八', amount: 1420, orders: 16, conversion: 55.6, color: '#faad14' },
  { rank: 7, name: '周九', amount: 1280, orders: 9, conversion: 70.1, color: '#fa541c' },
  { rank: 8, name: '吴十', amount: 1150, orders: 13, conversion: 52.8, color: '#eb2f96' },
  { rank: 9, name: '郑一', amount: 980, orders: 8, conversion: 66.7, color: '#1890ff' },
  { rank: 10, name: '冯二', amount: 890, orders: 10, conversion: 48.5, color: '#52c41a' }
];

// 产品线合同额分布
const productLineData = [
  { name: '智能设备', amount: 6850, percent: 43.7, color: '#1890ff' },
  { name: '自动化产线', amount: 4290, percent: 27.4, color: '#52c41a' },
  { name: '检测仪器', amount: 2680, percent: 17.1, color: '#722ed1' },
  { name: '配套软件', amount: 1858, percent: 11.8, color: '#faad14' }
];

const ContractAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<string>('all');

  const columns: ColumnsType<ContractRecord> = [
    {
      title: '合同编码',
      dataIndex: 'contractCode',
      width: 120,
      render: (code: string, record: ContractRecord) => (
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
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => console.log(`查看${name}的详情`)}>
          {name}
        </Button>
      )
    },
    {
      title: '订货金额(万)',
      dataIndex: 'orderAmount',
      width: 120,
      sorter: (a, b) => a.orderAmount - b.orderAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '签订日期',
      dataIndex: 'signDate',
      width: 100
    },
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
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '已完成') color = 'green';
        else if (status === '执行中') color = 'blue';
        else if (status === '已发货') color = 'orange';
        else if (status === '待发货') color = 'yellow';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '事业部',
      dataIndex: 'businessUnit',
      width: 120
    },
    {
      title: '交货日期',
      dataIndex: 'deliveryDate',
      width: 100
    }
  ];

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
        <Breadcrumb.Item>合同金额分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <DollarOutlined style={{ marginRight: 8, color: '#52c41a' }} />
        合同金额分析看板
      </Title>

      {/* 核心指标回顾区 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24} align="middle">
          <Col span={8}>
            <Statistic
              title="总合同金额"
              value={15678}
              suffix="万元"
              valueStyle={{ fontSize: '32px', color: '#52c41a' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">目标: 15,000万元</Text>
              <Tag color="green" style={{ marginLeft: 8 }}>104.52%</Tag>
              <Tag color="green">同比↑8.1%</Tag>
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
              <Text type="secondary">金额/数量切换趋势图 (图表组件待集成)</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 关联分析区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                事业部订货额趋势
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
              {businessUnitData.map((unit, index) => (
                <div key={index} style={{ 
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '6px',
                  border: `2px solid ${unit.color}20`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{unit.name}</span>
                    <span style={{ color: unit.color, fontWeight: 'bold' }}>
                      ¥{unit.amount.toLocaleString()}万
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      占比: {unit.percent}%
                    </span>
                    <span style={{ fontSize: '12px', color: unit.completion >= 100 ? '#52c41a' : '#faad14' }}>
                      目标完成率: {unit.completion}%
                    </span>
                  </div>
                  <Progress 
                    percent={Math.min(unit.completion, 120)} 
                    size="small" 
                    strokeColor={unit.completion >= 100 ? '#52c41a' : '#faad14'}
                    format={() => `${unit.completion}%`}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrophyOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                业务员排行TOP10
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
              {topSalespeople.slice(0, 5).map((person, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px',
                  padding: '8px 12px',
                  backgroundColor: index < 3 ? '#f6ffed' : '#fafafa',
                  borderRadius: '4px',
                  border: index < 3 ? '1px solid #b7eb8f' : '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: person.color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginRight: '8px'
                    }}>
                      {person.rank}
                    </div>
                    <Button type="link" size="small" onClick={() => console.log(`查看${person.name}的详情`)}>
                      {person.name}
                    </Button>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      ¥{person.amount.toLocaleString()}万
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {person.orders}单 | 转化率{person.conversion}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BarChartOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                产品线合同额分布
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {productLineData.map((product, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '4px',
                  border: `2px solid ${product.color}20`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: product.color,
                      borderRadius: '2px',
                      marginRight: '8px'
                    }} />
                    <span style={{ fontSize: '14px' }}>{product.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: product.color }}>
                      ¥{product.amount.toLocaleString()}万
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      占比: {product.percent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PieChartOutlined style={{ color: '#faad14', marginRight: 8 }} />
                合同状态占比
              </div>
            }
            size="small"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="执行中"
                  value={8956}
                  suffix="万元"
                  valueStyle={{ fontSize: '18px', color: '#1890ff' }}
                />
                <Text type="secondary">57.1% | 156单</Text>
              </Col>
              <Col span={12}>
                <Statistic
                  title="已完成"
                  value={5234}
                  suffix="万元"
                  valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                />
                <Text type="secondary">33.4% | 98单</Text>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: '16px' }}>
              <Col span={12}>
                <Statistic
                  title="待发货"
                  value={980}
                  suffix="万元"
                  valueStyle={{ fontSize: '18px', color: '#faad14' }}
                />
                <Text type="secondary">6.3% | 23单</Text>
              </Col>
              <Col span={12}>
                <Statistic
                  title="已发货"
                  value={508}
                  suffix="万元"
                  valueStyle={{ fontSize: '18px', color: '#13c2c2' }}
                />
                <Text type="secondary">3.2% | 15单</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 客户订货额排行榜 TOP20 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FundOutlined style={{ color: '#722ed1', marginRight: 8 }} />
            客户订货额排行榜 TOP10
          </div>
        }
        size="small"
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          {topCustomers.map((customer, index) => (
            <Col span={12} key={index} style={{ marginBottom: '8px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                backgroundColor: index < 3 ? '#f6ffed' : '#fafafa',
                borderRadius: '4px',
                border: index < 3 ? '1px solid #b7eb8f' : '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: index < 3 ? '#52c41a' : '#8c8c8c',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginRight: '8px'
                  }}>
                    {customer.rank}
                  </div>
                  <Button type="link" size="small" onClick={() => console.log(`查看${customer.customerName}的详情`)}>
                    {customer.customerName}
                  </Button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    ¥{customer.amount.toLocaleString()}万
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    占比{customer.percent}% | 同比↑{customer.growth}%
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 合同列表明细 */}
      <Card title="合同列表明细" style={{ marginBottom: 24 }}>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: '100%' }}
              placeholder="选择状态"
            >
              <Option value="all">全部状态</Option>
              <Option value="执行中">执行中</Option>
              <Option value="已完成">已完成</Option>
              <Option value="待发货">待发货</Option>
              <Option value="已发货">已发货</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              value={selectedBusinessUnit}
              onChange={setSelectedBusinessUnit}
              style={{ width: '100%' }}
              placeholder="选择事业部"
            >
              <Option value="all">全部事业部</Option>
              <Option value="华东事业部">华东事业部</Option>
              <Option value="华北事业部">华北事业部</Option>
              <Option value="华南事业部">华南事业部</Option>
              <Option value="西南事业部">西南事业部</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Button type="primary">导出Excel</Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={contractData}
          scroll={{ x: 1200 }}
          pagination={{
            total: 292,
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

export default ContractAnalysis; 