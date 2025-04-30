import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space } from 'antd';
import { UserOutlined, ApiOutlined, CloudServerOutlined } from '@ant-design/icons';
import { Line, Gauge } from '@ant-design/plots';

// 模拟数据
const resourceUsageData = [
  { date: '2024-01-01 14:00', value: 65.2, type: 'CPU' },
  { date: '2024-01-01 14:10', value: 68.5, type: 'CPU' },
  { date: '2024-01-01 14:20', value: 62.8, type: 'CPU' },
  { date: '2024-01-01 14:00', value: 78.1, type: '内存' },
  { date: '2024-01-01 14:10', value: 75.4, type: '内存' },
  { date: '2024-01-01 14:20', value: 76.8, type: '内存' },
];

const systemEvents = [
  {
    key: '1',
    time: '2024-01-03 15:10:00',
    type: '系统事件',
    level: '警告',
    content: '系统负载超过80%',
  },
  {
    key: '2',
    time: '2024-01-03 15:05:00',
    type: '安全事件',
    level: '信息',
    content: '用户认证成功次数异常增加',
  },
];

const apiPerformance = [
  {
    key: '1',
    endpoint: '/api/data/query',
    qps: 156.8,
    latency: '125ms',
    error: '0.05%',
    status: '正常',
  },
  {
    key: '2',
    endpoint: '/api/model/predict',
    qps: 89.2,
    latency: '350ms',
    error: '0.12%',
    status: '正常',
  },
];

const SystemAdminDashboard: React.FC = () => {
  const lineConfig = {
    data: resourceUsageData,
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

  const cpuGaugeConfig = {
    percent: 0.628,
    range: {
      color: resourceUsageData[2].value > 80 ? '#ff4d4f' : '#30BF78',
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        formatter: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(1)}%`,
        style: {
          fontSize: '24px',
        },
      },
    },
  };

  const memoryGaugeConfig = {
    percent: 0.768,
    range: {
      color: resourceUsageData[5].value > 80 ? '#ff4d4f' : '#30BF78',
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        formatter: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(1)}%`,
        style: {
          fontSize: '24px',
        },
      },
    },
  };

  const eventColumns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (text: string) => {
        const color = text === '警告' ? 'warning' : text === '错误' ? 'error' : 'default';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
  ];

  const apiColumns = [
    {
      title: 'API接口',
      dataIndex: 'endpoint',
      key: 'endpoint',
    },
    {
      title: 'QPS',
      dataIndex: 'qps',
      key: 'qps',
    },
    {
      title: '平均延迟',
      dataIndex: 'latency',
      key: 'latency',
    },
    {
      title: '错误率',
      dataIndex: 'error',
      key: 'error',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        const color = text === '正常' ? 'success' : 'error';
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  return (
    <div className="system-admin-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线用户"
              value={128}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="API调用量"
              value={1826}
              prefix={<ApiOutlined style={{ color: '#52c41a' }} />}
              suffix="次/分钟"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="服务节点"
              value={8}
              prefix={<CloudServerOutlined style={{ color: '#722ed1' }} />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="系统可用性"
              value={99.98}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="资源使用趋势">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="CPU使用率">
            <Gauge {...cpuGaugeConfig} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="内存使用率">
            <Gauge {...memoryGaugeConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="API性能监控">
            <Table
              columns={apiColumns}
              dataSource={apiPerformance}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="系统事件日志">
            <Table
              columns={eventColumns}
              dataSource={systemEvents}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SystemAdminDashboard;