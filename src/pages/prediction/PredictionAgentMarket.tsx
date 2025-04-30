import React, { useState } from 'react';
import { Card, Typography, Tabs, Row, Col, Button, Tag, Modal, Form, Select, Input, Space, message } from 'antd';
import { PlayCircleOutlined, SettingOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Paragraph } = Typography;

interface PredictionAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  applicableScenarios: string;
  requiredData: string;
  status: 'not_enabled' | 'checking' | 'enabled' | 'failed';
  accuracy?: number;
  nextRunTime?: string;
}

const mockAgents: PredictionAgent[] = [
  {
    id: '1',
    name: '设备故障预测 Agent',
    description: '基于设备运行数据预测潜在故障风险，提供预测性维护建议。',
    category: '设备维护',
    applicableScenarios: '适用于需要预测性维护的生产设备',
    requiredData: '设备运行参数、历史故障记录',
    status: 'not_enabled'
  },
  {
    id: '2',
    name: '销售预测 Agent',
    description: '分析历史销售数据，预测未来销售趋势和潜在机会。',
    category: '销售预测',
    applicableScenarios: '适用于产品销售预测和库存优化',
    requiredData: '历史销售数据、市场趋势数据',
    status: 'enabled',
    accuracy: 0.92,
    nextRunTime: '2024-01-22 10:00'
  },
  {
    id: '3',
    name: '库存优化 Agent',
    description: '预测库存需求，优化库存水平，降低库存成本。',
    category: '库存管理',
    applicableScenarios: '适用于库存管理和补货决策',
    requiredData: '库存水平、采购周期、需求数据',
    status: 'enabled',
    accuracy: 0.88,
    nextRunTime: '2024-01-22 14:00'
  },
  {
    id: '4',
    name: '质量预测 Agent',
    description: '预测产品质量问题，提供质量改进建议。',
    category: '质量管理',
    applicableScenarios: '适用于产品质量管理和改进',
    requiredData: '质检数据、工艺参数、不良品记录',
    status: 'not_enabled'
  }
];

const categories = ['设备维护', '销售预测', '库存管理', '质量管理'];

const getStatusTag = (status: PredictionAgent['status']) => {
  const statusConfig = {
    not_enabled: { color: 'default', text: '未启用' },
    checking: { color: 'processing', text: '检查中' },
    enabled: { color: 'success', text: '已启用' },
    failed: { color: 'error', text: '启动失败' }
  };
  const config = statusConfig[status];
  return <Tag color={config.color}>{config.text}</Tag>;
};

const PredictionAgentMarket: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<PredictionAgent | null>(null);
  const [form] = Form.useForm();

  const handleEnableAgent = (agent: PredictionAgent) => {
    message.loading({ content: '正在检查数据接入状态...', key: 'enableAgent' });
    // 模拟数据检查过程
    setTimeout(() => {
      message.success({ content: '预测Agent启动成功', key: 'enableAgent' });
      setSelectedAgent(agent);
      setConfigModalVisible(true);
    }, 2000);
  };

  const handleConfigModalOk = () => {
    form.validateFields().then(values => {
      message.success('预测任务配置成功');
      setConfigModalVisible(false);
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
    <div className="prediction-agent-market">
      <Card bordered={false}>
        <Title level={4}>预测Agent市场</Title>
        <Paragraph>
          浏览和管理预置的预测Agent，快速配置智能预测任务。
        </Paragraph>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Title level={3} style={{ marginBottom: 8 }}>{mockAgents.length}</Title>
              <Paragraph type="secondary">可用Agent总数</Paragraph>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Title level={3} style={{ marginBottom: 8 }}>
                {mockAgents.filter(a => a.status === 'enabled').length}
              </Title>
              <Paragraph type="secondary">已启用Agent</Paragraph>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Title level={3} style={{ marginBottom: 8 }}>90.2%</Title>
              <Paragraph type="secondary">平均预测准确度</Paragraph>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Title level={3} style={{ marginBottom: 8 }}>24</Title>
              <Paragraph type="secondary">今日预测次数</Paragraph>
            </Card>
          </Col>
        </Row>

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
                      setConfigModalVisible(true);
                    }}
                    disabled={agent.status !== 'enabled'}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto' }}
                  >
                    配置
                  </Button>,
                  <Button 
                    type="link" 
                    icon={<DeleteOutlined />}
                    disabled={agent.status !== 'enabled'}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto' }}
                  >
                    停用
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
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 8 }}>
                    <strong>所需数据：</strong>{agent.requiredData}
                  </Paragraph>
                  {agent.accuracy && (
                    <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 8 }}>
                      <strong>预测准确度：</strong>{(agent.accuracy * 100).toFixed(1)}%
                    </Paragraph>
                  )}
                  {agent.nextRunTime && (
                    <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 0 }}>
                      <strong>下次运行：</strong>{agent.nextRunTime}
                    </Paragraph>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title="配置预测任务"
        open={configModalVisible}
        onOk={handleConfigModalOk}
        onCancel={() => setConfigModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="predictionTarget"
            label="预测目标"
            rules={[{ required: true, message: '请输入预测目标' }]}
          >
            <Input.TextArea 
              placeholder="请详细描述预测目标，如：预测未来7天内设备A发生故障的概率"
              rows={4}
            />
          </Form.Item>
          
          <Form.Item
            name="dataSource"
            label="数据源"
            rules={[{ required: true, message: '请选择数据源' }]}
          >
            <Select mode="multiple">
              <Select.Option value="device_data">设备运行数据</Select.Option>
              <Select.Option value="sales_data">销售历史数据</Select.Option>
              <Select.Option value="inventory_data">库存数据</Select.Option>
              <Select.Option value="quality_data">质量检测数据</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="schedule"
            label="运行计划"
            rules={[{ required: true, message: '请选择运行计划' }]}
          >
            <Select>
              <Select.Option value="hourly">每小时</Select.Option>
              <Select.Option value="daily">每天</Select.Option>
              <Select.Option value="weekly">每周</Select.Option>
              <Select.Option value="monthly">每月</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notification"
            label="推送设置"
            rules={[{ required: true, message: '请选择推送方式' }]}
          >
            <Select mode="multiple">
              <Select.Option value="email">邮件</Select.Option>
              <Select.Option value="dingding">钉钉</Select.Option>
              <Select.Option value="wecom">企业微信</Select.Option>
              <Select.Option value="sms">短信</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PredictionAgentMarket;