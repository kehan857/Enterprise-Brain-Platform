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
  UserOutlined,
  TeamOutlined,
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

// 客户维度统计数据
const customerCategories = [
  { key: 'total-customers', label: '客户总数', count: 15627, color: '#1890ff', unit: '个' },
  { key: 'active-customers', label: '活跃客户', count: 12890, color: '#52c41a', unit: '个' },
  { key: 'vip-customers', label: 'VIP客户', count: 1248, color: '#722ed1', unit: '个' },
  { key: 'new-customers', label: '新增客户', count: 356, color: '#faad14', unit: '个' },
  { key: 'potential-customers', label: '潜在客户', count: 2567, color: '#eb2f96', unit: '个' },
  { key: 'customer-value', label: '客户总价值', count: 186750000, color: '#f5222d', unit: '元', isAmount: true },
];

// 客户洞察数据
const customerInsights = [
  {
    title: '客户活跃度创新高',
    description: '本月活跃客户占比达82.5%，较上月提升3.8个百分点',
    type: 'success'
  },
  {
    title: 'VIP客户流失预警',
    description: '监测到15个VIP客户近30天无交互，需要重点关注维护',
    type: 'warning'
  },
  {
    title: '客户价值持续增长',
    description: '平均客户生命周期价值提升至11.95万元，增长率18.6%',
    type: 'success'
  }
];

