import React from 'react';
import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const UserGuide: React.FC = () => {
  return (
    <div className="user-guide-container" style={{ padding: '24px' }}>
      <Title level={2}>企业大脑平台使用指南</Title>
      <Paragraph>
        欢迎使用企业大脑平台，以下是平台概览：
      </Paragraph>
      <Image 
        src="/guides/platform-overview.png" 
        alt="平台概览"
        style={{ maxWidth: '100%' }}
        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAH"
      />
      <Paragraph style={{ marginTop: '16px' }}>
        平台提供了智能分析、预测和告警等功能，帮助企业更好地管理数据与知识。
      </Paragraph>
    </div>
  );
};

export default UserGuide;