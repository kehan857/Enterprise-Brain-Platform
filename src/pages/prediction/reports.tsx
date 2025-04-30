import React, { useState } from 'react';
import { Card, Typography, Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { DownloadOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface PredictionReport {
  id: string;
  name: string;
  type: string;
  createTime: string;
  status: 'processing' | 'completed' | 'failed';
  accuracy?: number;
  downloadUrl?: string;
}

const mockReports: PredictionReport[] = [
  {
    id: '1',
    name: '2024年Q1销售预测报告',
    type: '销售预测',
    createTime: '2024-01-20 14:30',
    status: 'completed',
    accuracy: 0.92,
    downloadUrl: '#'
  },
  {
    id: '2',
    name: '设备故障预测分析报告',
    type: '设备维护',
    createTime: '2024-01-19 16:45',
    status: 'completed',
    accuracy: 0.88,
    downloadUrl: '#'
  },
  {
    id: '3',
    name: '库存优化预测报告',
    type: '库存管理',
    createTime: '2024-01-18 09:15',
    status: 'processing'
  }
];

const reportTypes = ['销售预测', '设备维护', '库存管理', '质量预测'];

const getStatusTag = (status: PredictionReport['status']) => {
  const statusConfig = {
    processing: { color: 'processing', text: '生成中' },
    completed: { color: 'success', text: '已完成' },
    failed: { color: 'error', text: '生成失败' }
  };
  const config = statusConfig[status];
  return <Tag color={config.color}>{config.text}</Tag>;
};

const PredictionReports: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<PredictionReport | null>(null);
  const [form] = Form.useForm();

  const handleCreateReport = () => {
    form.validateFields().then(values => {
      message.loading({ content: '正在生成预测报告...', key: 'createReport' });
      // 模拟报告生成过程
      setTimeout(() => {
        message.success({ content: '预测报告创建成功', key: 'createReport' });
        setCreateModalVisible(false);
        form.resetFields();
      }, 2000);
    });
  };

  const columns: TableProps<PredictionReport>['columns'] = [
    {
      title: '报告名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '预测类型',
      dataIndex: 'type',
      key: 'type',
      filters: reportTypes.map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.type === value,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: PredictionReport['status']) => getStatusTag(status),
      filters: [
        { text: '生成中', value: 'processing' },
        { text: '已完成', value: 'completed' },
        { text: '生成失败', value: 'failed' }
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '预测准确度',
      dataIndex: 'accuracy',
      key: 'accuracy',
      render: (accuracy?: number) => accuracy ? `${(accuracy * 100).toFixed(1)}%` : '-',
      sorter: (a, b) => (a.accuracy || 0) - (b.accuracy || 0),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            onClick={() => {
              setSelectedReport(record);
              setViewModalVisible(true);
            }}
          >
            查看
          </Button>
          {record.status === 'completed' && (
            <Button 
              type="link" 
              icon={<DownloadOutlined />}
              href={record.downloadUrl}
            >
              下载
            </Button>
          )}
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => message.success('删除成功')}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="prediction-reports">
      <Card bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space direction="vertical" size="small">
            <Title level={4}>预测报告</Title>
            <Paragraph>
              查看和管理智能预测生成的分析报告，支持下载和分享。
            </Paragraph>
          </Space>

          <Space style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setCreateModalVisible(true)}
            >
              新建预测报告
            </Button>
          </Space>

          <Table 
            columns={columns} 
            dataSource={mockReports}
            rowKey="id"
          />
        </Space>
      </Card>

      <Modal
        title="新建预测报告"
        open={createModalVisible}
        onOk={handleCreateReport}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="报告名称"
            rules={[{ required: true, message: '请输入报告名称' }]}
          >
            <Input placeholder="请输入报告名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="预测类型"
            rules={[{ required: true, message: '请选择预测类型' }]}
          >
            <Select placeholder="请选择预测类型">
              {reportTypes.map(type => (
                <Select.Option key={type} value={type}>{type}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="预测时间范围"
            rules={[{ required: true, message: '请选择预测时间范围' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="预测报告详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedReport && (
          <div>
            <Title level={4}>{selectedReport.name}</Title>
            <Paragraph>
              <Space direction="vertical" size="small">
                <div>预测类型：{selectedReport.type}</div>
                <div>创建时间：{selectedReport.createTime}</div>
                <div>状态：{getStatusTag(selectedReport.status)}</div>
                <div>预测准确度：{selectedReport.accuracy ? `${(selectedReport.accuracy * 100).toFixed(1)}%` : '-'}</div>
              </Space>
            </Paragraph>
            {/* 这里可以添加更多报告详情内容，如图表等 */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PredictionReports;