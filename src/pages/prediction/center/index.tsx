import { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker } from 'antd';
import type { PredictionTask } from '../types';
import { PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const PredictionCenter = () => {
  const [tasks, setTasks] = useState<PredictionTask[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
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
        return typeMap[type] || type;
      },
    },
    {
      title: '预测目标',
      dataIndex: 'target',
      key: 'target',
    },
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
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
          <a onClick={() => handleToggleStatus(record)}>
            {record.status === 'active' ? '停止' : '启动'}
          </a>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: PredictionTask) => {
    form.setFieldsValue({
      ...record,
      timeRange: [record.timeRange.start, record.timeRange.end],
    });
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleStatus = (record: PredictionTask) => {
    setTasks(
      tasks.map(task =>
        task.id === record.id
          ? { ...task, status: task.status === 'active' ? 'inactive' : 'active' }
          : task
      )
    );
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const [start, end] = values.timeRange;
      const newTask: PredictionTask = {
        id: values.id || String(Date.now()),
        name: values.name,
        agentType: values.agentType,
        target: values.target,
        timeRange: {
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD'),
        },
        schedule: values.schedule,
        status: 'inactive',
        parameters: values.parameters,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks(prev =>
        values.id ? prev.map(task => (task.id === values.id ? newTask : task)) : [...prev, newTask]
      );
      setModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新建预测任务
        </Button>
      </div>
      <Table columns={columns} dataSource={tasks} rowKey="id" />

      <Modal
        title={form.getFieldValue('id') ? '编辑预测任务' : '新建预测任务'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
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
            rules={[{ required: true, message: '请输入预测目标' }]}
          >
            <Input placeholder="请输入预测目标" />
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
        </Form>
      </Modal>
    </div>
  );
};

export default PredictionCenter;