import React, { useState } from 'react';
import { Card, Table, Button, Space, Select, DatePicker, Row, Col } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface ReportData {
  key: string;
  name: string;
  type: string;
  category: string;
  createTime: string;
  status: string;
  size: string;
  reportId?: string;
}

const { RangePicker } = DatePicker;

const ReportCenter: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePreviewReport = (reportId: string) => {
    window.open(`/report-preview/${reportId}`, '_blank');
  };

  const columns: TableColumnsType<ReportData> = [
    {
      title: '报表名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '业务板块',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '报表类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '生成时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => a.createTime.localeCompare(b.createTime),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === '已完成' ? 'green' : status === '生成中' ? 'blue' : 'red';
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => record.reportId && handlePreviewReport(record.reportId)}
          >
            预览
          </Button>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            disabled={record.status !== '已完成'}
          >
            下载
          </Button>
        </Space>
      ),
    },
  ];

  const mockData: ReportData[] = [
    {
      key: '5',
      name: '企业AI快速诊断报告',
      category: '企业诊断',
      type: '诊断报告',
      createTime: '2024-01-20 10:30:00',
      status: '已完成',
      size: '1.2MB',
      reportId: 'QD1705722600000'
    },
    {
      key: '6',
      name: '企业AI全面诊断报告',
      category: '企业诊断',
      type: '诊断报告',
      createTime: '2024-01-19 15:45:00',
      status: '已完成',
      size: '2.8MB',
      reportId: 'CD1705652700000'
    },
    {
      key: '1',
      name: '生产效能分析报告',
      category: '生产',
      type: '月度报表',
      createTime: '2024-01-03 14:30:00',
      status: '已完成',
      size: '2.5MB',
    },
    {
      key: '2',
      name: '销售业绩分析报告',
      category: '营销',
      type: '周报',
      createTime: '2024-01-03 15:20:00',
      status: '生成中',
      size: '-',
    },
    {
      key: '3',
      name: '质量分析报告',
      category: '质控',
      type: '日报',
      createTime: '2024-01-03 12:00:00',
      status: '已完成',
      size: '1.8MB',
    },
    {
      key: '4',
      name: '财务月度报告',
      category: '财务',
      type: '月度报表',
      createTime: '2024-01-03 11:30:00',
      status: '已完成',
      size: '3.2MB',
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    // 模拟刷新数据
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="report-center">
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16} align="middle">
            <Col>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                placeholder="业务板块"
                options={[
                  { value: 'all', label: '全部板块' },
                  { value: 'operation', label: '经营' },
                  { value: 'marketing', label: '营销' },
                  { value: 'production', label: '生产' },
                  { value: 'quality', label: '质控' },
                  { value: 'rd', label: '研发' },
                  { value: 'finance', label: '财务' },
                  { value: 'hr', label: '人事' },
                ]}
              />
            </Col>
            <Col>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                placeholder="报表类型"
                options={[
                  { value: 'all', label: '全部类型' },
                  { value: 'diagnosis', label: '诊断报告' },
                  { value: 'daily', label: '日报' },
                  { value: 'weekly', label: '周报' },
                  { value: 'monthly', label: '月度报表' },
                ]}
              />
            </Col>
            <Col>
              <RangePicker />
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  loading={loading}
                >
                  刷新
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
        <Table
          columns={columns}
          dataSource={mockData}
          loading={loading}
          pagination={{
            total: 50,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default ReportCenter;