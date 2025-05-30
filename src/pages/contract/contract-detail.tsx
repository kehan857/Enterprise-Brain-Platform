import React, { useState } from 'react';
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
  Tabs,
  Tag,
  Progress,
  Timeline,
  Descriptions,
  Alert,
  Steps
} from 'antd';
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  DollarOutlined,
  TruckOutlined,
  AccountBookOutlined,
  HistoryOutlined,
  UserOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getSalespersonId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

// 合同基本信息
interface ContractInfo {
  id: string;
  contractCode: string;
  customerName: string;
  customerId: string;
  amount: number;
  signDate: string;
  deliveryDate: string;
  salesperson: string;
  businessUnit: string;
  status: string;
  paymentTerms: string;
  deliveryTerms: string;
  qualityRequirements: string;
  warranty: string;
}

// 产品明细
interface ProductDetail {
  key: string;
  productName: string;
  model: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  deliveryDate: string;
  status: string;
}

// 发货记录
interface DeliveryRecord {
  key: string;
  deliveryCode: string;
  deliveryDate: string;
  products: string;
  quantity: number;
  amount: number;
  receiver: string;
  status: string;
  logistics: string;
  trackingNumber: string;
}

// 回款记录
interface PaymentRecord {
  key: string;
  paymentCode: string;
  paymentDate: string;
  amount: number;
  method: string;
  status: string;
  bankAccount: string;
  remark: string;
}

// 开票记录
interface InvoiceRecord {
  key: string;
  invoiceCode: string;
  invoiceDate: string;
  amount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  status: string;
  type: string;
}

// 变更记录
interface ChangeRecord {
  key: string;
  changeDate: string;
  changeType: string;
  changeContent: string;
  reason: string;
  applicant: string;
  approver: string;
  status: string;
}

// 模拟数据
const contractInfo: ContractInfo = {
  id: '1',
  contractCode: 'HT2024001',
  customerName: '北京科技有限公司',
  customerId: '1',
  amount: 580,
  signDate: '2024-01-15',
  deliveryDate: '2024-06-30',
  salesperson: '张三',
  businessUnit: '华北事业部',
  status: '执行中',
  paymentTerms: '签约付30%，发货前付40%，验收后付30%',
  deliveryTerms: '工厂交货（EXW）',
  qualityRequirements: '符合国家标准GB/T19001-2016',
  warranty: '设备质保2年，软件质保1年'
};

const productDetails: ProductDetail[] = [
  {
    key: '1',
    productName: '智能控制设备',
    model: 'ZK-2024A',
    quantity: 2,
    unit: '套',
    unitPrice: 180,
    totalPrice: 360,
    deliveryDate: '2024-05-15',
    status: '已发货'
  },
  {
    key: '2',
    productName: '配套软件系统',
    model: 'SW-V2.0',
    quantity: 1,
    unit: '套',
    unitPrice: 120,
    totalPrice: 120,
    deliveryDate: '2024-06-01',
    status: '已交付'
  },
  {
    key: '3',
    productName: '安装调试服务',
    model: 'SRV-001',
    quantity: 1,
    unit: '次',
    unitPrice: 80,
    totalPrice: 80,
    deliveryDate: '2024-06-15',
    status: '进行中'
  },
  {
    key: '4',
    productName: '培训服务',
    model: 'TRN-001',
    quantity: 1,
    unit: '次',
    unitPrice: 20,
    totalPrice: 20,
    deliveryDate: '2024-06-30',
    status: '待开始'
  }
];

const deliveryRecords: DeliveryRecord[] = [
  {
    key: '1',
    deliveryCode: 'SH2024001',
    deliveryDate: '2024-05-10',
    products: '智能控制设备 ZK-2024A × 2套',
    quantity: 2,
    amount: 360,
    receiver: '张总',
    status: '已收货',
    logistics: '顺丰快递',
    trackingNumber: 'SF1234567890'
  },
  {
    key: '2',
    deliveryCode: 'SH2024002',
    deliveryDate: '2024-05-28',
    products: '配套软件系统 SW-V2.0 × 1套',
    quantity: 1,
    amount: 120,
    receiver: '李工程师',
    status: '已签收',
    logistics: '专人送达',
    trackingNumber: '-'
  }
];

