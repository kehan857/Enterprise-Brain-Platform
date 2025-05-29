import React, { useState } from 'react';
import { Card, Typography, Tabs, Row, Col, Button, Tag, Modal, Form, Select, message, Divider, Radio } from 'antd';
import { PlayCircleOutlined, SettingOutlined, BellOutlined, UserOutlined, TeamOutlined, StopOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Paragraph } = Typography;

interface AgentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  applicableScenarios: string;
  requiredData: string;
  status: 'not_enabled' | 'checking' | 'enabled' | 'failed';
}

// 模拟用户数据
const mockUsers = [
  { id: 'user1', name: '张三', department: '生产部' },
  { id: 'user2', name: '李四', department: '质量部' },
  { id: 'user3', name: '王五', department: '设备部' },
  { id: 'user4', name: '赵六', department: '安全部' },
  { id: 'user5', name: '钱七', department: '生产部' },
  { id: 'user6', name: '孙八', department: '质量部' },
];

// 模拟群组数据
const mockGroups = [
  { id: 'group1', name: '生产部门群组', memberCount: 12 },
  { id: 'group2', name: '设备维护团队', memberCount: 5 },
  { id: 'group3', name: '质量控制群组', memberCount: 8 },
  { id: 'group4', name: '安全监督小组', memberCount: 6 },
];

const mockAgents: AgentItem[] = [
  {
    id: '1',
    name: '设备故障预警 Agent',
    description: '监控设备运行参数，预测潜在故障风险，提前发出预警。',
    category: '生产',
    applicableScenarios: '适用于需要预测性维护的生产设备',
    requiredData: '设备运行参数、历史故障记录',
    status: 'not_enabled'
  },
  {
    id: '2',
    name: '产线效率监控 Agent',
    description: '实时监控产线OEE指标，当效率低于阈值时发出告警。',
    category: '生产',
    applicableScenarios: '适用于自动化生产线效率监控',
    requiredData: '产线生产数据、计划产量',
    status: 'enabled'
  },
  {
    id: '3',
    name: '质量异常检测 Agent',
    description: '分析产品质量数据，识别异常并及时预警。',
    category: '质控',
    applicableScenarios: '适用于产品质量监控场景',
    requiredData: '质检数据、工艺参数',
    status: 'not_enabled'
  },
  {
    id: '4',
    name: '安全合规监控 Agent',
    description: '监控安全指标，确保生产过程符合安全规范。',
    category: '生产',
    applicableScenarios: '适用于需要严格安全管控的场景',
    requiredData: '安全监测数据、操作记录',
    status: 'enabled'
  },
  {
    id: '5',
    name: '销售异常监控 Agent',
    description: '监控销售数据异常波动，及时发现销售问题并预警。',
    category: '营销',
    applicableScenarios: '适用于销售业绩监控',
    requiredData: '销售数据、市场活动数据',
    status: 'not_enabled'
  },
  {
    id: '6',
    name: '财务异常预警 Agent',
    description: '监控财务指标异常波动，及时发现财务风险。',
    category: '财务',
    applicableScenarios: '适用于财务风险管理',
    requiredData: '财务数据、交易记录',
    status: 'enabled'
  },
  {
    id: '7',
    name: '核心员工流失预警 Agent',
    description: '基于员工行为数据，预测高价值员工离职风险。',
    category: '人事',
    applicableScenarios: '适用于人才保留与管理',
    requiredData: '员工绩效数据、沟通记录、考勤数据',
    status: 'not_enabled'
  },
  {
    id: '8',
    name: '研发进度预警 Agent',
    description: '监控研发项目进度，发现延期风险并及时预警。',
    category: '研发',
    applicableScenarios: '适用于研发项目管理',
    requiredData: '项目计划、工时记录、代码提交记录',
    status: 'enabled'
  },
  {
    id: '9',
    name: '经营风险监控 Agent',
    description: '监控企业关键经营指标，及时发现经营风险。',
    category: '经营',
    applicableScenarios: '适用于企业战略管理',
    requiredData: '经营数据、市场数据、竞争对手数据',
    status: 'not_enabled'
  },
  {
    id: '10',
    name: '数据质量监控 Agent',
    description: '监控企业数据质量，发现数据异常并预警。',
    category: '其他',
    applicableScenarios: '适用于数据治理与管理',
    requiredData: '各系统数据源、数据标准规则',
    status: 'enabled'
  }
];

const categories = ['全部', '经营', '营销', '生产', '质控', '研发', '财务', '人事', '其他'];

const getCategoryTag = (category: string) => {
  const categoryColors: Record<string, string> = {
    '经营': 'gold',
    '营销': 'geekblue',
    '生产': 'green',
    '质控': 'purple',
    '研发': 'cyan',
    '财务': 'blue',
    '人事': 'orange',
    '其他': 'default'
  };
  return <Tag color={categoryColors[category] || 'default'}>{category}</Tag>;
};

const getStatusTag = (status: AgentItem['status']) => {
  const statusConfig = {
    not_enabled: { color: 'default', text: '未启用' },
    checking: { color: 'processing', text: '检查中' },
    enabled: { color: 'success', text: '已启用' },
    failed: { color: 'error', text: '启动失败' }
  };
  const config = statusConfig[status];
  return <Tag color={config.color}>{config.text}</Tag>;
};

const AgentMarket: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [notifyModalVisible, setNotifyModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentItem | null>(null);
  const [form] = Form.useForm();
  const [recipientType, setRecipientType] = useState<'users' | 'groups'>('users');

  const handleEnableAgent = (agent: AgentItem) => {
    message.loading({ content: '正在检查数据接入状态...', key: 'enableAgent' });
    // 模拟数据检查过程
    setTimeout(() => {
      message.success({ content: '告警Agent启动成功', key: 'enableAgent' });
      setSelectedAgent(agent);
      setNotifyModalVisible(true);
    }, 2000);
  };

  const handleDisableAgent = (agent: AgentItem) => {
    message.loading({ content: '正在停用Agent...', key: 'disableAgent' });
    // 模拟停用过程
    setTimeout(() => {
      message.success({ content: '告警Agent已停用', key: 'disableAgent' });
    }, 1000);
  };

  const handleNotifyModalOk = () => {
    form.validateFields().then(values => {
      console.log('表单提交的值：', values);
      message.success('告警通知配置成功');
      setNotifyModalVisible(false);
      form.resetFields();
    });
  };

  const items: TabsProps['items'] = categories.map(category => ({
    key: category,
    label: category,
  }));

  const filteredAgents = activeCategory === '全部' 
    ? mockAgents 
    : mockAgents.filter(agent => agent.category === activeCategory);

  // 根据选择类型过滤不同的选项列表
  const recipientOptions = recipientType === 'users'
    ? mockUsers.map(user => ({
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><UserOutlined /> {user.name}</span>
            <span style={{ color: '#999' }}>{user.department}</span>
          </div>
        ),
        value: user.id
      }))
    : mockGroups.map(group => ({
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><TeamOutlined /> {group.name}</span>
            <span style={{ color: '#999' }}>{group.memberCount}人</span>
          </div>
        ),
        value: group.id
      }));

  return (
    <div className="agent-market">
      <Card bordered={false}>
        <Title level={4}>告警Agent市场</Title>
        <Paragraph>
          浏览和管理预置的告警Agent，快速配置智能告警规则。
        </Paragraph>
        <Tabs 
          items={items} 
          activeKey={activeCategory}
          onChange={setActiveCategory}
          style={{ marginBottom: 24 }}
        />
        <Row gutter={[16, 16]}>
          {filteredAgents.map(agent => (
            <Col xs={24} sm={12} md={8} lg={6} key={agent.id}>
              <Card
                size="small"
                title={agent.name}
                extra={getStatusTag(agent.status)}
                style={{
                  height: '320px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                bodyStyle={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                actions={[
                  <Button 
                    type="link" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleEnableAgent(agent)}
                    disabled={agent.status === 'enabled'}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto' }}
                  >
                    {agent.status === 'enabled' ? '已启用' : '启用'}
                  </Button>,
                  <Button 
                    type="link" 
                    icon={<SettingOutlined />}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setNotifyModalVisible(true);
                    }}
                    disabled={agent.status !== 'enabled'}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto' }}
                  >
                    通知配置
                  </Button>,
                  <Button 
                    type="link" 
                    icon={<StopOutlined />}
                    onClick={() => handleDisableAgent(agent)}
                    disabled={agent.status !== 'enabled'}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto', color: '#ff4d4f' }}
                  >
                    停用
                  </Button>
                ]}
              >
                <div style={{ flex: 1 }}>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 16 }}>
                    {agent.description}
                  </Paragraph>
                  <div style={{ marginBottom: 8 }}>
                    {getCategoryTag(agent.category)}
                  </div>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 8 }}>
                    <strong>适用场景：</strong>{agent.applicableScenarios}
                  </Paragraph>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 0 }}>
                    <strong>所需数据：</strong>{agent.requiredData}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title="配置告警通知"
        open={notifyModalVisible}
        onOk={handleNotifyModalOk}
        onCancel={() => setNotifyModalVisible(false)}
        width={500}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="severity"
            label="告警等级"
            rules={[{ required: true, message: '请选择告警等级' }]}
          >
            <Select>
              <Select.Option value="high">高</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="low">低</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="channels"
            label="通知渠道"
            rules={[{ required: true, message: '请选择通知渠道' }]}
          >
            <Select mode="multiple">
              <Select.Option value="dingding">钉钉</Select.Option>
              <Select.Option value="wecom">企业微信</Select.Option>
              <Select.Option value="email">邮件</Select.Option>
              <Select.Option value="sms">短信</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="通知对象" required style={{ marginBottom: 8 }}>
            <Radio.Group 
              value={recipientType} 
              onChange={(e) => setRecipientType(e.target.value)}
              style={{ marginBottom: 16 }}
            >
              <Radio.Button value="users">用户</Radio.Button>
              <Radio.Button value="groups">群组</Radio.Button>
            </Radio.Group>
            
            <Form.Item
              name="recipients"
              rules={[{ required: true, message: '请选择通知对象' }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                mode="multiple"
                placeholder={`请选择${recipientType === 'users' ? '用户' : '群组'}`}
                style={{ width: '100%' }}
                optionFilterProp="label"
                options={recipientOptions}
                showSearch
                filterOption={(input, option) => 
                  String(option?.label || '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AgentMarket;