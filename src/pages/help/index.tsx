import React, { useState } from 'react';
import { Card, Row, Col, Input, Typography, Space, Button } from 'antd';
import { 
  SearchOutlined, 
  ReadOutlined, 
  QuestionCircleOutlined, 
  VideoCameraOutlined, 
  CustomerServiceOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

// 帮助中心卡片数据
const helpCenterCards = [
  {
    title: '使用指南',
    icon: <ReadOutlined style={{ fontSize: 36, color: '#1677ff' }} />,
    description: '详细的平台功能说明和操作步骤，帮助您快速上手各项功能。',
    path: '/help/guide',
    color: '#e6f7ff',
    borderColor: '#91d5ff',
  },
  {
    title: '常见问题（FAQ）',
    icon: <QuestionCircleOutlined style={{ fontSize: 36, color: '#52c41a' }} />,
    description: '解答用户使用过程中的常见问题，快速解决您的疑惑。',
    path: '/help/faq',
    color: '#f6ffed',
    borderColor: '#b7eb8f',
  },
  {
    title: '视频教程',
    icon: <VideoCameraOutlined style={{ fontSize: 36, color: '#fa8c16' }} />,
    description: '直观的操作视频教程，通过实际演示帮助您理解功能操作流程。',
    path: '/help/videos',
    color: '#fff7e6',
    borderColor: '#ffd591',
  },
  {
    title: '联系支持',
    icon: <CustomerServiceOutlined style={{ fontSize: 36, color: '#eb2f96' }} />,
    description: '获取更多技术支持和服务咨询，我们的专业团队随时为您提供帮助。',
    path: '/help/contact',
    color: '#fff0f6',
    borderColor: '#ffadd2',
  }
];

// 快速链接数据
const quickLinks = [
  { title: '如何连接ERP系统?', path: '/help/guide?topic=erp-connection' },
  { title: '配置告警规则指南', path: '/help/guide?topic=alert-config' },
  { title: '智能助手使用技巧', path: '/help/guide?topic=assistant-tips' },
  { title: '报表分析最佳实践', path: '/help/guide?topic=report-analysis' },
  { title: '系统权限配置说明', path: '/help/guide?topic=permission-settings' },
  { title: '数据源管理常见问题', path: '/help/faq?category=data-source' },
];

const HelpCenter: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/help/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="help-center">
      <div className="help-header" style={{ textAlign: 'center', marginBottom: 48 }}>
        <Title level={2}>帮助中心</Title>
        <Paragraph style={{ fontSize: 16, maxWidth: 600, margin: '0 auto 24px' }}>
          欢迎访问企业大脑服务平台帮助中心，您可以在这里找到详细的使用指南、常见问题解答和各种学习资源。
        </Paragraph>
        
        <Input.Search
          placeholder="搜索帮助内容..."
          allowClear
          enterButton={<><SearchOutlined /> 搜索</>}
          size="large"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 500, margin: '0 auto' }}
        />
      </div>

      <Row gutter={[24, 24]}>
        {helpCenterCards.map(card => (
          <Col key={card.title} xs={24} sm={12} md={12} lg={6}>
            <Card 
              hoverable
              onClick={() => navigate(card.path)}
              style={{ 
                height: '100%',
                backgroundColor: card.color,
                borderColor: card.borderColor,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                {card.icon}
              </div>
              <Title level={4} style={{ textAlign: 'center', marginBottom: 16 }}>
                {card.title}
              </Title>
              <Paragraph style={{ textAlign: 'center', marginBottom: 16 }}>
                {card.description}
              </Paragraph>
              <div style={{ textAlign: 'center' }}>
                <Button type="primary" ghost>
                  查看详情 <RightOutlined />
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="quick-links" style={{ marginTop: 48 }}>
        <Card title="快速链接" bordered={false}>
          <Row gutter={[16, 16]}>
            {quickLinks.map(link => (
              <Col key={link.title} xs={24} sm={12} md={8}>
                <a onClick={() => navigate(link.path)} style={{ display: 'block', cursor: 'pointer' }}>
                  <Space>
                    <RightOutlined />
                    <Text>{link.title}</Text>
                  </Space>
                </a>
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      <div className="latest-updates" style={{ marginTop: 48 }}>
        <Card title="最新更新" bordered={false}>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <Text>【2024-04-15】新增智能预测功能使用指南</Text>
            </li>
            <li>
              <Text>【2024-04-10】数据源管理FAQs更新</Text>
            </li>
            <li>
              <Text>【2024-04-05】新增Agent市场操作视频教程</Text>
            </li>
            <li>
              <Text>【2024-04-01】系统接口文档更新</Text>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter; 