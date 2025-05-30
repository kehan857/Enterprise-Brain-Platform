import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const DataSource = lazy(() => import('@/pages/data/source'));
const DataMapping = lazy(() => import('@/pages/data/mapping'));
const OfflineDataUpload = lazy(() => import('@/pages/data/template'));
const DataIndicator = lazy(() => import('@/pages/data/indicator'));
const DataModel = lazy(() => import('@/pages/data/model'));
const DataGuide = lazy(() => import('@/pages/data/guide'));
const DataQuery = lazy(() => import('@/pages/data/query'));
const DocManage = lazy(() => import('@/pages/knowledge/doc'));
const KnowledgeBase = lazy(() => import('@/pages/knowledge/base'));
const FaqManage = lazy(() => import('@/pages/knowledge/faq'));

// 目标管理
const TargetManagement = lazy(() => import('@/pages/target'));
const TargetSetting = lazy(() => import('@/pages/target/setting'));
const TargetImplementation = lazy(() => import('@/pages/target/implementation'));
const TargetProgress = lazy(() => import('@/pages/target/progress'));

// 项目管理
const ProjectManagement = lazy(() => import('@/pages/project'));
const ProjectSetting = lazy(() => import('@/pages/project/setting'));
const ProjectMilestone = lazy(() => import('@/pages/project/milestone'));
const ProjectTask = lazy(() => import('@/pages/project/task'));

// 智能看板中心
const DashboardCenter = lazy(() => import('@/pages/dashboard-center'));
const BusinessDashboard = lazy(() => import('@/pages/dashboard-center/business'));
const MarketingDashboard = lazy(() => import('@/pages/dashboard-center/marketing'));
const ProductionDashboard = lazy(() => import('@/pages/dashboard-center/production'));
const QualityDashboard = lazy(() => import('@/pages/dashboard-center/quality'));
const ResearchDashboard = lazy(() => import('@/pages/dashboard-center/research'));
const FinanceDashboard = lazy(() => import('@/pages/dashboard-center/finance'));

const DataAgent = lazy(() => import('@/pages/analysis/data-agent'));
const AnalysisReport = lazy(() => import('@/pages/analysis/report'));
const ReportCenter = lazy(() => import('@/pages/analysis/report-center'));
const AgentMarket = lazy(() => import('@/pages/agent/market'));
const AlertOverview = lazy(() => import('@/pages/alert/AlertOverview'));
const AlertList = lazy(() => import('@/pages/alert/list'));
const AlertAgentMarket = lazy(() => import('@/pages/alert/AgentMarket'));
const PredictionReports = lazy(() => import('@/pages/prediction/reports'));
const PredictionAgentMarket = lazy(() => import('@/pages/prediction/PredictionAgentMarket'));
const UserManage = lazy(() => import('@/pages/system/user-manage'));
const RoleManage = lazy(() => import('@/pages/system/role-manage'));
const SystemConfig = lazy(() => import('@/pages/system/system-config'));

const HelpCenter = lazy(() => import('@/pages/help/index'));
const HelpSearchResults = lazy(() => import('@/pages/help/search'));

const MarketingReport = lazy(() => import('@/pages/report/marketing-report'));
const CustomerData = lazy(() => import('@/pages/data/customer-data'));
const ProductData = lazy(() => import('@/pages/data/product-data'));
const SalesData = lazy(() => import('@/pages/data/sales-data'));
const MarketingAnalytics = lazy(() => import('@/pages/marketing/analytics'));
const CustomerOverview = lazy(() => import('@/pages/marketing/analytics/customer-overview'));
const ContractAnalysis = lazy(() => import('@/pages/marketing/analytics/contract-analysis'));
const NewCustomerAnalysis = lazy(() => import('@/pages/marketing/analytics/new-customer-analysis'));
const OldCustomerAnalysis = lazy(() => import('@/pages/marketing/analytics/old-customer-analysis'));
const BigCustomerAnalysis = lazy(() => import('@/pages/marketing/analytics/big-customer-analysis'));
const PotentialCustomerAnalysis = lazy(() => import('@/pages/marketing/analytics/potential-customer-analysis'));
const PaymentAnalysis = lazy(() => import('@/pages/marketing/analytics/payment-analysis'));
const ReceivablesAnalysis = lazy(() => import('@/pages/marketing/analytics/receivables-analysis'));

// 第三阶段：三级页面
const Customer360 = lazy(() => import('@/pages/customer/customer-360'));
const ContractDetail = lazy(() => import('@/pages/contract/contract-detail'));
const SalespersonDetail = lazy(() => import('@/pages/marketing/analytics/salesperson-detail'));

