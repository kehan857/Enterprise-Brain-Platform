import React from 'react';
import { Table, Button, Space, Input, Select, Tag, Dropdown } from 'antd';
import { SyncOutlined, EllipsisOutlined } from '@ant-design/icons';

const ProjectSetting: React.FC = () => {
  // 模拟数据
  const dataSource = [
    {
      key: '1',
      name: '企业大脑2.0版本开发项目',
      code: 'P202405-01',
      type: '研发项目',
      status: '进行中',
      priority: '高',
      manager: '张三',
      startDate: '2024-05-01',
      endDate: '2024-12-31',
      progress: 35,
    },
    {
      key: '2',
      name: '智能制造平台升级项目',
      code: 'P202406-02',
      type: '升级项目',
      status: '规划中',
      priority: '中',
      manager: '李四',
      startDate: '2024-06-15',
      endDate: '2024-09-30',
      progress: 0,
    }
  ];

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '项目编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '项目类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={text === '进行中' ? 'processing' : text === '规划中' ? 'default' : text === '已完成' ? 'success' : 'warning'}>
          {text}
        </Tag>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => (
        <Tag color={text === '高' ? 'error' : text === '中' ? 'warning' : 'default'}>
          {text}
        </Tag>
      ),
    },
    {
      title: '项目负责人',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '操作',
      key: 'actions',
      render: () => (
        <Space size="small">
          <a>详情</a>
          <a>编辑</a>
          <a>删除</a>
          <a>成员</a>
          <Dropdown menu={{ items: [
            { key: '1', label: '查看里程碑' },
            { key: '2', label: '查看任务' },
            { key: '3', label: '导出信息' },
          ] }} trigger={['click']} placement="bottomRight">
            <a onClick={e => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space size="middle" style={{ marginBottom: 16 }}>
          <span>项目名称</span>
          <Input placeholder="请输入项目名称" style={{ width: 200 }} />
          
          <span>项目类型</span>
          <Select 
            placeholder="请选择项目类型" 
            style={{ width: 120 }}
            options={[
              { value: '研发项目', label: '研发项目' },
              { value: '升级项目', label: '升级项目' },
              { value: '维护项目', label: '维护项目' },
            ]}
          />
          
          <span>项目状态</span>
          <Select 
            placeholder="请选择项目状态" 
            style={{ width: 120 }}
            options={[
              { value: '规划中', label: '规划中' },
              { value: '进行中', label: '进行中' },
              { value: '已完成', label: '已完成' },
              { value: '已暂停', label: '已暂停' },
            ]}
          />
          
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary">新建项目</Button>
          <Button>导入</Button>
          <Button>导出</Button>
          <Button icon={<SyncOutlined />}></Button>
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
          pageSizeOptions: ['10', '20', '50'],
        }}
      />
    </div>
  );
};

export default ProjectSetting; 