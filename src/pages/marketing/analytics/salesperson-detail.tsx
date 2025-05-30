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
  Select,
  Tag,
  Input,
  Avatar,
  Descriptions,
  Progress,
  Timeline
} from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  TrophyOutlined,
  DollarOutlined,
  TeamOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  RiseOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  SearchOutlined,
  CrownOutlined,
  HeartOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getProductId, getTeamId, getCustomerId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

// 业务员基本信息接口
interface SalespersonInfo {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  department: string;
  phone: string;
  email: string;
  joinDate: string;
  territory: string;
  level: string;
}

// 业务员客户记录接口
interface SalespersonCustomerRecord {
  key: string;
  customerName: string;
  customerType: string;
  scale: string;
  industry: string;
  contractCount: number;
  totalAmount: number;
  region: string;
  firstContract: string;
  lastContract: string;
  status: string;
  productType: string;
  productName: string;
  department: string;
  team: string;
}

// 业务员合同记录接口
interface SalespersonContractRecord {
  key: string;
  contractCode: string;
  customerName: string;
  contractAmount: number;
  signDate: string;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
}

// 模拟业务员数据
const salespersonData: { [key: string]: SalespersonInfo } = {
  '1': {
    id: '1',
    name: '张三',
    avatar: '',
    position: '高级销售经理',
    department: '华北销售部',
    phone: '13800138001',
    email: 'zhangsan@company.com',
    joinDate: '2020-03-15',
    territory: '北京、天津地区',
    level: '金牌销售'
  },
  '2': {
    id: '2',
    name: '李四',
    avatar: '',
    position: '销售经理',
    department: '华东销售部',
    phone: '13800138002',
    email: 'lisi@company.com',
    joinDate: '2021-06-20',
    territory: '上海、江苏地区',
    level: '银牌销售'
  },
  '3': {
    id: '3',
    name: '王五',
    avatar: '',
    position: '销售经理',
    department: '华南销售部',
    phone: '13800138003',
    email: 'wangwu@company.com',
    joinDate: '2019-08-10',
    territory: '深圳、广州地区',
    level: '金牌销售'
  }
};

// 业务员客户数据
const salespersonCustomerData: { [key: string]: SalespersonCustomerRecord[] } = {
  '1': [
    {
      key: '1',
      customerName: '北京央企集团',
      customerType: '大客户',
      scale: '特大型企业',
      industry: '制造业',
      contractCount: 32,
      totalAmount: 25800,
      region: '北京市朝阳区',
      firstContract: '2019-03-10',
      lastContract: '2024-02-28',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    },
    {
      key: '2',
      customerName: '天津重工设备',
      customerType: '大客户',
      scale: '大型企业',
      industry: '重工设备',
      contractCount: 21,
      totalAmount: 12800,
      region: '天津市滨海新区',
      firstContract: '2020-11-05',
      lastContract: '2024-02-10',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    },
    {
      key: '3',
      customerName: '北京科技创新公司',
      customerType: '新客户',
      scale: '中型企业',
      industry: '电子信息',
      contractCount: 3,
      totalAmount: 1200,
      region: '北京市海淀区',
      firstContract: '2023-09-15',
      lastContract: '2024-01-20',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    }
  ],
  '2': [
    {
      key: '1',
      customerName: '上海智能制造龙头',
      customerType: '大客户',
      scale: '大型企业',
      industry: '智能制造',
      contractCount: 18,
      totalAmount: 15600,
      region: '上海市浦东新区',
      firstContract: '2021-06-20',
      lastContract: '2024-01-15',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    },
    {
      key: '2',
      customerName: '上海智能制造公司',
      customerType: '老客户',
      scale: '中型企业',
      industry: '智能制造',
      contractCount: 8,
      totalAmount: 3200,
      region: '上海市浦东新区',
      firstContract: '2022-05-15',
      lastContract: '2024-01-10',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    }
  ],
  '3': [
    {
      key: '1',
      customerName: '深圳创新科技集团',
      customerType: '大客户',
      scale: '大型企业',
      industry: '电子信息',
      contractCount: 24,
      totalAmount: 18500,
      region: '深圳市南山区',
      firstContract: '2020-08-15',
      lastContract: '2024-03-01',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    },
    {
      key: '2',
      customerName: '广州汽车零部件公司',
      customerType: '老客户',
      scale: '中型企业',
      industry: '汽车制造',
      contractCount: 6,
      totalAmount: 2800,
      region: '广州市天河区',
      firstContract: '2023-01-20',
      lastContract: '2024-02-25',
      status: '活跃',
      productType: '',
      productName: '',
      department: '',
      team: ''
    }
  ]
};

