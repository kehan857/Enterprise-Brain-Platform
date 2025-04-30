import React from 'react';
import { Card, Steps, Typography, Tag, Space } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Task {
  id: string;
  title: string;
  type: string;
  currentStep: number;
  totalSteps: number;
  steps: {
    title: string;
    description: string;
    status: 'wait' | 'process' | 'finish' | 'error';
  }[];
  lastUpdateTime: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
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
      {tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '12px' }}>
            <Space>
              <Text strong>{task.title}</Text>
              <Tag color={getStatusColor(task.status)} icon={getStatusIcon(task.status)}>
                {task.status === 'completed' ? '已完成' :
                 task.status === 'processing' ? '进行中' :
                 task.status === 'pending' ? '待开始' : '异常'}
              </Tag>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                最后更新: {task.lastUpdateTime}
              </Text>
            </Space>
          </div>
          <Steps
            current={task.currentStep}
            percent={Math.round((task.currentStep / task.totalSteps) * 100)}
            items={task.steps}
            size="small"
            style={{ marginLeft: '8px' }}
          />
        </div>
      ))}
    </Card>
  );
};

export default TaskProgress;