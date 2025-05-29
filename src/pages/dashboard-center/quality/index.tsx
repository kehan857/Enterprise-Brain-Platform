import React from 'react';
import { Row, Col, Card, Typography, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircleOutlined, 
  BarChartOutlined, 
  AlertOutlined, 
  BugOutlined, 
  ExperimentOutlined, 
  ProfileOutlined, 
  LineChartOutlined,
  FileSearchOutlined,
  SafetyOutlined,
  ToolOutlined,
  AuditOutlined,
  ClusterOutlined,
  FileTextOutlined,
  HeatMapOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 质控看板模块数据
const qualityDashboards = [
  {
    category: '质量概览',
    items: [
      { 
        key: 'quality-overview', 
        title: '质量总览', 
        icon: <CheckCircleOutlined />, 
        desc: '企业整体质量状况及关键指标分析',
        color: '#1890ff',
        tags: ['总览', '指标']
      },
      { 
        key: 'quality-trend', 
        title: '质量趋势', 
        icon: <LineChartOutlined />, 
        desc: '各项质量指标的变化趋势分析',
        color: '#1890ff',
        tags: ['趋势', '变化']
      },
      { 
        key: 'quality-metrics', 
        title: '质量指标', 
        icon: <BarChartOutlined />, 
        desc: '关键质量指标达成情况及对比分析',
        color: '#1890ff',
        tags: ['指标', '达成']
      }
    ]
  },
  {
    category: '产品质量',
    items: [
      { 
        key: 'product-quality', 
        title: '产品质量分析', 
        icon: <CheckCircleOutlined />, 
        desc: '产品质量状况及不良率分析',
        color: '#52c41a',
        tags: ['产品', '不良率']
      },
      { 
        key: 'product-defect', 
        title: '产品缺陷分析', 
        icon: <BugOutlined />, 
        desc: '产品缺陷类型、频率及影响分析',
        color: '#52c41a',
        tags: ['缺陷', '影响']
      },
      { 
        key: 'fpy-analysis', 
        title: '一次合格率分析', 
        icon: <BarChartOutlined />, 
        desc: '产品一次合格率及影响因素分析',
        color: '#52c41a',
        tags: ['合格率', '因素']
      },
      { 
        key: 'reliability-test', 
        title: '可靠性测试分析', 
        icon: <ExperimentOutlined />, 
        desc: '产品可靠性测试数据及结果分析',
        color: '#52c41a',
        tags: ['可靠性', '测试']
      }
    ]
  },
  {
    category: '过程质量',
    items: [
      { 
        key: 'process-quality', 
        title: '过程质量分析', 
        icon: <LineChartOutlined />, 
        desc: '生产过程质量状况及波动分析',
        color: '#722ed1',
        tags: ['过程', '波动']
      },
      { 
        key: 'process-capability', 
        title: '过程能力分析', 
        icon: <BarChartOutlined />, 
        desc: '生产过程能力指数及稳定性分析',
        color: '#722ed1',
        tags: ['能力', '稳定']
      },
      { 
        key: 'spc-analysis', 
        title: 'SPC分析', 
        icon: <HeatMapOutlined />, 
        desc: '统计过程控制数据及异常分析',
        color: '#722ed1',
        tags: ['SPC', '异常']
      },
      { 
        key: 'process-variation', 
        title: '过程变异分析', 
        icon: <LineChartOutlined />, 
        desc: '生产过程变异源及影响分析',
        color: '#722ed1',
        tags: ['变异', '影响']
      }
    ]
  },
  {
    category: '供应商质量',
    items: [
      { 
        key: 'supplier-quality', 
        title: '供应商质量分析', 
        icon: <CheckCircleOutlined />, 
        desc: '供应商质量表现及评级分析',
        color: '#fa8c16',
        tags: ['供应商', '评级']
      },
      { 
        key: 'incoming-quality', 
        title: '来料质量分析', 
        icon: <ExperimentOutlined />, 
        desc: '来料检验数据及不良分析',
        color: '#fa8c16',
        tags: ['来料', '检验']
      },
      { 
        key: 'supplier-defect', 
        title: '供应商缺陷分析', 
        icon: <BugOutlined />, 
        desc: '供应商产品缺陷类型及趋势分析',
        color: '#fa8c16',
        tags: ['缺陷', '趋势']
      },
      { 
        key: 'supplier-improvement', 
        title: '供应商改进分析', 
        icon: <LineChartOutlined />, 
        desc: '供应商质量改进项目及效果分析',
        color: '#fa8c16',
        tags: ['改进', '效果']
      }
    ]
  },
  {
    category: '质量检验',
    items: [
      { 
        key: 'inspection-result', 
        title: '检验结果分析', 
        icon: <FileSearchOutlined />, 
        desc: '各检验环节结果及不合格分析',
        color: '#13c2c2',
        tags: ['检验', '结果']
      },
      { 
        key: 'inspection-efficiency', 
        title: '检验效率分析', 
        icon: <BarChartOutlined />, 
        desc: '检验流程效率及优化分析',
        color: '#13c2c2',
        tags: ['效率', '优化']
      },
      { 
        key: 'sampling-analysis', 
        title: '抽样分析', 
        icon: <ExperimentOutlined />, 
        desc: '产品抽样检验结果及代表性分析',
        color: '#13c2c2',
        tags: ['抽样', '分析']
      }
    ]
  },
  {
    category: '质量改进',
    items: [
      { 
        key: 'quality-improvement', 
        title: '质量改进分析', 
        icon: <LineChartOutlined />, 
        desc: '质量改进项目进展及效果分析',
        color: '#eb2f96',
        tags: ['改进', '效果']
      },
      { 
        key: 'defect-prevention', 
        title: '缺陷预防分析', 
        icon: <SafetyOutlined />, 
        desc: '缺陷预防措施及效果分析',
        color: '#eb2f96',
        tags: ['预防', '效果']
      },
      { 
        key: 'root-cause', 
        title: '根本原因分析', 
        icon: <ClusterOutlined />, 
        desc: '质量问题根本原因及解决方案分析',
        color: '#eb2f96',
        tags: ['原因', '解决']
      },
      { 
        key: 'corrective-action', 
        title: '纠正措施分析', 
        icon: <ToolOutlined />, 
        desc: '质量纠正措施执行及效果分析',
        color: '#eb2f96',
        tags: ['纠正', '执行']
      }
    ]
  },
  {
    category: '质量成本与合规',
    items: [
      { 
        key: 'quality-cost', 
        title: '质量成本分析', 
        icon: <BarChartOutlined />, 
        desc: '质量相关成本构成及变化分析',
        color: '#faad14',
        tags: ['成本', '构成']
      },
      { 
        key: 'quality-loss', 
        title: '质量损失分析', 
        icon: <AlertOutlined />, 
        desc: '因质量问题造成的损失分析',
        color: '#faad14',
        tags: ['损失', '分析']
      },
      { 
        key: 'compliance-analysis', 
        title: '合规性分析', 
        icon: <AuditOutlined />, 
        desc: '产品质量合规情况及风险分析',
        color: '#faad14',
        tags: ['合规', '风险']
      },
      { 
        key: 'quality-document', 
        title: '质量文档分析', 
        icon: <FileTextOutlined />, 
        desc: '质量相关文档完整性及执行分析',
        color: '#faad14',
        tags: ['文档', '执行']
      }
    ]
  }
];

const QualityDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (key: string) => {
    // 跳转到对应的大屏页面
    navigate(`/dashboard-center/quality/${key}`);
  };
  
  return (
    <div className="quality-dashboard">
      {qualityDashboards.map((category, categoryIndex) => (
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
          {categoryIndex < qualityDashboards.length - 1 && <Divider className="section-divider" />}
        </div>
      ))}
    </div>
  );
};

export default QualityDashboard; 