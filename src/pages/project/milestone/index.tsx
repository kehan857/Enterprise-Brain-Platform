import React from 'react';
import { Table, Button, Space, Input, Select, Tag, Steps, Timeline, Card } from 'antd';
import { SyncOutlined, CalendarOutlined, FlagOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ProjectMilestone: React.FC = () => {
  // 模拟数据
  const dataSource = [
    {
      key: '1',
      project: '企业大脑2.0版本开发项目',
      name: '需求分析完成',
      date: '2024-05-20',
      status: '已完成',
      responsible: '张三',
      description: '完成所有需求的收集和分析，确定产品功能范围',
    },
    {
      key: '2',
      project: '企业大脑2.0版本开发项目',
      name: '概要设计完成',
      date: '2024-06-15',
      status: '进行中',
      responsible: '李四',
      description: '完成系统架构设计和技术选型',
    },
    {
      key: '3',
      project: '企业大脑2.0版本开发项目',
      name: '开发阶段1完成',
      date: '2024-08-30',
      status: '未开始',
      responsible: '王五',
      description: '完成核心模块的开发和单元测试',
    },
    {
      key: '4',
      project: '企业大脑2.0版本开发项目',
      name: '系统测试完成',
      date: '2024-10-30',
      status: '未开始',
      responsible: '赵六',
      description: '完成系统功能测试和性能测试',
    },
    {
      key: '5',
      project: '企业大脑2.0版本开发项目',
      name: '项目上线',
      date: '2024-12-15',
      status: '未开始',
      responsible: '张三',
      description: '系统部署上线并交付使用',
    }
  ];

  const columns = [
    {
      title: '所属项目',
      dataIndex: 'project',
      key: 'project',
    },
    {
      title: '里程碑名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '计划日期',
      dataIndex: 'date',
      key: 'date',
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
      title: '负责人',
      dataIndex: 'responsible',
      key: 'responsible',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'actions',
      render: () => (
        <Space>
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  // 时间线视图数据
  const timelineItems = dataSource.map(item => ({
    color: item.status === '已完成' ? 'green' : item.status === '进行中' ? 'blue' : 'gray',
    children: (
      <div>
        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
        <div>{item.date}</div>
        <div style={{ color: '#888' }}>{item.description}</div>
      </div>
    ),
    dot: item.status === '已完成' ? <CheckCircleOutlined /> : 
         item.status === '进行中' ? <ClockCircleOutlined /> : <FlagOutlined />
  }));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: '16px 0' }}>项目里程碑管理</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Space>
            <span>当前项目：</span>
            <Select 
              defaultValue="企业大脑2.0版本开发项目" 
              style={{ width: 250 }}
              options={[
                { value: '企业大脑2.0版本开发项目', label: '企业大脑2.0版本开发项目' },
                { value: '智能制造平台升级项目', label: '智能制造平台升级项目' },
              ]}
            />
          </Space>
          <Space>
            <Button type="primary">添加里程碑</Button>
            <Button icon={<SyncOutlined />}></Button>
          </Space>
        </div>
      </div>
      
      <Card 
        title="里程碑时间线" 
        style={{ marginBottom: 24 }}
        extra={<Button type="link" icon={<CalendarOutlined />}>切换视图</Button>}
      >
        <Timeline items={timelineItems} mode="left" />
      </Card>
      
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={{
          total: 5,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ['10', '20'],
        }}
      />
    </div>
  );
};

export default ProjectMilestone; 