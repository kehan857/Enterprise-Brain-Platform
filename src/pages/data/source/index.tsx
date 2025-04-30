import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface DataSource {
  id: string;
  code: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'mqtt';
  status: 'connected' | 'disconnected' | 'error';
  updateTime: string;
  docUrl?: string;
  docFile?: string;
}

const { Option } = Select;

const DataSourcePage = () => {
  const [dataSource, setDataSource] = useState<DataSource[]>([
    {
      id: '1',
      code: 'DS000001',
      name: 'ERP系统数据库',
      type: 'database',
      status: 'connected',
      updateTime: '2023-12-20 10:00:00',
      docUrl: 'https://example.com/erp-doc'
    },
    {
      id: '2',
      code: 'DS000002',
      name: 'MES系统API',
      type: 'api',
      status: 'connected',
      updateTime: '2023-12-20 09:30:00',
      docUrl: 'https://example.com/mes-doc'
    },
    {
      id: '3',
      code: 'DS000003',
      name: '设备数据采集',
      type: 'mqtt',
      status: 'connected',
      updateTime: '2023-12-20 10:15:00',
      docUrl: 'https://example.com/mqtt-doc'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns: TableProps<DataSource>['columns'] = [
    {
      title: '数据源编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '数据源名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          database: '数据库',
          api: 'API接口',
          file: '文件',
          mqtt: 'MQTT'
        };
        return typeMap[type as keyof typeof typeMap];
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          connected: { color: 'success', text: '已连接' },
          disconnected: { color: 'warning', text: '未连接' },
          error: { color: 'error', text: '错误' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: DataSource) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: DataSource) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除数据源「${record.name}」吗？`,
      onOk() {
        setDataSource(prev => prev.filter(item => item.id !== record.id));
        message.success('删除成功');
      }
    });
  };

  const generateCode = () => {
    const prefix = 'DS';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const validateDoc = (values: any) => {
    if (!values.docUrl && !values.docFile) {
      throw new Error('请至少提供一种文档形式（上传文件或填写链接）');
    }
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      validateDoc(values);
      const newDataSource = {
        ...values,
        id: values.id || String(Date.now()),
        code: values.id ? values.code : generateCode(),
        status: 'connected',
        updateTime: new Date().toLocaleString()
      };

      if (values.id) {
        setDataSource(prev =>
          prev.map(item =>
            item.id === values.id ? newDataSource : item
          )
        );
        message.success('修改成功');
      } else {
        setDataSource(prev => [...prev, newDataSource]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title="数据源管理"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            新建数据源
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={dataSource}
          rowKey="id"
        />
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑数据源' : '新建数据源'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="code" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="数据源名称"
            rules={[{ required: true, message: '请输入数据源名称' }]}
          >
            <Input placeholder="请输入数据源名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="数据源类型"
            rules={[{ required: true, message: '请选择数据源类型' }]}
          >
            <Select placeholder="请选择数据源类型">
              <Option value="database">数据库</Option>
              <Option value="api">API接口</Option>
              <Option value="file">文件</Option>
              <Option value="mqtt">MQTT</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="docUrl"
            label="文档链接"
            extra="请提供数据源参考文档链接或上传文档文件（至少完成一项）"
          >
            <Input placeholder="请输入文档链接" />
          </Form.Item>
          <Form.Item
            name="docFile"
            label="上传文档"
          >
            <Upload
              maxCount={1}
              accept=".pdf,.doc,.docx"
              beforeUpload={(file) => {
                form.setFieldsValue({ docFile: file.name });
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataSourcePage;