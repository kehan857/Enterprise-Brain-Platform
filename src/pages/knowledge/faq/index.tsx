import { useState } from 'react';
import { Card, Table, Button, Space, Input, Tree, Tag, Modal, Form, Select, message, Upload } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { DataNode } from 'antd/es/tree';

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
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

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
    });
  };

  const onSelect = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  const handleImport = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 导入成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`);
    }
  };

  const filteredFaq = faqList
    .filter(item => 
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase()) ||
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
        title="FAQ分类"
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
        title="FAQ管理"
        style={{ flex: 1 }}
        extra={
          <Space>
            <Input
              placeholder="搜索FAQ"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
              onChange={e => setSearchText(e.target.value)}
            />
            <Upload
              action="/api/faq/import"
              showUploadList={false}
              onChange={handleImport}
            >
              <Button icon={<UploadOutlined />}>导入FAQ</Button>
            </Upload>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
            >
              新建FAQ
            </Button>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={filteredFaq}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0, whiteSpace: 'pre-line' }}>
                {record.answer}
              </p>
            ),
          }}
        />
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑FAQ' : '新建FAQ'}
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
          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请输入标签，多个标签用逗号分隔' }]}
          >
            <Input placeholder="请输入标签，多个标签用逗号分隔" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
          >
            <Select>
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FaqManagePage;