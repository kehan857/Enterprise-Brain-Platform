import React from 'react';
import { Row, Col, Card, Typography, Divider, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ExperimentOutlined, 
  BulbOutlined, 
  FileProtectOutlined, 
  RocketOutlined, 
  TeamOutlined, 
  BarChartOutlined, 
  ApartmentOutlined, 
  FieldTimeOutlined, 
  LineChartOutlined,
  FundOutlined,
  CodeOutlined,
  AppstoreAddOutlined,
  ToolOutlined,
  FileSearchOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 研发看板模块数据
const researchDashboards = [
  {
    category: '研发项目概览',
    items: [
      { 
        key: 'rd-overview', 
        title: '研发项目总览', 
        icon: <ApartmentOutlined />, 
        desc: '企业所有研发项目的整体视图及状态',
        color: '#1890ff',
        tags: ['总览', '状态']
      },
      { 
        key: 'rd-progress', 
        title: '项目进度分析', 
        icon: <FieldTimeOutlined />, 
        desc: '研发项目进度、里程碑及延误情况分析',
        color: '#1890ff',
        tags: ['进度', '里程碑']
      },
      { 
        key: 'rd-resource', 
        title: '资源分配分析', 
        icon: <BarChartOutlined />, 
        desc: '研发资源分配、利用率及优化分析',
        color: '#1890ff',
        tags: ['资源', '分配']
      }
    ]
  },
  {
    category: '产品开发',
    items: [
      { 
        key: 'product-development', 
        title: '产品开发分析', 
        icon: <AppstoreAddOutlined />, 
        desc: '新产品开发流程、进度及效率分析',
        color: '#52c41a',
        tags: ['开发', '进度']
      },
      { 
        key: 'product-design', 
        title: '产品设计分析', 
        icon: <ToolOutlined />, 
        desc: '产品设计迭代、评审及优化分析',
        color: '#52c41a',
        tags: ['设计', '迭代']
      },
      { 
        key: 'prototype-analysis', 
        title: '原型分析', 
        icon: <ExperimentOutlined />, 
        desc: '产品原型测试、反馈及改进分析',
        color: '#52c41a',
        tags: ['原型', '测试']
      },
      { 
        key: 'requirement-analysis', 
        title: '需求分析', 
        icon: <FileSearchOutlined />, 
        desc: '产品需求收集、变更及满足度分析',
        color: '#52c41a',
        tags: ['需求', '变更']
      }
    ]
  },
  {
    category: '技术创新',
    items: [
      { 
        key: 'innovation-overview', 
        title: '创新概览', 
        icon: <BulbOutlined />, 
        desc: '技术创新项目、成果及趋势分析',
        color: '#722ed1',
        tags: ['创新', '趋势']
      },
      { 
        key: 'tech-breakthrough', 
        title: '技术突破分析', 
        icon: <RocketOutlined />, 
        desc: '关键技术突破及其影响分析',
        color: '#722ed1',
        tags: ['突破', '影响']
      },
      { 
        key: 'innovation-efficiency', 
        title: '创新效率分析', 
        icon: <BarChartOutlined />, 
        desc: '创新过程效率及障碍分析',
        color: '#722ed1',
        tags: ['效率', '障碍']
      },
      { 
        key: 'tech-roadmap', 
        title: '技术路线图', 
        icon: <ApartmentOutlined />, 
        desc: '公司技术发展路线及规划分析',
        color: '#722ed1',
        tags: ['路线', '规划']
      }
    ]
  },
  {
    category: '知识产权',
    items: [
      { 
        key: 'ip-overview', 
        title: '知识产权概览', 
        icon: <FileProtectOutlined />, 
        desc: '专利、商标等知识产权概况分析',
        color: '#fa8c16',
        tags: ['知识产权', '概况']
      },
      { 
        key: 'patent-analysis', 
        title: '专利分析', 
        icon: <FileProtectOutlined />, 
        desc: '专利申请、授权及价值分析',
        color: '#fa8c16',
        tags: ['专利', '价值']
      },
      { 
        key: 'ip-strategy', 
        title: '知识产权战略', 
        icon: <ApartmentOutlined />, 
        desc: '知识产权布局及战略分析',
        color: '#fa8c16',
        tags: ['战略', '布局']
      },
      { 
        key: 'ip-risk', 
        title: '知识产权风险', 
        icon: <FileSearchOutlined />, 
        desc: '知识产权风险评估及管控分析',
        color: '#fa8c16',
        tags: ['风险', '管控']
      }
    ]
  },
  {
    category: '技术团队',
    items: [
      { 
        key: 'rd-team', 
        title: '研发团队分析', 
        icon: <TeamOutlined />, 
        desc: '研发人员构成、能力及表现分析',
        color: '#13c2c2',
        tags: ['团队', '能力']
      },
      { 
        key: 'team-efficiency', 
        title: '团队效能分析', 
        icon: <BarChartOutlined />, 
        desc: '研发团队协作效率及优化分析',
        color: '#13c2c2',
        tags: ['效能', '协作']
      },
      { 
        key: 'tech-capability', 
        title: '技术能力分析', 
        icon: <ExperimentOutlined />, 
        desc: '团队技术能力差距及提升分析',
        color: '#13c2c2',
        tags: ['能力', '提升']
      }
    ]
  },
  {
    category: '研发效率与质量',
    items: [
      { 
        key: 'rd-quality', 
        title: '研发质量分析', 
        icon: <FileSearchOutlined />, 
        desc: '研发交付物质量及缺陷分析',
        color: '#eb2f96',
        tags: ['质量', '缺陷']
      },
      { 
        key: 'rd-efficiency', 
        title: '研发效率分析', 
        icon: <LineChartOutlined />, 
        desc: '研发流程效率及优化分析',
        color: '#eb2f96',
        tags: ['效率', '优化']
      },
      { 
        key: 'code-quality', 
        title: '代码质量分析', 
        icon: <CodeOutlined />, 
        desc: '代码质量指标及趋势分析',
        color: '#eb2f96',
        tags: ['代码', '指标']
      },
      { 
        key: 'test-coverage', 
        title: '测试覆盖分析', 
        icon: <ExperimentOutlined />, 
        desc: '测试覆盖率及质量分析',
        color: '#eb2f96',
        tags: ['测试', '覆盖']
      }
    ]
  },
  {
    category: '研发投入与产出',
    items: [
      { 
        key: 'rd-investment', 
        title: '研发投入分析', 
        icon: <FundOutlined />, 
        desc: '研发投入构成、变化及效果分析',
        color: '#faad14',
        tags: ['投入', '效果']
      },
      { 
        key: 'rd-output', 
        title: '研发产出分析', 
        icon: <BarChartOutlined />, 
        desc: '研发成果及其商业价值分析',
        color: '#faad14',
        tags: ['产出', '价值']
      },
      { 
        key: 'rd-roi', 
        title: '研发ROI分析', 
        icon: <LineChartOutlined />, 
        desc: '研发投资回报率及优化分析',
        color: '#faad14',
        tags: ['ROI', '优化']
      },
      { 
        key: 'tech-forecast', 
        title: '技术预测分析', 
        icon: <RocketOutlined />, 
        desc: '技术发展趋势及前景预测分析',
        color: '#faad14',
        tags: ['预测', '趋势']
      }
    ]
  }
];

const ResearchDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (key: string) => {
    // 跳转到对应的大屏页面
    navigate(`/dashboard-center/research/${key}`);
  };
  
  return (
    <div className="research-dashboard">
      {researchDashboards.map((category, categoryIndex) => (
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
          {categoryIndex < researchDashboards.length - 1 && <Divider className="section-divider" />}
        </div>
      ))}
    </div>
  );
};

export default ResearchDashboard; 