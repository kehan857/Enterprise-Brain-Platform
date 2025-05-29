import React from 'react';
import { Row, Col, Card, Typography, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  BarChartOutlined, 
  FieldTimeOutlined, 
  RocketOutlined, 
  ToolOutlined, 
  ScheduleOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  ProfileOutlined, 
  LineChartOutlined,
  FundOutlined,
  SettingOutlined,
  AlertOutlined,
  TagsOutlined,
  PartitionOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 生产看板模块数据
const productionDashboards = [
  {
    category: '生产计划与调度',
    items: [
      { 
        key: 'production-planning', 
        title: '生产计划分析', 
        icon: <ScheduleOutlined />, 
        desc: '生产计划的执行情况及调整分析',
        color: '#1890ff',
        tags: ['计划', '执行']
      },
      { 
        key: 'production-scheduling', 
        title: '生产排产分析', 
        icon: <PartitionOutlined />, 
        desc: '生产排期、资源分配及优化分析',
        color: '#1890ff',
        tags: ['排产', '资源']
      },
      { 
        key: 'capacity-planning', 
        title: '产能规划分析', 
        icon: <LineChartOutlined />, 
        desc: '产能规划、利用率及瓶颈分析',
        color: '#1890ff',
        tags: ['产能', '瓶颈']
      }
    ]
  },
  {
    category: '生产执行与监控',
    items: [
      { 
        key: 'production-execution', 
        title: '生产执行分析', 
        icon: <RocketOutlined />, 
        desc: '生产指令执行情况及效率分析',
        color: '#52c41a',
        tags: ['执行', '效率']
      },
      { 
        key: 'production-progress', 
        title: '生产进度分析', 
        icon: <ClockCircleOutlined />, 
        desc: '生产进度完成率及延误分析',
        color: '#52c41a',
        tags: ['进度', '延误']
      },
      { 
        key: 'production-monitoring', 
        title: '生产监控分析', 
        icon: <FundOutlined />, 
        desc: '实时生产数据监控及异常分析',
        color: '#52c41a',
        tags: ['监控', '异常']
      },
      { 
        key: 'production-metrics', 
        title: '生产指标分析', 
        icon: <BarChartOutlined />, 
        desc: '关键生产指标达成情况分析',
        color: '#52c41a',
        tags: ['指标', '达成']
      }
    ]
  },
  {
    category: '产能与效率',
    items: [
      { 
        key: 'capacity-utilization', 
        title: '产能利用分析', 
        icon: <LineChartOutlined />, 
        desc: '设备产能利用率及优化分析',
        color: '#722ed1',
        tags: ['利用率', '优化']
      },
      { 
        key: 'production-efficiency', 
        title: '生产效率分析', 
        icon: <BarChartOutlined />, 
        desc: '生产效率及影响因素分析',
        color: '#722ed1',
        tags: ['效率', '因素']
      },
      { 
        key: 'bottleneck-analysis', 
        title: '瓶颈分析', 
        icon: <AlertOutlined />, 
        desc: '生产瓶颈识别及改进分析',
        color: '#722ed1',
        tags: ['瓶颈', '改进']
      },
      { 
        key: 'line-balance', 
        title: '产线平衡分析', 
        icon: <PartitionOutlined />, 
        desc: '生产线平衡性及优化分析',
        color: '#722ed1',
        tags: ['平衡', '优化']
      }
    ]
  },
  {
    category: '设备与维护',
    items: [
      { 
        key: 'equipment-status', 
        title: '设备状态分析', 
        icon: <ToolOutlined />, 
        desc: '设备运行状态及健康度分析',
        color: '#fa8c16',
        tags: ['状态', '健康']
      },
      { 
        key: 'equipment-utilization', 
        title: '设备利用分析', 
        icon: <SettingOutlined />, 
        desc: '设备利用率及效能分析',
        color: '#fa8c16',
        tags: ['利用', '效能']
      },
      { 
        key: 'maintenance-analysis', 
        title: '设备维护分析', 
        icon: <ToolOutlined />, 
        desc: '设备维护计划执行及效果分析',
        color: '#fa8c16',
        tags: ['维护', '效果']
      },
      { 
        key: 'downtime-analysis', 
        title: '停机分析', 
        icon: <ClockCircleOutlined />, 
        desc: '设备停机原因及影响分析',
        color: '#fa8c16',
        tags: ['停机', '影响']
      }
    ]
  },
  {
    category: '物料与库存',
    items: [
      { 
        key: 'material-consumption', 
        title: '物料消耗分析', 
        icon: <BarChartOutlined />, 
        desc: '生产物料消耗及利用率分析',
        color: '#13c2c2',
        tags: ['消耗', '利用']
      },
      { 
        key: 'material-inventory', 
        title: '物料库存分析', 
        icon: <TagsOutlined />, 
        desc: '生产物料库存水平及周转分析',
        color: '#13c2c2',
        tags: ['库存', '周转']
      },
      { 
        key: 'material-shortage', 
        title: '物料短缺分析', 
        icon: <AlertOutlined />, 
        desc: '物料短缺预警及影响分析',
        color: '#13c2c2',
        tags: ['短缺', '预警']
      }
    ]
  },
  {
    category: '生产质量与成本',
    items: [
      { 
        key: 'quality-inline', 
        title: '在线质量分析', 
        icon: <CheckCircleOutlined />, 
        desc: '生产过程中的质量数据及趋势分析',
        color: '#eb2f96',
        tags: ['质量', '趋势']
      },
      { 
        key: 'defect-analysis', 
        title: '缺陷分析', 
        icon: <AlertOutlined />, 
        desc: '产品缺陷类型、原因及改进分析',
        color: '#eb2f96',
        tags: ['缺陷', '改进']
      },
      { 
        key: 'production-cost', 
        title: '生产成本分析', 
        icon: <BarChartOutlined />, 
        desc: '生产各环节成本构成及变化分析',
        color: '#eb2f96',
        tags: ['成本', '变化']
      },
      { 
        key: 'process-capability', 
        title: '过程能力分析', 
        icon: <LineChartOutlined />, 
        desc: '生产过程能力及稳定性分析',
        color: '#eb2f96',
        tags: ['能力', '稳定']
      }
    ]
  },
  {
    category: '生产追溯与统计',
    items: [
      { 
        key: 'production-traceability', 
        title: '生产追溯分析', 
        icon: <ProfileOutlined />, 
        desc: '产品生产全过程追溯及分析',
        color: '#faad14',
        tags: ['追溯', '全程']
      },
      { 
        key: 'production-statistics', 
        title: '生产统计分析', 
        icon: <BarChartOutlined />, 
        desc: '生产数据的多维度统计分析',
        color: '#faad14',
        tags: ['统计', '多维']
      },
      { 
        key: 'lead-time-analysis', 
        title: '生产周期分析', 
        icon: <FieldTimeOutlined />, 
        desc: '产品生产周期及各环节时间分析',
        color: '#faad14',
        tags: ['周期', '时间']
      }
    ]
  }
];

const ProductionDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (key: string) => {
    // 跳转到对应的大屏页面
    navigate(`/dashboard-center/production/${key}`);
  };
  
  return (
    <div className="production-dashboard">
      {productionDashboards.map((category, categoryIndex) => (
        <div key={category.category}>
          <Title level={5} className="category-title">{category.category}</Title>
          <Row gutter={[16, 16]}>
            {category.items.map(item => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={item.key}>
                <Card 
                  className="dashboard-card"
                  hoverable
                  onClick={() => handleCardClick(item.key)}
                >
                  <div className="dashboard-card-title">
                    {React.cloneElement(item.icon, { style: { color: item.color, marginRight: 8 } })}
                    {item.title}
                  </div>
                  <Paragraph className="dashboard-card-desc">{item.desc}</Paragraph>
                  <div>
                    {item.tags.map(tag => (
                      <Tag color={item.color} key={tag} className="dashboard-tag">{tag}</Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          {categoryIndex < productionDashboards.length - 1 && <Divider className="section-divider" />}
        </div>
      ))}
    </div>
  );
};

export default ProductionDashboard; 