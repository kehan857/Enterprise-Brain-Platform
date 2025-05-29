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
  ShoppingCartOutlined,
  BulbOutlined,
  RiseOutlined,
  FallOutlined,
  AlertOutlined
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

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

// 智能洞察数据
const intelligentInsights = [
  {
    type: 'positive',
    title: '新客户转化表现优异',
    content: '本月新客户转化率达12.5%，超出目标25%，展会渠道贡献最为突出',
    trend: 'up',
    impact: 'high',
    suggestion: '建议加大展会投入，扩大优质渠道覆盖'
  },
  {
    type: 'warning',
    title: '应收账款风险提醒',
    content: '当前应收账款3135万元，其中逾期账款占比15.2%，需重点关注',
    trend: 'stable',
    impact: 'medium',
    suggestion: '建议启动专项回款行动，重点跟进大额逾期客户'
  },
  {
    type: 'opportunity',
    title: '大客户增长机会',
    content: '大客户合同金额占比29.1%，同比增长8.9%，仍有较大提升空间',
    trend: 'up',
    impact: 'high',
    suggestion: '建议针对潜在大客户制定专门的营销策略'
  },
  {
    type: 'info',
    title: '区域发展不均衡',
    content: '华东区客户贡献33.5%，西南区仅13.9%，区域发展不够均衡',
    trend: 'stable',
    impact: 'medium',
    suggestion: '建议加强西南区市场开发，平衡区域发展'
  }
];

const MarketingAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const navigate = useNavigate();

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

  // 处理核心指标点击下钻
  const handleMetricClick = (metricKey: string) => {
    const routeMap = {
      'total-customers': '/customer-overview',
      'total-contract-amount': '/contract-analysis',
      'total-payment': '/payment-analysis', // 需要创建回款分析页面
      'total-receivables': '/receivables-analysis' // 需要创建应收账款分析页面
    };
    const route = routeMap[metricKey];
    if (route) {
      navigate(route);
    }
  };

  // 渲染智能洞察卡片
  const renderInsightCard = (insight: typeof intelligentInsights[0], index: number) => {
    const getInsightIcon = () => {
      switch (insight.type) {
        case 'positive':
          return <RiseOutlined style={{ color: '#52c41a' }} />;
        case 'warning':
          return <AlertOutlined style={{ color: '#faad14' }} />;
        case 'opportunity':
          return <TrophyOutlined style={{ color: '#1890ff' }} />;
        default:
          return <BulbOutlined style={{ color: '#722ed1' }} />;
      }
    };

    const getInsightColor = () => {
      switch (insight.type) {
        case 'positive':
          return { bg: '#f6ffed', border: '#b7eb8f', text: '#52c41a' };
        case 'warning':
          return { bg: '#fff7e6', border: '#ffd591', text: '#faad14' };
        case 'opportunity':
          return { bg: '#f0f9ff', border: '#91d5ff', text: '#1890ff' };
        default:
          return { bg: '#f9f0ff', border: '#d3adf7', text: '#722ed1' };
      }
    };

    const colors = getInsightColor();

    return (
      <Card 
        key={index}
        size="small" 
        className="metric-card"
        style={{ 
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          cursor: 'pointer'
        }}
        hoverable
      >
        <div className="flex-start mb-8">
          {getInsightIcon()}
          <span style={{ marginLeft: '8px', fontWeight: '600', color: colors.text }}>
            {insight.title}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#595959', marginBottom: '8px' }}>
          {insight.content}
        </div>
        <div style={{ fontSize: '11px', color: '#8c8c8c', fontStyle: 'italic' }}>
          💡 {insight.suggestion}
        </div>
      </Card>
    );
  };

  return (
    <div className="page-container">
      {/* 页面标题和筛选 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">营销数据板块</Title>
          <div className="page-subtitle">基于营销数据优化方案的深度分析平台</div>
        </div>
        <div className="page-actions">
          <Select 
            value={selectedPeriod} 
            onChange={setSelectedPeriod} 
            style={{ width: 120 }}
          >
            <Option value="current_month">本月</Option>
            <Option value="last_month">上月</Option>
            <Option value="current_quarter">本季度</Option>
            <Option value="last_quarter">上季度</Option>
          </Select>
          <RangePicker 
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 240 }}
          />
          <Button type="primary" icon={<LineChartOutlined />} className="btn-primary">
            刷新数据
          </Button>
        </div>
      </div>

      {/* 核心营销指标 */}
      <Card 
        title={
          <div className="flex-start">
            <TrophyOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            核心营销指标
          </div>
        }
        className="analysis-card card-mb-24"
      >
        <Row gutter={[16, 16]}>
          {coreMetrics.map((metric) => (
            <Col key={metric.key} xs={24} sm={12} md={6} className="flex-fill">
              <Card 
                size="small" 
                className="metric-card flex-fill"
                style={{ 
                  borderColor: `${metric.color}20`,
                  cursor: 'pointer'
                }}
                onClick={() => handleMetricClick(metric.key)}
                hoverable
              >
                <Statistic
                  title={metric.title}
                  value={metric.value}
                  suffix={metric.unit}
                  valueStyle={{ fontSize: '24px', color: metric.color }}
                  prefix={React.cloneElement(metric.icon, { style: { color: metric.color } })}
                />
                <div className="mt-8">
                  {metric.target && (
                    <>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        目标: {metric.target.toLocaleString()}{metric.unit}
                      </Text>
                      {renderCompletionRate(metric.completion)}
                    </>
                  )}
                  <div className="flex-between mt-8">
                    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      同比: {renderTrendIcon(metric.yearOnYear)} {Math.abs(metric.yearOnYear)}%
                    </span>
                    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                      环比: {renderTrendIcon(metric.monthOnMonth)} {Math.abs(metric.monthOnMonth)}%
                    </span>
                  </div>
                </div>
                <div className="text-center mt-8" style={{ fontSize: '10px', color: '#8c8c8c' }}>
                  点击查看详细分析 →
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 客户分类统计 */}
      <Card 
        title={
          <div className="flex-start">
            <TeamOutlined style={{ color: '#52c41a', marginRight: 8 }} />
            客户分类统计
          </div>
        }
        className="analysis-card card-mb-24"
      >
        <Row gutter={[16, 16]}>
          {customerCategories.map((category) => (
            <Col key={category.key} xs={24} sm={12} md={12} lg={6}>
              <Card 
                size="small" 
                className="metric-card"
                style={{ 
                  borderColor: `${category.color}20`,
                  background: `${category.color}05`,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const routeMap = {
                    'new-customers': '/new-customer-analysis',
                    'old-customers': '/old-customer-analysis',
                    'big-customers': '/big-customer-analysis',
                    'potential-customers': '/potential-customer-analysis'
                  };
                  navigate(routeMap[category.key]);
                }}
                hoverable
              >
                <div className="flex-between mb-16">
                  <div className="flex-start">
                    {React.cloneElement(category.icon, { 
                      style: { color: category.color, fontSize: '20px' } 
                    })}
                    <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                      {category.title}
                    </span>
                  </div>
                </div>

                <div className="flex-between mb-12">
                  <div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>客户数量</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: category.color }}>
                      {category.count.toLocaleString()}位
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>合同金额</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: category.color }}>
                      {category.amount.toLocaleString()}万元
                    </div>
                  </div>
                </div>

                <div className="flex-between mb-12">
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    {category.rateLabel}: {category.rate}%
                  </span>
                  <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    同比: {renderTrendIcon(category.yearOnYear)} {Math.abs(category.yearOnYear)}%
                  </span>
                </div>

                <div className="text-center" style={{ fontSize: '11px', color: '#8c8c8c' }}>
                  {category.description}
                </div>

                <div className="mt-8">
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    目标完成率: {category.completion}%
                  </Text>
                  <Progress 
                    percent={Math.min(category.completion, 120)} 
                    size="small" 
                    strokeColor={category.color}
                    format={() => `${category.completion}%`}
                    className="custom-progress"
                  />
                </div>
                <div className="text-center mt-8" style={{ fontSize: '10px', color: '#8c8c8c' }}>
                  点击查看专项分析 →
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 智能分析洞察 */}
      <Card 
        title={
          <div className="flex-start">
            <BulbOutlined style={{ color: '#722ed1', marginRight: 8 }} />
            智能分析洞察
          </div>
        }
        className="analysis-card card-mb-24"
        extra={
          <Button type="primary" size="small" className="btn-primary">
            生成更多洞察
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          {intelligentInsights.map((insight, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              {renderInsightCard(insight, index)}
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default MarketingAnalytics; 