const paymentRecords: PaymentRecord[] = [
  {
    key: '1',
    paymentCode: 'HK2024001',
    paymentDate: '2024-01-20',
    amount: 174,
    method: '银行转账',
    status: '已到账',
    bankAccount: '工商银行 ****1234',
    remark: '首期款（30%）'
  },
  {
    key: '2',
    paymentCode: 'HK2024002',
    paymentDate: '2024-05-08',
    amount: 232,
    method: '银行转账',
    status: '已到账',
    bankAccount: '工商银行 ****1234',
    remark: '发货前付款（40%）'
  }
];

const invoiceRecords: InvoiceRecord[] = [
  {
    key: '1',
    invoiceCode: 'FP2024001',
    invoiceDate: '2024-01-25',
    amount: 174,
    taxRate: 13,
    taxAmount: 22.62,
    totalAmount: 196.62,
    status: '已开具',
    type: '增值税专用发票'
  },
  {
    key: '2',
    invoiceCode: 'FP2024002',
    invoiceDate: '2024-05-15',
    amount: 232,
    taxRate: 13,
    taxAmount: 30.16,
    totalAmount: 262.16,
    status: '已开具',
    type: '增值税专用发票'
  }
];

const changeRecords: ChangeRecord[] = [
  {
    key: '1',
    changeDate: '2024-03-15',
    changeType: '交货期调整',
    changeContent: '原交货期2024-05-30调整为2024-06-30',
    reason: '客户要求延期，配合客户项目进度',
    applicant: '张三',
    approver: '李经理',
    status: '已批准'
  },
  {
    key: '2',
    changeDate: '2024-02-20',
    changeType: '产品规格调整',
    changeContent: '软件系统版本从V1.5升级到V2.0',
    reason: '客户需求变更，要求更高版本',
    applicant: '张三',
    approver: '王总监',
    status: '已批准'
  }
];

