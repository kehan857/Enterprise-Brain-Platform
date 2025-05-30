import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Table, 
  Space,
  Breadcrumb,
  Statistic,
  Tag,
  Tabs,
  Progress,
  Alert
} from 'antd';
import {
  ArrowLeftOutlined,
  BoxPlotOutlined,
  DollarOutlined,
  UserOutlined,
  ContainerOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  CalendarOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getSalespersonId, getCustomerId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 产品基本信息
interface ProductInfo {
  id: string;
  name: string;
  type: string;
  category: string;
  specifications: string;
  price: number;
  status: string;
  launchDate: string;
  description: string;
  manufacturer: string;
  certification: string[];
}

// 相关合同数据
interface ProductContractRecord {
  key: string;
  contractCode: string;
  customerName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  signDate: string;
  status: string;
  salesperson: string;
  deliveryDate: string;
}

// 客户分布数据
interface CustomerDistribution {
  key: string;
  customerName: string;
  region: string;
  totalOrders: number;
  totalAmount: number;
  lastOrderDate: string;
  salesperson: string;
  customerType: string;
}

// 销售趋势数据
interface SalesTrend {
  month: string;
  quantity: number;
  amount: number;
  orders: number;
}

// 模拟数据
const getProductInfo = (productId: string): ProductInfo => ({
  id: productId,
  name: productId === '1' ? '隔爆型三相异步电动机' : 
        productId === '2' ? '防爆显示控制终端' :
        productId === '3' ? '防爆空调机' : '防爆摄像仪',
  type: productId === '1' ? '箱柜' : 
        productId === '2' ? '仪电' :
        productId === '3' ? '暖通' : '仪电',
  category: '防爆设备',
  specifications: 'IP65防护等级，Ex d IIC T4防爆标准',
  price: productId === '1' ? 45000 : 
         productId === '2' ? 28000 :
         productId === '3' ? 85000 : 32000,
  status: '在产',
  launchDate: '2023-03-15',
  description: '适用于石油、化工、煤矿等危险场所的专业防爆设备',
  manufacturer: '企业大脑智能制造有限公司',
  certification: ['防爆合格证', 'CCC认证', 'ISO9001质量认证', 'CE认证']
});

const productContractData: ProductContractRecord[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    customerName: '深圳创新科技集团',
    quantity: 5,
    unitPrice: 45000,
    totalAmount: 225,
    signDate: '2024-03-01',
    status: '执行中',
    salesperson: '王五',
    deliveryDate: '2024-06-30'
  },
  {
    key: '2',
    contractCode: 'HT2024003',
    customerName: '广州汽车零部件公司',
    quantity: 3,
    unitPrice: 45000,
    totalAmount: 135,
    signDate: '2024-02-25',
    status: '执行中',
    salesperson: '孙七',
    deliveryDate: '2024-07-25'
  },
  {
    key: '3',
    contractCode: 'HT2024007',
    customerName: '北京央企集团',
    quantity: 8,
    unitPrice: 45000,
    totalAmount: 360,
    signDate: '2024-01-15',
    status: '已完成',
    salesperson: '张三',
    deliveryDate: '2024-05-15'
  }
];

const customerDistributionData: CustomerDistribution[] = [
  {
    key: '1',
    customerName: '深圳创新科技集团',
    region: '深圳市南山区',
    totalOrders: 3,
    totalAmount: 680,
    lastOrderDate: '2024-03-01',
    salesperson: '王五',
    customerType: '大客户'
  },
  {
    key: '2',
    customerName: '北京央企集团',
    region: '北京市朝阳区',
    totalOrders: 5,
    totalAmount: 1250,
    lastOrderDate: '2024-01-15',
    salesperson: '张三',
    customerType: '大客户'
  },
  {
    key: '3',
    customerName: '广州汽车零部件公司',
    region: '广州市天河区',
    totalOrders: 2,
    totalAmount: 450,
    lastOrderDate: '2024-02-25',
    salesperson: '孙七',
    customerType: '重点客户'
  }
];

