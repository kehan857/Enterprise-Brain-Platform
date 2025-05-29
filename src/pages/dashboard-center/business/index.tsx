import React from 'react';
import { Row, Col, Card, Typography, Divider, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AreaChartOutlined, RiseOutlined, FallOutlined, DollarOutlined, 
  ShoppingOutlined, BarChartOutlined, ProfileOutlined, FieldTimeOutlined,
  ExperimentOutlined, LineChartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 经营看板模块数据
const businessDashboards = [
  {
    category: '企业经营总览',
    items: [
      { 
        key: 'enterprise-management', 
        title: '企业经营看板', 
        icon: <BarChartOutlined />, 
        desc: '全面展示企业整体经营状况的关键指标和数据',
        color: '#1890ff',
        tags: ['实时', '关键指标']
      },
      { 
        key: 'business-unit', 
        title: '事业部看板', 
        icon: <AreaChartOutlined />, 
        desc: '各事业部经营情况及业绩表现的可视化展示',
        color: '#13c2c2',
        tags: ['分析', '对比']
      }
    ]
  },
  {
    category: '收入与利润',
    items: [
      { 
        key: 'income-analysis', 
        title: '收入分析', 
        icon: <RiseOutlined />, 
        desc: '企业各类收入来源、变化趋势及影响因素分析',
        color: '#52c41a',
        tags: ['趋势', '来源']
      },
      { 
        key: 'income-statistics', 
        title: '收入统计', 
        icon: <BarChartOutlined />, 
        desc: '按时间、部门、产品等维度的收入数据统计',
        color: '#52c41a',
        tags: ['统计', '维度']
      },
      { 
        key: 'income-query', 
        title: '收入查询', 
        icon: <ProfileOutlined />, 
        desc: '详细收入记录的多条件查询和导出',
        color: '#52c41a',
        tags: ['查询', '详情']
      },
      { 
        key: 'profit-analysis', 
        title: '利润分析', 
        icon: <LineChartOutlined />, 
        desc: '企业利润结构及变化趋势的多维度分析',
        color: '#722ed1',
        tags: ['趋势', '结构']
      },
      { 
        key: 'profit-query', 
        title: '利润查询', 
        icon: <ProfileOutlined />, 
        desc: '利润数据的详细查询和筛选功能',
        color: '#722ed1',
        tags: ['查询', '筛选']
      }
    ]
  },
  {
    category: '成本分析',
    items: [
      { 
        key: 'cost-analysis', 
        title: '成本分析', 
        icon: <FallOutlined />, 
        desc: '企业各项成本构成及变化趋势分析',
        color: '#fa8c16',
        tags: ['趋势', '构成']
      },
      { 
        key: 'cost-query', 
        title: '成本查询', 
        icon: <ProfileOutlined />, 
        desc: '按类别、部门等维度的成本数据查询',
        color: '#fa8c16',
        tags: ['查询', '维度']
      }
    ]
  },
  {
    category: '订单与交付',
    items: [
      { 
        key: 'delivery-analysis', 
        title: '发货分析', 
        icon: <ShoppingOutlined />, 
        desc: '企业发货情况、金额及完成率分析',
        color: '#eb2f96',
        tags: ['趋势', '完成率']
      },
      { 
        key: 'delivery-statistics', 
        title: '发货统计', 
        icon: <BarChartOutlined />, 
        desc: '按时间、区域等的发货数据统计',
        color: '#eb2f96',
        tags: ['统计', '区域']
      },
      { 
        key: 'order-analysis', 
        title: '订货分析', 
        icon: <ShoppingOutlined />, 
        desc: '订单趋势、结构及来源分析',
        color: '#1890ff',
        tags: ['趋势', '来源']
      },
      { 
        key: 'order-statistics', 
        title: '订货统计', 
        icon: <BarChartOutlined />, 
        desc: '各维度订单数据汇总和统计',
        color: '#1890ff',
        tags: ['统计', '汇总']
      },
      { 
        key: 'order-query', 
        title: '订货查询', 
        icon: <ProfileOutlined />, 
        desc: '详细订单信息的检索与查询',
        color: '#1890ff',
        tags: ['查询', '检索']
      }
    ]
  },
  {
    category: '财务与仓储',
    items: [
      { 
        key: 'payment-analysis', 
        title: '回款分析', 
        icon: <DollarOutlined />, 
        desc: '回款情况、账期及逾期分析',
        color: '#faad14',
        tags: ['账期', '逾期']
      },
      { 
        key: 'storage-analysis', 
        title: '仓储分析', 
        icon: <ShoppingOutlined />, 
        desc: '库存水平、周转率及结构分析',
        color: '#13c2c2',
        tags: ['周转', '结构']
      },
      { 
        key: 'storage-query', 
        title: '仓储查询', 
        icon: <ProfileOutlined />, 
        desc: '库存详细数据查询与筛选',
        color: '#13c2c2',
        tags: ['查询', '筛选']
      }
    ]
  },
  {
    category: '生产与产值',
    items: [
      { 
        key: 'production-value-analysis', 
        title: '产值分析', 
        icon: <BarChartOutlined />, 
        desc: '产值结构、趋势及预测分析',
        color: '#52c41a',
        tags: ['趋势', '预测']
      },
      { 
        key: 'production-value-statistics', 
        title: '产值统计', 
        icon: <BarChartOutlined />, 
        desc: '各维度产值数据统计与对比',
        color: '#52c41a',
        tags: ['统计', '对比']
      },
      { 
        key: 'production-value-query', 
        title: '产值查询', 
        icon: <ProfileOutlined />, 
        desc: '产值详细数据的查询与导出',
        color: '#52c41a',
        tags: ['查询', '导出']
      },
      { 
        key: 'production-order-analysis', 
        title: '生产订单分析', 
        icon: <LineChartOutlined />, 
        desc: '生产订单执行情况及效率分析',
        color: '#1890ff',
        tags: ['执行', '效率']
      },
      { 
        key: 'production-order-statistics', 
        title: '生产订单统计', 
        icon: <BarChartOutlined />, 
        desc: '生产订单数量、金额等统计数据',
        color: '#1890ff',
        tags: ['统计', '金额']
      },
      { 
        key: 'production-order-query', 
        title: '生产订单查询', 
        icon: <ProfileOutlined />, 
        desc: '生产订单详细信息查询',
        color: '#1890ff',
        tags: ['查询', '详情']
      }
    ]
  },
  {
    category: '质量与交期',
    items: [
      { 
        key: 'quality-analysis', 
        title: '质量分析', 
        icon: <ExperimentOutlined />, 
        desc: '产品质量指标、不良率及改进分析',
        color: '#eb2f96',
        tags: ['指标', '改进']
      },
      { 
        key: 'quality-query', 
        title: '质量查询', 
        icon: <ProfileOutlined />, 
        desc: '质量数据的详细查询与筛选',
        color: '#eb2f96',
        tags: ['查询', '筛选']
      },
      { 
        key: 'delivery-date-analysis', 
        title: '交期分析', 
        icon: <FieldTimeOutlined />, 
        desc: '交期达成率、延误原因及趋势分析',
        color: '#faad14',
        tags: ['达成率', '延误']
      },
      { 
        key: 'delivery-date-statistics', 
        title: '交期统计', 
        icon: <BarChartOutlined />, 
        desc: '各维度交期达成情况统计',
        color: '#faad14',
        tags: ['统计', '达成']
      },
      { 
        key: 'delivery-date-query', 
        title: '交期查询', 
        icon: <ProfileOutlined />, 
        desc: '订单交期详细数据查询',
        color: '#faad14',
        tags: ['查询', '详情']
      }
    ]
  },
  {
    category: '研发与技术',
    items: [
      { 
        key: 'rd-analysis', 
        title: '技术研发分析', 
        icon: <ExperimentOutlined />, 
        desc: '研发项目进度、投入及成果分析',
        color: '#722ed1',
        tags: ['进度', '成果']
      },
      { 
        key: 'rd-query', 
        title: '技术研发查询', 
        icon: <ProfileOutlined />, 
        desc: '研发项目详细信息查询',
        color: '#722ed1',
        tags: ['查询', '项目']
      }
    ]
  }
];

const BusinessDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (key: string) => {
    // 跳转到对应的大屏页面
    navigate(`/dashboard-center/business/${key}`);
  };
  
  return (
    <Card className="dashboard-module-card">
      <Title level={4}>经营看板</Title>
      <div className="business-dashboard">
        {businessDashboards.map((category, categoryIndex) => (
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
            {categoryIndex < businessDashboards.length - 1 && <Divider className="section-divider" />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BusinessDashboard; 