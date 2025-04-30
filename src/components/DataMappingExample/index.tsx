import React from 'react';
import { Card, Table, Divider, Button, Space } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface SourceData {
  field: string;
  type: string;
  example: string;
}

interface TargetData {
  indicator: string;
  type: string;
  example: string;
}

interface DataMappingExampleProps {
  sourceData: SourceData[];
  targetData: TargetData[];
  onDownload?: () => void;
  onPreview?: () => void;
}

const DataMappingExample: React.FC<DataMappingExampleProps> = ({ sourceData, targetData, onDownload, onPreview }) => {
  const sourceColumns: ColumnsType<SourceData> = [
    {
      title: '字段名',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '示例值',
      dataIndex: 'example',
      key: 'example',
    },
  ];

  const targetColumns: ColumnsType<TargetData> = [
    {
      title: '指标名',
      dataIndex: 'indicator',
      key: 'indicator',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '示例值',
      dataIndex: 'example',
      key: 'example',
    },
  ];

  return (
    <Card 
      title="数据映射示例" 
      size="small"
      extra={
        <Space>
          <Button 
            icon={<DownloadOutlined />} 
            size="small" 
            onClick={onDownload}
          >
            下载
          </Button>
          <Button 
            icon={<EyeOutlined />} 
            size="small" 
            onClick={onPreview}
          >
            预览
          </Button>
        </Space>
      }
    >
      <h4>源数据格式</h4>
      <Table<SourceData>
        columns={sourceColumns}
        dataSource={sourceData}
        pagination={false}
        size="small"
      />
      <Divider>映射转换</Divider>
      <h4>标准指标格式</h4>
      <Table<TargetData>
        columns={targetColumns}
        dataSource={targetData}
        pagination={false}
        size="small"
      />
    </Card>
  );
};

export default DataMappingExample;