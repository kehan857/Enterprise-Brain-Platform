import React from 'react';
import { FloatButton, Badge, Tooltip } from 'antd';
import { RobotOutlined, MessageOutlined } from '@ant-design/icons';
import { useGlobalAIAssistant } from './GlobalAIAssistantProvider';

interface FloatingButtonProps {
  unreadCount?: number;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ unreadCount = 0 }) => {
  const { toggleAssistant } = useGlobalAIAssistant();
  return (
    <Badge count={unreadCount} offset={[-5, 5]}>
      <FloatButton
        icon={<RobotOutlined />}
        type="primary"
        style={{
          right: 24,
          bottom: 24,
          width: 48,
          height: 48,
        }}
        onClick={toggleAssistant}
        tooltip={<div>智能助手</div>}
      />
    </Badge>
  );
};

export default FloatingButton;