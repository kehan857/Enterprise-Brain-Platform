import React, { useState } from 'react';
import { Card, Typography, Table, Button, Input, Select, Tag, Space, Modal, Row, Col, Tabs, message } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface DataItem {
  key: string;
  name: string;
  code: string;
  industry: string;
  type: string;
  structure: string;
  unit: string;
  operation: string;
}

const StandardIndicator: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['已激活']);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentIndicator, setCurrentIndicator] = useState<DataItem | null>(null);
  const [activeTab, setActiveTab] = useState('被引用');

  // 处理标签页切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleTagClick = (tag: string) => {
    const nextSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(nextSelectedTags);
  };

  const handleViewDetail = (record: DataItem) => {
    setCurrentIndicator(record);
    setDetailVisible(true);
  };

  const columns: ColumnsType<DataItem> = [
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '指标编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '所属行业',
      dataIndex: 'industry',
      key: 'industry',
    },
    {
      title: '业务域',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '指标类型',
      dataIndex: 'structure',
      key: 'structure',
    },
    {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetail(record)}>查看</Button>
      ),
    },
  ];

  const data: DataItem[] = [
    {
      key: '1',
      name: '资产负债率',
      code: 'FIN_001',
      industry: 'finance / banking',
      type: '财务',
      structure: '复合指标',
      unit: '%',
      operation: '',
    },
    {
      key: '2',
      name: '存货周转率',
      code: 'RET_001',
      industry: 'retail / sales',
      type: '财务',
      structure: '复合指标',
      unit: '次/年',
      operation: '',
    },
    {
      key: '3',
      name: '生产效率',
      code: 'MFG_001',
      industry: 'manufacturing',
      type: '生产',
      structure: '复合指标',
      unit: '件/小时',
      operation: '',
    },
  ];

  // 引用关系表格列
  const referenceColumns = [
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '指标编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '指标类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '引用类型',
      dataIndex: 'refType',
      key: 'refType',
    },
  ];

  // 引用数据
  const referenceData = [
    {
      key: '1',
      name: '财务健康度',
      code: 'FIN_010',
      type: 'finance',
      refType: '复合指标组成',
    },
  ];

  // 引用指标数据
  const referencedByData = [
    {
      key: '1',
      name: '流动资产负债率',
      code: 'FIN_101',
      domain: 'finance / banking',
      type: '财务',
      unit: '%',
      description: '反映企业流动资产的负债水平'
    },
    {
      key: '2',
      name: '非流动资产负债率',
      code: 'FIN_102',
      domain: 'finance / banking',
      type: '财务',
      unit: '%',
      description: '衡量企业非流动资产的负债程度'
    },
    {
      key: '3',
      name: '有形资产负债率',
      code: 'FIN_103',
      domain: 'finance / banking',
      type: '财务',
      unit: '%',
      description: '不含无形资产的负债率计算'
    },
    {
      key: '4',
      name: '资本负债率',
      code: 'FIN_104',
      domain: 'finance / banking',
      type: '财务',
      unit: '%',
      description: '反映企业长期偿债能力的指标'
    },
    {
      key: '5',
      name: '行业平均资产负债率',
      code: 'FIN_105',
      domain: 'finance / banking',
      type: '财务',
      unit: '%',
      description: '用于对标行业平均水平'
    }
  ];

  // 引用指标列定义
  const referencedByColumns = [
    {
      title: '指标名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '指标编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '所属行业',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: '指标类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: '计量单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    }
  ];

  return (
    <div>
      <style jsx global>{`
        .indicator-table-row {
          cursor: pointer;
        }
        .indicator-table-row:hover {
          background-color: #f5f5f5;
        }
      `}</style>
      
      <Title level={4}>标准指标</Title>
      <Card bordered={false}>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Select defaultValue="全部" style={{ width: 120, marginRight: 16 }}>
              <Option value="all">全部</Option>
              <Option value="finance">财务</Option>
              <Option value="sales">销售</Option>
              <Option value="production">生产</Option>
            </Select>
            <Input 
              placeholder="输入关键词搜索" 
              style={{ width: 300 }}
              suffix={<Button type="primary" icon={<SearchOutlined />}></Button>}
            />
          </div>
          <div style={{ flex: 1 }}></div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Space>
            <Tag 
              color={selectedTags.includes('已激活') ? 'blue' : ''}
              onClick={() => handleTagClick('已激活')}
              style={{ cursor: 'pointer' }}
            >
              已激活
            </Tag>
            <Tag 
              color={selectedTags.includes('草稿') ? 'blue' : ''}
              onClick={() => handleTagClick('草稿')}
              style={{ cursor: 'pointer' }}
            >
              草稿
            </Tag>
            <Tag 
              color={selectedTags.includes('原子指标') ? 'blue' : ''}
              onClick={() => handleTagClick('原子指标')}
              style={{ cursor: 'pointer' }}
            >
              原子指标
            </Tag>
            <Tag 
              color={selectedTags.includes('复合指标') ? 'blue' : ''}
              onClick={() => handleTagClick('复合指标')}
              style={{ cursor: 'pointer' }}
            >
              复合指标
            </Tag>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: 50,
            showTotal: (total) => `共 ${total} 条`,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      {/* 指标详情弹窗 */}
      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>指标详情 - 资产负债率</span>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={() => setDetailVisible(false)} 
              style={{ marginRight: -16 }}
            />
          </div>
        }
        open={detailVisible}
        footer={null}
        closable={false}
        width={800}
        bodyStyle={{ padding: 0 }}
        destroyOnClose
      >
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '12px 16px', width: '150px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>指标名称</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>资产负债率</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>指标编码</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>FIN_001</td>
                <td style={{ padding: '12px 16px', width: '100px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>状态</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                  <Tag color="success">已激活</Tag>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>所属行业</td>
                <td colSpan={3} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>finance / banking</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>业务域</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                  <Tag color="blue">财务</Tag>
                  <Tag color="blue">经营</Tag>
                </td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>指标类型</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>复合指标</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>业务定义</td>
                <td colSpan={3} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>该指标反映企业负债占资产的比例，是衡量企业长期偿债能力的重要指标。</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>构成指标</td>
                <td colSpan={3} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                  <Tag color="purple" style={{ marginRight: '8px' }}>FIN_002</Tag>
                  <Tag color="purple">FIN_003</Tag>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>计算公式</td>
                <td colSpan={3} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>总负债 / 总资产 * 100%</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>数据源整合说明</td>
                <td colSpan={3} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>总负债和总资产数据均来自财务系统，按季度同步。</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>计量单位</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>%</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>数据类型</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>百分比</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>默认时间周期</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>季度</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>负责人</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>1</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>创建时间</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>2024-01-15 14:30:00</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>最后更新时间</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>2024-03-01 09:15:00</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>解释说明</td>
                <td colSpan={3} style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>资产负债率越低，说明企业长期偿债能力越强。一般而言，该比率以不超过70%为宜。</td>
              </tr>
            </tbody>
          </table>

          <div style={{ padding: '16px' }}>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab="被引用" key="被引用">
                <Table 
                  columns={referenceColumns} 
                  dataSource={referenceData} 
                  pagination={false}
                  size="small"
                />
              </TabPane>
              <TabPane tab="引用指标" key="引用指标">
                <Table 
                  columns={referencedByColumns} 
                  dataSource={referencedByData} 
                  pagination={false}
                  size="small"
                  rowClassName={() => 'indicator-table-row'}
                  onRow={(record) => ({
                    onClick: () => message.info(`点击了${record.name}行`)
                  })}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StandardIndicator; 