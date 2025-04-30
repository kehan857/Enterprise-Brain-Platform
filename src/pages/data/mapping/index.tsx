import React, { useState } from 'react';
import { Card, Form, Select, Button } from 'antd';
import DataMappingContent from './components/DataMappingContent';

const DataMapping: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<string>('');



  return (
    <div>
      <Card title="数据映射配置" style={{ marginBottom: 24 }}>
        <Form layout="inline" style={{ marginBottom: 24 }}>
          <Form.Item label="数据源">
            <Select
              style={{ width: 200 }}
              placeholder="选择数据源"
              value={selectedSource}
              onChange={setSelectedSource}
              options={[
                { value: 'erp', label: 'ERP系统' },
                { value: 'mes', label: 'MES系统' },
              ]}
            />
          </Form.Item>
          <Form.Item label="指标体系">
            <Select
              style={{ width: 200 }}
              placeholder="选择指标体系"
              value={selectedSystem}
              onChange={setSelectedSystem}
              options={[
                { value: 'production', label: '生产指标' },
                { value: 'quality', label: '质量指标' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary">查询</Button>
          </Form.Item>
        </Form>

        {selectedSource && selectedSystem && <DataMappingContent />}
      </Card>


    </div>
  );
};

export default DataMapping;