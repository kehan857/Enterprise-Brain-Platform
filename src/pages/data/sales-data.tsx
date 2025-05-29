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
  DollarOutlined,
  TrophyOutlined,
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

// 销售维度统计数据
const salesCategories = [
  { key: 'total-sales', label: '销售总额', count: 186750000, color: '#1890ff', unit: '元', isAmount: true },
  { key: 'order-count', label: '订单数量', count: 1238, color: '#52c41a', unit: '笔' },
  { key: 'sales-people', label: '销售人员', count: 45, color: '#722ed1', unit: '人' },
  { key: 'avg-deal-size', label: '平均客单价', count: 150890, color: '#faad14', unit: '元' },
  { key: 'conversion-rate', label: '转化率', count: 13.2, color: '#eb2f96', unit: '%', isPercentage: true },
  { key: 'target-completion', label: '目标完成率', count: 81.9, color: '#f5222d', unit: '%', isPercentage: true },
];

// 销售洞察数据
const salesInsights = [
  {
    title: '销售目标完成情况良好',
    description: '本月销售目标完成率81.9%，预计月底可达成年度目标的85%',
    type: 'success'
  },
  {
    title: '重点关注销售团队效率',
    description: '4名销售人员业绩低于平均水平，需要加强培训和指导',
    type: 'warning'
  },
  {
    title: '客单价持续提升',
    description: '平均客单价较上月提升12.5%，高价值产品销售策略见效',
    type: 'success'
  }
];

// 销售明细数据
const salesDetailData = [
  {
    key: '1',
    id: 'SO20250001',
    orderNumber: 'ORD-2025-0001',
    customerName: '华润集团有限公司',
    salesPerson: '李经理',
    productName: '智能工业控制器V3.0',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 1567800,
    discountAmount: 78390,
    actualAmount: 1489410,
    paymentStatus: '已付款',
    orderDate: '2025-01-30',
    deliveryDate: '2025-02-15',
    region: '华南区',
    channel: '直销',
    priority: '高',
    salesStage: '已交付'
  },
  {
    key: '2',
    id: 'SO20250002',
    orderNumber: 'ORD-2025-0002',
    customerName: '万科企业股份有限公司',
    salesPerson: '张经理',
    productName: '工业自动化解决方案',
    orderType: '续费订单',
    status: '进行中',
    orderAmount: 2456700,
    discountAmount: 122835,
    actualAmount: 2333865,
    paymentStatus: '部分付款',
    orderDate: '2025-01-29',
    deliveryDate: '2025-03-10',
    region: '华南区',
    channel: '渠道',
    priority: '高',
    salesStage: '执行中'
  },
  {
    key: '3',
    id: 'SO20250003',
    orderNumber: 'ORD-2025-0003',
    customerName: '中信证券股份有限公司',
    salesPerson: '王经理',
    productName: '数据采集终端',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 987600,
    discountAmount: 49380,
    actualAmount: 938220,
    paymentStatus: '已付款',
    orderDate: '2025-01-28',
    deliveryDate: '2025-02-20',
    region: '华北区',
    channel: '直销',
    priority: '中',
    salesStage: '已交付'
  },
  {
    key: '4',
    id: 'SO20250004',
    orderNumber: 'ORD-2025-0004',
    customerName: '招商银行股份有限公司',
    salesPerson: '赵经理',
    productName: '智能配电柜系统',
    orderType: '新订单',
    status: '进行中',
    orderAmount: 1345600,
    discountAmount: 67280,
    actualAmount: 1278320,
    paymentStatus: '待付款',
    orderDate: '2025-01-27',
    deliveryDate: '2025-02-28',
    region: '华南区',
    channel: '直销',
    priority: '中',
    salesStage: '待交付'
  },
  {
    key: '5',
    id: 'SO20250005',
    orderNumber: 'ORD-2025-0005',
    customerName: '平安保险(集团)股份有限公司',
    salesPerson: '孙经理',
    productName: '工业以太网交换机',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 678900,
    discountAmount: 33945,
    actualAmount: 644955,
    paymentStatus: '已付款',
    orderDate: '2025-01-26',
    deliveryDate: '2025-02-10',
    region: '华南区',
    channel: '渠道',
    priority: '低',
    salesStage: '已交付'
  },
  {
    key: '6',
    id: 'SO20250006',
    orderNumber: 'ORD-2025-0006',
    customerName: '腾讯控股有限公司',
    salesPerson: '李经理',
    productName: '机器视觉检测系统',
    orderType: '升级订单',
    status: '进行中',
    orderAmount: 3456700,
    discountAmount: 172835,
    actualAmount: 3283865,
    paymentStatus: '部分付款',
    orderDate: '2025-01-25',
    deliveryDate: '2025-03-15',
    region: '华南区',
    channel: '直销',
    priority: '高',
    salesStage: '执行中'
  },
  {
    key: '7',
    id: 'SO20250007',
    orderNumber: 'ORD-2025-0007',
    customerName: '阿里巴巴集团控股有限公司',
    salesPerson: '张经理',
    productName: '工业无线通信模块',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 1234500,
    discountAmount: 61725,
    actualAmount: 1172775,
    paymentStatus: '已付款',
    orderDate: '2025-01-24',
    deliveryDate: '2025-02-18',
    region: '华东区',
    channel: '直销',
    priority: '中',
    salesStage: '已交付'
  },
  {
    key: '8',
    id: 'SO20250008',
    orderNumber: 'ORD-2025-0008',
    customerName: '百度在线网络技术有限公司',
    salesPerson: '王经理',
    productName: '智能伺服驱动器',
    orderType: '新订单',
    status: '进行中',
    orderAmount: 876500,
    discountAmount: 43825,
    actualAmount: 832675,
    paymentStatus: '待付款',
    orderDate: '2025-01-23',
    deliveryDate: '2025-02-25',
    region: '华北区',
    channel: '渠道',
    priority: '中',
    salesStage: '待交付'
  },
  {
    key: '9',
    id: 'SO20250009',
    orderNumber: 'ORD-2025-0009',
    customerName: '美团点评集团',
    salesPerson: '赵经理',
    productName: '工业平板电脑',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 567800,
    discountAmount: 28390,
    actualAmount: 539410,
    paymentStatus: '已付款',
    orderDate: '2025-01-22',
    deliveryDate: '2025-02-08',
    region: '华北区',
    channel: '直销',
    priority: '低',
    salesStage: '已交付'
  },
  {
    key: '10',
    id: 'SO20250010',
    orderNumber: 'ORD-2025-0010',
    customerName: '京东集团股份有限公司',
    salesPerson: '孙经理',
    productName: '变频器控制系统',
    orderType: '续费订单',
    status: '进行中',
    orderAmount: 1678900,
    discountAmount: 83945,
    actualAmount: 1594955,
    paymentStatus: '部分付款',
    orderDate: '2025-01-21',
    deliveryDate: '2025-03-05',
    region: '华北区',
    channel: '直销',
    priority: '高',
    salesStage: '执行中'
  },
  {
    key: '11',
    id: 'SO20250011',
    orderNumber: 'ORD-2025-0011',
    customerName: '小米科技有限责任公司',
    salesPerson: '李经理',
    productName: '智能温度控制器',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 345600,
    discountAmount: 17280,
    actualAmount: 328320,
    paymentStatus: '已付款',
    orderDate: '2025-01-20',
    deliveryDate: '2025-02-05',
    region: '华北区',
    channel: '渠道',
    priority: '低',
    salesStage: '已交付'
  },
  {
    key: '12',
    id: 'SO20250012',
    orderNumber: 'ORD-2025-0012',
    customerName: '华为技术有限公司',
    salesPerson: '张经理',
    productName: '工业显示屏',
    orderType: '升级订单',
    status: '进行中',
    orderAmount: 2345600,
    discountAmount: 117280,
    actualAmount: 2228320,
    paymentStatus: '部分付款',
    orderDate: '2025-01-19',
    deliveryDate: '2025-03-12',
    region: '华南区',
    channel: '直销',
    priority: '高',
    salesStage: '执行中'
  },
  {
    key: '13',
    id: 'SO20250013',
    orderNumber: 'ORD-2025-0013',
    customerName: '海尔智家股份有限公司',
    salesPerson: '王经理',
    productName: '压力传感器',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 456700,
    discountAmount: 22835,
    actualAmount: 433865,
    paymentStatus: '已付款',
    orderDate: '2025-01-18',
    deliveryDate: '2025-02-12',
    region: '华东区',
    channel: '渠道',
    priority: '中',
    salesStage: '已交付'
  },
  {
    key: '14',
    id: 'SO20250014',
    orderNumber: 'ORD-2025-0014',
    customerName: '格力电器股份有限公司',
    salesPerson: '赵经理',
    productName: '智能电机控制器',
    orderType: '新订单',
    status: '进行中',
    orderAmount: 1234500,
    discountAmount: 61725,
    actualAmount: 1172775,
    paymentStatus: '待付款',
    orderDate: '2025-01-17',
    deliveryDate: '2025-02-28',
    region: '华南区',
    channel: '直销',
    priority: '中',
    salesStage: '待交付'
  },
  {
    key: '15',
    id: 'SO20250015',
    orderNumber: 'ORD-2025-0015',
    customerName: '比亚迪股份有限公司',
    salesPerson: '孙经理',
    productName: '工业激光测距仪',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 876500,
    discountAmount: 43825,
    actualAmount: 832675,
    paymentStatus: '已付款',
    orderDate: '2025-01-16',
    deliveryDate: '2025-02-15',
    region: '华南区',
    channel: '直销',
    priority: '中',
    salesStage: '已交付'
  },
  {
    key: '16',
    id: 'SO20250016',
    orderNumber: 'ORD-2025-0016',
    customerName: '宁德时代新能源科技股份有限公司',
    salesPerson: '李经理',
    productName: '自动化生产线控制系统',
    orderType: '新订单',
    status: '进行中',
    orderAmount: 5678900,
    discountAmount: 283945,
    actualAmount: 5394955,
    paymentStatus: '部分付款',
    orderDate: '2025-01-15',
    deliveryDate: '2025-04-10',
    region: '华东区',
    channel: '直销',
    priority: '高',
    salesStage: '执行中'
  },
  {
    key: '17',
    id: 'SO20250017',
    orderNumber: 'ORD-2025-0017',
    customerName: '蚂蚁集团服务有限公司',
    salesPerson: '张经理',
    productName: '智能安全继电器',
    orderType: '新订单',
    status: '已完成',
    orderAmount: 567800,
    discountAmount: 28390,
    actualAmount: 539410,
    paymentStatus: '已付款',
    orderDate: '2025-01-14',
    deliveryDate: '2025-02-08',
    region: '华东区',
    channel: '渠道',
    priority: '低',
    salesStage: '已交付'
  },
  {
    key: '18',
    id: 'SO20250018',
    orderNumber: 'ORD-2025-0018',
    customerName: '滴滴出行科技有限公司',
    salesPerson: '王经理',
    productName: '工业级UPS电源',
    orderType: '新订单',
    status: '进行中',
    orderAmount: 1345600,
    discountAmount: 67280,
    actualAmount: 1278320,
    paymentStatus: '待付款',
    orderDate: '2025-01-13',
    deliveryDate: '2025-02-28',
    region: '华北区',
    channel: '直销',
    priority: '中',
    salesStage: '待交付'
  },
  {
    key: '19',
    id: 'SO20250019',
    orderNumber: 'ORD-2025-0019',
    customerName: '字节跳动科技有限公司',
    salesPerson: '赵经理',
    productName: '智能流量计',
    orderType: '续费订单',
    status: '已完成',
    orderAmount: 789600,
    discountAmount: 39480,
    actualAmount: 750120,
    paymentStatus: '已付款',
    orderDate: '2025-01-12',
    deliveryDate: '2025-02-10',
    region: '华北区',
    channel: '直销',
    priority: '中',
    salesStage: '已交付'
  },
  {
    key: '20',
    id: 'SO20250020',
    orderNumber: 'ORD-2025-0020',
    customerName: '网易(杭州)网络有限公司',
    salesPerson: '孙经理',
    productName: '智能传感器模块Pro',
    orderType: '新订单',
    status: '进行中',
    orderAmount: 456700,
    discountAmount: 22835,
    actualAmount: 433865,
    paymentStatus: '部分付款',
    orderDate: '2025-01-11',
    deliveryDate: '2025-02-25',
    region: '华东区',
    channel: '渠道',
    priority: '低',
    salesStage: '执行中'
  }
];

interface SalesDataRecord {
  key: string;
  id: string;
  orderNumber: string;
  customerName: string;
  salesPerson: string;
  productName: string;
  orderType: string;
  status: string;
  orderAmount: number;
  discountAmount: number;
  actualAmount: number;
  paymentStatus: string;
  orderDate: string;
  deliveryDate: string;
  region: string;
  channel: string;
  priority: string;
  salesStage: string;
}

const SalesData: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [salesPersonFilter, setSalesPersonFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');

  // 筛选数据
  const filteredData = salesDetailData.filter(item => {
    const matchesKeyword = !searchKeyword || 
      item.customerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.orderNumber.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesSalesPerson = salesPersonFilter === 'all' || item.salesPerson === salesPersonFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRegion = regionFilter === 'all' || item.region === regionFilter;
    const matchesChannel = channelFilter === 'all' || item.channel === channelFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    const matchesOrderType = orderTypeFilter === 'all' || item.orderType === orderTypeFilter;
    
    return matchesKeyword && matchesSalesPerson && matchesStatus && matchesRegion && 
           matchesChannel && matchesPriority && matchesOrderType;
  });

  const columns: ColumnsType<SalesDataRecord> = [
    {
      title: '销售ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 140,
      fixed: 'left',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="搜索订单编号"
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
        record.orderNumber.toString().toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 180,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="搜索客户名称"
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
        record.customerName.toString().toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: '销售人员',
      dataIndex: 'salesPerson',
      key: 'salesPerson',
      width: 100,
      filters: [
        { text: '李经理', value: '李经理' },
        { text: '张经理', value: '张经理' },
        { text: '王经理', value: '王经理' },
        { text: '赵经理', value: '赵经理' },
        { text: '孙经理', value: '孙经理' },
        { text: '周经理', value: '周经理' },
        { text: '吴经理', value: '吴经理' },
        { text: '郑经理', value: '郑经理' },
        { text: '钱经理', value: '钱经理' },
        { text: '冯经理', value: '冯经理' },
      ],
      onFilter: (value, record) => record.salesPerson === value,
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 180,
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      width: 100,
      render: (type: string) => {
        const colorMap: Record<string, string> = {
          '新订单': 'green',
          '续费订单': 'blue',
          '升级订单': 'orange'
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      },
      filters: [
        { text: '新订单', value: '新订单' },
        { text: '续费订单', value: '续费订单' },
        { text: '升级订单', value: '升级订单' },
      ],
      onFilter: (value, record) => record.orderType === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已完成': 'green',
          '进行中': 'blue',
          '已取消': 'red',
          '待确认': 'orange'
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
      filters: [
        { text: '已完成', value: '已完成' },
        { text: '进行中', value: '进行中' },
        { text: '已取消', value: '已取消' },
        { text: '待确认', value: '待确认' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '订单金额(元)',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      width: 130,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
      sorter: (a, b) => a.orderAmount - b.orderAmount,
    },
    {
      title: '折扣金额(元)',
      dataIndex: 'discountAmount',
      key: 'discountAmount',
      width: 130,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
      sorter: (a, b) => a.discountAmount - b.discountAmount,
    },
    {
      title: '实际金额(元)',
      dataIndex: 'actualAmount',
      key: 'actualAmount',
      width: 130,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
      sorter: (a, b) => a.actualAmount - b.actualAmount,
    },
    {
      title: '付款状态',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已付款': 'green',
          '部分付款': 'orange',
          '待付款': 'red'
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
      filters: [
        { text: '已付款', value: '已付款' },
        { text: '部分付款', value: '部分付款' },
        { text: '待付款', value: '待付款' },
      ],
      onFilter: (value, record) => record.paymentStatus === value,
    },
    {
      title: '下单日期',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: 120,
      sorter: (a, b) => dayjs(a.orderDate).valueOf() - dayjs(b.orderDate).valueOf(),
    },
    {
      title: '交付日期',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      width: 120,
      sorter: (a, b) => dayjs(a.deliveryDate).valueOf() - dayjs(b.deliveryDate).valueOf(),
    },
    {
      title: '销售区域',
      dataIndex: 'region',
      key: 'region',
      width: 100,
      filters: [
        { text: '华南区', value: '华南区' },
        { text: '华北区', value: '华北区' },
        { text: '华东区', value: '华东区' },
        { text: '华中区', value: '华中区' },
        { text: '西南区', value: '西南区' },
        { text: '西北区', value: '西北区' },
        { text: '东北区', value: '东北区' },
      ],
      onFilter: (value, record) => record.region === value,
    },
    {
      title: '销售渠道',
      dataIndex: 'channel',
      key: 'channel',
      width: 100,
      filters: [
        { text: '直销', value: '直销' },
        { text: '渠道', value: '渠道' },
        { text: '在线', value: '在线' },
        { text: '电话', value: '电话' },
      ],
      onFilter: (value, record) => record.channel === value,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority: string) => {
        const colorMap: Record<string, string> = {
          '高': 'red',
          '中': 'orange',
          '低': 'green'
        };
        return <Tag color={colorMap[priority] || 'default'}>{priority}</Tag>;
      },
      filters: [
        { text: '高', value: '高' },
        { text: '中', value: '中' },
        { text: '低', value: '低' },
      ],
      onFilter: (value, record) => record.priority === value,
    },
    {
      title: '销售阶段',
      dataIndex: 'salesStage',
      key: 'salesStage',
      width: 100,
      render: (stage: string) => {
        const colorMap: Record<string, string> = {
          '已交付': 'green',
          '执行中': 'blue',
          '待交付': 'orange',
          '跟进中': 'purple'
        };
        return <Tag color={colorMap[stage] || 'default'}>{stage}</Tag>;
      },
      filters: [
        { text: '已交付', value: '已交付' },
        { text: '执行中', value: '执行中' },
        { text: '待交付', value: '待交付' },
        { text: '跟进中', value: '跟进中' },
      ],
      onFilter: (value, record) => record.salesStage === value,
    },
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题和筛选 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>销售数据</Title>
          <Text type="secondary">销售业务数据管理与分析平台</Text>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="模糊查询客户名称或订单"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ width: 200 }}
              enterButton
            />
            <Select value={salesPersonFilter} onChange={setSalesPersonFilter} style={{ width: 100 }}>
              <Option value="all">全部人员</Option>
              <Option value="李经理">李经理</Option>
              <Option value="张经理">张经理</Option>
              <Option value="王经理">王经理</Option>
              <Option value="赵经理">赵经理</Option>
              <Option value="孙经理">孙经理</Option>
              <Option value="周经理">周经理</Option>
              <Option value="吴经理">吴经理</Option>
              <Option value="郑经理">郑经理</Option>
              <Option value="钱经理">钱经理</Option>
              <Option value="冯经理">冯经理</Option>
            </Select>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 100 }}>
              <Option value="all">全部状态</Option>
              <Option value="已完成">已完成</Option>
              <Option value="进行中">进行中</Option>
              <Option value="已取消">已取消</Option>
              <Option value="待确认">待确认</Option>
            </Select>
            <Select value={regionFilter} onChange={setRegionFilter} style={{ width: 100 }}>
              <Option value="all">全部区域</Option>
              <Option value="华南区">华南区</Option>
              <Option value="华北区">华北区</Option>
              <Option value="华东区">华东区</Option>
              <Option value="华中区">华中区</Option>
              <Option value="西南区">西南区</Option>
              <Option value="西北区">西北区</Option>
              <Option value="东北区">东北区</Option>
            </Select>
            <Select value={channelFilter} onChange={setChannelFilter} style={{ width: 100 }}>
              <Option value="all">全部渠道</Option>
              <Option value="直销">直销</Option>
              <Option value="渠道">渠道</Option>
              <Option value="在线">在线</Option>
              <Option value="电话">电话</Option>
            </Select>
            <Select value={priorityFilter} onChange={setPriorityFilter} style={{ width: 100 }}>
              <Option value="all">全部优先级</Option>
              <Option value="高">高</Option>
              <Option value="中">中</Option>
              <Option value="低">低</Option>
            </Select>
            <Select value={orderTypeFilter} onChange={setOrderTypeFilter} style={{ width: 120 }}>
              <Option value="all">全部类型</Option>
              <Option value="新订单">新订单</Option>
              <Option value="续费订单">续费订单</Option>
              <Option value="升级订单">升级订单</Option>
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
              {salesCategories.map((category) => (
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
                        : category.isPercentage
                        ? `${category.count}%`
                        : category.unit === '元'
                        ? `¥${(category.count / 10000).toFixed(1)}万`
                        : category.count.toLocaleString()
                      }
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {category.label}
                      {!category.isAmount && !category.isPercentage && category.unit !== '元' && (
                        <span style={{ color: '#999', marginLeft: '4px' }}>({category.unit})</span>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* 销售洞察 */}
        <Col span={10}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                销售洞察
              </div>
            }
            style={{ height: '100%' }}
          >
            <List
              dataSource={salesInsights}
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
              scroll={{ x: 2000 }}
              bordered
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalesData; 