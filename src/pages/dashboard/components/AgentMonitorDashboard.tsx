import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Bar, Line } from '@ant-design/plots';

// 模拟数据
const alertTrendData = [
  { date: '2024-01-01', value: 25, type: '预警' },
  { date: '2024-01-02', value: 18, type: '预警' },
  { date: '2024-01-03', value: 22, type: '预警' },
  { date: '2024-01-01', value: 8, type: '告警' },
  { date: '2024-01-02', value: 12, type: '告警' },
  { date: '2024-01-03', value: 10, type: '告警' },
];

const alertTypeData = [
  { type: '设备预警', value: 35 },
  { type: '质量告警', value: 28 },
  { type: '生产异常', value: 22 },
  { type: '能耗预警', value: 15 },
  { type: '安全告警', value: 10 },
];

const agentListData = [
  {
    key: '1',
    name: '设备故障预测Agent',
    type: '预测',
    status: '运行中',
    accuracy: '92.5%',
    lastRun: '2024-01-03 15:00:00',
    alerts: 12,
  },
  {
    key: '2',
    name: '质量监控Agent',
    type: '监控',
    status: '运行中',
    accuracy: '95.1%',
    lastRun: '2024-01-03 14:55:00',
    alerts: 8,
  },
];

const AgentMonitorDashboard: React.FC = () => {
  const barConfig = {
    data: alertTypeData,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: false,
    color: ['#1890ff', '#13c2c2', '#52c41a', '#faad14', '#f5222d'],
    label: {
      position: 'right',
    },
  };

  const lineConfig = {
    data: alertTrendData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    point: {
      size: 5,
      shape: 'diamond',
    },
    legend: {
      position: 'top',
    },
  };

  const columns = [
    {
      title: 'Agent名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        const color = text === '运行中' ? 'success' : 'error';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '准确率',
      dataIndex: 'accuracy',
      key: 'accuracy',
    },
    {
      title: '告警数',
      dataIndex: 'alerts',
      key: 'alerts',
    },
  ];

  return (
    <div className="agent-monitor-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃Agent数"
              value={28}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日告警数"
              value={32}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
              suffix="条"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均准确率"
              value={93.8}
              precision={1}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="成功率"
              value={99.5}
              precision={1}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="告警趋势">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="告警类型分布">
            <Bar {...barConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="Agent运行状态">
            <Table
              columns={columns}
              dataSource={agentListData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AgentMonitorDashboard;