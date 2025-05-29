import React, { useState } from 'react';
import { Card, Form, Select, Button, Row, Col, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DataMappingContent from './components/DataMappingContent';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

const { Title } = Typography;

const DataMapping: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<string>('erp'); // 默认选择ERP系统
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});

  // 返回到数据查询页面
  const handleGoBack = () => {
    navigate('/data-query');
  };

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '数据模型', value: 'dataModel' },
    { label: '源字段', value: 'sourceField' },
    { label: '所属库', value: 'sourceDatabase' },
    { label: '所属表', value: 'sourceTable' },
    { label: '目标字段', value: 'targetField' },
    { label: '目标库', value: 'targetDatabase' },
    { label: '目标表', value: 'targetTable' },
    { label: '映射规则', value: 'mappingRule' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '数据模型', 
      field: 'dataModel',
      span: 8,
      options: [
        { label: '生成订单模型', value: '生成订单模型' },
        { label: '产值模型', value: '产值模型' },
        { label: '订货模型', value: '订货模型' },
        { label: '订单生命周期模型', value: '订单生命周期模型' }
      ]
    },
    { 
      type: 'select', 
      label: '所属库', 
      field: 'sourceDatabase',
      span: 8,
      options: [
        { label: 'ERP_DB', value: 'ERP_DB' },
        { label: 'MES_DB', value: 'MES_DB' },
        { label: 'QMS_DB', value: 'QMS_DB' }
      ]
    },
    { 
      type: 'select', 
      label: '所属表', 
      field: 'sourceTable',
      span: 8,
      options: [
        { label: 'products', value: 'products' },
        { label: 'product_details', value: 'product_details' },
        { label: 'production_data', value: 'production_data' },
        { label: 'quality_check', value: 'quality_check' }
      ]
    },
    { 
      type: 'select', 
      label: '目标库', 
      field: 'targetDatabase',
      span: 8,
      options: [
        { label: 'STD_DB', value: 'STD_DB' }
      ]
    },
    { 
      type: 'select', 
      label: '目标表', 
      field: 'targetTable',
      span: 8,
      options: [
        { label: 'std_products', value: 'std_products' },
        { label: 'std_production', value: 'std_production' },
        { label: 'std_quality', value: 'std_quality' }
      ]
    },
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
    { label: '目标字段名称: Z-A', value: 'targetField,desc' },
    { label: '所属库: A-Z', value: 'sourceDatabase,asc' },
    { label: '所属库: Z-A', value: 'sourceDatabase,desc' },
    { label: '所属表: A-Z', value: 'sourceTable,asc' },
    { label: '所属表: Z-A', value: 'sourceTable,desc' },
    { label: '目标库: A-Z', value: 'targetDatabase,asc' },
    { label: '目标库: Z-A', value: 'targetDatabase,desc' },
    { label: '目标表: A-Z', value: 'targetTable,asc' },
    { label: '目标表: Z-A', value: 'targetTable,desc' },
    { label: '数据模型: A-Z', value: 'dataModel,asc' },
    { label: '数据模型: Z-A', value: 'dataModel,desc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '直接映射', value: { mappingRule: '直接映射' }, color: 'blue' },
    { label: '数值转换', value: { mappingRule: '数值转换' }, color: 'green' },
    { label: 'ERP数据库', value: { sourceDatabase: 'ERP_DB' }, color: 'volcano' },
    { label: 'MES数据库', value: { sourceDatabase: 'MES_DB' }, color: 'orange' },
    { label: '生成订单模型', value: { dataModel: '生成订单模型' }, color: 'magenta' },
    { label: '产值模型', value: { dataModel: '产值模型' }, color: 'purple' },
    { label: 'STD标准库', value: { targetDatabase: 'STD_DB' }, color: 'cyan' },
    { label: '产品表', value: { targetTable: 'std_products' }, color: 'lime' }
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

  // 处理查询
  const handleQuery = () => {
    console.log('查询数据源:', selectedSource);
    // 这里可以根据所选数据源更新数据
  };

  return (
    <div className="data-mapping-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Button 
            type="default" 
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            style={{ marginRight: 16 }}
          >
            返回数据查询
          </Button>
          <Title level={4} style={{ margin: 0, display: 'inline' }}>数据映射查询</Title>
        </Col>
      </Row>

      <Card title="数据映射查询" style={{ marginBottom: 24 }}>
        <Form layout="inline" style={{ marginBottom: 24 }}>
          <Form.Item label="数据模型">
            <Select
              style={{ width: 200 }}
              placeholder="选择数据模型"
              value={selectedSource}
              onChange={setSelectedSource}
              options={[
                { value: 'order_gen', label: '生成订单模型' },
                { value: 'output', label: '产值模型' },
                { value: 'ordering', label: '订货模型' },
                { value: 'order_lifecycle', label: '订单生命周期模型' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleQuery}>查询</Button>
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

        {/* 直接显示数据列表，不需要根据条件判断是否显示 */}
        <DataMappingContent searchParams={searchParams} />
      </Card>
    </div>
  );
};

export default DataMapping;