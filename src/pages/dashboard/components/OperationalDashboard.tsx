import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Tag, Space, Button, Grid } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import EnterpriseDiagnosis from '@/components/EnterpriseDiagnosis';
import GuideHelper from '@/components/GuideHelper';
import AIAssistant from '@/components/AIAssistant';
import FloatingButton from '@/components/AIAssistant/FloatingButton';
import TaskProgress from '@/components/TaskProgress';

const { useBreakpoint } = Grid;

const OperationalDashboard: React.FC = () => {
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const screens = useBreakpoint();

  useEffect(() => {
    // 检查是否首次访问
    const visited = localStorage.getItem('dashboard_visited');
    if (!visited) {
      setShowDiagnosis(true);
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
      title: '企业问诊',
      type: 'diagnosis',
      currentStep: 2,
      totalSteps: 4,
      steps: [
        { title: '基础信息', description: '已完成', status: 'finish' as const },
        { title: '问卷调查', description: '已完成', status: 'finish' as const },
        { title: '诊断分析', description: '进行中', status: 'process' as const },
        { title: '报告生成', description: '待完成', status: 'wait' as const },
      ],
      lastUpdateTime: '2024-01-03 15:30:00',
      status: 'processing' as const,
    },
    {
      id: '2',
      title: 'ERP数据接入',
      type: 'data_integration',
      currentStep: 1,
      totalSteps: 4,
      steps: [
        { title: '连接配置', description: '已完成', status: 'finish' as const },
        { title: '字段映射', description: '待开始', status: 'wait' as const },
        { title: '数据验证', description: '待开始', status: 'wait' as const },
        { title: '启用同步', description: '待开始', status: 'wait' as const },
      ],
      lastUpdateTime: '2024-01-03 14:20:00',
      status: 'processing' as const,
    },
  ];

  // Agent告警数据
  const agentAlerts = [
    {
      key: '1',
      title: '设备A温度超标',
      type: '设备告警',
      level: '高',
      time: '2024-01-03 14:30:00',
      status: '未处理',
    },
    {
      key: '2',
      title: '产线B产量低于目标',
      type: '生产告警',
      level: '中',
      time: '2024-01-03 13:15:00',
      status: '处理中',
    },
  ];

  const handleDiagnosisClose = () => {
    setShowDiagnosis(false);
    if (isFirstVisit) {
      setShowGuide(true);
    }
  };

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
        <div style={{ marginTop: '10px', color: '#8c8c8c' }}>
          今日已解答48个问题，准确率98%
        </div>
      </div>
    </Card>
  );

  return (
    <div className="operational-dashboard">
      {/* 企业问诊对话框 */}
      <EnterpriseDiagnosis
        visible={showDiagnosis}
        onClose={handleDiagnosisClose}
      />

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
        isGlobal={true}
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
                { title: '状态', dataIndex: 'status' },
                {
                  title: '操作',
                  key: 'action',
                  render: (_: any, record: any) => (
                    <Space size="small">
                      <Button type="link" size="small">处理</Button>
                      {record.status === '未处理' && (
                        <Button type="link" size="small">忽略</Button>
                      )}
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* 悬浮智能助手按钮 */}
      <FloatingButton unreadCount={0} />
    </div>
  );
};

export default OperationalDashboard;