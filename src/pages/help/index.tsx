import React, { useState } from 'react';
import { Card, Row, Col, Input, Typography, Space, Button } from 'antd';
import { 
  SearchOutlined, 
  QuestionCircleOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

// 帮助中心快速链接数据

// 快速链接数据
const quickLinks = [
  { title: '如何连接ERP系统?', path: '/help?topic=erp-connection' },
  { title: '配置告警规则指南', path: '/help?topic=alert-config' },
  { title: '智能助手使用技巧', path: '/help?topic=assistant-tips' },
  { title: '报表分析最佳实践', path: '/help?topic=report-analysis' },
  { title: '系统权限配置说明', path: '/help?topic=permission-settings' },
  { title: '数据源管理常见问题', path: '/help?topic=data-source' },
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

      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <QuestionCircleOutlined style={{ fontSize: 32, color: '#1677ff', marginRight: 16 }} />
          <Title level={3} style={{ margin: 0 }}>平台使用指引</Title>
        </div>
        <Paragraph style={{ fontSize: 16 }}>
          企业大脑服务平台是一个AI驱动的集成解决方案，帮助企业连接数据源、进行智能分析、管理企业知识，并应用于各类业务场景。
          平台提供直观的用户界面和工作流程，帮助您快速实现数据驱动的精准决策。
        </Paragraph>
        <Paragraph style={{ fontSize: 16 }}>
          平台的主要功能包括：
          <ul>
            <li>数据管理：数据源管理、线下数据上传、数据映射管理</li>
            <li>知识管理：文档管理、FAQ管理</li>
            <li>智能分析中心：分析报告、Agent市场</li>
            <li>智能告警中心：告警概览、告警列表、Agent市场</li>
            <li>智能预测中心：预测报告、Agent市场</li>
            <li>报表中心：汇总各类报告，便于统一查看</li>
          </ul>
        </Paragraph>
      </Card>

      <Card title="常见问题快速链接" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {quickLinks.map((link, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Button 
                type="text" 
                style={{ width: '100%', textAlign: 'left', height: 'auto', padding: '8px 16px' }}
                onClick={() => navigate(link.path)}
              >
                <Text style={{ color: '#1677ff' }}>{link.title}</Text>
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      <div className="latest-updates" style={{ marginTop: 24 }}>
        <Card title="最新更新" bordered={false}>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <Text>【2024-04-15】智能预测功能已上线</Text>
            </li>
            <li>
              <Text>【2024-04-10】数据源管理功能优化</Text>
            </li>
            <li>
              <Text>【2024-04-05】Agent市场新增多项能力</Text>
            </li>
            <li>
              <Text>【2024-04-01】系统接口更新</Text>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter; 