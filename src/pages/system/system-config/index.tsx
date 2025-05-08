import React, { useState } from 'react';
import { Card, Form, Input, Button, Tabs, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface BasicConfig {
  systemName: string;
  systemLogo: string;
  companyName: string;
  adminEmail: string;
  technicalSupport: string;
}

const SystemConfig: React.FC = () => {
  // 表单实例
  const [basicForm] = Form.useForm();

  // 初始配置数据
  const [basicConfig] = useState<BasicConfig>({
    systemName: '企业大脑服务平台',
    systemLogo: 'https://example.com/logo.png',
    companyName: '天云聚合网络科技有限公司',
    adminEmail: 'admin@example.com',
    technicalSupport: '技术支持热线：400-888-8888',
  });

  // 处理基础配置保存
  const handleBasicSave = async () => {
    try {
      const values = await basicForm.validateFields();
      console.log('基础配置:', values);
      message.success('基础配置保存成功');
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <div className="system-config-container">
      <Card title="基础信息配置">
        <Form
          form={basicForm}
          layout="vertical"
          initialValues={basicConfig}
        >
          <Form.Item
            name="systemName"
            label="系统名称"
            rules={[{ required: true, message: '请输入系统名称' }]}
          >
            <Input placeholder="请输入系统名称" />
          </Form.Item>

          <Form.Item
            name="systemLogo"
            label="系统Logo"
            rules={[{ required: true, message: '请输入系统Logo地址' }]}
          >
            <Input placeholder="请输入系统Logo地址" />
          </Form.Item>

          <Form.Item
            name="companyName"
            label="公司名称"
            rules={[{ required: true, message: '请输入公司名称' }]}
          >
            <Input placeholder="请输入公司名称" />
          </Form.Item>

          <Form.Item
            name="adminEmail"
            label="管理员邮箱"
            rules={[
              { required: true, message: '请输入管理员邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入管理员邮箱" />
          </Form.Item>

          <Form.Item
            name="technicalSupport"
            label="技术支持信息"
            rules={[{ required: true, message: '请输入技术支持信息' }]}
          >
            <Input placeholder="请输入技术支持信息" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleBasicSave}>
              保存配置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SystemConfig;