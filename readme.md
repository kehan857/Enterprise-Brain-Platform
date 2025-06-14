# 企业大脑服务平台

一个基于React和TypeScript构建的现代化企业数据管理和分析平台，集成了数据查询、智能分析、目标管理、报告生成等功能。

## 🚀 功能特性

### 数据管理
- **数据查询**: 支持多业务类型的数据查询和筛选
- **智能分析**: AI驱动的业务洞察生成
- **数据映射**: 业务数据关联关系可视化
- **数据采集**: 多源数据接入和治理

### 目标管理
- **目标设置**: 层级化目标录入和管理
- **目标跟踪**: 实时目标达成情况监控
- **考核指标**: 多维度业务指标管理

### 报告分析
- **营销报告**: 可视化营销数据分析
- **预测分析**: 基于历史数据的趋势预测
- **智能看板**: 自定义业务仪表盘

### 知识管理
- **文档管理**: 企业知识文档存储和检索
- **FAQ问答**: 智能问答系统
- **帮助中心**: 用户操作指南

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **UI组件库**: Ant Design + Ant Design Pro Components
- **构建工具**: Vite
- **路由管理**: React Router DOM
- **数据可视化**: @antv/g2plot
- **样式预处理**: Less
- **代码规范**: ESLint + Prettier

## 📦 项目结构

```
企业大脑服务平台/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 公共组件
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面组件
│   │   ├── dashboard/     # 仪表盘
│   │   ├── data/          # 数据管理
│   │   ├── target/        # 目标管理
│   │   ├── report/        # 报告分析
│   │   ├── knowledge/     # 知识管理
│   │   └── ...
│   ├── router/            # 路由配置
│   └── styles/            # 全局样式
├── .github/workflows/     # GitHub Actions
└── package.json
```

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/username/企业大脑服务平台.git

# 进入项目目录
cd 企业大脑服务平台

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🌐 在线访问

项目已部署到GitHub Pages，可通过以下链接访问：

**🔗 [企业大脑服务平台 - 在线演示](https://kehan857.github.io/Enterprise-Brain-Platform/)**

## 📝 主要功能模块

### 1. 数据查询分析
- 支持客户、产品、销售、库存等多维度数据查询
- 动态筛选条件，支持时间范围、状态、地区等筛选
- AI智能分析洞察，自动生成业务建议
- 数据明细表格展示，支持导出和打印

### 2. 目标管理系统
- 层级化目标设置，支持年度、季度、月度目标
- 多维度考核指标管理（营销、生产、研发、财务等）
- 目标完成情况跟踪和预警
- 目标数据导入导出功能

### 3. 智能报告中心
- 营销报告自动生成和可视化展示
- 预测分析模型，支持趋势预测和市场分析
- 自定义报告模板和参数配置
- 报告分享和协作功能

### 4. 知识管理平台
- 企业文档智能分类和全文检索
- FAQ智能问答系统
- 操作手册和帮助文档
- 知识分享和协作

## 🔧 开发说明

### 环境要求
- Node.js >= 16
- npm >= 8

### 开发规范
- 使用TypeScript进行类型安全开发
- 遵循Ant Design设计规范
- 组件化开发，提高代码复用性
- 响应式设计，支持多端适配

### 部署流程
1. 代码提交到main分支
2. GitHub Actions自动触发构建
3. 构建成功后自动部署到GitHub Pages
4. 通过Pages链接访问最新版本

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📞 联系我们

如有问题或建议，请联系开发团队。

---

**企业大脑服务平台** - 让数据驱动企业决策，让智能赋能业务增长！