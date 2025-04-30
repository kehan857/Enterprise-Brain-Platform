import React, { useState } from 'react';
import { Card, Typography, Tabs, Row, Col, Button, Tag, Modal, Form, Select, message } from 'antd';
import { PlayCircleOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
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

const mockAgents: AgentItem[] = [
  {
    id: '1',
    name: '设备故障预警 Agent',
    description: '监控设备运行参数，预测潜在故障风险，提前发出预警。',
    category: '设备状态',
    applicableScenarios: '适用于需要预测性维护的生产设备',
    requiredData: '设备运行参数、历史故障记录',
    status: 'not_enabled'
  },
  {
    id: '2',
    name: '产线效率监控 Agent',
    description: '实时监控产线OEE指标，当效率低于阈值时发出告警。',
    category: '生产效率',
    applicableScenarios: '适用于自动化生产线效率监控',
    requiredData: '产线生产数据、计划产量',
    status: 'enabled'
  },
  {
    id: '3',
    name: '质量异常检测 Agent',
    description: '分析产品质量数据，识别异常并及时预警。',
    category: '质量控制',
    applicableScenarios: '适用于产品质量监控场景',
    requiredData: '质检数据、工艺参数',
    status: 'not_enabled'
  },
  {
    id: '4',
    name: '安全合规监控 Agent',
    description: '监控安全指标，确保生产过程符合安全规范。',
    category: '安全合规',
    applicableScenarios: '适用于需要严格安全管控的场景',
    requiredData: '安全监测数据、操作记录',
    status: 'enabled'
  }
];

const categories = ['设备状态', '生产效率', '质量控制', '安全合规'];

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

  const handleEnableAgent = (agent: AgentItem) => {
    message.loading({ content: '正在检查数据接入状态...', key: 'enableAgent' });
    // 模拟数据检查过程
    setTimeout(() => {
      message.success({ content: '告警Agent启动成功', key: 'enableAgent' });
      setSelectedAgent(agent);
      setNotifyModalVisible(true);
    }, 2000);
  };

  const handleNotifyModalOk = () => {
    form.validateFields().then(values => {
      message.success('告警通知配置成功');
      setNotifyModalVisible(false);
      form.resetFields();
    });
  };

  const items: TabsProps['items'] = [
    {
      key: '全部',
      label: '全部',
    },
    ...categories.map(category => ({
      key: category,
      label: category,
    }))
  ];

  const filteredAgents = activeCategory === '全部' 
    ? mockAgents 
    : mockAgents.filter(agent => agent.category === activeCategory);

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
                  </Button>
                ]}
              >
                <div style={{ flex: 1 }}>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 16 }}>
                    {agent.description}
                  </Paragraph>
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
      >
        <Form form={form}>
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
            name="channel"
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
        </Form>
      </Modal>
    </div>
  );
};

export default AgentMarket;