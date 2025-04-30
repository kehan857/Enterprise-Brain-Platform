import React from 'react';
import { Card, List, Button, Modal, Form, Select, DatePicker, Space, Tag } from 'antd';
import { PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';

interface DataAgentItem {
  id: string;
  name: string;
  description: string;
  domain: string;
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

  return (
    <div>
      <Card title="数据Agent列表" style={{ marginBottom: 24 }}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={[
            {
              id: '1',
              name: '生产效率分析Agent',
              description: '分析生产线效率、产能利用率等关键指标',
              domain: '生产',
              status: 'stopped',
            },
            {
              id: '2',
              name: '质量分析Agent',
              description: '分析产品质量趋势、不良率等指标',
              domain: '质量',
              status: 'completed',
              lastRunTime: '2024-01-20 10:30:00',
            },
            {
              id: '3',
              name: '供应链风险分析Agent',
              description: '分析供应商交付、库存等风险指标',
              domain: '供应链',
              status: 'running',
            },
          ]}
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
                <p>业务领域：{item.domain}</p>
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