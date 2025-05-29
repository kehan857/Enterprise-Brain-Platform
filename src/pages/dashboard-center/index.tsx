import React from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  AreaChartOutlined, 
  ShoppingOutlined, 
  ToolOutlined, 
  CheckCircleOutlined, 
  ExperimentOutlined, 
  DollarOutlined 
} from '@ant-design/icons';
import './index.less';

const { Title, Paragraph } = Typography;

// 看板分类数据
const dashboardCategories = [
  {
    key: 'business',
    title: '经营看板',
    icon: <AreaChartOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
    desc: '提供企业经营全景视图，展示关键指标和业绩表现',
    color: '#1890ff'
  },
  {
    key: 'marketing',
    title: '营销看板',
    icon: <ShoppingOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
    desc: '展示市场、销售和客户相关的核心指标和分析',
    color: '#52c41a'
  },
  {
    key: 'production',
    title: '生产看板',
    icon: <ToolOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
    desc: '监控生产流程、效率和质量的关键指标',
    color: '#722ed1'
  },
  {
    key: 'quality',
    title: '质控看板',
    icon: <CheckCircleOutlined style={{ fontSize: 24, color: '#eb2f96' }} />,
    desc: '展示产品质量、测试结果和改进指标',
    color: '#eb2f96'
  },
  {
    key: 'research',
    title: '研发看板',
    icon: <ExperimentOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
    desc: '追踪研发项目进度、创新成果和投入产出',
    color: '#fa8c16'
  },
  {
    key: 'finance',
    title: '财务看板',
    icon: <DollarOutlined style={{ fontSize: 24, color: '#13c2c2' }} />,
    desc: '展示企业财务健康状况和重要财务指标',
    color: '#13c2c2'
  }
];

const DashboardCenter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 判断是否为智能看板中心的根路径
  const isDashboardRoot = () => {
    return location.pathname === '/dashboard-center';
  };
  
  // 卡片点击处理
  const handleCategoryClick = (key: string) => {
    navigate(`/dashboard-center/${key}`);
  };
  
  return (
    <div className="dashboard-center">
      {isDashboardRoot() ? (
        <Card>
          <Title level={4}>智能看板中心</Title>
          <div className="dashboard-center-welcome">
            <Title level={5}>欢迎使用智能看板中心</Title>
            <Paragraph style={{ marginBottom: 30 }}>
              智能看板中心为企业提供多维度的数据可视化展示，帮助管理层快速掌握企业运营状况，辅助科学决策
            </Paragraph>
            
            <Row gutter={[24, 24]}>
              {dashboardCategories.map(category => (
                <Col xs={24} sm={12} md={8} key={category.key}>
                  <Card 
                    hoverable 
                    className="dashboard-card" 
                    onClick={() => handleCategoryClick(category.key)}
                    style={{ borderTop: `2px solid ${category.color}` }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                      {category.icon}
                      <span style={{ marginLeft: 12, fontSize: 18, fontWeight: 500 }}>
                        {category.title}
                      </span>
                    </div>
                    <Paragraph className="dashboard-card-desc">
                      {category.desc}
                    </Paragraph>
                    <Button type="link" style={{ padding: 0, color: category.color }}>
                      查看详情 →
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Card>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default DashboardCenter; 