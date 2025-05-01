import React, { useState } from 'react';
import { Collapse, Input, Select, Tag, Card, Typography, Breadcrumb, Space, Divider } from 'antd';
import { HomeOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// FAQ分类数据
const faqCategories = [
  { value: 'all', label: '全部' },
  { value: 'data-source', label: '数据源管理' },
  { value: 'knowledge', label: '知识管理' },
  { value: 'agent', label: 'Agent应用' },
  { value: 'alert', label: '智能告警' },
  { value: 'prediction', label: '智能预测' },
  { value: 'system', label: '系统设置' },
];

// FAQ数据
const faqData = [
  {
    id: '1',
    question: '如何添加新的数据源连接？',
    answer: (
      <>
        <Paragraph>
          添加新的数据源连接需要按照以下步骤操作：
        </Paragraph>
        <Paragraph>
          1. 进入【数据管理】-【数据源管理】页面<br/>
          2. 点击右上角的【新增数据源】按钮<br/>
          3. 在弹出的表单中选择数据源类型（如数据库、API、文件等）<br/>
          4. 填写连接参数（如服务器地址、端口、用户名、密码等）<br/>
          5. 点击【测试连接】确认连接成功<br/>
          6. 点击【确认】保存数据源配置
        </Paragraph>
        <Paragraph>
          完成上述步骤后，您可以在数据源列表中看到新添加的数据源及其连接状态。
        </Paragraph>
      </>
    ),
    category: 'data-source',
    tags: ['数据源', '连接配置']
  },
  {
    id: '2',
    question: '系统支持哪些类型的数据源？',
    answer: (
      <>
        <Paragraph>
          企业大脑服务平台目前支持以下类型的数据源：
        </Paragraph>
        <Paragraph>
          <ul>
            <li><strong>关系型数据库</strong>：MySQL, SQL Server, Oracle, PostgreSQL</li>
            <li><strong>NoSQL数据库</strong>：MongoDB, Elasticsearch</li>
            <li><strong>API接口</strong>：RESTful API, GraphQL, SOAP</li>
            <li><strong>文件系统</strong>：CSV, Excel, JSON, XML</li>
            <li><strong>物联网数据</strong>：MQTT, Kafka</li>
            <li><strong>企业应用</strong>：SAP, Oracle ERP Cloud, 用友, 金蝶</li>
          </ul>
        </Paragraph>
        <Paragraph>
          如需连接其他类型的数据源，请联系技术支持团队进行评估和实现。
        </Paragraph>
      </>
    ),
    category: 'data-source',
    tags: ['数据源', '支持类型']
  },
  {
    id: '3',
    question: '如何查看和管理已激活的智能体(Agent)？',
    answer: (
      <>
        <Paragraph>
          查看和管理已激活的智能体(Agent)操作步骤如下：
        </Paragraph>
        <Paragraph>
          1. 进入【智能分析中心】/【智能告警中心】/【智能预测中心】的【Agent市场】<br/>
          2. 切换到"我的已启用Agent"标签页<br/>
          3. 在列表中可以看到所有您已激活的Agent及其状态<br/>
          4. 您可以对Agent进行以下操作：
          <ul>
            <li>启用/禁用：临时开启或关闭某个Agent的运行</li>
            <li>编辑配置：修改Agent的运行参数或通知设置</li>
            <li>查看报告：跳转到报告中心查看该Agent生成的报告</li>
            <li>删除：完全移除不再需要的Agent实例</li>
          </ul>
        </Paragraph>
      </>
    ),
    category: 'agent',
    tags: ['Agent', '智能体', '管理']
  },
  {
    id: '4',
    question: '智能告警触发后如何处理？',
    answer: (
      <>
        <Paragraph>
          当系统触发智能告警后，您可以按照以下流程进行处理：
        </Paragraph>
        <Paragraph>
          1. 在【智能告警中心】-【告警列表】中找到该告警<br/>
          2. 点击查看告警详情，了解告警原因、相关数据和系统建议<br/>
          3. 根据实际情况，可以采取以下操作：
          <ul>
            <li><strong>确认</strong>：表示您已知晓该告警，但尚未解决</li>
            <li><strong>解决</strong>：标记告警已解决，并可填写解决方案</li>
            <li><strong>忽略</strong>：标记为误报或不需处理</li>
            <li><strong>指派</strong>：将告警分配给其他人员处理</li>
            <li><strong>添加备注</strong>：为告警添加处理记录或补充信息</li>
          </ul>
        </Paragraph>
        <Paragraph>
          所有告警处理记录都会保存在系统中，用于后续分析和审计。
        </Paragraph>
      </>
    ),
    category: 'alert',
    tags: ['告警', '处理流程']
  },
  {
    id: '5',
    question: '如何上传企业文档到知识库？',
    answer: (
      <>
        <Paragraph>
          上传企业文档到知识库的步骤如下：
        </Paragraph>
        <Paragraph>
          1. 进入【知识管理】-【文档管理】页面<br/>
          2. 选择左侧目录树中的目标文件夹（或创建新文件夹）<br/>
          3. 点击右上角的【上传文档】按钮<br/>
          4. 在弹出的对话框中选择本地文件（支持PDF、Word、Excel、PPT等格式）<br/>
          5. 选择要关联的知识库实例（必选项）<br/>
          6. 点击【确认上传】
        </Paragraph>
        <Paragraph>
          上传完成后，系统会自动处理文档内容，包括文本提取、向量化等。处理状态会在文档列表中显示。
          处理完成后，文档内容将可通过智能助手进行提问和检索。
        </Paragraph>
      </>
    ),
    category: 'knowledge',
    tags: ['文档管理', '知识库', '上传']
  },
];

const FAQ: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 根据搜索文本和分类筛选FAQ
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchText === '' || 
      faq.question.toLowerCase().includes(searchText.toLowerCase()) || 
      faq.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="faq-container">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/help">
          帮助中心
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Space>
            <QuestionCircleOutlined />
            常见问题(FAQ)
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card bordered={false}>
        <Title level={3}>常见问题(FAQ)</Title>
        <Paragraph>
          在这里您可以找到用户常见问题及其解答。使用下方筛选器可以快速定位相关问题。
        </Paragraph>

        <div className="faq-filter" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <Input
              placeholder="搜索问题或标签"
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
            />
            <Select
              placeholder="选择分类"
              style={{ width: 200 }}
              value={selectedCategory}
              onChange={value => setSelectedCategory(value)}
            >
              {faqCategories.map(category => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <Divider />

        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            <Collapse>
              {filteredFAQs.map(faq => (
                <Panel 
                  key={faq.id}
                  header={faq.question}
                  extra={
                    <Space>
                      {faq.tags.map(tag => (
                        <Tag key={tag} color="blue">{tag}</Tag>
                      ))}
                    </Space>
                  }
                >
                  {faq.answer}
                </Panel>
              ))}
            </Collapse>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Text type="secondary">没有找到匹配的问题，请尝试调整搜索条件</Text>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FAQ; 