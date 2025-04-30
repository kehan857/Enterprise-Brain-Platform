import React from 'react';
import { Card, List, Tag, Button, Space, Tabs } from 'antd';
import { DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';

interface AnalysisReport {
  id: string;
  title: string;
  domain: string;
  createTime: string;
  status: 'new' | 'read';
  summary: string;
  findings: string[];
}

const AnalysisReport: React.FC = () => {
  const reports: AnalysisReport[] = [
    {
      id: '1',
      title: '2024年1月生产效率分析报告',
      domain: '生产',
      createTime: '2024-01-20 15:30:00',
      status: 'new',
      summary: '本月生产线整体效率提升3.5%，但2号线存在效率波动问题',
      findings: [
        '产线平均OEE为85.6%，环比提升3.5%',
        '2号线效率波动明显，建议排查设备状态',
        '原材料库存周转率提升2.1%',
      ],
    },
    {
      id: '2',
      title: '2024年1月质量分析报告',
      domain: '质量',
      createTime: '2024-01-20 14:00:00',
      status: 'read',
      summary: '产品合格率保持稳定，A类产品质量有提升空间',
      findings: [
        '整体合格率98.5%，符合目标要求',
        'A类产品一次合格率有下降趋势',
        '质量问题主要集中在表面处理环节',
      ],
    },
  ];

  return (
    <div>
      <Card>
        <Tabs
          defaultActiveKey="all"
          items={[
            {
              key: 'all',
              label: '全部报告',
              children: (
                <List
                  dataSource={reports}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button type="link" icon={<DownloadOutlined />}>下载</Button>,
                        <Button type="link" icon={<ShareAltOutlined />}>分享</Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Space>
                            {item.title}
                            {item.status === 'new' && (
                              <Tag color="#f50">新</Tag>
                            )}
                          </Space>
                        }
                        description={`${item.domain} · ${item.createTime}`}
                      />
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: 'production',
              label: '生产报告',
              children: 'Content of Production Tab',
            },
            {
              key: 'quality',
              label: '质量报告',
              children: 'Content of Quality Tab',
            },
            {
              key: 'supply',
              label: '供应链报告',
              children: 'Content of Supply Tab',
            },
          ]}
        />
      </Card>

      <Card title="报告详情" style={{ marginTop: 24 }}>
        <h3>2024年1月生产效率分析报告</h3>
        
        <Card type="inner" title="报告摘要" style={{ marginBottom: 16 }}>
          <p>{reports[0].summary}</p>
        </Card>

        <Card type="inner" title="关键发现">
          <ul>
            {reports[0].findings.map((finding, index) => (
              <li key={index}>{finding}</li>
            ))}
          </ul>
        </Card>

        <Card type="inner" title="趋势图表" style={{ marginTop: 16 }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            [图表展示区域]
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default AnalysisReport;