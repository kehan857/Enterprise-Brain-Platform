import React, { useState } from 'react';
import { Card, Table, Space, Tag, Badge, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

interface AlertItem {
  id: string;
  title: string;
  level: 'high' | 'medium' | 'low';
  source: string;
  status: 'unprocessed' | 'processing' | 'resolved';
  createTime: string;
  description?: string;
  category?: string;
  [key: string]: any;
}

const AlertList: React.FC = () => {
  const mockData: AlertItem[] = [
    {
      id: '1',
      title: '生产线A设备温度异常',
      level: 'high',
      source: '设备监控Agent',
      status: 'unprocessed',
      createTime: '2024-01-03 15:30:00',
      description: '生产线A的主轴温度超过预警阈值，当前温度85℃，阈值为75℃',
      category: '设备告警'
    },
    {
      id: '2',
      title: '原材料库存低于安全阈值',
      level: 'medium',
      source: '库存管理Agent',
      status: 'processing',
      createTime: '2024-01-03 14:45:00',
      description: 'A类原材料库存量低于安全库存水平，当前库存可支持生产3天',
      category: '库存告警'
    },
    {
      id: '3',
      title: '产品质检不合格率上升',
      level: 'high',
      source: '质量控制Agent',
      status: 'unprocessed',
      createTime: '2024-01-03 14:20:00',
      description: '产品A的质检不合格率从2%上升至5.8%，超过预警阈值5%',
      category: '质量告警'
    },
    {
      id: '4',
      title: '能源消耗异常波动',
      level: 'medium',
      source: '能源监控Agent',
      status: 'resolved',
      createTime: '2024-01-03 13:15:00',
      description: '车间2的能源消耗在过去3小时内波动超过30%，可能存在能源浪费',
      category: '能源告警'
    },
    {
      id: '5',
      title: '设备维护提醒',
      level: 'low',
      source: '设备管理Agent',
      status: 'processing',
      createTime: '2024-01-03 11:30:00',
      description: '注塑机B即将达到计划维护周期，建议安排维护',
      category: '设备告警'
    },
    {
      id: '6',
      title: '生产计划延期风险',
      level: 'high',
      source: '生产管理Agent',
      status: 'processing',
      createTime: '2024-01-03 10:45:00',
      description: '订单XC2024010135的生产进度落后计划15%，存在延期交付风险',
      category: '生产告警'
    },
    {
      id: '7',
      title: '物流配送延迟',
      level: 'medium',
      source: '物流管理Agent',
      status: 'resolved',
      createTime: '2024-01-03 09:20:00',
      description: '华东区域的3批次物流配送延迟，受天气因素影响',
      category: '物流告警'
    },
    {
      id: '8',
      title: '系统性能波动',
      level: 'low',
      source: '系统监控Agent',
      status: 'resolved',
      createTime: '2024-01-03 08:15:00',
      description: '系统数据处理性能出现波动，当前响应时间增加30%',
      category: '系统告警'
    }
  ];
  
  const [filteredData, setFilteredData] = useState<AlertItem[]>(mockData);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '告警标题', value: 'title' },
    { label: '告警源', value: 'source' },
    { label: '告警描述', value: 'description' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '告警级别', 
      field: 'level',
      span: 8,
      options: [
        { label: '高', value: 'high' },
        { label: '中', value: 'medium' },
        { label: '低', value: 'low' }
      ]
    },
    { 
      type: 'select', 
      label: '告警类别', 
      field: 'category',
      span: 8,
      options: [
        { label: '设备告警', value: '设备告警' },
        { label: '质量告警', value: '质量告警' },
        { label: '生产告警', value: '生产告警' },
        { label: '库存告警', value: '库存告警' },
        { label: '能源告警', value: '能源告警' },
        { label: '物流告警', value: '物流告警' },
        { label: '系统告警', value: '系统告警' }
      ]
    },
    { 
      type: 'select', 
      label: '处理状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '未处理', value: 'unprocessed' },
        { label: '处理中', value: 'processing' },
        { label: '已解决', value: 'resolved' }
      ]
    },
    { 
      type: 'select', 
      label: '告警源', 
      field: 'source',
      span: 8,
      options: [
        { label: '设备监控Agent', value: '设备监控Agent' },
        { label: '质量控制Agent', value: '质量控制Agent' },
        { label: '生产管理Agent', value: '生产管理Agent' },
        { label: '库存管理Agent', value: '库存管理Agent' },
        { label: '能源监控Agent', value: '能源监控Agent' },
        { label: '物流管理Agent', value: '物流管理Agent' },
        { label: '系统监控Agent', value: '系统监控Agent' }
      ]
    },
    { 
      type: 'dateRange', 
      label: '告警时间', 
      field: 'createTime',
      span: 12,
      placeholder: ['开始日期', '结束日期']
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '告警时间：从新到旧', value: 'createTime,desc' },
    { label: '告警时间：从旧到新', value: 'createTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '未处理', value: { status: 'unprocessed' }, color: 'red' },
    { label: '处理中', value: { status: 'processing' }, color: 'blue' },
    { label: '已解决', value: { status: 'resolved' }, color: 'green' },
    { label: '高级别', value: { level: 'high' }, color: 'red' },
    { label: '设备告警', value: { category: '设备告警' }, color: 'orange' }
  ];

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    let filtered = [...mockData];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      const keyword = params._keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.source.toLowerCase().includes(keyword) ||
        (item.description && item.description.toLowerCase().includes(keyword))
      );
    } else if (params.title) {
      // 按标题搜索
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(params.title.toLowerCase())
      );
    } else if (params.source) {
      // 按告警源搜索
      filtered = filtered.filter(item => 
        item.source.toLowerCase().includes(params.source.toLowerCase())
      );
    } else if (params.description) {
      // 按描述搜索
      filtered = filtered.filter(item => 
        item.description && item.description.toLowerCase().includes(params.description.toLowerCase())
      );
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
    console.log('导出告警数据:', params);
  };

  const columns: ColumnsType<AlertItem> = [
    {
      title: '告警标题',
      dataIndex: 'title',
      key: 'title',
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
      title: '告警级别',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: string) => {
        const config = {
          high: { color: 'red', text: '高' },
          medium: { color: 'orange', text: '中' },
          low: { color: 'blue', text: '低' },
        };
        return <Tag color={config[level as keyof typeof config].color}>{config[level as keyof typeof config].text}</Tag>;
      },
    },
    {
      title: '告警类别',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '告警来源',
      dataIndex: 'source',
      key: 'source',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const config = {
          unprocessed: { status: 'error', text: '未处理' },
          processing: { status: 'processing', text: '处理中' },
          resolved: { status: 'success', text: '已解决' },
        };
        return <Badge status={config[status as keyof typeof config].status as any} text={config[status as keyof typeof config].text} />;
      },
    },
    {
      title: '告警时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">查看详情</Button>
          <Button type="link" size="small">处理</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="alert-list-page">
      <Card title="告警列表">
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
          dataSource={filteredData} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AlertList;