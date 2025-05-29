import React from 'react';
import { Row, Col, Card, Typography, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  BarChartOutlined, 
  TeamOutlined, 
  UserOutlined, 
  ShopOutlined, 
  CommentOutlined, 
  GlobalOutlined, 
  PieChartOutlined, 
  ProfileOutlined, 
  SendOutlined,
  ShoppingOutlined,
  ClusterOutlined,
  MoneyCollectOutlined,
  SolutionOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 营销看板模块数据
const marketingDashboards = [
  {
    category: '市场分析',
    items: [
      { 
        key: 'market-overview', 
        title: '市场概览', 
        icon: <GlobalOutlined />, 
        desc: '市场整体情况、趋势及竞争格局分析',
        color: '#1890ff',
        tags: ['概览', '趋势']
      },
      { 
        key: 'market-segment', 
        title: '市场细分', 
        icon: <PieChartOutlined />, 
        desc: '按地区、产品、客户类型的市场细分分析',
        color: '#1890ff',
        tags: ['细分', '分布']
      },
      { 
        key: 'competitor-analysis', 
        title: '竞争分析', 
        icon: <ClusterOutlined />, 
        desc: '主要竞争对手的产品、价格及市场份额分析',
        color: '#1890ff',
        tags: ['竞争', '份额']
      }
    ]
  },
  {
    category: '销售分析',
    items: [
      { 
        key: 'sales-performance', 
        title: '销售业绩', 
        icon: <BarChartOutlined />, 
        desc: '销售额、增长率及完成情况分析',
        color: '#52c41a',
        tags: ['业绩', '增长']
      },
      { 
        key: 'sales-channel', 
        title: '销售渠道', 
        icon: <ClusterOutlined />, 
        desc: '各销售渠道的贡献及效率分析',
        color: '#52c41a',
        tags: ['渠道', '效率']
      },
      { 
        key: 'sales-personnel', 
        title: '销售人员', 
        icon: <TeamOutlined />, 
        desc: '销售人员的业绩表现及排名',
        color: '#52c41a',
        tags: ['排名', '表现']
      },
      { 
        key: 'sales-region', 
        title: '区域销售', 
        icon: <GlobalOutlined />, 
        desc: '不同区域的销售表现及潜力分析',
        color: '#52c41a',
        tags: ['区域', '潜力']
      }
    ]
  },
  {
    category: '客户管理',
    items: [
      { 
        key: 'customer-overview', 
        title: '客户概览', 
        icon: <TeamOutlined />, 
        desc: '客户总体情况、分布及价值分析',
        color: '#722ed1',
        tags: ['概览', '分布']
      },
      { 
        key: 'customer-value', 
        title: '客户价值', 
        icon: <MoneyCollectOutlined />, 
        desc: '客户价值评估及分层分析',
        color: '#722ed1',
        tags: ['价值', '分层']
      },
      { 
        key: 'customer-behavior', 
        title: '客户行为', 
        icon: <UserOutlined />, 
        desc: '客户购买行为及偏好分析',
        color: '#722ed1',
        tags: ['行为', '偏好']
      },
      { 
        key: 'customer-conversion', 
        title: '客户转化', 
        icon: <SolutionOutlined />, 
        desc: '潜在客户转化率及路径分析',
        color: '#722ed1',
        tags: ['转化', '路径']
      }
    ]
  },
  {
    category: '产品营销',
    items: [
      { 
        key: 'product-performance', 
        title: '产品表现', 
        icon: <ShoppingOutlined />, 
        desc: '各产品销售情况及市场反馈分析',
        color: '#eb2f96',
        tags: ['表现', '反馈']
      },
      { 
        key: 'product-promotion', 
        title: '产品推广', 
        icon: <SendOutlined />, 
        desc: '产品推广活动效果及投入产出分析',
        color: '#eb2f96',
        tags: ['推广', '效果']
      },
      { 
        key: 'pricing-analysis', 
        title: '定价分析', 
        icon: <MoneyCollectOutlined />, 
        desc: '产品定价策略及竞争力分析',
        color: '#eb2f96',
        tags: ['定价', '竞争']
      }
    ]
  },
  {
    category: '营销活动',
    items: [
      { 
        key: 'campaign-overview', 
        title: '活动概览', 
        icon: <BarChartOutlined />, 
        desc: '营销活动整体表现及效果分析',
        color: '#fa8c16',
        tags: ['概览', '效果']
      },
      { 
        key: 'campaign-roi', 
        title: '活动ROI', 
        icon: <MoneyCollectOutlined />, 
        desc: '营销活动的投资回报率分析',
        color: '#fa8c16',
        tags: ['ROI', '回报']
      },
      { 
        key: 'lead-generation', 
        title: '线索生成', 
        icon: <UserOutlined />, 
        desc: '营销活动产生的潜在客户线索分析',
        color: '#fa8c16',
        tags: ['线索', '生成']
      },
      { 
        key: 'lead-conversion', 
        title: '线索转化', 
        icon: <SolutionOutlined />, 
        desc: '潜在客户线索的转化率及路径分析',
        color: '#fa8c16',
        tags: ['转化', '路径']
      }
    ]
  },
  {
    category: '渠道管理',
    items: [
      { 
        key: 'channel-effectiveness', 
        title: '渠道效能', 
        icon: <ClusterOutlined />, 
        desc: '各销售渠道的效能及贡献度分析',
        color: '#13c2c2',
        tags: ['效能', '贡献']
      },
      { 
        key: 'dealer-management', 
        title: '经销商管理', 
        icon: <ShopOutlined />, 
        desc: '经销商业绩及合作情况分析',
        color: '#13c2c2',
        tags: ['业绩', '合作']
      },
      { 
        key: 'online-channels', 
        title: '线上渠道', 
        icon: <GlobalOutlined />, 
        desc: '电商及其他线上销售渠道分析',
        color: '#13c2c2',
        tags: ['线上', '电商']
      }
    ]
  },
  {
    category: '用户反馈',
    items: [
      { 
        key: 'customer-feedback', 
        title: '客户反馈', 
        icon: <CommentOutlined />, 
        desc: '客户满意度及反馈分析',
        color: '#faad14',
        tags: ['满意度', '反馈']
      },
      { 
        key: 'complaint-analysis', 
        title: '投诉分析', 
        icon: <ProfileOutlined />, 
        desc: '客户投诉类型及处理情况分析',
        color: '#faad14',
        tags: ['投诉', '处理']
      }
    ]
  }
];

const MarketingDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (key: string) => {
    // 跳转到对应的大屏页面
    navigate(`/dashboard-center/marketing/${key}`);
  };
  
  return (
    <div className="marketing-dashboard">
      {marketingDashboards.map((category, categoryIndex) => (
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
          {categoryIndex < marketingDashboards.length - 1 && <Divider className="section-divider" />}
        </div>
      ))}
    </div>
  );
};

export default MarketingDashboard; 