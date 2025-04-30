import { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
  createdAt: string;
  updatedAt: string;
}

const AlertCenter = () => {
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

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
      render: (type: string) => {
        const typeMap = {
          threshold: '阈值告警',
          trend: '趋势告警',
          anomaly: '异常告警',
        };
        return typeMap[type] || type;
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
      render: (_, record: AlertRule) => (
        <span>{record.target} {record.condition.operator} {record.condition.value}</span>
      ),
    },
    {
      title: '告警等级',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const colorMap = {
          low: 'blue',
          medium: 'orange',
          high: 'red',
          critical: 'purple',
        };
        const textMap = {
          low: '低',
          medium: '中',
          high: '高',
          critical: '严重',
        };
        return <Tag color={colorMap[severity]}>{textMap[severity]}</Tag>;
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
      render: (_: any, record: AlertRule) => (
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

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: AlertRule) => {
    form.setFieldsValue(record);
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
        </Form>
      </Modal>
    </div>
  );
};

export default AlertCenter;