const salesTrendData: SalesTrend[] = [
  { month: '1月', quantity: 12, amount: 540, orders: 3 },
  { month: '2月', quantity: 15, amount: 675, orders: 4 },
  { month: '3月', quantity: 18, amount: 810, orders: 5 },
  { month: '4月', quantity: 22, amount: 990, orders: 6 },
  { month: '5月', quantity: 16, amount: 720, orders: 4 },
  { month: '6月', quantity: 20, amount: 900, orders: 5 }
];

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [activeTab, setActiveTab] = useState('contracts');
  
  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  const productInfo = getProductInfo(productId || '1');

  // 计算统计数据
  const totalContracts = productContractData.length;
  const totalAmount = productContractData.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalQuantity = productContractData.reduce((sum, item) => sum + item.quantity, 0);
  const avgUnitPrice = totalAmount * 10000 / totalQuantity;

  // 合同列表表格列
  const contractColumns: ColumnsType<ProductContractRecord> = [
    {
      title: '合同编码',
      dataIndex: 'contractCode',
      width: 120,
      render: (code: string, record: ProductContractRecord) => (
        <Button 
          type="link" 
          size="small" 
          onClick={() => navigate(`/contract-detail/${record.key}`)}
        >
          {code}
        </Button>
      )
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string, record: ProductContractRecord) => (
        <Button type="link" size="small" onClick={() => navigate(`/customer-360/${getCustomerId(name)}`)}>
          {name}
        </Button>
      )
    },
    {
      title: '采购数量',
      dataIndex: 'quantity',
      width: 100,
      render: (quantity: number) => `${quantity}台`
    },
    {
      title: '单价(元)',
      dataIndex: 'unitPrice',
      width: 120,
      render: (price: number) => `¥${price.toLocaleString()}`
    },
    {
      title: '合同金额(万)',
      dataIndex: 'totalAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '签订日期',
      dataIndex: 'signDate',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '已完成') color = 'green';
        else if (status === '执行中') color = 'blue';
        else if (status === '已发货') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(name)}`)}>
          {name}
        </Button>
      )
    }
  ];

  // 客户分布表格列
  const customerColumns: ColumnsType<CustomerDistribution> = [
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 180,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/customer-360/${getCustomerId(name)}`)}>
          {name}
        </Button>
      )
    },
    {
      title: '地区',
      dataIndex: 'region',
      width: 140
    },
    {
      title: '订单数',
      dataIndex: 'totalOrders',
      width: 80,
      render: (orders: number) => `${orders}单`
    },
    {
      title: '采购金额(万)',
      dataIndex: 'totalAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '最近订单',
      dataIndex: 'lastOrderDate',
      width: 100
    },
    {
      title: '客户类型',
      dataIndex: 'customerType',
      width: 100,
      render: (type: string) => {
        const color = type === '大客户' ? 'red' : type === '重点客户' ? 'orange' : 'blue';
        return <Tag color={color}>{type}</Tag>;
      }
    },
    {
      title: '业务员',
      dataIndex: 'salesperson',
      width: 80,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(name)}`)}>
          {name}
        </Button>
      )
    }
  ];

  // 渲染销售趋势图
  const renderSalesTrendChart = () => (
    <div style={{ height: '200px', padding: '20px', background: '#fafafa', borderRadius: '6px' }}>
      <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#262626' }}>
        销售趋势 (近6个月)
      </div>
      <div style={{ display: 'flex', alignItems: 'end', height: '120px', gap: '8px' }}>
        {salesTrendData.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{ 
                width: '100%', 
                height: `${(item.quantity / 25) * 100}px`,
                background: index === salesTrendData.length - 1 ? '#52c41a' : '#1890ff',
                borderRadius: '2px 2px 0 0',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                paddingBottom: '2px'
              }}
            >
              {item.quantity}
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{item.month}</div>
            <div style={{ fontSize: '10px', color: '#1890ff' }}>{item.orders}单</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#52c41a', textAlign: 'center' }}>
        月均增长: 8.5% | 累计销量: 103台
      </div>
    </div>
  );

  return (
    <div className="page-container">
      {/* 面包屑导航 */}
      <Breadcrumb className="page-breadcrumb">
        <Breadcrumb.Item>
          <Button 
            icon={<ArrowLeftOutlined />} 
            type="link" 
            onClick={() => navigate(-1)}
            className="btn-link"
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>产品详情</Breadcrumb.Item>
        <Breadcrumb.Item>{productInfo.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <BoxPlotOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            {productInfo.name} - 产品详情
          </Title>
        </div>
      </div>

      {/* 产品基本信息 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={[24, 16]}>
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">产品类型：</Text>
                  <Tag color={
                    productInfo.type === '箱柜' ? 'blue' :
                    productInfo.type === '灯具开关' ? 'green' :
                    productInfo.type === '暖通' ? 'orange' : 'purple'
                  }>
                    {productInfo.type}
                  </Tag>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">产品类别：</Text>
                  <Text strong>{productInfo.category}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">产品状态：</Text>
                  <Tag color="green">{productInfo.status}</Tag>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">标准价格：</Text>
                  <Text strong style={{ color: '#52c41a' }}>¥{productInfo.price.toLocaleString()}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">上市时间：</Text>
                  <Text>{productInfo.launchDate}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">制造商：</Text>
                  <Text>{productInfo.manufacturer}</Text>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-item">
                  <Text type="secondary">技术规格：</Text>
                  <Text>{productInfo.specifications}</Text>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-item">
                  <Text type="secondary">产品描述：</Text>
                  <Text>{productInfo.description}</Text>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-item">
                  <Text type="secondary">认证资质：</Text>
                  <Space>
                    {productInfo.certification.map((cert, index) => (
                      <Tag key={index} color="blue">{cert}</Tag>
                    ))}
                  </Space>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={8}>
            <Card size="small" className="metric-card">
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="合同总数"
                    value={totalContracts}
                    suffix="个"
                    valueStyle={{ fontSize: '18px', color: '#1890ff' }}
                    prefix={<ContainerOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="累计销量"
                    value={totalQuantity}
                    suffix="台"
                    valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                    prefix={<ShopOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Statistic
                    title="销售总额"
                    value={totalAmount}
                    suffix="万元"
                    valueStyle={{ fontSize: '18px', color: '#faad14' }}
                    prefix={<DollarOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="平均单价"
                    value={Math.round(avgUnitPrice)}
                    suffix="元"
                    valueStyle={{ fontSize: '18px', color: '#722ed1' }}
                    prefix={<TrophyOutlined />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 销售趋势 */}
      <Card 
        title={
          <div className="flex-start">
            <LineChartOutlined style={{ color: '#1890ff', marginRight: 8 }} />
            销售趋势分析
          </div>
        }
        className="analysis-card card-mb-24"
        size="small"
      >
        {renderSalesTrendChart()}
      </Card>

      {/* 详细信息标签页 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={`相关合同 (${productContractData.length})`} key="contracts">
            <Table
              columns={contractColumns}
              dataSource={productContractData}
              pagination={false}
              size="middle"
              summary={(pageData) => {
                const totalQuantitySum = pageData.reduce((sum, record) => sum + record.quantity, 0);
                const totalAmountSum = pageData.reduce((sum, record) => sum + record.totalAmount, 0);
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2}>
                        <Text strong>合计</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>{totalQuantitySum}台</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} />
                      <Table.Summary.Cell index={3}>
                        <Text strong>¥{totalAmountSum.toLocaleString()}万</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4} colSpan={3} />
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </TabPane>
          
          <TabPane tab={`客户分布 (${customerDistributionData.length})`} key="customers">
            <Table
              columns={customerColumns}
              dataSource={customerDistributionData}
              pagination={false}
              size="middle"
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProductDetail; 