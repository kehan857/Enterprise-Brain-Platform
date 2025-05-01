import { useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, message, Badge } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined, LineChartOutlined, HistoryOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import SearchComponent, { SearchField, FilterConfig, QuickFilter, SortOption } from '../../../components/SearchComponent';
import './index.less';

interface DataQualityRule {
  id: string;
  code: string;
  name: string;
  dataSource: string;
  tableName: string;
  columnName?: string;
  ruleType: 'completeness' | 'accuracy' | 'timeliness' | 'consistency' | 'validity';
  checkFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  status: 'active' | 'disabled' | 'error';
  lastCheck: string;
  passRate: number;
  severity: 'high' | 'medium' | 'low';
  creator: string;
  createTime: string;
  [key: string]: any;
}

const { Option } = Select;

const DataQualityPage = () => {
  const [rules, setRules] = useState<DataQualityRule[]>([
    {
      id: '1',
      code: 'DQ00001',
      name: '销售数据完整性检查',
      dataSource: 'ERP系统数据库',
      tableName: 'sales_data',
      columnName: 'order_id, customer_id, product_id',
      ruleType: 'completeness',
      checkFrequency: 'daily',
      status: 'active',
      lastCheck: '2023-12-20 10:00:00',
      passRate: 99.8,
      severity: 'high',
      creator: '张三',
      createTime: '2023-11-10'
    },
    {
      id: '2',
      code: 'DQ00002',
      name: '产品价格有效性检查',
      dataSource: 'ERP系统数据库',
      tableName: 'products',
      columnName: 'price',
      ruleType: 'validity',
      checkFrequency: 'hourly',
      status: 'active',
      lastCheck: '2023-12-20 09:00:00',
      passRate: 100,
      severity: 'high',
      creator: '李四',
      createTime: '2023-11-15'
    },
    {
      id: '3',
      code: 'DQ00003',
      name: '库存数据一致性检查',
      dataSource: 'MES系统API',
      tableName: 'inventory',
      columnName: 'quantity',
      ruleType: 'consistency',
      checkFrequency: 'daily',
      status: 'error',
      lastCheck: '2023-12-19 10:00:00',
      passRate: 95.5,
      severity: 'medium',
      creator: '王五',
      createTime: '2023-11-20'
    },
    {
      id: '4',
      code: 'DQ00004',
      name: '设备状态数据时效性检查',
      dataSource: '设备数据采集',
      tableName: 'equipment_status',
      columnName: 'status_time',
      ruleType: 'timeliness',
      checkFrequency: 'realtime',
      status: 'disabled',
      lastCheck: '2023-12-18 14:30:00',
      passRate: 97.2,
      severity: 'low',
      creator: '赵六',
      createTime: '2023-12-01'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [filteredData, setFilteredData] = useState<DataQualityRule[]>(rules);

  // 搜索字段配置
  const searchFields: SearchField[] = [
    { label: '全部', value: 'all' },
    { label: '规则名称', value: 'name' },
    { label: '规则编码', value: 'code' },
    { label: '数据源', value: 'dataSource' },
    { label: '表名', value: 'tableName' }
  ];

  // 高级搜索筛选条件
  const filters: FilterConfig[] = [
    { 
      type: 'input', 
      label: '规则名称', 
      field: 'name',
      span: 8,
      placeholder: '请输入规则名称'
    },
    { 
      type: 'input', 
      label: '规则编码', 
      field: 'code',
      span: 8,
      placeholder: '请输入规则编码'
    },
    { 
      type: 'select', 
      label: '数据源', 
      field: 'dataSource',
      span: 8,
      options: [
        { label: 'ERP系统数据库', value: 'ERP系统数据库' },
        { label: 'MES系统API', value: 'MES系统API' },
        { label: '设备数据采集', value: '设备数据采集' }
      ]
    },
    { 
      type: 'input', 
      label: '表名', 
      field: 'tableName',
      span: 8,
      placeholder: '请输入表名'
    },
    { 
      type: 'select', 
      label: '规则类型', 
      field: 'ruleType',
      span: 8,
      options: [
        { label: '完整性', value: 'completeness' },
        { label: '准确性', value: 'accuracy' },
        { label: '时效性', value: 'timeliness' },
        { label: '一致性', value: 'consistency' },
        { label: '有效性', value: 'validity' }
      ]
    },
    { 
      type: 'select', 
      label: '检查频率', 
      field: 'checkFrequency',
      span: 8,
      options: [
        { label: '实时', value: 'realtime' },
        { label: '每小时', value: 'hourly' },
        { label: '每天', value: 'daily' },
        { label: '每周', value: 'weekly' }
      ]
    },
    { 
      type: 'select', 
      label: '状态', 
      field: 'status',
      span: 8,
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'disabled' },
        { label: '异常', value: 'error' }
      ]
    },
    { 
      type: 'select', 
      label: '严重程度', 
      field: 'severity',
      span: 8,
      options: [
        { label: '高', value: 'high' },
        { label: '中', value: 'medium' },
        { label: '低', value: 'low' }
      ]
    },
    { 
      type: 'numberRange', 
      label: '通过率(%)', 
      field: 'passRate',
      span: 8,
      placeholder: ['最小值', '最大值']
    },
    { 
      type: 'dateRange', 
      label: '创建时间', 
      field: 'createTime',
      span: 8,
      placeholder: ['开始日期', '结束日期']
    }
  ];

  // 排序选项
  const sortOptions: SortOption[] = [
    { label: '通过率：从高到低', value: 'passRate,desc' },
    { label: '通过率：从低到高', value: 'passRate,asc' },
    { label: '最后检查时间：从新到旧', value: 'lastCheck,desc' },
    { label: '最后检查时间：从旧到新', value: 'lastCheck,asc' },
    { label: '创建时间：从新到旧', value: 'createTime,desc' },
    { label: '创建时间：从旧到新', value: 'createTime,asc' }
  ];

  // 快捷筛选
  const quickFilters: QuickFilter[] = [
    { label: '已启用', value: { status: 'active' }, color: 'green' },
    { label: '已禁用', value: { status: 'disabled' }, color: 'default' },
    { label: '异常', value: { status: 'error' }, color: 'red' },
    { label: '高严重度', value: { severity: 'high' }, color: 'magenta' },
    { label: '完整性规则', value: { ruleType: 'completeness' }, color: 'blue' },
    { label: '准确性规则', value: { ruleType: 'accuracy' }, color: 'purple' }
  ];

  const columns: TableProps<DataQualityRule>['columns'] = [
    {
      title: '规则编码',
      dataIndex: 'code',
      key: 'code',
      width: 100
    },
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      width: 180
    },
    {
      title: '数据源/表',
      key: 'dataSource',
      width: 180,
      render: (_, record) => (
        <div>
          <div>{record.dataSource}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{record.tableName}</div>
        </div>
      )
    },
    {
      title: '规则类型',
      dataIndex: 'ruleType',
      key: 'ruleType',
      width: 100,
      render: (type: string) => {
        const typeMap = {
          completeness: '完整性',
          accuracy: '准确性',
          timeliness: '时效性',
          consistency: '一致性',
          validity: '有效性'
        };
        return typeMap[type as keyof typeof typeMap];
      }
    },
    {
      title: '检查频率',
      dataIndex: 'checkFrequency',
      key: 'checkFrequency',
      width: 100,
      render: (frequency: string) => {
        const frequencyMap = {
          realtime: '实时',
          hourly: '每小时',
          daily: '每天',
          weekly: '每周'
        };
        return frequencyMap[frequency as keyof typeof frequencyMap];
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => {
        const statusMap = {
          active: { color: 'success', text: '启用' },
          disabled: { color: 'default', text: '禁用' },
          error: { color: 'error', text: '异常' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Badge status={color as any} text={text} />;
      }
    },
    {
      title: '最后检查',
      dataIndex: 'lastCheck',
      key: 'lastCheck',
      width: 160
    },
    {
      title: '通过率',
      dataIndex: 'passRate',
      key: 'passRate',
      width: 80,
      render: (rate: number) => `${rate}%`
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      width: 80,
      render: (severity: string) => {
        const severityMap = {
          high: { color: 'error', text: '高' },
          medium: { color: 'warning', text: '中' },
          low: { color: 'success', text: '低' }
        };
        const { color, text } = severityMap[severity as keyof typeof severityMap];
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<PlayCircleOutlined />}
            onClick={() => handleRunCheck(record)}
          >
            执行检查
          </Button>
          <Button 
            type="text" 
            icon={<LineChartOutlined />}
            onClick={() => handleViewHistory(record)}
          >
            历史记录
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

  // 处理搜索
  const handleSearch = (params: Record<string, any>) => {
    let filtered = [...rules];
    
    // 处理基础搜索
    if (params._keyword) {
      // 全字段搜索
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(params._keyword.toLowerCase()) ||
        item.code.toLowerCase().includes(params._keyword.toLowerCase()) ||
        item.dataSource.toLowerCase().includes(params._keyword.toLowerCase()) ||
        item.tableName.toLowerCase().includes(params._keyword.toLowerCase())
      );
    } else {
      // 特定字段搜索
      Object.entries(params).forEach(([key, value]) => {
        if (value && key !== 'sortBy') {
          filtered = filtered.filter(item => 
            String(item[key]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      });
    }
    
    setFilteredData(filtered);
  };

  // 处理高级筛选
  const handleFilter = (params: Record<string, any>) => {
    let filtered = [...rules];
    
    // 筛选数据
    Object.entries(params).forEach(([key, value]) => {
      if (value && key !== 'sortBy') {
        if (key === 'createTime' && Array.isArray(value) && value.length === 2) {
          // 日期范围筛选
          const [start, end] = value;
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.createTime);
            return itemDate >= start && itemDate <= end;
          });
        } else if (key === 'passRate' && Array.isArray(value) && value.length === 2) {
          // 通过率范围筛选
          const [min, max] = value;
          filtered = filtered.filter(item => {
            return item.passRate >= min && item.passRate <= max;
          });
        } else {
          // 其他普通筛选
          filtered = filtered.filter(item => item[key] === value);
        }
      }
    });
    
    // 处理排序
    if (params.sortBy) {
      const [field, order] = params.sortBy.split(',');
      filtered = [...filtered].sort((a, b) => {
        if (order === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }
    
    setFilteredData(filtered);
  };

  const handleRunCheck = (record: DataQualityRule) => {
    message.loading({ content: `正在对 ${record.name} 执行数据质量检查...`, key: record.id });
    
    // 模拟异步检查
    setTimeout(() => {
      const passRate = Math.round(Math.random() * 10) / 10 + 95;
      const newRules = rules.map(item => {
        if (item.id === record.id) {
          return {
            ...item,
            lastCheck: new Date().toLocaleString(),
            passRate: passRate,
            status: passRate < 97 ? 'error' as const : 'active' as const
          };
        }
        return item;
      });
      
      setRules(newRules);
      setFilteredData(newRules);
      message.success({ content: `数据质量检查完成，通过率: ${passRate}%`, key: record.id });
    }, 2000);
  };

  const handleViewHistory = (record: DataQualityRule) => {
    message.info(`查看 ${record.name} 的历史检查记录`);
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: DataQualityRule) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: DataQualityRule) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除规则「${record.name}」吗？`,
      onOk() {
        const newData = rules.filter(item => item.id !== record.id);
        setRules(newData);
        setFilteredData(newData);
        message.success('删除成功');
      }
    });
  };

  const generateCode = () => {
    const prefix = 'DQ';
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newRule = {
        ...values,
        id: values.id || String(Date.now()),
        code: values.id ? values.code : generateCode(),
        lastCheck: values.id ? rules.find(item => item.id === values.id)?.lastCheck : '-',
        passRate: values.id ? rules.find(item => item.id === values.id)?.passRate : 100,
        createTime: values.id ? rules.find(item => item.id === values.id)?.createTime : new Date().toISOString().split('T')[0]
      };

      if (values.id) {
        // 编辑现有规则
        const newData = rules.map(item =>
          item.id === values.id ? newRule : item
        );
        setRules(newData);
        setFilteredData(newData);
        message.success('修改成功');
      } else {
        // 添加新规则
        const newData = [...rules, newRule];
        setRules(newData);
        setFilteredData(newData);
        message.success('添加成功');
      }

      setIsModalVisible(false);
    });
  };

  // 处理导出数据
  const handleExport = (params: Record<string, any>) => {
    message.success('数据导出成功');
    console.log('导出数据参数:', params);
  };

  return (
    <div className="data-quality-page">
      <Card
        title="数据质量管理"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            新建规则
          </Button>
        }
      >
        <div className="header-actions">
          <div className="search-wrapper">
            <SearchComponent 
              searchFields={searchFields}
              filters={filters}
              sortOptions={sortOptions}
              quickFilters={quickFilters}
              enableExport={true}
              onSearch={handleSearch}
              onFilter={handleFilter}
              onExport={handleExport}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={form.getFieldValue('id') ? '编辑规则' : '新建规则'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="code" hidden>
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
            name="dataSource"
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
            name="tableName"
            label="表名"
            rules={[{ required: true, message: '请输入表名' }]}
          >
            <Input placeholder="请输入表名" />
          </Form.Item>
          <Form.Item
            name="columnName"
            label="字段名"
          >
            <Input placeholder="请输入字段名，多个字段用逗号分隔" />
          </Form.Item>
          <Form.Item
            name="ruleType"
            label="规则类型"
            rules={[{ required: true, message: '请选择规则类型' }]}
          >
            <Select placeholder="请选择规则类型">
              <Option value="completeness">完整性</Option>
              <Option value="accuracy">准确性</Option>
              <Option value="timeliness">时效性</Option>
              <Option value="consistency">一致性</Option>
              <Option value="validity">有效性</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="checkFrequency"
            label="检查频率"
            rules={[{ required: true, message: '请选择检查频率' }]}
          >
            <Select placeholder="请选择检查频率">
              <Option value="realtime">实时</Option>
              <Option value="hourly">每小时</Option>
              <Option value="daily">每天</Option>
              <Option value="weekly">每周</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="disabled">禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="severity"
            label="严重程度"
            rules={[{ required: true, message: '请选择严重程度' }]}
          >
            <Select placeholder="请选择严重程度">
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="creator"
            label="创建人"
            rules={[{ required: true, message: '请输入创建人' }]}
          >
            <Input placeholder="请输入创建人" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataQualityPage;