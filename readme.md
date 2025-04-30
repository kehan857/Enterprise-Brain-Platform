好的，这是根据您提供的企业大脑平台PRD内容和参考格式完善的前端设计规范，已去除Markdown格式：

企业大脑服务平台 前端设计规范文档

项目背景与目标:

项目类型: 企业级智能服务平台 (Enterprise Intelligence Service Platform)，包含数据接入、治理、分析、可视化、知识管理、AI模型管理、Agent构建、任务调度、用户管理等多个复杂功能模块。

目标用户: 平台的目标用户群体多样，包括：

企业管理层/业务决策者：关注核心指标看板、分析报告、风险预警。

数据分析师/业务分析师：进行自主数据探索、报表制作、Agent规则配置。

AI工程师/数据工程师：管理模型、配置数据处理流程、开发高级Agent。

IT管理员：管理用户权限、平台配置、监控系统状态。

普通业务人员：使用知识问答、特定业务场景的智能助手、查看分配的任务或报告。

品牌/产品个性: 专业 (Professional)、可靠 (Reliable)、高效 (Efficient)、智能 (Intelligent)、安全 (Secure)、可扩展 (Scalable)、富有洞察力 (Insightful)。界面需体现数据的价值，支持复杂操作，同时保证不同用户角色的易用性。

核心设计原则:

用户中心化 (User-Centric): 设计需考虑不同角色用户的核心任务和使用场景，提供清晰、高效的操作路径。
一致性 (Consistency): 平台内所有模块在视觉风格、交互模式、术语使用上保持高度统一，遵循Ant Design规范。
清晰导航 (Clear Navigation): 复杂的平台功能需要清晰的层级和导航结构，帮助用户快速定位所需功能。
明确反馈 (Clear Feedback): 用户的操作（数据加载、保存配置、任务执行、模型训练等）需要得到及时、清晰、准确的系统反馈。
数据驱动呈现 (Data-Driven Presentation): 数据可视化（图表、看板）需准确、直观地传达信息，避免误导。
模块化与可扩展性 (Modularity & Scalability): 界面设计需支持平台模块化特性，易于扩展新功能。
效率优先 (Efficiency): 针对专业用户的操作流程（如配置、开发）需尽可能高效，减少冗余步骤。
可访问性 (Accessibility): 确保所有用户，包括有特殊需求的用户，都能无障碍使用平台。

规范内容要求:

色彩规范 (Color Palette): (遵循 Ant Design 色彩体系，确保平台整体专业感和一致性)

