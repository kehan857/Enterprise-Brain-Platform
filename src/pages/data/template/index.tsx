import React from 'react';
import { Card, Table, Button, Upload, message, Space } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface TemplateItem {
  id: string;
  name: string;
  industry: string;
  domain: string;
  updateTime: string;
  status: string;
}

const DataTemplate: React.FC = () => {
  // 示例数据
  const dataSource: TemplateItem[] = [
    {
      id: '1',
      name: '生产计划数据模板',
      industry: '制造业',
      domain: '生产管理',
      updateTime: '2024-01-15',
      status: '已发布',
    },
    {
      id: '2',
      name: '质量检测数据模板',
      industry: '制造业',
      domain: '质量管理',
      updateTime: '2024-01-14',
      status: '已发布',
    },
    {
      id: '3',
      name: '设备维护数据模板',
      industry: '制造业',
      domain: '设备管理',
      updateTime: '2024-01-13',
      status: '已发布',
    },
  ];

  const columns: ColumnsType<TemplateItem> = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '业务领域',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => message.success('开始下载模板')}
          >
            下载模板
          </Button>
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              message.info(`正在校验文件: ${file.name}`);
              return false;
            }}
          >
            <Button type="link" icon={<UploadOutlined />}>
              上传数据
            </Button>
          </Upload>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card title="标准指标体系数据模板" style={{ marginBottom: 24 }}>
        <Table<TemplateItem>
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </Card>

      <Card title="数据上传说明">
        <p>1. 下载对应业务领域的标准数据模板</p>
        <p>2. 按照模板格式整理数据</p>
        <p>3. 上传数据文件，系统自动进行格式校验</p>
        <p>4. 校验通过后，数据将被导入并映射到标准指标体系</p>
      </Card>
    </div>
  );
};

export default DataTemplate;