// 客户明细数据
const customerDetailData = [
  {
    key: '1',
    id: 'CU20250001',
    customerName: '华润集团有限公司',
    customerLevel: 'VIP',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 2456800,
    lastContact: '2025-01-30',
    contactPerson: '张总经理',
    phone: '13800138001',
    region: '广东省',
    industry: '房地产',
    source: '老客推荐',
    createTime: '2023-03-15 10:30',
    salesOwner: '李经理'
  },
  {
    key: '2',
    id: 'CU20250002',
    customerName: '万科企业股份有限公司',
    customerLevel: 'VIP',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 1987600,
    lastContact: '2025-01-29',
    contactPerson: '王副总',
    phone: '13800138002',
    region: '广东省',
    industry: '房地产',
    source: '展会获客',
    createTime: '2022-11-20 14:20',
    salesOwner: '张经理'
  },
  {
    key: '3',
    id: 'CU20250003',
    customerName: '中信证券股份有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '潜在',
    totalValue: 1567800,
    lastContact: '2025-01-28',
    contactPerson: '刘总监',
    phone: '13800138003',
    region: '北京市',
    industry: '金融服务',
    source: '线上推广',
    createTime: '2023-07-10 09:15',
    salesOwner: '王经理'
  },
  {
    key: '4',
    id: 'CU20250004',
    customerName: '招商银行股份有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 1378900,
    lastContact: '2025-01-27',
    contactPerson: '陈主管',
    phone: '13800138004',
    region: '广东省',
    industry: '金融服务',
    source: '合作伙伴',
    createTime: '2023-01-25 16:40',
    salesOwner: '赵经理'
  },
  {
    key: '5',
    id: 'CU20250005',
    customerName: '平安保险(集团)股份有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '跟进中',
    totalValue: 1256700,
    lastContact: '2025-01-26',
    contactPerson: '黄经理',
    phone: '13800138005',
    region: '广东省',
    industry: '保险业',
    source: '电话营销',
    createTime: '2023-05-18 11:30',
    salesOwner: '孙经理'
  },
  {
    key: '6',
    id: 'CU20250006',
    customerName: '腾讯控股有限公司',
    customerLevel: 'VIP',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 2134500,
    lastContact: '2025-01-25',
    contactPerson: '周技术总监',
    phone: '13800138006',
    region: '广东省',
    industry: '互联网',
    source: '社交媒体',
    createTime: '2022-09-12 13:45',
    salesOwner: '李经理'
  },
  {
    key: '7',
    id: 'CU20250007',
    customerName: '阿里巴巴集团控股有限公司',
    customerLevel: 'VIP',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 1998800,
    lastContact: '2025-01-24',
    contactPerson: '吴产品总监',
    phone: '13800138007',
    region: '浙江省',
    industry: '互联网',
    source: '内容营销',
    createTime: '2022-12-08 15:20',
    salesOwner: '张经理'
  },
  {
    key: '8',
    id: 'CU20250008',
    customerName: '百度在线网络技术有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '潜在',
    totalValue: 1067800,
    lastContact: '2025-01-23',
    contactPerson: '钱CTO',
    phone: '13800138008',
    region: '北京市',
    industry: '互联网',
    source: '搜索引擎',
    createTime: '2023-04-22 10:15',
    salesOwner: '王经理'
  },
  {
    key: '9',
    id: 'CU20250009',
    customerName: '美团点评集团',
    customerLevel: '普通',
    customerType: '中型企业',
    status: '活跃',
    totalValue: 678900,
    lastContact: '2025-01-22',
    contactPerson: '孙运营总监',
    phone: '13800138009',
    region: '北京市',
    industry: '生活服务',
    source: '线上推广',
    createTime: '2023-08-15 14:30',
    salesOwner: '赵经理'
  },
  {
    key: '10',
    id: 'CU20250010',
    customerName: '京东集团股份有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '跟进中',
    totalValue: 1445600,
    lastContact: '2025-01-21',
    contactPerson: '赵副总裁',
    phone: '13800138010',
    region: '北京市',
    industry: '电子商务',
    source: '展会获客',
    createTime: '2023-02-28 09:50',
    salesOwner: '孙经理'
  },
  {
    key: '11',
    id: 'CU20250011',
    customerName: '小米科技有限责任公司',
    customerLevel: '普通',
    customerType: '中型企业',
    status: '活跃',
    totalValue: 789500,
    lastContact: '2025-01-20',
    contactPerson: '郑产品经理',
    phone: '13800138011',
    region: '北京市',
    industry: '消费电子',
    source: '老客推荐',
    createTime: '2023-06-05 11:20',
    salesOwner: '李经理'
  },
  {
    key: '12',
    id: 'CU20250012',
    customerName: '华为技术有限公司',
    customerLevel: 'VIP',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 2667800,
    lastContact: '2025-01-19',
    contactPerson: '冯研发总监',
    phone: '13800138012',
    region: '广东省',
    industry: '通信设备',
    source: '合作伙伴',
    createTime: '2022-10-18 16:10',
    salesOwner: '张经理'
  },
  {
    key: '13',
    id: 'CU20250013',
    customerName: '海尔智家股份有限公司',
    customerLevel: '普通',
    customerType: '中型企业',
    status: '潜在',
    totalValue: 567800,
    lastContact: '2025-01-18',
    contactPerson: '周市场总监',
    phone: '13800138013',
    region: '山东省',
    industry: '家电制造',
    source: '电话营销',
    createTime: '2023-09-10 13:25',
    salesOwner: '王经理'
  },
  {
    key: '14',
    id: 'CU20250014',
    customerName: '格力电器股份有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '跟进中',
    totalValue: 1234500,
    lastContact: '2025-01-17',
    contactPerson: '吴销售总监',
    phone: '13800138014',
    region: '广东省',
    industry: '家电制造',
    source: '社交媒体',
    createTime: '2023-03-28 12:40',
    salesOwner: '赵经理'
  },
  {
    key: '15',
    id: 'CU20250015',
    customerName: '比亚迪股份有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 1556700,
    lastContact: '2025-01-16',
    contactPerson: '徐技术总监',
    phone: '13800138015',
    region: '广东省',
    industry: '汽车制造',
    source: '内容营销',
    createTime: '2022-12-22 10:55',
    salesOwner: '孙经理'
  },
  {
    key: '16',
    id: 'CU20250016',
    customerName: '宁德时代新能源科技股份有限公司',
    customerLevel: 'VIP',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 1889600,
    lastContact: '2025-01-15',
    contactPerson: '曾董事长助理',
    phone: '13800138016',
    region: '福建省',
    industry: '新能源',
    source: '展会获客',
    createTime: '2023-01-10 14:15',
    salesOwner: '李经理'
  },
  {
    key: '17',
    id: 'CU20250017',
    customerName: '蚂蚁集团服务有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '潜在',
    totalValue: 1167800,
    lastContact: '2025-01-14',
    contactPerson: '彭产品总监',
    phone: '13800138017',
    region: '浙江省',
    industry: '金融科技',
    source: '搜索引擎',
    createTime: '2023-07-20 09:30',
    salesOwner: '张经理'
  },
  {
    key: '18',
    id: 'CU20250018',
    customerName: '滴滴出行科技有限公司',
    customerLevel: '普通',
    customerType: '中型企业',
    status: '跟进中',
    totalValue: 434500,
    lastContact: '2025-01-13',
    contactPerson: '姚运营经理',
    phone: '13800138018',
    region: '北京市',
    industry: '共享出行',
    source: '线上推广',
    createTime: '2023-05-12 15:45',
    salesOwner: '王经理'
  },
  {
    key: '19',
    id: 'CU20250019',
    customerName: '字节跳动科技有限公司',
    customerLevel: '重要',
    customerType: '大型企业',
    status: '活跃',
    totalValue: 1345600,
    lastContact: '2025-01-12',
    contactPerson: '贺技术VP',
    phone: '13800138019',
    region: '北京市',
    industry: '互联网',
    source: '合作伙伴',
    createTime: '2022-11-30 11:00',
    salesOwner: '赵经理'
  },
  {
    key: '20',
    id: 'CU20250020',
    customerName: '网易(杭州)网络有限公司',
    customerLevel: '普通',
    customerType: '中型企业',
    status: '活跃',
    totalValue: 567800,
    lastContact: '2025-01-11',
    contactPerson: '邹游戏制作人',
    phone: '13800138020',
    region: '浙江省',
    industry: '互联网',
    source: '社交媒体',
    createTime: '2023-04-08 13:20',
    salesOwner: '孙经理'
  }
];

interface CustomerDataRecord {
  key: string;
  id: string;
  customerName: string;
  customerLevel: string;
  customerType: string;
  status: string;
  totalValue: number;
  lastContact: string;
  contactPerson: string;
  phone: string;
  region: string;
  industry: string;
  source: string;
  createTime: string;
  salesOwner: string;
}

const CustomerData: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // 筛选数据
  const filteredData = customerDetailData.filter(item => {
    const matchesKeyword = !searchKeyword || 
      item.customerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || item.customerLevel === levelFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;
    const matchesRegion = regionFilter === 'all' || item.region === regionFilter;
    const matchesIndustry = industryFilter === 'all' || item.industry === industryFilter;
    
    return matchesKeyword && matchesLevel && matchesStatus && matchesSource && matchesRegion && matchesIndustry;
  });

  const columns: ColumnsType<CustomerDataRecord> = [
    {
      title: '客户ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 200,
      fixed: 'left',
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
      title: '客户等级',
      dataIndex: 'customerLevel',
      key: 'customerLevel',
      width: 100,
      render: (level: string) => {
        const color = level === 'VIP' ? 'purple' : level === '重要' ? 'blue' : 'default';
        return <Tag color={color}>{level}</Tag>;
      },
      filters: [
        { text: 'VIP', value: 'VIP' },
        { text: '重要', value: '重要' },
        { text: '普通', value: '普通' },
      ],
      onFilter: (value, record) => record.customerLevel === value,
    },
    {
      title: '客户类型',
      dataIndex: 'customerType',
      key: 'customerType',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '活跃': 'green',
          '潜在': 'orange',
          '跟进中': 'blue',
          '暂停': 'red'
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
      filters: [
        { text: '活跃', value: '活跃' },
        { text: '潜在', value: '潜在' },
        { text: '跟进中', value: '跟进中' },
        { text: '暂停', value: '暂停' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '客户价值(元)',
      dataIndex: 'totalValue',
      key: 'totalValue',
      width: 130,
      render: (value: number) => `¥${value.toLocaleString()}`,
      sorter: (a, b) => a.totalValue - b.totalValue,
    },
    {
      title: '最后联系',
      dataIndex: 'lastContact',
      key: 'lastContact',
      width: 120,
      sorter: (a, b) => dayjs(a.lastContact).valueOf() - dayjs(b.lastContact).valueOf(),
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      width: 120,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '所在地区',
      dataIndex: 'region',
      key: 'region',
      width: 100,
      filters: [
        { text: '广东省', value: '广东省' },
        { text: '北京市', value: '北京市' },
        { text: '浙江省', value: '浙江省' },
        { text: '上海市', value: '上海市' },
        { text: '江苏省', value: '江苏省' },
        { text: '山东省', value: '山东省' },
        { text: '福建省', value: '福建省' },
      ],
      onFilter: (value, record) => record.region === value,
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      width: 120,
      filters: [
        { text: '房地产', value: '房地产' },
        { text: '金融服务', value: '金融服务' },
        { text: '互联网', value: '互联网' },
        { text: '保险业', value: '保险业' },
        { text: '生活服务', value: '生活服务' },
        { text: '电子商务', value: '电子商务' },
        { text: '消费电子', value: '消费电子' },
        { text: '通信设备', value: '通信设备' },
      ],
      onFilter: (value, record) => record.industry === value,
    },
    {
      title: '来源渠道',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      filters: [
        { text: '线上推广', value: '线上推广' },
        { text: '电话营销', value: '电话营销' },
        { text: '展会获客', value: '展会获客' },
        { text: '老客推荐', value: '老客推荐' },
        { text: '社交媒体', value: '社交媒体' },
        { text: '合作伙伴', value: '合作伙伴' },
        { text: '内容营销', value: '内容营销' },
        { text: '搜索引擎', value: '搜索引擎' },
      ],
      onFilter: (value, record) => record.source === value,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      sorter: (a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf(),
    },
    {
      title: '负责人',
      dataIndex: 'salesOwner',
      key: 'salesOwner',
      width: 100,
    },
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题和筛选 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>客户数据</Title>
          <Text type="secondary">客户信息管理与分析平台</Text>
        </Col>
        <Col>
          <Space>
            <Search
              placeholder="模糊查询客户名称或编号"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ width: 200 }}
              enterButton
            />
            <Select value={levelFilter} onChange={setLevelFilter} style={{ width: 100 }}>
              <Option value="all">全部等级</Option>
              <Option value="VIP">VIP</Option>
              <Option value="重要">重要</Option>
              <Option value="普通">普通</Option>
            </Select>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 100 }}>
              <Option value="all">全部状态</Option>
              <Option value="活跃">活跃</Option>
              <Option value="潜在">潜在</Option>
              <Option value="跟进中">跟进中</Option>
              <Option value="暂停">暂停</Option>
            </Select>
            <Select value={sourceFilter} onChange={setSourceFilter} style={{ width: 120 }}>
              <Option value="all">全部来源</Option>
              <Option value="线上推广">线上推广</Option>
              <Option value="电话营销">电话营销</Option>
              <Option value="展会获客">展会获客</Option>
              <Option value="老客推荐">老客推荐</Option>
              <Option value="社交媒体">社交媒体</Option>
              <Option value="搜索引擎">搜索引擎</Option>
              <Option value="内容营销">内容营销</Option>
              <Option value="合作伙伴">合作伙伴</Option>
            </Select>
            <Select value={regionFilter} onChange={setRegionFilter} style={{ width: 120 }}>
              <Option value="all">全部地区</Option>
              <Option value="广东省">广东省</Option>
              <Option value="北京市">北京市</Option>
              <Option value="浙江省">浙江省</Option>
              <Option value="上海市">上海市</Option>
              <Option value="江苏省">江苏省</Option>
              <Option value="山东省">山东省</Option>
              <Option value="福建省">福建省</Option>
            </Select>
            <Select value={industryFilter} onChange={setIndustryFilter} style={{ width: 120 }}>
              <Option value="all">全部行业</Option>
              <Option value="房地产">房地产</Option>
              <Option value="金融服务">金融服务</Option>
              <Option value="互联网">互联网</Option>
              <Option value="保险业">保险业</Option>
              <Option value="生活服务">生活服务</Option>
              <Option value="电子商务">电子商务</Option>
              <Option value="消费电子">消费电子</Option>
              <Option value="通信设备">通信设备</Option>
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
              {customerCategories.map((category) => (
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

        {/* 客户洞察 */}
        <Col span={10}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                客户洞察
              </div>
            }
            style={{ height: '100%' }}
          >
            <List
              dataSource={customerInsights}
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
              scroll={{ x: 1600 }}
              bordered
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerData; 