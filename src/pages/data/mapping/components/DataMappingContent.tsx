import React, { useState, useEffect } from 'react';
import { Card, Table, Divider, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataItem {
  key: string;
  dataModel: string;
  sourceField: string;
  sourceType: string;
  sourceExample: string;
  sourceDatabase: string;
  sourceTable: string;
  targetField: string;
  targetType: string;
  targetExample: string;
  targetDatabase: string;
  targetTable: string;
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
      dataModel: '生成订单模型',
      sourceField: 'product_code',
      sourceType: 'STRING',
      sourceExample: 'P001',
      sourceDatabase: 'ERP_DB',
      sourceTable: 'products',
      targetField: '产品编码',
      targetType: 'STRING',
      targetExample: 'P001',
      targetDatabase: 'STD_DB',
      targetTable: 'std_products',
      mappingRule: '直接映射',
    },
    {
      key: '2',
      dataModel: '生成订单模型',
      sourceField: 'product_name',
      sourceType: 'STRING',
      sourceExample: '高速电机',
      sourceDatabase: 'ERP_DB',
      sourceTable: 'products',
      targetField: '产品名称',
      targetType: 'STRING',
      targetExample: '高速电机',
      targetDatabase: 'STD_DB',
      targetTable: 'std_products',
      mappingRule: '直接映射',
    },
    {
      key: '3',
      dataModel: '产值模型',
      sourceField: 'daily_output',
      sourceType: 'NUMBER',
      sourceExample: '100',
      sourceDatabase: 'MES_DB',
      sourceTable: 'production_data',
      targetField: '日产量',
      targetType: 'NUMBER',
      targetExample: '100',
      targetDatabase: 'STD_DB',
      targetTable: 'std_production',
      mappingRule: '数值转换',
    },
    {
      key: '4',
      dataModel: '产值模型',
      sourceField: 'production_date',
      sourceType: 'DATE',
      sourceExample: '2023-12-20',
      sourceDatabase: 'MES_DB',
      sourceTable: 'production_data',
      targetField: '生产日期',
      targetType: 'DATE',
      targetExample: '2023-12-20',
      targetDatabase: 'STD_DB',
      targetTable: 'std_production',
      mappingRule: '直接映射',
    },
    {
      key: '5',
      dataModel: '订货模型',
      sourceField: 'quality_pass',
      sourceType: 'BOOLEAN',
      sourceExample: 'true',
      sourceDatabase: 'QMS_DB',
      sourceTable: 'quality_check',
      targetField: '质检通过',
      targetType: 'BOOLEAN',
      targetExample: '是',
      targetDatabase: 'STD_DB',
      targetTable: 'std_quality',
      mappingRule: '条件映射',
    },
    {
      key: '6',
      dataModel: '订单生命周期模型',
      sourceField: 'full_name',
      sourceType: 'STRING',
      sourceExample: '高速电机-A型',
      sourceDatabase: 'ERP_DB',
      sourceTable: 'product_details',
      targetField: '产品全称',
      targetType: 'STRING',
      targetExample: '高速电机-A型',
      targetDatabase: 'STD_DB',
      targetTable: 'std_products',
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
        item.mappingRule.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.sourceDatabase.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.sourceTable.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.dataModel.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.targetDatabase.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.targetTable.toLowerCase().includes(searchParams._keyword.toLowerCase())
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
      title: '数据模型',
      dataIndex: 'dataModel',
      key: 'dataModel',
      render: (text: string) => <Tag color="magenta">{text}</Tag>,
    },
    {
      title: '源字段',
      dataIndex: 'sourceField',
      key: 'sourceField',
    },
    {
      title: '所属库',
      dataIndex: 'sourceDatabase',
      key: 'sourceDatabase',
      render: (text: string) => <Tag color="volcano">{text}</Tag>,
    },
    {
      title: '所属表',
      dataIndex: 'sourceTable',
      key: 'sourceTable',
      render: (text: string) => <Tag color="gold">{text}</Tag>,
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
      title: '目标库',
      dataIndex: 'targetDatabase',
      key: 'targetDatabase',
      render: (text: string) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: '目标表',
      dataIndex: 'targetTable',
      key: 'targetTable',
      render: (text: string) => <Tag color="lime">{text}</Tag>,
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
        scroll={{ x: 1500 }}
      />
      <Divider orientation="left">映射说明</Divider>
      <Space direction="vertical">
        <div>1. 数据模型：数据来源模型</div>
        <div>2. 源字段：原始数据表中的字段名称</div>
        <div>3. 所属库：源字段所在的数据库</div>
        <div>4. 所属表：源字段所在的数据表</div>
        <div>5. 源类型：原始数据的数据类型</div>
        <div>6. 源示例值：原始数据的示例值</div>
        <div>7. 目标字段：标准指标体系中的字段名称</div>
        <div>8. 目标库：标准字段所在的数据库</div>
        <div>9. 目标表：标准字段所在的数据表</div>
        <div>10. 目标类型：标准指标的数据类型</div>
        <div>11. 目标示例值：转换后的示例值</div>
        <div>12. 映射规则：数据转换的规则说明</div>
      </Space>
    </Card>
  );
};

export default DataMappingContent;