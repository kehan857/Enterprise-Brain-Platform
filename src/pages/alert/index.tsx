import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Select, Input, Space, Tag, Tabs, InputNumber, Spin, message, Row, Col, Statistic } from 'antd';
import { PlusOutlined, CheckCircleOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

interface AlertAgent {
  id: string;
  name: string;
  type: string;
  description: string;
  requiredData: {
    dataSource: string;
    metrics: string[];
    updateFrequency: string;
  };
  status: 'uninitialized' | 'checking' | 'failed' | 'active';
  notificationConfig?: {
    frequency: string;
    channels: string[];
    receivers: string[];
    template?: string;
  };
}

interface AlertRecord {
  id: string;
  agentName: string;
  target: string;
  value: number;
  timestamp: string;
  severity: string;
  status: string;
  channel: string;
  receivers: string[];
}

const AlertCenter: React.FC = () => {
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AlertAgent | null>(null);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 启用Agent
  const handleEnableAgent = async (agent: AlertAgent) => {
    setSelectedAgent({ ...agent, status: 'checking' });
    
    // 模拟数据检查过程
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const checkResult = Math.random() > 0.3; // 模拟70%成功率
      
      if (checkResult) {
        setSelectedAgent({ ...agent, status: 'active' });
        setIsNotificationModalVisible(true);
        message.success('Agent启动成功！请配置通知策略');
      } else {
        setSelectedAgent({ ...agent, status: 'failed' });
        message.error('Agent启动失败：所需数据未接入或配置不完整');
      }
    } catch (error) {
      setSelectedAgent({ ...agent, status: 'failed' });
      message.error('Agent启动过程发生错误');
    }
  };

  // 禁用Agent
  const handleDisableAgent = (agent: AlertAgent) => {
    setSelectedAgent({ ...agent, status: 'uninitialized' });
    message.success('Agent已禁用');
  };

  // 编辑通知配置
  const handleEditNotification = (agent: AlertAgent) => {
    setSelectedAgent(agent);
    setIsNotificationModalVisible(true);
  };

  // 保存通知配置
  const handleSaveNotification = async (values: any) => {
    if (selectedAgent) {
      setSelectedAgent({
        ...selectedAgent,
        notificationConfig: values,
      });
      setIsNotificationModalVisible(false);
      message.success('通知配置已保存');
    }
  };

  // 渲染告警概览
  const renderOverview = () => (
    <Card>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="总告警数" value={alertOverview.total} />
        </Col>
        <Col span={6}>
          <Statistic title="严重告警" value={alertOverview.critical} valueStyle={{ color: '#cf1322' }} />
        </Col>
        <Col span={6}>
          <Statistic title="重要告警" value={alertOverview.major} valueStyle={{ color: '#fa8c16' }} />
        </Col>
        <Col span={6}>
          <Statistic title="一般告警" value={alertOverview.minor} valueStyle={{ color: '#faad14' }} />
        </Col>
      </Row>
    </Card>
  );

  // 渲染Agent管理
  const renderAgentManagement = () => (
    <Card
      title="告警Agent管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAgentModalVisible(true)}>
          添加告警Agent
        </Button>
      }
    >
      <Table columns={agentColumns} dataSource={[]} />
    </Card>
  );

  // 渲染告警列表
  const renderAlertList = () => (
    <Card title="告警列表">
      <Table columns={alertColumns} dataSource={[]} />
    </Card>
  );

  // 渲染通知配置模态框
  const renderNotificationModal = () => (
    <Modal
      title="配置通知策略"
      open={isNotificationModalVisible}
      onOk={form.submit}
      onCancel={() => setIsNotificationModalVisible(false)}
    >
      <Form form={form} onFinish={handleSaveNotification}>
        <Form.Item name="frequency" label="告警频率">
          <Select>
            <Select.Option value="immediate">立即通知</Select.Option>
            <Select.Option value="1h">相同告警1小时内只通知一次</Select.Option>
            <Select.Option value="1d">相同告警1天内只通知一次</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="channels" label="通知渠道" rules={[{ required: true }]}>
          <Select mode="multiple">
            <Select.Option value="dingtalk">钉钉</Select.Option>
            <Select.Option value="wecom">企业微信</Select.Option>
            <Select.Option value="email">邮件</Select.Option>
            <Select.Option value="sms">短信</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="receivers" label="接收人/群组" rules={[{ required: true }]}>
          <Select mode="multiple">
            <Select.Option value="group1">运维组</Select.Option>
            <Select.Option value="group2">质量组</Select.Option>
            <Select.Option value="user1">张三</Select.Option>
            <Select.Option value="user2">李四</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );

  // 告警概览数据
  const alertOverview = {
    total: 24,
    critical: 5,
    major: 8,
    minor: 11,
  };

  // Agent列表
  const agentColumns = [
    { title: 'Agent名称', dataIndex: 'name', key: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          oee: 'OEE低于阈值告警',
          device: '设备离线告警',
          inventory: '库存安全水位告警',
        };
        return <Tag color="blue">{typeMap[type] || type}</Tag>;
      },
    },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '所需数据',
      dataIndex: 'requiredData',
      key: 'requiredData',
      render: (data: AlertAgent['requiredData']) => (
        <div>
          <div>数据源: {data.dataSource}</div>
          <div>指标: {data.metrics.join(', ')}</div>
          <div>更新频率: {data.updateFrequency}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: AlertAgent['status']) => {
        const statusMap = {
          uninitialized: { color: 'default', text: '未启用', icon: null },
          checking: { color: 'processing', text: '检查中', icon: <LoadingOutlined /> },
          failed: { color: 'error', text: '启动失败', icon: <WarningOutlined /> },
          active: { color: 'success', text: '已启用', icon: <CheckCircleOutlined /> },
        };
        const config = statusMap[status];
        return (
          <Tag icon={config.icon} color={config.color}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: '通知配置',
      dataIndex: 'notificationConfig',
      key: 'notificationConfig',
      render: (config: AlertAgent['notificationConfig']) => (
        config ? (
          <div>
            <div>频率: {config.frequency}</div>
            <div>渠道: {config.channels.join(', ')}</div>
            <div>接收人: {config.receivers.join(', ')}</div>
          </div>
        ) : '-'
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertAgent) => {
        if (record.status === 'active') {
          return (
            <Space size="middle">
              <Button type="link" onClick={() => handleEditNotification(record)}>编辑通知</Button>
              <Button type="link" danger onClick={() => handleDisableAgent(record)}>禁用</Button>
            </Space>
          );
        }
        return (
          <Button type="link" onClick={() => handleEnableAgent(record)}>
            启用
          </Button>
        );
      },
    },
  ];

  // 告警记录列表
  const alertColumns = [
    { title: '告警时间', dataIndex: 'timestamp', key: 'timestamp' },
    { title: '触发Agent', dataIndex: 'agentName', key: 'agentName' },
    { title: '监控对象', dataIndex: 'target', key: 'target' },
    { title: '告警内容', dataIndex: 'value', key: 'value' },
    {
      title: '严重等级',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const colorMap = {
          critical: 'red',
          major: 'orange',
          minor: 'yellow',
        };
        return <Tag color={colorMap[severity]}>{severity.toUpperCase()}</Tag>;
      },
    },
    {
      title: '推送渠道',
      dataIndex: 'channel',
      key: 'channel',
      render: (channel: string) => <Tag>{channel}</Tag>,
    },
    {
      title: '推送对象',
      dataIndex: 'receivers',
      key: 'receivers',
      render: (receivers: string[]) => receivers.join(', '),
    },
    { title: '当前值', dataIndex: 'value', key: 'value' },
    {
      title: '严重等级',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const colorMap = {
          critical: 'red',
          major: 'orange',
          minor: 'yellow',
        };
        return <Tag color={colorMap[severity]}>{severity.toUpperCase()}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          active: { text: '未处理', color: 'red' },
          acknowledged: { text: '已确认', color: 'orange' },
          resolved: { text: '已解决', color: 'green' },
        };
        const { text, color } = statusMap[status] || {};
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertRecord) => (
        <Space size="middle">
          <Button type="link">确认</Button>
          <Button type="link">处理</Button>
          <Button type="link">忽略</Button>
        </Space>
      ),
    },
  ];

  // 告警规则列表
  const ruleColumns = [
    { title: '规则名称', dataIndex: 'name', key: 'name' },
    {
      title: '告警类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          threshold: '指标阈值告警',
          offline: '设备离线告警',
          anomaly: '异常检测告警',
        };
        return <Tag color="blue">{typeMap[type] || type}</Tag>;
      },
    },
    { title: '监控对象', dataIndex: 'target', key: 'target' },
    {
      title: '触发条件',
      dataIndex: 'condition',
      key: 'condition',
      render: (condition: { metric: string; operator: string; threshold: number }) => (
        `${condition.metric} ${condition.operator} ${condition.threshold}`
      ),
    },
    {
      title: '严重等级',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const colorMap = {
          critical: 'red',
          major: 'orange',
          minor: 'yellow',
        };
        return <Tag color={colorMap[severity]}>{severity.toUpperCase()}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: 'overview',
      label: '告警概览',
      children: (
        <div style={{ marginBottom: 16 }}>
          <Card title="告警统计">
            {/* 这里可以添加统计图表组件 */}
            <div>告警趋势图</div>
          </Card>
        </div>
      ),
    },
    {
      key: 'rules',
      label: '告警规则',
      children: (
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsRuleModalVisible(true)}
            style={{ marginBottom: 16 }}
          >
            新建告警规则
          </Button>
          <Table columns={ruleColumns} />
        </div>
      ),
    },
    {
      key: 'alerts',
      label: '告警列表',
      children: (
        <div>
          <Table columns={alertColumns} />
        </div>
      ),
    },
  ];

  const handleCreateRule = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      setIsRuleModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Tabs defaultActiveKey="overview" items={items} />

      <Modal
        title="新建告警规则"
        open={isRuleModalVisible}
        onOk={handleCreateRule}
        onCancel={() => {
          setIsRuleModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>

          <Form.Item
            name="type"
            label="告警类型"
            rules={[{ required: true, message: '请选择告警类型' }]}
          >
            <Select>
              <Select.Option value="threshold">指标阈值告警</Select.Option>
              <Select.Option value="offline">设备离线告警</Select.Option>
              <Select.Option value="anomaly">异常检测告警</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="target"
            label="监控对象"
            rules={[{ required: true, message: '请选择监控对象' }]}
          >
            <Select>
              <Select.Option value="device_1">设备1</Select.Option>
              <Select.Option value="device_2">设备2</Select.Option>
              <Select.Option value="system_1">系统1</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={['condition', 'metric']}
            label="监控指标"
            rules={[{ required: true, message: '请选择监控指标' }]}
          >
            <Select>
              <Select.Option value="cpu_usage">CPU使用率</Select.Option>
              <Select.Option value="memory_usage">内存使用率</Select.Option>
              <Select.Option value="temperature">温度</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={['condition', 'operator']}
            label="触发条件"
            rules={[{ required: true, message: '请选择触发条件' }]}
          >
            <Select>
              <Select.Option value=">">&gt;</Select.Option>
              <Select.Option value=">=">&gt;=</Select.Option>
              <Select.Option value="<">&lt;</Select.Option>
              <Select.Option value="<=">&lt;=</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={['condition', 'threshold']}
            label="阈值"
            rules={[{ required: true, message: '请输入阈值' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="severity"
            label="严重等级"
            rules={[{ required: true, message: '请选择严重等级' }]}
          >
            <Select>
              <Select.Option value="critical">严重</Select.Option>
              <Select.Option value="major">重要</Select.Option>
              <Select.Option value="minor">次要</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlertCenter;