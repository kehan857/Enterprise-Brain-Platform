import React, { useEffect, useState } from 'react';
import { Card, Typography, List, Tag, Input, Button, Empty, Divider, Breadcrumb } from 'antd';
import { SearchOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

interface HelpItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

// 模拟帮助内容数据
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

const HelpSearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<HelpItem[]>([]);

  // 解析URL中的查询参数
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
  }, [location.search]);

  // 模拟搜索功能
  const performSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    const searchResults = helpData.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.content.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    
    setResults(searchResults);
  };

  const handleSearch = () => {
    navigate(`/help/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleBack = () => {
    navigate('/help');
  };

  return (
    <div className="help-search-results">
      <div style={{ marginBottom: 24 }}>
        <Breadcrumb
          items={[
            { title: <a onClick={handleBack}>帮助中心</a> },
            { title: '搜索结果' },
          ]}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          style={{ paddingLeft: 0 }}
        >
          返回帮助中心
        </Button>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>搜索帮助内容</Title>
        <div style={{ display: 'flex', gap: 16 }}>
          <Input.Search
            placeholder="输入关键词搜索帮助内容..."
            allowClear
            enterButton={<><SearchOutlined /> 搜索</>}
            size="large"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            style={{ flex: 1 }}
          />
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={4} style={{ margin: 0 }}>搜索结果</Title>
          <Text>找到 {results.length} 条相关帮助内容</Text>
        </div>

        {results.length > 0 ? (
          <List
            itemLayout="vertical"
            dataSource={results}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />} 
                    onClick={() => navigate(`/help?topic=${item.id}`)}
                  >
                    查看详情
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={<a onClick={() => navigate(`/help?topic=${item.id}`)}>{item.title}</a>}
                  description={<Text>{item.category}</Text>}
                />
                <div>
                  {item.content.split('\n\n').slice(0, 1).map((paragraph, index) => (
                    <Paragraph key={index} ellipsis={{ rows: 2, expandable: true, symbol: '展开' }}>
                      {paragraph}
                    </Paragraph>
                  ))}
                </div>
                <Divider style={{ margin: '16px 0' }} />
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description={
              <span>
                没有找到与 <Text strong>"{searchQuery}"</Text> 相关的帮助内容
              </span>
            }
          >
            <Button type="primary" onClick={handleBack}>返回帮助中心</Button>
          </Empty>
        )}
      </Card>
    </div>
  );
};

export default HelpSearchResults; 