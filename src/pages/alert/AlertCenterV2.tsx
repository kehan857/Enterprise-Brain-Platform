import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Select, Input, Space, Tag, Tabs, InputNumber, Spin, message, Row, Col, Statistic, Alert, Badge } from 'antd';
import { PlusOutlined, CheckCircleOutlined, LoadingOutlined, WarningOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

interface AlertAgent {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
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
  title: string;
  content: string;
  level: 'high' | 'medium' | 'low';
  source: string;
  status: 'unprocessed' | 'processing' | 'resolved' | 'ignored';
  createTime: string;
  handler?: string;
  handleTime?: string;
  agentName: string;
  channel: string;
  receivers: string[];
}

const { TabPane } = Tabs;

// 添加引用指标示例数据
const mockReferenceIndicators = [
  {
    id: 'FIN_101',
    name: '流动资产负债率',
    domain: 'finance / banking',
    type: '财务',
    unit: '%',
    description: '反映企业流动资产的负债水平'
  },
  {
    id: 'FIN_102',
    name: '非流动资产负债率',
    domain: 'finance / banking',
    type: '财务',
    unit: '%',
    description: '衡量企业非流动资产的负债程度'
  },
  {
    id: 'FIN_103',
    name: '有形资产负债率',
    domain: 'finance / banking',
    type: '财务',
    unit: '%',
    description: '不含无形资产的负债率计算'
  },
  {
    id: 'FIN_104',
    name: '资本负债率',
    domain: 'finance / banking',
    type: '财务',
    unit: '%',
    description: '反映企业长期偿债能力的指标'
  },
  {
    id: 'FIN_105',
    name: '行业平均资产负债率',
    domain: 'finance / banking',
    type: '财务',
    unit: '%',
    description: '用于对标行业平均水平'
  }
];

const AlertCenterV2: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AlertAgent | null>(null);
  const [form] = Form.useForm();

  // 告警概览数据
  const alertOverview = {
    total: 24,
    critical: 5,
    major: 8,
    minor: 11,
    todayNew: 15,
    unprocessed: 8
  };

  // 渲染告警概览
  const renderOverview = () => (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="当前活动告警总数" value={alertOverview.total} />
            <div style={{ marginTop: 16 }}>
              <Tag color="red">高: {alertOverview.critical}</Tag>
              <Tag color="orange">中: {alertOverview.major}</Tag>
              <Tag color="blue">低: {alertOverview.minor}</Tag>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="今日新增告警" value={alertOverview.todayNew} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="待处理告警" value={alertOverview.unprocessed} />
          </Card>
        </Col>
      </Row>

      <Card title="关键告警列表" style={{ marginTop: 16 }}>
        <Alert
          message="智能预警提示"
          description="系统检测到生产线A的OEE指标呈下降趋势，预计2小时内可能低于预警阈值，建议提前关注。"
          type="warning"
          showIcon
        />
        <Table
          columns={alertColumns}
          dataSource={[]}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );

  // Agent市场列表列定义
  const agentColumns = [
    { title: 'Agent名称', dataIndex: 'name', key: 'name' },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
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
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: AlertAgent['status']) => {
        const statusConfig = {
          uninitialized: { color: 'default' as const, text: '未初始化' },
          checking: { color: 'processing' as const, text: '检查中' },
          failed: { color: 'error' as const, text: '启动失败' },
          active: { color: 'success' as const, text: '运行中' }
        };
        return <Badge status={statusConfig[status].color} text={statusConfig[status].text} />;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertAgent) => {
        const isActive = record.status === 'active';
        return (
          <Space>
            {!isActive && <Button type="primary" size="small" onClick={() => handleEnableAgent(record)}>启用</Button>}
            {isActive && (
              <>
                <Button size="small" onClick={() => handleEditNotification(record)}>配置通知</Button>
                <Button size="small" danger onClick={() => handleDisableAgent(record)}>禁用</Button>
              </>
            )}
          </Space>
        );
      }
    }
  ];

  // 告警列表列定义
  const alertColumns = [
    { title: '告警ID', dataIndex: 'id', key: 'id' },
    { title: '告警内容', dataIndex: 'content', key: 'content' },
    {
      title: '严重等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const levelConfig: Record<string, { color: string; text: string }> = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'blue', text: '低' }
        };
        return <Tag color={levelConfig[level]?.color || 'default'}>{levelConfig[level]?.text || level}</Tag>;
      }
    },
    { title: '触发时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig: Record<string, { status: string; text: string }> = {
          unprocessed: { status: 'error', text: '未处理' },
          processing: { status: 'processing', text: '处理中' },
          resolved: { status: 'success', text: '已解决' },
          ignored: { status: 'default', text: '已忽略' }
        };
        return <Badge status={statusConfig[status]?.status as any || 'default'} text={statusConfig[status]?.text || status} />;
      }
    },
    { title: '触发Agent', dataIndex: 'agentName', key: 'agentName' },
    { title: '推送渠道', dataIndex: 'channel', key: 'channel' },
    {
      title: '推送对象',
      dataIndex: 'receivers',
      key: 'receivers',
      render: (receivers: string[]) => receivers.join(', ')
    }
  ];

  // 启用Agent
  const handleEnableAgent = async (agent: AlertAgent) => {
    setSelectedAgent({ ...agent, status: 'checking' });
    // TODO: 实现Agent启用逻辑
    message.success('Agent启用成功');
  };

  // 禁用Agent
  const handleDisableAgent = (agent: AlertAgent) => {
    // TODO: 实现Agent禁用逻辑
    message.success('Agent已禁用');
  };

  // 编辑通知配置
  const handleEditNotification = (agent: AlertAgent) => {
    setSelectedAgent(agent);
    setIsNotificationModalVisible(true);
  };

  // 查看告警详情
  const handleViewDetail = (record: AlertRecord) => {
    // TODO: 实现查看详情逻辑
  };

  // 处理告警
  const handleProcessAlert = (record: AlertRecord) => {
    // TODO: 实现处理告警逻辑
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="告警概览" key="overview">
          {renderOverview()}
        </TabPane>
        
        <TabPane tab="告警列表" key="list">
          <Card>
            <Table
              columns={alertColumns}
              dataSource={[]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Agent市场" key="market">
          <Card
            title="告警Agent市场"
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAgentModalVisible(true)}>
                添加Agent
              </Button>
            }
          >
            <Table
              columns={agentColumns}
              dataSource={[]}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Agent配置弹窗 */}
      <Modal
        title="配置通知策略"
        open={isNotificationModalVisible}
        onOk={form.submit}
        onCancel={() => setIsNotificationModalVisible(false)}
      >
        <Form form={form}>
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
    </div>
  );
};

export default AlertCenterV2;