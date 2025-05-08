import React, { useState } from 'react';
import { Card, Typography, Table, Button, Space, Tag, DatePicker, Input, Select, Row, Col, Statistic } from 'antd';
import { DownloadOutlined, EyeOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface PredictionReport {
  id: string;
  title: string;
  taskName: string;
  agentType: string;
  generatedTime: string;
  triggerType: 'manual' | 'auto';
  pushStatus: 'success' | 'failed' | 'pending';
  accuracy: number;
}

const mockReports: PredictionReport[] = [
  {
    id: '1',
    title: '设备A故障预测报告',
    taskName: '设备故障预测任务',
    agentType: '设备维护',
    generatedTime: '2024-01-21 10:00',
    triggerType: 'auto',
    pushStatus: 'success',
    accuracy: 0.92
  },
  {
    id: '2',
    title: '产品需求预测报告',
    taskName: '需求预测任务',
    agentType: '销售预测',
    generatedTime: '2024-01-21 09:30',
    triggerType: 'manual',
    pushStatus: 'success',
    accuracy: 0.85
  },
  {
    id: '3',
    title: '库存优化建议报告',
    taskName: '库存优化任务',
    agentType: '库存管理',
    generatedTime: '2024-01-21 08:45',
    triggerType: 'auto',
    pushStatus: 'pending',
    accuracy: 0.88
  }
];

const PredictionReports: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null);

  const columns: TableProps<PredictionReport>['columns'] = [
    {
      title: '报告标题',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: '预测任务',
      dataIndex: 'taskName',
      key: 'taskName',
      width: '15%',
    },
    {
      title: 'Agent类型',
      dataIndex: 'agentType',
      key: 'agentType',
      width: '12%',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: '生成时间',
      dataIndex: 'generatedTime',
      key: 'generatedTime',
      width: '15%',
      sorter: (a, b) => new Date(a.generatedTime).getTime() - new Date(b.generatedTime).getTime()
    },
    {
      title: '触发方式',
      dataIndex: 'triggerType',
      key: 'triggerType',
      width: '10%',
      render: (type: string) => (
        <Tag color={type === 'auto' ? 'green' : 'orange'}>
          {type === 'auto' ? '自动' : '手动'}
        </Tag>
      )
    },
    {
      title: '推送状态',
      dataIndex: 'pushStatus',
      key: 'pushStatus',
      width: '10%',
      render: (status: 'success' | 'failed' | 'pending') => {
        const statusConfig = {
          success: { color: 'success', text: '已推送' },
          failed: { color: 'error', text: '推送失败' },
          pending: { color: 'processing', text: '推送中' }
        };
        return <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>;
      }
    },
    {
      title: '预测准确度',
      dataIndex: 'accuracy',
      key: 'accuracy',
      width: '10%',
      render: (accuracy: number) => `${(accuracy * 100).toFixed(1)}%`,
      sorter: (a, b) => a.accuracy - b.accuracy
    },
    {
      title: '操作',
      key: 'action',
      width: '15%',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} size="small">查看</Button>
          <Button type="link" icon={<DownloadOutlined />} size="small">下载</Button>
          <Button type="link" icon={<ShareAltOutlined />} size="small">分享</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="prediction-reports">
      <Card bordered={false}>
        <Title level={4}>预测报告</Title>
        <Paragraph>
          查看和管理由智能预测Agent生成的预测报告。
        </Paragraph>

        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic title="今日生成报告" value={8} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="平均预测准确度" value={89.5} suffix="%" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="待查看报告" value={3} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="已推送报告" value={12} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Input.Search
              placeholder="搜索报告标题或任务名称"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={16}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Tag.CheckableTag 
                checked={!selectedTaskType} 
                onChange={() => setSelectedTaskType(null)}
                style={{ 
                  border: '1px solid #d9d9d9', 
                  padding: '0 8px', 
                  marginRight: '0', 
                  backgroundColor: !selectedTaskType ? '#e6f7ff' : 'transparent',
                  borderColor: !selectedTaskType ? '#91d5ff' : '#d9d9d9'
                }}
              >
                全部类型
              </Tag.CheckableTag>
              <Tag.CheckableTag 
                checked={selectedTaskType === '设备维护'} 
                onChange={() => setSelectedTaskType(selectedTaskType === '设备维护' ? null : '设备维护')}
                style={{ 
                  border: '1px solid #d9d9d9', 
                  padding: '0 8px',
                  marginRight: '0',
                  backgroundColor: selectedTaskType === '设备维护' ? '#e6f7ff' : 'transparent',
                  borderColor: selectedTaskType === '设备维护' ? '#91d5ff' : '#d9d9d9'
                }}
              >
                设备维护
              </Tag.CheckableTag>
              <Tag.CheckableTag 
                checked={selectedTaskType === '销售预测'} 
                onChange={() => setSelectedTaskType(selectedTaskType === '销售预测' ? null : '销售预测')}
                style={{ 
                  border: '1px solid #d9d9d9', 
                  padding: '0 8px',
                  marginRight: '0',
                  backgroundColor: selectedTaskType === '销售预测' ? '#e6f7ff' : 'transparent',
                  borderColor: selectedTaskType === '销售预测' ? '#91d5ff' : '#d9d9d9'
                }}
              >
                销售预测
              </Tag.CheckableTag>
              <Tag.CheckableTag 
                checked={selectedTaskType === '库存管理'} 
                onChange={() => setSelectedTaskType(selectedTaskType === '库存管理' ? null : '库存管理')}
                style={{ 
                  border: '1px solid #d9d9d9', 
                  padding: '0 8px',
                  marginRight: '0',
                  backgroundColor: selectedTaskType === '库存管理' ? '#e6f7ff' : 'transparent',
                  borderColor: selectedTaskType === '库存管理' ? '#91d5ff' : '#d9d9d9'
                }}
              >
                库存管理
              </Tag.CheckableTag>
            </div>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={mockReports}
          rowKey="id"
          pagination={{
            total: mockReports.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
        />
      </Card>
    </div>
  );
};

export default PredictionReports;