import React, { useState } from 'react';
import { Form, Card, Radio, Select, Space, Typography, Progress, Button, Divider, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface CoreSystem {
  name: string;
  status: 'connected' | 'interrupted' | 'not_configured';
  lastSync?: string;
}

interface QuickDiagnosisProps {
  readinessLevel?: 'low' | 'medium' | 'high';
  coreSystems?: CoreSystem[];
  coverageRate?: number;
  stabilityRate?: number;
  onComplete?: (values: any) => void;
}

const QuickDiagnosis: React.FC<QuickDiagnosisProps> = ({
  readinessLevel = 'medium',
  coreSystems = [],
  coverageRate = 0,
  stabilityRate = 0,
  onComplete
}) => {
  const [form] = Form.useForm();
  const [currentSection, setCurrentSection] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSectionComplete = async () => {
    try {
      const values = await form.validateFields();
      if (currentSection === 2) {
        if (currentStep === 1) {
          setCurrentStep(2);
        } else if (currentStep === 2) {
          setCurrentSection(3);
          setCurrentStep(1);
        }
      } else if (currentSection < 4) {
        setCurrentSection(currentSection + 1);
      } else if (onComplete) {
        onComplete(values);
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handlePrevious = () => {
    if (currentSection === 2 && currentStep === 2) {
      setCurrentStep(1);
    } else if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      if (currentSection === 3) {
        setCurrentStep(2);
      }
    }
  };

  const renderSystemStatus = (status: CoreSystem['status']) => {
    switch (status) {
      case 'connected':
        return (
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            <Text type="success">已连接</Text>
          </Space>
        );
      case 'interrupted':
        return (
          <Space>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            <Text type="warning">连接中断</Text>
          </Space>
        );
      case 'not_configured':
        return (
          <Space>
            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
            <Text type="danger">未配置</Text>
          </Space>
        );
      default:
        return null;
    }
  };

  const renderBasicInfo = () => (
    <Card title="基础信息">
      <Form.Item
        name="industry"
        label="所属行业"
        rules={[{ required: true, message: '请选择所属行业' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="manufacturing">制造业</Radio>
            <Radio value="energy">能源行业</Radio>
            <Radio value="chemical">化工行业</Radio>
            <Radio value="automotive">汽车行业</Radio>
            <Radio value="other">其他行业</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="scale"
        label="企业规模"
        rules={[{ required: true, message: '请选择企业规模' }]}
      >
        <Radio.Group>
          <Radio value="small">小型企业（员工&lt;100人）</Radio>
          <Radio value="medium">中型企业（100-500人）</Radio>
          <Radio value="large">大型企业（&gt;500人）</Radio>
        </Radio.Group>
      </Form.Item>
    </Card>
  );

  const systemCards = [
    {
      title: 'ERP系统',
      name: 'erp',
      icon: '📊',
      description: '企业资源计划系统'
    },
    {
      title: 'MES系统',
      name: 'mes',
      icon: '🏭',
      description: '制造执行系统'
    },
    {
      title: 'WMS系统',
      name: 'wms',
      icon: '📦',
      description: '仓库管理系统'
    },
    {
      title: 'CRM系统',
      name: 'crm',
      icon: '👥',
      description: '客户关系管理'
    },
    {
      title: 'PLM系统',
      name: 'plm',
      icon: '🔄',
      description: '产品生命周期管理'
    },
    {
      title: 'SCM系统',
      name: 'scm',
      icon: '🔗',
      description: '供应链管理系统'
    },
    {
      title: 'IoT平台',
      name: 'iot',
      icon: '📡',
      description: '物联网数据平台'
    }
  ];

  const renderSystemSelection = () => (
    <Card title="系统选择">
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary">请选择贵企业目前已有的系统</Text>
      </div>
      <Form.Item
        name="selected_systems"
        rules={[{ required: true, message: '请至少选择一个系统' }]}
      >
        <Checkbox.Group style={{ width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {systemCards.map(system => (
              <Card
                key={system.name}
                size="small"
                hoverable
                style={{ cursor: 'pointer' }}
              >
                <Checkbox value={system.name}>
                  <Space>
                    <span>{system.icon}</span>
                    <span>{system.title}</span>
                  </Space>
                </Checkbox>
                <div style={{ marginTop: 8, paddingLeft: 24 }}>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{system.description}</Text>
                </div>
              </Card>
            ))}
          </div>
        </Checkbox.Group>
      </Form.Item>
    </Card>
  );

  const renderSystemEvaluation = () => {
    const selectedSystems = form.getFieldValue('selected_systems') || [];
    
    return (
      <Card title="系统评估">
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">请评估已选系统的使用情况</Text>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {systemCards
            .filter(system => selectedSystems.includes(system.name))
            .map(system => (
              <Card
                key={system.name}
                size="small"
                title={
                  <Space>
                    <span>{system.icon}</span>
                    <span>{system.title}</span>
                  </Space>
                }
              >
                <Form.Item
                  name={`${system.name}_status`}
                  rules={[{ required: true, message: `请选择${system.title}使用情况` }]}
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="complete">已完整部署并稳定运行</Radio>
                      <Radio value="partial">部分功能已部署使用</Radio>
                      <Radio value="planning">正在规划或评估中</Radio>
                      <Radio value="none">暂未使用</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>
          ))}
        </div>
      </Card>
    );
  };

  const renderDataManagement = () => (
    <Card title="数据管理现状">
      <Form.Item
        name="data_collection"
        label="数据采集方式"
        rules={[{ required: true, message: '请选择数据采集方式' }]}
      >
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox value="auto">自动化采集</Checkbox>
            <Checkbox value="semi">半自动采集</Checkbox>
            <Checkbox value="manual">人工录入</Checkbox>
            <Checkbox value="third_party">第三方数据接入</Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        name="data_quality"
        label="数据质量管理"
        rules={[{ required: true, message: '请选择数据质量管理水平' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="systematic">已建立系统化的数据质量管理机制</Radio>
            <Radio value="partial">部分数据有质量控制措施</Radio>
            <Radio value="basic">基础的数据校验</Radio>
            <Radio value="none">暂无特定措施</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Card>
  );

  const renderAIReadiness = () => (
    <Card title="AI应用就绪度">
      <Form.Item
        name="ai_experience"
        label="AI技术应用经验"
        rules={[{ required: true, message: '请选择AI技术应用经验' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="extensive">已有成熟的AI应用场景</Radio>
            <Radio value="pilot">正在进行试点应用</Radio>
            <Radio value="planning">处于规划评估阶段</Radio>
            <Radio value="none">暂无相关经验</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="ai_expectation"
        label="对AI技术的期望"
        rules={[{ required: true, message: '请选择对AI技术的期望' }]}
      >
        <Checkbox.Group>
          <Space direction="vertical">
            <Checkbox value="efficiency">提升运营效率</Checkbox>
            <Checkbox value="quality">提高产品质量</Checkbox>
            <Checkbox value="cost">降低运营成本</Checkbox>
            <Checkbox value="decision">辅助决策分析</Checkbox>
            <Checkbox value="innovation">推动业务创新</Checkbox>
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </Card>
  );

  const renderProgressIndicator = () => (
    <Progress
      percent={((currentSection - 1) * 25) + (currentSection === 2 ? currentStep * 12.5 : 0)}
      status="active"
      style={{ marginBottom: 24 }}
    />
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return renderBasicInfo();
      case 2:
        return currentStep === 1 ? renderSystemSelection() : renderSystemEvaluation();
      case 3:
        return renderDataManagement();
      case 4:
        return renderAIReadiness();
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      {renderProgressIndicator()}
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          industry: undefined,
          scale: undefined,
          selected_systems: [],
          data_collection: [],
          data_quality: undefined,
          ai_experience: undefined,
          ai_expectation: []
        }}
      >
        {renderCurrentSection()}
        <Divider />
        <div style={{ textAlign: 'right' }}>
          {(currentSection > 1 || currentStep > 1) && (
            <Button
              style={{ marginRight: 8 }}
              onClick={handlePrevious}
            >
              上一步
            </Button>
          )}
          <Button
            type="primary"
            onClick={handleSectionComplete}
          >
            {currentSection < 4 || (currentSection === 2 && currentStep === 1) ? '下一步' : '完成诊断'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default QuickDiagnosis;