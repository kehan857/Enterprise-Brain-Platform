import React from 'react';
import { Card, List, Button, Modal, Form, Select, DatePicker, Space, Tag } from 'antd';
import { PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';

interface DataAgentItem {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'running' | 'stopped' | 'completed';
  lastRunTime?: string;
}

const DataAgent: React.FC = () => {
  const [configVisible, setConfigVisible] = React.useState(false);

  const getStatusTag = (status: DataAgentItem['status']) => {
    const statusMap = {
      running: { color: 'processing', text: '运行中' },
      stopped: { color: 'default', text: '已停止' },
      completed: { color: 'success', text: '已完成' },
    };
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  const getCategoryTag = (category: string) => {
    const categoryColors: Record<string, string> = {
      '经营': 'gold',
      '营销': 'geekblue',
      '生产': 'green',
      '质控': 'purple',
      '研发': 'cyan',
      '财务': 'blue',
      '人事': 'orange',
      '其他': 'default'
    };
    return <Tag color={categoryColors[category] || 'default'}>{category}</Tag>;
  };

  const categories = ['全部', '经营', '营销', '生产', '质控', '研发', '财务', '人事', '其他'];
  const [activeCategory, setActiveCategory] = React.useState('全部');

  const agentData: DataAgentItem[] = [
    {
      id: '1',
      name: '生产效率分析Agent',
      description: '分析生产线效率、产能利用率等关键指标',
      category: '生产',
      status: 'stopped',
    },
    {
      id: '2',
      name: '质量趋势分析Agent',
      description: '分析产品质量趋势、不良率等指标',
      category: '质控',
      status: 'completed',
      lastRunTime: '2024-01-20 10:30:00',
    },
    {
      id: '3',
      name: '供应链风险分析Agent',
      description: '分析供应商交付、库存等风险指标',
      category: '生产',
      status: 'running',
    },
    {
      id: '4',
      name: '销售业绩分析Agent',
      description: '分析销售数据、客户转化率等营销指标',
      category: '营销',
      status: 'completed',
      lastRunTime: '2024-01-19 16:45:00',
    },
    {
      id: '5',
      name: '财务指标分析Agent',
      description: '分析财务报表、现金流等财务健康指标',
      category: '财务',
      status: 'stopped',
    },
    {
      id: '6',
      name: '研发项目分析Agent',
      description: '分析研发项目进度、资源利用情况',
      category: '研发',
      status: 'running',
    },
    {
      id: '7',
      name: '人才流动分析Agent',
      description: '分析员工流动率、岗位满意度等人事数据',
      category: '人事',
      status: 'completed',
      lastRunTime: '2024-01-18 09:15:00',
    },
    {
      id: '8',
      name: '经营风险分析Agent',
      description: '分析企业经营指标、市场份额等战略数据',
      category: '经营',
      status: 'running',
    },
    {
      id: '9',
      name: '数据质量分析Agent',
      description: '分析系统数据质量、异常值等指标',
      category: '其他',
      status: 'stopped',
    },
  ];

  const filteredAgents = activeCategory === '全部' 
    ? agentData 
    : agentData.filter(agent => agent.category === activeCategory);

  return (
    <div>
      <Card title="数据Agent列表" style={{ marginBottom: 24 }} extra={
        <Space>
          {categories.map(category => (
            <Button 
              key={category}
              type={activeCategory === category ? 'primary' : 'default'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Space>
      }>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={filteredAgents}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={getStatusTag(item.status)}
                actions={[
                  <Button 
                    type="text" 
                    icon={<SettingOutlined />}
                    onClick={() => setConfigVisible(true)}
                  >
                    配置
                  </Button>,
                  <Button 
                    type="text" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => console.log('run agent')}
                  >
                    运行
                  </Button>,
                ]}
              >
                <p>{item.description}</p>
                <p>业务类别：{getCategoryTag(item.category)}</p>
                {item.lastRunTime && <p>上次运行：{item.lastRunTime}</p>}
              </Card>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="配置数据Agent"
        open={configVisible}
        onCancel={() => setConfigVisible(false)}
        onOk={() => {
          setConfigVisible(false);
          console.log('save config');
        }}
      >
        <Form layout="vertical">
          <Form.Item label="分析时间范围">
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="产线选择">
            <Select
              mode="multiple"
              placeholder="选择要分析的产线"
              style={{ width: '100%' }}
              options={[
                { value: 'line1', label: '产线1' },
                { value: 'line2', label: '产线2' },
                { value: 'line3', label: '产线3' },
              ]}
            />
          </Form.Item>
          <Form.Item label="运行计划">
            <Select
              placeholder="选择运行方式"
              style={{ width: '100%' }}
              options={[
                { value: 'manual', label: '手动触发' },
                { value: 'daily', label: '每日运行' },
                { value: 'weekly', label: '每周运行' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataAgent;