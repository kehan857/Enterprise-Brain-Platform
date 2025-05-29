import { useState, Suspense, useEffect } from 'react';
import { Layout, Menu, Spin, Button, Space, Drawer, Dropdown, Tag } from 'antd';
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
  LinkOutlined,
  FlagOutlined,
  PieChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  DownloadOutlined
} from '@ant-design/icons';
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
      { 
        key: 'data-guide', 
        label: '数据指引',
      },
      { 
        key: 'data-source-new', 
        label: '数据源',
      },
      { 
        key: 'data-collection-new', 
        label: '数据采集',
      },
      { 
        key: 'data-collection', 
        label: '数据治理',
      }
    ],
  },
  {
    key: 'data-query',
    icon: <DatabaseOutlined />,
    label: '数据查询',
  },
  {
    key: 'data-query-2',
    icon: <BarChartOutlined />,
    label: '数据查询2',
    children: [
      { key: 'marketing-report', label: '营销数据' },
      { key: 'customer-data', label: '客户数据' },
      { key: 'product-data', label: '产品数据' },
      { key: 'sales-data', label: '销售数据' },
    ],
  },
  {
    key: 'data-query-3',
    icon: <LineChartOutlined />,
    label: '数据查询3',
    children: [
      { key: 'marketing-analytics', label: '营销数据板块' },
    ],
  },
  {
    key: 'indicator',
    icon: <PieChartOutlined />,
    label: '指标管理',
    children: [
      { key: 'data-indicator', label: '标准数据指标' },
      { key: 'data-model', label: '标准数据模型' },
    ],
  },
  {
    key: 'target',
    icon: <AuditOutlined />,
    label: '目标管理',
    children: [
      { key: 'target/setting', label: '目标设置' },
      { key: 'target/implementation', label: '目标实施' },
      { key: 'target/progress', label: '目标进度' },
    ],
  },
  {
    key: 'analysis',
    icon: <BarChartOutlined />,
    label: '智能分析中心',
    className: 'ant-menu-submenu-analysis',
    children: [
      { key: 'analysis-report', label: '报表中心' },
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
    key: 'dashboard-center',
    icon: <FundOutlined />,
    label: '智能看板中心',
    children: [
      { key: 'dashboard-center/business', label: '经营看板' },
      { key: 'dashboard-center/marketing', label: '营销看板' },
      { key: 'dashboard-center/production', label: '生产看板' },
      { key: 'dashboard-center/quality', label: '质控看板' },
      { key: 'dashboard-center/research', label: '研发看板' },
      { key: 'dashboard-center/finance', label: '财务看板' },
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
    key: 'project',
    icon: <FlagOutlined />,
    label: '项目管理',
    children: [
      { key: 'project/setting', label: '项目设置' },
      { key: 'project/milestone', label: '项目里程碑' },
      { key: 'project/task', label: '任务管理' },
    ],
  },
  {
    key: 'report-center',
    icon: <DownloadOutlined />,
    label: '下载管理',
  },
  {
    key: 'help',
    icon: <QuestionCircleOutlined />,
    label: '帮助中心',
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
  const findMenuItem = (key: string, items: MenuItem[]): { icon?: React.ReactNode; label?: React.ReactNode } | null => {
    for (const item of items) {
      if (!item) continue;
      if (item.key === key) return item as { icon?: React.ReactNode; label?: React.ReactNode };
      if ('children' in item && item.children) {
        const found = findMenuItem(key, item.children as MenuItem[]);
        if (found) return found;
      }
    }
    return null;
  };
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    // 处理外部链接跳转
    if (key === 'data-source-new') {
      window.open('http://192.168.1.232:12345/dolphinscheduler/ui/login', '_blank');
      return;
    }
    if (key === 'data-collection-new') {
      window.open('https://collect.ex12580.net/login?phone=15737111214', '_blank');
      return;
    }
    if (key === 'data-collection') {
      window.open('https://dc.ex12580.net/#/dashboard', '_blank');
      return;
    }

    // 处理内部路由导航
    if (key.includes('/')) {
      navigate(`/${key}`);
    } else {
      // 处理单级路由
      const routeMap: Record<string, string> = {
        'dashboard': '/dashboard',
        'data-guide': '/data-guide',
        'data-query': '/data-query',
        'marketing-report': '/marketing-report',
        'customer-data': '/customer-data',
        'product-data': '/product-data',
        'sales-data': '/sales-data',
        'marketing-analytics': '/marketing-analytics',
        'data-indicator': '/data-indicator',
        'data-model': '/data-model',
        'target-setting': '/target-setting',
        'target-tracking': '/target-tracking',
        'analysis-report': '/analysis-report',
        'agent/market': '/agent/market',
        'prediction/reports': '/prediction/reports',
        'prediction/market': '/prediction/market',
        'alert/overview': '/alert/overview',
        'alert/list': '/alert/list',
        'alert/market': '/alert/market',
        'dashboard-center/business': '/dashboard-center/business',
        'dashboard-center/marketing': '/dashboard-center/marketing',
        'dashboard-center/production': '/dashboard-center/production',
        'dashboard-center/quality': '/dashboard-center/quality',
        'dashboard-center/research': '/dashboard-center/research',
        'dashboard-center/finance': '/dashboard-center/finance',
        'report-center': '/report-center',
        'knowledge': '/knowledge',
        'doc-manage': '/doc-manage',
        'faq-manage': '/faq-manage',
        'project': '/project',
        'help': '/help'
      };

      const route = routeMap[key];
      if (route) {
        navigate(route);
      }
    }
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
            {recentItems.map(item => {
              const menuItem = findMenuItem(item.key, menuItems);
              return (
                <Button
                  key={item.key}
                  icon={menuItem?.icon}
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
              );
            })}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <Space>
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