const ContractDetail: React.FC = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const [activeTab, setActiveTab] = useState('products');

  // 计算执行进度
  const calculateProgress = () => {
    const totalAmount = contractInfo.amount;
    const paidAmount = paymentRecords.reduce((sum, record) => 
      record.status === '已到账' ? sum + record.amount : sum, 0
    );
    const deliveredAmount = deliveryRecords.reduce((sum, record) => 
      record.status === '已收货' || record.status === '已签收' ? sum + record.amount : sum, 0
    );
    
    return {
      paymentProgress: Math.round((paidAmount / totalAmount) * 100),
      deliveryProgress: Math.round((deliveredAmount / totalAmount) * 100),
      paidAmount,
      deliveredAmount,
      remainingAmount: totalAmount - paidAmount
    };
  };

  const progress = calculateProgress();

  const productColumns: ColumnsType<ProductDetail> = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      width: 150
    },
    {
      title: '型号规格',
      dataIndex: 'model',
      width: 120
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: 80,
      render: (quantity: number, record: ProductDetail) => `${quantity} ${record.unit}`
    },
    {
      title: '单价(万)',
      dataIndex: 'unitPrice',
      width: 100,
      render: (price: number) => `¥${price.toLocaleString()}`
    },
    {
      title: '金额(万)',
      dataIndex: 'totalPrice',
      width: 100,
      render: (price: number) => `¥${price.toLocaleString()}`
    },
    {
      title: '交货日期',
      dataIndex: 'deliveryDate',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '已发货' || status === '已交付') color = 'green';
        else if (status === '进行中') color = 'blue';
        else if (status === '待开始') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  const deliveryColumns: ColumnsType<DeliveryRecord> = [
    {
      title: '发货单号',
      dataIndex: 'deliveryCode'
    },
    {
      title: '发货日期',
      dataIndex: 'deliveryDate'
    },
    {
      title: '发货产品',
      dataIndex: 'products',
      width: 200
    },
    {
      title: '数量',
      dataIndex: 'quantity'
    },
    {
      title: '金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '收货人',
      dataIndex: 'receiver'
    },
    {
      title: '物流公司',
      dataIndex: 'logistics'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已收货' || status === '已签收' ? 'green' : 'blue';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  const paymentColumns: ColumnsType<PaymentRecord> = [
    {
      title: '回款单号',
      dataIndex: 'paymentCode'
    },
    {
      title: '回款日期',
      dataIndex: 'paymentDate'
    },
    {
      title: '回款金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '付款方式',
      dataIndex: 'method'
    },
    {
      title: '银行账户',
      dataIndex: 'bankAccount'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已到账' ? 'green' : 'blue';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ];

  const invoiceColumns: ColumnsType<InvoiceRecord> = [
    {
      title: '发票号码',
      dataIndex: 'invoiceCode'
    },
    {
      title: '开票日期',
      dataIndex: 'invoiceDate'
    },
    {
      title: '不含税金额(万)',
      dataIndex: 'amount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '税率',
      dataIndex: 'taxRate',
      render: (rate: number) => `${rate}%`
    },
    {
      title: '税额(万)',
      dataIndex: 'taxAmount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '价税合计(万)',
      dataIndex: 'totalAmount',
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '发票类型',
      dataIndex: 'type'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已开具' ? 'green' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  const changeColumns: ColumnsType<ChangeRecord> = [
    {
      title: '变更日期',
      dataIndex: 'changeDate'
    },
    {
      title: '变更类型',
      dataIndex: 'changeType'
    },
    {
      title: '变更内容',
      dataIndex: 'changeContent',
      width: 300
    },
    {
      title: '变更原因',
      dataIndex: 'reason',
      width: 200
    },
    {
      title: '申请人',
      dataIndex: 'applicant'
    },
    {
      title: '审批人',
      dataIndex: 'approver'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '已批准' ? 'green' : status === '审批中' ? 'blue' : 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    }
  ];

  return (
    <div style={{ padding: '0' }}>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Button 
            icon={<ArrowLeftOutlined />} 
            type="link" 
            onClick={() => navigate(-1)}
          >
            返回
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>合同管理</Breadcrumb.Item>
        <Breadcrumb.Item>合同详情</Breadcrumb.Item>
        <Breadcrumb.Item>{contractInfo.contractCode}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <Title level={4} style={{ marginBottom: 24 }}>
        <FileTextOutlined style={{ marginRight: 8, color: '#52c41a' }} />
        合同详情 - {contractInfo.contractCode}
      </Title>

      {/* 合同基本信息 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={16}>
            <Descriptions title="合同基本信息" column={2}>
              <Descriptions.Item label="合同编号">{contractInfo.contractCode}</Descriptions.Item>
              <Descriptions.Item label="合同状态">
                <Tag color={contractInfo.status === '已完成' ? 'green' : 'blue'}>{contractInfo.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="客户名称">
                <Button 
                  type="link" 
                  onClick={() => navigate(`/customer-360/${contractInfo.customerId}`)}
                >
                  {contractInfo.customerName}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="合同金额">
                <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
                  ¥{contractInfo.amount.toLocaleString()}万元
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="签订日期">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {contractInfo.signDate}
              </Descriptions.Item>
              <Descriptions.Item label="交货日期">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {contractInfo.deliveryDate}
              </Descriptions.Item>
              <Descriptions.Item label="负责业务员">
                <UserOutlined style={{ marginRight: 4 }} />
                <Button type="link" onClick={() => navigate(`/salesperson-detail/${getSalespersonId(contractInfo.salesperson)}`)}>
                  {contractInfo.salesperson}
                </Button>
              </Descriptions.Item>
              <Descriptions.Item label="所属事业部">{contractInfo.businessUnit}</Descriptions.Item>
              <Descriptions.Item label="付款条款" span={2}>{contractInfo.paymentTerms}</Descriptions.Item>
              <Descriptions.Item label="交货条款" span={2}>{contractInfo.deliveryTerms}</Descriptions.Item>
              <Descriptions.Item label="质量要求" span={2}>{contractInfo.qualityRequirements}</Descriptions.Item>
              <Descriptions.Item label="质保条款" span={2}>{contractInfo.warranty}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <Card size="small" style={{ height: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Title level={5}>执行进度概览</Title>
                <Steps direction="vertical" size="small" current={2}>
                  <Step 
                    title="合同签订" 
                    description="2024-01-15"
                    status="finish"
                    icon={<CheckCircleOutlined />}
                  />
                  <Step 
                    title="发货执行" 
                    description={`${progress.deliveryProgress}% 已完成`}
                    status="process"
                    icon={<TruckOutlined />}
                  />
                  <Step 
                    title="回款执行" 
                    description={`${progress.paymentProgress}% 已完成`}
                    status="process"
                    icon={<AccountBookOutlined />}
                  />
                  <Step 
                    title="合同完结" 
                    description="待完成"
                    status="wait"
                    icon={<ClockCircleOutlined />}
                  />
                </Steps>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 执行进度条 */}
      <Card title="执行进度跟踪" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={8}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Title level={5}>签订进度</Title>
              <Progress
                type="circle"
                percent={100}
                strokeColor="#52c41a"
                format={() => '已签订'}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">签订日期: {contractInfo.signDate}</Text>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Title level={5}>发货进度</Title>
              <Progress
                type="circle"
                percent={progress.deliveryProgress}
                strokeColor={progress.deliveryProgress === 100 ? "#52c41a" : "#1890ff"}
                format={() => `${progress.deliveryProgress}%`}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">已发货: ¥{progress.deliveredAmount}万</Text>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Title level={5}>回款进度</Title>
              <Progress
                type="circle"
                percent={progress.paymentProgress}
                strokeColor={progress.paymentProgress === 100 ? "#52c41a" : "#13c2c2"}
                format={() => `${progress.paymentProgress}%`}
              />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">已回款: ¥{progress.paidAmount}万</Text>
                <br />
                <Text type="secondary">待回款: ¥{progress.remainingAmount}万</Text>
              </div>
            </div>
          </Col>
        </Row>
        
        {progress.remainingAmount > 0 && (
          <Alert
            message="回款提醒"
            description={`还有¥${progress.remainingAmount}万元待回款，建议及时跟进客户付款情况。`}
            type="warning"
            icon={<WarningOutlined />}
            showIcon
            style={{ marginTop: 16 }}
          />
        )}
      </Card>

      {/* 详细信息标签页 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={`产品明细 (${productDetails.length})`} key="products">
            <Table
              columns={productColumns}
              dataSource={productDetails}
              pagination={false}
              size="middle"
              summary={(pageData) => {
                const totalAmount = pageData.reduce((sum, record) => sum + record.totalPrice, 0);
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4}>
                        <Text strong>合计</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>¥{totalAmount.toLocaleString()}万</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={2} />
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </TabPane>
          
          <TabPane tab={`发货记录 (${deliveryRecords.length})`} key="deliveries">
            <Table
              columns={deliveryColumns}
              dataSource={deliveryRecords}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`回款记录 (${paymentRecords.length})`} key="payments">
            <Table
              columns={paymentColumns}
              dataSource={paymentRecords}
              pagination={false}
              size="middle"
              summary={(pageData) => {
                const totalPayment = pageData.reduce((sum, record) => 
                  record.status === '已到账' ? sum + record.amount : sum, 0
                );
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2}>
                        <Text strong>已回款合计</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>¥{totalPayment.toLocaleString()}万</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={4} />
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </TabPane>
          
          <TabPane tab={`开票记录 (${invoiceRecords.length})`} key="invoices">
            <Table
              columns={invoiceColumns}
              dataSource={invoiceRecords}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`变更记录 (${changeRecords.length})`} key="changes">
            <Table
              columns={changeColumns}
              dataSource={changeRecords}
              pagination={false}
              size="middle"
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ContractDetail; 