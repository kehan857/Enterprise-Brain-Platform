import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Button, Space, Tag, Badge, Modal, Form, Input, Select, Tabs, Alert } from 'antd';
import { WarningOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: string;
  status: 'active' | 'inactive';
  createTime: string;
}

interface AlertRecord {
  id: string;
  title: string;
  level: 'high' | 'medium' | 'low';
  source: string;
  status: 'unprocessed' | 'processing' | 'resolved';
  createTime: string;
  handler?: string;
  handleTime?: string;
  solution?: string;
}

const { TabPane } = Tabs;

const AlertCenter: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // 告警统计数据
  const statistics = {
    total: 10,
    unprocessed: 3,
    processing: 2,
    resolved: 5
  };

  // 告警规则列表
  const ruleColumns: ColumnsType<AlertRule> = [
    { title: '规则名称', dataIndex: 'name', key: 'name' },
    { title: '规则类型', dataIndex: 'type', key: 'type' },
    { 
      title: '告警条件', 
      dataIndex: 'condition', 
      key: 'condition',
      render: (condition: string) => (
        <Tag color="blue">{condition}</Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '停用'}
        </Tag>
      ),
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  ];

  // 告警记录列表
  const recordColumns: ColumnsType<AlertRecord> = [
    { title: '告警标题', dataIndex: 'title', key: 'title' },
    {
      title: '告警级别',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const config = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'blue', text: '低' },
        };
        return <Tag color={config[level].color}>{config[level].text}</Tag>;
      },
    },
    { title: '告警来源', dataIndex: 'source', key: 'source' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          unprocessed: { status: 'error', text: '未处理' },
          processing: { status: 'processing', text: '处理中' },
          resolved: { status: 'success', text: '已解决' },
        };
        return <Badge status={config[status].status} text={config[status].text} />;
      },
    },
    { title: '告警时间', dataIndex: 'createTime', key: 'createTime' },
    { title: '处理人', dataIndex: 'handler', key: 'handler' },
    { title: '处理时间', dataIndex: 'handleTime', key: 'handleTime' }
  ];

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="告警概览" key="overview">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="总告警数" 
                  value={statistics.total} 
                  prefix={<WarningOutlined />} 
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="未处理" 
                  value={statistics.unprocessed} 
                  valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="处理中" 
                  value={statistics.processing} 
                  prefix={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic 
                  title="已解决" 
                  value={statistics.resolved} 
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
          </Row>
          <Card 
            title="最近告警" 
            style={{ marginTop: 16 }}
            extra={<Button type="link" onClick={() => setActiveTab('list')}>查看全部</Button>}
          >
            <Alert
              message="智能告警提示"
              description="系统检测到最近30分钟内CPU使用率呈上升趋势，预计1小时内可能超过阈值，建议提前关注。"
              type="warning"
              showIcon
            />
            <Table 
              columns={recordColumns} 
              dataSource={[]} 
              style={{ marginTop: 16 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="告警规则" key="rules">
          <Card
            title="告警规则配置"
            extra={
              <Button type="primary">新建规则</Button>
            }
          >
            <Table columns={ruleColumns} dataSource={[]} />
          </Card>
        </TabPane>

        <TabPane tab="告警列表" key="list">
          <Card title="告警记录">
            <Table columns={recordColumns} dataSource={[]} />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AlertCenter;