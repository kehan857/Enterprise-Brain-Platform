# 搜索组件规范说明

## 1. 组件概述

本文档规范了系统中所有列表页面的搜索组件实现标准，确保整个系统中的搜索功能交互一致，提升用户体验。

## 2. 搜索组件标准结构

### 2.1 基础搜索区

- **搜索字段选择器**：下拉选择不同的搜索字段
- **关键词输入框**：支持输入搜索关键词
- **高级搜索切换按钮**：展开/收起高级搜索面板
- **快捷筛选标签**：常用筛选条件的快捷方式

### 2.2 高级搜索区

- **多维度筛选条件**：支持日期范围、下拉选择、数值范围、文本输入等多种筛选方式
- **排序选项**：提供多种数据排序方式
- **功能按钮**：包括重置、应用筛选、保存筛选、导出数据

## 3. 数据类型定义

```typescript
// 搜索字段配置
interface SearchField {
  label: string;  // 展示名称
  value: string;  // 对应字段值
}

// 筛选条件配置
interface FilterConfig {
  type: 'date' | 'dateRange' | 'select' | 'numberRange' | 'input';  // 筛选类型
  label: string;  // 展示名称
  field: string;  // 对应字段
  span?: number;  // 栅格宽度
  placeholder?: string | string[];  // 输入提示
  options?: Array<{ label: string; value: string | number }>;  // 选项列表
  mode?: 'multiple' | 'tags';  // 选择模式
}

// 快捷筛选条件
interface QuickFilter {
  label: string;  // 展示名称
  value: Record<string, any>;  // 筛选条件值
  color?: string;  // 标签颜色
}

// 排序选项
interface SortOption {
  label: string;  // 展示名称
  value: string;  // 排序值
}
```

## 4. 组件属性

| 属性名 | 类型 | 说明 |
|-------|------|------|
| searchFields | SearchField[] | 搜索字段配置，如全部、名称、ID等 |
| filters | FilterConfig[] | 筛选条件配置 |
| sortOptions | SortOption[] | 排序选项配置 |
| quickFilters | QuickFilter[] | 快捷筛选配置 |
| enableExport | boolean | 是否启用导出功能 |

## 5. 组件事件

| 事件名 | 参数 | 说明 |
|-------|------|------|
| search | { field, value, advancedFilters } | 基础搜索触发 |
| filter | { ...filterValues, sortBy } | 应用高级筛选触发 |
| export | { searchField, searchValue, advancedFilters } | 导出结果触发 |
| save-filter | { ...filterValues, name } | 保存筛选条件触发 |

## 6. 页面集成规范

### 6.1 组件引入

```typescript
import SearchComponent from '../components/SearchComponent.vue'
import type { FilterConfig, SearchField, SortOption, QuickFilter } from '../types/search'
```

### 6.2 标准布局结构

```html
<div class="header-actions">
  <div class="search-wrapper">
    <SearchComponent 
      :search-fields="searchFields"
      :filters="filters"
      :sort-options="sortOptions"
      :quick-filters="quickFilters"
      :enable-export="true"
      @search="handleSearch"
      @filter="handleFilter"
      @export="handleExport"
      @save-filter="handleSaveFilter"
      class="custom-search-component"
    />
  </div>
  <div class="action-wrapper">
    <a-button type="primary" class="add-button">
      <template #icon><PlusOutlined /></template>
      添加
    </a-button>
  </div>
</div>
```

### 6.3 标准样式

```css
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .search-wrapper {
    width: 70%;
    max-width: 800px;
  }
  
  .action-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}

.add-button {
  margin-left: 16px;
}

:deep(.custom-search-component) {
  width: 100%;
  
  .ant-input-group {
    display: flex;
    align-items: center;
  }
  
  .ant-input-search {
    width: 100%;
  }
  
  .ant-btn {
    height: 32px;
  }
}
```

## 7. 配置参考示例

以下是当前系统中各模块搜索配置的参考示例：

### 7.1 Agent管理模块

```typescript
// 搜索字段配置
const searchFields: SearchField[] = [
  { label: '全部', value: 'all' },
  { label: 'Agent名称', value: 'name' },
  { label: '类型', value: 'type' },
  { label: '行业', value: 'industry' },
  { label: '业务领域', value: 'businessDomain' }
]

// 筛选条件配置
const filters: FilterConfig[] = [
  {
    type: 'select',
    label: 'Agent类型',
    field: 'type',
    span: 8,
    options: [
      { label: '问答型', value: 'qa' },
      { label: '分析型', value: 'analysis' },
      { label: '监控型', value: 'monitor' },
      { label: '预测型', value: 'prediction' }
    ]
  },
  {
    type: 'select',
    label: '所属行业',
    field: 'industry',
    span: 8,
    options: [
      { label: '制造业', value: 'manufacturing' },
      { label: '采矿业', value: 'mining' },
      { label: '电力、燃气及水生产和供应业', value: 'energy' },
      { label: '交通运输、仓储和邮政业', value: 'logistics' },
      { label: '信息传输、软件和信息技术服务业', value: 'it' },
      { label: '科学研究和技术服务业', value: 'research' },
      { label: '水利、环境和公共设施管理业', value: 'environment' },
      { label: '其他行业', value: 'other' }
    ]
  },
  {
    type: 'select',
    label: '业务领域',
    field: 'businessDomain',
    span: 8,
    options: [
      { label: '经营', value: 'operation' },
      { label: '营销', value: 'marketing' },
      { label: '生产', value: 'production' },
      { label: '质控', value: 'quality' },
      { label: '研发', value: 'rd' },
      { label: '财务', value: 'finance' },
      { label: '人事', value: 'hr' }
    ]
  },
  {
    type: 'select',
    label: '状态',
    field: 'status',
    span: 8,
    options: [
      { label: '启用', value: 'enabled' },
      { label: '禁用', value: 'disabled' }
    ]
  },
  {
    type: 'dateRange',
    label: '创建时间',
    field: 'createTime',
    span: 8
  },
  {
    type: 'select',
    label: '可访问版本',
    field: 'allowedVersions',
    span: 8,
    options: [
      { label: '免费版', value: 'free' },
      { label: '基础版', value: 'basic' },
      { label: '标准版', value: 'standard' },
      { label: '专业版', value: 'professional' },
      { label: '旗舰版', value: 'enterprise' }
    ],
    mode: 'multiple'
  }
]

// 排序选项
const sortOptions: SortOption[] = [
  { label: '创建时间：从新到旧', value: 'createTime,desc' },
  { label: '创建时间：从旧到新', value: 'createTime,asc' },
  { label: '使用频率：从高到低', value: 'useFrequency,desc' },
  { label: '使用频率：从低到高', value: 'useFrequency,asc' }
]

// 快捷筛选
const quickFilters: QuickFilter[] = [
  { label: '已启用', value: { status: 'enabled' }, color: 'green' },
  { label: '已禁用', value: { status: 'disabled' }, color: 'red' },
  { label: '问答型', value: { type: 'qa' }, color: 'blue' },
  { label: '分析型', value: { type: 'analysis' }, color: 'purple' }
]
```

### 7.2 数据管理模块

```typescript
// 指标搜索字段
const metricsSearchFields: SearchField[] = [
  { label: '全部', value: 'all' },
  { label: '指标名称', value: 'name' },
  { label: '指标编码', value: 'code' },
  { label: '业务定义', value: 'description' },
  { label: '负责人', value: 'owner' }
]

// 指标筛选条件
const metricsFilters: FilterConfig[] = [
  {
    type: 'select',
    label: '行业/业务域',
    field: 'businessDomain',
    span: 8,
    options: [
      { label: '经营', value: 'business' },
      { label: '营销', value: 'marketing' },
      { label: '生产', value: 'production' },
      { label: '质控', value: 'quality' },
      { label: '研发', value: 'research' },
      { label: '财务', value: 'finance' },
      { label: '人事', value: 'hr' },
      { label: '其他', value: 'other' }
    ],
    mode: 'multiple'
  },
  {
    type: 'select',
    label: '指标结构类型',
    field: 'structureType',
    span: 8,
    options: [
      { label: '原子指标', value: 'atomic' },
      { label: '复合指标', value: 'composite' },
      { label: '派生指标', value: 'derived' }
    ]
  },
  {
    type: 'select',
    label: '状态',
    field: 'status',
    span: 8,
    options: [
      { label: '激活', value: 'active' },
      { label: '草稿', value: 'draft' },
      { label: '已停用', value: 'disabled' }
    ]
  },
  {
    type: 'dateRange',
    label: '创建时间',
    field: 'createTime',
    span: 8
  },
  {
    type: 'input',
    label: '负责人',
    field: 'owner',
    span: 8,
    placeholder: '请输入负责人姓名'
  }
]
```

## 8. 事件处理函数示例

```typescript
// 搜索事件处理
const handleSearch = (params: Record<string, any>) => {
  console.log('搜索参数:', params)
  // 调用API获取数据
  loading.value = true
  setTimeout(() => {
    // 模拟API调用
    loading.value = false
  }, 500)
}

// 筛选事件处理
const handleFilter = (params: Record<string, any>) => {
  console.log('筛选参数:', params)
  // 调用API获取数据
  loading.value = true
  setTimeout(() => {
    // 模拟API调用
    loading.value = false
  }, 500)
}

// 导出事件处理
const handleExport = (params: Record<string, any>) => {
  console.log('导出参数:', params)
  // 调用API导出数据
}

// 保存筛选条件
const handleSaveFilter = (filter: Record<string, any>) => {
  console.log('保存筛选条件:', filter)
  // 保存筛选条件
}
```