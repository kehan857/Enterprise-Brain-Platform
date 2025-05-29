import React, { useState } from 'react';
import { Card, Typography, Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../components/SearchComponent';
import DocumentPreview from '@/components/DocumentPreview';
import './reports.less';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface PredictionReport {
  id: string;
  name: string;
  type: string;
  createTime: string;
  status: 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  creator?: string;
  description?: string;
  [key: string]: any;
}

const mockReports: PredictionReport[] = [
  {
    id: '1',
    name: '2024年Q1销售预测报告',
    type: '销售预测',
    createTime: '2024-01-20 14:30',
    status: 'completed',
    downloadUrl: '#',
    creator: '张三',
    description: '基于历史销售数据和市场趋势，预测2024年第一季度各产品线销售情况'
  },
  {
    id: '2',
    name: '设备故障预测分析报告',
    type: '设备维护',
    createTime: '2024-01-19 16:45',
    status: 'completed',
    downloadUrl: '#',
    creator: '李四',
    description: '基于设备运行状态数据，预测关键设备可能发生的故障及维护建议'
  },
  {
    id: '3',
    name: '库存优化预测报告',
    type: '库存管理',
    createTime: '2024-01-18 09:15',
    status: 'processing',
    creator: '王五',
    description: '基于销售预测和供应链数据，优化库存结构和水平，降低库存成本'
  },
  {
    id: '4',
    name: '产品质量趋势预测',
    type: '质量预测',
    createTime: '2024-01-17 11:30',
    status: 'completed',
    downloadUrl: '#',
    creator: '赵六',
    description: '基于质检数据，预测产品质量变化趋势和潜在质量风险'
  },
  {
    id: '5',
    name: '能源消耗优化建议',
    type: '能源管理',
    createTime: '2024-01-16 15:20',
    status: 'failed',
    creator: '张三',
    description: '基于能源消耗数据，预测能源使用趋势并提供优化建议'
  },
  {
    id: '6',
    name: '市场需求变化预测',
    type: '销售预测',
    createTime: '2024-01-15 10:00',
    status: 'completed',
    downloadUrl: '#',
    creator: '李四',
    description: '分析和预测市场需求变化趋势，为产品规划提供参考'
  }
];

const reportTypes = ['销售预测', '设备维护', '库存管理', '质量预测', '能源管理'];

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
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<PredictionReport | null>(null);
  const [filteredReports, setFilteredReports] = useState<PredictionReport[]>(mockReports);
  const [form] = Form.useForm();

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '报告名称', value: 'name' },
    { label: '报告类型', value: 'type' },
    { label: '创建人', value: 'creator' },
    { label: '报告描述', value: 'description' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '报告类型', 
      field: 'type',
      span: 8,
      options: reportTypes.map(type => ({ label: type, value: type }))
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '生成中', value: 'processing' },
        { label: '已完成', value: 'completed' },
        { label: '生成失败', value: 'failed' }
      ]
    },
    { 
      type: 'dateRange', 
      label: '创建时间', 
      field: 'createTime',
      span: 8,
      placeholder: ['开始日期', '结束日期']
    },
    { 
      type: 'input', 
      label: '创建人', 
      field: 'creator',
      span: 8,
      placeholder: '请输入创建人'
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '创建时间：从新到旧', value: 'createTime,desc' },
    { label: '创建时间：从旧到新', value: 'createTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已完成', value: { status: 'completed' }, color: 'green' },
    { label: '生成中', value: { status: 'processing' }, color: 'blue' },
    { label: '生成失败', value: { status: 'failed' }, color: 'red' },
    { label: '销售预测', value: { type: '销售预测' }, color: 'purple' },
    { label: '设备维护', value: { type: '设备维护' }, color: 'orange' }
  ];

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    let filtered = [...mockReports];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      const keyword = params._keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword) ||
        (item.creator && item.creator.toLowerCase().includes(keyword)) ||
        (item.description && item.description.toLowerCase().includes(keyword))
      );
    } else if (params.name) {
      // 按名称搜索
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(params.name.toLowerCase())
      );
    } else if (params.type) {
      // 按类型搜索
      filtered = filtered.filter(item => 
        item.type.toLowerCase().includes(params.type.toLowerCase())
      );
    } else if (params.creator) {
      // 按创建人搜索
      filtered = filtered.filter(item => 
        item.creator && item.creator.toLowerCase().includes(params.creator.toLowerCase())
      );
    } else if (params.description) {
      // 按描述搜索
      filtered = filtered.filter(item => 
        item.description && item.description.toLowerCase().includes(params.description.toLowerCase())
      );
    }
    
    setFilteredReports(filtered);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    let filtered = [...mockReports];
    
    // 处理高级筛选
    Object.entries(params).forEach(([key, value]) => {
      if (value && key !== 'sortBy') {
        if (key === 'createTime' && Array.isArray(value) && value.length === 2) {
          // 日期范围筛选
          const [start, end] = value;
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.createTime);
            return itemDate >= start && itemDate <= end;
          });
        } else {
          // 其他普通筛选
          filtered = filtered.filter(item => item[key] === value);
        }
      }
    });
    
    // 处理排序
    if (params.sortBy) {
      const [field, order] = params.sortBy.split(',');
      filtered = [...filtered].sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }
    
    setFilteredReports(filtered);
  };

  // 处理导出
  const handleExport = (params: Record<string, any>) => {
    console.log('导出预测报告:', params);
    message.success('预测报告导出成功');
  };

  const columns: TableProps<PredictionReport>['columns'] = [
    {
      title: '报告名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          {record.description && (
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
              {record.description}
            </div>
          )}
        </div>
      )
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
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
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
        </Space>
      ),
    },
  ];

  return (
    <div className="prediction-reports">
      <Card bordered={false}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space direction="vertical" size="small">
            <Title level={4}>预测报告</Title>
            <Paragraph>
              查看和管理智能预测生成的分析报告，支持下载和分享。
            </Paragraph>
          </Space>
          
          <div className="header-actions">
            <div className="search-wrapper">
              <SearchComponent 
                searchFields={searchFields}
                filters={filters}
                sortOptions={sortOptions}
                quickFilters={quickFilters}
                enableExport={true}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onExport={handleExport}
              />
            </div>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredReports}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Space>
      </Card>

      <Modal
        title={selectedReport?.name || '预测报告详情'}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          selectedReport?.status === 'completed' && (
            <Button 
              key="download" 
              type="primary" 
              icon={<DownloadOutlined />}
              href={selectedReport?.downloadUrl}
            >
              下载报告
            </Button>
          ),
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
        bodyStyle={{ height: '70vh', padding: 0, overflow: 'hidden' }}
      >
        {selectedReport && (
          <div style={{ height: '100%' }}>
            {selectedReport.status === 'completed' ? (
              <DocumentPreview 
                type="pdf"
                url="https://arxiv.org/pdf/2003.08934.pdf" // 使用示例PDF
                loading={false}
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Title level={4} style={{ color: '#999' }}>
                  {selectedReport.status === 'processing' ? '报告生成中...' : '报告生成失败'}
                </Title>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PredictionReports;