import React, { useState } from 'react';
import { Table, Button, Space, Input, Select, Tag, Progress, Card, Tabs, Avatar, List } from 'antd';
import { SyncOutlined, SearchOutlined, ReloadOutlined, UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const ProjectTask: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  // 模拟数据
  const dataSource = [
    {
      key: '1',
      name: '需求文档编写',
      project: '企业大脑2.0版本开发项目',
      milestone: '需求分析完成',
      priority: '高',
      status: '已完成',
      progress: 100,
      startDate: '2024-05-01',
      endDate: '2024-05-10',
      assignee: '张三',
      creator: '李四',
      description: '编写详细的需求规格说明书',
    },
    {
      key: '2',
      name: '系统架构设计',
      project: '企业大脑2.0版本开发项目',
      milestone: '概要设计完成',
      priority: '高',
      status: '进行中',
      progress: 60,
      startDate: '2024-05-15',
      endDate: '2024-06-10',
      assignee: '李四',
      creator: '李四',
      description: '设计系统整体架构和技术选型',
    },
    {
      key: '3',
      name: '前端框架搭建',
      project: '企业大脑2.0版本开发项目',
      milestone: '开发阶段1完成',
      priority: '中',
      status: '进行中',
      progress: 30,
      startDate: '2024-06-01',
      endDate: '2024-06-20',
      assignee: '王五',
      creator: '李四',
      description: '搭建前端工程化框架和基础组件',
    },
    {
      key: '4',
      name: '数据库设计',
      project: '企业大脑2.0版本开发项目',
      milestone: '开发阶段1完成',
      priority: '中',
      status: '未开始',
      progress: 0,
      startDate: '2024-06-05',
      endDate: '2024-06-25',
      assignee: '赵六',
      creator: '李四',
      description: '设计数据库结构和关系',
    }
  ];

  const filteredData = activeTab === 'all' ? dataSource : 
                       activeTab === 'my' ? dataSource.filter(item => item.assignee === '张三') :
                       activeTab === 'done' ? dataSource.filter(item => item.status === '已完成') :
                       activeTab === 'inprogress' ? dataSource.filter(item => item.status === '进行中') :
                       dataSource;

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '所属项目',
      dataIndex: 'project',
      key: 'project',
    },
    {
      title: '关联里程碑',
      dataIndex: 'milestone',
      key: 'milestone',
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={text === '已完成' ? 'success' : text === '进行中' ? 'processing' : 'default'}>
          {text}
        </Tag>
      ),
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (text: number) => (
        <Progress percent={text} size="small" status={text === 100 ? 'success' : 'active'} />
      ),
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
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (text: string) => (
        <Avatar size="small" icon={<UserOutlined />} /> 
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: () => (
        <Space>
          <a>详情</a>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: '16px 0' }}>任务管理</h2>
      </div>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        style={{ marginBottom: 16 }}
        tabBarExtraContent={
          <Space>
            <Button type="primary">新建任务</Button>
            <Button icon={<SyncOutlined />}></Button>
          </Space>
        }
      >
        <TabPane tab="所有任务" key="all" />
        <TabPane tab="我的任务" key="my" />
        <TabPane tab="已完成" key="done" />
        <TabPane tab="进行中" key="inprogress" />
      </Tabs>
      
      <div style={{ marginBottom: 16 }}>
        <Space size="middle">
          <span>所属项目</span>
          <Select 
            placeholder="请选择项目" 
            style={{ width: 200 }}
            options={[
              { value: '企业大脑2.0版本开发项目', label: '企业大脑2.0版本开发项目' },
              { value: '智能制造平台升级项目', label: '智能制造平台升级项目' },
            ]}
            allowClear
          />
          
          <span>关联里程碑</span>
          <Select 
            placeholder="请选择里程碑"
            style={{ width: 180 }}
            options={[
              { value: '需求分析完成', label: '需求分析完成' },
              { value: '概要设计完成', label: '概要设计完成' },
              { value: '开发阶段1完成', label: '开发阶段1完成' },
            ]}
            allowClear
          />
          
          <span>任务状态</span>
          <Select 
            placeholder="请选择状态"
            style={{ width: 120 }}
            options={[
              { value: '未开始', label: '未开始' },
              { value: '进行中', label: '进行中' },
              { value: '已完成', label: '已完成' },
            ]}
            allowClear
          />
          
          <Input.Search placeholder="搜索任务名称" style={{ width: 200 }} />
          
          <Button type="primary" icon={<SearchOutlined />}>查询</Button>
          <Button icon={<ReloadOutlined />}>重置</Button>
        </Space>
      </div>
      
      <Table 
        dataSource={filteredData} 
        columns={columns} 
        pagination={{
          total: filteredData.length,
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

export default ProjectTask; 