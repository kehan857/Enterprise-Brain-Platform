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
  UserAddOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  FunnelPlotOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

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
    shipmentStatus: '已发货'
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
    shipmentStatus: '待发货'
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
    shipmentStatus: '已发货'
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
    shipmentStatus: '已发货'
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
    shipmentStatus: '执行中'
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

// 新客户转化漏斗数据
const conversionFunnelData = [
  { stage: '首次接触', count: 3650, percent: 100, color: '#f0f0f0' },
  { stage: '有效沟通', count: 1825, percent: 50, color: '#d9d9d9' },
  { stage: '需求确认', count: 912, percent: 25, color: '#bfbfbf' },
  { stage: '方案报价', count: 456, percent: 12.5, color: '#8c8c8c' },
  { stage: '成功签约', count: 456, percent: 12.5, color: '#52c41a' }
];

const NewCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const columns: ColumnsType<NewCustomerRecord> = [
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
        <Breadcrumb.Item>新客户分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <UserAddOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        新客户分析看板
      </Title>

      {/* 核心指标卡片组 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="新客户数量"
              value={456}
              suffix="位"
              valueStyle={{ fontSize: '32px', color: '#1890ff' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text type="secondary">目标: 400位</Text>
              <Tag color="green" style={{ marginLeft: 8 }}>114%</Tag>
              <Tag color="green">同比↑15.2%</Tag>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="新客户合同金额"
              value={2345}
              suffix="万元"
              valueStyle={{ fontSize: '32px', color: '#52c41a' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag color="green">同比↑18.6%</Tag>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="新客户转化率"
              value={12.5}
              suffix="%"
              valueStyle={{ fontSize: '32px', color: '#722ed1' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag color="green">同比↑2.3%</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 分析图表区 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          {renderDistributionCard('新客户来源分析', sourceAnalysisData, <PieChartOutlined style={{ color: '#1890ff' }} />)}
        </Col>
        <Col span={12}>
          {renderDistributionCard('新客户行业分布', industryDistributionData, <BarChartOutlined style={{ color: '#52c41a' }} />)}
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          {renderDistributionCard('新客户区域分布', regionDistributionData, <EnvironmentOutlined style={{ color: '#722ed1' }} />)}
        </Col>
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FunnelPlotOutlined style={{ color: '#faad14', marginRight: 8 }} />
                新客户转化漏斗
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {conversionFunnelData.map((stage, index) => (
                <div key={index} style={{ 
                  marginBottom: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{stage.stage}</span>
                    <span style={{ color: stage.color, fontWeight: 'bold' }}>
                      {stage.count.toLocaleString()}人
                    </span>
                  </div>
                  <Progress 
                    percent={stage.percent} 
                    size="small" 
                    strokeColor={stage.color}
                    format={() => `${stage.percent}%`}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 转化效果洞察 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>展会效果最佳</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                展会获客168位，占比36.8%，单客价值最高
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <UserAddOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>制造业需求旺盛</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                制造业新客户占比31.1%，合同金额¥780万
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <EnvironmentOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>华东区增长强劲</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                华东区新客户165位，合同金额¥890万
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 新客户列表 */}
      <Card title="新客户列表" style={{ marginBottom: 24 }}>
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
          dataSource={newCustomerData}
          scroll={{ x: 1300 }}
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