import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import { DashboardOutlined, RobotOutlined, DatabaseOutlined } from '@ant-design/icons';
import OperationalDashboard from './components/OperationalDashboard';
import AgentMonitorDashboard from './components/AgentMonitorDashboard';
import DataHealthDashboard from './components/DataHealthDashboard';


const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className="dashboard-container" style={{ padding: '24px' }}>
      <Card
        bordered={false}
        style={{ 
          background: '#f0f2f5',
          minHeight: 'calc(100vh - 48px)',
        }}
      >
        <Tabs
          activeKey={activeKey}
          onChange={handleTabChange}
          type="card"
          size="large"
          style={{ marginBottom: '16px' }}
        >
          <TabPane
            tab={
              <span>
                <DashboardOutlined />
                运营总览
              </span>
            }
            key="1"
          >
            <OperationalDashboard />
          </TabPane>
          <TabPane
            tab={
              <span>
                <RobotOutlined />
                智能体监控
              </span>
            }
            key="2"
          >
            <AgentMonitorDashboard />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DatabaseOutlined />
                数据健康度
              </span>
            }
            key="3"
          >
            <DataHealthDashboard />
          </TabPane>

        </Tabs>
      </Card>
    </div>
  );
};

export default Dashboard;