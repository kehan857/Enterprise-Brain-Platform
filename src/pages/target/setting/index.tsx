import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Input, 
  Select, 
  Button, 
  Space, 
  Table, 
  Tag,
  Modal,
  TreeSelect,
  InputNumber,
  DatePicker,
  Dropdown,
  Popconfirm,
  message,
  Upload
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DownloadOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

// 目标数据接口
interface TargetData {
  key: string;
  indicator: string;
  name: string;
  value: number;
  year: number;
  timeType: string;
  timePeriod: string;
  relatedObject: string;
  group: string;
  parentId?: string;
  level: number;
}

// 模拟目标数据
const mockTargetData: TargetData[] = [
  {
    key: '1',
    indicator: '订货额',
    name: '2025年工业互联事业部订货额100万元',
    value: 100,
    year: 2025,
    timeType: '年',
    timePeriod: '年',
    relatedObject: '工业互联事业部',
    group: '营销',
    level: 0
  },
  {
    key: '2',
    indicator: '订货额',
    name: '2025年元月工业互联事业部订货额500万元',
    value: 500,
    year: 2025,
    timeType: '月',
    timePeriod: '元月',
    relatedObject: '工业互联事业部',
    group: '营销',
    parentId: '1',
    level: 1
  }
];

const TargetSetting: React.FC = () => {
  const [form] = Form.useForm();
  const [targetForm] = Form.useForm();
  const [tableData, setTableData] = useState<TargetData[]>(mockTargetData);
  const [loading, setLoading] = useState(false);
  const [targetModalVisible, setTargetModalVisible] = useState(false);
  const [editingTarget, setEditingTarget] = useState<TargetData | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewingTarget, setViewingTarget] = useState<TargetData | null>(null);

  // 搜索处理
  const handleSearch = (values: any) => {
    console.log('搜索参数:', values);
    setLoading(true);
    // 模拟搜索
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    setTableData(mockTargetData);
  };

  // 添加目标
  const handleAddTarget = (parentId?: string) => {
    setEditingTarget(null);
    targetForm.resetFields();
    if (parentId) {
      targetForm.setFieldsValue({ parentId });
    }
    setTargetModalVisible(true);
  };

  // 编辑目标
  const handleEditTarget = (record: TargetData) => {
    setEditingTarget(record);
    targetForm.setFieldsValue({
      ...record,
      timePeriod: record.timePeriod
    });
    setTargetModalVisible(true);
  };

  // 查看详情
  const handleViewTarget = (record: TargetData) => {
    setViewingTarget(record);
    setViewModalVisible(true);
  };

  // 删除目标
  const handleDeleteTarget = (record: TargetData) => {
    const newData = tableData.filter(item => item.key !== record.key);
    setTableData(newData);
    message.success('删除成功');
  };

  // 保存目标
  const handleSaveTarget = async () => {
    try {
      const values = await targetForm.validateFields();
      const targetData: TargetData = {
        key: editingTarget?.key || Date.now().toString(),
        indicator: values.indicator,
        name: values.name,
        value: values.value,
        year: values.year,
        timeType: values.timeType,
        timePeriod: values.timePeriod,
        relatedObject: values.relatedObject,
        group: values.group,
        parentId: values.parentId,
        level: values.parentId ? 1 : 0
      };

      if (editingTarget) {
        // 编辑
        const newData = tableData.map(item => 
          item.key === editingTarget.key ? targetData : item
        );
        setTableData(newData);
        message.success('编辑成功');
      } else {
        // 新增
        setTableData([...tableData, targetData]);
        message.success('添加成功');
      }
      
      setTargetModalVisible(false);
      targetForm.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 导入处理
  const handleImport = (info: any) => {
    console.log('导入文件:', info);
    message.success('导入成功');
  };

  // 导出处理
  const handleExport = () => {
    console.log('导出数据');
    message.success('导出成功');
  };

  // 下载模板
  const handleDownloadTemplate = () => {
    console.log('下载模板');
    message.success('模板下载成功');
  };

  // 表格列定义
  const columns: ColumnsType<TargetData> = [
    {
      title: '考核指标',
      dataIndex: 'indicator',
      key: 'indicator',
      width: 100,
    },
    {
      title: '目标名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text: string, record: TargetData) => (
        <div style={{ paddingLeft: record.level * 20 }}>
          {record.level > 0 && '└ '}
          {text}
        </div>
      )
    },
    {
      title: '目标值',
      dataIndex: 'value',
      key: 'value',
      width: 100,
      render: (value: number) => value.toLocaleString()
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
      width: 80,
    },
    {
      title: '时间类型',
      dataIndex: 'timeType',
      key: 'timeType',
      width: 100,
    },
    {
      title: '时间周期',
      dataIndex: 'timePeriod',
      key: 'timePeriod',
      width: 100,
    },
    {
      title: '关联对象',
      dataIndex: 'relatedObject',
      key: 'relatedObject',
      width: 150,
    },
    {
      title: '分组',
      dataIndex: 'group',
      key: 'group',
      width: 80,
      render: (group: string) => (
        <Tag color="blue">{group}</Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewTarget(record)}
          >
            详情
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEditTarget(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除这个目标吗？"
            onConfirm={() => handleDeleteTarget(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              size="small" 
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
          <Button 
            type="link" 
            size="small" 
            icon={<PlusCircleOutlined />}
            onClick={() => handleAddTarget(record.key)}
          >
            添加下级
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="target-setting" style={{ padding: 0 }}>
      {/* 搜索表单 */}
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: 16 }}
        >
          <Form.Item name="targetName" style={{ width: 240 }}>
            <Input 
              placeholder="请输入目标名称搜索" 
              allowClear
            />
          </Form.Item>
          <Form.Item name="year" style={{ width: 120 }}>
            <Select placeholder="年份" allowClear>
              <Option value={2024}>2024</Option>
              <Option value={2025}>2025</Option>
              <Option value={2026}>2026</Option>
            </Select>
          </Form.Item>
          <Form.Item name="group" style={{ width: 120 }}>
            <Select placeholder="请选择分组" allowClear>
              <Option value="营销">营销</Option>
              <Option value="生产">生产</Option>
              <Option value="研发">研发</Option>
              <Option value="财务">财务</Option>
              <Option value="人事">人事</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SearchOutlined />}
                loading={loading}
              >
                查询
              </Button>
              <Button 
                onClick={handleReset}
                icon={<ReloadOutlined />}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>

        {/* 操作按钮 */}
        <Space>
          <Upload
            accept=".xlsx,.xls"
            showUploadList={false}
            onChange={handleImport}
          >
            <Button icon={<UploadOutlined />}>
              导入
            </Button>
          </Upload>
          <Button 
            onClick={handleExport}
            icon={<DownloadOutlined />}
          >
            导出
          </Button>
          <Button 
            onClick={handleDownloadTemplate}
            icon={<DownloadOutlined />}
          >
            下载模板
          </Button>
        </Space>
      </Card>

      {/* 目标列表 */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={5} style={{ margin: 0 }}>目标列表</Title>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleAddTarget()}
          >
            添加目标
          </Button>
        </div>
        
        <Table
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          size="middle"
          bordered
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* 添加/编辑目标模态框 */}
      <Modal
        title={editingTarget ? '编辑目标' : '添加目标'}
        open={targetModalVisible}
        onOk={handleSaveTarget}
        onCancel={() => {
          setTargetModalVisible(false);
          targetForm.resetFields();
        }}
        width={600}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={targetForm}
          layout="vertical"
          style={{ paddingTop: 16 }}
        >
          <Form.Item name="parentId" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          
          <Form.Item
            name="indicator"
            label="考核指标"
            rules={[{ required: true, message: '请选择考核指标' }]}
          >
            <Select placeholder="请选择考核指标">
              <Option value="订货额">订货额</Option>
              <Option value="销售额">销售额</Option>
              <Option value="利润">利润</Option>
              <Option value="成本">成本</Option>
              <Option value="产量">产量</Option>
              <Option value="质量">质量</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="目标名称"
            rules={[{ required: true, message: '请输入目标名称' }]}
          >
            <Input placeholder="请输入目标名称" />
          </Form.Item>

          <Form.Item
            name="value"
            label="目标值"
            rules={[{ required: true, message: '请输入目标值' }]}
          >
            <InputNumber
              placeholder="请输入目标值"
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="year"
            label="年份"
            rules={[{ required: true, message: '请选择年份' }]}
          >
            <Select placeholder="请选择年份">
              <Option value={2024}>2024</Option>
              <Option value={2025}>2025</Option>
              <Option value={2026}>2026</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeType"
            label="时间类型"
            rules={[{ required: true, message: '请选择时间类型' }]}
          >
            <Select placeholder="请选择时间类型">
              <Option value="年">年</Option>
              <Option value="月">月</Option>
              <Option value="季度">季度</Option>
              <Option value="周">周</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timePeriod"
            label="时间周期"
            rules={[{ required: true, message: '请输入时间周期' }]}
          >
            <Input placeholder="请输入时间周期，如：元月、第一季度等" />
          </Form.Item>

          <Form.Item
            name="relatedObject"
            label="关联对象"
            rules={[{ required: true, message: '请选择关联对象' }]}
          >
            <Select placeholder="请选择关联对象">
              <Option value="工业互联事业部">工业互联事业部</Option>
              <Option value="智能制造事业部">智能制造事业部</Option>
              <Option value="数字化事业部">数字化事业部</Option>
              <Option value="营销中心">营销中心</Option>
              <Option value="研发中心">研发中心</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="group"
            label="分组"
            rules={[{ required: true, message: '请选择分组' }]}
          >
            <Select placeholder="请选择分组">
              <Option value="营销">营销</Option>
              <Option value="生产">生产</Option>
              <Option value="研发">研发</Option>
              <Option value="财务">财务</Option>
              <Option value="人事">人事</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看详情模态框 */}
      <Modal
        title="目标详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {viewingTarget && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <strong>考核指标：</strong>{viewingTarget.indicator}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>目标名称：</strong>{viewingTarget.name}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>目标值：</strong>{viewingTarget.value.toLocaleString()}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>年份：</strong>{viewingTarget.year}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>时间类型：</strong>{viewingTarget.timeType}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>时间周期：</strong>{viewingTarget.timePeriod}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>关联对象：</strong>{viewingTarget.relatedObject}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>分组：</strong>
              <Tag color="blue" style={{ marginLeft: 8 }}>{viewingTarget.group}</Tag>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TargetSetting; 