import React, { useState } from 'react';
import { Card, Form, Select, Button } from 'antd';
import DataMappingContent from './components/DataMappingContent';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

const DataMapping: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<string>('');
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '源字段', value: 'sourceField' },
    { label: '目标字段', value: 'targetField' },
    { label: '映射规则', value: 'mappingRule' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '源类型', 
      field: 'sourceType',
      span: 8,
      options: [
        { label: 'STRING', value: 'STRING' },
        { label: 'NUMBER', value: 'NUMBER' },
        { label: 'DATE', value: 'DATE' },
        { label: 'BOOLEAN', value: 'BOOLEAN' }
      ]
    },
    { 
      type: 'select', 
      label: '目标类型', 
      field: 'targetType',
      span: 8,
      options: [
        { label: 'STRING', value: 'STRING' },
        { label: 'NUMBER', value: 'NUMBER' },
        { label: 'DATE', value: 'DATE' },
        { label: 'BOOLEAN', value: 'BOOLEAN' }
      ]
    },
    { 
      type: 'select', 
      label: '映射类型', 
      field: 'mappingType',
      span: 8,
      options: [
        { label: '直接映射', value: 'direct' },
        { label: '数值转换', value: 'conversion' },
        { label: '拼接', value: 'concatenation' },
        { label: '条件映射', value: 'conditional' }
      ]
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '源字段名称: A-Z', value: 'sourceField,asc' },
    { label: '源字段名称: Z-A', value: 'sourceField,desc' },
    { label: '目标字段名称: A-Z', value: 'targetField,asc' },
    { label: '目标字段名称: Z-A', value: 'targetField,desc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '直接映射', value: { mappingRule: '直接映射' }, color: 'blue' },
    { label: '数值转换', value: { mappingRule: '数值转换' }, color: 'green' },
    { label: 'STRING类型', value: { sourceType: 'STRING' }, color: 'orange' },
    { label: 'NUMBER类型', value: { sourceType: 'NUMBER' }, color: 'purple' }
  ];

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    setSearchParams(params);
    console.log('搜索参数:', params);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    setSearchParams(params);
    console.log('筛选参数:', params);
  };

  return (
    <div className="data-mapping-page">
      <Card title="数据映射配置" style={{ marginBottom: 24 }}>
        <Form layout="inline" style={{ marginBottom: 24 }}>
          <Form.Item label="数据源">
            <Select
              style={{ width: 200 }}
              placeholder="选择数据源"
              value={selectedSource}
              onChange={setSelectedSource}
              options={[
                { value: 'erp', label: 'ERP系统' },
                { value: 'mes', label: 'MES系统' },
              ]}
            />
          </Form.Item>
          <Form.Item label="指标体系">
            <Select
              style={{ width: 200 }}
              placeholder="选择指标体系"
              value={selectedSystem}
              onChange={setSelectedSystem}
              options={[
                { value: 'production', label: '生产指标' },
                { value: 'quality', label: '质量指标' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
          </Form.Item>
        </Form>

        {/* 搜索组件 */}
        <div className="search-section">
          <SearchComponent 
            searchFields={searchFields}
            filters={filters}
            sortOptions={sortOptions}
            quickFilters={quickFilters}
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        </div>

        {selectedSource && selectedSystem && <DataMappingContent searchParams={searchParams} />}
      </Card>
    </div>
  );
};

export default DataMapping;