主色调 (Primary Color): 统一使用 Ant Design Daybreak Blue (#1677ff)。用于关键操作按钮（如“新建”、“保存”、“提交”）、当前导航高亮、重要引导元素、以及需要强调的交互状态。

辅助色调 (Secondary Colors): 主要使用主色的不同色阶（如 #69b1ff, #d9e7ff）或 Ant Design 的中性色盘。在复杂的数据可视化场景下，可依据 Ant Design Charts 或其他选定图表库的推荐色板，但需确保与主色调和谐，并优先考虑信息传达的清晰度。避免过多引入干扰性色彩。

强调色/点缀色 (Accent Color): 通常使用主色调。特定场景下（如新功能引导、高危操作确认），可在 AntD 色板中审慎选用一个点缀色（如 @warning-color, @success-color），使用范围需严格控制。

中性色 (Neutral Colors): 严格使用 Ant Design 的中性色板（Gray-1 至 Gray-10，或对应变量 @gray-1 到 @gray-10）。
主要文本: @text-color (#000000e0)
次要文本/占位符: @text-color-secondary (#000000a6)
禁用状态文本/图标: @disabled-color (#00000040)
边框: @border-color-base (#d9d9d9)
分割线: @divider-color (#0000000f)
组件/卡片背景: @component-background (#ffffff)
页面背景: @layout-body-background (#f0f2f5 或 #f5f5f5)，保持统一的浅灰色背景，营造专业工作环境。
表格头背景: @table-header-bg (#fafafa)

状态色 (Status Colors): 使用 Ant Design 标准状态色 (@success-color, @error-color, @warning-color, @info-color)，及其色阶。广泛用于表单校验、操作结果反馈、消息提示、状态标签、监控指标等。

提供值: 设计和开发中统一使用 Ant Design 的 Less 变量或 CSS-in-JS 主题变量。

字体规范 (Typography): (遵循 Ant Design 字体体系，确保信息层级清晰和可读性)

主要字体 (Primary Font Family): 使用 Ant Design 默认字体栈（优先系统字体：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'）。

备用字体 (Fallback Fonts): 已包含在字体栈中。

字号层级 (Font Sizes): 基于 Ant Design 的 @font-size-base: 14px。
页面/模块主标题 (H1): 24px (如“数据管理平台”、“模型训练任务”)
主要区域标题 (H2): 20px (如“数据源列表”、“知识库文档”)
卡片/分组标题 (H3): 16px (如“基本信息配置”、“Agent规则设置”)
表格内标题/小节标题 (H4): 14px (加粗)
Base (正文/表单标签/表格内容): 14px
Small (辅助说明/时间戳/输入提示): 12px
在数据密集型界面（如复杂表格、日志）中，可适当选用 12px 作为主要内容字号，但需保证清晰度。

字重 (Font Weights): Regular (400) 为主，用于正文、表单内容。Medium (500) 或 Semibold (600) 用于标题和需要强调的文本。

行高 (Line Height): 使用 Ant Design 默认 @line-height-base: 1.5715 (对于 14px 字体约为 22px)。

字间距 (Letter Spacing): 保持默认。

布局与间距 (Layout & Spacing): (遵循 Ant Design 间距规范，构建清晰、有秩序的界面结构)

基础间距单位 (Base Spacing Unit): 8px。

常用的间距值 (Spacing Scale): 严格使用 Ant Design 间距梯度 (xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 32px, xxl: 48px) 应用于元素（组件、区块）的 margin 和 padding。保持项目内一致性，例如卡片内边距统一为 lg (24px)，表单项垂直间距统一为 md (16px) 或 lg (24px)。

栅格系统 (Grid System): 使用 Ant Design 的 Row 和 Col (24列)。广泛用于页面整体布局（如侧边导航+内容区、顶部导航+内容区）、表单项排列、卡片组布局等。

列间距 (Gutter): 推荐使用 16px 或 24px，项目内统一。

响应式断点 (Breakpoints): 遵循 Ant Design 默认断点 (sm, md, lg, xl, xxl)。关键布局（如导航、主要内容区）需考虑响应式表现，尤其是在标准桌面宽度 (lg, xl) 下的表现。

页面布局模式 (Layout Patterns):
常用布局：顶部导航 + 左侧菜单 + 内容区；或仅顶部导航 + 内容区；或全屏内容区（如监控大屏）。项目内应统一主要布局模式。
内容区最大宽度：对于配置类、文档类页面，可设置最大内容宽度（如 1200px 或 1400px）并在宽屏下居中，提升阅读体验。对于需要宽阔空间的数据展示或操作界面（如仪表盘、流程编排），应允许内容区占满可用宽度。

核心 UI 组件规范 (Core UI Components): (基于 Ant Design 组件库，满足平台多样化功能需求)

通用组件:
Button: 区分主次操作，危险操作需二次确认。
Icon: 统一使用 @ant-design/icons 的 Outline 风格。
Typography: 用于规范文本展示。
Grid (Row, Col): 用于布局。
Layout: 用于构建页面骨架。
Space: 用于控制行内元素间距。
Divider: 用于内容分割。

导航组件:
Menu: 用于侧边栏或顶部导航。
Breadcrumb: 提供页面路径导航。
Tabs: 用于在同一页面组织不同视图或配置项。
Steps: 用于分步操作流程（如Agent创建向导）。
Pagination: 用于长列表或表格分页。

数据录入组件:
Form, Form.Item: 用于各类配置、设置、创建操作。标签清晰，校验规则明确，错误提示友好。
Input, InputNumber, Input.Password, Input.TextArea: 基础文本输入。
Select, Cascader, TreeSelect: 选择器。
Checkbox, Radio: 单选、多选。
DatePicker, TimePicker, RangePicker: 日期时间选择。
Upload: 文件/模型上传。
Slider: 滑块输入。
AutoComplete: 自动完成。
可能需要集成代码编辑器组件（如 Monaco Editor）用于 Prompt 编写、Agent 脚本编辑等。

数据展示组件:
Table: 用于展示结构化数据列表（数据源、模型列表、任务列表、日志等）。支持排序、筛选、自定义列、行操作。性能需优化以支持大数据量。
List: 用于展示非结构化或半结构化列表。
Card: 用于模块化组织信息和操作入口。
Descriptions: 用于展示只读的详情信息。
Tree: 用于展示层级结构数据（如文件目录、组织架构）。
Tag: 用于标记状态、分类、关键词。
Badge: 用于消息提示、状态角标。
Avatar: 用于用户或实体标识。
Image: 用于图片展示（如知识库中的图片）。
Statistic: 用于突出显示关键数值。
Tooltip, Popover: 用于辅助说明和快捷操作。
Visualization Charts: 集成图表库（如 Ant Design Charts, ECharts），提供丰富的图表类型（折线图、柱状图、饼图、散点图、仪表盘、关系图等）用于数据分析和监控大屏。图表样式需与整体风格协调。

反馈组件:
Alert: 用于页面内展示警告、提示信息。
Message, Notification: 用于全局操作反馈。
Modal: 用于对话框、确认框、复杂表单提交。
Drawer: 用于侧边弹出面板，展示详情或进行配置。
Popconfirm: 用于二次确认简单操作。
Progress: 用于显示任务进度、资源使用率。
Spin: 用于表示加载状态。
Result: 用于显示操作结果页面（成功、失败、进行中）。
Skeleton: 用于优化加载体验。

特定模块组件:
可能需要自定义或封装特定业务组件，如：
流程编排/节点编辑器 (Node Editor): 用于 Agent 构建、Workflow 设计。
文档查看器 (Document Viewer): 用于知识库文档预览。
日志查看器 (Log Viewer): 提供搜索、高亮、实时滚动等功能。
规则引擎编辑器 (Rule Engine Editor): 用于配置 Agent 触发规则等。

图标规范 (Iconography): (使用 Ant Design Icons，保持视觉一致性与语义清晰)

指定图标风格 (Icon Style): 统一使用 Outline (线条) 图标 (@ant-design/icons)。

指定图标库 (Icon Library): 必须使用 @ant-design/icons，避免混用其他图标库。

定义常用图标尺寸 (Icon Sizes): 多数情况与文本字号对齐 (14px/16px)。在按钮、菜单等组件中使用其默认或指定尺寸。需保持视觉和谐。

说明图标颜色使用规则: 默认继承父元素的文本颜色 (@text-color-secondary 或 @text-color)。语义图标（如表单校验成功/失败、状态标签）使用对应的状态色 (@success-color, @error-color, @warning-color)。禁用状态使用 @disabled-color。

交互与动效 (Interaction & Animation): (遵循 Ant Design 动效原则：自然、高效、克制)

设定基本原则: 动效主要用于提升交互流畅性、提供操作反馈、引导注意力，避免过度动画干扰用户。

定义标准过渡效果 (Standard Transitions): 沿用 Ant Design 的默认过渡效果 (@animation-duration-base, ease-in-out)。

指定常用微交互 (Microinteractions) 的模式:
加载状态：使用 Spin 组件或按钮 loading 状态。
操作反馈：表单提交、配置保存后，使用 Message 或 Notification 给出明确反馈。
数据刷新：表格、列表数据更新时提供视觉提示。
Hover 效果：可交互元素（按钮、链接、列表项）需有清晰的 hover 状态。
拖拽交互：在仪表盘搭建、流程编排等场景，提供流畅的拖拽体验和视觉反馈。
组件自带交互：直接使用 AntD 组件的内置交互效果（如下拉菜单、模态框弹出、折叠面板展开等）。

可访问性 (Accessibility - A11y): (利用 Ant Design 的 A11y 基础，确保平台可用性)

强调 WCAG 标准: 目标达到 WCAG 2.1 AA 级别。

要求:
色彩对比度：确保文本与背景、控件与背景的对比度符合标准。
焦点管理：所有可交互元素必须能接收键盘焦点，且焦点指示器清晰可见。
键盘可操作：所有功能必须能仅通过键盘完成操作。
图像替代文本：所有非装饰性图片必须提供有意义的 alt 文本。
语义化 HTML：使用正确的 HTML 标签构建页面结构。
ARIA 属性：在必要时使用 ARIA (Accessible Rich Internet Applications) 属性增强复杂组件（如图表、自定义控件）的可访问性。

命名规范 (Naming Conventions):

CSS/JS/TS: 遵循项目统一规范。推荐使用 CSS Modules 或 CSS-in-JS 避免全局样式冲突。组件、变量、函数采用驼峰命名法 (camelCase 或 PascalCase)。样式类名可遵循 BEM (Block Element Modifier) 约定或其他团队统一规范。

性能考虑 (Performance):

代码优化:
按需加载：利用框架特性（如 React.lazy, Vue async components）实现路由和大型组件的按需加载。
AntD 按需引入：配置 babel-plugin-import 或使用 Vite 插件实现 AntD 组件和样式的按需引入。
合理使用 Memoization：对计算成本高的组件或函数使用 React.memo, useMemo, useCallback 等进行优化。
虚拟滚动/列表：对于超长列表或表格（如日志、大量数据展示），采用虚拟滚动技术提升渲染性能。
图片优化: 上传的图片资源需进行压缩和格式优化。使用适当尺寸的图片。
数据请求优化: 避免不必要的重复请求，合理缓存数据，对后端 API 进行分页或增量加载设计。
图表性能: 对于复杂或数据量大的图表，关注渲染性能，考虑降采样或其他优化手段。

本规范为“企业大脑服务平台”整体前端提供了基于 Ant Design 的详细设计指导。旨在构建一个专业、高效、可靠、易用且风格统一的企业级智能服务平台。团队成员需严格遵守本规范，共同保障平台的高质量用户体验。