// 产品名称到ID的映射
export const getProductId = (productName: string): string => {
  const productMap: Record<string, string> = {
    '隔爆型三相异步电动机': '1',
    '防爆显示控制终端': '2', 
    '防爆空调机': '3',
    '防爆摄像仪': '4',
    '防爆扬声器': '5',
    '防爆话站': '6',
    '防爆网桥': '7'
  };
  return productMap[productName] || '1';
};

// 根据班组名称获取班组ID
export const getTeamId = (teamName: string): string => {
  const teamMap: { [key: string]: string } = {
    '隔爆组': '1',
    '监控组': '2',
    '空调组': '3', 
    '技术组': '4',
    '生产组': '5',
    '钣金组': '6',
    '管理组': '7',
    '触摸屏组': '8',
    '储能组': '9',
    '通讯电热组': '10'
  };
  return teamMap[teamName] || '1';
};

// 根据业务员姓名获取业务员ID
export const getSalespersonId = (salespersonName: string): string => {
  const salespersonMap: { [key: string]: string } = {
    '张三': '1',
    '李四': '2',
    '王五': '3',
    '孙七': '4',
    '赵六': '5',
    '钱八': '6',
    '周九': '7',
    '吴十': '8',
    '郑一': '9',
    '冯二': '10'
  };
  return salespersonMap[salespersonName] || '1';
};

// 根据合同编号获取合同ID
export const getContractId = (contractCode: string): string => {
  const contractMap: { [key: string]: string } = {
    'HT2024001': '1',
    'HT2024002': '2',
    'HT2024003': '3',
    'HT2024004': '4',
    'HT2024005': '5',
    'HT2023015': '6',
    'HT2023008': '7',
    'HT2023028': '8',
    'QT2024005': '9',
    'QT2024003': '10'
  };
  return contractMap[contractCode] || '1';
};

// 根据客户名称获取客户ID
export const getCustomerId = (customerName: string): string => {
  const customerMap: { [key: string]: string } = {
    '北京央企集团': '1',
    '深圳创新科技集团': '2',
    '上海智能制造龙头': '3',
    '广州汽车制造巨头': '4',
    '天津重工设备': '5',
    '西安电子科技': '6',
    '成都精密仪器': '7',
    '武汉光电技术': '8',
    '长沙智能装备': '9',
    '杭州新材料有限公司': '10',
    '北京科技有限公司': '11',
    '天津智能设备厂': '12',
    '河北重工集团': '13',
    '上海智能制造公司': '14',
    '深圳创新科技公司': '15',
    '广州汽车零部件公司': '16'
  };
  return customerMap[customerName] || '1';
}; 