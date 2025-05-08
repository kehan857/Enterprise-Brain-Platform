import React, { useState } from 'react';
import { Card, List, Tag, Button, Space, Tabs, Alert, message } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

interface AnalysisReport {
  id: string;
  title: string;
  domain: string;
  createTime: string;
  status: 'new' | 'read';
  summary: string;
  findings: string[];
  creator?: string;
  type?: string;
  [key: string]: any; // 添加索引签名
}

const AnalysisReport: React.FC = () => {
  const navigate = useNavigate();
  const allReports: AnalysisReport[] = [
    {
      id: '1',
      title: '2024年1月生产效率分析报告',
      domain: '生产',
      createTime: '2024-01-20 15:30:00',
      status: 'new',
      summary: '本月生产线整体效率提升3.5%，但2号线存在效率波动问题',
      findings: [
        '产线平均OEE为85.6%，环比提升3.5%',
        '2号线效率波动明显，建议排查设备状态',
        '原材料库存周转率提升2.1%',
      ],
      creator: '张三',
      type: '周期性报告'
    },
    {
      id: '2',
      title: '2024年1月质量分析报告',
      domain: '质量',
      createTime: '2024-01-20 14:00:00',
      status: 'read',
      summary: '产品合格率保持稳定，A类产品质量有提升空间',
      findings: [
        '整体合格率98.5%，符合目标要求',
        'A类产品一次合格率有下降趋势',
        '质量问题主要集中在表面处理环节',
      ],
      creator: '李四',
      type: '周期性报告'
    },
    {
      id: '3',
      title: '供应链异常分析报告',
      domain: '供应链',
      createTime: '2024-01-19 09:45:00',
      status: 'read',
      summary: '本月发现3起供应链延迟问题，主要受天气因素影响',
      findings: [
        '华东区域交货延迟率上升5.2%',
        '主要供应商准时率为92.3%',
        '建议增加关键原材料安全库存',
      ],
      creator: '王五',
      type: '异常报告'
    },
    {
      id: '4',
      title: '设备健康状态分析报告',
      domain: '设备',
      createTime: '2024-01-18 16:30:00',
      status: 'new',
      summary: '关键设备健康状态良好，3台设备存在潜在故障风险',
      findings: [
        '设备平均可用率98.2%',
        '注塑机组轴承振动异常，建议排查',
        '装配线传感器数据波动，需校准',
      ],
      creator: '赵六',
      type: '健康报告'
    },
    {
      id: '5',
      title: '成本效益分析报告',
      domain: '财务',
      createTime: '2024-01-17 14:20:00',
      status: 'read',
      summary: '生产线优化措施实施后，单位产品成本下降3.8%',
      findings: [
        '直接材料成本降低2.5%',
        '能源消耗降低5.3%',
        '人工效率提升4.1%',
      ],
      creator: '张三',
      type: '专题报告'
    }
  ];

  const [filteredReports, setFilteredReports] = useState<AnalysisReport[]>(allReports);
  const [currentTab, setCurrentTab] = useState<string>('all');

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '报告标题', value: 'title' },
    { label: '生成人', value: 'creator' },
    { label: '业务域', value: 'domain' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '业务域', 
      field: 'domain',
      span: 8,
      options: [
        { label: '生产', value: '生产' },
        { label: '质量', value: '质量' },
        { label: '供应链', value: '供应链' },
        { label: '设备', value: '设备' },
        { label: '财务', value: '财务' }
      ]
    },
    { 
      type: 'select', 
      label: '报告类型', 
      field: 'type',
      span: 8,
      options: [
        { label: '周期性报告', value: '周期性报告' },
        { label: '异常报告', value: '异常报告' },
        { label: '健康报告', value: '健康报告' },
        { label: '专题报告', value: '专题报告' }
      ]
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '未读', value: 'new' },
        { label: '已读', value: 'read' }
      ]
    },
    { 
      type: 'dateRange', 
      label: '生成时间', 
      field: 'createTime',
      span: 12,
      placeholder: ['开始日期', '结束日期']
    },
    { 
      type: 'input', 
      label: '生成人', 
      field: 'creator',
      span: 12,
      placeholder: '请输入生成人'
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '生成时间：从新到旧', value: 'createTime,desc' },
    { label: '生成时间：从旧到新', value: 'createTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '未读', value: { status: 'new' }, color: 'red' },
    { label: '生产报告', value: { domain: '生产' }, color: 'blue' },
    { label: '质量报告', value: { domain: '质量' }, color: 'green' },
    { label: '供应链报告', value: { domain: '供应链' }, color: 'purple' },
    { label: '设备报告', value: { domain: '设备' }, color: 'orange' }
  ];

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    filterReportsByParams(params);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    filterReportsByParams(params);
  };

  // 根据参数过滤报告
  const filterReportsByParams = (params: Record<string, any>) => {
    let filtered = [...allReports];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      const keyword = params._keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.domain.toLowerCase().includes(keyword) ||
        (item.creator && item.creator.toLowerCase().includes(keyword)) ||
        item.summary.toLowerCase().includes(keyword)
      );
    } else if (params.title) {
      // 按标题搜索
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(params.title.toLowerCase())
      );
    } else if (params.creator) {
      // 按生成人搜索
      filtered = filtered.filter(item => 
        item.creator && item.creator.toLowerCase().includes(params.creator.toLowerCase())
      );
    } else if (params.domain) {
      // 按业务域搜索
      filtered = filtered.filter(item => 
        item.domain.toLowerCase().includes(params.domain.toLowerCase())
      );
    }
    
    // 处理高级筛选
    ['domain', 'type', 'status'].forEach(field => {
      if (params[field]) {
        filtered = filtered.filter(item => item[field] === params[field]);
      }
    });
    
    // 处理日期范围
    if (params.createTime && Array.isArray(params.createTime) && params.createTime.length === 2) {
      const [start, end] = params.createTime;
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.createTime);
        return itemDate >= start && itemDate <= end;
      });
    }
    
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
    
    // 应用当前选项卡过滤
    if (currentTab !== 'all') {
      filtered = filtered.filter(item => item.domain === currentTab);
    }
    
    setFilteredReports(filtered);
  };

  // 处理选项卡切换
  const handleTabChange = (key: string) => {
    setCurrentTab(key);
    if (key === 'all') {
      setFilteredReports(allReports);
    } else {
      setFilteredReports(allReports.filter(item => item.domain === key));
    }
  };

  // 跳转到报表中心
  const goToReportCenter = () => {
    navigate('/report?source=analysis');
  };

  // 处理报告下载
  const handleDownloadReport = (report: AnalysisReport) => {
    message.success(`开始下载报告：${report.title}`);
    // 这里实现实际的下载逻辑，可以使用window.open等方式
    // 模拟下载行为
    setTimeout(() => {
      message.success(`${report.title} 下载完成`);
    }, 1500);
  };

  // 渲染列表项
  const renderListItem = (item: AnalysisReport) => (
    <List.Item
      actions={[
        <Button type="link" icon={<EyeOutlined />} onClick={goToReportCenter}>查看</Button>,
        <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownloadReport(item)}>下载</Button>,
      ]}
    >
      <List.Item.Meta
        title={
          <Space>
            {item.title}
            {item.status === 'new' && (
              <Tag color="#f50">新</Tag>
            )}
          </Space>
        }
        description={`${item.domain} · ${item.createTime} · ${item.creator || '系统生成'}`}
      />
    </List.Item>
  );

  // 生成Tab项
  const tabItems = [
    {
      key: 'all',
      label: '全部报告',
      children: (
        <List
          dataSource={filteredReports}
          renderItem={renderListItem}
        />
      ),
    },
    {
      key: '生产',
      label: '生产报告',
      children: (
        <List
          dataSource={filteredReports}
          renderItem={renderListItem}
        />
      ),
    },
    {
      key: '质量',
      label: '质量报告',
      children: (
        <List
          dataSource={filteredReports}
          renderItem={renderListItem}
        />
      ),
    },
    {
      key: '供应链',
      label: '供应链报告',
      children: (
        <List
          dataSource={filteredReports}
          renderItem={renderListItem}
        />
      ),
    },
  ];

  return (
    <div className="analysis-report-page">
      <Card>
        <Alert 
          message="分析报告"
          description="所有由智能分析中心生成的分析报告都会显示在此列表中。详细报告内容请点击'查看'按钮前往报表中心查看。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          action={
            <Button type="primary" onClick={goToReportCenter}>
              前往报表中心查看完整报告
            </Button>
          }
        />
        
        <div className="header-actions">
          <div className="search-wrapper">
            <SearchComponent 
              searchFields={searchFields}
              filters={filters}
              sortOptions={sortOptions}
              quickFilters={quickFilters}
              onSearch={handleSearch}
              onFilter={handleFilter}
              enableExport={true}
            />
          </div>
        </div>

        <Tabs
          defaultActiveKey="all"
          items={tabItems}
          onChange={handleTabChange}
        />
      </Card>
    </div>
  );
};

export default AnalysisReport;