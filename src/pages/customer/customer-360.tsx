import React, { useState, useEffect } from 'react';
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
  Descriptions
} from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  DollarOutlined,
  FileTextOutlined,
  TruckOutlined,
  AccountBookOutlined,
  HistoryOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getSalespersonId, getContractId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 客户基本信息
interface CustomerInfo {
  id: string;
  name: string;
  scale: string;
  industry: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  source: string;
  salesperson: string;
  createTime: string;
  firstContractDate: string;
  latestContractDate: string;
}

// 合同记录
interface ContractRecord {
  key: string;
  contractCode: string;
  signDate: string;
  amount: number;
  status: string;
  deliveryDate: string;
  products: string;
}

// 报价单记录
interface QuoteRecord {
  key: string;
  quoteCode: string;
  quoteDate: string;
  amount: number;
  status: string;
  validDate: string;
  products: string;
}

// 发货记录
interface DeliveryRecord {
  key: string;
  deliveryCode: string;
  contractCode: string;
  deliveryDate: string;
  amount: number;
  status: string;
  receiver: string;
}

// 回款记录
interface PaymentRecord {
  key: string;
  paymentCode: string;
  contractCode: string;
  paymentDate: string;
  amount: number;
  method: string;
  status: string;
}

// 跟进记录
interface FollowUpRecord {
  key: string;
  date: string;
  type: string;
  content: string;
  nextPlan: string;
  salesperson: string;
}

// 模拟数据
const customerInfo: CustomerInfo = {
  id: '1',
  name: '北京科技有限公司',
  scale: '大型企业',
  industry: '制造业',
  contact: '张总',
  phone: '138-0000-0000',
  email: 'zhang@example.com',
  address: '北京市朝阳区科技园区创新大厦8层',
  source: '展会',
  salesperson: '张三',
  createTime: '2021-03-15',
  firstContractDate: '2021-05-20',
  latestContractDate: '2024-01-15'
};

const contractData: ContractRecord[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    signDate: '2024-01-15',
    amount: 580,
    status: '已完成',
    deliveryDate: '2024-05-15',
    products: '智能设备A型×2套, 配套软件×1套'
  },
  {
    key: '2',
    contractCode: 'HT2023015',
    signDate: '2023-08-20',
    amount: 320,
    status: '已完成',
    deliveryDate: '2023-12-20',
    products: '自动化产线B型×1套'
  },
  {
    key: '3',
    contractCode: 'HT2023008',
    signDate: '2023-03-10',
    amount: 150,
    status: '已完成',
    deliveryDate: '2023-07-10',
    products: '检测仪器C型×3台'
  }
];

const quoteData: QuoteRecord[] = [
  {
    key: '1',
    quoteCode: 'QT2024005',
    quoteDate: '2024-03-01',
    amount: 680,
    status: '跟进中',
    validDate: '2024-06-01',
    products: '智能设备X型×3套, 配套服务×1年'
  },
  {
    key: '2',
    quoteCode: 'QT2024003',
    quoteDate: '2024-02-15',
    amount: 420,
    status: '待确认',
    validDate: '2024-05-15',
    products: '自动化产线Y型×1套, 培训服务×1次'
  }
];

const deliveryData: DeliveryRecord[] = [
  {
    key: '1',
    deliveryCode: 'SH2024001',
    contractCode: 'HT2024001',
    deliveryDate: '2024-05-10',
    amount: 580,
    status: '已发货',
    receiver: '张总'
  },
  {
    key: '2',
    deliveryCode: 'SH2023025',
    contractCode: 'HT2023015',
    deliveryDate: '2023-12-15',
    amount: 320,
    status: '已收货',
    receiver: '李经理'
  }
];

const paymentData: PaymentRecord[] = [
  {
    key: '1',
    paymentCode: 'HK2024001',
    contractCode: 'HT2024001',
    paymentDate: '2024-06-20',
    amount: 520,
    method: '银行转账',
    status: '已到账'
  },
  {
    key: '2',
    paymentCode: 'HK2023030',
    contractCode: 'HT2023015',
    paymentDate: '2024-01-10',
    amount: 320,
    method: '银行转账',
    status: '已到账'
  }
];

const followUpData: FollowUpRecord[] = [
  {
    key: '1',
    date: '2024-03-01',
    type: '电话跟进',
    content: '客户对新产品X型很感兴趣，已发送详细方案和报价',
    nextPlan: '2024-03-08 面谈，确认技术细节',
    salesperson: '张三'
  },
  {
    key: '2',
    date: '2024-02-15',
    type: '现场拜访',
    content: '参观了客户生产线，了解了自动化升级需求',
    nextPlan: '2024-02-22 提供定制化方案',
    salesperson: '张三'
  },
  {
    key: '3',
    date: '2024-01-20',
    type: '合同签订',
    content: 'HT2024001合同顺利签订，客户对产品质量很满意',
    nextPlan: '2024-02-01 开始生产安排',
    salesperson: '张三'
  }
];

