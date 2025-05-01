import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Typography, Tabs } from 'antd';
import { EyeOutlined, DownloadOutlined, ShareAltOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../components/SearchComponent';
import './ReportCenter.less';

const { Title, Paragraph } = Typography;

interface Report {
  id: string;
  title: string;
  category: string;
  createTime: string;
  creator: string;
  viewCount: number;
  downloadCount: number;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  description?: string;
  [key: string]: any;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: '2023年Q4经营分析报表',
    category: '经营分析',
    createTime: '2024-01-15 14:30',
    creator: '张三',
    viewCount: 128,
    downloadCount: 45,
    tags: ['财务', '经营'],
    status: 'published',
    description: '全面分析第四季度经营情况，包含销售、成本、利润等维度'
  },
  {
    id: '2',
    title: '2023年生产效率月度报表',
    category: '生产分析',
    createTime: '2024-01-14 10:20',
    creator: '李四',
    viewCount: 86,
    downloadCount: 32,
    tags: ['生产', '效率'],
    status: 'published',
    description: '分析各生产线月度效率情况，包含OEE、产能利用率等指标'
  },
  {
    id: '3',
    title: '销售业绩季度报表',
    category: '销售分析',
    createTime: '2024-01-13 16:45',
    creator: '王五',
    viewCount: 105,
    downloadCount: 38,
    tags: ['销售', '业绩'],
    status: 'published',
    description: '分析销售团队季度业绩情况，包含销售额、客户数、转化率等指标'
  },
  {
    id: '4',
    title: '产品质量月度分析',
    category: '质量分析',
    createTime: '2024-01-12 09:30',
    creator: '赵六',
    viewCount: 72,
    downloadCount: 25,
    tags: ['质量', '产品'],
    status: 'published',
    description: '分析主要产品的质量情况，包含不良率、返修率、客诉率等指标'
  },
  {
    id: '5',
    title: '能源消耗分析报表',
    category: '能源分析',
    createTime: '2024-01-11 11:20',
    creator: '张三',
    viewCount: 56,
    downloadCount: 18,
    tags: ['能源', '成本'],
    status: 'draft',
    description: '分析各部门能源消耗情况，识别能源浪费点，提出优化建议'
  },
  {
    id: '6',
    title: '人力资源分析报表',
    category: '人力分析',
    createTime: '2024-01-10 15:40',
    creator: '李四',
    viewCount: 63,
    downloadCount: 21,
    tags: ['人力', '效能'],
    status: 'published',
    description: '分析人力资源配置情况，包含人效、流动率、培训效果等指标'
  },
  {
    id: '7',
    title: '设备运行状态报表',
    category: '设备分析',
    createTime: '2024-01-09 14:10',
    creator: '王五',
    viewCount: 48,
    downloadCount: 16,
    tags: ['设备', '维护'],
    status: 'archived',
    description: '分析关键设备运行情况，包含开机率、故障率、维护情况等指标'
  }
];

const categories = ['经营分析', '生产分析', '销售分析', '质量分析', '能源分析', '人力分析', '设备分析'];

