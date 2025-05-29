import React, { useState } from 'react';
import { Card, Typography, Tabs, Row, Col, Button, Tag, Modal, Form, Select, Input, Space, message, Radio, DatePicker } from 'antd';
import { PlayCircleOutlined, SettingOutlined, ClockCircleOutlined, DeleteOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    description: '基于设备运行数据，预测设备故障风险，提供预防性维护建议。',
    category: '生产',
    applicableScenarios: '适用于关键设备预防性维护',
    requiredData: '设备运行参数、历史故障记录、维护日志',
    status: 'enabled',
    accuracy: 92,
    nextRunTime: '2024-01-21 15:30'
  },
  {
    id: '2',
    name: '销售额预测 Agent',
    description: '基于历史销售数据和市场趋势，预测未来销售额。',
    category: '营销',
    applicableScenarios: '适用于销售计划制定和库存管理',
    requiredData: '销售历史数据、市场活动数据、客户数据',
    status: 'enabled',
    accuracy: 88,
    nextRunTime: '2024-01-20 18:45'
  },
  {
    id: '3',
    name: '客户流失预警 Agent',
    description: '分析客户行为模式，预测高风险流失客户，提供留存策略。',
    category: '营销',
    applicableScenarios: '适用于客户关系管理和留存策略',
    requiredData: '客户交易记录、互动历史、满意度调研',
    status: 'not_enabled',
    accuracy: 85
  },
  {
    id: '4',
    name: '产品质量预测 Agent',
    description: '基于生产数据预测产品质量问题，提前识别质量风险。',
    category: '质控',
    applicableScenarios: '适用于质量控制和产品检验',
    requiredData: '生产工艺参数、原材料数据、检验记录',
    status: 'enabled',
    accuracy: 94,
    nextRunTime: '2024-01-21 10:15'
  },
  {
    id: '5',
    name: '研发进度预测 Agent',
    description: '基于项目历史数据，预测研发项目完成时间和风险。',
    category: '研发',
    applicableScenarios: '适用于项目管理和资源配置',
    requiredData: '项目计划、工时记录、代码提交历史',
    status: 'checking'
  },
  {
    id: '6',
    name: '现金流预测 Agent',
    description: '基于财务数据预测未来现金流，提供资金管理建议。',
    category: '财务',
    applicableScenarios: '适用于财务规划和资金调度',
    requiredData: '财务报表、应收应付数据、合同信息',
    status: 'enabled',
    accuracy: 91
  },
  {
    id: '7',
    name: '员工离职预测 Agent',
    description: '分析员工行为数据，预测员工离职风险，提供人才保留策略。',
    category: '人事',
    applicableScenarios: '适用于人才管理和员工保留',
    requiredData: '员工绩效数据、考勤记录、薪酬数据',
    status: 'not_enabled',
    accuracy: 79
  },
  {
    id: '8',
    name: '经营风险预测 Agent',
    description: '综合多维度数据，预测企业经营风险，提供预警和建议。',
    category: '经营',
    applicableScenarios: '适用于企业战略决策和风险管控',
    requiredData: '经营数据、市场数据、财务指标',
    status: 'enabled',
    accuracy: 87,
    nextRunTime: '2024-01-22 09:00'
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

const PredictionAgentMarket: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<PredictionAgent | null>(null);
  const [form] = Form.useForm();
  const [reportForm] = Form.useForm();
  const [recipientType, setRecipientType] = useState<'users' | 'groups'>('users');

  const handleEnableAgent = (agent: PredictionAgent) => {
    message.loading({ content: '正在检查数据接入状态...', key: 'enableAgent' });
    // 模拟数据检查过程
    setTimeout(() => {
      message.success({ content: '智能体启动成功', key: 'enableAgent' });
    }, 2000);
  };

  const handleGenerateReport = (agent: PredictionAgent) => {
    setSelectedAgent(agent);
    setReportModalVisible(true);
  };

  const handleViewReport = (agent: PredictionAgent) => {
    // 跳转到智能预测中心-预测报告模块，带上agent的id作为参数
    navigate(`/prediction/reports?agentId=${agent.id}&agentName=${encodeURIComponent(agent.name)}`);
  };

  const handleConfigModalOk = () => {
    form.validateFields().then(values => {
      message.success('预测任务配置成功');
      setConfigModalVisible(false);
      form.resetFields();
    });
  };

  const handleReportModalOk = () => {
    reportForm.validateFields().then(values => {
      message.loading({ content: '预测报告生成中...', key: 'generateReport' });
      // 模拟报告生成过程
      setTimeout(() => {
        message.success({ content: '预测报告生成成功', key: 'generateReport' });
        setReportModalVisible(false);
        reportForm.resetFields();
      }, 2000);
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
    <div className="prediction-agent-market">
      <Card bordered={false}>
        <Title level={4}>预测Agent市场</Title>
        <Paragraph>
          浏览和管理预置的预测Agent，快速配置智能预测任务。
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
                  agent.status === 'not_enabled' ? (
                    <Button 
                      type="link" 
                      icon={<PlayCircleOutlined />}
                      onClick={() => handleEnableAgent(agent)}
                      style={{ fontSize: '12px', padding: '4px 8px', height: 'auto' }}
                    >
                      启用
                    </Button>
                  ) : (
                    <Button 
                      type="link" 
                      icon={<PlayCircleOutlined />}
                      onClick={() => handleGenerateReport(agent)}
                      disabled={agent.status !== 'enabled'}
                      style={{ fontSize: '12px', padding: '4px 8px', height: 'auto', whiteSpace: 'nowrap' }}
                    >
                      生成报告
                    </Button>
                  ),
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
                  agent.nextRunTime ? (
                    <Button 
                      type="link" 
                      icon={<ClockCircleOutlined />}
                      onClick={() => handleViewReport(agent)}
                      disabled={agent.status !== 'enabled'}
                      style={{ fontSize: '12px', padding: '4px 8px', height: 'auto', whiteSpace: 'nowrap' }}
                    >
                      查看报告
                    </Button>
                  ) : (
                    <Button 
                      type="link" 
                      icon={<DeleteOutlined />}
                      disabled={agent.status !== 'enabled'}
                      style={{ fontSize: '12px', padding: '4px 8px', height: 'auto' }}
                    >
                      停用
                    </Button>
                  )
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
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 8 }}>
                    <strong>所需数据：</strong>{agent.requiredData}
                  </Paragraph>
                  {agent.nextRunTime && (
                    <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 0 }}>
                      <strong>最近运行：</strong>{agent.nextRunTime}
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

      <Modal
        title="选择预测报告时间范围"
        open={reportModalVisible}
        onOk={handleReportModalOk}
        onCancel={() => setReportModalVisible(false)}
      >
        <Form form={reportForm}>
          <Form.Item
            name="dateRange"
            label="预测时间范围"
            rules={[{ required: true, message: '请选择预测时间范围' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="granularity"
            label="预测粒度"
            rules={[{ required: true, message: '请选择预测粒度' }]}
          >
            <Select>
              <Select.Option value="day">按天</Select.Option>
              <Select.Option value="week">按周</Select.Option>
              <Select.Option value="month">按月</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="confidenceLevel"
            label="置信度"
            rules={[{ required: true, message: '请选择置信度' }]}
          >
            <Select>
              <Select.Option value="0.90">90%</Select.Option>
              <Select.Option value="0.95">95%</Select.Option>
              <Select.Option value="0.99">99%</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PredictionAgentMarket;