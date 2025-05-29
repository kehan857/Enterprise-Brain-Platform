import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Tag, Space, Button, Grid, Modal, Descriptions } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import GuideHelper from '@/components/GuideHelper';
import AIAssistant from '@/components/AIAssistant';
import FloatingButton from '@/components/AIAssistant/FloatingButton';
import TaskProgress from '@/components/TaskProgress';

const { useBreakpoint } = Grid;

const OperationalDashboard: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [alertDetailVisible, setAlertDetailVisible] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<any>(null);
  const screens = useBreakpoint();

  useEffect(() => {
    // 检查是否首次访问
    const visited = localStorage.getItem('dashboard_visited');
    if (!visited) {
      setShowGuide(true);
      setIsFirstVisit(true);
      localStorage.setItem('dashboard_visited', 'true');
    }
  }, []);

  // 数据源状态数据
  const dataSourceStatus = [
    { name: 'ERP系统', status: 'normal', lastSync: '2024-01-03 15:30:00', errorCount: 0 },
    { name: 'MES系统', status: 'error', lastSync: '2024-01-03 14:00:00', errorCount: 3 },
    { name: '设备数据', status: 'normal', lastSync: '2024-01-03 15:28:00', errorCount: 0 },
  ];

  // 任务进展数据
  const taskProgressData = [
    {
      id: '1',
      title: '营销数据模型任务',
      status: 'processing' as const,
      submitTime: '2025-05-08 04:00:29',
      startTime: '2025-05-08 04:00:29',
    },
    {
      id: '2',
      title: '生产数据模型任务',
      status: 'processing' as const,
      submitTime: '2025-05-08 04:00:27',
      startTime: '2025-05-08 04:00:27',
    },
    {
      id: '3',
      title: '供应链数据模型任务',
      status: 'completed' as const,
      submitTime: '2025-05-08 04:00:27',
      startTime: '2025-05-08 04:00:27',
    },
  ];

  // Agent告警数据
  const [agentAlerts, setAgentAlerts] = useState([
    {
      key: '1',
      title: '设备A温度超标',
      type: '设备告警',
      level: '高',
      time: '2024-01-03 14:30:00',
      status: '未处理',
      description: '设备A的温度已经超过安全阈值，当前温度为95°C，安全阈值为85°C。请立即检查冷却系统是否正常工作。',
    },
    {
      key: '2',
      title: '产线B产量低于目标',
      type: '生产告警',
      level: '中',
      time: '2024-01-03 13:15:00',
      status: '已处理',
      description: '产线B的生产效率低于预期目标，当前产能仅为计划的78%。可能与上午的设备调整有关。',
    },
    {
      key: '3',
      title: '原材料库存不足预警',
      type: '库存告警',
      level: '低',
      time: '2024-01-03 11:45:00',
      status: '已忽略',
      description: '主要原材料A的库存低于安全水平，当前库存可支持生产5天。建议及时补充库存。',
    },
  ]);

  const handleGuideFinish = () => {
    setShowGuide(false);
    setIsFirstVisit(false);
  };

  const renderDataSourceStatus = () => (
    <Card title="数据接入状态" className="data-health-section">
      <Table
        dataSource={dataSourceStatus}
        pagination={false}
        size="small"
        columns={[
          { title: '数据源', dataIndex: 'name' },
          {
            title: '状态',
            dataIndex: 'status',
            render: (status: string) => (
              <Tag color={status === 'normal' ? 'success' : 'error'}>
                {status === 'normal' ? '正常' : '异常'}
              </Tag>
            ),
          },
          { title: '最后同步', dataIndex: 'lastSync' },
          { title: '异常数据量', dataIndex: 'errorCount' },
        ]}
      />
    </Card>
  );

  const renderAIAssistantButton = () => (
    <Card
      title="智能助手"
      className="ai-assistant-section"
      extra={<Tag color="blue">Beta</Tag>}
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Button
          type="primary"
          icon={<QuestionCircleOutlined />}
          onClick={() => setShowAIAssistant(true)}
        >
          我要提问
        </Button>
      </div>
    </Card>
  );

  // 处理告警处理
  const handleProcessAlert = (key: string) => {
    setAgentAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.key === key ? { ...alert, status: '已处理' } : alert
      )
    );
  };

  // 处理告警忽略
  const handleIgnoreAlert = (key: string) => {
    setAgentAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.key === key ? { ...alert, status: '已忽略' } : alert
      )
    );
  };

  // 处理查看告警详情
  const handleViewAlert = (record: any) => {
    setCurrentAlert(record);
    setAlertDetailVisible(true);
  };

  return (
    <div className="operational-dashboard">
      {/* 新手引导 */}
      <GuideHelper
        type="tour"
        pageKey="dashboard"
        visible={showGuide}
        onFinish={handleGuideFinish}
      />

      {/* 智能助手 */}
      <AIAssistant
        visible={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        industryType="制造业"
      />

      {/* 任务进展和智能助手区域 */}
      <Row gutter={[16, 16]} className="task-ai-section">
        <Col xs={24} lg={16}>
          <TaskProgress tasks={taskProgressData} />
        </Col>
        <Col xs={24} lg={8}>
          {renderAIAssistantButton()}
        </Col>
      </Row>
      
      {/* 数据接入状态 */}
      <div style={{ marginTop: '16px' }}>
        {renderDataSourceStatus()}
      </div>

      {/* Agent告警区域 */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card title="活跃告警">
            <Table
              dataSource={agentAlerts}
              pagination={false}
              size="small"
              columns={[
                { title: '告警内容', dataIndex: 'title' },
                { title: '类型', dataIndex: 'type' },
                {
                  title: '级别',
                  dataIndex: 'level',
                  render: (level: string) => (
                    <Tag color={level === '高' ? 'error' : level === '中' ? 'warning' : 'success'}>
                      {level}
                    </Tag>
                  ),
                },
                { title: '时间', dataIndex: 'time' },
                { 
                  title: '状态', 
                  dataIndex: 'status',
                  render: (status: string) => {
                    const statusConfig = {
                      '未处理': { color: 'error' },
                      '已处理': { color: 'success' },
                      '已忽略': { color: 'default' }
                    };
                    return (
                      <Tag color={statusConfig[status as keyof typeof statusConfig].color}>
                        {status}
                      </Tag>
                    );
                  }
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="small">
                      {record.status === '未处理' && (
                        <>
                          <Button type="link" size="small" onClick={() => handleViewAlert(record)}>查看</Button>
                          <Button type="link" size="small" onClick={() => handleProcessAlert(record.key)}>处理</Button>
                          <Button type="link" size="small" onClick={() => handleIgnoreAlert(record.key)}>忽略</Button>
                        </>
                      )}
                      {record.status !== '未处理' && (
                        <Button type="link" size="small" onClick={() => handleViewAlert(record)}>查看</Button>
                      )}
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* 告警详情模态框 */}
      <Modal
        title="告警详情"
        open={alertDetailVisible}
        onCancel={() => setAlertDetailVisible(false)}
        footer={[
          <Button key="close" onClick={() => setAlertDetailVisible(false)}>
            关闭
          </Button>,
          currentAlert && currentAlert.status === '未处理' && (
            <>
              <Button key="process" type="primary" onClick={() => {
                handleProcessAlert(currentAlert.key);
                setAlertDetailVisible(false);
              }}>
                处理
              </Button>
              <Button key="ignore" onClick={() => {
                handleIgnoreAlert(currentAlert.key);
                setAlertDetailVisible(false);
              }}>
                忽略
              </Button>
            </>
          )
        ]}
      >
        {currentAlert && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="告警内容">{currentAlert.title}</Descriptions.Item>
            <Descriptions.Item label="告警类型">{currentAlert.type}</Descriptions.Item>
            <Descriptions.Item label="告警级别">
              <Tag color={currentAlert.level === '高' ? 'error' : currentAlert.level === '中' ? 'warning' : 'success'}>
                {currentAlert.level}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="告警时间">{currentAlert.time}</Descriptions.Item>
            <Descriptions.Item label="告警状态">
              <Tag 
                color={
                  currentAlert.status === '未处理' ? 'error' : 
                  currentAlert.status === '已处理' ? 'success' : 'default'
                }
              >
                {currentAlert.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="详细描述">{currentAlert.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* 悬浮智能助手按钮 */}
      <FloatingButton unreadCount={0} />
    </div>
  );
};

export default OperationalDashboard;