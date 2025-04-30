import React from 'react';
import { Card, Table, Space, Tag, Badge, Button, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface AlertHandleItem {
  id: string;
  title: string;
  level: 'high' | 'medium' | 'low';
  source: string;
  status: 'unprocessed' | 'processing' | 'resolved';
  handler: string;
  handleTime: string;
  solution: string;
}

const AlertHandle: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  const columns: ColumnsType<AlertHandleItem> = [
    {
      title: '告警标题',
      dataIndex: 'title',
      key: 'title',
    },
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
    {
      title: '告警来源',
      dataIndex: 'source',
      key: 'source',
    },
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
    {
      title: '处理人',
      dataIndex: 'handler',
      key: 'handler',
    },
    {
      title: '处理时间',
      dataIndex: 'handleTime',
      key: 'handleTime',
    },
    {
      title: '处理方案',
      dataIndex: 'solution',
      key: 'solution',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showHandleModal(record)}>处理</a>
          <a>查看详情</a>
        </Space>
      ),
    },
  ];

  const mockData: AlertHandleItem[] = [
    {
      id: '1',
      title: 'CPU使用率超过阈值',
      level: 'high',
      source: '系统监控',
      status: 'processing',
      handler: '张三',
      handleTime: '2024-01-01 12:30:00',
      solution: '正在进行系统资源优化...',
    },
    {
      id: '2',
      title: '内存使用率异常',
      level: 'medium',
      source: '系统监控',
      status: 'resolved',
      handler: '李四',
      handleTime: '2024-01-01 13:00:00',
      solution: '已清理无用进程，释放内存空间',
    },
  ];

  const showHandleModal = (record: AlertHandleItem) => {
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('处理告警:', values);
      setVisible(false);
      form.resetFields();
    });
  };

  return (
    <>
      <Card title="告警处理">
        <Table columns={columns} dataSource={mockData} rowKey="id" />
      </Card>

      <Modal
        title="处理告警"
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="告警标题">
            <Input disabled />
          </Form.Item>
          <Form.Item name="status" label="处理状态" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="processing">处理中</Select.Option>
              <Select.Option value="resolved">已解决</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="solution" label="处理方案" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AlertHandle;