import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

interface DataSource {
  id: string;
  code: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'mqtt';
  status: 'connected' | 'disconnected' | 'error';
  updateTime: string;
  docUrl?: string;
  docFile?: string;
  [key: string]: any; // 添加索引签名
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
  const [filteredData, setFilteredData] = useState<DataSource[]>(dataSource);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '数据源名称', value: 'name' },
    { label: '数据源编码', value: 'code' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '数据源类型', 
      field: 'type',
      span: 8,
      options: [
        { label: '数据库', value: 'database' },
        { label: 'API接口', value: 'api' },
        { label: '文件', value: 'file' },
        { label: 'MQTT', value: 'mqtt' }
      ]
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '已连接', value: 'connected' },
        { label: '未连接', value: 'disconnected' },
        { label: '错误', value: 'error' }
      ]
    },
    { 
      type: 'dateRange', 
      label: '更新时间', 
      field: 'updateTime',
      span: 8,
      placeholder: ['开始日期', '结束日期']
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '更新时间：从新到旧', value: 'updateTime,desc' },
    { label: '更新时间：从旧到新', value: 'updateTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已连接', value: { status: 'connected' }, color: 'green' },
    { label: '未连接', value: { status: 'disconnected' }, color: 'warning' },
    { label: '错误', value: { status: 'error' }, color: 'red' },
    { label: '数据库', value: { type: 'database' }, color: 'blue' },
    { label: 'API接口', value: { type: 'api' }, color: 'purple' }
  ];

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

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    let filtered = [...dataSource];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(params._keyword.toLowerCase()) ||
        item.code.toLowerCase().includes(params._keyword.toLowerCase())
      );
    } else {
      // 特定字段搜索
      Object.entries(params).forEach(([key, value]) => {
        if (value && key !== 'sortBy') {
          filtered = filtered.filter(item => 
            String(item[key]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      });
    }
    
    setFilteredData(filtered);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    let filtered = [...dataSource];
    
    // 筛选数据
    Object.entries(params).forEach(([key, value]) => {
      if (value && key !== 'sortBy') {
        if (key === 'updateTime' && Array.isArray(value) && value.length === 2) {
          // 日期范围筛选
          const [start, end] = value;
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.updateTime);
            return itemDate >= start && itemDate <= end;
          });
        } else {
          // 其他普通筛选
          filtered = filtered.filter(item => item[key] === value);
        }
      }
    });
    
    // 处理排序
    if (params.sortBy) {
      const [field, order] = params.sortBy.split(',');
      filtered = [...filtered].sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }
    
    setFilteredData(filtered);
  };

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
        const newData = dataSource.filter(item => item.id !== record.id);
        setDataSource(newData);
        setFilteredData(newData);
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
        // 编辑现有数据源
        const newData = dataSource.map(item =>
          item.id === values.id ? newDataSource : item
        );
        setDataSource(newData);
        setFilteredData(newData);
        message.success('修改成功');
      } else {
        // 添加新数据源
        const newData = [...dataSource, newDataSource];
        setDataSource(newData);
        setFilteredData(newData);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  // 处理导出数据
  const handleExport = (params: Record<string, any>) => {
    message.success('数据导出成功');
    console.log('导出数据参数:', params);
  };

  return (
    <div className="data-source-page">
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
        <div className="header-actions">
          <div className="search-wrapper">
            <SearchComponent 
              searchFields={searchFields}
              filters={filters}
              sortOptions={sortOptions}
              quickFilters={quickFilters}
              enableExport={true}
              onSearch={handleSearch}
              onFilter={handleFilter}
              onExport={handleExport}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
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
            <Upload>
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataSourcePage;