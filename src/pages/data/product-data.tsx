import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Input,
  Select, 
  DatePicker, 
  Button, 
  Space,
  Table,
  Tag,
  List,
  Divider
} from 'antd';
import {
  ShoppingOutlined,
  BoxPlotOutlined,
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  BarChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { type Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

// 产品维度统计数据
const productCategories = [
  { key: 'total-products', label: '产品总数', count: 458, color: '#1890ff', unit: '款' },
  { key: 'active-products', label: '在售产品', count: 378, color: '#52c41a', unit: '款' },
  { key: 'hot-products', label: '热销产品', count: 89, color: '#722ed1', unit: '款' },
  { key: 'new-products', label: '新品数量', count: 45, color: '#faad14', unit: '款' },
  { key: 'inventory-shortage', label: '库存不足', count: 23, color: '#eb2f96', unit: '款' },
  { key: 'total-revenue', label: '产品总营收', count: 98750000, color: '#f5222d', unit: '元', isAmount: true },
];

// 产品洞察数据
const productInsights = [
  {
    title: '热销产品带动增长',
    description: '智能控制器系列产品销量环比增长35.6%，成为营收增长主要驱动力',
    type: 'success'
  },
  {
    title: '库存管理需要优化',
    description: '23款产品库存不足，可能影响正常销售，建议及时补充库存',
    type: 'warning'
  },
  {
    title: '新产品市场表现良好',
    description: '本月新上市的5款产品平均销售转化率达22.8%，高于预期',
    type: 'success'
  }
];

// 产品明细数据
const productDetailData = [
  {
    key: '1',
    id: 'PD20250001',
    productName: '智能工业控制器V3.0',
    category: '工业控制',
    brand: '华控科技',
    model: 'HC-V3.0',
    status: '在售',
    price: 15680,
    cost: 8900,
    profit: 6780,
    stock: 156,
    salesVolume: 234,
    revenue: 3669120,
    supplier: '深圳华控电子',
    createTime: '2024-03-15 10:30',
    updateTime: '2025-01-30 14:20',
    productManager: '李工程师'
  },
  {
    key: '2',
    id: 'PD20250002',
    productName: '智能传感器模块Pro',
    category: '传感器设备',
    brand: '感知科技',
    model: 'GZ-Pro-2024',
    status: '在售',
    price: 8950,
    cost: 5200,
    profit: 3750,
    stock: 89,
    salesVolume: 456,
    revenue: 4081200,
    supplier: '北京感知科技',
    createTime: '2024-01-20 14:20',
    updateTime: '2025-01-29 16:45',
    productManager: '张工程师'
  },
  {
    key: '3',
    id: 'PD20250003',
    productName: '工业自动化解决方案',
    category: '系统集成',
    brand: '智造科技',
    model: 'ZZ-AUTO-2024',
    status: '在售',
    price: 45600,
    cost: 28900,
    profit: 16700,
    stock: 23,
    salesVolume: 78,
    revenue: 3556800,
    supplier: '上海智造系统',
    createTime: '2024-02-10 09:15',
    updateTime: '2025-01-28 11:30',
    productManager: '王工程师'
  },
  {
    key: '4',
    id: 'PD20250004',
    productName: '数据采集终端',
    category: '数据采集',
    brand: '数联科技',
    model: 'SL-DT-2024',
    status: '在售',
    price: 12800,
    cost: 7600,
    profit: 5200,
    stock: 67,
    salesVolume: 189,
    revenue: 2419200,
    supplier: '广州数联电子',
    createTime: '2024-05-18 11:30',
    updateTime: '2025-01-27 15:50',
    productManager: '赵工程师'
  },
  {
    key: '5',
    id: 'PD20250005',
    productName: '智能配电柜系统',
    category: '电力设备',
    brand: '电控科技',
    model: 'DK-PDC-2024',
    status: '在售',
    price: 28500,
    cost: 18900,
    profit: 9600,
    stock: 34,
    salesVolume: 134,
    revenue: 3819000,
    supplier: '天津电控设备',
    createTime: '2024-04-22 10:15',
    updateTime: '2025-01-26 09:45',
    productManager: '孙工程师'
  },
  {
    key: '6',
    id: 'PD20250006',
    productName: '工业以太网交换机',
    category: '网络设备',
    brand: '网通科技',
    model: 'WT-IE-2024',
    status: '在售',
    price: 6750,
    cost: 3800,
    profit: 2950,
    stock: 198,
    salesVolume: 567,
    revenue: 3829250,
    supplier: '杭州网通设备',
    createTime: '2024-06-05 11:20',
    updateTime: '2025-01-25 16:10',
    productManager: '周工程师'
  },
  {
    key: '7',
    id: 'PD20250007',
    productName: '机器视觉检测系统',
    category: '视觉检测',
    brand: '视觉科技',
    model: 'SJ-MV-2024',
    status: '在售',
    price: 78900,
    cost: 52600,
    profit: 26300,
    stock: 12,
    salesVolume: 45,
    revenue: 3550500,
    supplier: '成都视觉系统',
    createTime: '2024-07-10 09:15',
    updateTime: '2025-01-24 12:15',
    productManager: '吴工程师'
  },
  {
    key: '8',
    id: 'PD20250008',
    productName: '工业无线通信模块',
    category: '通信设备',
    brand: '无线科技',
    model: 'WX-WC-2024',
    status: '在售',
    price: 4560,
    cost: 2900,
    profit: 1660,
    stock: 245,
    salesVolume: 789,
    revenue: 3598440,
    supplier: '深圳无线通信',
    createTime: '2024-08-15 14:30',
    updateTime: '2025-01-23 10:25',
    productManager: '钱工程师'
  },
  {
    key: '9',
    id: 'PD20250009',
    productName: '智能伺服驱动器',
    category: '伺服系统',
    brand: '伺服科技',
    model: 'SF-SD-2024',
    status: '在售',
    price: 18900,
    cost: 12600,
    profit: 6300,
    stock: 78,
    salesVolume: 234,
    revenue: 4424600,
    supplier: '西安伺服技术',
    createTime: '2024-09-10 13:25',
    updateTime: '2025-01-22 17:40',
    productManager: '郑工程师'
  },
  {
    key: '10',
    id: 'PD20250010',
    productName: '工业平板电脑',
    category: '计算设备',
    brand: '工控科技',
    model: 'GK-IPC-2024',
    status: '在售',
    price: 8750,
    cost: 5900,
    profit: 2850,
    stock: 134,
    salesVolume: 345,
    revenue: 3018750,
    supplier: '北京工控设备',
    createTime: '2024-10-18 16:10',
    updateTime: '2025-01-21 14:20',
    productManager: '冯工程师'
  },
  {
    key: '11',
    id: 'PD20250011',
    productName: '变频器控制系统',
    category: '变频设备',
    brand: '变频科技',
    model: 'BP-VFD-2024',
    status: '在售',
    price: 23400,
    cost: 15600,
    profit: 7800,
    stock: 56,
    salesVolume: 156,
    revenue: 3650400,
    supplier: '沈阳变频技术',
    createTime: '2024-11-20 14:20',
    updateTime: '2025-01-20 15:30',
    productManager: '曾工程师'
  },
  {
    key: '12',
    id: 'PD20250012',
    productName: '智能温度控制器',
    category: '温控设备',
    brand: '温控科技',
    model: 'WK-TC-2024',
    status: '在售',
    price: 3450,
    cost: 2100,
    profit: 1350,
    stock: 289,
    salesVolume: 678,
    revenue: 2339100,
    supplier: '重庆温控电子',
    createTime: '2024-12-08 15:20',
    updateTime: '2025-01-19 11:45',
    productManager: '彭工程师'
  },
  {
    key: '13',
    id: 'PD20250013',
    productName: '工业显示屏',
    category: '显示设备',
    brand: '显示科技',
    model: 'XS-ID-2024',
    status: '在售',
    price: 5680,
    cost: 3400,
    profit: 2280,
    stock: 167,
    salesVolume: 456,
    revenue: 2590080,
    supplier: '苏州显示技术',
    createTime: '2023-12-22 10:55',
    updateTime: '2025-01-18 16:25',
    productManager: '姚工程师'
  },
  {
    key: '14',
    id: 'PD20250014',
    productName: '压力传感器',
    category: '传感器设备',
    brand: '压感科技',
    model: 'YG-PS-2024',
    status: '在售',
    price: 2890,
    cost: 1700,
    profit: 1190,
    stock: 456,
    salesVolume: 789,
    revenue: 2280210,
    supplier: '青岛压感设备',
    createTime: '2023-01-10 14:15',
    updateTime: '2025-01-17 09:30',
    productManager: '贺工程师'
  },
  {
    key: '15',
    id: 'PD20250015',
    productName: '智能电机控制器',
    category: '电机控制',
    brand: '电机科技',
    model: 'DJ-MC-2024',
    status: '在售',
    price: 16780,
    cost: 11200,
    profit: 5580,
    stock: 89,
    salesVolume: 234,
    revenue: 3926520,
    supplier: '无锡电机控制',
    createTime: '2023-07-20 09:30',
    updateTime: '2025-01-16 13:20',
    productManager: '邹工程师'
  },
  {
    key: '16',
    id: 'PD20250016',
    productName: '工业激光测距仪',
    category: '测量设备',
    brand: '激光科技',
    model: 'JG-LRF-2024',
    status: '在售',
    price: 12900,
    cost: 8600,
    profit: 4300,
    stock: 45,
    salesVolume: 123,
    revenue: 1586700,
    supplier: '大连激光设备',
    createTime: '2023-05-12 15:45',
    updateTime: '2025-01-15 11:10',
    productManager: '施工程师'
  },
  {
    key: '17',
    id: 'PD20250017',
    productName: '自动化生产线控制系统',
    category: '系统集成',
    brand: '自动化科技',
    model: 'ZDH-PLC-2024',
    status: '在售',
    price: 156700,
    cost: 104500,
    profit: 52200,
    stock: 8,
    salesVolume: 23,
    revenue: 3604100,
    supplier: '济南自动化系统',
    createTime: '2023-11-30 11:00',
    updateTime: '2025-01-14 14:30',
    productManager: '方工程师'
  },
  {
    key: '18',
    id: 'PD20250018',
    productName: '智能安全继电器',
    category: '安全设备',
    brand: '安全科技',
    model: 'AQ-SR-2024',
    status: '在售',
    price: 4560,
    cost: 2800,
    profit: 1760,
    stock: 234,
    salesVolume: 567,
    revenue: 2585520,
    supplier: '厦门安全电子',
    createTime: '2023-04-08 13:20',
    updateTime: '2025-01-13 10:15',
    productManager: '顾工程师'
  },
  {
    key: '19',
    id: 'PD20250019',
    productName: '工业级UPS电源',
    category: '电源设备',
    brand: '电源科技',
    model: 'DY-UPS-2024',
    status: '在售',
    price: 18900,
    cost: 12600,
    profit: 6300,
    stock: 67,
    salesVolume: 189,
    revenue: 3572100,
    supplier: '南京电源技术',
    createTime: '2023-02-28 09:50',
    updateTime: '2025-01-12 16:45',
    productManager: '康工程师'
  },
  {
    key: '20',
    id: 'PD20250020',
    productName: '智能流量计',
    category: '测量设备',
    brand: '流量科技',
    model: 'LL-FM-2024',
    status: '在售',
    price: 8900,
    cost: 5900,
    profit: 3000,
    stock: 123,
    salesVolume: 278,
    revenue: 2474200,
    supplier: '长沙流量仪表',
    createTime: '2023-06-05 11:20',
    updateTime: '2025-01-11 12:30',
    productManager: '雷工程师'
  }
];

interface ProductDataRecord {
  key: string;
  id: string;
  productName: string;
  category: string;
  brand: string;
  model: string;
  status: string;
  price: number;
  cost: number;
  profit: number;
  stock: number;
  salesVolume: number;
  revenue: number;
  supplier: string;
  createTime: string;
  updateTime: string;
  productManager: string;
}

const ProductData: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // 筛选数据
  const filteredData = productDetailData.filter(item => {
    const matchesKeyword = !searchKeyword || 
      item.productName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.model.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesBrand = brandFilter === 'all' || item.brand === brandFilter;
    const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    const matchesStock = stockFilter === 'all' || (
      stockFilter === 'high' && item.stock > 200 ||
      stockFilter === 'medium' && item.stock >= 50 && item.stock <= 200 ||
      stockFilter === 'low' && item.stock < 50
    );
    
    return matchesKeyword && matchesCategory && matchesStatus && matchesBrand && matchesSupplier && matchesStock;
  });

  const columns: ColumnsType<ProductDataRecord> = [
    {
      title: '产品ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="搜索产品名称"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              搜索
            </Button>
            <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
              重置
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record.productName.toString().toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: '产品分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      filters: [
        { text: '工业控制', value: '工业控制' },
        { text: '传感器设备', value: '传感器设备' },
        { text: '系统集成', value: '系统集成' },
        { text: '数据采集', value: '数据采集' },
        { text: '电力设备', value: '电力设备' },
        { text: '网络设备', value: '网络设备' },
        { text: '视觉检测', value: '视觉检测' },
        { text: '通信设备', value: '通信设备' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 120,
      filters: [
        { text: '华控科技', value: '华控科技' },
        { text: '感知科技', value: '感知科技' },
        { text: '智造科技', value: '智造科技' },
        { text: '数联科技', value: '数联科技' },
        { text: '电控科技', value: '电控科技' },
        { text: '网通科技', value: '网通科技' },
        { text: '视觉科技', value: '视觉科技' },
        { text: '无线科技', value: '无线科技' },
      ],
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: 140,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '在售': 'green',
          '停售': 'red',
          '预售': 'orange',
          '缺货': 'volcano'
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
      filters: [
        { text: '在售', value: '在售' },
        { text: '停售', value: '停售' },
        { text: '预售', value: '预售' },
        { text: '缺货', value: '缺货' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '售价(元)',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `¥${price.toLocaleString()}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '成本(元)',
      dataIndex: 'cost',
      key: 'cost',
      width: 100,
      render: (cost: number) => `¥${cost.toLocaleString()}`,
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: '利润(元)',
      dataIndex: 'profit',
      key: 'profit',
      width: 100,
      render: (profit: number) => `¥${profit.toLocaleString()}`,
      sorter: (a, b) => a.profit - b.profit,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
      render: (stock: number) => {
        const color = stock > 200 ? 'green' : stock >= 50 ? 'orange' : 'red';
        return <Tag color={color}>{stock}</Tag>;
      },
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: '销量',
      dataIndex: 'salesVolume',
      key: 'salesVolume',
      width: 80,
      sorter: (a, b) => a.salesVolume - b.salesVolume,
    },
    {
      title: '营收(元)',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 120,
      render: (revenue: number) => `¥${revenue.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
      width: 140,
      filters: [
        { text: '深圳华控电子', value: '深圳华控电子' },
        { text: '北京感知科技', value: '北京感知科技' },
        { text: '上海智造系统', value: '上海智造系统' },
        { text: '广州数联电子', value: '广州数联电子' },
        { text: '天津电控设备', value: '天津电控设备' },
        { text: '杭州网通设备', value: '杭州网通设备' },
        { text: '成都视觉系统', value: '成都视觉系统' },
        { text: '深圳无线通信', value: '深圳无线通信' },
      ],
      onFilter: (value, record) => record.supplier === value,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      sorter: (a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf(),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 160,
      sorter: (a, b) => dayjs(a.updateTime).valueOf() - dayjs(b.updateTime).valueOf(),
    },
    {
      title: '产品经理',
      dataIndex: 'productManager',
      key: 'productManager',
      width: 100,
    },
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题和筛选 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>产品数据</Title>
          <Text type="secondary">产品信息管理与分析平台</Text>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="模糊查询产品名称或编号"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ width: 200 }}
              enterButton
            />
            <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: 120 }}>
              <Option value="all">全部分类</Option>
              <Option value="工业控制">工业控制</Option>
              <Option value="传感器设备">传感器设备</Option>
              <Option value="系统集成">系统集成</Option>
              <Option value="数据采集">数据采集</Option>
              <Option value="电力设备">电力设备</Option>
              <Option value="网络设备">网络设备</Option>
              <Option value="视觉检测">视觉检测</Option>
              <Option value="通信设备">通信设备</Option>
            </Select>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 100 }}>
              <Option value="all">全部状态</Option>
              <Option value="在售">在售</Option>
              <Option value="停售">停售</Option>
              <Option value="预售">预售</Option>
              <Option value="缺货">缺货</Option>
            </Select>
            <Select value={brandFilter} onChange={setBrandFilter} style={{ width: 120 }}>
              <Option value="all">全部品牌</Option>
              <Option value="华控科技">华控科技</Option>
              <Option value="感知科技">感知科技</Option>
              <Option value="智造科技">智造科技</Option>
              <Option value="数联科技">数联科技</Option>
              <Option value="电控科技">电控科技</Option>
              <Option value="网通科技">网通科技</Option>
              <Option value="视觉科技">视觉科技</Option>
              <Option value="无线科技">无线科技</Option>
            </Select>
            <Select value={supplierFilter} onChange={setSupplierFilter} style={{ width: 120 }}>
              <Option value="all">全部供应商</Option>
              <Option value="深圳华控电子">深圳华控电子</Option>
              <Option value="北京感知科技">北京感知科技</Option>
              <Option value="上海智造系统">上海智造系统</Option>
              <Option value="广州数联电子">广州数联电子</Option>
              <Option value="天津电控设备">天津电控设备</Option>
              <Option value="杭州网通设备">杭州网通设备</Option>
              <Option value="成都视觉系统">成都视觉系统</Option>
              <Option value="深圳无线通信">深圳无线通信</Option>
            </Select>
            <Select value={stockFilter} onChange={setStockFilter} style={{ width: 120 }}>
              <Option value="all">全部库存</Option>
              <Option value="high">库存充足(&gt;200)</Option>
              <Option value="medium">库存正常(50-200)</Option>
              <Option value="low">库存不足(&lt;50)</Option>
            </Select>
            <RangePicker
              value={timeRange}
              onChange={(dates) => setTimeRange(dates)}
              style={{ width: 240 }}
            />
            <Button icon={<ReloadOutlined />}>刷新</Button>
            <Button type="primary" icon={<DownloadOutlined />}>导出数据</Button>
          </Space>
        </Col>
      </Row>

      {/* 数据分类概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={14}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BarChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                业务数据统计
              </div>
            }
          >
            <Row gutter={[16, 16]}>
              {productCategories.map((category) => (
                <Col span={8} key={category.key}>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#fafafa',
                    borderRadius: '6px',
                    textAlign: 'center',
                    border: `2px solid ${category.color}20`,
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: category.color,
                      marginBottom: '8px'
                    }}>
                      {category.isAmount 
                        ? `¥${(category.count / 10000).toFixed(0)}万`
                        : category.count.toLocaleString()
                      }
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {category.label}
                      {!category.isAmount && (
                        <span style={{ color: '#999', marginLeft: '4px' }}>({category.unit})</span>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* 产品洞察 */}
        <Col span={10}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                产品洞察
              </div>
            }
            style={{ height: '100%' }}
          >
            <List
              dataSource={productInsights}
              renderItem={(item) => (
                <List.Item style={{ padding: '8px 0', border: 'none' }}>
                  <List.Item.Meta
                    avatar={
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 
                          item.type === 'success' ? '#52c41a' :
                          item.type === 'warning' ? '#faad14' : '#1890ff'
                      }} />
                    }
                    title={<Text style={{ fontSize: '13px' }}>{item.title}</Text>}
                    description={<Text style={{ fontSize: '12px', color: '#666' }}>{item.description}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* 数据明细展示 */}
      <Row>
        <Col span={24}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  数据明细
                </div>
                <Text type="secondary">共 {filteredData.length} 条记录</Text>
              </div>
            }
          >
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '50', '100'],
              }}
              size="middle"
              scroll={{ x: 1800 }}
              bordered
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductData; 