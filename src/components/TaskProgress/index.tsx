import React from 'react';
import { Card, Typography, Tag, Space, Table } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  submitTime: string;
  startTime: string;
}

interface TaskProgressProps {
  tasks: Task[];
}

const TaskProgress: React.FC<TaskProgressProps> = ({ tasks = [] }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'processing':
        return 'processing';
      case 'completed':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'processing':
        return '进行中';
      case 'pending':
        return '待开始';
      case 'error':
        return '异常';
      default:
        return '';
    }
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Task['status']) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
  ];

  return (
    <Card
      title={
        <Space>
          <span>任务进展</span>
          <Tag color="blue">{tasks.length} 个进行中</Tag>
        </Space>
      }
      className="task-progress-section"
    >
      <Table
        dataSource={tasks.slice(0, 3)}
        columns={columns}
        pagination={false}
        size="small"
        rowKey="id"
      />
    </Card>
  );
};

export default TaskProgress;