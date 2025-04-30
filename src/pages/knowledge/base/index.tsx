import { useState } from 'react';
import { Card, Table, Button, Space, Input, Tree, Tag, Modal, Form, Select, message, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, BookOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { DataNode } from 'antd/es/tree';

interface Knowledge {
  id: string;
  title: string;
  category: string;
  type: 'article' | 'qa' | 'guide';
  tags: string[];
  creator: string;
  updateTime: string;
}

const { DirectoryTree } = Tree;
const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const treeData: DataNode[] = [
  {
    title: '产品知识',
    key: '0-0',
    children: [
      { title: '产品功能', key: '0-0-0', isLeaf: true },
      { title: '使用指南', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: '工艺知识',
    key: '0-1',
    children: [
      { title: '工艺标准', key: '0-1-0', isLeaf: true },
      { title: '操作规范', key: '0-1-1', isLeaf: true },
    ],
  },
  {
    title: '故障处理',
    key: '0-2',
    children: [
      { title: '常见问题', key: '0-2-0', isLeaf: true },
      { title: '故障诊断', key: '0-2-1', isLeaf: true },
    ],
  },
];

const KnowledgeBasePage = () => {
  const [knowledgeList, setKnowledgeList] = useState<Knowledge[]>([
    {
      id: '1',
      title: '产品功能介绍',
      category: '产品知识',
      type: 'article',
      tags: ['功能', '介绍'],
      creator: '张三',
      updateTime: '2023-12-20 10:00:00'
    },
    {
      id: '2',
      title: '设备故障排查指南',
      category: '故障处理',
      type: 'guide',
      tags: ['故障', '维修'],
      creator: '李四',
      updateTime: '2023-12-20 09:30:00'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const typeMap = {
    article: { color: 'blue', text: '文章' },
    qa: { color: 'green', text: '问答' },
    guide: { color: 'orange', text: '指南' }
  };

  const columns: TableProps<Knowledge>['columns'] = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <BookOutlined />
          <a onClick={() => handlePreview(record)}>{text}</a>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const { color, text } = typeMap[type as keyof typeof typeMap];
        return <Tag color={color}>{text}</Tag>;
      }
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
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
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

  const handleEdit = (record: Knowledge) => {
    form.setFieldsValue({
      ...record,
      tags: record.tags.join(',')
    });
    setIsModalVisible(true);
  };

  const handlePreview = (record: Knowledge) => {
    form.setFieldsValue(record);
    setIsPreviewVisible(true);
  };

  const handleDelete = (record: Knowledge) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除知识「${record.title}」吗？`,
      onOk() {
        setKnowledgeList(prev => prev.filter(item => item.id !== record.id));
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newKnowledge = {
        ...values,
        id: values.id || String(Date.now()),
        tags: values.tags.split(',').map((tag: string) => tag.trim()),
        creator: '当前用户',
        updateTime: new Date().toLocaleString()
      };

      if (values.id) {
        setKnowledgeList(prev =>
          prev.map(item =>
            item.id === values.id ? newKnowledge : item
          )
        );
        message.success('修改成功');
      } else {
        setKnowledgeList(prev => [...prev, newKnowledge]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  const onSelect = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  const filteredKnowledge = knowledgeList
    .filter(item => 
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()))
    )
    .filter(item => 
      selectedKeys.length === 0 || 
      item.category === treeData.find(node => 
        node.children?.some(child => child.key === selectedKeys[0])
      )?.title
    );

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Card
        title="知识分类"
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
        title="知识库"
        style={{ flex: 1 }}
        extra={
          <Space>
            <Input
              placeholder="搜索知识"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              onChange={e => setSearchText(e.target.value)}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
            >
              新建知识
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={filteredKnowledge}
          rowKey="id"
        />
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑知识' : '新建知识'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
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
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select placeholder="请选择分类">
              <Option value="产品知识">产品知识</Option>
              <Option value="工艺知识">工艺知识</Option>
              <Option value="故障处理">故障处理</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder="请选择类型">
              <Option value="article">文章</Option>
              <Option value="qa">问答</Option>
              <Option value="guide">指南</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请输入标签' }]}
          >
            <Input placeholder="请输入标签，多个标签用逗号分隔" />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea rows={10} placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="知识预览"
        open={isPreviewVisible}
        footer={null}
        onCancel={() => setIsPreviewVisible(false)}
        width={800}
      >
        <Typography>
          <Title level={4}>{form.getFieldValue('title')}</Title>
          <Space style={{ margin: '16px 0' }}>
            <Tag color={typeMap[form.getFieldValue('type')]?.color}>
              {typeMap[form.getFieldValue('type')]?.text}
            </Tag>
            {form.getFieldValue('tags')?.split(',').map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
          <Paragraph>
            {form.getFieldValue('content')}
          </Paragraph>
        </Typography>
      </Modal>
    </div>
  );
};

export default KnowledgeBasePage;