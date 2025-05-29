import React from 'react';
import { Typography, Card, Row, Col, Button, Space, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ApartmentOutlined,
  CloudSyncOutlined,
  FileExcelOutlined,
  CheckCircleOutlined,
  RightOutlined,
  FileSearchOutlined,
  RobotOutlined,
  SettingOutlined,
  ApiOutlined,
  DatabaseOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const DataGuide: React.FC = () => {
  const navigate = useNavigate();

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  // 阶段卡片和步骤卡片的样式
  const stageCardStyle = {
    background: '#1677ff',
    color: 'white', 
    borderRadius: '6px', 
    padding: '10px 16px', 
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative' as 'relative',
    overflow: 'hidden' as 'hidden',
    fontSize: '14px'
  };

  const arrowStyle = {
    position: 'absolute' as 'absolute',
    right: '10px',
    fontSize: '14px'
  };

  const stepCardStyle = {
    borderRadius: '6px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    overflow: 'hidden' as 'hidden',
    padding: '12px'
  };

  return (
    <div style={{ padding: '0 0 16px 0' }}>
      <Title level={4} style={{ marginBottom: '12px' }}>数据建设指引</Title>
      
      {/* 引导页顶部 */}
      <Card 
        style={{ 
          marginBottom: '16px',
          background: 'linear-gradient(to right, #f8f9fa, #e9f2ff)',
          padding: '8px'
        }}
        size="small"
        bordered={false}
      >
        <Row align="middle" justify="space-between">
          <Col xs={24} md={16}>
            <Title level={5} style={{ marginBottom: 0, fontSize: '15px' }}>
              数据治理与模型搭建指引
            </Title>
            <Paragraph style={{ marginBottom: 0, color: '#666', fontSize: '12px' }}>
              规划标准化 → 数据接入 → 模型构建 → 验证启用
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right', marginTop: 8 }}>
            <Button 
              type="primary"
              size="small"
              onClick={() => handleExternalLink('http://192.168.1.232:12345/dolphinscheduler/ui/login')}
            >
              开始配置
              <ArrowRightOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
      
      {/* 所有阶段并排显示 */}
      <Row gutter={[12, 0]}>
        {/* 第一列：规划与标准化 */}
        <Col xs={24} md={8}>
          <div style={{ ...stageCardStyle }}>
            <div>1. 规划与标准化</div>
            <RightOutlined style={arrowStyle} />
          </div>
          
          <Card 
            hoverable 
            style={stepCardStyle}
            onClick={() => navigate('/data-indicator')}
            size="small"
          >
            <Space align="start" style={{ marginBottom: '8px' }}>
              <ApartmentOutlined style={{ fontSize: '16px', color: '#1677ff' }} />
              <Title level={5} style={{ marginBottom: 0, fontSize: '14px' }}>定义标准体系</Title>
            </Space>
            <Paragraph style={{ marginBottom: '8px', color: '#666', fontSize: '12px', lineHeight: '1.3' }}>
              以标准数据指标和标准数据模型为依据，开始企业数据治理工作。
            </Paragraph>
            <div>
              <Button 
                type="link" 
                size="small"
                style={{ paddingLeft: 0, fontSize: '12px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/data-indicator');
                }}
              >
                标准指标 <RightOutlined />
              </Button>
              <Divider type="vertical" style={{ margin: '0 4px' }} />
              <Button 
                type="link"
                size="small" 
                style={{ fontSize: '12px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/data-model');
                }}
              >
                标准模型 <RightOutlined />
              </Button>
            </div>
          </Card>
        </Col>
        
        {/* 第二列：数据接入与模型构建 */}
        <Col xs={24} md={8}>
          <div style={{ ...stageCardStyle, background: '#1890ff' }}>
            <div>2. 数据接入与模型构建</div>
            <RightOutlined style={arrowStyle} />
          </div>
          
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card 
                hoverable 
                style={stepCardStyle}
                onClick={() => handleExternalLink('http://192.168.1.232:12345/dolphinscheduler/ui/login')}
                size="small"
              >
                <Space align="start" style={{ marginBottom: '8px' }}>
                  <CloudSyncOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                  <Title level={5} style={{ marginBottom: 0, fontSize: '14px' }}>线上数据源处理</Title>
                </Space>
                <Paragraph style={{ marginBottom: '8px', color: '#666', fontSize: '12px', lineHeight: '1.3' }}>
                  连接线上数据源，进行自动化数据采集、清洗及转换。
                </Paragraph>
                <div>
                  <Button 
                    type="link" 
                    size="small"
                    style={{ paddingLeft: 0, fontSize: '12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/data-collection');
                    }}
                  >
                    配置数据源 <RightOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card 
                hoverable 
                style={stepCardStyle}
                onClick={() => navigate('/data-model')}
                size="small"
              >
                <Space align="start" style={{ marginBottom: '8px' }}>
                  <FileExcelOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                  <Title level={5} style={{ marginBottom: 0, fontSize: '14px' }}>线下数据源处理</Title>
                </Space>
                <Paragraph style={{ marginBottom: '8px', color: '#666', fontSize: '12px', lineHeight: '1.3' }}>
                  上传结构化或半结构化线下数据，完成数据模型搭建。
                </Paragraph>
                <div>
                  <Button 
                    type="link" 
                    size="small"
                    style={{ paddingLeft: 0, fontSize: '12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/data-model');
                    }}
                  >
                    上传数据 <RightOutlined />
                  </Button>
                  <Divider type="vertical" style={{ margin: '0 4px' }} />
                  <Button 
                    type="link"
                    size="small"
                    style={{ fontSize: '12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/data-model');
                    }}
                  >
                    模板样例 <RightOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        
        {/* 第三列：验证与启用 */}
        <Col xs={24} md={8}>
          <div style={{ ...stageCardStyle, background: '#52c41a' }}>
            <div>3. 验证与启用</div>
            <RightOutlined style={arrowStyle} />
          </div>
          
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Card 
                hoverable 
                style={stepCardStyle}
                onClick={() => navigate('/data-mapping')}
                size="small"
              >
                <Space align="start" style={{ marginBottom: '8px' }}>
                  <FileSearchOutlined style={{ fontSize: '16px', color: '#52c41a' }} />
                  <Title level={5} style={{ marginBottom: 0, fontSize: '14px' }}>数据映射验证</Title>
                </Space>
                <Paragraph style={{ marginBottom: '8px', color: '#666', fontSize: '12px', lineHeight: '1.3' }}>
                  验证数据映射的准确性与完整性，确保数据质量。
                </Paragraph>
                <div>
                  <Button 
                    type="link" 
                    size="small"
                    style={{ paddingLeft: 0, fontSize: '12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/data-mapping');
                    }}
                  >
                    数据映射 <RightOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
            <Col span={24}>
              <Card 
                hoverable 
                style={stepCardStyle}
                onClick={() => navigate('/agent/market')}
                size="small"
              >
                <Space align="start" style={{ marginBottom: '8px' }}>
                  <RobotOutlined style={{ fontSize: '16px', color: '#52c41a' }} />
                  <Title level={5} style={{ marginBottom: 0, fontSize: '14px' }}>模型效果验证与启用</Title>
                </Space>
                <Paragraph style={{ marginBottom: '8px', color: '#666', fontSize: '12px', lineHeight: '1.3' }}>
                  在实际业务场景中启用和验证模型的效果。
                </Paragraph>
                <div>
                  <Button 
                    type="link" 
                    size="small"
                    style={{ paddingLeft: 0, fontSize: '12px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/agent/market');
                    }}
                  >
                    启用智能体验证 <RightOutlined />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      
      {/* 底部提示信息 */}
      <Card 
        style={{ 
          marginTop: '12px', 
          background: '#f9f9f9', 
          border: '1px dashed #d9d9d9'
        }}
        size="small"
      >
        <Space align="start">
          <SettingOutlined style={{ fontSize: '14px', color: '#1677ff' }} />
          <div>
            <Text strong style={{ fontSize: '12px' }}>提示：</Text>
            <Paragraph style={{ marginBottom: 0, fontSize: '12px', lineHeight: '1.3' }}>
              建议按照指引步骤顺序操作，以保证数据治理和模型构建的完整性。如有疑问，可点击右下角的智能助手获取帮助。
            </Paragraph>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default DataGuide; 