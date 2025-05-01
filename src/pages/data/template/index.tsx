import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined, FileExcelOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

interface DataTemplate {
  id: string;
  code: string;
  name: string;
  businessType: string;
  fileType: 'excel' | 'csv';
  creator: string;
  createTime: string;
  updateTime: string;
  status: 'active' | 'disabled';
  description?: string;
  [key: string]: any;
}

const { Option } = Select;

const DataTemplatePage = () => {
  const [templates, setTemplates] = useState<DataTemplate[]>([
    {
      id: '1',
      code: 'TPL00001',
      name: '产品质量检测数据模板',
      businessType: '质量管理',
      fileType: 'excel',
      creator: '张三',
      createTime: '2023-11-15',
      updateTime: '2023-12-01',
      status: 'active',
      description: '用于记录产品质量检测数据的Excel模板'
    },
    {
      id: '2',
      code: 'TPL00002',
      name: '设备维护记录模板',
      businessType: '设备管理',
      fileType: 'excel',
      creator: '李四',
      createTime: '2023-11-20',
      updateTime: '2023-11-20',
      status: 'active',
      description: '用于记录设备维护情况的Excel模板'
    },
    {
      id: '3',
      code: 'TPL00003',
      name: '库存盘点数据模板',
      businessType: '库存管理',
      fileType: 'csv',
      creator: '王五',
      createTime: '2023-12-05',
      updateTime: '2023-12-10',
      status: 'disabled',
      description: '用于记录库存盘点数据的CSV模板'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [filteredData, setFilteredData] = useState<DataTemplate[]>(templates);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '模板名称', value: 'name' },
    { label: '模板编码', value: 'code' },
    { label: '业务类型', value: 'businessType' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'input', 
      label: '模板名称', 
      field: 'name',
      span: 8,
      placeholder: '请输入模板名称'
    },
    { 
      type: 'input', 
      label: '模板编码', 
      field: 'code',
      span: 8,
      placeholder: '请输入模板编码'
    },
    { 
      type: 'select', 
      label: '业务类型', 
      field: 'businessType',
      span: 8,
      options: [
        { label: '质量管理', value: '质量管理' },
        { label: '设备管理', value: '设备管理' },
        { label: '库存管理', value: '库存管理' },
        { label: '生产计划', value: '生产计划' },
        { label: '销售数据', value: '销售数据' }
      ]
    },
    { 
      type: 'select', 
      label: '文件类型', 
      field: 'fileType',
      span: 8,
      options: [
        { label: 'Excel文件', value: 'excel' },
        { label: 'CSV文件', value: 'csv' }
      ]
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '启用', value: 'active' },
        { label: '停用', value: 'disabled' }
      ]
    },
    { 
      type: 'input', 
      label: '创建人', 
      field: 'creator',
      span: 8,
      placeholder: '请输入创建人'
    },
    { 
      type: 'dateRange', 
      label: '创建时间', 
      field: 'createTime',
      span: 8,
      placeholder: ['开始日期', '结束日期']
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '创建时间：从新到旧', value: 'createTime,desc' },
    { label: '创建时间：从旧到新', value: 'createTime,asc' },
    { label: '更新时间：从新到旧', value: 'updateTime,desc' },
    { label: '更新时间：从旧到新', value: 'updateTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已启用', value: { status: 'active' }, color: 'green' },
    { label: '已停用', value: { status: 'disabled' }, color: 'red' },
    { label: 'Excel模板', value: { fileType: 'excel' }, color: 'blue' },
    { label: 'CSV模板', value: { fileType: 'csv' }, color: 'orange' }
  ];

  const columns: TableProps<DataTemplate>['columns'] = [
    {
      title: '模板编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '业务类型',
      dataIndex: 'businessType',
      key: 'businessType',
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
      render: (fileType: string) => {
        const typeMap = {
          excel: { icon: <FileExcelOutlined />, text: 'Excel文件' },
          csv: { icon: <FileExcelOutlined />, text: 'CSV文件' }
        };
        const { icon, text } = typeMap[fileType as keyof typeof typeMap];
        return (
          <Space>
            {icon}
            {text}
          </Space>
        );
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          active: { color: 'success', text: '启用' },
          disabled: { color: 'default', text: '停用' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(record)}
          >
            下载
          </Button>
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
    let filtered = [...templates];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(params._keyword.toLowerCase()) ||
        item.code.toLowerCase().includes(params._keyword.toLowerCase()) ||
        item.businessType.toLowerCase().includes(params._keyword.toLowerCase())
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
    let filtered = [...templates];
    
    // 筛选数据
    Object.entries(params).forEach(([key, value]) => {
      if (value && key !== 'sortBy') {
        if (key === 'createTime' && Array.isArray(value) && value.length === 2) {
          // 日期范围筛选
          const [start, end] = value;
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.createTime);
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

  const handleDownload = (record: DataTemplate) => {
    message.success(`正在下载模板：${record.name}`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: DataTemplate) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: DataTemplate) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除模板「${record.name}」吗？`,
      onOk() {
        const newData = templates.filter(item => item.id !== record.id);
        setTemplates(newData);
        setFilteredData(newData);
        message.success('删除成功');
      }
    });
  };

  const generateCode = () => {
    const prefix = 'TPL';
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newTemplate = {
        ...values,
        id: values.id || String(Date.now()),
        code: values.id ? values.code : generateCode(),
        updateTime: new Date().toISOString().split('T')[0],
        createTime: values.id ? templates.find(item => item.id === values.id)?.createTime : new Date().toISOString().split('T')[0]
      };

      if (values.id) {
        // 编辑现有模板
        const newData = templates.map(item =>
          item.id === values.id ? newTemplate : item
        );
        setTemplates(newData);
        setFilteredData(newData);
        message.success('修改成功');
      } else {
        // 添加新模板
        const newData = [...templates, newTemplate];
        setTemplates(newData);
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
    <div className="data-template-page">
      <Card
        title="线下数据模板"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            新建模板
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
        title={form.getFieldValue('id') ? '编辑模板' : '新建模板'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
        width={700}
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
            label="模板名称"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input placeholder="请输入模板名称" />
          </Form.Item>
          <Form.Item
            name="businessType"
            label="业务类型"
            rules={[{ required: true, message: '请选择业务类型' }]}
          >
            <Select placeholder="请选择业务类型">
              <Option value="质量管理">质量管理</Option>
              <Option value="设备管理">设备管理</Option>
              <Option value="库存管理">库存管理</Option>
              <Option value="生产计划">生产计划</Option>
              <Option value="销售数据">销售数据</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="fileType"
            label="文件类型"
            rules={[{ required: true, message: '请选择文件类型' }]}
          >
            <Select placeholder="请选择文件类型">
              <Option value="excel">Excel文件</Option>
              <Option value="csv">CSV文件</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="creator"
            label="创建人"
            rules={[{ required: true, message: '请输入创建人' }]}
          >
            <Input placeholder="请输入创建人" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="disabled">停用</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea rows={4} placeholder="请输入模板描述" />
          </Form.Item>
          <Form.Item
            name="templateFile"
            label="上传模板文件"
            rules={[{ required: true, message: '请上传模板文件' }]}
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

export default DataTemplatePage;