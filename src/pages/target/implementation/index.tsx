import React from 'react';
import { Table, Button, Space, Input, Select, Tag } from 'antd';
import { SyncOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const TargetImplementation: React.FC = () => {
  // 模拟数据
  const dataSource = [
    {
      key: '1',
      department: '硅能空调部',
      group: '研发小组',
      year: '2025',
      quarter: '第一季度',
      month: '三月',
      mainTarget: '完成任务',
      plan: '统招',
    },
    {
      key: '2',
      department: '硅能空调部',
      group: '研发小组',
      year: '2025',
      quarter: '第一季度',
      month: '元月',
      mainTarget: '完成任务',
      plan: '统招',
    }
  ];

  const columns = [
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '小组',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: '年份',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '季度',
      dataIndex: 'quarter',
      key: 'quarter',
    },
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: '主要工作目标',
      dataIndex: 'mainTarget',
      key: 'mainTarget',
    },
    {
      title: '工作计划',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: '操作',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="link" size="small">上传附件</Button>
          <Button type="link" size="small">更多</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ textAlign: 'center', margin: '16px 0' }}>2025年重点工作计划表</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Space>
            <Button type="primary">编辑</Button>
            <Button>保存</Button>
            <Button icon={<SyncOutlined />}></Button>
            <Button icon={<EditOutlined />}></Button>
          </Space>
        </div>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <Space size="middle" wrap>
          <span>年份</span>
          <Select 
            defaultValue="2025" 
            style={{ width: 120 }}
            options={[
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
              { value: '2023', label: '2023' },
            ]}
          />
          
          <span>季度</span>
          <Select 
            defaultValue="第一季度"
            style={{ width: 120 }}
            options={[
              { value: '第一季度', label: '第一季度' },
              { value: '第二季度', label: '第二季度' },
              { value: '第三季度', label: '第三季度' },
              { value: '第四季度', label: '第四季度' },
            ]}
          />
          
          <span>月份</span>
          <Select 
            placeholder="请选择月份"
            style={{ width: 120 }}
            options={[
              { value: '一月', label: '一月' },
              { value: '二月', label: '二月' },
              { value: '三月', label: '三月' },
            ]}
          />
          
          <span>部门</span>
          <Select 
            placeholder="请选择部门"
            style={{ width: 180 }}
            options={[
              { value: '硅能空调部', label: '硅能空调部' },
            ]}
          />
          
          <span>小组</span>
          <Select 
            placeholder="请选择小组"
            style={{ width: 120 }}
            options={[
              { value: '研发小组', label: '研发小组' },
            ]}
          />
          
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary">导入</Button>
          <Button>导出</Button>
          <Button>下载模板</Button>
        </Space>
      </div>
      
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          total: 2,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ['10'],
        }}
      />
    </div>
  );
};

export default TargetImplementation; 