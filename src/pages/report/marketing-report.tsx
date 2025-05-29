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
  LineChartOutlined,
  BarChartOutlined,
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { type Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

// 业务维度统计数据
const businessCategories = [
  { key: 'customer', label: '客户数', count: 15627, color: '#1890ff', unit: '个' },
  { key: 'product', label: '产品数', count: 458, color: '#52c41a', unit: '款' },
  { key: 'lead', label: '线索数', count: 8934, color: '#faad14', unit: '条' },
  { key: 'opportunity', label: '商机数', count: 2145, color: '#722ed1', unit: '个' },
  { key: 'contract', label: '合同数', count: 1238, color: '#eb2f96', unit: '份' },
  { key: 'contract-amount', label: '合同金额', count: 156780000, color: '#f5222d', unit: '元', isAmount: true },
];

// 营销洞察数据（减少为3项）
const marketingInsights = [
  {
    title: '客户转化率提升明显',
    description: '本月线索转化率达到13.2%，较上月提升2.5个百分点',
    type: 'success'
  },
  {
    title: '重点客户流失风险',
    description: '3家A级客户近期活跃度下降，需重点关注维护',
    type: 'warning'
  },
  {
    title: '营销ROI持续优化',
    description: '整体营销投资回报率达到4.2:1，超出预期目标',
    type: 'success'
  }
];

// 模拟营销明细数据（补充更多内容）
const marketingDetailData = [
  {
    key: '1',
    id: 'CU2025010001',
    customerName: '上海科技有限公司',
    category: '客户数据',
    status: '活跃',
    value: 156800,
    source: '线上推广',
    createTime: '2025-01-15 09:30',
    updateTime: '2025-01-30 14:20'
  },
  {
    key: '2',
    id: 'LD2025010002',
    customerName: '北京创新科技',
    category: '线索数据',
    status: '跟进中',
    value: 89600,
    source: '电话营销',
    createTime: '2025-01-28 16:45',
    updateTime: '2025-01-30 11:30'
  },
  {
    key: '3',
    id: 'OP2025010003',
    customerName: '深圳智能制造',
    category: '商机数据',
    status: '待签约',
    value: 234500,
    source: '展会获客',
    createTime: '2025-01-20 10:15',
    updateTime: '2025-01-29 15:50'
  },
  {
    key: '4',
    id: 'CT2025010004',
    customerName: '广州数字科技',
    category: '合同数据',
    status: '已签约',
    value: 345600,
    source: '老客推荐',
    createTime: '2025-01-25 14:30',
    updateTime: '2025-01-30 09:45'
  },
  {
    key: '5',
    id: 'CA2025010005',
    customerName: '杭州互联网公司',
    category: '营销活动',
    status: '进行中',
    value: 125400,
    source: '社交媒体',
    createTime: '2025-01-18 11:20',
    updateTime: '2025-01-30 16:10'
  },
  {
    key: '6',
    id: 'CU2025010006',
    customerName: '成都软件开发',
    category: '客户数据',
    status: '潜在',
    value: 78900,
    source: '搜索引擎',
    createTime: '2025-01-22 13:45',
    updateTime: '2025-01-29 10:25'
  },
  {
    key: '7',
    id: 'LD2025010007',
    customerName: '武汉电子商务',
    category: '线索数据',
    status: '已转化',
    value: 167300,
    source: '内容营销',
    createTime: '2025-01-12 08:30',
    updateTime: '2025-01-28 17:40'
  },
  {
    key: '8',
    id: 'OP2025010008',
    customerName: '西安智慧城市',
    category: '商机数据',
    status: '洽谈中',
    value: 298700,
    source: '合作伙伴',
    createTime: '2025-01-26 15:20',
    updateTime: '2025-01-30 12:15'
  },
  {
    key: '9',
    id: 'CU2025010009',
    customerName: '天津新能源科技',
    category: '客户数据',
    status: '活跃',
    value: 189500,
    source: '线上推广',
    createTime: '2025-01-16 14:20',
    updateTime: '2025-01-30 10:30'
  },
  {
    key: '10',
    id: 'LD2025010010',
    customerName: '青岛海洋科技',
    category: '线索数据',
    status: '跟进中',
    value: 95600,
    source: '展会获客',
    createTime: '2025-01-24 11:15',
    updateTime: '2025-01-29 16:45'
  },
  {
    key: '11',
    id: 'OP2025010011',
    customerName: '苏州制造业集团',
    category: '商机数据',
    status: '待签约',
    value: 456700,
    source: '老客推荐',
    createTime: '2025-01-19 13:30',
    updateTime: '2025-01-30 14:20'
  },
  {
    key: '12',
    id: 'CT2025010012',
    customerName: '重庆物流公司',
    category: '合同数据',
    status: '已签约',
    value: 278900,
    source: '电话营销',
    createTime: '2025-01-21 09:45',
    updateTime: '2025-01-28 15:30'
  },
  {
    key: '13',
    id: 'CU2025010013',
    customerName: '南京科技园',
    category: '客户数据',
    status: '潜在',
    value: 134500,
    source: '社交媒体',
    createTime: '2025-01-27 16:20',
    updateTime: '2025-01-30 11:45'
  },
  {
    key: '14',
    id: 'LD2025010014',
    customerName: '长沙智能设备',
    category: '线索数据',
    status: '已转化',
    value: 112300,
    source: '搜索引擎',
    createTime: '2025-01-14 10:30',
    updateTime: '2025-01-29 13:15'
  },
  {
    key: '15',
    id: 'OP2025010015',
    customerName: '郑州建筑科技',
    category: '商机数据',
    status: '洽谈中',
    value: 367800,
    source: '内容营销',
    createTime: '2025-01-23 15:45',
    updateTime: '2025-01-30 09:20'
  },
  {
    key: '16',
    id: 'CT2025010016',
    customerName: '济南医疗器械',
    category: '合同数据',
    status: '已签约',
    value: 198700,
    source: '合作伙伴',
    createTime: '2025-01-17 12:10',
    updateTime: '2025-01-28 14:50'
  },
  {
    key: '17',
    id: 'CU2025010017',
    customerName: '福州电子科技',
    category: '客户数据',
    status: '活跃',
    value: 87500,
    source: '线上推广',
    createTime: '2025-01-29 08:30',
    updateTime: '2025-01-30 16:40'
  },
  {
    key: '18',
    id: 'LD2025010018',
    customerName: '昆明农业科技',
    category: '线索数据',
    status: '跟进中',
    value: 76800,
    source: '电话营销',
    createTime: '2025-01-13 14:25',
    updateTime: '2025-01-29 11:30'
  },
  {
    key: '19',
    id: 'OP2025010019',
    customerName: '石家庄工业园',
    category: '商机数据',
    status: '待签约',
    value: 289300,
    source: '展会获客',
    createTime: '2025-01-26 10:15',
    updateTime: '2025-01-30 15:20'
  },
  {
    key: '20',
    id: 'CT2025010020',
    customerName: '哈尔滨科技中心',
    category: '合同数据',
    status: '已签约',
    value: 423600,
    source: '老客推荐',
    createTime: '2025-01-11 16:40',
    updateTime: '2025-01-28 12:25'
  },
  {
    key: '21',
    id: 'CU2025010021',
    customerName: '兰州新材料公司',
    category: '客户数据',
    status: '潜在',
    value: 98200,
    source: '社交媒体',
    createTime: '2025-01-30 09:15',
    updateTime: '2025-01-30 17:30'
  },
  {
    key: '22',
    id: 'LD2025010022',
    customerName: '银川能源集团',
    category: '线索数据',
    status: '已转化',
    value: 145700,
    source: '搜索引擎',
    createTime: '2025-01-15 13:20',
    updateTime: '2025-01-29 10:45'
  },
  {
    key: '23',
    id: 'OP2025010023',
    customerName: '乌鲁木齐科技园',
    category: '商机数据',
    status: '洽谈中',
    value: 356900,
    source: '内容营销',
    createTime: '2025-01-18 11:50',
    updateTime: '2025-01-30 13:40'
  },
  {
    key: '24',
    id: 'CT2025010024',
    customerName: '海口贸易公司',
    category: '合同数据',
    status: '已签约',
    value: 167400,
    source: '合作伙伴',
    createTime: '2025-01-22 15:30',
    updateTime: '2025-01-28 16:20'
  },
  {
    key: '25',
    id: 'CA2025010025',
    customerName: '拉萨旅游开发',
    category: '营销活动',
    status: '进行中',
    value: 89600,
    source: '线上推广',
    createTime: '2025-01-25 10:40',
    updateTime: '2025-01-30 08:50'
  }
];

const MarketingReport: React.FC = () => {
  const [timeRange, setTimeRange] = useState<RangeValue>([dayjs().subtract(30, 'day'), dayjs()]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // 数据明细表格列配置
  const detailColumns: ColumnsType<any> = [
    {
      title: '数据编号',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
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
      title: '数据类别',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category) => {
        const colorMap: Record<string, string> = {
          '客户数据': 'blue',
          '线索数据': 'green',
          '商机数据': 'orange',
          '合同数据': 'purple',
          '营销活动': 'magenta'
        };
        return <Tag color={colorMap[category]}>{category}</Tag>;
      },
      filters: [
        { text: '客户数据', value: '客户数据' },
        { text: '线索数据', value: '线索数据' },
        { text: '商机数据', value: '商机数据' },
        { text: '合同数据', value: '合同数据' },
        { text: '营销活动', value: '营销活动' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const colorMap: Record<string, string> = {
          '活跃': 'success',
          '跟进中': 'processing',
          '待签约': 'warning',
          '已签约': 'success',
          '进行中': 'processing',
          '潜在': 'default',
          '已转化': 'success',
          '洽谈中': 'processing'
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '价值金额(元)',
      dataIndex: 'value',
      key: 'value',
      width: 130,
      render: (value) => `¥${value.toLocaleString()}`,
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: '来源渠道',
      dataIndex: 'source',
      key: 'source',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      sorter: (a, b) => dayjs(a.createTime).valueOf() - dayjs(b.createTime).valueOf(),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
      sorter: (a, b) => dayjs(a.updateTime).valueOf() - dayjs(b.updateTime).valueOf(),
    },
  ];

  // 筛选数据
  const filteredData = marketingDetailData.filter(item => {
    const matchesKeyword = !searchKeyword || 
      item.customerName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.id.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;
    
    return matchesKeyword && matchesCategory && matchesStatus && matchesSource;
  });

  return (
    <div style={{ padding: '0' }}>
      {/* 页面标题和筛选 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>营销数据</Title>
          <Text type="secondary">营销业务数据管理与分析平台</Text>
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
            <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: 120 }}>
              <Option value="all">全部类别</Option>
              <Option value="客户数据">客户数据</Option>
              <Option value="线索数据">线索数据</Option>
              <Option value="商机数据">商机数据</Option>
              <Option value="合同数据">合同数据</Option>
              <Option value="营销活动">营销活动</Option>
            </Select>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 100 }}>
              <Option value="all">全部状态</Option>
              <Option value="活跃">活跃</Option>
              <Option value="跟进中">跟进中</Option>
              <Option value="待签约">待签约</Option>
              <Option value="已签约">已签约</Option>
              <Option value="进行中">进行中</Option>
              <Option value="潜在">潜在</Option>
              <Option value="已转化">已转化</Option>
              <Option value="洽谈中">洽谈中</Option>
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
              {businessCategories.map((category) => (
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

        {/* 营销洞察 */}
        <Col span={10}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LineChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                营销洞察
              </div>
            }
            style={{ height: '100%' }}
          >
            <List
              dataSource={marketingInsights}
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
              columns={detailColumns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '50', '100'],
              }}
              size="middle"
              scroll={{ x: 1200 }}
              bordered
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MarketingReport; 