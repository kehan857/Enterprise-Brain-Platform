import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, Select, InputNumber, Tabs, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface BasicConfig {
  systemName: string;
  systemLogo: string;
  companyName: string;
  adminEmail: string;
  technicalSupport: string;
}

interface NotificationConfig {
  emailNotification: boolean;
  smsNotification: boolean;
  wechatNotification: boolean;
  emailServer: string;
  emailPort: number;
  emailAccount: string;
  smsProvider: string;
  smsAppKey: string;
  wechatAppId: string;
}

interface SystemParamsConfig {
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiration: number;
  dataRetentionDays: number;
  allowedFileTypes: string[];
  maxFileSize: number;
  enableAuditLog: boolean;
  enableDataBackup: boolean;
}

const SystemConfig: React.FC = () => {
  // 表单实例
  const [basicForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [paramsForm] = Form.useForm();

  // 初始配置数据
  const [basicConfig] = useState<BasicConfig>({
    systemName: '企业大脑服务平台',
    systemLogo: 'https://example.com/logo.png',
    companyName: '天云聚合网络科技有限公司',
    adminEmail: 'admin@example.com',
    technicalSupport: '技术支持热线：400-888-8888',
  });

  const [notificationConfig] = useState<NotificationConfig>({
    emailNotification: true,
    smsNotification: false,
    wechatNotification: true,
    emailServer: 'smtp.example.com',
    emailPort: 465,
    emailAccount: 'notification@example.com',
    smsProvider: 'aliyun',
    smsAppKey: '******',
    wechatAppId: 'wx******',
  });

  const [systemParamsConfig] = useState<SystemParamsConfig>({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiration: 90,
    dataRetentionDays: 180,
    allowedFileTypes: ['.jpg', '.png', '.pdf', '.doc', '.docx'],
    maxFileSize: 10,
    enableAuditLog: true,
    enableDataBackup: true,
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

  // 处理通知配置保存
  const handleNotificationSave = async () => {
    try {
      const values = await notificationForm.validateFields();
      console.log('通知配置:', values);
      message.success('通知配置保存成功');
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 处理系统参数保存
  const handleParamsSave = async () => {
    try {
      const values = await paramsForm.validateFields();
      console.log('系统参数:', values);
      message.success('系统参数保存成功');
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <div className="system-config-container">
      <Tabs defaultActiveKey="basic">
        {/* 基础信息配置 */}
        <TabPane tab="基础信息配置" key="basic">
          <Card>
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
        </TabPane>

        {/* 消息通知配置 */}
        <TabPane tab="消息通知配置" key="notification">
          <Card>
            <Form
              form={notificationForm}
              layout="vertical"
              initialValues={notificationConfig}
            >
              <Form.Item
                name="emailNotification"
                label="邮件通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="smsNotification"
                label="短信通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="wechatNotification"
                label="微信通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="emailServer"
                label="邮件服务器"
                rules={[{ required: true, message: '请输入邮件服务器地址' }]}
              >
                <Input placeholder="请输入邮件服务器地址" />
              </Form.Item>

              <Form.Item
                name="emailPort"
                label="邮件服务器端口"
                rules={[{ required: true, message: '请输入邮件服务器端口' }]}
              >
                <InputNumber min={1} max={65535} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="emailAccount"
                label="邮件账号"
                rules={[{ required: true, message: '请输入邮件账号' }]}
              >
                <Input placeholder="请输入邮件账号" />
              </Form.Item>

              <Form.Item
                name="smsProvider"
                label="短信服务商"
                rules={[{ required: true, message: '请选择短信服务商' }]}
              >
                <Select>
                  <Select.Option value="aliyun">阿里云</Select.Option>
                  <Select.Option value="tencent">腾讯云</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="smsAppKey"
                label="短信AppKey"
                rules={[{ required: true, message: '请输入短信AppKey' }]}
              >
                <Input.Password placeholder="请输入短信AppKey" />
              </Form.Item>

              <Form.Item
                name="wechatAppId"
                label="微信AppID"
                rules={[{ required: true, message: '请输入微信AppID' }]}
              >
                <Input.Password placeholder="请输入微信AppID" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleNotificationSave}>
                  保存配置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        {/* 系统参数设置 */}
        <TabPane tab="系统参数设置" key="params">
          <Card>
            <Form
              form={paramsForm}
              layout="vertical"
              initialValues={systemParamsConfig}
            >
              <Form.Item
                name="sessionTimeout"
                label="会话超时时间（分钟）"
                rules={[{ required: true, message: '请输入会话超时时间' }]}
              >
                <InputNumber min={5} max={120} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="maxLoginAttempts"
                label="最大登录尝试次数"
                rules={[{ required: true, message: '请输入最大登录尝试次数' }]}
              >
                <InputNumber min={3} max={10} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="passwordExpiration"
                label="密码过期天数"
                rules={[{ required: true, message: '请输入密码过期天数' }]}
              >
                <InputNumber min={30} max={180} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="dataRetentionDays"
                label="数据保留天数"
                rules={[{ required: true, message: '请输入数据保留天数' }]}
              >
                <InputNumber min={30} max={365} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="allowedFileTypes"
                label="允许上传的文件类型"
                rules={[{ required: true, message: '请选择允许上传的文件类型' }]}
              >
                <Select mode="tags" placeholder="请输入允许上传的文件类型">
                  <Select.Option value=".jpg">.jpg</Select.Option>
                  <Select.Option value=".png">.png</Select.Option>
                  <Select.Option value=".pdf">.pdf</Select.Option>
                  <Select.Option value=".doc">.doc</Select.Option>
                  <Select.Option value=".docx">.docx</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="maxFileSize"
                label="最大文件大小（MB）"
                rules={[{ required: true, message: '请输入最大文件大小' }]}
              >
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="enableAuditLog"
                label="启用审计日志"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="enableDataBackup"
                label="启用数据备份"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item>
                <Button type="primary" icon={<SaveOutlined />} onClick={handleParamsSave}>
                  保存配置
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SystemConfig;