import React from 'react';
import { Card, Table, Row, Col, Statistic, Alert, Tag } from 'antd';

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

const AlertOverview: React.FC = () => {
  // 告警概览数据
  const alertOverview = {
    total: 24,
    critical: 5,
    major: 8,
    minor: 11,
    todayNew: 15,
    unprocessed: 8
  };

  const alertColumns = [
    { title: '告警ID', dataIndex: 'id', key: 'id' },
    { title: '告警内容', dataIndex: 'content', key: 'content' },
    {
      title: '严重等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const levelConfig = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'blue', text: '低' }
        };
        return <Tag color={levelConfig[level].color}>{levelConfig[level].text}</Tag>;
      }
    },
    { title: '触发时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          unprocessed: { status: 'error', text: '未处理' },
          processing: { status: 'processing', text: '处理中' },
          resolved: { status: 'success', text: '已解决' },
          ignored: { status: 'default', text: '已忽略' }
        };
        return <Badge status={statusConfig[status].status} text={statusConfig[status].text} />;
      }
    },
    { title: '触发Agent', dataIndex: 'agentName', key: 'agentName' },
    { title: '推送渠道', dataIndex: 'channel', key: 'channel' },
    {
      title: '推送对象',
      dataIndex: 'receivers',
      key: 'receivers',
      render: (receivers: string[]) => receivers.join(', ')
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertRecord) => (
        <Space>
          <Button size="small" type="link" onClick={() => handleViewDetail(record)}>查看</Button>
          <Button size="small" type="link" onClick={() => handleProcessAlert(record)}>处理</Button>
        </Space>
      )
    }
  ];

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

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="告警趋势">
            {/* 这里添加趋势图表组件 */}
            <div style={{ height: 300 }}>告警趋势图</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="告警类型分布">
            {/* 这里添加分布图表组件 */}
            <div style={{ height: 300 }}>告警类型分布图</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AlertOverview;