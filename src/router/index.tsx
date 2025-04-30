import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const DataSource = lazy(() => import('@/pages/data/source'));
const DataMapping = lazy(() => import('@/pages/data/mapping'));
const DataTemplate = lazy(() => import('@/pages/data/template'));
const DataQuality = lazy(() => import('@/pages/data/quality'));
const DocManage = lazy(() => import('@/pages/knowledge/doc'));
const KnowledgeBase = lazy(() => import('@/pages/knowledge/base'));
const FaqManage = lazy(() => import('@/pages/knowledge/faq'));

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

const ReportPreview = lazy(() => import('@/pages/analysis/report-preview'));

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
    path: 'report-preview/:reportId',
    element: <ReportPreview />
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
    element: <DataTemplate />
  },
  {
    path: 'data-quality',
    element: <DataQuality />
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
  }
];