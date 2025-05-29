import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table,
  Select, 
  Space,
  Button,
  Input, 
  Typography, 
  Row,
  Col,
  Modal,
  Tag, 
  Divider,
  DatePicker,
  InputNumber,
  message,
  Tooltip, 
  Badge, 
  notification
} from 'antd';
import {
  ReloadOutlined,
  PieChartOutlined,
  BulbOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { type Dayjs } from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import ErrorBoundary from '@/components/ErrorBoundary';
import './index.less';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

// 定义字段类型
interface FieldType {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  description: string;
}

// 定义数据模型类型
interface DataModelType {
  id: string;
  name: string;
  table: 'customer' | 'product' | 'sales' | 'inventory' | 'supplier';
  description: string;
}

// 定义状态类型
interface StatusType {
  color: string;
  text: string;
}

// 模拟数据模型数据
const mockDataModels: DataModelType[] = [
  { id: '1', name: '客户数据', table: 'customer', description: '客户基础信息数据' },
  { id: '2', name: '产品数据', table: 'product', description: '产品基础信息数据' },
  { id: '3', name: '销售数据', table: 'sales', description: '销售订单数据' },
  { id: '4', name: '库存数据', table: 'inventory', description: '库存数据' },
  { id: '5', name: '供应商数据', table: 'supplier', description: '供应商信息数据' },
];

// 模拟字段数据
const mockFields: Record<string, FieldType[]> = {
  'customer': [
    { id: '1', name: 'id', label: '客户ID', type: 'string', required: true, description: '客户唯一标识符' },
    { id: '2', name: 'name', label: '客户名称', type: 'string', required: true, description: '客户企业名称' },
    { id: '3', name: 'short_name', label: '客户简称', type: 'string', required: false, description: '客户企业简称' },
    { id: '4', name: 'customer_type', label: '客户类型', type: 'string', required: true, description: '客户类型(潜在客户/正式客户/战略客户等)' },
    { id: '5', name: 'status', label: '客户状态', type: 'string', required: true, description: '客户状态(活跃/非活跃/已流失等)' },
    { id: '6', name: 'nature', label: '客户性质', type: 'string', required: false, description: '客户性质(国企/民企/外企等)' },
    { id: '7', name: 'level', label: '客户分级', type: 'string', required: true, description: '客户等级(A/B/C/D)' },
    { id: '8', name: 'industry', label: '客户行业', type: 'string', required: true, description: '客户所属行业' },
    { id: '9', name: 'country', label: '国家', type: 'string', required: false, description: '客户所在国家' },
    { id: '10', name: 'source', label: '客户来源', type: 'string', required: false, description: '客户获取渠道' },
    { id: '11', name: 'website', label: '客户官网', type: 'string', required: false, description: '客户官方网站' },
    { id: '12', name: 'description', label: '客户简介', type: 'string', required: false, description: '客户企业简介' },
    { id: '13', name: 'creator_id', label: '创建人ID', type: 'string', required: true, description: '创建该客户记录的用户ID' },
    { id: '14', name: 'parent_customer', label: '上级客户', type: 'string', required: false, description: '上级客户/母公司' },
    { id: '15', name: 'stage', label: '客户阶段', type: 'string', required: false, description: '客户生命周期阶段' },
    { id: '16', name: 'loss_reason', label: '流失原因', type: 'string', required: false, description: '客户流失原因' },
    { id: '17', name: 'birthday', label: '客户生日', type: 'datetime', required: false, description: '客户成立日期或负责人生日' },
    { id: '18', name: 'loss_remark', label: '流失备注', type: 'string', required: false, description: '客户流失详细说明' },
    { id: '19', name: 'gender', label: '性别', type: 'string', required: false, description: '联系人性别' },
    { id: '20', name: 'wechat', label: '微信', type: 'string', required: false, description: '联系人微信' },
    { id: '21', name: 'qq', label: 'QQ', type: 'string', required: false, description: '联系人QQ' },
    { id: '22', name: 'hobby', label: '爱好', type: 'string', required: false, description: '联系人爱好特长' },
    { id: '23', name: 'contacts', label: '联系人', type: 'string', required: false, description: '主要联系人姓名' },
    { id: '24', name: 'phone', label: '联系电话', type: 'string', required: false, description: '联系电话' },
    { id: '25', name: 'address', label: '地址', type: 'string', required: false, description: '客户地址' },
    { id: '26', name: 'created_at', label: '创建时间', type: 'datetime', required: true, description: '数据创建时间' },
    { id: '27', name: 'updated_at', label: '更新时间', type: 'datetime', required: true, description: '最后更新时间' },
  ],
  'product': [
    { id: '1', name: 'id', label: '产品ID', type: 'string', required: true, description: '产品唯一标识符' },
    { id: '2', name: 'name', label: '产品名称', type: 'string', required: true, description: '产品名称' },
    { id: '3', name: 'category', label: '产品类别', type: 'string', required: true, description: '产品类别' },
    { id: '4', name: 'price', label: '价格', type: 'number', required: true, description: '产品价格' },
    { id: '5', name: 'unit', label: '计量单位', type: 'string', required: true, description: '计量单位' },
    { id: '6', name: 'specifications', label: '规格参数', type: 'string', required: false, description: '产品规格参数' },
    { id: '7', name: 'created_at', label: '创建时间', type: 'datetime', required: true, description: '数据创建时间' },
  ],
  'sales': [
    { id: '1', name: 'id', label: '订单ID', type: 'string', required: true, description: '订单唯一标识符' },
    { id: '2', name: 'customer_id', label: '客户ID', type: 'string', required: true, description: '客户ID' },
    { id: '3', name: 'customer_name', label: '客户名称', type: 'string', required: true, description: '客户名称' },
    { id: '4', name: 'product_id', label: '产品ID', type: 'string', required: true, description: '产品ID' },
    { id: '5', name: 'product_name', label: '产品名称', type: 'string', required: true, description: '产品名称' },
    { id: '6', name: 'quantity', label: '数量', type: 'number', required: true, description: '销售数量' },
    { id: '7', name: 'price', label: '单价', type: 'number', required: true, description: '销售单价' },
    { id: '8', name: 'total', label: '总金额', type: 'number', required: true, description: '销售总金额' },
    { id: '9', name: 'status', label: '订单状态', type: 'string', required: true, description: '订单状态' },
    { id: '10', name: 'created_at', label: '创建时间', type: 'datetime', required: true, description: '订单创建时间' },
  ],
  'inventory': [
    { id: '1', name: 'id', label: '库存ID', type: 'string', required: true, description: '库存记录唯一标识符' },
    { id: '2', name: 'product_id', label: '产品ID', type: 'string', required: true, description: '产品ID' },
    { id: '3', name: 'product_name', label: '产品名称', type: 'string', required: true, description: '产品名称' },
    { id: '4', name: 'warehouse', label: '仓库', type: 'string', required: true, description: '所在仓库' },
    { id: '5', name: 'quantity', label: '库存数量', type: 'number', required: true, description: '当前库存数量' },
    { id: '6', name: 'last_updated', label: '最后更新时间', type: 'datetime', required: true, description: '库存最后更新时间' },
  ],
  'supplier': [
    { id: '1', name: 'id', label: '供应商ID', type: 'string', required: true, description: '供应商唯一标识符' },
    { id: '2', name: 'name', label: '供应商名称', type: 'string', required: true, description: '供应商企业名称' },
    { id: '3', name: 'category', label: '供应商类别', type: 'string', required: true, description: '供应商类别' },
    { id: '4', name: 'level', label: '供应商等级', type: 'string', required: true, description: '供应商等级' },
    { id: '5', name: 'contacts', label: '联系人', type: 'string', required: false, description: '主要联系人姓名' },
    { id: '6', name: 'phone', label: '联系电话', type: 'string', required: false, description: '联系电话' },
    { id: '7', name: 'address', label: '地址', type: 'string', required: false, description: '供应商地址' },
    { id: '8', name: 'created_at', label: '创建时间', type: 'datetime', required: true, description: '数据创建时间' },
  ]
};

// 筛选选项配置
const getFilterOptions = (table: string) => {
  const commonFilters = {
    statuses: ['活跃', '非活跃', '已完成', '处理中', '已取消', '待付款'],
    regions: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '重庆', '天津'],
  };

  switch (table) {
    case 'customer':
      return {
        statuses: ['活跃', '非活跃', '已流失', '潜在客户', '意向客户'],
        levels: ['A', 'B', 'C', 'D'],
        channels: ['网络推广', '客户介绍', '电话营销', '展会', '合作伙伴', '广告投放', '社交媒体'],
        industries: ['制造业', '服务业', '零售业', '金融业', 'IT行业', '教育行业', '医疗健康', '房地产', '建筑业', '交通运输'],
        types: ['潜在客户', '正式客户', '战略客户', '普通客户', 'VIP客户'],
        regions: commonFilters.regions
      };
    case 'product':
      return {
        statuses: ['在售', '停售', '新品', '热销', '滞销'],
        categories: ['电子产品', '食品', '服装', '家电', '办公用品', '日用品', '化妆品', '图书', '运动器材', '汽车用品'],
        brands: ['品牌A', '品牌B', '品牌C', '品牌D', '品牌E'],
        units: ['个', '台', '套', '盒', '瓶', '包', '件', '张', '本', '副'],
        regions: commonFilters.regions
      };
    case 'sales':
      return {
        statuses: ['已完成', '处理中', '已取消', '待付款', '已发货', '待收货'],
        priorities: ['高', '中', '低'],
        channels: ['线上', '线下', '电话', '邮件', '微信', '直销', '代理'],
        salespersons: ['张三', '李四', '王五', '赵六', '刘七', '陈八', '杨九', '黄十'],
        regions: commonFilters.regions
      };
    case 'inventory':
      return {
        statuses: ['正常', '不足', '充足', '过量', '滞销'],
        warehouses: ['北京仓', '上海仓', '广州仓', '成都仓', '武汉仓', '深圳仓', '杭州仓'],
        categories: ['电子产品', '食品', '服装', '家电', '办公用品', '日用品', '化妆品', '图书', '运动器材', '汽车用品'],
        regions: commonFilters.regions
      };
    case 'supplier':
      return {
        statuses: ['合作中', '暂停合作', '终止合作', '评估中'],
        levels: ['A', 'B', 'C', 'D'],
        categories: ['原材料', '设备', '服务', '软件', '物流', '咨询', '维护', '其他'],
        regions: commonFilters.regions
      };
    default:
      return {
        statuses: commonFilters.statuses,
        regions: commonFilters.regions
      };
  }
};

// 模拟数据
const generateMockData = (modelId: string, count: number = 30) => {
  const model = mockDataModels.find(m => m.id === modelId);
  if (!model) return [];
  
  const fields = mockFields[model.table];
  const data = [];
  
  for (let i = 1; i <= count; i++) {
    const item: Record<string, any> = { key: i.toString() };
    
    fields.forEach((field: FieldType) => {
      if (field.name === 'id') {
        item[field.name] = `${model.table}-${i.toString().padStart(4, '0')}`;
      } else if (field.type === 'number') {
        item[field.name] = field.name.includes('price') || field.name.includes('total') 
          ? Math.floor(Math.random() * 10000) / 100 // 生成带两位小数的金额
          : Math.floor(Math.random() * 1000);
      } else if (field.type === 'datetime') {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        item[field.name] = date.toISOString().split('T')[0];
      } else if (field.name === 'level') {
        const levels = ['A', 'B', 'C', 'D'];
        item[field.name] = levels[Math.floor(Math.random() * levels.length)];
      } else if (field.name === 'status') {
        const statuses = ['已完成', '处理中', '已取消', '待付款'];
        item[field.name] = statuses[Math.floor(Math.random() * statuses.length)];
      } else if (field.name === 'category') {
        const categories = ['电子产品', '食品', '服装', '家电', '办公用品'];
        item[field.name] = categories[Math.floor(Math.random() * categories.length)];
      } else if (field.name === 'industry') {
        const industries = ['制造业', '服务业', '零售业', '金融业', 'IT行业', '教育行业', '医疗健康', '房地产', '建筑业', '交通运输'];
        item[field.name] = industries[Math.floor(Math.random() * industries.length)];
      } else if (field.name === 'warehouse') {
        const warehouses = ['北京仓', '上海仓', '广州仓', '成都仓', '武汉仓'];
        item[field.name] = warehouses[Math.floor(Math.random() * warehouses.length)];
      } else if (field.name.includes('name') && !field.name.includes('customer') && !field.name.includes('product')) {
        item[field.name] = `测试${field.label}${i}`;
      } else if (field.name === 'customer_id') {
        item[field.name] = `customer-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
      } else if (field.name === 'product_id') {
        item[field.name] = `product-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
      } else if (field.name === 'customer_name') {
        item[field.name] = `客户${Math.floor(Math.random() * 100)}`;
      } else if (field.name === 'product_name') {
        item[field.name] = `产品${Math.floor(Math.random() * 100)}`;
      } else if (field.name === 'phone') {
        item[field.name] = `13${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
      } else if (field.name === 'address') {
        const cities = ['北京市', '上海市', '广州市', '深圳市', '杭州市'];
        item[field.name] = `${cities[Math.floor(Math.random() * cities.length)]}XX区XX路XX号`;
      } else if (field.name === 'contacts') {
        const surnames = ['张', '李', '王', '赵', '刘', '陈', '杨', '黄'];
        const names = ['明', '华', '强', '伟', '芳', '娟', '军', '杰'];
        item[field.name] = surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)];
      } else if (field.name === 'status') {
        const statuses = ['活跃', '非活跃', '已流失', '潜在客户', '意向客户'];
        item[field.name] = statuses[Math.floor(Math.random() * statuses.length)];
      } else if (field.name === 'customer_type') {
        const types = ['潜在客户', '正式客户', '战略客户', '普通客户', 'VIP客户'];
        item[field.name] = types[Math.floor(Math.random() * types.length)];
      } else if (field.name === 'nature') {
        const natures = ['国企', '民企', '外企', '合资企业', '事业单位', '政府机构'];
        item[field.name] = natures[Math.floor(Math.random() * natures.length)];
      } else if (field.name === 'country') {
        const countries = ['中国', '美国', '日本', '德国', '英国', '法国', '加拿大', '澳大利亚'];
        item[field.name] = countries[Math.floor(Math.random() * countries.length)];
      } else if (field.name === 'source') {
        const sources = ['网络推广', '客户介绍', '电话营销', '展会', '合作伙伴', '广告投放', '社交媒体'];
        item[field.name] = sources[Math.floor(Math.random() * sources.length)];
      } else if (field.name === 'stage') {
        const stages = ['初步接触', '需求确认', '方案制定', '商务谈判', '合同签订', '售后服务'];
        item[field.name] = stages[Math.floor(Math.random() * stages.length)];
      } else if (field.name === 'loss_reason') {
        const reasons = ['价格因素', '竞争对手优势', '服务不满意', '需求变更', '公司战略调整', ''];
        item[field.name] = item.status === '已流失' ? reasons[Math.floor(Math.random() * (reasons.length - 1))] : '';
      } else if (field.name === 'gender') {
        const genders = ['男', '女'];
        item[field.name] = genders[Math.floor(Math.random() * genders.length)];
      } else if (field.name === 'short_name') {
        // 根据客户名称生成简称
        const fullName = item['name'] || `客户${i}`;
        if (typeof fullName === 'string') {
          item[field.name] = fullName.length > 4 ? fullName.substring(0, 4) : fullName;
        } else {
          item[field.name] = `简称${i}`;
        }
      } else if (field.name === 'website') {
        const domains = ['company.com', 'enterprise.cn', 'group.net', 'corp.com.cn', 'tech.com'];
        // 使用客户名称的拼音首字母作为域名前缀
        const name = item['name'] || `客户${i}`;
        const prefix = typeof name === 'string' ? name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : `customer${i}`;
        item[field.name] = `http://www.${prefix}.${domains[Math.floor(Math.random() * domains.length)]}`;
      } else if (field.name === 'description') {
        const descriptions = [
          '该公司是行业领先的解决方案提供商，专注于创新技术的研发和应用。',
          '作为市场上的知名企业，该公司拥有完善的产品线和专业的服务团队。',
          '该企业成立多年，在行业内有较高的知名度和良好的口碑。',
          '这是一家快速成长的企业，近年来业务扩展迅速，前景看好。',
          '该公司是一家创新型企业，致力于为客户提供高质量的产品和服务。'
        ];
        item[field.name] = descriptions[Math.floor(Math.random() * descriptions.length)];
      } else if (field.name === 'creator_id') {
        item[field.name] = `user-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`;
      } else if (field.name === 'parent_customer') {
        // 30%概率有上级客户
        if (Math.random() < 0.3) {
          item[field.name] = `总公司${Math.floor(Math.random() * 20) + 1}`;
        } else {
          item[field.name] = '';
        }
      } else if (field.name === 'birthday') {
        const year = 1980 + Math.floor(Math.random() * 30);
        const month = 1 + Math.floor(Math.random() * 12);
        const day = 1 + Math.floor(Math.random() * 28);
        item[field.name] = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      } else if (field.name === 'loss_remark') {
        const remarks = [
          '客户对价格不满意，转向了竞争对手',
          '由于我方服务质量问题导致客户流失',
          '客户内部战略调整，暂停相关业务',
          '客户公司被收购，更换了供应商',
          ''
        ];
        item[field.name] = item.status === '已流失' ? remarks[Math.floor(Math.random() * (remarks.length - 1))] : '';
      } else if (field.name === 'wechat') {
        item[field.name] = `wx_${Math.random().toString(36).substring(2, 10)}`;
      } else if (field.name === 'qq') {
        item[field.name] = `${Math.floor(Math.random() * 900000000) + 100000000}`;
      } else if (field.name === 'hobby') {
        const hobbies = ['阅读', '旅行', '体育', '音乐', '摄影', '烹饪', '电影', '绘画', ''];
        const count = Math.floor(Math.random() * 3) + 1;
        const selectedHobbies: string[] = [];
        for (let j = 0; j < count; j++) {
          const hobby = hobbies[Math.floor(Math.random() * (hobbies.length - 1))];
          if (!selectedHobbies.includes(hobby)) {
            selectedHobbies.push(hobby);
          }
        }
        item[field.name] = selectedHobbies.join('、');
      } else if (field.name === 'updated_at') {
        // 更新时间应该晚于创建时间
        const createdAt = item['created_at'];
        if (createdAt) {
          const createdDate = new Date(createdAt);
          const days = Math.floor(Math.random() * 30);
          const updatedDate = new Date(createdDate);
          updatedDate.setDate(createdDate.getDate() + days);
          item[field.name] = updatedDate.toISOString().split('T')[0];
        } else {
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 10));
          item[field.name] = date.toISOString().split('T')[0];
        }
      } else {
        item[field.name] = `${field.label}-${i}`;
      }
    });
    
    data.push(item);
  }
  
  return data;
};

// 报表分类统计数据接口
interface ReportStatistics {
  category: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

// 提示性分析数据接口
interface AnalysisInsight {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
  relatedModel: string;
}

// 模拟报表分类统计数据 - 根据业务类型动态生成业务指标
const generateModelStatistics = (modelId: string): ReportStatistics[] => {
  const model = mockDataModels.find(m => m.id === modelId);
  if (!model) return [];
  
  const baseCount = Math.floor(Math.random() * 1000) + 500;
  
  // 根据不同模型返回不同的业务指标
  switch (model.table) {
    case 'customer':
      return [
        { category: '客户总数', count: baseCount, percentage: 0, trend: 'up', color: '#1890ff' },
        { category: 'VIP客户数', count: Math.floor(baseCount * 0.15), percentage: 15, trend: 'up', color: '#52c41a' },
        { category: '活跃客户数', count: Math.floor(baseCount * 0.72), percentage: 72, trend: 'stable', color: '#faad14' },
        { category: '客户价值', count: Math.floor(Math.random() * 50000) + 80000, percentage: 0, trend: 'up', color: '#722ed1' }
      ];
    case 'product':
      return [
        { category: '产品总数', count: Math.floor(baseCount * 0.6), percentage: 0, trend: 'up', color: '#1890ff' },
        { category: '在售产品', count: Math.floor(baseCount * 0.48), percentage: 80, trend: 'stable', color: '#52c41a' },
        { category: '热销产品', count: Math.floor(baseCount * 0.12), percentage: 20, trend: 'up', color: '#faad14' },
        { category: '产品营收', count: Math.floor(Math.random() * 50000) + 60000, percentage: 0, trend: 'up', color: '#722ed1' }
      ];
    case 'sales':
      return [
        { category: '订单总数', count: baseCount * 2, percentage: 0, trend: 'up', color: '#1890ff' },
        { category: '销售额', count: Math.floor(Math.random() * 80000) + 150000, percentage: 0, trend: 'up', color: '#52c41a' },
        { category: '完成订单', count: Math.floor(baseCount * 1.6), percentage: 80, trend: 'stable', color: '#faad14' },
        { category: '目标完成率', count: Math.floor(Math.random() * 25) + 75, percentage: 0, trend: 'up', color: '#722ed1' }
      ];
    case 'inventory':
      return [
        { category: '库存SKU', count: Math.floor(baseCount * 0.8), percentage: 0, trend: 'stable', color: '#1890ff' },
        { category: '库存价值', count: Math.floor(Math.random() * 80000) + 30000, percentage: 0, trend: 'up', color: '#52c41a' },
        { category: '低库存预警', count: Math.floor(baseCount * 0.12), percentage: 15, trend: 'down', color: '#f5222d' },
        { category: '周转率', count: Math.floor(Math.random() * 20) + 75, percentage: 0, trend: 'stable', color: '#722ed1' }
      ];
    case 'supplier':
      return [
        { category: '供应商总数', count: Math.floor(baseCount * 0.3), percentage: 0, trend: 'stable', color: '#1890ff' },
        { category: '核心供应商', count: Math.floor(baseCount * 0.05), percentage: 16, trend: 'up', color: '#52c41a' },
        { category: '平均合作年限', count: Math.floor(Math.random() * 8) + 3, percentage: 0, trend: 'stable', color: '#faad14' },
        { category: '质量评分', count: Math.floor(Math.random() * 15) + 85, percentage: 0, trend: 'up', color: '#722ed1' }
      ];
    default:
      return [
        { category: '总记录数', count: baseCount, percentage: 0, trend: 'up', color: '#1890ff' },
        { category: '完整记录', count: Math.floor(baseCount * 0.85), percentage: 85, trend: 'stable', color: '#52c41a' },
        { category: '缺失字段', count: Math.floor(baseCount * 0.12), percentage: 12, trend: 'down', color: '#faad14' },
        { category: '异常数据', count: Math.floor(baseCount * 0.03), percentage: 3, trend: 'down', color: '#f5222d' }
      ];
  }
};

// 模拟提示性分析数据 - 根据业务类型动态生成（业务角度分析）
const generateModelInsights = (modelId: string): AnalysisInsight[] => {
  const model = mockDataModels.find(m => m.id === modelId);
  if (!model) return [];
  
  const modelInsights: Record<string, AnalysisInsight[]> = {
    '1': [ // 客户模型 - 客户经营分析
      {
        id: '1',
        type: 'warning',
        title: 'A级客户占比偏低',
        description: 'A级客户仅占15%，收入贡献偏低',
        impact: 'high',
        suggestion: '加强高价值客户挖掘',
        relatedModel: '客户模型'
      },
      {
        id: '2',
        type: 'success',
        title: '客户增长稳定',
        description: '本月新增客户增长8%，势头良好',
        impact: 'medium',
        suggestion: '继续优化获客渠道',
        relatedModel: '客户模型'
      },
      {
        id: '3',
        type: 'info',
        title: '客户活跃度良好',
        description: '72%客户保持活跃状态',
        impact: 'low',
        suggestion: '关注非活跃客户激活',
        relatedModel: '客户模型'
      }
    ],
    '2': [ // 产品模型 - 产品经营分析
      {
        id: '4',
        type: 'success',
        title: '热销产品表现优异',
        description: '20%产品贡献主要销量',
        impact: 'medium',
        suggestion: '重点推广热销产品',
        relatedModel: '产品模型'
      },
      {
        id: '5',
        type: 'warning',
        title: '新品上架节奏缓慢',
        description: '新品占比仅8%，创新不足',
        impact: 'medium',
        suggestion: '加快产品迭代速度',
        relatedModel: '产品模型'
      },
      {
        id: '6',
        type: 'info',
        title: '产品价格竞争力',
        description: '平均价格处于市场中位',
        impact: 'low',
        suggestion: '评估价格优化空间',
        relatedModel: '产品模型'
      }
    ],
    '3': [ // 销售模型 - 销售业绩分析
      {
        id: '7',
        type: 'success',
        title: '销售增长强劲',
        description: '本月销售额增长23.6%',
        impact: 'high',
        suggestion: '扩大销售团队规模',
        relatedModel: '销售模型'
      },
      {
        id: '8',
        type: 'warning',
        title: '订单完成率待提升',
        description: '订单完成率80%，有改善空间',
        impact: 'medium',
        suggestion: '优化交付流程',
        relatedModel: '销售模型'
      },
      {
        id: '9',
        type: 'info',
        title: '月度订单集中',
        description: '本月订单占比15%，分布均匀',
        impact: 'low',
        suggestion: '平衡季度销售节奏',
        relatedModel: '销售模型'
      }
    ],
    '4': [ // 库存模型 - 库存管理分析
      {
        id: '10',
        type: 'error',
        title: '低库存风险加大',
        description: '15%商品库存不足，影响销售',
        impact: 'high',
        suggestion: '紧急补货并优化采购',
        relatedModel: '库存模型'
      },
      {
        id: '11',
        type: 'success',
        title: '库存周转率良好',
        description: '平均周转率85%，效率较高',
        impact: 'low',
        suggestion: '保持现有管理水平',
        relatedModel: '库存模型'
      },
      {
        id: '12',
        type: 'warning',
        title: '库存价值增长',
        description: '库存总价值持续增长',
        impact: 'medium',
        suggestion: '关注滞销品清理',
        relatedModel: '库存模型'
      }
    ],
    '5': [ // 供应商模型 - 供应链分析
      {
        id: '13',
        type: 'success',
        title: '供应商质量稳定',
        description: '平均质量评分85分，表现良好',
        impact: 'low',
        suggestion: '维持合作关系',
        relatedModel: '供应商模型'
      },
      {
        id: '14',
        type: 'info',
        title: '核心供应商集中',
        description: '16%核心供应商承担主要供应',
        impact: 'medium',
        suggestion: '评估供应链风险',
        relatedModel: '供应商模型'
      },
      {
        id: '15',
        type: 'warning',
        title: '合作年限较短',
        description: '平均合作年限偏短',
        impact: 'medium',
        suggestion: '加强长期合作伙伴关系',
        relatedModel: '供应商模型'
      }
    ]
  };
  
  return modelInsights[modelId] || [];
};

// 生成业务类型的模拟数据
const generateModelData = (modelId: string, count: number = 30) => {
  const model = mockDataModels.find(m => m.id === modelId);
  if (!model) return [];
  
  const fields = mockFields[model.table];
  const data = [];
  
  for (let i = 1; i <= count; i++) {
    const item: Record<string, any> = { key: i.toString() };
    
    fields.forEach((field: FieldType) => {
      if (field.name === 'id') {
        item[field.name] = `${model.table}-${i.toString().padStart(4, '0')}`;
      } else if (field.type === 'number') {
        item[field.name] = field.name.includes('price') || field.name.includes('total') 
          ? Math.floor(Math.random() * 10000) / 100 // 生成带两位小数的金额
          : Math.floor(Math.random() * 1000);
      } else if (field.type === 'datetime') {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        item[field.name] = date.toISOString().split('T')[0];
      } else if (field.name === 'level') {
        const levels = ['A', 'B', 'C', 'D'];
        item[field.name] = levels[Math.floor(Math.random() * levels.length)];
      } else if (field.name === 'status') {
        const statuses = ['已完成', '处理中', '已取消', '待付款'];
        item[field.name] = statuses[Math.floor(Math.random() * statuses.length)];
      } else if (field.name === 'category') {
        const categories = ['电子产品', '食品', '服装', '家电', '办公用品'];
        item[field.name] = categories[Math.floor(Math.random() * categories.length)];
      } else if (field.name === 'industry') {
        const industries = ['制造业', '服务业', '零售业', '金融业', 'IT行业', '教育行业', '医疗健康', '房地产', '建筑业', '交通运输'];
        item[field.name] = industries[Math.floor(Math.random() * industries.length)];
      } else if (field.name === 'warehouse') {
        const warehouses = ['北京仓', '上海仓', '广州仓', '成都仓', '武汉仓'];
        item[field.name] = warehouses[Math.floor(Math.random() * warehouses.length)];
      } else if (field.name.includes('name') && !field.name.includes('customer') && !field.name.includes('product')) {
        item[field.name] = `测试${field.label}${i}`;
      } else if (field.name === 'customer_id') {
        item[field.name] = `customer-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
      } else if (field.name === 'product_id') {
        item[field.name] = `product-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`;
      } else if (field.name === 'customer_name') {
        item[field.name] = `客户${Math.floor(Math.random() * 100)}`;
      } else if (field.name === 'product_name') {
        item[field.name] = `产品${Math.floor(Math.random() * 100)}`;
      } else if (field.name === 'phone') {
        item[field.name] = `13${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
      } else if (field.name === 'address') {
        const cities = ['北京市', '上海市', '广州市', '深圳市', '杭州市'];
        item[field.name] = `${cities[Math.floor(Math.random() * cities.length)]}XX区XX路XX号`;
      } else if (field.name === 'contacts') {
        const surnames = ['张', '李', '王', '赵', '刘', '陈', '杨', '黄'];
        const names = ['明', '华', '强', '伟', '芳', '娟', '军', '杰'];
        item[field.name] = surnames[Math.floor(Math.random() * surnames.length)] + names[Math.floor(Math.random() * names.length)];
      } else if (field.name === 'status') {
        const statuses = ['活跃', '非活跃', '已流失', '潜在客户', '意向客户'];
        item[field.name] = statuses[Math.floor(Math.random() * statuses.length)];
      } else if (field.name === 'customer_type') {
        const types = ['潜在客户', '正式客户', '战略客户', '普通客户', 'VIP客户'];
        item[field.name] = types[Math.floor(Math.random() * types.length)];
      } else if (field.name === 'nature') {
        const natures = ['国企', '民企', '外企', '合资企业', '事业单位', '政府机构'];
        item[field.name] = natures[Math.floor(Math.random() * natures.length)];
      } else if (field.name === 'country') {
        const countries = ['中国', '美国', '日本', '德国', '英国', '法国', '加拿大', '澳大利亚'];
        item[field.name] = countries[Math.floor(Math.random() * countries.length)];
      } else if (field.name === 'source') {
        const sources = ['网络推广', '客户介绍', '电话营销', '展会', '合作伙伴', '广告投放', '社交媒体'];
        item[field.name] = sources[Math.floor(Math.random() * sources.length)];
      } else if (field.name === 'stage') {
        const stages = ['初步接触', '需求确认', '方案制定', '商务谈判', '合同签订', '售后服务'];
        item[field.name] = stages[Math.floor(Math.random() * stages.length)];
      } else if (field.name === 'loss_reason') {
        const reasons = ['价格因素', '竞争对手优势', '服务不满意', '需求变更', '公司战略调整', ''];
        item[field.name] = item.status === '已流失' ? reasons[Math.floor(Math.random() * (reasons.length - 1))] : '';
      } else if (field.name === 'gender') {
        const genders = ['男', '女'];
        item[field.name] = genders[Math.floor(Math.random() * genders.length)];
      } else if (field.name === 'short_name') {
        // 根据客户名称生成简称
        const fullName = item['name'] || `客户${i}`;
        if (typeof fullName === 'string') {
          item[field.name] = fullName.length > 4 ? fullName.substring(0, 4) : fullName;
        } else {
          item[field.name] = `简称${i}`;
        }
      } else if (field.name === 'website') {
        const domains = ['company.com', 'enterprise.cn', 'group.net', 'corp.com.cn', 'tech.com'];
        // 使用客户名称的拼音首字母作为域名前缀
        const name = item['name'] || `客户${i}`;
        const prefix = typeof name === 'string' ? name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : `customer${i}`;
        item[field.name] = `http://www.${prefix}.${domains[Math.floor(Math.random() * domains.length)]}`;
      } else if (field.name === 'description') {
        const descriptions = [
          '该公司是行业领先的解决方案提供商，专注于创新技术的研发和应用。',
          '作为市场上的知名企业，该公司拥有完善的产品线和专业的服务团队。',
          '该企业成立多年，在行业内有较高的知名度和良好的口碑。',
          '这是一家快速成长的企业，近年来业务扩展迅速，前景看好。',
          '该公司是一家创新型企业，致力于为客户提供高质量的产品和服务。'
        ];
        item[field.name] = descriptions[Math.floor(Math.random() * descriptions.length)];
      } else if (field.name === 'creator_id') {
        item[field.name] = `user-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`;
      } else if (field.name === 'parent_customer') {
        // 30%概率有上级客户
        if (Math.random() < 0.3) {
          item[field.name] = `总公司${Math.floor(Math.random() * 20) + 1}`;
        } else {
          item[field.name] = '';
        }
      } else if (field.name === 'birthday') {
        const year = 1980 + Math.floor(Math.random() * 30);
        const month = 1 + Math.floor(Math.random() * 12);
        const day = 1 + Math.floor(Math.random() * 28);
        item[field.name] = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      } else if (field.name === 'loss_remark') {
        const remarks = [
          '客户对价格不满意，转向了竞争对手',
          '由于我方服务质量问题导致客户流失',
          '客户内部战略调整，暂停相关业务',
          '客户公司被收购，更换了供应商',
          ''
        ];
        item[field.name] = item.status === '已流失' ? remarks[Math.floor(Math.random() * (remarks.length - 1))] : '';
      } else if (field.name === 'wechat') {
        item[field.name] = `wx_${Math.random().toString(36).substring(2, 10)}`;
      } else if (field.name === 'qq') {
        item[field.name] = `${Math.floor(Math.random() * 900000000) + 100000000}`;
      } else if (field.name === 'hobby') {
        const hobbies = ['阅读', '旅行', '体育', '音乐', '摄影', '烹饪', '电影', '绘画', ''];
        const count = Math.floor(Math.random() * 3) + 1;
        const selectedHobbies: string[] = [];
        for (let j = 0; j < count; j++) {
          const hobby = hobbies[Math.floor(Math.random() * (hobbies.length - 1))];
          if (!selectedHobbies.includes(hobby)) {
            selectedHobbies.push(hobby);
          }
        }
        item[field.name] = selectedHobbies.join('、');
      } else if (field.name === 'updated_at') {
        // 更新时间应该晚于创建时间
        const createdAt = item['created_at'];
        if (createdAt) {
          const createdDate = new Date(createdAt);
          const days = Math.floor(Math.random() * 30);
          const updatedDate = new Date(createdDate);
          updatedDate.setDate(createdDate.getDate() + days);
          item[field.name] = updatedDate.toISOString().split('T')[0];
        } else {
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 10));
          item[field.name] = date.toISOString().split('T')[0];
        }
      } else {
        item[field.name] = `${field.label}-${i}`;
      }
    });
    
    data.push(item);
  }
  
