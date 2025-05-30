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
  Avatar,
  List
} from 'antd';
import {
  ArrowLeftOutlined,
  TeamOutlined,
  UserOutlined,
  TrophyOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
  ContainerOutlined,
  LineChartOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getCustomerId } from '@/utils/navigation';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 班组基本信息
interface TeamInfo {
  id: string;
  name: string;
  department: string;
  leader: string;
  memberCount: number;
  establishDate: string;
  description: string;
  location: string;
  contact: string;
  email: string;
  specialties: string[];
}

// 班组成员信息
interface TeamMember {
  key: string;
  name: string;
  position: string;
  level: string;
  joinDate: string;
  phone: string;
  email: string;
  performance: number;
  skills: string[];
}

// 班组业绩记录
interface TeamPerformance {
  key: string;
  contractCode: string;
  projectName: string;
  customerName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
  leader: string;
}

// 工作任务
interface WorkTask {
  key: string;
  taskName: string;
  taskType: string;
  priority: string;
  assignee: string;
  startDate: string;
  deadline: string;
  status: string;
  progress: number;
  description: string;
}

// 月度业绩趋势
interface MonthlyPerformance {
  month: string;
  projects: number;
  amount: number;
  completion: number;
}

// 模拟数据
const getTeamInfo = (teamId: string): TeamInfo => ({
  id: teamId,
  name: teamId === '1' ? '隔爆组' : 
        teamId === '2' ? '监控组' :
        teamId === '3' ? '空调组' : '技术组',
  department: teamId === '1' ? '工控事业部' : 
              teamId === '2' ? '智能制造部' :
              teamId === '3' ? '空调事业部' : '技术管理部',
  leader: teamId === '1' ? '张工程师' : 
          teamId === '2' ? '李主管' :
          teamId === '3' ? '王组长' : '赵专家',
  memberCount: teamId === '1' ? 8 : 
               teamId === '2' ? 6 :
               teamId === '3' ? 10 : 5,
  establishDate: '2020-06-15',
  description: '专业负责防爆设备的设计、制造、测试和维护工作',
  location: '生产车间A区',
  contact: '0755-88888888',
  email: 'team@company.com',
  specialties: ['防爆技术', '电气控制', '质量检测', '设备维护']
});

const teamMemberData: TeamMember[] = [
  {
    key: '1',
    name: '张工程师',
    position: '班组长',
    level: '高级工程师',
    joinDate: '2020-06-15',
    phone: '138****8888',
    email: 'zhang@company.com',
    performance: 95,
    skills: ['防爆设计', '项目管理', '质量控制']
  },
  {
    key: '2',
    name: '李技术员',
    position: '技术骨干',
    level: '工程师',
    joinDate: '2021-03-10',
    phone: '139****9999',
    email: 'li@company.com',
    performance: 88,
    skills: ['电路设计', '测试验证', '技术支持']
  },
  {
    key: '3',
    name: '王师傅',
    position: '生产主管',
    level: '高级技师',
    joinDate: '2020-08-20',
    phone: '137****7777',
    email: 'wang@company.com',
    performance: 92,
    skills: ['生产工艺', '设备操作', '质量把控']
  },
  {
    key: '4',
    name: '刘技师',
    position: '质检员',
    level: '技师',
    joinDate: '2022-01-15',
    phone: '136****6666',
    email: 'liu@company.com',
    performance: 85,
    skills: ['质量检测', '标准规范', '数据分析']
  }
];

const teamPerformanceData: TeamPerformance[] = [
  {
    key: '1',
    contractCode: 'HT2024001',
    projectName: '隔爆电机生产项目',
    customerName: '深圳创新科技集团',
    amount: 225,
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: '进行中',
    progress: 75,
    leader: '张工程师'
  },
  {
    key: '2',
    contractCode: 'HT2024003',
    projectName: '防爆设备定制项目',
    customerName: '广州汽车零部件公司',
    amount: 135,
    startDate: '2024-02-25',
    endDate: '2024-07-25',
    status: '进行中',
    progress: 60,
    leader: '张工程师'
  },
  {
    key: '3',
    contractCode: 'HT2024007',
    projectName: '批量生产项目',
    customerName: '北京央企集团',
    amount: 360,
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    status: '已完成',
    progress: 100,
    leader: '张工程师'
  }
];

const workTaskData: WorkTask[] = [
  {
    key: '1',
    taskName: '防爆电机外壳设计',
    taskType: '设计任务',
    priority: '高',
    assignee: '张工程师',
    startDate: '2024-03-01',
    deadline: '2024-03-15',
    status: '已完成',
    progress: 100,
    description: '完成新型防爆电机外壳的结构设计'
  },
  {
    key: '2',
    taskName: '生产工艺优化',
    taskType: '工艺改进',
    priority: '中',
    assignee: '王师傅',
    startDate: '2024-03-10',
    deadline: '2024-03-25',
    status: '进行中',
    progress: 80,
    description: '优化隔爆电机的生产装配工艺流程'
  },
  {
    key: '3',
    taskName: '质量检测标准制定',
    taskType: '标准化',
    priority: '中',
    assignee: '刘技师',
    startDate: '2024-03-15',
    deadline: '2024-04-01',
    status: '待开始',
    progress: 0,
    description: '制定新产品的质量检测标准和流程'
  }
];

const monthlyPerformanceData: MonthlyPerformance[] = [
  { month: '1月', projects: 2, amount: 360, completion: 95 },
  { month: '2月', projects: 3, amount: 450, completion: 88 },
  { month: '3月', projects: 4, amount: 520, completion: 92 },
  { month: '4月', projects: 3, amount: 380, completion: 85 },
  { month: '5月', projects: 4, amount: 480, completion: 90 },
  { month: '6月', projects: 5, amount: 620, completion: 96 }
];

const TeamDetail: React.FC = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState('members');
  
  // 确保页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [teamId]);
  
  const teamInfo = getTeamInfo(teamId || '1');

  // 计算统计数据
  const totalProjects = teamPerformanceData.length;
  const totalAmount = teamPerformanceData.reduce((sum, item) => sum + item.amount, 0);
  const avgPerformance = teamMemberData.reduce((sum, member) => sum + member.performance, 0) / teamMemberData.length;
  const activeProjects = teamPerformanceData.filter(item => item.status === '进行中').length;

  // 成员列表表格列
  const memberColumns: ColumnsType<TeamMember> = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      render: (name: string, record: TeamMember) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          <Text strong={record.position === '班组长'}>{name}</Text>
          {record.position === '班组长' && <Tag color="red">组长</Tag>}
        </Space>
      )
    },
    {
      title: '职位',
      dataIndex: 'position',
      width: 100
    },
    {
      title: '职级',
      dataIndex: 'level',
      width: 120,
      render: (level: string) => {
        const color = level.includes('高级') ? 'red' : level.includes('工程师') ? 'blue' : 'green';
        return <Tag color={color}>{level}</Tag>;
      }
    },
    {
      title: '入职时间',
      dataIndex: 'joinDate',
      width: 100
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 120
    },
    {
      title: '绩效评分',
      dataIndex: 'performance',
      width: 120,
      render: (score: number) => (
        <Space>
          <Progress 
            percent={score} 
            size="small" 
            strokeColor={score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#ff4d4f'}
            showInfo={false}
            style={{ width: 60 }}
          />
          <Text style={{ color: score >= 90 ? '#52c41a' : score >= 80 ? '#faad14' : '#ff4d4f' }}>
            {score}分
          </Text>
        </Space>
      )
    },
    {
      title: '专业技能',
      dataIndex: 'skills',
      render: (skills: string[]) => (
        <Space wrap>
          {skills.map((skill, index) => (
            <Tag key={index} color="blue">{skill}</Tag>
          ))}
        </Space>
      )
    }
  ];

  // 业绩记录表格列
  const performanceColumns: ColumnsType<TeamPerformance> = [
    {
      title: '合同编码',
      dataIndex: 'contractCode',
      width: 120,
      render: (code: string, record: TeamPerformance) => (
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
      title: '项目名称',
      dataIndex: 'projectName',
      width: 180
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      width: 160,
      render: (name: string) => (
        <Button type="link" size="small" onClick={() => navigate(`/customer-360/${getCustomerId(name)}`)}>
          {name}
        </Button>
      )
    },
    {
      title: '项目金额(万)',
      dataIndex: 'amount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      width: 100
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      width: 100
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        if (status === '已完成') color = 'green';
        else if (status === '进行中') color = 'blue';
        else if (status === '已暂停') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: '进度',
      dataIndex: 'progress',
      width: 120,
      render: (progress: number) => (
        <Progress 
          percent={progress} 
          size="small" 
          strokeColor={progress === 100 ? '#52c41a' : '#1890ff'}
        />
      )
    }
  ];

  // 任务列表表格列
  const taskColumns: ColumnsType<WorkTask> = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      width: 180
    },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      width: 100,
      render: (type: string) => (
        <Tag color="blue">{type}</Tag>
      )
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      width: 80,
      render: (priority: string) => {
        const color = priority === '高' ? 'red' : priority === '中' ? 'orange' : 'green';
        return <Tag color={color}>{priority}</Tag>;
      }
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      width: 100
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      width: 100
    },
    {
      title: '截止时间',
      dataIndex: 'deadline',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        let icon = null;
        if (status === '已完成') {
          color = 'green';
          icon = <CheckCircleOutlined />;
        } else if (status === '进行中') {
          color = 'blue';
          icon = <ClockCircleOutlined />;
        } else if (status === '待开始') {
          color = 'orange';
          icon = <ExclamationCircleOutlined />;
        }
        return <Tag color={color} icon={icon}>{status}</Tag>;
      }
    },
    {
      title: '进度',
      dataIndex: 'progress',
      width: 120,
      render: (progress: number) => (
        <Progress 
          percent={progress} 
          size="small" 
          strokeColor={progress === 100 ? '#52c41a' : '#1890ff'}
        />
      )
    }
  ];

  // 渲染月度业绩趋势图
  const renderMonthlyPerformanceChart = () => (
    <div style={{ height: '200px', padding: '20px', background: '#fafafa', borderRadius: '6px' }}>
      <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#262626' }}>
        班组月度业绩趋势 (近6个月)
      </div>
      <div style={{ display: 'flex', alignItems: 'end', height: '120px', gap: '8px' }}>
        {monthlyPerformanceData.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{ 
                width: '100%', 
                height: `${(item.amount / 700) * 100}px`,
                background: index === monthlyPerformanceData.length - 1 ? '#52c41a' : '#1890ff',
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
              {item.amount}
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{item.month}</div>
            <div style={{ fontSize: '10px', color: '#52c41a' }}>{item.completion}%</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '8px', fontSize: '12px', color: '#52c41a', textAlign: 'center' }}>
        平均完成率: 91% | 月均产值: 468万元
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
        <Breadcrumb.Item>班组详情</Breadcrumb.Item>
        <Breadcrumb.Item>{teamInfo.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* 页面标题 */}
      <div className="page-header">
        <div>
          <Title level={4} className="page-title">
            <TeamOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            {teamInfo.name} - 班组详情
          </Title>
        </div>
      </div>

      {/* 班组基本信息 */}
      <Card className="analysis-card card-mb-24">
        <Row gutter={[24, 16]}>
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">所属部门：</Text>
                  <Text strong>{teamInfo.department}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">班组长：</Text>
                  <Text strong style={{ color: '#1890ff' }}>{teamInfo.leader}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">人员数量：</Text>
                  <Text strong>{teamInfo.memberCount}人</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">成立时间：</Text>
                  <Text>{teamInfo.establishDate}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">工作地点：</Text>
                  <Text>{teamInfo.location}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div className="info-item">
                  <Text type="secondary">联系电话：</Text>
                  <Text>{teamInfo.contact}</Text>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-item">
                  <Text type="secondary">班组描述：</Text>
                  <Text>{teamInfo.description}</Text>
                </div>
              </Col>
              <Col span={24}>
                <div className="info-item">
                  <Text type="secondary">专业领域：</Text>
                  <Space>
                    {teamInfo.specialties.map((specialty, index) => (
                      <Tag key={index} color="green">{specialty}</Tag>
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
                    title="项目总数"
                    value={totalProjects}
                    suffix="个"
                    valueStyle={{ fontSize: '18px', color: '#1890ff' }}
                    prefix={<ContainerOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="进行中项目"
                    value={activeProjects}
                    suffix="个"
                    valueStyle={{ fontSize: '18px', color: '#52c41a' }}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Statistic
                    title="总产值"
                    value={totalAmount}
                    suffix="万元"
                    valueStyle={{ fontSize: '18px', color: '#faad14' }}
                    prefix={<DollarOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="平均绩效"
                    value={Math.round(avgPerformance)}
                    suffix="分"
                    valueStyle={{ fontSize: '18px', color: '#722ed1' }}
                    prefix={<TrophyOutlined />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 月度业绩趋势 */}
      <Card 
        title={
          <div className="flex-start">
            <LineChartOutlined style={{ color: '#52c41a', marginRight: 8 }} />
            班组业绩趋势分析
          </div>
        }
        className="analysis-card card-mb-24"
        size="small"
      >
        {renderMonthlyPerformanceChart()}
      </Card>

      {/* 详细信息标签页 */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={`班组成员 (${teamMemberData.length})`} key="members">
            <Table
              columns={memberColumns}
              dataSource={teamMemberData}
              pagination={false}
              size="middle"
            />
          </TabPane>
          
          <TabPane tab={`业绩记录 (${teamPerformanceData.length})`} key="performance">
            <Table
              columns={performanceColumns}
              dataSource={teamPerformanceData}
              pagination={false}
              size="middle"
              summary={(pageData) => {
                const totalAmountSum = pageData.reduce((sum, record) => sum + record.amount, 0);
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={3}>
                        <Text strong>合计</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>¥{totalAmountSum.toLocaleString()}万</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} colSpan={4} />
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </TabPane>
          
          <TabPane tab={`工作任务 (${workTaskData.length})`} key="tasks">
            <Table
              columns={taskColumns}
              dataSource={workTaskData}
              pagination={false}
              size="middle"
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TeamDetail; 