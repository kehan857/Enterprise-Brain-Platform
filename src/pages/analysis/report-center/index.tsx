import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Select, DatePicker, Row, Col } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

interface ReportData {
  key: string;
  name: string;
  type: string;
  category: string;
  createTime: string;
  status: string;
  size: string;
  reportId?: string;
  [key: string]: any; // 添加索引签名
}

const { RangePicker } = DatePicker;

const ReportCenter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<ReportData[]>([]);

  const handlePreviewReport = (reportId: string) => {
    window.open(`/report?reportId=${reportId}`, '_blank');
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

  // 初始化过滤后的数据
  useEffect(() => {
    setFilteredData(mockData);
  }, []);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '报表名称', value: 'name' },
    { label: '业务板块', value: 'category' },
    { label: '报表类型', value: 'type' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '业务板块', 
      field: 'category',
      span: 8,
      options: [
        { label: '企业诊断', value: '企业诊断' },
        { label: '生产', value: '生产' },
        { label: '营销', value: '营销' },
        { label: '质控', value: '质控' },
        { label: '财务', value: '财务' }
      ]
    },
    { 
      type: 'select', 
      label: '报表类型', 
      field: 'type',
      span: 8,
      options: [
        { label: '诊断报告', value: '诊断报告' },
        { label: '日报', value: '日报' },
        { label: '周报', value: '周报' },
        { label: '月度报表', value: '月度报表' }
      ]
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '已完成', value: '已完成' },
        { label: '生成中', value: '生成中' }
      ]
    },
    { 
      type: 'dateRange', 
      label: '生成时间', 
      field: 'createTime',
      span: 12,
      placeholder: ['开始日期', '结束日期']
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '生成时间：从新到旧', value: 'createTime,desc' },
    { label: '生成时间：从旧到新', value: 'createTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已完成', value: { status: '已完成' }, color: 'green' },
    { label: '生成中', value: { status: '生成中' }, color: 'blue' },
    { label: '诊断报告', value: { type: '诊断报告' }, color: 'purple' },
    { label: '企业诊断', value: { category: '企业诊断' }, color: 'cyan' },
    { label: '月度报表', value: { type: '月度报表' }, color: 'orange' }
  ];

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    let filtered = [...mockData];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      const keyword = params._keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
      );
    } else {
      // 特定字段搜索
      Object.entries(params).forEach(([key, value]) => {
        if (value && key !== 'sortBy') {
          filtered = filtered.filter(item => 
            String(item[key]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      });
    }
    
    setFilteredData(filtered);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    let filtered = [...mockData];
    
    // 筛选数据
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
    
    setFilteredData(filtered);
  };

  // 处理导出
  const handleExport = (params: Record<string, any>) => {
    console.log('导出报表数据:', params);
  };

  const handleRefresh = () => {
    setLoading(true);
    // 模拟刷新数据
    setTimeout(() => {
      setLoading(false);
      setFilteredData(mockData);
    }, 1000);
  };

  return (
    <div className="report-center">
      <Card>
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
          <div className="action-wrapper">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
            >
              刷新
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
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