import React from 'react';
import { Card, Table, Space, Tag, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface AlertItem {
  id: string;
  title: string;
  level: 'high' | 'medium' | 'low';
  source: string;
  status: 'unprocessed' | 'processing' | 'resolved';
  createTime: string;
}

const AlertList: React.FC = () => {
  const columns: ColumnsType<AlertItem> = [
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
      title: '告警时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>查看详情</a>
          <a>处理</a>
        </Space>
      ),
    },
  ];

  const mockData: AlertItem[] = [
    {
      id: '1',
      title: '生产线A设备温度异常',
      level: 'high',
      source: '设备监控Agent',
      status: 'unprocessed',
      createTime: '2024-01-03 15:30:00',
    },
    {
      id: '2',
      title: '原材料库存低于安全阈值',
      level: 'medium',
      source: '库存管理Agent',
      status: 'processing',
      createTime: '2024-01-03 14:45:00',
    },
    {
      id: '3',
      title: '产品质检不合格率上升',
      level: 'high',
      source: '质量控制Agent',
      status: 'unprocessed',
      createTime: '2024-01-03 14:20:00',
    },
    {
      id: '4',
      title: '能源消耗异常波动',
      level: 'medium',
      source: '能源监控Agent',
      status: 'resolved',
      createTime: '2024-01-03 13:15:00',
    },
    {
      id: '5',
      title: '设备维护提醒',
      level: 'low',
      source: '设备管理Agent',
      status: 'processing',
      createTime: '2024-01-03 11:30:00',
    },
    {
      id: '6',
      title: '生产计划延期风险',
      level: 'high',
      source: '生产管理Agent',
      status: 'processing',
      createTime: '2024-01-03 10:45:00',
    },
    {
      id: '7',
      title: '物流配送延迟',
      level: 'medium',
      source: '物流管理Agent',
      status: 'resolved',
      createTime: '2024-01-03 09:20:00',
    },
    {
      id: '8',
      title: '系统性能波动',
      level: 'low',
      source: '系统监控Agent',
      status: 'resolved',
      createTime: '2024-01-03 08:15:00',
    }
  ];

  return (
    <Card title="告警列表">
      <Table columns={columns} dataSource={mockData} rowKey="id" />
    </Card>
  );
};

export default AlertList;