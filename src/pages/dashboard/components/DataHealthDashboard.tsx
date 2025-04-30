import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Space, Progress } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Line, Gauge } from '@ant-design/plots';

// 模拟数据
const qualityTrendData = [
  { date: '2024-01-01', value: 98.5, type: '完整性' },
  { date: '2024-01-02', value: 97.8, type: '完整性' },
  { date: '2024-01-03', value: 98.2, type: '完整性' },
  { date: '2024-01-01', value: 96.5, type: '准确性' },
  { date: '2024-01-02', value: 97.1, type: '准确性' },
  { date: '2024-01-03', value: 96.8, type: '准确性' },
];

const dataSourceStatus = [
  {
    key: '1',
    name: 'ERP系统',
    type: '业务系统',
    status: '正常',
    latency: '2.5s',
    quality: 98.5,
    lastSync: '2024-01-03 15:10:00',
  },
  {
    key: '2',
    name: 'MES系统',
    type: '生产系统',
    status: '正常',
    latency: '1.8s',
    quality: 97.2,
    lastSync: '2024-01-03 15:08:00',
  },
];

const qualityIssues = [
  {
    key: '1',
    source: 'ERP系统',
    field: '订单编号',
    issue: '数据缺失',
    count: 15,
    time: '2024-01-03 14:30:00',
  },
  {
    key: '2',
    source: 'MES系统',
    field: '生产批次',
    issue: '格式错误',
    count: 8,
    time: '2024-01-03 14:15:00',
  },
];

const DataHealthDashboard: React.FC = () => {
  const lineConfig = {
    data: qualityTrendData,
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

  const gaugeConfig = {
    percent: 0.982,
    range: {
      color: '#30BF78',
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    axis: {
      label: {
        formatter(v: number) {
          return Number(v) * 100;
        },
      },
      subTickLine: {
        count: 3,
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

  const sourceColumns = [
    {
      title: '数据源',
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
        const color = text === '正常' ? 'success' : 'error';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '延迟',
      dataIndex: 'latency',
      key: 'latency',
    },
    {
      title: '质量评分',
      dataIndex: 'quality',
      key: 'quality',
      render: (value: number) => (
        <Progress percent={value} size="small" status={value >= 95 ? 'success' : 'exception'} />
      ),
    },
  ];

  const issueColumns = [
    {
      title: '数据源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '问题字段',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: '问题类型',
      dataIndex: 'issue',
      key: 'issue',
      render: (text: string) => <Tag color="error">{text}</Tag>,
    },
    {
      title: '影响记录数',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <div className="data-health-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="数据源连接"
              value={12}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="同步频率"
              value={5}
              prefix={<SyncOutlined style={{ color: '#1890ff' }} />}
              suffix="分钟"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均延迟"
              value={2.1}
              precision={1}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              suffix="秒"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="数据质量评分"
              value={98.2}
              precision={1}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={16}>
          <Card title="数据质量趋势">
            <Line {...lineConfig} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="当前数据健康度">
            <Gauge {...gaugeConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="数据源状态">
            <Table
              columns={sourceColumns}
              dataSource={dataSourceStatus}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="数据质量问题">
            <Table
              columns={issueColumns}
              dataSource={qualityIssues}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataHealthDashboard;