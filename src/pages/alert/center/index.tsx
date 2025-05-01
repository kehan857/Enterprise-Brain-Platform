import { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber, Radio, Divider } from 'antd';
import { PlusOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

interface AlertRule {
  id: string;
  name: string;
  type: 'threshold' | 'trend' | 'anomaly';
  target: string;
  condition: {
    operator: '>' | '<' | '=' | '≥' | '≤';
    value: number;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive';
  notificationConfig: {
    channels: string[];
    recipients: {
      type: 'users' | 'groups';
      ids: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

// 类型映射
type TypeTextMap = {
  [key in AlertRule['type']]: string;
};

type SeverityColorMap = {
  [key in AlertRule['severity']]: string;
};

type SeverityTextMap = {
  [key in AlertRule['severity']]: string;
};

// 模拟用户数据
const mockUsers = [
  { id: 'user1', name: '张三', department: '生产部' },
  { id: 'user2', name: '李四', department: '质量部' },
  { id: 'user3', name: '王五', department: '设备部' },
  { id: 'user4', name: '赵六', department: '安全部' },
  { id: 'user5', name: '钱七', department: '生产部' },
  { id: 'user6', name: '孙八', department: '质量部' },
];

// 模拟群组数据
const mockGroups = [
  { id: 'group1', name: '生产部门群组', memberCount: 12 },
  { id: 'group2', name: '设备维护团队', memberCount: 5 },
  { id: 'group3', name: '质量控制群组', memberCount: 8 },
  { id: 'group4', name: '安全监督小组', memberCount: 6 },
];

const AlertCenter = () => {
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [recipientType, setRecipientType] = useState<'users' | 'groups'>('users');

  const typeMap: TypeTextMap = {
    threshold: '阈值告警',
    trend: '趋势告警',
    anomaly: '异常告警',
  };

  const colorMap: SeverityColorMap = {
    low: 'blue',
    medium: 'orange',
    high: 'red',
    critical: 'purple',
  };

  const textMap: SeverityTextMap = {
    low: '低',
    medium: '中',
    high: '高',
    critical: '严重',
  };

  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '告警类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: AlertRule['type']) => {
        return typeMap[type];
      },
    },
    {
      title: '监控目标',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: '告警条件',
      key: 'condition',
      render: (_: unknown, record: AlertRule) => (
        <span>{record.target} {record.condition.operator} {record.condition.value}</span>
      ),
    },
    {
      title: '告警等级',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: AlertRule['severity']) => {
        return <Tag color={colorMap[severity]}>{textMap[severity]}</Tag>;
      },
    },
    {
      title: '通知对象',
      key: 'notificationRecipients',
      render: (_: unknown, record: AlertRule) => {
        if (!record.notificationConfig?.recipients) return '-';
        
        const { type, ids } = record.notificationConfig.recipients;
        const count = ids.length;
        
        return (
          <Tag color="blue">
            {type === 'users' ? '用户' : '群组'}: {count}个
          </Tag>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status === 'active' ? '已启用' : '已禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: AlertRule) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record.id)}>删除</a>
          <a onClick={() => handleToggleStatus(record)}>
            {record.status === 'active' ? '禁用' : '启用'}
          </a>
        </Space>
      ),
    },
  ];

  // 根据选择类型过滤不同的选项列表
  const recipientOptions = recipientType === 'users'
    ? mockUsers.map(user => ({
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><UserOutlined /> {user.name}</span>
            <span style={{ color: '#999' }}>{user.department}</span>
          </div>
        ),
        value: user.id
      }))
    : mockGroups.map(group => ({
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><TeamOutlined /> {group.name}</span>
            <span style={{ color: '#999' }}>{group.memberCount}人</span>
          </div>
        ),
        value: group.id
      }));

  const handleAdd = () => {
    form.resetFields();
    setRecipientType('users');
    setModalVisible(true);
  };

  const handleEdit = (record: AlertRule) => {
    form.setFieldsValue({
      ...record,
      operator: record.condition.operator,
      value: record.condition.value,
      channels: record.notificationConfig?.channels || [],
      recipients: record.notificationConfig?.recipients?.ids || [],
    });
    
    // 设置通知对象类型
    if (record.notificationConfig?.recipients) {
      setRecipientType(record.notificationConfig.recipients.type);
    }
    
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleToggleStatus = (record: AlertRule) => {
    setRules(
      rules.map(rule =>
        rule.id === record.id
          ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
          : rule
      )
    );
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newRule: AlertRule = {
        id: values.id || String(Date.now()),
        name: values.name,
        type: values.type,
        target: values.target,
        condition: {
          operator: values.operator,
          value: values.value,
        },
        severity: values.severity,
        notificationConfig: {
          channels: values.channels || [],
          recipients: {
            type: recipientType,
            ids: values.recipients || [],
          },
        },
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setRules(prev =>
        values.id ? prev.map(rule => (rule.id === values.id ? newRule : rule)) : [...prev, newRule]
      );
      setModalVisible(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新建告警规则
        </Button>
      </div>
      <Table columns={columns} dataSource={rules} rowKey="id" />

      <Modal
        title={form.getFieldValue('id') ? '编辑告警规则' : '新建告警规则'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="告警类型"
            rules={[{ required: true, message: '请选择告警类型' }]}
          >
            <Select>
              <Select.Option value="threshold">阈值告警</Select.Option>
              <Select.Option value="trend">趋势告警</Select.Option>
              <Select.Option value="anomaly">异常告警</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="target"
            label="监控目标"
            rules={[{ required: true, message: '请输入监控目标' }]}
          >
            <Input placeholder="请输入监控目标" />
          </Form.Item>
          <Form.Item label="告警条件" required>
            <Space>
              <Form.Item
                name="operator"
                noStyle
                rules={[{ required: true, message: '请选择操作符' }]}
              >
                <Select style={{ width: 80 }}>
                  <Select.Option value=">">&gt;</Select.Option>
                  <Select.Option value="<">&lt;</Select.Option>
                  <Select.Option value="=">=</Select.Option>
                  <Select.Option value="≥">≥</Select.Option>
                  <Select.Option value="≤">≤</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="value"
                noStyle
                rules={[{ required: true, message: '请输入阈值' }]}
              >
                <InputNumber placeholder="阈值" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item
            name="severity"
            label="告警等级"
            rules={[{ required: true, message: '请选择告警等级' }]}
          >
            <Select>
              <Select.Option value="low">低</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="high">高</Select.Option>
              <Select.Option value="critical">严重</Select.Option>
            </Select>
          </Form.Item>

          <Divider orientation="left">通知配置</Divider>

          <Form.Item
            name="channels"
            label="通知渠道"
            rules={[{ required: true, message: '请选择通知渠道' }]}
          >
            <Select mode="multiple" placeholder="请选择通知渠道">
              <Select.Option value="dingding">钉钉</Select.Option>
              <Select.Option value="wecom">企业微信</Select.Option>
              <Select.Option value="email">邮件</Select.Option>
              <Select.Option value="sms">短信</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="通知对象" required style={{ marginBottom: 8 }}>
            <Radio.Group 
              value={recipientType} 
              onChange={(e) => setRecipientType(e.target.value)}
              style={{ marginBottom: 16 }}
            >
              <Radio.Button value="users">用户</Radio.Button>
              <Radio.Button value="groups">群组</Radio.Button>
            </Radio.Group>
            
            <Form.Item
              name="recipients"
              rules={[{ required: true, message: '请选择通知对象' }]}
              style={{ marginBottom: 0 }}
            >
              <Select
                mode="multiple"
                placeholder={`请选择${recipientType === 'users' ? '用户' : '群组'}`}
                style={{ width: '100%' }}
                optionFilterProp="label"
                options={recipientOptions}
                showSearch
                filterOption={(input, option) => 
                  String(option?.label || '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlertCenter;