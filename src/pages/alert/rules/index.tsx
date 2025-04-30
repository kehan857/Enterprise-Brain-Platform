import React from 'react';
import { Card, Table, Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: string;
  status: 'active' | 'inactive';
  createTime: string;
}

const AlertRules: React.FC = () => {
  const columns: ColumnsType<AlertRule> = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '规则类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '告警条件',
      dataIndex: 'condition',
      key: 'condition',
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
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
          <a>{record.status === 'active' ? '停用' : '启用'}</a>
        </Space>
      ),
    },
  ];

  const mockData: AlertRule[] = [
    {
      id: '1',
      name: 'CPU使用率告警',
      type: '系统监控',
      condition: 'CPU使用率 > 90%',
      status: 'active',
      createTime: '2024-01-01 12:00:00',
    },
    {
      id: '2',
      name: '内存使用率告警',
      type: '系统监控',
      condition: '内存使用率 > 85%',
      status: 'active',
      createTime: '2024-01-01 12:00:00',
    },
  ];

  return (
    <Card
      title="告警规则配置"
      extra={
        <Button type="primary">新建规则</Button>
      }
    >
      <Table columns={columns} dataSource={mockData} rowKey="id" />
    </Card>
  );
};

export default AlertRules;