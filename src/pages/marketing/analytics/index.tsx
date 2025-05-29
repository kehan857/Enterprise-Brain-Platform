import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Space,
  Progress,
  Statistic,
  Select,
  DatePicker
} from 'antd';
import {
  LineChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  TrophyOutlined,
  TeamOutlined,
  UserAddOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  AccountBookOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

// 核心指标数据（第一阶段优化）
const coreMetrics = [
  {
    key: 'total-customers',
    title: '总客户数',
    value: 15627,
    unit: '位',
    target: 15000,
    completion: 104.18,
    yearOnYear: 5.2,
    monthOnMonth: 1.8,
    icon: <TeamOutlined />,
    color: '#1890ff',
    trend: [12800, 13200, 13800, 14300, 14800, 15627]
  },
  {
    key: 'total-contract-amount',
    title: '总合同金额',
    value: 15678,
    unit: '万元',
    target: 15000,
    completion: 104.52,
    yearOnYear: 8.1,
    monthOnMonth: -0.5,
    icon: <DollarOutlined />,
    color: '#52c41a',
    trend: [12500, 13200, 14100, 14800, 15200, 15678]
  },
  {
    key: 'total-payment',
    title: '总回款金额',
    value: 12543,
    unit: '万元',
    target: 12000,
    completion: 104.53,
    yearOnYear: 6.3,
    monthOnMonth: 2.1,
    icon: <AccountBookOutlined />,
    color: '#13c2c2',
    trend: [9800, 10500, 11200, 11800, 12200, 12543]
  },
  {
    key: 'total-receivables',
    title: '总应收账款',
    value: 3135,
    unit: '万元',
    target: null,
    completion: null,
    yearOnYear: -2.1,
    monthOnMonth: 0.8,
    icon: <ShoppingCartOutlined />,
    color: '#faad14',
    trend: [3800, 3600, 3400, 3300, 3200, 3135]
  }
];

// 客户分类统计数据（第一阶段优化）
const customerCategories = [
  {
    key: 'new-customers',
    title: '新客户',
    count: 456,
    amount: 2345,
    rate: 12.5,
    rateLabel: '转化率',
    yearOnYear: 15.2,
    icon: <UserAddOutlined />,
    color: '#1890ff',
    description: '三年内首次签约客户',
    target: 400,
    completion: 114
  },
  {
    key: 'old-customers',
    title: '老客户',
    count: 1234,
    amount: 8765,
    rate: 68.2,
    rateLabel: '复购率',
    yearOnYear: 3.8,
    icon: <TeamOutlined />,
    color: '#52c41a',
    description: '三年内多次签约客户',
    target: 1200,
    completion: 102.8
  },
  {
    key: 'big-customers',
    title: '大客户',
    count: 89,
    amount: 4568,
    rate: 29.1,
    rateLabel: '占比',
    yearOnYear: 8.9,
    icon: <CrownOutlined />,
    color: '#722ed1',
    description: '年合同额超过50万的客户',
    target: 80,
    completion: 111.3
  },
  {
    key: 'potential-customers',
    title: '待转化客户',
    count: 234,
    amount: 1876,
    rate: 15.8,
    rateLabel: '预计转化率',
    yearOnYear: 22.1,
    icon: <CustomerServiceOutlined />,
    color: '#faad14',
    description: '已报价但未签约的客户',
    target: 200,
    completion: 117
  }
];

const MarketingAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');

  // 渲染趋势图标
  const renderTrendIcon = (value: number) => {
    if (value > 0) {
      return <ArrowUpOutlined style={{ color: '#52c41a' }} />;
    } else if (value < 0) {
      return <ArrowDownOutlined style={{ color: '#ff4d4f' }} />;
    } else {
      return <MinusOutlined style={{ color: '#8c8c8c' }} />;
    }
  };

  // 渲染完成率进度条
  const renderCompletionRate = (completion: number | null) => {
    if (completion === null) return null;
    
    let strokeColor = '#52c41a';
    if (completion < 90) strokeColor = '#ff4d4f';
    else if (completion < 100) strokeColor = '#faad14';
    
    return (
      <Progress 
        percent={Math.min(completion, 120)} 
        size="small" 
        strokeColor={strokeColor}
        format={() => `${completion}%`}
      />
    );
  };

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题和筛选 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>营销数据板块</Title>
          <Text type="secondary">基于营销数据优化方案的深度分析平台</Text>
        </Col>
        <Col>
          <Space>
            <Select 
              value={selectedPeriod} 
              onChange={setSelectedPeriod} 
              style={{ width: 120 }}
            >
              <Option value="current_week">本周</Option>
              <Option value="current_month">本月</Option>
              <Option value="current_quarter">本季度</Option>
              <Option value="current_year">本年</Option>
              <Option value="custom">自定义</Option>
            </Select>
            {selectedPeriod === 'custom' && (
              <RangePicker
                value={timeRange}
                onChange={(dates) => setTimeRange(dates)}
                style={{ width: 240 }}
              />
            )}
            <Button icon={<LineChartOutlined />}>刷新数据</Button>
          </Space>
        </Col>
      </Row>

      {/* 第一阶段：核心指标重塑 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TrophyOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            核心营销指标
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          {coreMetrics.map((metric) => (
            <Col span={6} key={metric.key}>
              <div style={{
                padding: '20px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                border: `2px solid ${metric.color}20`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onClick={() => console.log(`点击${metric.title}进入下钻页面`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '24px', color: metric.color }}>
                    {metric.icon}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {metric.title}
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: metric.color,
                    marginBottom: '4px'
                  }}>
                    {metric.value.toLocaleString()}
                    <span style={{ fontSize: '14px', marginLeft: '4px' }}>{metric.unit}</span>
                  </div>
                  
                  {metric.target && (
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      目标: {metric.target.toLocaleString()}{metric.unit}
                      {renderCompletionRate(metric.completion)}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>
                    同比 {renderTrendIcon(metric.yearOnYear)} {Math.abs(metric.yearOnYear)}%
                  </span>
                  <span>
                    环比 {renderTrendIcon(metric.monthOnMonth)} {Math.abs(metric.monthOnMonth)}%
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 第一阶段：客户分类统计模块重构 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TeamOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            客户分类统计
          </div>
        }
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          {customerCategories.map((category) => (
            <Col span={12} key={category.key}>
              <div style={{
                padding: '24px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                border: `2px solid ${category.color}20`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '200px'
              }}
              onClick={() => console.log(`点击${category.title}进入下钻页面`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '24px', color: category.color, marginRight: '12px' }}>
                    {category.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{category.title}</div>
                    <div style={{ fontSize: '12px', color: '#999' }}>{category.description}</div>
                  </div>
                </div>

                <Row gutter={16} style={{ marginBottom: '12px' }}>
                  <Col span={12}>
                    <Statistic
                      title="客户数量"
                      value={category.count}
                      suffix="位"
                      valueStyle={{ fontSize: '20px', color: category.color }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="合同金额"
                      value={category.amount}
                      suffix="万元"
                      valueStyle={{ fontSize: '20px', color: category.color }}
                    />
                  </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px' }}>
                    {category.rateLabel}: <span style={{ color: category.color, fontWeight: 'bold' }}>{category.rate}%</span>
                  </div>
                  <div style={{ fontSize: '12px' }}>
                    同比 {renderTrendIcon(category.yearOnYear)} {Math.abs(category.yearOnYear)}%
                  </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    目标完成率: {category.completion}%
                  </Text>
                  {renderCompletionRate(category.completion)}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 智能分析洞察提示 */}
      <Card 
        title="智能分析洞察"
        extra={<Button type="primary">生成洞察</Button>}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f6ffed', 
              border: '1px solid #b7eb8f',
              borderRadius: '6px'
            }}>
              <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px' }}>
                ✓ 新客户增长强劲
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                新客户数量同比增长15.2%，转化率达到12.5%，建议加大营销投入。
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#fff7e6', 
              border: '1px solid #ffd591',
              borderRadius: '6px'
            }}>
              <div style={{ color: '#fa8c16', fontWeight: 'bold', marginBottom: '8px' }}>
                ⚠ 关注回款情况
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                应收账款余额较高，建议加强回款管理，优化现金流。
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f6ffed', 
              border: '1px solid #b7eb8f',
              borderRadius: '6px'
            }}>
              <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px' }}>
                ✓ 大客户价值突出
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                大客户贡献29.1%的合同金额，建议深化大客户关系维护。
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 下一步功能预告 */}
      <Card title="功能规划" style={{ background: '#fafafa' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <LineChartOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>客户总体分析看板</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                行业分布、来源分析、区域分布等多维度客户洞察
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <DollarOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>合同金额分析看板</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                事业部对比、业务员排行、合同状态分析
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <TeamOutlined style={{ fontSize: '32px', color: '#722ed1', marginBottom: '12px' }} />
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>客户360度视图</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                单客户全景分析，合同、回款、跟进记录等
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MarketingAnalytics; 