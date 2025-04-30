import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    fontSize: 14,
    borderRadius: 4,
    wireframe: true,
  },
  components: {
    Layout: {
      bodyBg: '#f5f5f5',
      headerBg: '#fff',
      siderBg: '#fff',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#e6f4ff',
      itemSelectedColor: '#1677ff',
    },
    Card: {
      paddingLG: 24,
    },
    Form: {
      marginLG: 24,
    },
    Table: {
      headerBg: '#fafafa',
    },
  },
};