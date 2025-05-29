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
  Tabs,
  Tag,
  Progress,
  Timeline,
  Descriptions,
  Avatar
} from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  DollarOutlined,
  TeamOutlined,
  TrophyOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 业务员基本信息
interface SalespersonInfo {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  phone: string;
  email: string;
  region: string;
  level: string;
}

// 客户记录
interface CustomerRecord {
  key: string;
  customerName: string;
  industry: string;
  scale: string;
  type: string;
  totalAmount: number;
  latestContract: string;
  status: string;
}

// 合同记录
interface ContractRecord {
  key: string;
  contractCode: string;
  customerName: string;
  amount: number;
  signDate: string;
  status: string;
}

// 销售机会记录
interface OpportunityRecord {
  key: string;
  customerName: string;
  opportunityName: string;
  stage: string;
  expectedAmount: number;
  expectedCloseDate: string;
  probability: number;
}

// 业绩统计数据
interface PerformanceData {
  totalContracts: number;
  totalAmount: number;
  targetAmount: number;
  completionRate: number;
  customerCount: number;
  newCustomers: number;
  avgDealSize: number;
  conversionRate: number;
}

// 模拟数据
const salespersonInfo: SalespersonInfo = {
  id: '1',
  name: '张三',
  position: '高级销售经理',
  department: '华北事业部',
  joinDate: '2020-03-15',
  phone: '138-0000-0001',
  email: 'zhangsan@company.com',
  region: '北京、天津、河北',
  level: '金牌销售'
};

const performanceData: PerformanceData = {
  totalContracts: 28,
  totalAmount: 2380,
  targetAmount: 2200,
  completionRate: 108.2,
  customerCount: 15,
  newCustomers: 6,
  avgDealSize: 85,
  conversionRate: 68.5
};

const customerData: CustomerRecord[] = [
  {
    key: '1',
    customerName: '北京科技有限公司',
    industry: '制造业',
    scale: '大型企业',
    type: '老客户',
    totalAmount: 580,
    latestContract: '2024-01-15',
    status: '活跃'
  },
  {
    key: '2',
    customerName: '天津智能设备厂',
    industry: '智能制造',
    scale: '中型企业',
    type: '新客户',
    totalAmount: 320,
    latestContract: '2024-02-20',
    status: '活跃'
  },
  {
    key: '3',
    customerName: '河北重工集团',
    industry: '重工业',
    scale: '大型企业',
    type: '老客户',
    totalAmount: 890,
    latestContract: '2023-12-10',
    status: '沉睡'
  }
];

const contractData: ContractRecord[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    customerName: '北京科技有限公司',
    amount: 580,
    signDate: '2024-01-15',
    status: '已完成'
  },
  {
    key: '2',
    contractCode: 'HT2024003',
    customerName: '天津智能设备厂',
    amount: 320,
    signDate: '2024-02-20',
    status: '执行中'
  },
  {
    key: '3',
    contractCode: 'HT2023028',
    customerName: '河北重工集团',
    amount: 890,
    signDate: '2023-12-10',
    status: '已完成'
  }
];

const opportunityData: OpportunityRecord[] = [
  {
    key: '1',
    customerName: '石家庄机械公司',
    opportunityName: '自动化产线升级项目',
    stage: '商务谈判',
    expectedAmount: 450,
    expectedCloseDate: '2024-05-30',
    probability: 75
  },
  {
    key: '2',
    customerName: '保定电子科技',
    opportunityName: '智能控制系统采购',
    stage: '方案沟通',
    expectedAmount: 280,
    expectedCloseDate: '2024-06-15',
    probability: 60
  },
  {
    key: '3',
    customerName: '唐山钢铁集团',
    opportunityName: '检测设备更新换代',
    stage: '有效询盘',
    expectedAmount: 680,
    expectedCloseDate: '2024-07-20',
    probability: 40
  }
];

// 月度业绩趋势数据
const monthlyTrend = [
  { month: '2023-09', contracts: 3, amount: 245 },
  { month: '2023-10', contracts: 4, amount: 320 },
  { month: '2023-11', contracts: 2, amount: 180 },
  { month: '2023-12', contracts: 5, amount: 480 },
  { month: '2024-01', contracts: 3, amount: 290 },
  { month: '2024-02', contracts: 4, amount: 380 },
  { month: '2024-03', contracts: 7, amount: 485 }
];

