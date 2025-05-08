import { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Tree, Tag, Modal, Form, Select, Input, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { DataNode } from 'antd/es/tree';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import UploadGuideModal from '@/components/UploadGuideModal';
import './index.less';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  creator: string;
  updateTime: string;
  status: 'active' | 'inactive';
}

const { DirectoryTree } = Tree;
const { Option } = Select;
const { TextArea } = Input;

const treeData: DataNode[] = [
  {
    title: '产品FAQ',
    key: '0-0',
    children: [
      { title: '功能问题', key: '0-0-0', isLeaf: true },
      { title: '使用问题', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: '技术FAQ',
    key: '0-1',
    children: [
      { title: '安装部署', key: '0-1-0', isLeaf: true },
      { title: '故障排查', key: '0-1-1', isLeaf: true },
    ],
  },
];

const FaqManagePage = () => {
  const [faqList, setFaqList] = useState<FAQ[]>([
    {
      id: '1',
      question: '如何快速开始使用企业大脑平台？',
      answer: '1. 完成用户注册和企业认证\n2. 进行系统初始化配置\n3. 接入数据源\n4. 开始使用平台功能',
      category: '产品FAQ',
      tags: ['入门指南', '快速上手'],
      creator: '张三',
      updateTime: '2023-12-20 10:00:00',
      status: 'active'
    },
    {
      id: '2',
      question: '如何处理常见的数据接入问题？',
      answer: '1. 检查数据源连接配置\n2. 验证账号权限\n3. 查看错误日志\n4. 联系技术支持',
      category: '技术FAQ',
      tags: ['数据接入', '故障排查'],
      creator: '李四',
      updateTime: '2023-12-20 09:30:00',
      status: 'active'
    },
    {
      id: '3',
      question: '企业大脑平台支持哪些数据源类型？',
      answer: '企业大脑平台支持以下数据源类型：\n1. 关系型数据库（MySQL、SQL Server、Oracle等）\n2. API接口\n3. 文件数据（CSV、Excel等）\n4. MQTT设备数据',
      category: '产品FAQ',
      tags: ['数据源', '功能介绍'],
      creator: '王五',
      updateTime: '2023-12-19 14:20:00',
      status: 'active'
    },
    {
      id: '4',
      question: '平台的数据分析功能有哪些？',
      answer: '平台提供多种数据分析功能：\n1. 数据可视化\n2. 趋势分析\n3. 关联分析\n4. 异常检测\n5. 预测分析',
      category: '产品FAQ',
      tags: ['数据分析', '功能介绍'],
      creator: '张三',
      updateTime: '2023-12-18 11:30:00',
      status: 'active'
    },
    {
      id: '5',
      question: '如何解决平台访问缓慢的问题？',
      answer: '解决平台访问缓慢的问题：\n1. 检查网络连接\n2. 清除浏览器缓存\n3. 检查服务器负载\n4. 优化数据查询\n5. 升级服务器配置',
      category: '技术FAQ',
      tags: ['性能优化', '故障排查'],
      creator: '李四',
      updateTime: '2023-12-17 16:45:00',
      status: 'active'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [filteredFaq, setFilteredFaq] = useState<FAQ[]>(faqList);
  const [uploadGuideVisible, setUploadGuideVisible] = useState(false);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '问题', value: 'question' },
    { label: '答案', value: 'answer' },
    { label: '标签', value: 'tags' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'select', 
      label: '分类', 
      field: 'category',
      span: 8,
      options: [
        { label: '产品FAQ', value: '产品FAQ' },
        { label: '技术FAQ', value: '技术FAQ' }
      ]
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '已启用', value: 'active' },
        { label: '已禁用', value: 'inactive' }
      ]
    },
    { 
      type: 'select', 
      label: '创建人', 
      field: 'creator',
      span: 8,
      options: [
        { label: '张三', value: '张三' },
        { label: '李四', value: '李四' },
        { label: '王五', value: '王五' }
      ]
    },
    { 
      type: 'dateRange', 
      label: '更新时间', 
      field: 'updateTime',
      span: 12,
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
    { label: '已启用', value: { status: 'active' }, color: 'green' },
    { label: '产品FAQ', value: { category: '产品FAQ' }, color: 'blue' },
    { label: '技术FAQ', value: { category: '技术FAQ' }, color: 'purple' },
    { label: '入门指南', value: { tags: '入门指南' }, color: 'orange' },
    { label: '故障排查', value: { tags: '故障排查' }, color: 'red' }
  ];

  const columns: TableProps<FAQ>['columns'] = [
    {
      title: '问题',
      dataIndex: 'question',
      key: 'question',
      render: (text) => (
        <Space>
          <QuestionCircleOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? '已启用' : '已禁用'}
        </Tag>
      )
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

  const handleEdit = (record: FAQ) => {
    form.setFieldsValue({
      ...record,
      tags: record.tags.join(',')
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: FAQ) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除问题「${record.question}」吗？`,
      onOk() {
        setFaqList(prev => prev.filter(item => item.id !== record.id));
        applyFilters();
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newFaq = {
        ...values,
        id: values.id || String(Date.now()),
        tags: values.tags.split(',').map((tag: string) => tag.trim()),
        creator: '当前用户',
        updateTime: new Date().toLocaleString(),
        status: values.status || 'active'
      };

      if (values.id) {
        setFaqList(prev =>
          prev.map(item =>
            item.id === values.id ? newFaq : item
          )
        );
        message.success('修改成功');
      } else {
        setFaqList(prev => [...prev, newFaq]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
      applyFilters();
    });
  };

  const onSelect = (keys: React.Key[], info: any) => {
    setSelectedKeys(keys as string[]);
    applyFilters();
  };

  // 显示上传指引模态框
  const showUploadGuide = () => {
    setUploadGuideVisible(true);
  };

  // 关闭上传指引模态框
  const closeUploadGuide = () => {
    setUploadGuideVisible(false);
  };

  // 处理模板下载
  const handleDownloadTemplate = () => {
    message.success('开始下载FAQ模板');
    // 这里可以添加实际的模板下载逻辑
  };

  // 处理上传成功
  const handleUploadSuccess = (fileList: any[]) => {
    message.success(`成功导入 ${fileList.length} 个FAQ`);
    // 这里可以添加上传后的数据刷新逻辑
    setUploadGuideVisible(false);
  };

  const handleImport = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 导入成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`);
    }
  };

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    console.log('搜索参数:', params);
    applyFilters(params);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    console.log('筛选参数:', params);
    applyFilters(params);
  };

  // 应用筛选条件
  const applyFilters = (searchParams: Record<string, any> = {}) => {
    let filtered = [...faqList];
    
    // 处理基础搜索
    if (searchParams._keyword) {
      // 全字段搜索
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchParams._keyword.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchParams._keyword.toLowerCase()))
      );
    } else if (searchParams.question) {
      // 问题搜索
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchParams.question.toLowerCase())
      );
    } else if (searchParams.answer) {
      // 答案搜索
      filtered = filtered.filter(item => 
        item.answer.toLowerCase().includes(searchParams.answer.toLowerCase())
      );
    } else if (searchParams.tags) {
      // 标签搜索
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(searchParams.tags.toLowerCase()))
      );
    }
    
    // 处理高级筛选
    if (searchParams.category) {
      filtered = filtered.filter(item => item.category === searchParams.category);
    }
    
    if (searchParams.status) {
      filtered = filtered.filter(item => item.status === searchParams.status);
    }
    
    if (searchParams.creator) {
      filtered = filtered.filter(item => item.creator === searchParams.creator);
    }
    
    if (searchParams.updateTime && Array.isArray(searchParams.updateTime) && searchParams.updateTime.length === 2) {
      // 日期范围筛选
      const [start, end] = searchParams.updateTime;
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.updateTime);
        return itemDate >= start && itemDate <= end;
      });
    }
    
    // 处理排序
    if (searchParams.sortBy) {
      const [field, order] = searchParams.sortBy.split(',');
      filtered = [...filtered].sort((a, b) => {
        if (order === 'asc') {
          return a[field as keyof FAQ] > b[field as keyof FAQ] ? 1 : -1;
        } else {
          return a[field as keyof FAQ] < b[field as keyof FAQ] ? 1 : -1;
        }
      });
    }
    
    // 处理分类筛选
    if (selectedKeys.length > 0) {
      const categoryMap: Record<string, string> = {
        '0-0-0': '产品FAQ',
        '0-0-1': '产品FAQ',
        '0-1-0': '技术FAQ',
        '0-1-1': '技术FAQ'
      };
      
      filtered = filtered.filter(item => item.category === categoryMap[selectedKeys[0]]);
    }
    
    setFilteredFaq(filtered);
  };

  // 当选中的分类节点变化时触发过滤
  useEffect(() => {
    applyFilters();
  }, [selectedKeys, faqList]);

  return (
    <div className="faq-manage-page">
      <div className="faq-manage-container">
        <Card
          title="FAQ分类"
          className="category-card"
        >
          <DirectoryTree
            defaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
          />
        </Card>

        <Card
          title="FAQ管理"
          className="content-card"
          extra={
            <Space>
              <Button 
                icon={<UploadOutlined />}
                onClick={showUploadGuide}
              >
                导入FAQ
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAdd}
              >
                新增FAQ
              </Button>
            </Space>
          }
        >
          {/* 搜索组件 */}
          <div className="search-section">
            <SearchComponent 
              searchFields={searchFields}
              filters={filters}
              sortOptions={sortOptions}
              quickFilters={quickFilters}
              onSearch={handleSearch}
              onFilter={handleFilter}
              enableExport={true}
            />
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredFaq}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>

      <Modal
        title={form.getFieldValue('id') ? '编辑FAQ' : '新增FAQ'}
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
            name="question"
            label="问题"
            rules={[{ required: true, message: '请输入问题' }]}
          >
            <Input placeholder="请输入问题" />
          </Form.Item>
          <Form.Item
            name="answer"
            label="答案"
            rules={[{ required: true, message: '请输入答案' }]}
          >
            <TextArea rows={6} placeholder="请输入答案" />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择分类">
              <Option value="产品FAQ">产品FAQ</Option>
              <Option value="技术FAQ">技术FAQ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请输入标签' }]}
            extra="多个标签请用逗号分隔"
          >
            <Input placeholder="请输入标签，多个标签请用逗号分隔" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select>
              <Option value="active">已启用</Option>
              <Option value="inactive">已禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 上传指引模态框 */}
      <UploadGuideModal
        open={uploadGuideVisible}
        onClose={closeUploadGuide}
        title="FAQ导入指引"
        description="请按照以下步骤导入FAQ数据"
        uploadTitle="上传FAQ数据文件"
        uploadDescription="您可以上传Excel格式的FAQ数据"
        templateButtonText="下载FAQ模板"
        templateUrl="/templates/faq-template.xlsx"
        onDownloadTemplate={handleDownloadTemplate}
        onSuccess={handleUploadSuccess}
        acceptTypes={['.xls', '.xlsx', '.csv']}
        maxSize={10}
        uploadUrl="/api/knowledge/faq/import"
      />
    </div>
  );
};

export default FaqManagePage;