import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Tree, Tag, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface RoleType {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createTime: string;
}

// 权限树数据
const permissionTreeData = [
  {
    title: '仪表盘',
    key: 'dashboard',
    children: [
      { title: '查看仪表盘', key: 'dashboard:view' },
      { title: '导出数据', key: 'dashboard:export' },
    ],
  },
  {
    title: '数据管理',
    key: 'data',
    children: [
      { title: '数据源管理', key: 'data:source' },
      { title: '数据映射配置', key: 'data:mapping' },
      { title: '数据质量', key: 'data:quality' },
    ],
  },
  {
    title: '知识管理',
    key: 'knowledge',
    children: [
      { title: '文档管理', key: 'knowledge:doc' },
      { title: '知识库', key: 'knowledge:base' },
      { title: 'FAQ管理', key: 'knowledge:faq' },
    ],
  },
  {
    title: '智能分析中心',
    key: 'analysis',
    children: [
      { title: '数据Agent', key: 'analysis:agent' },
      { title: '分析报告', key: 'analysis:report' },
      { title: '报表中心', key: 'analysis:center' },
    ],
  },
  {
    title: '系统设置',
    key: 'system',
    children: [
      { title: '用户管理', key: 'system:user' },
      { title: '角色管理', key: 'system:role' },
      { title: '系统配置', key: 'system:config' },
    ],
  },
];

const RoleManage: React.FC = () => {
  const [roles, setRoles] = useState<RoleType[]>([
    {
      id: '1',
      name: '超级管理员',
      description: '系统最高权限角色',
      permissions: ['dashboard', 'data', 'knowledge', 'analysis', 'system'],
      userCount: 1,
      createTime: '2024-01-03 12:00:00'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleType | null>(null);
  const [form] = Form.useForm();

  // 表格列定义
  const columns: TableProps<RoleType>['columns'] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '权限数量',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <Tag color="blue">{permissions.length}</Tag>
      ),
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
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
            icon={<SettingOutlined />}
            onClick={() => handlePermissionEdit(record)}
          >
            权限配置
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
            disabled={record.name === '超级管理员'}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理编辑角色
  const handleEdit = (role: RoleType) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setIsModalVisible(true);
  };

  // 处理权限配置
  const handlePermissionEdit = (role: RoleType) => {
    setEditingRole(role);
    setIsPermissionModalVisible(true);
  };

  // 处理删除角色
  const handleDelete = (role: RoleType) => {
    if (role.name === '超级管理员') return;
    
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除角色 ${role.name} 吗？`,
      onOk() {
        setRoles(roles.filter(r => r.id !== role.id));
        message.success('删除成功');
      },
    });
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        // 更新角色
        setRoles(roles.map(role =>
          role.id === editingRole.id ? { ...role, ...values } : role
        ));
        message.success('更新成功');
      } else {
        // 创建新角色
        const newRole = {
          ...values,
          id: String(Date.now()),
          permissions: [],
          userCount: 0,
          createTime: new Date().toLocaleString(),
        };
        setRoles([...roles, newRole]);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingRole(null);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理权限变更
  const handlePermissionChange = (checkedKeys: string[]) => {
    if (!editingRole) return;
    
    setRoles(roles.map(role =>
      role.id === editingRole.id
        ? { ...role, permissions: checkedKeys as string[] }
        : role
    ));
  };

  return (
    <div className="role-manage-container">
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingRole(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          新建角色
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      {/* 角色信息编辑弹窗 */}
      <Modal
        title={editingRole ? '编辑角色' : '新建角色'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingRole(null);
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingRole || {}}
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input 
              placeholder="请输入角色名称" 
              disabled={editingRole?.name === '超级管理员'}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="角色描述"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <Input.TextArea 
              placeholder="请输入角色描述" 
              rows={4}
              disabled={editingRole?.name === '超级管理员'}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 权限配置弹窗 */}
      <Modal
        title="权限配置"
        open={isPermissionModalVisible}
        onOk={() => {
          setIsPermissionModalVisible(false);
          message.success('权限配置已更新');
        }}
        onCancel={() => setIsPermissionModalVisible(false)}
        width={800}
      >
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={editingRole?.permissions || []}
          onCheck={handlePermissionChange}
          treeData={permissionTreeData}
          disabled={editingRole?.name === '超级管理员'}
        />
      </Modal>
    </div>
  );
};

export default RoleManage;