// 业务员合同数据
const salespersonContractData: { [key: string]: SalespersonContractRecord[] } = {
  '1': [
    {
      key: '1',
      contractCode: 'HT2024001',
      customerName: '北京央企集团',
      contractAmount: 1500,
      signDate: '2024-02-28',
      deliveryDate: '2024-06-30',
      status: '执行中',
      paymentStatus: '部分回款'
    },
    {
      key: '2',
      contractCode: 'HT2024002',
      customerName: '天津重工设备',
      contractAmount: 800,
      signDate: '2024-02-10',
      deliveryDate: '2024-05-15',
      status: '执行中',
      paymentStatus: '未回款'
    }
  ],
  '2': [
    {
      key: '1',
      contractCode: 'HT2024003',
      customerName: '上海智能制造龙头',
      contractAmount: 1200,
      signDate: '2024-01-15',
      deliveryDate: '2024-04-30',
      status: '执行中',
      paymentStatus: '已回款'
    }
  ],
  '3': [
    {
      key: '1',
      contractCode: 'HT2024004',
      customerName: '深圳创新科技集团',
      contractAmount: 2200,
      signDate: '2024-03-01',
      deliveryDate: '2024-07-15',
      status: '执行中',
      paymentStatus: '部分回款'
    }
  ]
};

const SalespersonDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedCustomerType, setSelectedCustomerType] = useState<string>('all');
  const [selectedContractStatus, setSelectedContractStatus] = useState<string>('all');

  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 获取业务员信息
  const salesperson = salespersonData[id || '1'];
  const customerData = salespersonCustomerData[id || '1'] || [];
  const contractData = salespersonContractData[id || '1'] || [];

  if (!salesperson) {
    return (
      <div className="page-container">
        <Card>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Text>业务员信息不存在</Text>
            <br />
            <Button 
              type="primary" 
              onClick={() => navigate('/marketing-analytics')}
              style={{ marginTop: 16 }}
            >
              返回营销数据
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // 计算业绩指标
  const totalCustomers = customerData.length;
  const totalContracts = customerData.reduce((sum, item) => sum + item.contractCount, 0);
  const totalAmount = customerData.reduce((sum, item) => sum + item.totalAmount, 0);
  const newCustomers = customerData.filter(item => item.customerType === '新客户').length;
  const bigCustomers = customerData.filter(item => item.customerType === '大客户').length;

  // 客户表格列定义
  const customerColumns: ColumnsType<SalespersonCustomerRecord> = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/customer-360/${getCustomerId(name)}`)}>
          {name}
        </Button>
      )
    },
    {
      title: '客户类型',
      dataIndex: 'customerType',
      width: 100,
      render: (type: string) => {
        let color = 'default';
        if (type === '新客户') color = 'green';
        else if (type === '老客户') color = 'blue';
        else if (type === '大客户') color = 'red';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: '规模',
      dataIndex: 'scale',
      width: 100,
      render: (scale: string) => {
        const color = scale === '特大型企业' ? 'red' : scale === '大型企业' ? 'orange' : 'green';
        return <Tag color={color}>{scale}</Tag>;
      }
    },
    {
      title: '行业',
      dataIndex: 'industry',
      width: 120
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
      title: '省市区',
      dataIndex: 'region',
      width: 140
    },
    {
      title: '最近签约',
      dataIndex: 'lastContract',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (status: string) => (
        <Tag color={status === '活跃' ? 'green' : 'orange'}>{status}</Tag>
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
      width: 160,
      render: (name: string, record: SalespersonCustomerRecord) => (
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
      render: (team: string, record: SalespersonCustomerRecord) => (
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

  // 合同表格列定义
  const contractColumns: ColumnsType<SalespersonContractRecord> = [
    {
      title: '合同编号',
      dataIndex: 'contractCode',
      width: 120,
      render: (code: string, record: SalespersonContractRecord) => (
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
        <Button type="link" size="small">
          {name}
        </Button>
      )
    },
    {
      title: '合同金额(万)',
      dataIndex: 'contractAmount',
      width: 120,
      sorter: (a, b) => a.contractAmount - b.contractAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '签订日期',
      dataIndex: 'signDate',
      width: 100
    },
    {
      title: '交货日期',
      dataIndex: 'deliveryDate',
      width: 100
    },
    {
      title: '合同状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        const color = status === '执行中' ? 'blue' : status === '已完成' ? 'green' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '回款状态',
      dataIndex: 'paymentStatus',
      width: 100,
      render: (status: string) => {
        const color = status === '已回款' ? 'green' : status === '部分回款' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      }
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
            onClick={() => navigate(-1)}
            className="btn-link"
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>营销数据板块</Breadcrumb.Item>
        <Breadcrumb.Item>业务员详情</Breadcrumb.Item>
      </Breadcrumb>

      {/* 业务员基本信息 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <div className="flex-start" style={{ alignItems: 'center' }}>
              <Avatar 
                size={80} 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#1890ff', marginRight: 20 }}
              />
              <div>
                <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
                  {salesperson.name}
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  {salesperson.position} · {salesperson.level}
                </Text>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={16}>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="所属部门">
                <TeamOutlined style={{ marginRight: 4 }} />
                {salesperson.department}
              </Descriptions.Item>
              <Descriptions.Item label="负责区域">
                <EnvironmentOutlined style={{ marginRight: 4 }} />
                {salesperson.territory}
              </Descriptions.Item>
              <Descriptions.Item label="联系电话">
                <PhoneOutlined style={{ marginRight: 4 }} />
                {salesperson.phone}
              </Descriptions.Item>
              <Descriptions.Item label="邮箱地址">
                <MailOutlined style={{ marginRight: 4 }} />
                {salesperson.email}
              </Descriptions.Item>
              <Descriptions.Item label="入职时间">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {salesperson.joinDate}
              </Descriptions.Item>
              <Descriptions.Item label="销售等级">
                <TrophyOutlined style={{ marginRight: 4 }} />
                <Tag color="gold">{salesperson.level}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* 核心业绩指标 */}
      <Card 
        title={
          <div className="flex-start">
            <TrophyOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            核心业绩指标
          </div>
        }
        className="analysis-card card-mb-24"
      >
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card size="small" className="metric-card">
              <Statistic
                title="管理客户"
                value={totalCustomers}
                suffix="位"
                valueStyle={{ fontSize: '20px', color: '#1890ff' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small" className="metric-card">
              <Statistic
                title="累计合同"
                value={totalContracts}
                suffix="单"
                valueStyle={{ fontSize: '20px', color: '#52c41a' }}
                prefix={<LineChartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small" className="metric-card">
              <Statistic
                title="累计金额"
                value={totalAmount}
                suffix="万元"
                valueStyle={{ fontSize: '20px', color: '#722ed1' }}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small" className="metric-card">
              <Statistic
                title="大客户数"
                value={bigCustomers}
                suffix="位"
                valueStyle={{ fontSize: '20px', color: '#faad14' }}
                prefix={<CrownOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 客户结构分析 */}
      <Row gutter={[16, 16]} className="card-mb-24">
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex-start">
                <PieChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                客户类型分布
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ padding: '20px 0' }}>
              <Row gutter={16}>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                    {newCustomers}
                  </div>
                  <div style={{ color: '#666', marginTop: '4px' }}>新客户</div>
                </Col>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                    {customerData.filter(item => item.customerType === '老客户').length}
                  </div>
                  <div style={{ color: '#666', marginTop: '4px' }}>老客户</div>
                </Col>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                    {bigCustomers}
                  </div>
                  <div style={{ color: '#666', marginTop: '4px' }}>大客户</div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div className="flex-start">
                <RiseOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                业绩达成情况
              </div>
            }
            className="analysis-card"
            size="small"
          >
            <div style={{ padding: '20px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span>月度目标达成率</span>
                  <span style={{ fontWeight: 'bold', color: '#52c41a' }}>112%</span>
                </div>
                <Progress percent={112} status="success" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span>季度目标达成率</span>
                  <span style={{ fontWeight: 'bold', color: '#1890ff' }}>95%</span>
                </div>
                <Progress percent={95} />
              </div>
              <div>
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span>年度目标达成率</span>
                  <span style={{ fontWeight: 'bold', color: '#faad14' }}>78%</span>
                </div>
                <Progress percent={78} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 客户列表明细 */}
      <Card 
        title={
          <div className="flex-start">
            <TeamOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            客户列表明细
          </div>
        }
        className="analysis-card card-mb-24"
      >
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <span className="filter-label">搜索:</span>
              <Input
                placeholder="搜索客户名称"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
                allowClear
              />
            </div>

            <div className="filter-item">
              <span className="filter-label">客户类型:</span>
              <Select
                value={selectedCustomerType}
                onChange={setSelectedCustomerType}
                style={{ width: 150 }}
              >
                <Option value="all">全部类型</Option>
                <Option value="新客户">新客户</Option>
                <Option value="老客户">老客户</Option>
                <Option value="大客户">大客户</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={customerColumns}
          dataSource={customerData}
          className="custom-table"
          scroll={{ x: 1700 }}
          pagination={{
            total: customerData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`
          }}
        />
      </Card>

      {/* 合同列表明细 */}
      <Card 
        title={
          <div className="flex-start">
            <LineChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
            合同列表明细
          </div>
        }
        className="analysis-card"
      >
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <span className="filter-label">合同状态:</span>
              <Select
                value={selectedContractStatus}
                onChange={setSelectedContractStatus}
                style={{ width: 150 }}
              >
                <Option value="all">全部状态</Option>
                <Option value="执行中">执行中</Option>
                <Option value="已完成">已完成</Option>
                <Option value="暂停">暂停</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table
          columns={contractColumns}
          dataSource={contractData}
          className="custom-table"
          scroll={{ x: 1000 }}
          pagination={{
            total: contractData.length,
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

export default SalespersonDetail; 