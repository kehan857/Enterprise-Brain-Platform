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
    value: 3123,
    unit: '万元',
    target: 3000,
    completion: 104.1,
    yearOnYear: 6.3,
    monthOnMonth: 2.1,
    icon: <AccountBookOutlined />,
    color: '#13c2c2',
    trend: [2480, 2650, 2820, 2950, 3050, 3123]
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

// 智能洞察数据 - 多组可选内容
const intelligentInsightsPool = [
  // 第一组洞察
  [
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
  ],
  // 第二组洞察
  [
    {
      type: 'opportunity',
      title: '合同签约趋势向好',
      content: '本季度合同签约金额环比增长8.1%，订单数量增长15.2%，呈现良好态势',
      trend: 'up',
      impact: 'high',
      suggestion: '建议保持当前营销策略，适当扩大团队规模以支撑增长'
    },
    {
      type: 'positive',
      title: '老客户忠诚度提升',
      content: '老客户复购率达68.2%，较去年同期提升3.8%，客户粘性显著增强',
      trend: 'up',
      impact: 'high',
      suggestion: '建议推出老客户专属服务包，进一步提升客户价值'
    },
    {
      type: 'warning',
      title: '新客户获取成本上升',
      content: '新客户获取成本较上季度上升18%，需要优化获客渠道效率',
      trend: 'down',
      impact: 'medium',
      suggestion: '建议分析各渠道ROI，重点投入高效获客渠道'
    },
    {
      type: 'info',
      title: '行业竞争加剧趋势',
      content: '制造业客户平均成交周期延长15天，反映行业竞争更加激烈',
      trend: 'stable',
      impact: 'medium',
      suggestion: '建议加强产品差异化，提升服务响应速度'
    }
  ],
  // 第三组洞察
  [
    {
      type: 'positive',
      title: '高价值客户集中度提升',
      content: 'TOP20客户贡献了总收入的65%，客户结构不断优化，盈利能力增强',
      trend: 'up',
      impact: 'high',
      suggestion: '建议建立大客户专属服务团队，深化合作关系'
    },
    {
      type: 'opportunity',
      title: '数字化转型需求爆发',
      content: '智能制造相关需求同比增长22.1%，数字化转型成为客户主要需求',
      trend: 'up',
      impact: 'high',
      suggestion: '建议加大智能化解决方案投入，抢占市场先机'
    },
    {
      type: 'info',
      title: '季节性波动明显',
      content: '第四季度通常是合同签约高峰，约占全年签约量的40%',
      trend: 'stable',
      impact: 'medium',
      suggestion: '建议提前布局四季度营销活动，做好资源储备'
    },
    {
      type: 'warning',
      title: '小客户流失率偏高',
      content: '年合同额<10万的小客户流失率达25%，需要关注服务质量',
      trend: 'down',
      impact: 'medium',
      suggestion: '建议建立小客户服务标准化流程，降低服务成本'
    }
  ]
];

const MarketingAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [selectedPeriod, setSelectedPeriod] = useState('current_month');
  const [showInsights, setShowInsights] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [currentInsights, setCurrentInsights] = useState(intelligentInsightsPool[0]);
  const [analysisStep, setAnalysisStep] = useState('');
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

  // 处理生成洞察
  const handleGenerateInsights = async () => {
    setIsGeneratingInsights(true);
    setShowInsights(false);
    
    // 模拟AI分析步骤
    const steps = [
      '正在分析客户数据...',
      '正在识别趋势模式...',
      '正在生成业务洞察...',
      '正在优化建议方案...'
    ];
    
    let currentStep = 0;
    setAnalysisStep(steps[0]);
    
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setAnalysisStep(steps[currentStep]);
      } else {
        clearInterval(stepInterval);
      }
    }, 400); // 每400ms更新一个步骤
    
    // 模拟AI生成洞察的过程
    setTimeout(() => {
      clearInterval(stepInterval);
      // 随机选择一组洞察内容
      const randomIndex = Math.floor(Math.random() * intelligentInsightsPool.length);
      setCurrentInsights(intelligentInsightsPool[randomIndex]);
      setShowInsights(true);
      setIsGeneratingInsights(false);
      setAnalysisStep('');
    }, Math.random() * 1000 + 1500); // 1.5-2.5秒的随机时间，更真实
  };

  // 渲染智能洞察卡片
  const renderInsightCard = (insight: typeof currentInsights[0], index: number) => {
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
        className="metric-card insight-card"
        style={{ 
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          cursor: 'pointer'
        }}
        hoverable
        bodyStyle={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="flex-start mb-8">
            {getInsightIcon()}
            <span style={{ marginLeft: '8px', fontWeight: '600', color: colors.text }}>
              {insight.title}
            </span>
          </div>
          <div style={{ fontSize: '12px', color: '#595959', marginBottom: '8px' }}>
            {insight.content}
          </div>
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
            style={{ width: 140 }}
          >
            <Option value="current_month">本月</Option>
            <Option value="last_month">上月</Option>
            <Option value="current_quarter">本季度</Option>
            <Option value="last_quarter">上季度</Option>
            <Option value="current_year">本年</Option>
            <Option value="last_year">去年</Option>
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
        <Row gutter={[16, 16]} style={{ display: 'flex', alignItems: 'stretch' }}>
          {coreMetrics.map((metric) => (
            <Col key={metric.key} xs={24} sm={12} md={6} className="flex-fill">
              <Card 
                size="small" 
                className="metric-card flex-fill"
                style={{ 
                  borderColor: `${metric.color}20`,
                  cursor: 'pointer',
                  height: '100%'
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
        <Row gutter={[16, 16]} style={{ display: 'flex', alignItems: 'stretch' }}>
          {customerCategories.map((category) => (
            <Col key={category.key} xs={24} sm={12} md={12} lg={6} className="flex-fill">
              <Card 
                size="small" 
                className="metric-card flex-fill"
                style={{ 
                  borderColor: `${category.color}20`,
                  background: `${category.color}05`,
                  cursor: 'pointer',
                  height: '100%'
                }}
                bodyStyle={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
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
                <div>
                  <div className="flex-between mb-16">
                    <div className="flex-start">
                      {React.cloneElement(category.icon, { 
                        style: { color: category.color, fontSize: '20px' } 
                      })}
                      <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                        {category.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#8c8c8c', textAlign: 'right' }}>
                      {category.description}
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
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        {category.key === 'potential-customers' ? '预计金额' : '合同金额'}
                      </div>
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
                </div>

                <div>
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
          <Button 
            type="primary" 
            size="small" 
            className="btn-primary" 
            onClick={handleGenerateInsights}
            loading={isGeneratingInsights}
            disabled={isGeneratingInsights}
          >
            {isGeneratingInsights ? '生成中...' : '生成洞察'}
          </Button>
        }
      >
        {!showInsights && !isGeneratingInsights && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#8c8c8c',
            fontSize: '14px'
          }}>
            <BulbOutlined style={{ fontSize: '32px', color: '#d9d9d9', marginBottom: '12px' }} />
            <div>点击"生成洞察"按钮，AI将基于当前数据为您生成智能分析洞察</div>
          </div>
        )}
        
        {isGeneratingInsights && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#1890ff'
          }}>
            <BulbOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>AI正在分析数据...</div>
            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
              {analysisStep || '正在启动智能分析引擎...'}
            </div>
            <div style={{ fontSize: '11px', color: '#bfbfbf' }}>
              基于FastGPT工作流的企业大脑智能分析
            </div>
          </div>
        )}

        {showInsights && !isGeneratingInsights && (
          <>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
              <Button 
                size="small" 
                onClick={handleGenerateInsights}
                style={{ fontSize: '12px' }}
              >
                🔄 重新生成
              </Button>
            </div>
            <Row gutter={[16, 16]}>
              {currentInsights.map((insight, index) => (
                <Col key={index} xs={24} sm={12} lg={6}>
                  {renderInsightCard(insight, index)}
                </Col>
              ))}
            </Row>
          </>
        )}
      </Card>
    </div>
  );
};

export default MarketingAnalytics; 