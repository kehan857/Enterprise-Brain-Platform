import React from 'react';
import { Card, Table, Descriptions, Button, Space } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface TemplateField {
  field: string;
  type: string;
  required: boolean;
  description: string;
  example: string;
}

interface DataTemplateExampleProps {
  templateName: string;
  templateDescription: string;
  fields: TemplateField[];
  onDownload?: () => void;
  onPreview?: () => void;
}

const DataTemplateExample: React.FC<DataTemplateExampleProps> = ({
  templateName,
  templateDescription,
  fields,
  onDownload,
  onPreview,
}) => {
  const columns: ColumnsType<TemplateField> = [
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
      title: '是否必填',
      dataIndex: 'required',
      key: 'required',
      render: (required: boolean) => required ? '是' : '否',
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '示例值',
      dataIndex: 'example',
      key: 'example',
    },
  ];

  return (
    <Card 
      title="模板示例" 
      size="small" 
      style={{ marginTop: 16 }}
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
      <Descriptions size="small" column={1}>
        <Descriptions.Item label="模板名称">{templateName}</Descriptions.Item>
        <Descriptions.Item label="模板说明">{templateDescription}</Descriptions.Item>
      </Descriptions>
      <Table<TemplateField>
        columns={columns}
        dataSource={fields}
        pagination={false}
        size="small"
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};

export default DataTemplateExample;