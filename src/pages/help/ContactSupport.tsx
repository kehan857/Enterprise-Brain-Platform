import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Breadcrumb, 
  Space, 
  Form, 
  Input, 
  Select, 
  Button, 
  Divider,
  message
} from 'antd';
import { 
  HomeOutlined, 
  CustomerServiceOutlined, 
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  WechatOutlined,
  SendOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 支持类型选项
const supportTypes = [
  { value: 'technical', label: '技术支持' },
  { value: 'account', label: '账号问题' },
  { value: 'billing', label: '计费问题' },
  { value: 'feature', label: '功能建议' },
  { value: 'bug', label: '问题反馈' },
  { value: 'other', label: '其他' }
];

// 优先级选项
const priorities = [
  { value: 'low', label: '低 - 一般咨询' },
  { value: 'medium', label: '中 - 需要帮助但不影响使用' },
  { value: 'high', label: '高 - 影响部分功能使用' },
  { value: 'critical', label: '紧急 - 系统无法正常工作' }
];

// 联系方式数据
const contactInfo = [
  {
    title: '客服热线',
    icon: <PhoneOutlined style={{ fontSize: 24, color: '#1677ff' }} />,
    content: '400-888-9999',
    description: '工作日 9:00-18:00'
  },
  {
    title: '企业邮箱',
    icon: <MailOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
    content: 'support@enterprise-brain.com',
    description: '7*24小时响应'
  },
  {
    title: '微信公众号',
    icon: <WechatOutlined style={{ fontSize: 24, color: '#22ab38' }} />,
    content: '企业大脑服务平台',
    description: '扫描二维码关注'
  },
  {
    title: '官方网站',
    icon: <GlobalOutlined style={{ fontSize: 24, color: '#fa8c16' }} />,
    content: 'www.enterprise-brain.com',
    description: '了解更多产品信息'
  }
];

const ContactSupport: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    
    try {
      // 模拟提交请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('提交的工单信息:', values);
      message.success('支持请求已提交，我们将尽快与您联系');
      form.resetFields();
    } catch (error) {
      message.error('提交失败，请稍后重试');
      console.error('提交错误:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-support">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/help">
          帮助中心
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Space>
            <CustomerServiceOutlined />
            联系支持
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card bordered={false}>
        <Title level={3}>联系支持</Title>
        <Paragraph>
          如果您在使用过程中遇到任何问题，或有任何建议和反馈，请通过以下方式与我们联系。我们的专业团队将竭诚为您服务。
        </Paragraph>
        
        <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
          {/* 联系方式卡片 */}
          {contactInfo.map((contact, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ marginBottom: 16 }}>
                  {contact.icon}
                </div>
                <Title level={4}>{contact.title}</Title>
                <Paragraph strong>{contact.content}</Paragraph>
                <Text type="secondary">{contact.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: '40px 0 24px' }}>
          <Space>
            <SendOutlined />
            <span>提交工单</span>
          </Space>
        </Divider>

        {/* 工单表单 */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="您的姓名"
                rules={[{ required: true, message: '请输入您的姓名' }]}
              >
                <Input placeholder="请输入您的姓名" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="company"
                label="公司名称"
                rules={[{ required: true, message: '请输入公司名称' }]}
              >
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="电子邮箱"
                rules={[
                  { required: true, message: '请输入电子邮箱' },
                  { type: 'email', message: '请输入有效的电子邮箱' }
                ]}
              >
                <Input placeholder="请输入电子邮箱" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="type"
                label="问题类型"
                rules={[{ required: true, message: '请选择问题类型' }]}
              >
                <Select placeholder="请选择问题类型">
                  {supportTypes.map(type => (
                    <Option key={type.value} value={type.value}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="priority"
                label="优先级"
                rules={[{ required: true, message: '请选择优先级' }]}
              >
                <Select placeholder="请选择优先级">
                  {priorities.map(priority => (
                    <Option key={priority.value} value={priority.value}>{priority.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="subject"
            label="主题"
            rules={[{ required: true, message: '请输入问题主题' }]}
          >
            <Input placeholder="请简要描述您的问题" />
          </Form.Item>

          <Form.Item
            name="description"
            label="详细描述"
            rules={[{ required: true, message: '请详细描述您的问题' }]}
          >
            <TextArea 
              placeholder="请详细描述您遇到的问题或建议，包括操作步骤、错误信息等" 
              rows={6} 
            />
          </Form.Item>

          <Form.Item
            name="attachment"
            label="附件"
            extra="支持上传截图或日志文件，最大支持10MB（可选）"
          >
            <Input type="file" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={submitting}
              icon={<SendOutlined />}
              size="large"
              style={{ minWidth: 120 }}
            >
              提交工单
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '40px 0 24px' }} />

        <Paragraph style={{ textAlign: 'center' }}>
          <Text type="secondary">
            响应时间：普通工单24小时内响应，紧急工单4小时内响应，特急工单1小时内响应
          </Text>
        </Paragraph>
      </Card>
    </div>
  );
};

export default ContactSupport; 