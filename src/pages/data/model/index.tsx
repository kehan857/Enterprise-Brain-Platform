import React, { useState } from 'react';
import { Card, Typography, Table, Button, Input, Select, Tag, Space, Modal, Form, Row, Col, Upload, message } from 'antd';
import { SearchOutlined, CloseOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface DataItem {
  key: string;
  name: string;
  domain: string;
  type: string;
  fields: number;
  mappedIndicators: number;
  operation: string;
}

interface FieldDefinition {
  name: string;
  dataType: string;
  description: string;
  abnormalRule?: string;
  specialRule?: string;
  relatedIndicator?: string;
}

const DataModel: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['已激活']);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentModel, setCurrentModel] = useState<DataItem | null>(null);

  const handleTagClick = (tag: string) => {
    const nextSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(nextSelectedTags);
  };

  const handleViewModel = (record: DataItem) => {
    setCurrentModel(record);
    setViewModalVisible(true);
  };

  const handleDownloadTemplate = (record: DataItem) => {
    message.success(`${record.name}模板下载成功`);
    // 实际开发中这里应该触发下载模板文件的逻辑
  };

  const handleUploadData = (file: File, record: DataItem) => {
    message.success(`${record.name}数据上传成功`);
    // 实际开发中这里应该处理文件上传逻辑
    return false; // 阻止默认上传行为
  };

  const columns: ColumnsType<DataItem> = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '行业',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: '业务域',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '字段数量',
      dataIndex: 'fields',
      key: 'fields',
    },
    {
      title: '已映射指标数',
      dataIndex: 'mappedIndicators',
      key: 'mappedIndicators',
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleViewModel(record)}>查看</Button>
          <Button 
            type="link" 
            icon={<DownloadOutlined />} 
            onClick={() => handleDownloadTemplate(record)}
          >
            下载模板
          </Button>
          <Upload
            showUploadList={false}
            beforeUpload={file => handleUploadData(file, record)}
          >
            <Button 
              type="link" 
              icon={<UploadOutlined />}
            >
              上传数据
            </Button>
          </Upload>
        </Space>
      ),
    },
  ];

  const data: DataItem[] = [
    {
      key: '1',
      name: '订单主表',
      domain: '零售业 / 销售',
      type: '经营',
      fields: 8,
      mappedIndicators: 3,
      operation: '',
    },
  ];

  // 模拟字段定义数据
  const fieldDefinitions: FieldDefinition[] = [
    {
      name: 'order_amount',
      dataType: '小数',
      description: '订单金额',
      abnormalRule: '空值处理、异常值范围、数据清洗规则等',
      specialRule: '请描述需要特殊处理的业务场景，如：特定时间段、特殊业务规则等',
      relatedIndicator: '销售收入'
    }
  ];

  // 创建一个简单的必填标记组件，避免[object Object]问题
  const RequiredMark = () => <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>;

  return (
    <div>
      <Title level={4}>标准数据模型</Title>
      <Card bordered={false}>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select defaultValue="全部" style={{ width: 120, marginRight: 16 }}>
              <Option value="all">全部</Option>
              <Option value="business">业务</Option>
              <Option value="warehouse">仓储</Option>
              <Option value="finance">财务</Option>
            </Select>
            <Input 
              placeholder="输入关键词搜索" 
              style={{ width: 300 }}
              suffix={<Button type="primary" icon={<SearchOutlined />}></Button>}
            />
          </div>
          <div style={{ flex: 1 }}></div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Space>
            <Tag 
              color={selectedTags.includes('已激活') ? 'blue' : ''}
              onClick={() => handleTagClick('已激活')}
              style={{ cursor: 'pointer' }}
            >
              已激活
            </Tag>
            <Tag 
              color={selectedTags.includes('草稿') ? 'blue' : ''}
              onClick={() => handleTagClick('草稿')}
              style={{ cursor: 'pointer' }}
            >
              草稿
            </Tag>
            <Tag 
              color={selectedTags.includes('事实表') ? 'blue' : ''}
              onClick={() => handleTagClick('事实表')}
              style={{ cursor: 'pointer' }}
            >
              事实表
            </Tag>
            <Tag 
              color={selectedTags.includes('维度表') ? 'blue' : ''}
              onClick={() => handleTagClick('维度表')}
              style={{ cursor: 'pointer' }}
            >
              维度表
            </Tag>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: 50,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      {/* 查看数据模型弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>查看数据模型</span>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={() => setViewModalVisible(false)}
              style={{ marginRight: -16 }}
            />
          </div>
        }
        open={viewModalVisible}
        footer={null}
        closable={false}
        width={800}
        destroyOnClose
      >
        <Form layout="vertical">
          <Form.Item 
            label={<><RequiredMark />模型名称</>}
            style={{ marginBottom: 16 }}
          >
            <Input value="订单主表" disabled />
          </Form.Item>

          <Form.Item 
            label={<><RequiredMark />行业</>}
            style={{ marginBottom: 16 }}
          >
            <Select value="零售业 / 销售" disabled style={{ width: '100%' }}>
              <Option value="retail">零售业 / 销售</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            label={<><RequiredMark />业务域</>}
            style={{ marginBottom: 16 }}
          >
            <Select value="经营" disabled style={{ width: '100%' }}>
              <Option value="operation">经营</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            label="模型描述"
            style={{ marginBottom: 16 }}
          >
            <TextArea value="1" disabled rows={4} />
          </Form.Item>

          <div style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 16 }}>字段定义</Title>

            {fieldDefinitions.map((field, index) => (
              <div key={index} style={{ 
                border: '1px solid #f0f0f0', 
                borderRadius: 8, 
                padding: 16, 
                marginBottom: 16,
                background: '#fafafa'
              }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item 
                      label={<><RequiredMark />字段名</>}
                      style={{ marginBottom: 16 }}
                    >
                      <Input value={field.name} disabled />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item 
                      label={<><RequiredMark />数据类型</>}
                      style={{ marginBottom: 16 }}
                    >
                      <Select value={field.dataType} disabled style={{ width: '100%' }}>
                        <Option value="decimal">小数</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item 
                      label="字段描述"
                      style={{ marginBottom: 16 }}
                    >
                      <Input value={field.description} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item 
                      label="异常处理规则"
                      style={{ marginBottom: 16 }}
                    >
                      <TextArea 
                        value={field.abnormalRule} 
                        disabled 
                        rows={2}
                        placeholder="请输入数据异常处理规则，如：空值处理、异常值范围、数据清洗规则等"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item 
                      label="特殊场景说明"
                      style={{ marginBottom: 16 }}
                    >
                      <TextArea 
                        value={field.specialRule} 
                        disabled 
                        rows={2}
                        placeholder="请描述需要特殊处理的业务场景，如：特定时间段、特殊业务规则等"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item 
                  label="关联指标"
                  style={{ marginBottom: 0 }}
                >
                  <Select value={field.relatedIndicator} disabled style={{ width: '100%' }}>
                    <Option value="income">销售收入</Option>
                  </Select>
                </Form.Item>
              </div>
            ))}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DataModel;