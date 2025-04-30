import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Select, Input, Space, Tag, message } from 'antd';
import type { AlertRule, AlertRecord } from './types';

const AlertCenter: React.FC = () => {
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [alertRecords, setAlertRecords] = useState<AlertRecord[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取告警规则列表
  const fetchAlertRules = async () => {
    try {
      // TODO: 调用后端API获取告警规则列表
      const response = await fetch('/api/alert/rules');
      const data = await response.json();
      setAlertRules(data);
    } catch (error) {
      message.error('获取告警规则失败');
    }
  };

  // 获取告警记录列表
  const fetchAlertRecords = async () => {
    try {
      // TODO: 调用后端API获取告警记录列表
      const response = await fetch('/api/alert/records');
      const data = await response.json();
      setAlertRecords(data);
    } catch (error) {
      message.error('获取告警记录失败');
    }
  };

  // 创建新的告警规则
  const handleCreateRule = async (values: any) => {
    try {
      // TODO: 调用后端API创建告警规则
      await fetch('/api/alert/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('创建告警规则成功');
      setIsModalVisible(false);
      form.resetFields();
      fetchAlertRules();
    } catch (error) {
      message.error('创建告警规则失败');
    }
  };

  // 处理告警
  const handleAlertAction = async (record: AlertRecord, action: string) => {
    try {
      // TODO: 调用后端API处理告警
      await fetch(`/api/alert/records/${record.id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      message.success('处理告警成功');
      fetchAlertRecords();
    } catch (error) {
      message.error('处理告警失败');
    }
  };

  useEffect(() => {
    fetchAlertRules();
    fetchAlertRecords();
  }, []);

  const ruleColumns = [
    { title: '规则名称', dataIndex: 'name', key: 'name' },
    { title: 'Agent类型', dataIndex: 'agentType', key: 'agentType' },
    { title: '触发条件', dataIndex: 'condition', key: 'condition' },
    { title: '严重程度', dataIndex: 'severity', key: 'severity' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertRule) => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const recordColumns = [
    { title: '告警时间', dataIndex: 'timestamp', key: 'timestamp' },
    { title: '告警内容', dataIndex: 'content', key: 'content' },
    { title: '严重程度', dataIndex: 'severity', key: 'severity' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'unresolved' ? 'red' : 'green'}>
          {status === 'unresolved' ? '未处理' : '已处理'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertRecord) => (
        <Space>
          <Button
            type="link"
            onClick={() => handleAlertAction(record, 'acknowledge')}
          >
            确认
          </Button>
          <Button
            type="link"
            onClick={() => handleAlertAction(record, 'resolve')}
          >
            解决
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="告警规则管理"
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            新建告警规则
          </Button>
        }
        style={{ marginBottom: 24 }}
      >
        <Table columns={ruleColumns} dataSource={alertRules} />
      </Card>

      <Card title="告警记录">
        <Table columns={recordColumns} dataSource={alertRecords} />
      </Card>

      <Modal
        title="新建告警规则"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleCreateRule} layout="vertical">
          <Form.Item
            name="name"
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>

          <Form.Item
            name="agentType"
            label="Agent类型"
            rules={[{ required: true, message: '请选择Agent类型' }]}
          >
            <Select placeholder="请选择Agent类型">
              <Select.Option value="threshold">阈值告警</Select.Option>
              <Select.Option value="anomaly">异常检测</Select.Option>
              <Select.Option value="trend">趋势告警</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="condition"
            label="触发条件"
            rules={[{ required: true, message: '请输入触发条件' }]}
          >
            <Input.TextArea placeholder="请输入触发条件" />
          </Form.Item>

          <Form.Item
            name="severity"
            label="严重程度"
            rules={[{ required: true, message: '请选择严重程度' }]}
          >
            <Select placeholder="请选择严重程度">
              <Select.Option value="high">高</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="low">低</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlertCenter;