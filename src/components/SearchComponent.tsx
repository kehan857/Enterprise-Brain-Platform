import React, { useState } from 'react';
import { Input, Select, Button, DatePicker, Form, Row, Col, Space, Card, Tag } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';
import './SearchComponent.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

// 搜索字段类型
export interface SearchField {
  label: string;
  value: string;
}

// 筛选条件配置
export interface FilterConfig {
  type: 'date' | 'dateRange' | 'select' | 'numberRange' | 'input';
  label: string;
  field: string;
  span?: number;
  placeholder?: string | string[];
  options?: Array<{ label: string; value: string | number }>;
  mode?: 'multiple' | 'tags';
}

// 快捷筛选条件
export interface QuickFilter {
  label: string;
  value: Record<string, any>;
  color?: string;
}

// 排序选项
export interface SortOption {
  label: string;
  value: string;
}

interface SearchComponentProps {
  searchFields: SearchField[];
  filters?: FilterConfig[];
  sortOptions?: SortOption[];
  quickFilters?: QuickFilter[];
  enableExport?: boolean;
  onSearch?: (params: Record<string, any>) => void;
  onFilter?: (params: Record<string, any>) => void;
  onExport?: (params: Record<string, any>) => void;
  onSaveFilter?: (filter: Record<string, any> & { name: string }) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchFields,
  filters = [],
  sortOptions = [],
  quickFilters = [],
  enableExport = false,
  onSearch,
  onFilter,
  onExport,
  onSaveFilter
}) => {
  const [searchField, setSearchField] = useState(searchFields[0]?.value || 'all');
  const [searchValue, setSearchValue] = useState('');
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [sortBy, setSortBy] = useState(sortOptions[0]?.value || '');

  // 处理基础搜索
  const handleBasicSearch = () => {
    const params: Record<string, any> = {};
    
    if (searchValue) {
      if (searchField === 'all') {
        // 全部字段搜索
        params._keyword = searchValue;
      } else {
        // 指定字段搜索
        params[searchField] = searchValue;
      }
    }

    // 合并快捷筛选条件
    selectedQuickFilters.forEach(filterKey => {
      const filter = quickFilters.find(f => f.label === filterKey);
      if (filter) {
        Object.entries(filter.value).forEach(([key, value]) => {
          params[key] = value;
        });
      }
    });

    onSearch?.(params);
  };

  // 处理高级筛选
  const handleAdvancedFilter = () => {
    const values = form.getFieldsValue();
    
    // 添加排序字段
    if (sortBy) {
      values.sortBy = sortBy;
    }
    
    onFilter?.(values);
    setAdvancedVisible(false);
  };

  // 重置筛选条件
  const resetFilter = () => {
    form.resetFields();
    setSortBy(sortOptions[0]?.value || '');
  };

  // 处理快捷筛选
  const handleQuickFilterClick = (label: string) => {
    const newSelected = [...selectedQuickFilters];
    const index = newSelected.indexOf(label);
    
    if (index >= 0) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(label);
    }
    
    setSelectedQuickFilters(newSelected);
    
    // 根据新的筛选条件立即搜索
    setTimeout(handleBasicSearch, 0);
  };

  // 处理导出
  const handleExport = () => {
    const params = {
      searchField,
      searchValue,
      ...form.getFieldsValue(),
      sortBy
    };
    
    onExport?.(params);
  };

  // 渲染筛选控件
  const renderFilterControl = (filter: FilterConfig) => {
    const { type, field, placeholder, options, mode } = filter;
    
    switch (type) {
      case 'select':
        return (
          <Select 
            placeholder={placeholder as string} 
            style={{ width: '100%' }} 
            mode={mode}
          >
            {options?.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      
      case 'dateRange':
        return (
          <RangePicker 
            style={{ width: '100%' }} 
            placeholder={Array.isArray(placeholder) ? placeholder as [string, string] : ['开始日期', '结束日期']}
          />
        );
      
      case 'numberRange':
        return (
          <Input.Group compact>
            <Input
              style={{ width: '45%' }}
              placeholder={Array.isArray(placeholder) ? placeholder[0] : '最小值'}
            />
            <Input
              style={{ width: '10%', borderLeft: 0, borderRight: 0, pointerEvents: 'none', textAlign: 'center' }}
              placeholder="~"
              disabled
            />
            <Input
              style={{ width: '45%' }}
              placeholder={Array.isArray(placeholder) ? placeholder[1] : '最大值'}
            />
          </Input.Group>
        );
      
      case 'date':
        return (
          <DatePicker
            style={{ width: '100%' }}
            placeholder={placeholder as string}
          />
        );
      
      case 'input':
      default:
        return <Input placeholder={placeholder as string} />;
    }
  };

  return (
    <div className="search-component">
      <div className="header-actions">
        <div className="search-wrapper">
          <div className="basic-search">
            <Input.Group compact>
              <Select 
                value={searchField} 
                onChange={setSearchField}
                className="search-field-selector"
              >
                {searchFields.map(field => (
                  <Option key={field.value} value={field.value}>
                    {field.label}
                  </Option>
                ))}
              </Select>
              <Input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onPressEnter={handleBasicSearch}
                placeholder="请输入关键词搜索"
                className="search-input"
              />
              <Button
                icon={<SearchOutlined />}
                onClick={handleBasicSearch}
                type="primary"
                className="search-button"
              />
              <Button
                type="text"
                icon={advancedVisible ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setAdvancedVisible(!advancedVisible)}
                className="advanced-toggle"
              />
            </Input.Group>

            {quickFilters.length > 0 && (
              <div className="quick-filters">
                {quickFilters.map(filter => (
                  <Tag
                    key={filter.label}
                    color={selectedQuickFilters.includes(filter.label) ? filter.color : undefined}
                    className={selectedQuickFilters.includes(filter.label) ? 'active-filter' : ''}
                    onClick={() => handleQuickFilterClick(filter.label)}
                  >
                    {filter.label}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          {advancedVisible && (
            <Card className="advanced-search">
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  {filters.map(filter => (
                    <Col span={filter.span || 8} key={filter.field}>
                      <Form.Item label={filter.label} name={filter.field}>
                        {renderFilterControl(filter)}
                      </Form.Item>
                    </Col>
                  ))}
                </Row>

                {sortOptions.length > 0 && (
                  <div className="sort-options">
                    <span className="sort-label">排序：</span>
                    <Select
                      value={sortBy}
                      onChange={setSortBy}
                      style={{ width: 200 }}
                      placeholder="选择排序方式"
                    >
                      {sortOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}

                <div className="filter-actions">
                  <Space>
                    <Button onClick={resetFilter}>重置</Button>
                    <Button type="primary" onClick={handleAdvancedFilter}>应用筛选</Button>
                    {onSaveFilter && (
                      <Button onClick={() => {
                        const values = form.getFieldsValue();
                        onSaveFilter({ ...values, name: '未命名筛选条件' });
                      }}>
                        保存筛选
                      </Button>
                    )}
                    {enableExport && (
                      <Button onClick={handleExport}>导出</Button>
                    )}
                  </Space>
                </div>
              </Form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent; 