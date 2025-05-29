import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Typography, Space, Button, Tag, Divider, Collapse } from 'antd';
import { 
  SearchOutlined, 
  QuestionCircleOutlined,
  RightOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

interface HelpItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

// 帮助内容数据
const helpData: HelpItem[] = [
  {
    id: 'erp-connection',
    title: '如何连接ERP系统?',
    content: '在企业大脑平台连接ERP系统需要以下步骤：\n\n1. 进入数据管理-数据源管理页面\n2. 点击"添加数据源"按钮\n3. 选择"ERP系统"\n4. 填写连接信息，包括服务器地址、端口、账号和密码\n5. 点击"测试连接"确保连接正常\n6. 点击"保存"完成配置\n\n连接完成后，您需要在数据映射页面配置字段映射关系，将ERP数据映射到标准数据模型中。',
    category: '数据管理',
    tags: ['数据源', 'ERP', '连接配置']
  },
  {
    id: 'alert-config',
    title: '配置告警规则指南',
    content: '配置告警规则可以帮助您及时发现异常并采取措施。配置步骤如下：\n\n1. 进入智能告警中心-Agent市场\n2. 选择适合您业务场景的Agent\n3. 点击"配置"按钮\n4. 设置告警触发条件、阈值和通知方式\n5. 设置告警级别和处理流程\n6. 点击"启用"激活告警规则\n\n您也可以自定义告警规则，根据特定的业务需求创建更复杂的条件组合。',
    category: '智能告警',
    tags: ['告警规则', '配置', '阈值设置']
  },
  {
    id: 'assistant-tips',
    title: '智能助手使用技巧',
    content: '企业大脑智能助手可以帮助您快速解决问题和提高工作效率。以下是一些使用技巧：\n\n1. 使用清晰简洁的语言描述您的问题\n2. 提供足够的上下文信息帮助智能助手理解您的需求\n3. 针对特定领域的问题，可以指明相关业务领域\n4. 利用智能助手的多轮对话能力，逐步细化您的需求\n5. 对于复杂问题，可以将其拆分为多个简单问题\n\n智能助手会不断学习和进化，随着您的使用将变得更加智能和准确。',
    category: '智能助手',
    tags: ['AI助手', '使用技巧', '效率提升']
  },
  {
    id: 'report-analysis',
    title: '报表分析最佳实践',
    content: '有效利用企业大脑的报表分析功能可以帮助您挖掘数据价值。以下是一些最佳实践：\n\n1. 确定明确的分析目标，避免无目的的数据浏览\n2. 选择合适的数据指标和维度进行分析\n3. 利用平台提供的数据可视化工具呈现数据\n4. 关注数据趋势而非单一数据点\n5. 结合业务背景解读数据\n6. 定期回顾和调整分析方法\n\n报表分析结果可以导出或分享给团队成员，促进协作决策。',
    category: '数据分析',
    tags: ['报表', '分析', '数据可视化']
  },
  {
    id: 'permission-settings',
    title: '系统权限配置说明',
    content: '企业大脑平台采用RBAC权限模型，通过角色管理用户权限。权限配置步骤如下：\n\n1. 进入系统设置-角色管理\n2. 创建或选择需要配置的角色\n3. 在权限设置页面，为角色分配功能权限和数据权限\n4. 进入系统设置-用户管理\n5. 为用户分配相应的角色\n\n系统预设了管理员、数据分析师、业务用户等角色，您也可以根据实际需求创建自定义角色。',
    category: '系统设置',
    tags: ['权限', '角色', 'RBAC']
  },
  {
    id: 'data-source',
    title: '数据源管理常见问题',
    content: '以下是关于数据源管理的一些常见问题及解答：\n\n1. 数据源连接失败怎么办？\n   检查网络连接、账号密码、防火墙设置，确保数据库服务正常运行。\n\n2. 如何优化数据同步性能？\n   设置合理的同步频率、只同步必要字段、使用增量同步而非全量同步。\n\n3. 如何处理数据格式不一致问题？\n   使用数据转换功能，在同步过程中进行格式转换和标准化处理。\n\n4. 数据源权限不足怎么解决？\n   联系数据源管理员获取必要的权限，或使用具有足够权限的账号。',
    category: '数据管理',
    tags: ['数据源', '故障排除', '优化']
  },
  {
    id: 'prediction-agent',
    title: '如何使用智能预测Agent',
    content: '智能预测Agent可以帮助您基于历史数据进行未来趋势的预测。使用步骤如下：\n\n1. 进入智能预测中心-Agent市场\n2. 根据预测需求选择合适的Agent\n3. 点击"配置"按钮\n4. 选择预测所需的数据源和指标\n5. 设置预测周期、预测范围和更新频率\n6. 点击"启用"开始预测\n\n预测结果会在预测报告中展示，您可以查看预测值、实际值对比和预测准确率等信息。',
    category: '智能预测',
    tags: ['预测', 'Agent', '趋势分析']
  }
];

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
  const [currentTopic, setCurrentTopic] = useState<HelpItem | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 检查URL中是否有topic参数
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topicId = searchParams.get('topic');
    
    if (topicId) {
      const topic = helpData.find(item => item.id === topicId);
      if (topic) {
        setCurrentTopic(topic);
      }
    } else {
      setCurrentTopic(null);
    }
  }, [location.search]);

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/help/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleClearTopic = () => {
    navigate('/help');
  };
  
  // 添加渲染话题内容的函数
  const renderTopicContent = () => {
    if (!currentTopic) return null;
    
    return (
      <Card style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Button 
            type="link" 
            icon={<ArrowLeftOutlined />} 
            onClick={handleClearTopic}
            style={{ paddingLeft: 0 }}
          >
            返回帮助中心
          </Button>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <Title level={3}>{currentTopic.title}</Title>
        </div>
        
        <Divider style={{ margin: '16px 0' }} />
        
        <div className="topic-content">
          {currentTopic.content.split('\n\n').map((paragraph, index) => (
            <Paragraph key={index}>{paragraph}</Paragraph>
          ))}
        </div>
      </Card>
    );
  };
  
  // 修改主体内容渲染逻辑，增加条件展示
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

      {currentTopic ? (
        // 显示话题内容
        renderTopicContent()
      ) : (
        // 显示帮助中心默认内容
        <>
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
        </>
      )}
    </div>
  );
};

export default HelpCenter; 