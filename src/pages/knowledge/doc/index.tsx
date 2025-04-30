import { useState } from 'react';
import { Card, Table, Button, Space, Upload, Tag, Modal, Form, Input, Select, message, Tree } from 'antd';
import DocumentPreview from '@/components/DocumentPreview';
import { PlusOutlined, UploadOutlined, FolderOutlined, FileOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  domain: string;
  size: string;
  updateTime: string;
  status: 'processing' | 'done' | 'error';
  url: string;
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
      name: '产品规格说明.pdf',
      type: 'PDF',
      category: '产品文档',
      size: '2.5MB',
      updateTime: '2023-12-20 10:00:00',
      status: 'done',
      url: '/docs/product-spec.pdf'
    },
    {
      id: '2',
      name: '工艺标准V2.0.docx',
      type: 'Word',
      category: '工艺文档',
      size: '1.8MB',
      updateTime: '2023-12-20 09:30:00',
      status: 'done',
      url: '/docs/process-standard.docx'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();

  const columns: TableProps<Document>['columns'] = [
    {
      title: '文档名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {record.type === 'PDF' ? <FileOutlined /> : <FileOutlined />}
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
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          processing: { color: 'processing', text: '处理中' },
          done: { color: 'success', text: '已完成' },
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
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
          >
            预览
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

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Document) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handlePreview = (record: Document) => {
    Modal.info({
      title: `${record.name} - 文档预览`,
      width: 800,
      style: { top: 20 },
      content: (
        <div style={{ height: 600 }}>
          <DocumentPreview
            type={record.type}
            url={record.url}
            loading={false}
          />
        </div>
      ),
    });
  };

  const handleDelete = (record: Document) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除文档「${record.name}」吗？`,
      onOk() {
        setDocuments(prev => prev.filter(item => item.id !== record.id));
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newDoc = {
        ...values,
        id: values.id || String(Date.now()),
        status: 'done',
        updateTime: new Date().toLocaleString()
      };

      if (values.id) {
        setDocuments(prev =>
          prev.map(item =>
            item.id === values.id ? newDoc : item
          )
        );
        message.success('修改成功');
      } else {
        setDocuments(prev => [...prev, newDoc]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
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
    <div style={{ display: 'flex', gap: 24 }}>
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
        <Table 
          columns={columns} 
          dataSource={filteredDocuments}
          rowKey="id"
        />
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑文档' : '新建文档'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="文档名称"
            rules={[{ required: true, message: '请输入文档名称' }]}
          >
            <Input placeholder="请输入文档名称" />
          </Form.Item>
          <Form.Item
            name="category"
            label="文档分类"
            rules={[{ required: true, message: '请选择文档分类' }]}
          >
            <Select placeholder="请选择文档分类">
              <Option value="产品文档">产品文档</Option>
              <Option value="工艺文档">工艺文档</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="文档类型"
            rules={[{ required: true, message: '请选择文档类型' }]}
          >
            <Select placeholder="请选择文档类型">
              <Option value="PDF">PDF</Option>
              <Option value="Word">Word</Option>
              <Option value="Excel">Excel</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true, message: '请选择所属领域' }]}
          >
            <Select placeholder="请选择所属领域">
              <Option value="经营">经营</Option>
              <Option value="营销">营销</Option>
              <Option value="生产">生产</Option>
              <Option value="质控">质控</Option>
              <Option value="研发">研发</Option>
              <Option value="财务">财务</Option>
              <Option value="人事">人事</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocManagePage;