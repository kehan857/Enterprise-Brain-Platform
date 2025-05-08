import React, { useState } from 'react';
import { Card, Typography, Tabs, Row, Col, Button, Tag, Modal, Form, Select, message, Spin, DatePicker } from 'antd';
import { PlayCircleOutlined, SettingOutlined, EyeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface AgentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'not_enabled' | 'checking' | 'enabled' | 'failed' | 'running';
  lastReportTime?: string;
}

const mockAgents: AgentItem[] = [
  {
    id: '1',
    name: '销售漏斗转化分析 Agent',
    description: '分析销售流程各阶段的转化率，识别关键流失节点，提供优化建议。',
    category: '营销',
    status: 'not_enabled'
  },
  {
    id: '2',
    name: '设备 OEE 根因分析 Agent',
    description: '分析设备整体效率(OEE)的影响因素，识别性能损失主要原因。',
    category: '生产',
    status: 'enabled',
    lastReportTime: '2024-01-20 14:30'
  },
  {
    id: '3',
    name: '员工流失风险分析 Agent',
    description: '基于多维度数据分析员工流失风险，提供预警和干预建议。',
    category: '人事',
    status: 'running'
  },
  {
    id: '4',
    name: '财务异常交易检测 Agent',
    description: '实时监控财务交易数据，识别可疑异常交易，防范财务风险。',
    category: '财务',
    status: 'enabled',
    lastReportTime: '2024-01-21 09:15'
  },
  {
    id: '5',
    name: '产品质量预测 Agent',
    description: '基于历史质检数据，预测产品质量问题，提前预警和干预。',
    category: '质控',
    status: 'checking'
  },
  {
    id: '6',
    name: '研发进度监控 Agent',
    description: '监控研发项目进度，分析延期风险，提供进度优化建议。',
    category: '研发',
    status: 'not_enabled'
  },
  {
    id: '7',
    name: '经营决策助手 Agent',
    description: '整合多维度经营数据，提供决策建议和风险预警。',
    category: '经营',
    status: 'enabled',
    lastReportTime: '2024-01-21 10:00'
  }
];

const categories = ['经营', '营销', '生产', '质控', '研发', '财务', '人事'];

const getStatusTag = (status: AgentItem['status']) => {
  const statusConfig = {
    not_enabled: { color: 'default', text: '未启用' },
    checking: { color: 'processing', text: '检查中' },
    enabled: { color: 'success', text: '已启用' },
    failed: { color: 'error', text: '启动失败' },
    running: { color: 'processing', text: '运行中' }
  };
  const config = statusConfig[status];
  return <Tag color={config.color}>{config.text}</Tag>;
};

const AgentMarket: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [periodModalVisible, setPeriodModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentItem | null>(null);
  const [form] = Form.useForm();
  const [reportForm] = Form.useForm();

  const handleEnableAgent = (agent: AgentItem) => {
    message.loading({ content: '正在检查数据接入状态...', key: 'enableAgent' });
    // 模拟数据检查过程
    setTimeout(() => {
      message.success({ content: '智能体启动成功', key: 'enableAgent' });
    }, 2000);
  };

  const handleGenerateReport = (agent: AgentItem) => {
    setSelectedAgent(agent);
    setReportModalVisible(true);
  };

  const handlePeriodModalOk = () => {
    form.validateFields().then(values => {
      message.success('定期报告配置成功');
      setPeriodModalVisible(false);
      form.resetFields();
    });
  };

  const handleReportModalOk = () => {
    reportForm.validateFields().then(values => {
      message.loading({ content: '报告生成中...', key: 'generateReport' });
      // 模拟报告生成过程
      setTimeout(() => {
        message.success({ content: '报告生成成功', key: 'generateReport' });
        setReportModalVisible(false);
        reportForm.resetFields();
      }, 2000);
    });
  };

  const handleSetPeriod = (agent: AgentItem) => {
    setSelectedAgent(agent);
    setPeriodModalVisible(true);
  };

  const handleViewReport = (agent: AgentItem) => {
    // 跳转到智能分析中心-分析报告模块，带上agent的id作为参数
    navigate(`/analysis-report?agentId=${agent.id}&agentName=${encodeURIComponent(agent.name)}`);
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
        <Title level={4}>Agent市场</Title>
        <Paragraph>
          浏览和管理预置的智能分析Agent，快速获取业务洞察。
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
                  height: '280px',
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
                    onClick={() => handleSetPeriod(agent)}
                    disabled={agent.status !== 'enabled'}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto', whiteSpace: 'nowrap' }}
                  >
                    设置周期
                  </Button>,
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />}
                    onClick={() => handleViewReport(agent)}
                    disabled={!agent.lastReportTime}
                    style={{ fontSize: '12px', padding: '4px 8px', height: 'auto', whiteSpace: 'nowrap' }}
                  >
                    查看报告
                  </Button>
                ]}
              >
                <div style={{ flex: 1 }}>
                  <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 16 }}>
                    {agent.description}
                  </Paragraph>
                </div>
                {agent.lastReportTime && (
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 0 }}>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    最近报告: {agent.lastReportTime}
                  </Paragraph>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        title="设置定期报告"
        open={periodModalVisible}
        onOk={handlePeriodModalOk}
        onCancel={() => setPeriodModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            name="period"
            label="生成周期"
            rules={[{ required: true, message: '请选择生成周期' }]}
          >
            <Select>
              <Select.Option value="daily">每日</Select.Option>
              <Select.Option value="weekly">每周一</Select.Option>
              <Select.Option value="monthly">每月1号</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="statPeriod"
            label="统计周期"
            rules={[{ required: true, message: '请选择统计周期' }]}
          >
            <Select>
              <Select.Option value="last_week">近一周</Select.Option>
              <Select.Option value="last_month">近一个月</Select.Option>
              <Select.Option value="last_quarter">近一季度</Select.Option>
              <Select.Option value="last_year">近一年</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="选择报告统计周期"
        open={reportModalVisible}
        onOk={handleReportModalOk}
        onCancel={() => setReportModalVisible(false)}
      >
        <Form form={reportForm}>
          <Form.Item
            name="dateRange"
            label="统计日期范围"
            rules={[{ required: true, message: '请选择统计日期范围' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="granularity"
            label="数据粒度"
            rules={[{ required: true, message: '请选择数据粒度' }]}
          >
            <Select>
              <Select.Option value="day">按天</Select.Option>
              <Select.Option value="week">按周</Select.Option>
              <Select.Option value="month">按月</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AgentMarket;