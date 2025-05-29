import React, { useState } from 'react';
import { Input, Button, Dropdown, Form, Row, Col, Space, Card } from 'antd';
import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

export interface SearchField {
  key: string;
  label: string;
  type: 'input' | 'select' | 'dateRange';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  simpleSearchFields: string[]; // 简单搜索字段的key
  advancedFields?: SearchField[]; // 高级搜索字段配置
  onSearch: (values: any) => void;
  style?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '输入关键词搜索',
  simpleSearchFields,
  advancedFields = [],
  onSearch,
  style
}) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [form] = Form.useForm();
  const [simpleValue, setSimpleValue] = useState('');

  const handleSimpleSearch = () => {
    // 简单搜索只搜索指定的字段
    if (!simpleValue.trim()) {
      onSearch({});
      return;
    }
    
    const searchValues = simpleSearchFields.reduce((acc, field) => {
      acc[field] = simpleValue;
      return acc;
    }, {} as Record<string, string>);
    
    onSearch(searchValues);
  };

  const handleAdvancedSearch = (values: any) => {
    // 使用高级搜索时，重置简单搜索条件
    setSimpleValue('');
    onSearch(values);
    setAdvancedOpen(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const advancedSearchContent = (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAdvancedSearch}
      >
        <Row gutter={16}>
          {advancedFields.map((field) => (
            <Col span={8} key={field.key}>
              <Form.Item label={field.label} name={field.key}>
                {field.type === 'select' ? (
                  <Input.Group>
                    <Input placeholder={field.placeholder || `请输入${field.label}`} />
                  </Input.Group>
                ) : (
                  <Input placeholder={field.placeholder || `请输入${field.label}`} />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <Row justify="end">
          <Space>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Space>
        </Row>
      </Form>
    </Card>
  );

  return (
    <div className="searchBar" style={style}>
      <div className="simpleSearch">
        <Input
          placeholder={placeholder}
          value={simpleValue}
          onChange={(e) => setSimpleValue(e.target.value)}
          onPressEnter={handleSimpleSearch}
          suffix={
            <SearchOutlined 
              className="searchIcon" 
              onClick={handleSimpleSearch}
            />
          }
        />
        <Button
          type="text"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="advancedButton"
        >
          {advancedOpen ? <UpOutlined /> : <DownOutlined />}
        </Button>
      </div>
      
      {advancedOpen && advancedSearchContent}
    </div>
  );
};

export default SearchBar;