  return data;
};

const DataQuery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<string>('1');
  const [searchText, setSearchText] = useState<string>('');
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState<ColumnsType<Record<string, any>>>([]);
  const [insightModalVisible, setInsightModalVisible] = useState<boolean>(false);
  const [selectedInsight, setSelectedInsight] = useState<AnalysisInsight | null>(null);
  
  // 添加洞察生成相关状态
  const [insights, setInsights] = useState<AnalysisInsight[]>([]);
  const [insightsGenerated, setInsightsGenerated] = useState<boolean>(false);
  const [generatingInsights, setGeneratingInsights] = useState<boolean>(false);
  
  // 添加筛选状态
  const [dateRange, setDateRange] = useState<RangeValue>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  const [selectedChannel, setSelectedChannel] = useState<string | undefined>(undefined);
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(undefined);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | undefined>(undefined);
  const [selectedPriority, setSelectedPriority] = useState<string | undefined>(undefined);
  const [amountRange, setAmountRange] = useState<[number | null, number | null]>([null, null]);
  
  // 根据选中的业务类型生成表格列
  useEffect(() => {
    if (selectedModel) {
      const model = mockDataModels.find(m => m.id === selectedModel);
      if (model) {
        const fields = mockFields[model.table];
        
        // 生成表格列
        const tableColumns: ColumnsType<Record<string, any>> = fields.map((field: FieldType) => ({
          title: (
            <Tooltip title={field.description}>
              <span>
                {field.label}
                {field.required && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
              </span>
            </Tooltip>
          ),
          dataIndex: field.name,
          key: field.name,
          sorter: field.type === 'number' || field.type === 'datetime',
          render: (text: any, _: Record<string, any>) => {
            if (text === null || text === undefined) {
              return '-';
            }
            
            if (field.name === 'status') {
              const statusMap: Record<string, StatusType> = {
                '已完成': { color: 'success', text: '已完成' },
                '处理中': { color: 'processing', text: '处理中' },
                '已取消': { color: 'error', text: '已取消' },
                '待付款': { color: 'warning', text: '待付款' }
              };
              const status = statusMap[text as string] || { color: 'default', text };
              return <Badge status={status.color as any} text={status.text} />;
            }
            
            if (field.name === 'level') {
              const levelMap: Record<string, StatusType> = {
                'A': { color: 'gold', text: 'A' },
                'B': { color: 'blue', text: 'B' },
                'C': { color: 'green', text: 'C' },
                'D': { color: 'gray', text: 'D' }
              };
              const level = levelMap[text as string] || { color: 'default', text };
              return <Tag color={level.color}>{level.text}</Tag>;
            }
            
            if (field.type === 'number' && (field.name.includes('price') || field.name.includes('total'))) {
              return `¥${(text as number).toFixed(2)}`;
            }
            
            return text;
          }
        }));
        
        setColumns(tableColumns);
        
        // 加载数据
        handleDataLoad();
      }
    }
  }, [selectedModel]);
  
  // 加载数据
  const handleDataLoad = () => {
    setLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      setTableData(generateModelData(selectedModel));
      setLoading(false);
    }, 500);
  };
  
  // 搜索处理
  const handleSearch = () => {
    setLoading(true);
    // 模拟异步搜索
    setTimeout(() => {
      const model = mockDataModels.find(m => m.id === selectedModel);
      if (model) {
        const fields = mockFields[model.table];
        const allData = generateModelData(selectedModel, 100);
        
        if (searchText) {
          const filteredData = allData.filter(item => {
            return fields.some((field: FieldType) => {
              const value = item[field.name];
              if (value === null || value === undefined) return false;
              return String(value).toLowerCase().includes(searchText.toLowerCase());
            });
          });
          setTableData(filteredData);
        } else {
          setTableData(allData.slice(0, 30));
        }
      }
      setLoading(false);
    }, 500);
  };
  
  // 切换业务类型
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    setSearchText('');
    // 重置所有筛选项
    setDateRange(null);
    setSelectedStatus(undefined);
    setSelectedCategory(undefined);
    setSelectedLevel(undefined);
    setSelectedRegion(undefined);
    setSelectedChannel(undefined);
    setSelectedIndustry(undefined);
    setSelectedWarehouse(undefined);
    setSelectedPriority(undefined);
    setAmountRange([null, null]);
    // 重置洞察状态
    setInsights([]);
    setInsightsGenerated(false);
    setGeneratingInsights(false);
  };
  
  // 重置搜索
  const handleReset = () => {
    setSearchText('');
    setDateRange(null);
    setSelectedStatus(undefined);
    setSelectedCategory(undefined);
    setSelectedLevel(undefined);
    setSelectedRegion(undefined);
    setSelectedChannel(undefined);
    setSelectedIndustry(undefined);
    setSelectedWarehouse(undefined);
    setSelectedPriority(undefined);
    setAmountRange([null, null]);
    // 重置洞察状态
    setInsights([]);
    setInsightsGenerated(false);
    setGeneratingInsights(false);
    handleDataLoad();
  };

  // 处理筛选
  const handleFilter = () => {
    setLoading(true);
    // 模拟筛选逻辑
    setTimeout(() => {
      const model = mockDataModels.find(m => m.id === selectedModel);
      if (model) {
        let allData = generateModelData(selectedModel, 100);
        
        // 应用筛选条件
        if (selectedStatus) {
          allData = allData.filter(item => item.status === selectedStatus);
        }
        if (selectedCategory) {
          allData = allData.filter(item => item.category === selectedCategory);
        }
        if (selectedLevel) {
          allData = allData.filter(item => item.level === selectedLevel);
        }
        if (selectedRegion) {
          allData = allData.filter(item => item.address?.includes(selectedRegion));
        }
        if (dateRange && dateRange[0] && dateRange[1]) {
          const startDate = dateRange[0].format('YYYY-MM-DD');
          const endDate = dateRange[1].format('YYYY-MM-DD');
          allData = allData.filter(item => {
            const itemDate = item.created_at || item.last_updated;
            return itemDate >= startDate && itemDate <= endDate;
          });
        }
        
        setTableData(allData.slice(0, 50));
      }
      setLoading(false);
    }, 500);
  };

  // 处理洞察详情查看
  const handleViewInsight = (insight: AnalysisInsight) => {
    setSelectedInsight(insight);
    setInsightModalVisible(true);
  };

  // 处理洞察建议执行
  const handleExecuteSuggestion = (insight: AnalysisInsight) => {
    notification.success({
      message: '建议已记录',
      description: `已为"${insight.title}"创建处理任务，将在相关团队跟进处理。`,
      placement: 'topRight'
    });
  };

  // 生成洞察分析
  const handleGenerateInsights = () => {
    setGeneratingInsights(true);
    
    // 模拟AI分析生成过程
    setTimeout(() => {
      const generatedInsights = generateModelInsights(selectedModel);
      setInsights(generatedInsights);
      setInsightsGenerated(true);
      setGeneratingInsights(false);
      
      notification.success({
        message: '洞察生成完成',
        description: `已基于${mockDataModels.find(m => m.id === selectedModel)?.name}数据生成${generatedInsights.length}条业务洞察。`,
        placement: 'topRight'
      });
    }, 2000); // 模拟2秒的分析时间
  };

  // 获取影响程度的颜色和文字
  const getImpactConfig = (impact: string) => {
    const configs = {
      high: { color: '#f5222d', text: '高' },
      medium: { color: '#faad14', text: '中' },
      low: { color: '#52c41a', text: '低' }
    };
    return configs[impact as keyof typeof configs];
  };

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span style={{ color: '#52c41a' }}>↗</span>;
      case 'down':
        return <span style={{ color: '#f5222d' }}>↘</span>;
      default:
        return <span style={{ color: '#faad14' }}>→</span>;
    }
  };
  
  return (
    <ErrorBoundary>
      <div className="data-query-page" style={{ padding: '0' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
              <Title level={4} style={{ margin: 0 }}>数据查询</Title>
            <Text type="secondary">查询和浏览各业务类型的数据记录，支持分类统计和智能分析</Text>
            </Col>
        </Row>

        {/* 全局筛选区 - 包含业务类型选择和搜索 */}
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col flex="auto">
              <Space size="large" wrap>
                <div>
                  <Text strong style={{ marginRight: 8 }}>业务类型：</Text>
                  <Select 
                    style={{ width: 200 }} 
                    value={selectedModel} 
                    onChange={handleModelChange}
                  >
                    {mockDataModels.map(model => (
                      <Option key={model.id} value={model.id}>
                        {model.name}
                        <span style={{ color: '#999', marginLeft: 8 }}>({model.table})</span>
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Input.Search
                    placeholder="请输入关键词搜索"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                    enterButton
                  />
                  <Button 
                    type="link" 
                    icon={<ReloadOutlined />} 
                    onClick={handleReset}
                    style={{ marginLeft: 8 }}
                  >
                    重置
                  </Button>
                  <Tooltip title="数据映射查询">
                    <Button 
                      type="text" 
                      icon={<DatabaseOutlined />} 
                      onClick={() => navigate('/data-mapping')}
                      style={{ marginLeft: 8, color: '#1890ff' }}
                    >
                      映射查询
                    </Button>
                  </Tooltip>
                </div>
              </Space>
            </Col>
            <Col>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {mockDataModels.find(m => m.id === selectedModel)?.description}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* 动态筛选区 - 根据业务类型显示不同筛选项 */}
        <Card bordered={false} style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <Text strong style={{ fontSize: '14px', color: '#1890ff' }}>
              {mockDataModels.find(m => m.id === selectedModel)?.name}筛选条件
            </Text>
          </div>
          {(() => {
            const model = mockDataModels.find(m => m.id === selectedModel);
            if (!model) return null;
            
            const filterOptions = getFilterOptions(model.table);
            
            return (
              <Row gutter={[16, 16]} align="middle">
                {/* 时间周期筛选 - 所有业务类型共有 */}
                <Col span={6}>
                <div>
                    <Text style={{ fontSize: '13px', color: '#666' }}>时间周期：</Text>
                    <RangePicker
                      value={dateRange}
                      onChange={setDateRange}
                      style={{ width: '100%', marginTop: 4 }}
                      placeholder={['开始日期', '结束日期']}
                      format="YYYY-MM-DD"
                    />
                  </div>
                </Col>

                {/* 状态筛选 - 所有业务类型共有 */}
                <Col span={4}>
                  <div>
                    <Text style={{ fontSize: '13px', color: '#666' }}>状态：</Text>
                    <Select
                      style={{ width: '100%', marginTop: 4 }}
                      placeholder="选择状态"
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      allowClear
                    >
                      {filterOptions.statuses?.map(status => (
                        <Option key={status} value={status}>{status}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                {/* 地区筛选 - 所有业务类型共有 */}
                <Col span={4}>
                  <div>
                    <Text style={{ fontSize: '13px', color: '#666' }}>地区：</Text>
                    <Select
                      style={{ width: '100%', marginTop: 4 }}
                      placeholder="选择地区"
                      value={selectedRegion}
                      onChange={setSelectedRegion}
                      allowClear
                    >
                      {filterOptions.regions?.map(region => (
                        <Option key={region} value={region}>{region}</Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                {/* 客户数据特有筛选项 */}
                {model.table === 'customer' && (
                  <>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>客户等级：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择等级"
                          value={selectedLevel}
                          onChange={setSelectedLevel}
                          allowClear
                        >
                          {filterOptions.levels?.map(level => (
                            <Option key={level} value={level}>{level}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>获客渠道：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择渠道"
                          value={selectedChannel}
                          onChange={setSelectedChannel}
                          allowClear
                        >
                          {filterOptions.channels?.map(channel => (
                            <Option key={channel} value={channel}>{channel}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>所属行业：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择行业"
                          value={selectedIndustry}
                          onChange={setSelectedIndustry}
                          allowClear
                        >
                          {filterOptions.industries?.map(industry => (
                            <Option key={industry} value={industry}>{industry}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                  </>
                )}

                {/* 产品数据特有筛选项 */}
                {model.table === 'product' && (
                  <>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>产品类别：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择类别"
                          value={selectedCategory}
                          onChange={setSelectedCategory}
                          allowClear
                        >
                          {filterOptions.categories?.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>价格区间（元）：</Text>
                        <div style={{ display: 'flex', gap: '8px', marginTop: 4 }}>
                          <InputNumber
                            style={{ width: '50%' }}
                            placeholder="最低价"
                            value={amountRange[0]}
                            onChange={(value) => setAmountRange([value, amountRange[1]])}
                            min={0}
                          />
                          <InputNumber
                            style={{ width: '50%' }}
                            placeholder="最高价"
                            value={amountRange[1]}
                            onChange={(value) => setAmountRange([amountRange[0], value])}
                            min={0}
                          />
                        </div>
                      </div>
                    </Col>
                  </>
                )}

                {/* 销售数据特有筛选项 */}
                {model.table === 'sales' && (
                  <>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>优先级：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择优先级"
                          value={selectedPriority}
                          onChange={setSelectedPriority}
                          allowClear
                        >
                          {filterOptions.priorities?.map(priority => (
                            <Option key={priority} value={priority}>{priority}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>销售渠道：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择渠道"
                          value={selectedChannel}
                          onChange={setSelectedChannel}
                          allowClear
                        >
                          {filterOptions.channels?.map(channel => (
                            <Option key={channel} value={channel}>{channel}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>订单金额（元）：</Text>
                        <div style={{ display: 'flex', gap: '8px', marginTop: 4 }}>
                          <InputNumber
                            style={{ width: '50%' }}
                            placeholder="最低金额"
                            value={amountRange[0]}
                            onChange={(value) => setAmountRange([value, amountRange[1]])}
                            min={0}
                          />
                          <InputNumber
                            style={{ width: '50%' }}
                            placeholder="最高金额"
                            value={amountRange[1]}
                            onChange={(value) => setAmountRange([amountRange[0], value])}
                            min={0}
                          />
                        </div>
                      </div>
                    </Col>
                  </>
                )}

                {/* 库存数据特有筛选项 */}
                {model.table === 'inventory' && (
                  <>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>仓库：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择仓库"
                          value={selectedWarehouse}
                          onChange={setSelectedWarehouse}
                          allowClear
                        >
                          {filterOptions.warehouses?.map(warehouse => (
                            <Option key={warehouse} value={warehouse}>{warehouse}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>产品类别：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择类别"
                          value={selectedCategory}
                          onChange={setSelectedCategory}
                          allowClear
                        >
                          {filterOptions.categories?.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                  </>
                )}

                {/* 供应商数据特有筛选项 */}
                {model.table === 'supplier' && (
                  <>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>供应商等级：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择等级"
                          value={selectedLevel}
                          onChange={setSelectedLevel}
                          allowClear
                        >
                          {filterOptions.levels?.map(level => (
                            <Option key={level} value={level}>{level}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>供应商类别：</Text>
                        <Select
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder="选择类别"
                          value={selectedCategory}
                          onChange={setSelectedCategory}
                          allowClear
                        >
                          {filterOptions.categories?.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                          ))}
                        </Select>
                      </div>
                    </Col>
                  </>
                )}

                {/* 筛选操作按钮 */}
                <Col flex="auto" style={{ textAlign: 'right' }}>
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<SearchOutlined />} 
                      onClick={handleFilter}
                      style={{ marginRight: 8 }}
                    >
                      筛选
                  </Button>
                    <Button 
                      type="default" 
                      icon={<ReloadOutlined />} 
                      onClick={handleReset}
                    >
                      重置
                    </Button>
                  </Space>
                </Col>
              </Row>
            );
          })()}
        </Card>

        <Card bordered={false}>
          {/* 业务指标概览和智能分析 */}
          <Row gutter={[24, 16]} style={{ marginBottom: 24 }}>
            {/* 左侧：业务数据指标 */}
            <Col span={16}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <PieChartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                <Title level={5} style={{ margin: 0 }}>
                  {mockDataModels.find(m => m.id === selectedModel)?.name}业务指标
                </Title>
                </div>
              <Row gutter={[16, 16]}>
                {generateModelStatistics(selectedModel).map((stat, index) => (
                  <Col span={12} key={index}>
                    <Card 
                      size="small" 
                      className="statistics-card"
                      style={{ 
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                        borderLeft: `4px solid ${stat.color}`,
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      bodyStyle={{ padding: '20px 16px' }}
                      hoverable
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Text style={{ 
                          fontSize: '13px', 
                          fontWeight: 500,
                          color: '#666'
                        }}>
                          {stat.category}
                        </Text>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>
                          {getTrendIcon(stat.trend)}
              </div>
                      </div>
                      
                      <div style={{ 
                        fontSize: '28px', 
                        fontWeight: 'bold', 
                        color: stat.color,
                        lineHeight: '1.2',
                        marginBottom: '4px'
                      }}>
                        {stat.category.includes('价格') || stat.category.includes('销售额') || stat.category.includes('价值') 
                          ? `¥${(stat.count / 10000).toFixed(1)}万`
                          : stat.category.includes('率') || stat.category.includes('评分')
                          ? `${stat.count}%`
                          : stat.count.toLocaleString()
                        }
                      </div>
                      
                      {stat.percentage > 0 && stat.percentage < 100 && (
                        <Text style={{ 
                          fontSize: '11px', 
                          color: '#999',
                          fontWeight: '400'
                        }}>
                          占比 {stat.percentage}%
                        </Text>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            
            {/* 右侧：智能分析洞察 */}
            <Col span={8}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BulbOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  <Title level={5} style={{ margin: 0 }}>智能分析洞察</Title>
                </div>
                <Button 
                  type="primary"
                  size="small"
                  icon={<BulbOutlined />}
                  loading={generatingInsights}
                  onClick={handleGenerateInsights}
                  disabled={!selectedModel}
                  style={{ fontSize: '12px' }}
                >
                  {generatingInsights ? '生成中...' : '生成洞察'}
                </Button>
              </div>
              
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {!insightsGenerated && !generatingInsights && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 20px',
                    color: '#999',
                    background: '#fafafa',
                    borderRadius: '8px',
                    border: '1px dashed #d9d9d9'
                  }}>
                    <BulbOutlined style={{ fontSize: '24px', color: '#d9d9d9', marginBottom: '12px' }} />
                    <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                      点击"生成洞察"按钮<br />
                      基于选定业务数据进行AI智能分析
                    </div>
                  </div>
                )}
                
                {generatingInsights && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 20px',
                    color: '#1890ff',
                    background: '#f6ffed',
                    borderRadius: '8px',
                    border: '1px solid #b7eb8f'
                  }}>
                    <BulbOutlined style={{ fontSize: '24px', color: '#1890ff', marginBottom: '12px' }} />
                    <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                      AI正在分析业务数据...<br />
                      即将为您生成专业洞察
                    </div>
                  </div>
                )}
                
                {insightsGenerated && insights.length > 0 && insights.map((insight, index) => (
                  <Card 
                    key={insight.id}
                    size="small" 
                    style={{ marginBottom: 12 }}
                    bodyStyle={{ padding: '12px' }}
                    className="insight-compact-card"
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        marginRight: '8px',
                        flexShrink: 0
                      }}>
                        {insight.type === 'warning' ? (
                          <WarningOutlined style={{ color: '#faad14', fontSize: '12px' }} />
                        ) : insight.type === 'error' ? (
                          <ExclamationCircleOutlined style={{ color: '#f5222d', fontSize: '12px' }} />
                        ) : insight.type === 'success' ? (
                          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                        ) : (
                          <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '12px' }} />
                        )}
                      </div>
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}>
                          <Text strong style={{ fontSize: '13px' }}>
                            {insight.title}
                          </Text>
                          <Tag 
                            color={getImpactConfig(insight.impact).color}
                            style={{ fontSize: '10px', padding: '0 4px', lineHeight: '16px' }}
                          >
                            {getImpactConfig(insight.impact).text}
                          </Tag>
                        </div>
                        
                        <Text 
                          style={{ 
                            fontSize: '11px', 
                            color: '#666',
                            display: 'block',
                            marginBottom: '6px',
                            lineHeight: '1.3'
                          }}
                        >
                          {insight.description}
                        </Text>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button 
                            type="link" 
                            size="small"
                            onClick={() => handleViewInsight(insight)}
                            style={{ padding: '0', height: 'auto', fontSize: '11px' }}
                          >
                            详情
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {insightsGenerated && insights.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 20px',
                    color: '#999',
                    background: '#fafafa',
                    borderRadius: '8px'
                  }}>
                    <InfoCircleOutlined style={{ fontSize: '24px', color: '#d9d9d9', marginBottom: '12px' }} />
                    <div style={{ fontSize: '13px' }}>
                      当前数据暂无异常<br />
                      业务状态良好
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card>
        
        <Divider />
          
        {/* 数据明细 */}
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <FileTextOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                <Title level={5} style={{ margin: 0 }}>数据明细</Title>
              </div>
              <Table
                columns={columns}
                dataSource={tableData}
                loading={loading}
                className="data-table"
                pagination={{
                  pageSize: 10,
                  showTotal: (total) => `共 ${total} 条`,
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
                size="middle"
                bordered
                scroll={{ x: 'max-content' }}
              />
            </Col>
          </Row>
        </Card>
      </div>

      {/* 洞察详情模态框 */}
      <Modal
        title="分析洞察详情"
        open={insightModalVisible}
        onCancel={() => setInsightModalVisible(false)}
        className="insight-modal"
        footer={[
          <Button key="close" onClick={() => setInsightModalVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="execute" 
            type="primary" 
            onClick={() => {
              if (selectedInsight) {
                handleExecuteSuggestion(selectedInsight);
                setInsightModalVisible(false);
              }
            }}
          >
            执行建议
          </Button>
        ]}
      >
        {selectedInsight && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <Text strong>相关业务类型：</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>{selectedInsight.relatedModel}</Tag>
                  </div>
                  
                  <div>
                    <Text strong>影响程度：</Text>
                    <Tag 
                      color={getImpactConfig(selectedInsight.impact).color}
                      style={{ marginLeft: 8 }}
                    >
                      {getImpactConfig(selectedInsight.impact).text}
                    </Tag>
                  </div>
                  
                  <div>
                    <Text strong>问题描述：</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>{selectedInsight.description}</p>
                  </div>
                  
                  <div>
                    <Text strong>优化建议：</Text>
                    <p style={{ marginTop: 8, marginBottom: 0, color: '#52c41a' }}>
                      {selectedInsight.suggestion}
                    </p>
                  </div>
                </Space>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </ErrorBoundary>
  );
};

export default DataQuery; 