const ReportCenter: React.FC = () => {
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports);
  const [activeTab, setActiveTab] = useState<string>('all');

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '报表标题', value: 'title' },
    { label: '创建人', value: 'creator' },
    { label: '报表标签', value: 'tags' },
    { label: '报表描述', value: 'description' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '报表类别', 
      field: 'category',
      span: 8,
      options: categories.map(category => ({ label: category, value: category }))
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '已发布', value: 'published' },
        { label: '草稿', value: 'draft' },
        { label: '已归档', value: 'archived' }
      ]
    },
    { 
      type: 'input', 
      label: '标签', 
      field: 'tags',
      span: 8,
      placeholder: '请输入标签关键词'
    },
    { 
      type: 'dateRange', 
      label: '创建时间', 
      field: 'createTime',
      span: 12,
      placeholder: ['开始日期', '结束日期']
    },
    { 
      type: 'input', 
      label: '创建人', 
      field: 'creator',
      span: 12,
      placeholder: '请输入创建人'
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '创建时间：从新到旧', value: 'createTime,desc' },
    { label: '创建时间：从旧到新', value: 'createTime,asc' },
    { label: '浏览量：从高到低', value: 'viewCount,desc' },
    { label: '浏览量：从低到高', value: 'viewCount,asc' },
    { label: '下载量：从高到低', value: 'downloadCount,desc' },
    { label: '下载量：从低到高', value: 'downloadCount,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已发布', value: { status: 'published' }, color: 'green' },
    { label: '草稿', value: { status: 'draft' }, color: 'blue' },
    { label: '已归档', value: { status: 'archived' }, color: 'default' },
    { label: '经营分析', value: { category: '经营分析' }, color: 'purple' },
    { label: '生产分析', value: { category: '生产分析' }, color: 'orange' },
    { label: '销售分析', value: { category: '销售分析' }, color: 'magenta' }
  ];

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    let filtered = [...mockReports];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      const keyword = params._keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.creator.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        (item.description && item.description.toLowerCase().includes(keyword)) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    } else if (params.title) {
      // 按标题搜索
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(params.title.toLowerCase())
      );
    } else if (params.creator) {
      // 按创建人搜索
      filtered = filtered.filter(item => 
        item.creator.toLowerCase().includes(params.creator.toLowerCase())
      );
    } else if (params.tags) {
      // 按标签搜索
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(params.tags.toLowerCase()))
      );
    } else if (params.description) {
      // 按描述搜索
      filtered = filtered.filter(item => 
        item.description && item.description.toLowerCase().includes(params.description.toLowerCase())
      );
    }
    
    // 应用当前选中的标签页筛选
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
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
        } else if (key === 'tags') {
          // 标签筛选
          filtered = filtered.filter(item => 
            item.tags.some(tag => tag.toLowerCase().includes(String(value).toLowerCase()))
          );
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
    
    // 应用当前选中的标签页筛选
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.category === activeTab);
    }
    
    setFilteredReports(filtered);
  };

  // 处理导出
  const handleExport = (params: Record<string, any>) => {
    console.log('导出报表数据:', params);
  };

  // 处理标签页切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    
    if (key === 'all') {
      setFilteredReports(mockReports);
    } else {
      setFilteredReports(mockReports.filter(item => item.category === key));
    }
  };

  const getStatusTag = (status: Report['status']) => {
    const statusConfig = {
      published: { color: 'success', text: '已发布' },
      draft: { color: 'processing', text: '草稿' },
      archived: { color: 'default', text: '已归档' }
    };
    return <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>;
  };

  const columns: ColumnsType<Report> = [
    {
      title: '报表标题',
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
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      render: (tags: string[]) => (
        <Space size={[0, 4]} wrap>
          {tags.map(tag => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => getStatusTag(status),
    },
    {
      title: '浏览/下载',
      key: 'counts',
      width: 100,
      render: (_, record) => `${record.viewCount}/${record.downloadCount}`,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => console.log('查看报表', record.id)}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => console.log('下载报表', record.id)}
          >
            下载
          </Button>
          <Button
            type="link"
            size="small"
            icon={<ShareAltOutlined />}
            onClick={() => console.log('分享报表', record.id)}
          >
            分享
          </Button>
        </Space>
      ),
    },
  ];

  // 标签页配置
  const tabItems = [
    { key: 'all', label: '全部报表' },
    ...categories.map(category => ({ key: category, label: category }))
  ];

  return (
    <div className="report-center-page">
      <Card bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space direction="vertical" size="small">
            <Title level={4}>报表中心</Title>
            <Paragraph>
              管理和查看企业所有业务分析报表，支持多维度筛选和导出。
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
            <div className="action-wrapper">
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => console.log('新建报表')}
              >
                新建报表
              </Button>
            </div>
          </div>
          
          <Tabs 
            defaultActiveKey="all" 
            items={tabItems}
            onChange={handleTabChange}
          />
          
          <Table 
            columns={columns} 
            dataSource={filteredReports}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Space>
      </Card>
    </div>
  );
};

export default ReportCenter; 