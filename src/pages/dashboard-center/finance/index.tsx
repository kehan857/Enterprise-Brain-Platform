import React from 'react';
import { Row, Col, Card, Typography, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  DollarOutlined, 
  AccountBookOutlined, 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  FundOutlined, 
  BankOutlined, 
  PayCircleOutlined, 
  CreditCardOutlined,
  StockOutlined,
  ProfileOutlined,
  CalculatorOutlined,
  MoneyCollectOutlined,
  ShoppingOutlined,
  AlertOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 财务看板模块数据
const financeDashboards = [
  {
    category: '财务概览',
    items: [
      { 
        key: 'financial-overview', 
        title: '财务总览', 
        icon: <DollarOutlined />, 
        desc: '企业整体财务状况及关键指标分析',
        color: '#1890ff',
        tags: ['总览', '指标']
      },
      { 
        key: 'financial-statement', 
        title: '财务报表分析', 
        icon: <ProfileOutlined />, 
        desc: '资产负债表、利润表、现金流量表分析',
        color: '#1890ff',
        tags: ['报表', '分析']
      },
      { 
        key: 'financial-kpi', 
        title: '财务KPI分析', 
        icon: <BarChartOutlined />, 
        desc: '关键财务绩效指标达成及趋势分析',
        color: '#1890ff',
        tags: ['KPI', '趋势']
      }
    ]
  },
  {
    category: '盈利能力',
    items: [
      { 
        key: 'profit-analysis', 
        title: '利润分析', 
        icon: <LineChartOutlined />, 
        desc: '企业盈利能力及利润结构分析',
        color: '#52c41a',
        tags: ['利润', '结构']
      },
      { 
        key: 'margin-analysis', 
        title: '毛利率分析', 
        icon: <BarChartOutlined />, 
        desc: '产品/业务线毛利率及变化趋势分析',
        color: '#52c41a',
        tags: ['毛利率', '趋势']
      },
      { 
        key: 'cost-profit', 
        title: '成本利润分析', 
        icon: <PieChartOutlined />, 
        desc: '成本构成对利润影响的分析',
        color: '#52c41a',
        tags: ['成本', '影响']
      },
      { 
        key: 'roi-analysis', 
        title: '投资回报分析', 
        icon: <FundOutlined />, 
        desc: '各项投资的回报率及效益分析',
        color: '#52c41a',
        tags: ['回报', '效益']
      }
    ]
  },
  {
    category: '成本控制',
    items: [
      { 
        key: 'cost-structure', 
        title: '成本结构分析', 
        icon: <PieChartOutlined />, 
        desc: '企业各类成本构成及变化分析',
        color: '#722ed1',
        tags: ['结构', '变化']
      },
      { 
        key: 'cost-trend', 
        title: '成本趋势分析', 
        icon: <LineChartOutlined />, 
        desc: '各项成本的历史变化及趋势预测',
        color: '#722ed1',
        tags: ['趋势', '预测']
      },
      { 
        key: 'cost-control', 
        title: '成本控制分析', 
        icon: <CalculatorOutlined />, 
        desc: '成本控制措施及效果分析',
        color: '#722ed1',
        tags: ['控制', '效果']
      },
      { 
        key: 'cost-benchmark', 
        title: '成本标杆分析', 
        icon: <BarChartOutlined />, 
        desc: '与行业标杆的成本对比分析',
        color: '#722ed1',
        tags: ['标杆', '对比']
      }
    ]
  },
  {
    category: '预算管理',
    items: [
      { 
        key: 'budget-execution', 
        title: '预算执行分析', 
        icon: <FundOutlined />, 
        desc: '各部门预算执行情况及偏差分析',
        color: '#fa8c16',
        tags: ['执行', '偏差']
      },
      { 
        key: 'budget-variance', 
        title: '预算差异分析', 
        icon: <BarChartOutlined />, 
        desc: '预算与实际差异原因及影响分析',
        color: '#fa8c16',
        tags: ['差异', '原因']
      },
      { 
        key: 'budget-planning', 
        title: '预算规划分析', 
        icon: <ProfileOutlined />, 
        desc: '预算编制过程及优化分析',
        color: '#fa8c16',
        tags: ['规划', '优化']
      },
      { 
        key: 'capital-budget', 
        title: '资本预算分析', 
        icon: <BankOutlined />, 
        desc: '重大资本支出预算及执行分析',
        color: '#fa8c16',
        tags: ['资本', '支出']
      }
    ]
  },
  {
    category: '资金管理',
    items: [
      { 
        key: 'cash-flow', 
        title: '现金流分析', 
        icon: <MoneyCollectOutlined />, 
        desc: '企业现金流状况、趋势及预测分析',
        color: '#13c2c2',
        tags: ['现金流', '预测']
      },
      { 
        key: 'working-capital', 
        title: '营运资金分析', 
        icon: <DollarOutlined />, 
        desc: '营运资金管理效率及优化分析',
        color: '#13c2c2',
        tags: ['营运', '效率']
      },
      { 
        key: 'financing-analysis', 
        title: '融资分析', 
        icon: <BankOutlined />, 
        desc: '融资渠道、成本及结构分析',
        color: '#13c2c2',
        tags: ['融资', '成本']
      },
      { 
        key: 'investment-analysis', 
        title: '投资分析', 
        icon: <StockOutlined />, 
        desc: '企业投资组合及收益分析',
        color: '#13c2c2',
        tags: ['投资', '收益']
      }
    ]
  },
  {
    category: '应收应付',
    items: [
      { 
        key: 'accounts-receivable', 
        title: '应收账款分析', 
        icon: <CreditCardOutlined />, 
        desc: '应收账款账龄、回款及风险分析',
        color: '#eb2f96',
        tags: ['应收', '风险']
      },
      { 
        key: 'accounts-payable', 
        title: '应付账款分析', 
        icon: <PayCircleOutlined />, 
        desc: '应付账款账期及支付策略分析',
        color: '#eb2f96',
        tags: ['应付', '策略']
      },
      { 
        key: 'collection-efficiency', 
        title: '收款效率分析', 
        icon: <BarChartOutlined />, 
        desc: '收款流程效率及优化分析',
        color: '#eb2f96',
        tags: ['收款', '效率']
      },
      { 
        key: 'payment-optimization', 
        title: '付款优化分析', 
        icon: <LineChartOutlined />, 
        desc: '付款策略及现金流优化分析',
        color: '#eb2f96',
        tags: ['付款', '优化']
      }
    ]
  },
  {
    category: '税务与风险',
    items: [
      { 
        key: 'tax-analysis', 
        title: '税务分析', 
        icon: <AccountBookOutlined />, 
        desc: '企业纳税情况及优化分析',
        color: '#faad14',
        tags: ['税务', '优化']
      },
      { 
        key: 'financial-risk', 
        title: '财务风险分析', 
        icon: <AlertOutlined />, 
        desc: '企业财务风险评估及预警分析',
        color: '#faad14',
        tags: ['风险', '预警']
      },
      { 
        key: 'compliance-analysis', 
        title: '合规性分析', 
        icon: <ProfileOutlined />, 
        desc: '财务合规情况及风险点分析',
        color: '#faad14',
        tags: ['合规', '风险点']
      },
      { 
        key: 'asset-liability', 
        title: '资产负债分析', 
        icon: <BankOutlined />, 
        desc: '企业资产负债结构及风险分析',
        color: '#faad14',
        tags: ['结构', '风险']
      }
    ]
  }
];

const FinanceDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (key: string) => {
    // 跳转到对应的大屏页面
    navigate(`/dashboard-center/finance/${key}`);
  };
  
  return (
    <div className="finance-dashboard">
      {financeDashboards.map((category, categoryIndex) => (
        <div key={category.category}>
          <Title level={5} className="category-title">{category.category}</Title>
          <Row gutter={[16, 16]}>
            {category.items.map(item => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.key}>
                <Card 
                  className="dashboard-card"
                  hoverable
                  onClick={() => handleCardClick(item.key)}
                >
                  <div className="dashboard-card-title">
                    {React.cloneElement(item.icon, { style: { color: item.color, marginRight: 8 } })}
                    {item.title}
                  </div>
                  <Paragraph className="dashboard-card-desc">{item.desc}</Paragraph>
                  <div>
                    {item.tags.map(tag => (
                      <Tag color={item.color} key={tag} className="dashboard-tag">{tag}</Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          {categoryIndex < financeDashboards.length - 1 && <Divider className="section-divider" />}
        </div>
      ))}
    </div>
  );
};

export default FinanceDashboard; 