const Customer360: React.FC = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [activeTab, setActiveTab] = useState('contracts');

  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [customerId]);

  const contractColumns: ColumnsType<ContractRecord> = [
    {
      title: '合同编号',
      dataIndex: 'contractCode',
      render: (code: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/contract-detail/${getContractId(code)}`)}>
          {code}
        </Button>
      )
    },
    {
      title: '签订日期',
      dataIndex: 'signDate'
    },
    {
      title: '合同金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已完成' ? 'green' : status === '执行中' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '交货日期',
      dataIndex: 'deliveryDate'
    },
    {
      title: '产品信息',
      dataIndex: 'products',
      width: 300
    }
  ];

  const quoteColumns: ColumnsType<QuoteRecord> = [
    {
      title: '报价单号',
      dataIndex: 'quoteCode',
      render: (code: string) => (
        <Button type="link" size="small" onClick={() => console.log(`查看报价单${code}`)}>
          {code}
        </Button>
      )
    },
    {
      title: '报价日期',
      dataIndex: 'quoteDate'
    },
    {
      title: '报价金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === '已签约') color = 'green';
        else if (status === '跟进中') color = 'blue';
        else if (status === '待确认') color = 'orange';
        else if (status === '已失效') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '有效期至',
      dataIndex: 'validDate'
    },
    {
      title: '产品信息',
      dataIndex: 'products',
      width: 300
    }
  ];

  const deliveryColumns: ColumnsType<DeliveryRecord> = [
    {
      title: '发货单号',
      dataIndex: 'deliveryCode'
    },
    {
      title: '合同编号',
      dataIndex: 'contractCode',
      render: (code: string) => (
        <Button type="link" size="small" onClick={() => console.log(`查看合同${code}`)}>
          {code}
        </Button>
      )
    },
    {
      title: '发货日期',
      dataIndex: 'deliveryDate'
    },
    {
      title: '发货金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已收货' ? 'green' : status === '已发货' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '收货人',
      dataIndex: 'receiver'
    }
  ];

  const paymentColumns: ColumnsType<PaymentRecord> = [
    {
      title: '回款单号',
      dataIndex: 'paymentCode'
    },
    {
      title: '合同编号',
      dataIndex: 'contractCode',
      render: (code: string) => (
        <Button type="link" size="small" onClick={() => console.log(`查看合同${code}`)}>
          {code}
        </Button>
      )
    },
    {
      title: '回款日期',
      dataIndex: 'paymentDate'
    },
    {
      title: '回款金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '付款方式',
      dataIndex: 'method'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已到账' ? 'green' : status === '处理中' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
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
        <Breadcrumb.Item>客户管理</Breadcrumb.Item>
        <Breadcrumb.Item>客户360度视图</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        客户360度视图 - {customerInfo.name}
      </Title>

      {/* 客户基本信息卡片 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={16}>
            <Descriptions title="客户基本信息" column={2}>
              <Descriptions.Item label="客户名称">{customerInfo.name}</Descriptions.Item>
              <Descriptions.Item label="企业规模">
                <Tag color={customerInfo.scale === '大型企业' ? 'red' : 'orange'}>{customerInfo.scale}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="所属行业">{customerInfo.industry}</Descriptions.Item>
              <Descriptions.Item label="客户来源">{customerInfo.source}</Descriptions.Item>
              <Descriptions.Item label="联系人">{customerInfo.contact}</Descriptions.Item>
              <Descriptions.Item label="联系电话">
                <PhoneOutlined style={{ marginRight: 4 }} />
                {customerInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label="负责业务员">
                <TeamOutlined style={{ marginRight: 4 }} />
                <Button type="link" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(customerInfo.salesperson)}`)}>
                  {customerInfo.salesperson}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="客户地址">
                <EnvironmentOutlined style={{ marginRight: 4 }} />
                {customerInfo.address}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {customerInfo.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="首次签约">{customerInfo.firstContractDate}</Descriptions.Item>
              <Descriptions.Item label="最近签约">{customerInfo.latestContractDate}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#1890ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <UserOutlined style={{ fontSize: '32px', color: 'white' }} />
              </div>
              <Title level={5} style={{ marginBottom: 8 }}>{customerInfo.name}</Title>
              <Text type="secondary">{customerInfo.industry} | {customerInfo.scale}</Text>
              <div style={{ marginTop: 16 }}>
                <Tag color="blue">合作3年</Tag>
                <Tag color="green">重要客户</Tag>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 关键指标仪表板 */}
      <Card title="关键指标概览" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="累计合同数"
                value={12}
                suffix="个"
                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="累计金额"
                value={1050}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#52c41a' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="已回款额"
                value={840}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#13c2c2' }}
                prefix={<AccountBookOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" style={{ textAlign: 'center' }}>
              <Statistic
                title="应收余额"
                value={210}
                suffix="万元"
                valueStyle={{ fontSize: '24px', color: '#faad14' }}
                prefix={<TruckOutlined />}
              />
              <div style={{ marginTop: 8 }}>
                <Progress percent={80} size="small" strokeColor="#52c41a" />
                <Text type="secondary" style={{ fontSize: '12px' }}>回款率: 80%</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 标签页内容 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={`合同列表 (${contractData.length})`} key="contracts">
            <Table
              columns={contractColumns}
              dataSource={contractData}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`报价单列表 (${quoteData.length})`} key="quotes">
            <Table
              columns={quoteColumns}
              dataSource={quoteData}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`发货记录 (${deliveryData.length})`} key="deliveries">
            <Table
              columns={deliveryColumns}
              dataSource={deliveryData}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`回款记录 (${paymentData.length})`} key="payments">
            <Table
              columns={paymentColumns}
              dataSource={paymentData}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`跟进记录 (${followUpData.length})`} key="followups">
            <Timeline style={{ marginTop: 16 }}>
              {followUpData.map((record, index) => (
                <Timeline.Item 
                  key={record.key}
                  color={index === 0 ? 'green' : 'blue'}
                  dot={index === 0 ? <HistoryOutlined style={{ fontSize: '16px' }} /> : undefined}
                >
                  <Card size="small" style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Tag color="blue">{record.type}</Tag>
                      <Text type="secondary">{record.date} | {record.salesperson}</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Text strong>跟进内容：</Text>
                      <div style={{ marginTop: 4 }}>{record.content}</div>
                    </div>
                    <div>
                      <Text strong>下次计划：</Text>
                      <div style={{ marginTop: 4, color: '#1890ff' }}>{record.nextPlan}</div>
                    </div>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Customer360; 