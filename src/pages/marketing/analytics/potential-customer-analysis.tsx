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
  CustomerServiceOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  FunnelPlotOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// 待转化客户列表数据
interface PotentialCustomerRecord {
  key: string;
  salesperson: string;
  customerName: string;
  scale: string;
  industry: string;
  stage: string;
  expectedAmount: number;
  quoteDate: string;
  followUpStatus: string;
  expectedCloseDate: string;
}

const potentialCustomerData: PotentialCustomerRecord[] = [
  {
    key: '1',
    salesperson: '张三',
    customerName: '苏州精密设备公司',
    scale: '大型企业',
    industry: '制造业',
    stage: '商务谈判',
    expectedAmount: 680,
    quoteDate: '2024-02-15',
    followUpStatus: '积极跟进',
    expectedCloseDate: '2024-04-30'
  },
  {
    key: '2',
    salesperson: '李四',
    customerName: '天津智能科技',
    scale: '中型企业',
    industry: '智能制造',
    stage: '方案沟通',
    expectedAmount: 420,
    quoteDate: '2024-03-08',
    followUpStatus: '正常跟进',
    expectedCloseDate: '2024-05-15'
  },
  {
    key: '3',
    salesperson: '王五',
    customerName: '西安电子设备厂',
    scale: '中型企业',
    industry: '电子信息',
    stage: '有效询盘',
    expectedAmount: 290,
    quoteDate: '2024-03-20',
    followUpStatus: '待跟进',
    expectedCloseDate: '2024-06-10'
  },
  {
    key: '4',
    salesperson: '赵六',
    customerName: '济南新材料集团',
    scale: '大型企业',
    industry: '新材料',
    stage: '商务谈判',
    expectedAmount: 520,
    quoteDate: '2024-02-28',
    followUpStatus: '积极跟进',
    expectedCloseDate: '2024-04-15'
  },
  {
    key: '5',
    salesperson: '孙七',
    customerName: '南京汽车零配件',
    scale: '小型企业',
    industry: '汽车制造',
    stage: '方案沟通',
    expectedAmount: 180,
    quoteDate: '2024-03-12',
    followUpStatus: '正常跟进',
    expectedCloseDate: '2024-05-20'
  }
];

// 销售阶段漏斗数据
const salesFunnelData = [
  { stage: '有效询盘', count: 500, amount: 8500, color: '#f0f0f0', conversion: 100 },
  { stage: '方案沟通', count: 320, amount: 6800, color: '#d9d9d9', conversion: 64 },
  { stage: '商务谈判', count: 180, amount: 4200, color: '#bfbfbf', conversion: 36 },
  { stage: '合同签订', count: 45, amount: 1876, color: '#52c41a', conversion: 9 }
];

// 报价金额区间占比数据
const priceRangeData = [
  { range: '100万以上', count: 42, percent: 17.9, amount: 1250, color: '#1890ff' },
  { range: '50-100万', count: 68, percent: 29.1, amount: 480, color: '#52c41a' },
  { range: '20-50万', count: 85, percent: 36.3, amount: 120, color: '#722ed1' },
  { range: '20万以下', count: 39, percent: 16.7, amount: 26, color: '#faad14' }
];

// 行业分布数据
const industryData = [
  { name: '制造业', count: 89, percent: 38.0, amount: 720, color: '#1890ff' },
  { name: '智能制造', count: 56, percent: 23.9, amount: 480, color: '#52c41a' },
  { name: '电子信息', count: 42, percent: 17.9, amount: 320, color: '#722ed1' },
  { name: '新材料', count: 28, percent: 12.0, amount: 235, color: '#faad14' },
  { name: '其他', count: 19, percent: 8.2, amount: 121, color: '#13c2c2' }
];

// 丢失原因分析数据
const lossReasonData = [
  { reason: '价格过高', count: 125, percent: 35.8, color: '#ff4d4f' },
  { reason: '产品不匹配', count: 89, percent: 25.5, color: '#faad14' },
  { reason: '交期太长', count: 67, percent: 19.2, color: '#13c2c2' },
  { reason: '服务不满意', count: 42, percent: 12.0, color: '#722ed1' },
  { reason: '其他原因', count: 26, percent: 7.5, color: '#8c8c8c' }
];

// 阶段分布时长分析数据
const stageDurationData = [
  { stage: '有效询盘', avgDays: 7, maxDays: 15, color: '#1890ff' },
  { stage: '方案沟通', avgDays: 21, maxDays: 45, color: '#52c41a' },
  { stage: '商务谈判', avgDays: 35, maxDays: 60, color: '#faad14' },
  { stage: '合同签订', avgDays: 14, maxDays: 30, color: '#722ed1' }
];

const PotentialCustomerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const columns: ColumnsType<PotentialCustomerRecord> = [
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
      render: (name: string, record: PotentialCustomerRecord) => (
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
      title: '阶段',
      dataIndex: 'stage',
      width: 100,
      render: (stage: string) => {
        let color = 'default';
        if (stage === '合同签订') color = 'green';
        else if (stage === '商务谈判') color = 'orange';
        else if (stage === '方案沟通') color = 'blue';
        else if (stage === '有效询盘') color = 'purple';
        return <Tag color={color}>{stage}</Tag>;
      }
    },
    {
      title: '预计金额(万)',
      dataIndex: 'expectedAmount',
      width: 120,
      sorter: (a, b) => a.expectedAmount - b.expectedAmount,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '报价日期',
      dataIndex: 'quoteDate',
      width: 100
    },
    {
      title: '跟进状态',
      dataIndex: 'followUpStatus',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '积极跟进') color = 'green';
        else if (status === '正常跟进') color = 'blue';
        else if (status === '待跟进') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '预计成交时间',
      dataIndex: 'expectedCloseDate',
      width: 120
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
        <Breadcrumb.Item>待转化客户分析看板</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <CustomerServiceOutlined style={{ marginRight: 8, color: '#faad14' }} />
        待转化客户分析看板
      </Title>

      {/* 核心指标 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="待转化客户"
              value={234}
              suffix="位"
              valueStyle={{ fontSize: '32px', color: '#faad14' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag color="green">同比↑22.1%</Tag>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="预计金额"
              value={1876}
              suffix="万元"
              valueStyle={{ fontSize: '32px', color: '#52c41a' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag color="green">预计转化率: 15.8%</Tag>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="平均跟进周期"
              value={42}
              suffix="天"
              valueStyle={{ fontSize: '32px', color: '#1890ff' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag color="orange">比目标多7天</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 销售阶段漏斗 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FunnelPlotOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            销售阶段漏斗分析
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          {salesFunnelData.map((stage, index) => (
            <Col span={6} key={index}>
              <div style={{
                padding: '16px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                border: `2px solid ${stage.color}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {stage.stage}
                </div>
                <div style={{ fontSize: '24px', color: stage.color, fontWeight: 'bold', marginBottom: '4px' }}>
                  {stage.count}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  预计金额: ¥{stage.amount.toLocaleString()}万
                </div>
                <Progress 
                  percent={stage.conversion} 
                  size="small" 
                  strokeColor={stage.color}
                  format={() => `${stage.conversion}%`}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 分析图表 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PieChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                报价金额区间占比
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {priceRangeData.map((range, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '4px',
                  border: `2px solid ${range.color}20`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: range.color,
                      borderRadius: '50%',
                      marginRight: '8px'
                    }} />
                    <span style={{ fontSize: '12px' }}>{range.range}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {range.count}位
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {range.percent}% | ¥{range.amount}万
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
                <ClockCircleOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                阶段分布时长分析
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {stageDurationData.map((stage, index) => (
                <div key={index} style={{ 
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '6px',
                  border: `2px solid ${stage.color}20`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{stage.stage}</span>
                    <span style={{ color: stage.color, fontSize: '12px' }}>
                      平均{stage.avgDays}天 / 最长{stage.maxDays}天
                    </span>
                  </div>
                  <Progress 
                    percent={(stage.avgDays / stage.maxDays) * 100} 
                    size="small" 
                    strokeColor={stage.color}
                    format={() => `${stage.avgDays}天`}
                  />
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
                <BarChartOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                行业分布
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {industryData.map((industry, index) => (
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
                      backgroundColor: industry.color,
                      borderRadius: '50%',
                      marginRight: '8px'
                    }} />
                    <span style={{ fontSize: '12px' }}>{industry.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {industry.count}位
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {industry.percent}% | ¥{industry.amount}万
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
                <WarningOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                丢失原因分析
              </div>
            }
            size="small"
          >
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {lossReasonData.map((reason, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#fafafa',
                  borderRadius: '4px',
                  border: `1px solid ${reason.color}40`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: reason.color,
                      borderRadius: '50%',
                      marginRight: '8px'
                    }} />
                    <span style={{ fontSize: '12px' }}>{reason.reason}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: reason.color }}>
                      {reason.count}次
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {reason.percent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 优化建议洞察 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>重点关注大单</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                100万以上订单42个，占比17.9%，建议重点跟进
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>缩短跟进周期</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                平均跟进42天，建议优化流程缩短至35天
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <WarningOutlined style={{ fontSize: '32px', color: '#ff4d4f', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>价格策略调整</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                35.8%客户因价格过高流失，建议优化报价策略
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 待转化客户列表 */}
      <Card title="待转化客户列表" style={{ marginBottom: 24 }}>
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
              value={selectedStage}
              onChange={setSelectedStage}
              style={{ width: '100%' }}
              placeholder="选择阶段"
            >
              <Option value="all">全部阶段</Option>
              <Option value="有效询盘">有效询盘</Option>
              <Option value="方案沟通">方案沟通</Option>
              <Option value="商务谈判">商务谈判</Option>
              <Option value="合同签订">合同签订</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              style={{ width: '100%' }}
              placeholder="跟进状态"
            >
              <Option value="all">全部状态</Option>
              <Option value="积极跟进">积极跟进</Option>
              <Option value="正常跟进">正常跟进</Option>
              <Option value="待跟进">待跟进</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Button type="primary">导出Excel</Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={potentialCustomerData}
          scroll={{ x: 1400 }}
          pagination={{
            total: 234,
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

export default PotentialCustomerAnalysis; 