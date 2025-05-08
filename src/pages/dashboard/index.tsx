import React, { useState } from 'react';
import { Tabs, Card } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import OperationalDashboard from './components/OperationalDashboard';

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
        </Tabs>
      </Card>
    </div>
  );
};

export default Dashboard;