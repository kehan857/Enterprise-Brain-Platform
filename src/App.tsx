import { ConfigProvider, Spin } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { Suspense } from 'react';
import RootLayout from './layouts/RootLayout';
import { themeConfig } from './configs/theme';
import { routes } from './router';
import { GlobalAIAssistantProvider } from './components/AIAssistant/GlobalAIAssistantProvider';
import FloatingButton from './components/AIAssistant/FloatingButton';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: routes
  }
]);

function App() {
  return (
    <GlobalAIAssistantProvider>
      <ConfigProvider theme={themeConfig} locale={zhCN}>
        <Suspense fallback={
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin size="large" tip="加载中..." />
          </div>
        }>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
      <FloatingButton />
    </GlobalAIAssistantProvider>
  );
}

export default App;