import React from 'react';
import { Card, Table, Row, Col, Statistic, Alert, Tag, Space, Button, Badge } from 'antd';

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

  // 示例关键告警数据
  const keyAlertData: AlertRecord[] = [
    {
      id: 'ALT-001',
      title: '生产设备异常告警',
      content: '1号生产线注塑机温度超过安全阈值15%，当前温度：217°C，预设阈值：185°C',
      level: 'high',
      source: '设备监控系统',
      status: 'unprocessed',
      createTime: '2024-04-20 08:23:45',
      agentName: '设备状态监控Agent',
      channel: '站内消息,钉钉',
      receivers: ['生产主管', '设备工程师', '车间班组']
    },
    {
      id: 'ALT-002',
      title: '质量异常告警',
      content: '近1小时内不良品率达到4.8%，超过预警阈值(3%)，主要不良类型：表面划痕(62%)',
      level: 'high',
      source: '质量检测系统',
      status: 'processing',
      createTime: '2024-04-20 09:15:30',
      handler: '李工',
      handleTime: '2024-04-20 09:20:18',
      agentName: '质量监控Agent',
      channel: '站内消息,短信',
      receivers: ['质量部主管', '车间经理']
    },
    {
      id: 'ALT-003',
      title: '原材料库存预警',
      content: '聚丙烯(PP)原材料库存量低于安全库存，当前库存：0.8吨，安全库存：2吨，预计3天后生产将受影响',
      level: 'medium',
      source: '库存管理系统',
      status: 'unprocessed',
      createTime: '2024-04-20 07:05:12',
      agentName: '库存预警Agent',
      channel: '站内消息',
      receivers: ['采购经理', '仓库主管']
    },
    {
      id: 'ALT-004',
      title: '能耗异常告警',
      content: '2号厂房24小时能耗同比增加35%，超出预期波动范围，疑似设备效率下降或能源泄漏',
      level: 'medium',
      source: '能源管理系统',
      status: 'unprocessed',
      createTime: '2024-04-20 06:30:57',
      agentName: '能源监控Agent',
      channel: '站内消息,邮件',
      receivers: ['设施管理经理', '工厂总监']
    },
    {
      id: 'ALT-005',
      title: '交期风险预警',
      content: '订单#ORD-8732的生产进度落后计划15%，预计交期将延迟2天，影响客户：ABC电子有限公司',
      level: 'high',
      source: '生产计划系统',
      status: 'unprocessed',
      createTime: '2024-04-20 09:45:22',
      agentName: '计划执行Agent',
      channel: '站内消息,钉钉',
      receivers: ['生产计划员', '销售经理', '生产主管']
    }
  ];

  const alertColumns = [
    { title: '告警ID', dataIndex: 'id', key: 'id', width: 100 },
    { 
      title: '告警内容', 
      dataIndex: 'content', 
      key: 'content',
      render: (text: string, record: AlertRecord) => (
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{record.title}</div>
          <div>{text}</div>
        </div>
      ) 
    },
    {
      title: '严重等级',
      dataIndex: 'level',
      key: 'level',
      width: 90,
      render: (level: string) => {
        const levelConfig: Record<string, { color: string; text: string }> = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'blue', text: '低' }
        };
        return <Tag color={levelConfig[level].color}>{levelConfig[level].text}</Tag>;
      }
    },
    { title: '触发时间', dataIndex: 'createTime', key: 'createTime', width: 150 },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const statusConfig: Record<string, { status: 'error' | 'processing' | 'success' | 'default' | 'warning'; text: string }> = {
          unprocessed: { status: 'error', text: '未处理' },
          processing: { status: 'processing', text: '处理中' },
          resolved: { status: 'success', text: '已解决' },
          ignored: { status: 'default', text: '已忽略' }
        };
        return <Badge status={statusConfig[status].status} text={statusConfig[status].text} />;
      }
    },
    { title: '触发Agent', dataIndex: 'agentName', key: 'agentName', width: 140 },
    { title: '推送渠道', dataIndex: 'channel', key: 'channel', width: 120 },
    {
      title: '推送对象',
      dataIndex: 'receivers',
      key: 'receivers',
      width: 150,
      render: (receivers: string[]) => receivers.join(', ')
    }
  ];

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
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={alertColumns}
          dataSource={keyAlertData}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1200 }}
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