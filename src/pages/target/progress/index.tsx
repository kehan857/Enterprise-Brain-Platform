import React from 'react';
import { Table, Button, Space, Select, Progress } from 'antd';
import { SyncOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const TargetProgress: React.FC = () => {
  // 模拟数据
  const dataSource = [
    {
      key: '1',
      time: '2025年',
      structure: '工业互联事业部',
      indicator: '订货额',
      targetValue: 100,
      actualValue: 0,
      completionRate: 0,
      timeProgress: 38,
      unit: '万元'
    },
    {
      key: '2',
      time: '2025年1月',
      structure: '工业互联事业部',
      indicator: '入库发货率',
      targetValue: 3344,
      actualValue: 0,
      completionRate: 0,
      timeProgress: 100,
      unit: '万元'
    },
    {
      key: '3',
      time: '2025年1月',
      structure: '工业互联事业部',
      indicator: '订货额',
      targetValue: 500,
      actualValue: 93.57,
      completionRate: 18.71,
      timeProgress: 100,
      unit: '万元'
    }
  ];

  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '架构',
      dataIndex: 'structure',
      key: 'structure',
    },
    {
      title: '指标名称',
      dataIndex: 'indicator',
      key: 'indicator',
    },
    {
      title: '目标值',
      dataIndex: 'targetValue',
      key: 'targetValue',
    },
    {
      title: '实际值',
      dataIndex: 'actualValue',
      key: 'actualValue',
    },
    {
      title: '达成率',
      dataIndex: 'completionRate',
      key: 'completionRate',
      render: (text: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress 
            percent={text} 
            size="small" 
            style={{ width: 120 }} 
            strokeColor={text < 30 ? '#faad14' : (text < 70 ? '#1677ff' : '#52c41a')}
          />
          <span style={{ marginLeft: 8 }}>{text}%</span>
        </div>
      ),
    },
    {
      title: '时间进度',
      dataIndex: 'timeProgress',
      key: 'timeProgress',
      render: (text: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress 
            percent={text} 
            size="small" 
            style={{ width: 120 }} 
            strokeColor={text < 30 ? '#faad14' : (text < 70 ? '#1677ff' : '#52c41a')}
          />
          <span style={{ marginLeft: 8 }}>{text}%</span>
        </div>
      ),
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space size="middle">
          <span>时间</span>
          <Select 
            defaultValue="2025" 
            style={{ width: 120 }}
            options={[
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
              { value: '2023', label: '2023' },
            ]}
          />
          
          <Select 
            placeholder="请选择季度"
            style={{ width: 120 }}
            options={[
              { value: '第一季度', label: '第一季度' },
              { value: '第二季度', label: '第二季度' },
              { value: '第三季度', label: '第三季度' },
              { value: '第四季度', label: '第四季度' },
            ]}
          />
          
          <span>架构</span>
          <Select 
            placeholder="请选择架构"
            style={{ width: 180 }}
            options={[
              { value: '工业互联事业部', label: '工业互联事业部' },
            ]}
          />
          
          <span>指标名称</span>
          <Select 
            placeholder="请选择指标类别"
            style={{ width: 180 }}
            options={[
              { value: '订货额', label: '订货额' },
              { value: '入库发货率', label: '入库发货率' },
            ]}
          />
          
          <span>维度</span>
          <Select 
            placeholder="请选择维度"
            style={{ width: 120 }}
            options={[
              { value: '年度', label: '年度' },
              { value: '季度', label: '季度' },
              { value: '月度', label: '月度' },
            ]}
          />
          
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button icon={<ReloadOutlined />}>重置</Button>
        </Space>
      </div>
      
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          total: 3,
          current: 1,
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ['20'],
        }}
      />
    </div>
  );
};

export default TargetProgress; 