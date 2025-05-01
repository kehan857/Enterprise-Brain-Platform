import React, { useState, useEffect } from 'react';
import { Card, Table, Divider, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataItem {
  key: string;
  sourceField: string;
  sourceType: string;
  sourceExample: string;
  targetField: string;
  targetType: string;
  targetExample: string;
  mappingRule: string;
}

interface DataMappingContentProps {
  searchParams?: Record<string, any>;
}

const DataMappingContent: React.FC<DataMappingContentProps> = ({ searchParams = {} }) => {
  // 示例数据
  const originalData: DataItem[] = [
    {
      key: '1',
      sourceField: 'product_code',
      sourceType: 'STRING',
      sourceExample: 'P001',
      targetField: '产品编码',
      targetType: 'STRING',
      targetExample: 'P001',
      mappingRule: '直接映射',
    },
    {
      key: '2',
      sourceField: 'product_name',
      sourceType: 'STRING',
      sourceExample: '高速电机',
      targetField: '产品名称',
      targetType: 'STRING',
      targetExample: '高速电机',
      mappingRule: '直接映射',
    },
    {
      key: '3',
      sourceField: 'daily_output',
      sourceType: 'NUMBER',
      sourceExample: '100',
      targetField: '日产量',
      targetType: 'NUMBER',
      targetExample: '100',
      mappingRule: '数值转换',
    },
    {
      key: '4',
      sourceField: 'production_date',
      sourceType: 'DATE',
      sourceExample: '2023-12-20',
      targetField: '生产日期',
      targetType: 'DATE',
      targetExample: '2023-12-20',
      mappingRule: '直接映射',
    },
    {
      key: '5',
      sourceField: 'quality_pass',
      sourceType: 'BOOLEAN',
      sourceExample: 'true',
      targetField: '质检通过',
      targetType: 'BOOLEAN',
      targetExample: '是',
      mappingRule: '条件映射',
    },
    {
      key: '6',
      sourceField: 'full_name',
      sourceType: 'STRING',
      sourceExample: '高速电机-A型',
      targetField: '产品全称',
      targetType: 'STRING',
      targetExample: '高速电机-A型',
      mappingRule: '拼接',
    },
  ];

  const [filteredData, setFilteredData] = useState<DataItem[]>(originalData);

  // 当搜索参数变化时，过滤数据
  useEffect(() => {
    let filtered = [...originalData];
    
    // 处理基础搜索
    if (searchParams._keyword) {
      // 全字段搜索
      filtered = filtered.filter(item => 
        item.sourceField.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.targetField.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.mappingRule.toLowerCase().includes(searchParams._keyword.toLowerCase())
      );
    } else if (searchParams.sourceField) {
      // 源字段搜索
      filtered = filtered.filter(item => 
        item.sourceField.toLowerCase().includes(searchParams.sourceField.toLowerCase())
      );
    } else if (searchParams.targetField) {
      // 目标字段搜索
      filtered = filtered.filter(item => 
        item.targetField.toLowerCase().includes(searchParams.targetField.toLowerCase())
      );
    } else if (searchParams.mappingRule) {
      // 映射规则搜索
      filtered = filtered.filter(item => 
        item.mappingRule.toLowerCase().includes(searchParams.mappingRule.toLowerCase())
      );
    }
    
    // 处理高级筛选
    if (searchParams.sourceType) {
      filtered = filtered.filter(item => item.sourceType === searchParams.sourceType);
    }
    
    if (searchParams.targetType) {
      filtered = filtered.filter(item => item.targetType === searchParams.targetType);
    }
    
    if (searchParams.mappingType) {
      const mappingTypeMap: Record<string, string> = {
        'direct': '直接映射',
        'conversion': '数值转换',
        'concatenation': '拼接',
        'conditional': '条件映射'
      };
      filtered = filtered.filter(item => item.mappingRule === mappingTypeMap[searchParams.mappingType]);
    }
    
    // 处理排序
    if (searchParams.sortBy) {
      const [field, order] = searchParams.sortBy.split(',');
      filtered = [...filtered].sort((a, b) => {
        if (order === 'asc') {
          return a[field as keyof DataItem] > b[field as keyof DataItem] ? 1 : -1;
        } else {
          return a[field as keyof DataItem] < b[field as keyof DataItem] ? 1 : -1;
        }
      });
    }
    
    setFilteredData(filtered);
  }, [searchParams]);

  const columns: ColumnsType<DataItem> = [
    {
      title: '源字段',
      dataIndex: 'sourceField',
      key: 'sourceField',
    },
    {
      title: '源类型',
      dataIndex: 'sourceType',
      key: 'sourceType',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '源示例值',
      dataIndex: 'sourceExample',
      key: 'sourceExample',
    },
    {
      title: '目标字段',
      dataIndex: 'targetField',
      key: 'targetField',
    },
    {
      title: '目标类型',
      dataIndex: 'targetType',
      key: 'targetType',
      render: (text: string) => <Tag color="green">{text}</Tag>,
    },
    {
      title: '目标示例值',
      dataIndex: 'targetExample',
      key: 'targetExample',
    },
    {
      title: '映射规则',
      dataIndex: 'mappingRule',
      key: 'mappingRule',
      render: (text: string) => <Tag color="purple">{text}</Tag>,
    },
  ];

  return (
    <Card title="数据映射内容" className="mapping-content-card">
      <Table<DataItem>
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        size="middle"
        bordered
      />
      <Divider orientation="left">映射说明</Divider>
      <Space direction="vertical">
        <div>1. 源字段：原始数据表中的字段名称</div>
        <div>2. 源类型：原始数据的数据类型</div>
        <div>3. 源示例值：原始数据的示例值</div>
        <div>4. 目标字段：标准指标体系中的字段名称</div>
        <div>5. 目标类型：标准指标的数据类型</div>
        <div>6. 目标示例值：转换后的示例值</div>
        <div>7. 映射规则：数据转换的规则说明</div>
      </Space>
    </Card>
  );
};

export default DataMappingContent;