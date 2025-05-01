import { useState, Suspense, useEffect } from 'react';
import { Layout, Menu, Spin, Button, Space, Drawer, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  DatabaseOutlined,
  ApiOutlined,
  RobotOutlined,
  SettingOutlined,
  UserOutlined,
  BookOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  AuditOutlined,
  CompassOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import EnterpriseDiagnosis from '@/components/EnterpriseDiagnosis';
import GuideHelper from '@/components/GuideHelper';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: 'data',
    icon: <DatabaseOutlined />,
    label: '数据管理',
    className: 'ant-menu-submenu-data',
    children: [
      { key: 'data-source', label: '数据源管理' },
      { key: 'data-mapping', label: '数据映射配置' },
      { key: 'data-template', label: '线下数据模板' },
      { key: 'data-quality', label: '数据质量' },
    ],
  },
  {
    key: 'knowledge',
    icon: <BookOutlined />,
    label: '知识管理',
    children: [
      { key: 'doc-manage', label: '文档管理' },
      { key: 'faq-manage', label: 'FAQ管理' },
    ],
  },
  {
    key: 'analysis',
    icon: <BarChartOutlined />,
    label: '智能分析中心',
    className: 'ant-menu-submenu-analysis',
    children: [
      { key: 'analysis-report', label: '分析报告' },
      { key: 'agent/market', label: 'Agent市场' },
    ],
  },
  {
    key: 'alert',
    icon: <AuditOutlined />,
    label: '智能告警中心',
    children: [
      { key: 'alert/overview', label: '告警概览' },
      { key: 'alert/list', label: '告警列表' },
      { key: 'alert/market', label: 'Agent市场' },
    ],
  },
  {
    key: 'prediction',
    icon: <CompassOutlined />,
    label: '智能预测中心',
    children: [
      { key: 'prediction/reports', label: '预测报告' },
      { key: 'prediction/market', label: 'Agent市场' },
    ],
  },
  {
    key: 'report-center',
    icon: <BarChartOutlined />,
    label: '报表中心',
  },
  {
    key: 'help',
    icon: <QuestionCircleOutlined />,
    label: '帮助中心',
    children: [
      { key: 'help', label: '帮助中心首页' },
      { key: 'help/guide', label: '使用指南' },
      { key: 'help/faq', label: '常见问题' },
      { key: 'help/videos', label: '视频教程' },
      { key: 'help/contact', label: '联系支持' },
    ],
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统设置',
    children: [
      { key: 'system/user-manage', label: '用户管理' },
      { key: 'system/role-manage', label: '角色管理' },
      { key: 'system/system-config', label: '系统配置' },
    ],
  },
];

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [diagnosisVisible, setDiagnosisVisible] = useState(false);
  const [guideVisible, setGuideVisible] = useState(false);
  // 固定的最近访问功能模块
  const recentItems = [
    { key: 'dashboard', label: '仪表盘' },
    { key: 'data-source', label: '数据源管理' },
    { key: 'knowledge-base', label: '知识库' },
    { key: 'analysis-report', label: '分析报告' },
    { key: 'alert/overview', label: '告警概览' }
  ];

  // 递归查找菜单项
  const findMenuItem = (key: string, items: MenuItem[]): MenuItem | null => {
    for (const item of items) {
      if (!item) continue;
      if (item.key === key) return item;
      if ('children' in item && item.children) {
        const found = findMenuItem(key, item.children as MenuItem[]);
        if (found) return found;
      }
    }
    return null;
  };
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: '0 24px', 
        background: '#fff', 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 500,
          color: '#000000e0'
        }}>
          企业大脑服务平台
        </div>
        <div style={{ marginLeft: '24px', display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#8c8c8c', fontSize: '14px', marginRight: '12px' }}>
            <HistoryOutlined style={{ marginRight: '4px' }} />
            最近访问
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '600px', overflow: 'hidden' }}>
            {recentItems.map(item => (
              <Button
                key={item.key}
                icon={findMenuItem(item.key, menuItems)?.icon}
                onClick={() => navigate(`/${item.key}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  height: '32px',
                  background: '#f5f5f5',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#595959',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <Space>
          <Button
            type="primary"
            icon={<AuditOutlined />}
            onClick={() => setDiagnosisVisible(true)}
            className="ant-btn-diagnosis"
          >
            企业诊断
          </Button>
          <Button
            icon={<CompassOutlined />}
            onClick={() => setGuideVisible(true)}
            className="ant-btn-guide"
          >
            使用指引
          </Button>

          <UserOutlined style={{ fontSize: '16px', cursor: 'pointer' }} />
        </Space>
      </Header>
      <Layout>
        <Sider 
          width={220} 
          collapsible 
          collapsed={collapsed} 
          onCollapse={setCollapsed}
          style={{ background: '#fff' }}
        >
          <Menu
            className="main-menu"
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
            borderRadius: 4,
          }}>
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>

      {/* 企业诊断弹窗 */}
      <EnterpriseDiagnosis
        visible={diagnosisVisible}
        onClose={() => setDiagnosisVisible(false)}
      />

      {/* 使用指引 */}
      <GuideHelper
        type="tour"
        pageKey="dashboard"
        visible={guideVisible}
        onClose={() => setGuideVisible(false)}
      />


    </Layout>
  );
};

export default RootLayout;