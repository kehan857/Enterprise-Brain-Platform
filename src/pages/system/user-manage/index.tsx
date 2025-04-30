import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface UserType {
  id: string;
  username: string;
  realName: string;
  email: string;
  phone: string;
  department: string;
  role: string[];
  status: 'active' | 'inactive';
  createTime: string;
}

const UserManage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: '1',
      username: 'admin',
      realName: '管理员',
      email: 'admin@example.com',
      phone: '13800138000',
      department: '技术部',
      role: ['超级管理员'],
      status: 'active',
      createTime: '2024-01-03 12:00:00'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [form] = Form.useForm();

  // 表格列定义
  const columns: TableProps<UserType>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (roles: string[]) => (
        <>
          {roles.map(role => (
            <Tag color="blue" key={role}>{role}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
            icon={<LockOutlined />}
            onClick={() => handleStatusChange(record)}
          >
            {record.status === 'active' ? '禁用' : '启用'}
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

  // 处理编辑用户
  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  // 处理删除用户
  const handleDelete = (user: UserType) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${user.username} 吗？`,
      onOk() {
        setUsers(users.filter(u => u.id !== user.id));
        message.success('删除成功');
      },
    });
  };

  // 处理用户状态变更
  const handleStatusChange = (user: UserType) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
    message.success(`用户${newStatus === 'active' ? '启用' : '禁用'}成功`);
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        // 更新用户
        setUsers(users.map(user =>
          user.id === editingUser.id ? { ...user, ...values } : user
        ));
        message.success('更新成功');
      } else {
        // 创建新用户
        const newUser = {
          ...values,
          id: String(Date.now()),
          createTime: new Date().toLocaleString(),
          status: 'active',
        };
        setUsers([...users, newUser]);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <div className="user-manage-container">
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          新建用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      <Modal
        title={editingUser ? '编辑用户' : '新建用户'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingUser || {}}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="realName"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="技术部">技术部</Select.Option>
              <Select.Option value="产品部">产品部</Select.Option>
              <Select.Option value="运营部">运营部</Select.Option>
              <Select.Option value="销售部">销售部</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择角色"
              allowClear
            >
              <Select.Option value="超级管理员">超级管理员</Select.Option>
              <Select.Option value="管理员">管理员</Select.Option>
              <Select.Option value="普通用户">普通用户</Select.Option>
              <Select.Option value="访客">访客</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManage;