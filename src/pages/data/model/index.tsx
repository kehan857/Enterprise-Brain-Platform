import { useState } from 'react';
import { Card, Table, Button, Space, Tabs, Form, Input, Select, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface DataModel {
  id: string;
  name: string;
  type: 'dimension' | 'metric';
  source: string;
  description: string;
  updateTime: string;
}

const { TabPane } = Tabs;
const { Option } = Select;

const DataModelPage = () => {
  const [dataModels, setDataModels] = useState<DataModel[]>([
    {
      id: '1',
      name: '产品维度',
      type: 'dimension',
      source: 'ERP系统数据库',
      description: '产品基础信息维度表',
      updateTime: '2023-12-20 10:00:00'
    },
    {
      id: '2',
      name: '销售指标',
      type: 'metric',
      source: 'ERP系统数据库',
      description: '销售相关指标聚合表',
      updateTime: '2023-12-20 09:30:00'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('dimension');
  const [form] = Form.useForm();

  const columns: TableProps<DataModel>['columns'] = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
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
    form.setFieldsValue({ type: activeTab });
    setIsModalVisible(true);
  };

  const handleEdit = (record: DataModel) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handlePreview = (record: DataModel) => {
    Modal.info({
      title: `${record.name} - 数据预览`,
      width: 800,
      content: (
        <div style={{ marginTop: 16 }}>
          <Table
            columns={[
              { title: '字段名', dataIndex: 'field' },
              { title: '类型', dataIndex: 'type' },
              { title: '描述', dataIndex: 'description' },
            ]}
            dataSource={[
              { field: 'id', type: 'STRING', description: '唯一标识' },
              { field: 'name', type: 'STRING', description: '名称' },
              { field: 'category', type: 'STRING', description: '分类' },
            ]}
            pagination={false}
          />
        </div>
      ),
    });
  };

  const handleDelete = (record: DataModel) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除数据模型「${record.name}」吗？`,
      onOk() {
        setDataModels(prev => prev.filter(item => item.id !== record.id));
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newModel = {
        ...values,
        id: values.id || String(Date.now()),
        updateTime: new Date().toLocaleString()
      };

      if (values.id) {
        setDataModels(prev =>
          prev.map(item =>
            item.id === values.id ? newModel : item
          )
        );
        message.success('修改成功');
      } else {
        setDataModels(prev => [...prev, newModel]);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  const filteredModels = dataModels.filter(model => model.type === activeTab);

  return (
    <div>
      <Card title="数据模型管理">
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
            >
              新建{activeTab === 'dimension' ? '维度' : '指标'}
            </Button>
          }
        >
          <TabPane tab="维度" key="dimension">
            <Table 
              columns={columns} 
              dataSource={filteredModels}
              rowKey="id"
            />
          </TabPane>
          <TabPane tab="指标" key="metric">
            <Table 
              columns={columns} 
              dataSource={filteredModels}
              rowKey="id"
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑数据模型' : '新建数据模型'}
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
          <Form.Item name="type" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="模型名称"
            rules={[{ required: true, message: '请输入模型名称' }]}
          >
            <Input placeholder="请输入模型名称" />
          </Form.Item>
          <Form.Item
            name="source"
            label="数据源"
            rules={[{ required: true, message: '请选择数据源' }]}
          >
            <Select placeholder="请选择数据源">
              <Option value="ERP系统数据库">ERP系统数据库</Option>
              <Option value="MES系统API">MES系统API</Option>
              <Option value="设备数据采集">设备数据采集</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea 
              placeholder="请输入模型描述"
              rows={4} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataModelPage;