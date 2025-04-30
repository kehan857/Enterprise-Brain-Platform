import { useState } from 'react';
import { Card, Table, Button, Space, Tabs, Progress, Tag, Modal, Form, Input, Select, InputNumber, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, AlertOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface QualityRule {
  id: string;
  name: string;
  type: 'completeness' | 'accuracy' | 'timeliness' | 'consistency';
  model: string;
  field: string;
  threshold: number;
  status: 'normal' | 'warning' | 'error';
  score: number;
  checkTime: string;
}

const { TabPane } = Tabs;
const { Option } = Select;

const DataQualityPage = () => {
  const [rules, setRules] = useState<QualityRule[]>([
    {
      id: '1',
      name: '产品编码完整性检查',
      type: 'completeness',
      model: '产品维度',
      field: 'product_code',
      threshold: 98,
      status: 'normal',
      score: 99.5,
      checkTime: '2023-12-20 10:00:00'
    },
    {
      id: '2',
      name: '订单金额准确性检查',
      type: 'accuracy',
      model: '销售指标',
      field: 'order_amount',
      threshold: 95,
      status: 'warning',
      score: 94.8,
      checkTime: '2023-12-20 09:30:00'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('rules');
  const [form] = Form.useForm();

  const typeMap = {
    completeness: '完整性',
    accuracy: '准确性',
    timeliness: '时效性',
    consistency: '一致性'
  };

  const statusMap = {
    normal: { color: 'success', text: '正常' },
    warning: { color: 'warning', text: '警告' },
    error: { color: 'error', text: '错误' }
  };

  const ruleColumns: TableProps<QualityRule>['columns'] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '规则类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => typeMap[type as keyof typeof typeMap]
    },
    {
      title: '数据模型',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '检查字段',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: '阈值',
      dataIndex: 'threshold',
      key: 'threshold',
      render: (threshold: number) => `${threshold}%`
    },
    {
      title: '当前得分',
      dataIndex: 'score',
      key: 'score',
      render: (score: number, record) => (
        <Space>
          <Progress
            percent={score}
            size="small"
            status={record.status === 'error' ? 'exception' : undefined}
            strokeColor={record.status === 'warning' ? '#faad14' : undefined}
          />
          <Tag color={statusMap[record.status].color}>
            {statusMap[record.status].text}
          </Tag>
        </Space>
      )
    },
    {
      title: '检查时间',
      dataIndex: 'checkTime',
      key: 'checkTime',
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

  const alertColumns: TableProps<any>['columns'] = [
    {
      title: '告警时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '规则名称',
      dataIndex: 'ruleName',
      key: 'ruleName',
    },
    {
      title: '告警内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'unprocessed' ? 'error' : 'success'}>
          {status === 'unprocessed' ? '未处理' : '已处理'}
        </Tag>
      )
    },
  ];

  const alertData = [
    {
      time: '2023-12-20 09:30:00',
      ruleName: '订单金额准确性检查',
      content: '数据质量得分94.8%，低于设定阈值95%',
      status: 'unprocessed'
    }
  ];

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: QualityRule) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: QualityRule) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除质量规则「${record.name}」吗？`,
      onOk() {
        setRules(prev => prev.filter(item => item.id !== record.id));
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newRule = {
        ...values,
        id: values.id || String(Date.now()),
        status: 'normal',
        score: 100,
        checkTime: new Date().toLocaleString()
      };

      if (values.id) {
        setRules(prev =>
          prev.map(item =>
            item.id === values.id ? newRule : item
          )
        );
        message.success('修改成功');
      } else {
        setRules(prev => [...prev, newRule]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <Card
        title={
          <Space>
            数据质量监控
            <Tag color="blue" style={{ marginLeft: 8 }}>
              <Space>
                <AlertOutlined />
                1条告警
              </Space>
            </Tag>
          </Space>
        }
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            activeTab === 'rules' && (
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAdd}
              >
                新建规则
              </Button>
            )
          }
        >
          <TabPane tab="质量规则" key="rules">
            <Table 
              columns={ruleColumns} 
              dataSource={rules}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="质量告警" key="alerts">
            <Table 
              columns={alertColumns} 
              dataSource={alertData}
              rowKey="time"
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑质量规则' : '新建质量规则'}
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
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>
          <Form.Item
            name="type"
            label="规则类型"
            rules={[{ required: true, message: '请选择规则类型' }]}
          >
            <Select placeholder="请选择规则类型">
              <Option value="completeness">完整性</Option>
              <Option value="accuracy">准确性</Option>
              <Option value="timeliness">时效性</Option>
              <Option value="consistency">一致性</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="model"
            label="数据模型"
            rules={[{ required: true, message: '请选择数据模型' }]}
          >
            <Select placeholder="请选择数据模型">
              <Option value="产品维度">产品维度</Option>
              <Option value="销售指标">销售指标</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="field"
            label="检查字段"
            rules={[{ required: true, message: '请输入检查字段' }]}
          >
            <Input placeholder="请输入检查字段" />
          </Form.Item>
          <Form.Item
            name="threshold"
            label="质量阈值(%)"
            rules={[{ required: true, message: '请输入质量阈值' }]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: '100%' }}
              placeholder="请输入质量阈值"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataQualityPage;