import React, { useState } from 'react';
import { Card, Row, Col, Input, Typography, Breadcrumb, Space, Tag, Tabs, Avatar, List, Button } from 'antd';
import { 
  HomeOutlined, 
  VideoCameraOutlined, 
  SearchOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
  EyeOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// 视频教程数据
const videoTutorials = [
  {
    id: '1',
    title: '企业大脑平台功能概览',
    description: '全面介绍企业大脑服务平台的核心功能和使用场景，适合新用户快速了解平台能力。',
    thumbnailUrl: '/tutorials/platform-overview-thumbnail.jpg',
    videoUrl: '/tutorials/platform-overview.mp4',
    duration: '10:25',
    category: 'overview',
    instructor: '张老师',
    views: 1248,
    date: '2024-04-01',
    tags: ['入门', '概览']
  },
  {
    id: '2',
    title: '如何配置数据源连接',
    description: '详细讲解各类数据源的接入方法，包括数据库、API、文件等不同类型数据源的配置步骤。',
    thumbnailUrl: '/tutorials/data-source-connection-thumbnail.jpg',
    videoUrl: '/tutorials/data-source-connection.mp4',
    duration: '15:30',
    category: 'data',
    instructor: '李工程师',
    views: 856,
    date: '2024-04-05',
    tags: ['数据源', '配置']
  },
  {
    id: '3',
    title: 'Agent市场使用指南',
    description: '学习如何在Agent市场中搜索、筛选、启用智能体，以及自定义智能体的配置参数。',
    thumbnailUrl: '/tutorials/agent-market-thumbnail.jpg',
    videoUrl: '/tutorials/agent-market.mp4',
    duration: '12:15',
    category: 'agent',
    instructor: '王老师',
    views: 732,
    date: '2024-04-10',
    tags: ['Agent', '智能体', '市场']
  },
  {
    id: '4',
    title: '智能告警规则配置',
    description: '学习如何创建和管理智能告警规则，设置告警条件、通知方式和处理流程。',
    thumbnailUrl: '/tutorials/alert-rules-thumbnail.jpg',
    videoUrl: '/tutorials/alert-rules.mp4',
    duration: '18:45',
    category: 'alert',
    instructor: '赵工程师',
    views: 625,
    date: '2024-04-12',
    tags: ['告警', '规则配置']
  },
  {
    id: '5',
    title: '数据分析报告解读',
    description: '讲解如何理解和利用系统生成的数据分析报告，挖掘数据价值，辅助决策。',
    thumbnailUrl: '/tutorials/report-analysis-thumbnail.jpg',
    videoUrl: '/tutorials/report-analysis.mp4',
    duration: '20:10',
    category: 'analysis',
    instructor: '钱老师',
    views: 547,
    date: '2024-04-15',
    tags: ['报告', '分析', '解读']
  },
  {
    id: '6',
    title: '企业知识库构建指南',
    description: '详解如何上传、管理和优化企业文档，构建高质量的企业知识库。',
    thumbnailUrl: '/tutorials/knowledge-base-thumbnail.jpg',
    videoUrl: '/tutorials/knowledge-base.mp4',
    duration: '16:30',
    category: 'knowledge',
    instructor: '孙工程师',
    views: 489,
    date: '2024-04-18',
    tags: ['知识库', '文档管理']
  }
];

// 视频分类
const videoCategories = [
  { key: 'all', tab: '全部' },
  { key: 'overview', tab: '平台概览' },
  { key: 'data', tab: '数据管理' },
  { key: 'knowledge', tab: '知识管理' },
  { key: 'agent', tab: 'Agent应用' },
  { key: 'alert', tab: '智能告警' },
  { key: 'prediction', tab: '智能预测' },
  { key: 'analysis', tab: '数据分析' }
];

const VideoTutorials: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // 根据分类和搜索过滤视频
  const filteredVideos = videoTutorials.filter(video => {
    const matchesCategory = activeTab === 'all' || video.category === activeTab;
    const matchesSearch = searchText === '' || 
      video.title.toLowerCase().includes(searchText.toLowerCase()) || 
      video.description.toLowerCase().includes(searchText.toLowerCase()) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleVideoClick = (videoId: string) => {
    // 在实际应用中，这里可以导航到视频播放页面或打开视频播放弹窗
    console.log(`播放视频: ${videoId}`);
  };

  // 用于图片加载失败时的占位图
  const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmls";

  return (
    <div className="video-tutorials">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/help">
          帮助中心
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Space>
            <VideoCameraOutlined />
            视频教程
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card bordered={false}>
        <Title level={3}>视频教程</Title>
        <Paragraph>
          通过观看以下视频教程，您可以直观地了解企业大脑服务平台的各项功能和操作方法。
        </Paragraph>

        <div className="search-bar" style={{ marginBottom: 24 }}>
          <Input
            placeholder="搜索视频教程..."
            prefix={<SearchOutlined />}
            allowClear
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ maxWidth: 400 }}
          />
        </div>

        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          {videoCategories.map(category => (
            <TabPane tab={category.tab} key={category.key}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={filteredVideos}
                renderItem={video => (
                  <List.Item
                    key={video.id}
                    actions={[
                      <Space key="date"><CalendarOutlined /> {video.date}</Space>,
                      <Space key="views"><EyeOutlined /> {video.views} 次观看</Space>,
                      <Space key="instructor"><UserOutlined /> {video.instructor}</Space>,
                      ...video.tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)
                    ]}
                    extra={
                      <div style={{ position: 'relative' }}>
                        <img
                          width={272}
                          alt={video.title}
                          src={video.thumbnailUrl}
                          style={{ objectFit: 'cover', height: 153 }}
                          onError={(e) => {
                            e.currentTarget.src = placeholderImage;
                          }}
                        />
                        <Button 
                          type="primary" 
                          shape="circle" 
                          icon={<PlayCircleOutlined />} 
                          size="large"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.9
                          }}
                          onClick={() => handleVideoClick(video.id)}
                        />
                        <div style={{ 
                          position: 'absolute', 
                          bottom: 5, 
                          right: 5, 
                          background: 'rgba(0,0,0,0.6)', 
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: 4
                        }}>
                          {video.duration}
                        </div>
                      </div>
                    }
                  >
                    <List.Item.Meta
                      title={<a onClick={() => handleVideoClick(video.id)}>{video.title}</a>}
                      description={video.description}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default VideoTutorials;