const SalespersonDetail: React.FC = () => {
  const navigate = useNavigate();
  const { salespersonId } = useParams();
  const [activeTab, setActiveTab] = useState('customers');

  const customerColumns: ColumnsType<CustomerRecord> = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
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
      title: '行业',
      dataIndex: 'industry'
    },
    {
      title: '规模',
      dataIndex: 'scale',
      render: (scale: string) => {
        const color = scale === '大型企业' ? 'red' : scale === '中型企业' ? 'orange' : 'green';
        return <Tag color={color}>{scale}</Tag>;
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: string) => {
        const color = type === '新客户' ? 'blue' : 'green';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: '累计金额(万)',
      dataIndex: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '最近签约',
      dataIndex: 'latestContract'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '活跃' ? 'green' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  const contractColumns: ColumnsType<ContractRecord> = [
    {
      title: '合同编号',
      dataIndex: 'contractCode',
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
      dataIndex: 'customerName'
    },
    {
      title: '合同金额(万)',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '签订日期',
      dataIndex: 'signDate'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已完成' ? 'green' : status === '执行中' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  const opportunityColumns: ColumnsType<OpportunityRecord> = [
    {
      title: '客户名称',
      dataIndex: 'customerName'
    },
    {
      title: '销售机会',
      dataIndex: 'opportunityName',
      width: 200
    },
    {
      title: '阶段',
      dataIndex: 'stage',
      render: (stage: string) => {
        let color = 'default';
        if (stage === '商务谈判') color = 'orange';
        else if (stage === '方案沟通') color = 'blue';
        else if (stage === '有效询盘') color = 'purple';
        return <Tag color={color}>{stage}</Tag>;
      }
    },
    {
      title: '预计金额(万)',
      dataIndex: 'expectedAmount',
      sorter: (a, b) => a.expectedAmount - b.expectedAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '预计成交时间',
      dataIndex: 'expectedCloseDate'
    },
    {
      title: '成功概率',
      dataIndex: 'probability',
      render: (probability: number) => (
        <div>
          <Progress percent={probability} size="small" />
          <Text type="secondary">{probability}%</Text>
        </div>
      )
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
            onClick={() => navigate(-1)}
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>销售管理</Breadcrumb.Item>
        <Breadcrumb.Item>业务员详情</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        业务员详情 - {salespersonInfo.name}
      </Title>

      {/* 业务员基本信息 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={16}>
            <Descriptions title="基本信息" column={2}>
              <Descriptions.Item label="姓名">{salespersonInfo.name}</Descriptions.Item>
              <Descriptions.Item label="职位">{salespersonInfo.position}</Descriptions.Item>
              <Descriptions.Item label="所属部门">{salespersonInfo.department}</Descriptions.Item>
              <Descriptions.Item label="销售等级">
                <Tag color="gold">{salespersonInfo.level}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="负责区域">{salespersonInfo.region}</Descriptions.Item>
              <Descriptions.Item label="入职时间">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {salespersonInfo.joinDate}
              </Descriptions.Item>
              <Descriptions.Item label="联系电话">
                <PhoneOutlined style={{ marginRight: 4 }} />
                {salespersonInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">
                <MailOutlined style={{ marginRight: 4 }} />
                {salespersonInfo.email}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: 16 }} />
              <Title level={5} style={{ marginBottom: 8 }}>{salespersonInfo.name}</Title>
              <Text type="secondary">{salespersonInfo.position}</Text>
              <div style={{ marginTop: 16 }}>
                <Tag color="gold">金牌销售</Tag>
                <Tag color="blue">华北区</Tag>
                <Tag color="green">工作4年</Tag>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 业绩概览 */}
      <Card title="业绩概览" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="签约数量"
                value={performanceData.totalContracts}
                suffix="个"
                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                prefix={<TrophyOutlined />}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">本年度累计</Text>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="签约金额"
                value={performanceData.totalAmount}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<DollarOutlined />}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">目标: {performanceData.targetAmount}万</Text>
                <Progress 
                  percent={performanceData.completionRate} 
                  size="small" 
                  strokeColor="#52c41a"
                  format={() => `${performanceData.completionRate}%`}
                />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="客户数量"
                value={performanceData.customerCount}
                suffix="位"
                valueStyle={{ fontSize: '24px', color: '#722ed1' }}
                prefix={<TeamOutlined />}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">新客户: {performanceData.newCustomers}位</Text>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="平均单价"
                value={performanceData.avgDealSize}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#faad14' }}
                prefix={<BarChartOutlined />}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">转化率: {performanceData.conversionRate}%</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 月度业绩趋势 */}
      <Card title="月度业绩趋势" style={{ marginBottom: 24 }}>
        <div style={{ 
          height: '200px', 
          backgroundColor: '#f6ffed',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #52c41a'
        }}>
          <LineChartOutlined style={{ fontSize: '24px', color: '#52c41a', marginRight: '12px' }} />
          <Text type="secondary">7个月业绩趋势图表 (图表组件待集成)</Text>
        </div>
        <Row gutter={16} style={{ marginTop: 16 }}>
          {monthlyTrend.slice(-3).map((item, index) => (
            <Col span={8} key={index}>
              <Card size="small">
                <Statistic
                  title={item.month}
                  value={item.amount}
                  suffix="万元"
                  valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                />
                <Text type="secondary">{item.contracts}个合同</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 详细数据标签页 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={`客户管理 (${customerData.length})`} key="customers">
            <Table
              columns={customerColumns}
              dataSource={customerData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
              }}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`合同记录 (${contractData.length})`} key="contracts">
            <Table
              columns={contractColumns}
              dataSource={contractData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
              }}
              size="middle"
              summary={(pageData) => {
                const totalAmount = pageData.reduce((sum, record) => sum + record.amount, 0);
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2}>
                        <Text strong>合计金额</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>¥{totalAmount.toLocaleString()}万</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={2} />
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </TabPane>
          
          <TabPane tab={`销售机会 (${opportunityData.length})`} key="opportunities">
            <Table
              columns={opportunityColumns}
              dataSource={opportunityData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`
              }}
              size="middle"
              summary={(pageData) => {
                const totalExpected = pageData.reduce((sum, record) => sum + record.expectedAmount, 0);
                const avgProbability = pageData.reduce((sum, record) => sum + record.probability, 0) / pageData.length;
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3}>
                        <Text strong>预计总金额</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>¥{totalExpected.toLocaleString()}万</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        <Text strong>平均概率: {Math.round(avgProbability)}%</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default SalespersonDetail; 