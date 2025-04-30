import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Select, Input, DatePicker, Space, Tag, message } from 'antd';
import type { PredictionTask, PredictionResult } from './types';

const PredictionCenter: React.FC = () => {
  const [tasks, setTasks] = useState<PredictionTask[]>([]);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取预测任务列表
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/prediction/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      message.error('获取预测任务失败');
    }
  };

  // 获取预测结果列表
  const fetchResults = async () => {
    try {
      const response = await fetch('/api/prediction/results');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      message.error('获取预测结果失败');
    }
  };

  // 创建新的预测任务
  const handleCreateTask = async (values: any) => {
    try {
      await fetch('/api/prediction/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      message.success('创建预测任务成功');
      setIsModalVisible(false);
      form.resetFields();
      fetchTasks();
    } catch (error) {
      message.error('创建预测任务失败');
    }
  };

  // 手动触发预测任务
  const handleRunTask = async (taskId: string) => {
    try {
      await fetch(`/api/prediction/tasks/${taskId}/run`, { method: 'POST' });
      message.success('触发预测任务成功');
      fetchResults();
    } catch (error) {
      message.error('触发预测任务失败');
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchResults();
  }, []);

  const taskColumns = [
    { title: '任务名称', dataIndex: 'name', key: 'name' },
    { title: 'Agent类型', dataIndex: 'agentType', key: 'agentType' },
    { title: '预测目标', dataIndex: 'target', key: 'target' },
    { title: '运行周期', dataIndex: 'schedule', key: 'schedule' },
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
      render: (_: any, record: PredictionTask) => (
        <Space>
          <Button type="link" onClick={() => handleRunTask(record.id)}>
            执行
          </Button>
          <Button type="link">编辑</Button>
          <Button type="link" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const resultColumns = [
    { title: '预测时间', dataIndex: 'timestamp', key: 'timestamp' },
    { title: '任务名称', dataIndex: 'taskName', key: 'taskName' },
    { title: '预测结果', dataIndex: 'result', key: 'result' },
    { title: '置信度', dataIndex: 'confidence', key: 'confidence' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'success' ? 'green' : 'red'}>
          {status === 'success' ? '成功' : '失败'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PredictionResult) => (
        <Space>
          <Button type="link">查看详情</Button>
          <Button type="link">导出</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="预测任务管理"
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            新建预测任务
          </Button>
        }
        style={{ marginBottom: 24 }}
      >
        <Table columns={taskColumns} dataSource={tasks} />
      </Card>

      <Card title="预测结果">
        <Table columns={resultColumns} dataSource={results} />
      </Card>

      <Modal
        title="新建预测任务"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleCreateTask} layout="vertical">
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>

          <Form.Item
            name="agentType"
            label="Agent类型"
            rules={[{ required: true, message: '请选择Agent类型' }]}
          >
            <Select placeholder="请选择Agent类型">
              <Select.Option value="failure">故障预测</Select.Option>
              <Select.Option value="demand">需求预测</Select.Option>
              <Select.Option value="quality">质量预测</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="target"
            label="预测目标"
            rules={[{ required: true, message: '请输入预测目标' }]}
          >
            <Input.TextArea placeholder="请输入预测目标描述" />
          </Form.Item>

          <Form.Item
            name="timeRange"
            label="预测时间范围"
            rules={[{ required: true, message: '请选择预测时间范围' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="schedule"
            label="运行周期"
            rules={[{ required: true, message: '请选择运行周期' }]}
          >
            <Select placeholder="请选择运行周期">
              <Select.Option value="manual">手动触发</Select.Option>
              <Select.Option value="daily">每日</Select.Option>
              <Select.Option value="weekly">每周</Select.Option>
              <Select.Option value="monthly">每月</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PredictionCenter;