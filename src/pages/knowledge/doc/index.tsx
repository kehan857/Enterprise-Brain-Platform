import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, message, Tree, Input, Form, Dropdown, Menu } from 'antd';
import DocumentPreview from '@/components/DocumentPreview';
import { UploadOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, FileTextOutlined, FileExcelOutlined, FileWordOutlined, FilePdfOutlined, PlusOutlined, EditOutlined, FolderOutlined, FolderAddOutlined, MoreOutlined, CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import UploadGuideModal from '@/components/UploadGuideModal';
import './styles.less';

const { DirectoryTree } = Tree;

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

const treeData: DataNode[] = [
  {
    title: '产品文档',
    key: '0-0',
    icon: <FolderOutlined style={{ color: '#1890ff' }} />,
    children: [
      { title: '产品规格说明', icon: <FileTextOutlined />, key: '0-0-0', isLeaf: true },
      { title: '使用手册', icon: <FileTextOutlined />, key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: '工艺文档',
    key: '0-1',
    icon: <FolderOutlined style={{ color: '#1890ff' }} />,
    children: [
      { title: '工艺标准', icon: <FileTextOutlined />, key: '0-1-0', isLeaf: true },
      { title: '操作规程', icon: <FileTextOutlined />, key: '0-1-1', isLeaf: true },
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

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Document[]>(documents);
  const [uploadGuideVisible, setUploadGuideVisible] = useState(false);
  const [directoryModalVisible, setDirectoryModalVisible] = useState(false);
  const [directoryForm] = Form.useForm();
  const [isAddSubDir, setIsAddSubDir] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState<string | null>(null);
  const [treeDataState, setTreeDataState] = useState<DataNode[]>(treeData);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

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
    // 更新浏览次数
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
    
    // 打开预览模态框
    setCurrentDocument(record);
    setPreviewModalVisible(true);
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

  // 显示上传指引模态框
  const showUploadGuide = () => {
    setUploadGuideVisible(true);
  };

  // 关闭上传指引模态框
  const closeUploadGuide = () => {
    setUploadGuideVisible(false);
  };

  // 处理上传成功
  const handleUploadSuccess = (fileList: any[]) => {
    message.success(`成功上传 ${fileList.length} 个文档`);
    // 这里可以添加上传后的数据刷新逻辑
    setUploadGuideVisible(false);
  };

  // 显示新建目录模态框
  const showAddDirectoryModal = (isSubDir: boolean = false) => {
    directoryForm.resetFields();
    setIsAddSubDir(isSubDir);
    if (isSubDir && selectedKeys.length === 0) {
      message.warning('请先选择一个目录');
      return;
    }
    if (isSubDir) {
      setSelectedDirectory(selectedKeys[0] as string);
    } else {
      setSelectedDirectory(null);
    }
    setDirectoryModalVisible(true);
  };

  // 处理新建目录
  const handleAddDirectory = () => {
    directoryForm.validateFields().then(values => {
      const { directoryName } = values;
      
      // 克隆现有的树结构数据
      const newTreeData = [...treeDataState];
      
      if (isAddSubDir && selectedDirectory) {
        // 添加子目录
        const findAndAddChild = (nodes: DataNode[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.key === selectedDirectory) {
              if (!node.children) {
                node.children = [];
              }
              const newKey = `${node.key}-${node.children.length}`;
              node.children.push({
                title: directoryName,
                key: newKey,
                isLeaf: true
              });
              return true;
            }
            if (node.children && findAndAddChild(node.children)) {
              return true;
            }
          }
          return false;
        };
        
        findAndAddChild(newTreeData);
      } else {
        // 添加顶级目录
        const newKey = `0-${newTreeData.length}`;
        newTreeData.push({
          title: directoryName,
          key: newKey,
          children: []
        });
      }
      
      setTreeDataState(newTreeData);
      setDirectoryModalVisible(false);
      message.success(`成功创建${isAddSubDir ? '子' : ''}目录`);
    });
  };

  return (
    <div className="doc-manage-page">
      <Card
        title="文档目录"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showAddDirectoryModal()}
          >
            新建目录
          </Button>
        }
        style={{ width: 280 }}
        bodyStyle={{ padding: 0 }}
      >
        <DirectoryTree
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeDataState}
          showIcon
          switcherIcon={({ expanded }) => (expanded ? <CaretDownOutlined /> : <CaretRightOutlined />)}
          onRightClick={({ event, node }) => {
            event.preventDefault();
            const container = document.createElement('div');
            document.body.appendChild(container);
            
            Modal.info({
              title: '目录操作',
              icon: null,
              content: (
                <Menu>
                  <Menu.Item 
                    key="add-sub" 
                    icon={<FolderAddOutlined />}
                    onClick={() => {
                      setSelectedKeys([node.key as string]);
                      showAddDirectoryModal(true);
                      Modal.destroyAll();
                    }}
                  >
                    新建子目录
                  </Menu.Item>
                  <Menu.Item 
                    key="edit" 
                    icon={<EditOutlined />}
                    onClick={() => {
                      message.info('编辑目录功能开发中');
                      Modal.destroyAll();
                    }}
                  >
                    编辑
                  </Menu.Item>
                  <Menu.Item 
                    key="delete" 
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => {
                      message.info('删除目录功能开发中');
                      Modal.destroyAll();
                    }}
                  >
                    删除
                  </Menu.Item>
                </Menu>
              ),
              okButtonProps: { style: { display: 'none' } },
              maskClosable: true,
              mask: false,
              style: {
                position: 'absolute',
                left: event.clientX,
                top: event.clientY
              }
            });
            
            return null;
          }}
        />
      </Card>

      <Card
        title="文档管理"
        style={{ flex: 1 }}
        extra={
          <Button 
            icon={<UploadOutlined />} 
            onClick={showUploadGuide}
          >
            上传文档
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

      {/* 新建目录模态框 */}
      <Modal
        title={isAddSubDir ? "新建子目录" : "新建目录"}
        open={directoryModalVisible}
        onOk={handleAddDirectory}
        onCancel={() => setDirectoryModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={directoryForm}
          layout="vertical"
        >
          <Form.Item
            name="directoryName"
            label="目录名称"
            rules={[{ required: true, message: '请输入目录名称' }]}
          >
            <Input placeholder="请输入目录名称" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 上传指引模态框 */}
      <UploadGuideModal
        open={uploadGuideVisible}
        onClose={closeUploadGuide}
        title="文档上传指引"
        description="请直接上传您的文档资料"
        uploadTitle="上传文档文件"
        uploadDescription="您可以上传PDF、Word、Excel等格式文档"
        onSuccess={handleUploadSuccess}
        acceptTypes={['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt']}
        maxSize={20}
        uploadUrl="/api/knowledge/doc/upload"
      />

      {/* 文档预览模态框 */}
      <Modal
        title={currentDocument?.title || '文档预览'}
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        width={800}
        footer={[
          <Button key="download" type="primary" onClick={() => {
            if (currentDocument) {
              handleDownload(currentDocument);
            }
          }}>
            下载文档
          </Button>,
          <Button key="close" onClick={() => setPreviewModalVisible(false)}>
            关闭
          </Button>
        ]}
        bodyStyle={{ height: '70vh', padding: 0, overflow: 'hidden' }}
      >
        {currentDocument && (
          <DocumentPreview 
            type={currentDocument.docType}
            url={currentDocument.docType === 'pdf' 
              ? 'https://arxiv.org/pdf/2003.08934.pdf'
              : currentDocument.docType === 'excel'
              ? '/sample-data/sample.xlsx'
              : currentDocument.docType === 'word'
              ? '/sample-data/sample.docx'
              : '/sample-data/sample.txt'}
            loading={false}
          />
        )}
      </Modal>
    </div>
  );
};

export default DocManagePage;