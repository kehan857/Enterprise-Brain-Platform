import { useState } from 'react';
import { Card, Table, Button, Space, Upload, Tag, Modal, Form, Input, Select, message, Tree } from 'antd';
import DocumentPreview from '@/components/DocumentPreview';
import { PlusOutlined, UploadOutlined, FolderOutlined, FileOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, FileTextOutlined, FileExcelOutlined, FileWordOutlined, FilePdfOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './styles.less';

interface Document {
  id: string;
  title: string;
  docType: 'pdf' | 'word' | 'excel' | 'text' | 'other';
  category: string;
  tags: string[];
  creator: string;
  createTime: string;
  updateTime: string;
  size: string;
  viewCount: number;
  downloadCount: number;
  status: 'published' | 'draft' | 'archived';
  [key: string]: any;
}

const { DirectoryTree } = Tree;
const { Option } = Select;

const treeData: DataNode[] = [
  {
    title: '产品文档',
    key: '0-0',
    children: [
      { title: '产品规格说明', key: '0-0-0', isLeaf: true },
      { title: '使用手册', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: '工艺文档',
    key: '0-1',
    children: [
      { title: '工艺标准', key: '0-1-0', isLeaf: true },
      { title: '操作规程', key: '0-1-1', isLeaf: true },
    ],
  },
];

const DocManagePage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: '企业产品质量管理手册',
      docType: 'pdf',
      category: '质量管理',
      tags: ['质量', '管理手册', '标准'],
      creator: '张三',
      createTime: '2023-10-15',
      updateTime: '2023-10-15',
      size: '2.5MB',
      viewCount: 156,
      downloadCount: 45,
      status: 'published'
    },
    {
      id: '2',
      title: '销售数据分析报告-2023Q3',
      docType: 'excel',
      category: '销售分析',
      tags: ['销售', '报告', '数据分析'],
      creator: '李四',
      createTime: '2023-11-10',
      updateTime: '2023-11-20',
      size: '1.8MB',
      viewCount: 89,
      downloadCount: 32,
      status: 'published'
    },
    {
      id: '3',
      title: '设备维护操作规程草案',
      docType: 'word',
      category: '设备管理',
      tags: ['设备', '维护', '操作规程'],
      creator: '王五',
      createTime: '2023-12-01',
      updateTime: '2023-12-05',
      size: '1.2MB',
      viewCount: 35,
      downloadCount: 12,
      status: 'draft'
    },
    {
      id: '4',
      title: '员工培训计划-2024',
      docType: 'text',
      category: '人力资源',
      tags: ['培训', '人力资源', '计划'],
      creator: '赵六',
      createTime: '2023-12-10',
      updateTime: '2023-12-10',
      size: '520KB',
      viewCount: 42,
      downloadCount: 18,
      status: 'published'
    },
    {
      id: '5',
      title: '历史版本产品资料',
      docType: 'pdf',
      category: '产品管理',
      tags: ['产品', '归档', '历史'],
      creator: '张三',
      createTime: '2023-09-20',
      updateTime: '2023-09-20',
      size: '4.5MB',
      viewCount: 28,
      downloadCount: 7,
      status: 'archived'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [filteredData, setFilteredData] = useState<Document[]>(documents);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '文档标题', value: 'title' },
    { label: '创建人', value: 'creator' },
    { label: '文档标签', value: 'tags' },
    { label: '文档类别', value: 'category' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'input', 
      label: '文档标题', 
      field: 'title',
      span: 8,
      placeholder: '请输入文档标题'
    },
    { 
      type: 'select', 
      label: '文档类型', 
      field: 'docType',
      span: 8,
      options: [
        { label: 'PDF文档', value: 'pdf' },
        { label: 'Word文档', value: 'word' },
        { label: 'Excel文档', value: 'excel' },
        { label: '文本文档', value: 'text' },
        { label: '其他类型', value: 'other' }
      ]
    },
    { 
      type: 'select', 
      label: '文档类别', 
      field: 'category',
      span: 8,
      options: [
        { label: '质量管理', value: '质量管理' },
        { label: '销售分析', value: '销售分析' },
        { label: '设备管理', value: '设备管理' },
        { label: '人力资源', value: '人力资源' },
        { label: '产品管理', value: '产品管理' }
      ]
    },
    { 
      type: 'input', 
      label: '标签', 
      field: 'tags',
      span: 8,
      placeholder: '请输入标签关键词'
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
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '已发布', value: 'published' },
        { label: '草稿', value: 'draft' },
        { label: '已归档', value: 'archived' }
      ]
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '创建时间：从新到旧', value: 'createTime,desc' },
    { label: '创建时间：从旧到新', value: 'createTime,asc' },
    { label: '更新时间：从新到旧', value: 'updateTime,desc' },
    { label: '更新时间：从旧到新', value: 'updateTime,asc' },
    { label: '浏览次数：从多到少', value: 'viewCount,desc' },
    { label: '浏览次数：从少到多', value: 'viewCount,asc' },
    { label: '下载次数：从多到少', value: 'downloadCount,desc' },
    { label: '下载次数：从少到多', value: 'downloadCount,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已发布', value: { status: 'published' }, color: 'green' },
    { label: '草稿', value: { status: 'draft' }, color: 'blue' },
    { label: '已归档', value: { status: 'archived' }, color: 'default' },
    { label: 'PDF文档', value: { docType: 'pdf' }, color: 'red' },
    { label: 'Word文档', value: { docType: 'word' }, color: 'blue' },
    { label: 'Excel文档', value: { docType: 'excel' }, color: 'green' }
  ];

  const getDocTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#f5222d' }} />;
      case 'word':
        return <FileWordOutlined style={{ color: '#1890ff' }} />;
      case 'excel':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      case 'text':
        return <FileTextOutlined style={{ color: '#faad14' }} />;
      default:
        return <FileTextOutlined />;
    }
  };

  const columns: TableProps<Document>['columns'] = [
    {
      title: '文档标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {getDocTypeIcon(record.docType)}
          {text}
        </Space>
      )
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag key={tag} color="blue" style={{ marginBottom: '4px' }}>
              {tag}
            </Tag>
          ))}
        </>
      )
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
      title: '文档大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          published: { color: 'success', text: '已发布' },
          draft: { color: 'processing', text: '草稿' },
          archived: { color: 'default', text: '已归档' }
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
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
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
    let filtered = [...documents];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      const keyword = params._keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.creator.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    } else {
      // 特定字段搜索
      Object.entries(params).forEach(([key, value]) => {
        if (value && key !== 'sortBy') {
          if (key === 'tags') {
            // 标签搜索
            filtered = filtered.filter(item => 
              item.tags.some(tag => tag.toLowerCase().includes(String(value).toLowerCase()))
            );
          } else {
            // 其他字段搜索
            filtered = filtered.filter(item => 
              String(item[key]).toLowerCase().includes(String(value).toLowerCase())
            );
          }
        }
      });
    }
    
    setFilteredData(filtered);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    let filtered = [...documents];
    
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
        } else if (key === 'tags') {
          // 标签筛选
          filtered = filtered.filter(item => 
            item.tags.some(tag => tag.toLowerCase().includes(String(value).toLowerCase()))
          );
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

  const handleView = (record: Document) => {
    message.info(`查看文档：${record.title}`);
    // 模拟更新浏览次数
    const newDocs = documents.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          viewCount: item.viewCount + 1
        };
      }
      return item;
    });
    setDocuments(newDocs);
    setFilteredData(newDocs);
  };

  const handleDownload = (record: Document) => {
    message.success(`正在下载文档：${record.title}`);
    // 模拟更新下载次数
    const newDocs = documents.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          downloadCount: item.downloadCount + 1
        };
      }
      return item;
    });
    setDocuments(newDocs);
    setFilteredData(newDocs);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Document) => {
    form.setFieldsValue({
      ...record,
      tags: record.tags.join(',')
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: Document) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除文档「${record.title}」吗？`,
      onOk() {
        const newData = documents.filter(item => item.id !== record.id);
        setDocuments(newData);
        setFilteredData(newData);
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      // 处理标签字符串转数组
      const tags = values.tags ? values.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [];
      
      const newDoc = {
        ...values,
        id: values.id || String(Date.now()),
        tags,
        size: values.id ? documents.find(item => item.id === values.id)?.size : '0KB',
        viewCount: values.id ? documents.find(item => item.id === values.id)?.viewCount : 0,
        downloadCount: values.id ? documents.find(item => item.id === values.id)?.downloadCount : 0,
        updateTime: new Date().toISOString().split('T')[0],
        createTime: values.id ? documents.find(item => item.id === values.id)?.createTime : new Date().toISOString().split('T')[0]
      };

      if (values.id) {
        // 编辑现有文档
        const newData = documents.map(item =>
          item.id === values.id ? newDoc : item
        );
        setDocuments(newData);
        setFilteredData(newData);
        message.success('修改成功');
      } else {
        // 添加新文档
        const newData = [...documents, newDoc];
        setDocuments(newData);
        setFilteredData(newData);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  // 处理导出数据
  const handleExport = (params: Record<string, any>) => {
    message.success('文档列表导出成功');
    console.log('导出数据参数:', params);
  };

  const onSelect: DirectoryTreeProps['onSelect'] = (keys) => {
    setSelectedKeys(keys as string[]);
  };

  const filteredDocuments = selectedKeys.length > 0
    ? documents.filter(doc => doc.category === treeData.find(item => 
        item.children?.some(child => child.key === selectedKeys[0])
      )?.title)
    : documents;

  return (
    <div className="doc-manage-page">
      <Card
        title="文档目录"
        style={{ width: 280 }}
        bodyStyle={{ padding: 0 }}
      >
        <DirectoryTree
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeData}
        />
      </Card>

      <Card
        title="文档管理"
        style={{ flex: 1 }}
        extra={
          <Space>
            <Upload
              action="/api/upload"
              showUploadList={false}
              onChange={info => {
                if (info.file.status === 'done') {
                  message.success(`${info.file.name} 上传成功`);
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} 上传失败`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>上传文档</Button>
            </Upload>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
            >
              新建文档
            </Button>
          </Space>
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
        title={form.getFieldValue('id') ? '编辑文档' : '新建文档'}
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
          <Form.Item
            name="title"
            label="文档标题"
            rules={[{ required: true, message: '请输入文档标题' }]}
          >
            <Input placeholder="请输入文档标题" />
          </Form.Item>
          <Form.Item
            name="docType"
            label="文档类型"
            rules={[{ required: true, message: '请选择文档类型' }]}
          >
            <Select placeholder="请选择文档类型">
              <Option value="pdf">PDF文档</Option>
              <Option value="word">Word文档</Option>
              <Option value="excel">Excel文档</Option>
              <Option value="text">文本文档</Option>
              <Option value="other">其他类型</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="文档类别"
            rules={[{ required: true, message: '请选择文档类别' }]}
          >
            <Select placeholder="请选择文档类别">
              <Option value="质量管理">质量管理</Option>
              <Option value="销售分析">销售分析</Option>
              <Option value="设备管理">设备管理</Option>
              <Option value="人力资源">人力资源</Option>
              <Option value="产品管理">产品管理</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            help="多个标签请用逗号分隔"
          >
            <Input placeholder="请输入标签，多个标签请用逗号分隔" />
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
              <Option value="published">已发布</Option>
              <Option value="draft">草稿</Option>
              <Option value="archived">已归档</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="file"
            label="上传文档"
            rules={[{ required: !form.getFieldValue('id'), message: '请上传文档文件' }]}
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

export default DocManagePage;