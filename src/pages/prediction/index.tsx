import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Select, Input, Space, Tag, Tabs, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { PredictionTask, PredictionResult } from './types';

const { RangePicker } = DatePicker;

const PredictionCenter: React.FC = () => {
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 预测任务列表
  const taskColumns = [
    { title: '任务名称', dataIndex: 'name', key: 'name' },
    {
      title: '预测类型',
      dataIndex: 'agentType',
      key: 'agentType',
      render: (type: string) => {
        const typeMap = {
          failure: '故障预测',
          demand: '需求预测',
          quality: '质量预测',
        };
        return <Tag color="blue">{typeMap[type] || type}</Tag>;
      },
    },
    { title: '预测目标', dataIndex: 'target', key: 'target' },
    {
      title: '执行计划',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (schedule: string) => {
        const scheduleMap = {
          manual: '手动执行',
          daily: '每日执行',
          weekly: '每周执行',
          monthly: '每月执行',
        };
        return scheduleMap[schedule] || schedule;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '运行中' : '已停止'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: PredictionTask) => (
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link" danger>
            {record.status === 'active' ? '停止' : '启动'}
          </Button>
        </Space>
      ),
    },
  ];

  // 预测结果列表
  const resultColumns = [
    { title: '任务名称', dataIndex: 'taskName', key: 'taskName' },
    { title: '预测时间', dataIndex: 'timestamp', key: 'timestamp' },
    {
      title: '预测结果',
      dataIndex: 'result',
      key: 'result',
      render: (result: { value: number | string; probability?: number }) => (
        <span>
          {result.value}
          {result.probability && ` (置信度: ${(result.probability * 100).toFixed(2)}%)`}
        </span>
      ),
    },
    {
      title: '准确率',
      dataIndex: ['metadata', 'metrics', 'accuracy'],
      key: 'accuracy',
      render: (accuracy: number) =>
        accuracy && <span>{(accuracy * 100).toFixed(2)}%</span>,
    },
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
  ];

  const items: TabsProps['items'] = [
    {
      key: 'overview',
      label: '预测概览',
      children: (
        <div style={{ marginBottom: 16 }}>
          <Card title="预测任务统计">
            {/* 这里可以添加统计图表组件 */}
            <div>预测任务趋势图</div>
          </Card>
        </div>
      ),
    },
    {
      key: 'tasks',
      label: '预测任务',
      children: (
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsTaskModalVisible(true)}
            style={{ marginBottom: 16 }}
          >
            新建预测任务
          </Button>
          <Table columns={taskColumns} />
        </div>
      ),
    },
    {
      key: 'results',
      label: '预测结果',
      children: (
        <div>
          <Table columns={resultColumns} />
        </div>
      ),
    },
  ];

  const handleCreateTask = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      setIsTaskModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Tabs defaultActiveKey="overview" items={items} />

      <Modal
        title="新建预测任务"
        open={isTaskModalVisible}
        onOk={handleCreateTask}
        onCancel={() => {
          setIsTaskModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>

          <Form.Item
            name="agentType"
            label="预测类型"
            rules={[{ required: true, message: '请选择预测类型' }]}
          >
            <Select>
              <Select.Option value="failure">故障预测</Select.Option>
              <Select.Option value="demand">需求预测</Select.Option>
              <Select.Option value="quality">质量预测</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="target"
            label="预测目标"
            rules={[{ required: true, message: '请选择预测目标' }]}
          >
            <Select>
              <Select.Option value="equipment_1">设备1</Select.Option>
              <Select.Option value="equipment_2">设备2</Select.Option>
              <Select.Option value="production_line_1">生产线1</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeRange"
            label="预测时间范围"
            rules={[{ required: true, message: '请选择预测时间范围' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="schedule"
            label="执行计划"
            rules={[{ required: true, message: '请选择执行计划' }]}
          >
            <Select>
              <Select.Option value="manual">手动执行</Select.Option>
              <Select.Option value="daily">每日执行</Select.Option>
              <Select.Option value="weekly">每周执行</Select.Option>
              <Select.Option value="monthly">每月执行</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="parameters"
            label="预测参数"
            rules={[{ required: true, message: '请设置预测参数' }]}
          >
            <Input.TextArea placeholder="请输入预测参数配置" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PredictionCenter;