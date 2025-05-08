import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Input, Button, Upload, Space, Avatar, List, Typography, Tag } from 'antd';
import type { UploadProps } from 'antd';
import {
  SendOutlined,
  UploadOutlined,
  RobotOutlined,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIAssistantProps {
  visible: boolean;
  onClose: () => void;
  industryType?: string; // 行业类型，用于加载对应的行业知识库
}

const { TextArea } = Input;
const { Text } = Typography;

const AIAssistant: React.FC<AIAssistantProps> = ({ visible, onClose, industryType = '' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 快捷问题列表
  const quickQuestions = [
    '如何提高我们产线的OEE？',
    '帮我解读这份上周的生产日报',
    '解释一下精益生产中的"看板管理"如何应用？',
    '近期有哪些新的供应链风险需要关注？'
  ];

  // 文件上传配置
  const uploadProps: UploadProps = {
    accept: '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg',
    showUploadList: false,
    beforeUpload: (file) => {
      // 这里可以处理文件上传逻辑
      console.log('Uploading file:', file.name);
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `[上传文件] ${file.name}`,
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
      // 模拟助手响应
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `我已收到文件 ${file.name}，正在分析文件内容...
1. 文件类型：${file.type}
2. 文件大小：${(file.size / 1024).toFixed(2)}KB
3. 上传时间：${new Date().toLocaleString()}

请稍等，我将尽快为您提供分析结果。`,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
      return false;
    },
  };

  // 处理发送消息
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsThinking(true);

    // 模拟助手响应
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `我是您的${industryType ? industryType : ''}智能助手，正在思考您的问题...

根据您的问题，我建议：
1. ...
2. ...
3. ...

需要了解更多详细信息吗？`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, response]);
      setIsThinking(false);
    }, 1500);
  };

  // 处理快捷问题点击
  const handleQuickQuestion = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <Drawer
      title={
        <Space>
          <RobotOutlined style={{ color: '#1677ff' }} />
          <span>{industryType ? `${industryType}智能助手` : '智能助手'}</span>
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      bodyStyle={{
        padding: '12px',
        height: 'calc(100vh - 90px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}
      mask={true}
      maskClosable={true}
      keyboard={true}
    >
      {/* 快捷功能区 */}
      <div style={{ 
        padding: '12px', 
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fafafa',
        borderRadius: '0',
        marginBottom: '8px'
      }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="secondary">快捷功能</Text>
          <Space wrap>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Space>
        </Space>
      </div>

      {/* 对话区域 */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {/* 消息列表区域 */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '12px'
          }}
        >
          {/* 引导性问题 */}
          {messages.length === 0 && (
            <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <Text type="secondary">您可以尝试以下问题：</Text>
              <List
                size="small"
                dataSource={quickQuestions}
                renderItem={(item) => (
                  <List.Item
                    style={{ cursor: 'pointer', padding: '8px 0' }}
                    onClick={() => handleQuickQuestion(item)}
                  >
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            </div>
          )}

          {/* 消息列表 */}
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: '16px',
                display: 'flex',
                flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Avatar
                icon={message.type === 'user' ? <UserOutlined /> : <RobotOutlined />}
                style={{
                  backgroundColor: message.type === 'user' ? '#1890ff' : '#52c41a',
                  marginRight: message.type === 'user' ? 0 : '8px',
                  marginLeft: message.type === 'user' ? '8px' : 0,
                }}
              />
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px',
                  backgroundColor: message.type === 'user' ? '#1890ff' : '#fff',
                  borderRadius: '8px',
                  color: message.type === 'user' ? '#fff' : 'inherit',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <Text
                  style={{
                    color: message.type === 'user' ? '#fff' : 'inherit',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {message.content}
                </Text>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          bottom: 0
        }}>
          <Space.Compact style={{ width: '100%' }} size="large">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入您的问题..."
              autoSize={{ minRows: 1, maxRows: 3 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={handleSend}
              loading={isThinking}
            />
          </Space.Compact>
        </div>
      </div>
    </Drawer>
  );
};

export default AIAssistant;