export const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="dashboard" replace />
  },
  {
    path: '*',
    element: <Navigate to="dashboard" replace />
  },
  {
    path: 'dashboard',
    element: <Dashboard />
  },
  {
    path: 'data-source',
    element: <DataSource />
  },
  {
    path: 'data-mapping',
    element: <DataMapping />
  },
  {
    path: 'data-template',
    element: <OfflineDataUpload />
  },
  {
    path: 'data-indicator',
    element: <DataIndicator />
  },
  {
    path: 'data-model',
    element: <DataModel />
  },
  {
    path: 'data-guide',
    element: <DataGuide />
  },
  {
    path: 'data-query',
    element: <DataQuery />
  },
  {
    path: 'doc-manage',
    element: <DocManage />
  },
  {
    path: 'knowledge-base',
    element: <KnowledgeBase />
  },
  {
    path: 'faq-manage',
    element: <FaqManage />
  },
  // 目标管理路由
  {
    path: 'target',
    element: <TargetManagement />,
    children: [
      {
        index: true,
        element: <Navigate to="setting" replace />
      },
      {
        path: 'setting',
        element: <TargetSetting />
      },
      {
        path: 'implementation',
        element: <TargetImplementation />
      },
      {
        path: 'progress',
        element: <TargetProgress />
      }
    ]
  },
  // 项目管理路由
  {
    path: 'project',
    element: <ProjectManagement />,
    children: [
      {
        index: true,
        element: <Navigate to="setting" replace />
      },
      {
        path: 'setting',
        element: <ProjectSetting />
      },
      {
        path: 'milestone',
        element: <ProjectMilestone />
      },
      {
        path: 'task',
        element: <ProjectTask />
      }
    ]
  },
  // 智能看板中心路由
  {
    path: 'dashboard-center',
    element: <DashboardCenter />,
    children: [
      {
        index: true,
        element: <></>
      },
      {
        path: 'business',
        element: <BusinessDashboard />
      },
      {
        path: 'business/:dashboardKey',
        element: <BusinessDashboard />
      },
      {
        path: 'marketing',
        element: <MarketingDashboard />
      },
      {
        path: 'marketing/:dashboardKey',
        element: <MarketingDashboard />
      },
      {
        path: 'production',
        element: <ProductionDashboard />
      },
      {
        path: 'production/:dashboardKey',
        element: <ProductionDashboard />
      },
      {
        path: 'quality',
        element: <QualityDashboard />
      },
      {
        path: 'quality/:dashboardKey',
        element: <QualityDashboard />
      },
      {
        path: 'research',
        element: <ResearchDashboard />
      },
      {
        path: 'research/:dashboardKey',
        element: <ResearchDashboard />
      },
      {
        path: 'finance',
        element: <FinanceDashboard />
      },
      {
        path: 'finance/:dashboardKey',
        element: <FinanceDashboard />
      }
    ]
  },
  {
    path: 'data-agent',
    element: <DataAgent />
  },
  {
    path: 'analysis-report',
    element: <AnalysisReport />
  },
  {
    path: 'report-center',
    element: <ReportCenter />
  },
  {
    path: 'agent/market',
    element: <AgentMarket />
  },
  {
    path: 'alert',
    children: [
      {
        path: 'overview',
        element: <AlertOverview />
      },
      {
        path: 'list',
        element: <AlertList />
      },
      {
        path: 'market',
        element: <AlertAgentMarket />
      }
    ]
  },
  {
    path: 'prediction',
    children: [
      {
        path: 'reports',
        element: <PredictionReports />
      },
      {
        path: 'market',
        element: <PredictionAgentMarket />
      }
    ]
  },
  {
    path: 'help',
    element: <HelpCenter />
  },
  {
    path: 'help/search',
    element: <HelpSearchResults />
  },
  {
    path: 'system',
    children: [
      {
        path: 'user-manage',
        element: <UserManage />
      },
      {
        path: 'role-manage',
        element: <RoleManage />
      },
      {
        path: 'system-config',
        element: <SystemConfig />
      }
    ]
  },
  {
    path: 'marketing-report',
    element: <MarketingReport />
  },
  {
    path: 'customer-data',
    element: <CustomerData />
  },
  {
    path: 'product-data',
    element: <ProductData />
  },
  {
    path: 'sales-data',
    element: <SalesData />
  },
  {
    path: 'marketing-analytics',
    element: <MarketingAnalytics />
  },
  {
    path: 'customer-overview',
    element: <CustomerOverview />
  },
  {
    path: 'contract-analysis',
    element: <ContractAnalysis />
  },
  {
    path: 'new-customer-analysis',
    element: <NewCustomerAnalysis />
  },
  {
    path: 'old-customer-analysis',
    element: <OldCustomerAnalysis />
  },
  {
    path: 'big-customer-analysis',
    element: <BigCustomerAnalysis />
  },
  {
    path: 'potential-customer-analysis',
    element: <PotentialCustomerAnalysis />
  },
  {
    path: 'payment-analysis',
    element: <PaymentAnalysis />
  },
  {
    path: 'receivables-analysis',
    element: <ReceivablesAnalysis />
  },
  // 第三阶段：三级页面路由
  {
    path: 'customer-360/:customerId',
    element: <Customer360 />
  },
  {
    path: 'contract-detail/:contractId',
    element: <ContractDetail />
  },
  {
    path: 'salesperson-detail/:salespersonId',
    element: <SalespersonDetail />
  }
];