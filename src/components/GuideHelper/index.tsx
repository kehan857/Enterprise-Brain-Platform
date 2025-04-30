import React, { useState, useEffect } from 'react';
import { Tour, Popover, Steps, Button } from 'antd';
import type { TourProps } from 'antd';
import './styles.css';

interface GuideHelperProps {
  // 引导类型：tour-新手引导，help-上下文帮助，steps-流程指引
  type: 'tour' | 'help' | 'steps';
  // 当前页面或功能的标识
  pageKey: string;
  // 是否显示引导
  visible: boolean;
  // 引导完成回调
  onFinish?: () => void;
  // 关闭引导回调
  onClose?: () => void;
  // 帮助内容（用于上下文帮助类型）
  helpContent?: React.ReactNode;
  // 目标元素（用于上下文帮助类型）
  targetElement?: HTMLElement;
  // 当前步骤（用于流程指引类型）
  currentStep?: number;
  // 总步骤（用于流程指引类型）
  totalSteps?: number;
  // 是否为首次登录
  isFirstLogin?: boolean;
  // 是否允许跳过
  allowSkip?: boolean;
  // 稍后提醒回调
  onRemindLater?: () => void;
}

// 新手引导步骤配置
const ensureValidElements = (elements: (Element | null)[]): HTMLElement[] => {
  return elements.filter((el): el is HTMLElement => el instanceof HTMLElement);
};

const tourSteps: TourProps['steps'] = [
  {
    title: '欢迎来到企业大脑！',
    description: '这里是您的仪表盘，集中展示了数据接入状态、关键业务指标和重要通知。您可以随时回到这里了解平台整体运行情况。',
    target: () => {
      const element = document.querySelector('.ant-layout-content');
      return ensureValidElements([element || document.body])[0];
    },
    placement: 'bottom',
    mask: true,
  },
  {
    title: '第1步：连接数据与知识',
    description: '成功使用企业大脑的基础是接入数据和知识。请通过左侧菜单进入：\n\n- 数据管理: 在这里连接您的业务系统（如ERP、MES），映射数据，或上传线下数据。\n\n- 知识管理: 在这里上传您的企业文档（如工艺文件、操作手册），构建专属知识库。',
    target: () => {
      const dataMenu = document.querySelector('.ant-menu-submenu-data');
      if (dataMenu) return dataMenu as HTMLElement;
      const knowledgeMenu = document.querySelector('[data-menu-id="knowledge"]');
      if (knowledgeMenu) return knowledgeMenu as HTMLElement;
      return document.body;
    },
    placement: 'right',
    mask: true,
    nextButtonProps: {
      style: { marginTop: '8px' }
    },
  },
  {
    title: '第2步：启用智能应用与查看报告',
    description: '数据和知识就绪后，您可以启用强大的智能应用：\n\n- 智能分析/预测/告警中心: 在这里选择并配置智能体(Agent)，实现自动化分析、预测和告警。\n\n- 报表中心: 所有由智能体生成的报告都会汇总在这里，方便您随时查阅。',
    target: () => {
      const elements = [];
      const analysisMenu = document.querySelector('.ant-menu-submenu-analysis');
      const alertMenu = document.querySelector('.ant-menu-item-alert');
      const predictionMenu = document.querySelector('.ant-menu-item-prediction');
      const reportMenu = document.querySelector('.ant-menu-item-report-center');
      
      if (analysisMenu) elements.push(analysisMenu);
      if (alertMenu) elements.push(alertMenu);
      if (predictionMenu) elements.push(predictionMenu);
      if (reportMenu) elements.push(reportMenu);
      
      const validElements = ensureValidElements(elements.length > 0 ? elements : [document.body]);
      return validElements[0];
    },
    placement: 'right',
    mask: true,
    nextButtonProps: {
      style: { marginTop: '8px' }
    },
  },
  {
    title: '随时获得帮助：智能助手',
    description: '遇到问题？或想快速查询信息？点击这里随时与您的智能助手对话。它可以回答您的问题、解读报告，甚至辅助您完成一些操作。',
    target: () => {
      // 优先查找右侧智能助手卡片
      const assistantCard = document.querySelector('.ai-assistant-section');
      if (assistantCard) return assistantCard as HTMLElement;
      
      // 其次查找全局悬浮按钮
      const floatButton = document.querySelector('.ai-assistant-float');
      if (floatButton) return floatButton as HTMLElement;
      
      return document.body;
    },
    placement: 'left',
    mask: true,
    nextButtonProps: {
      children: '了解了，开启企业大脑！',
      style: { marginTop: '8px' }
    },
  },
];

// 功能模块帮助内容配置
const helpContents: Record<string, React.ReactNode> = {
  'data-mapping': (
    <div>
      <h4>数据映射说明</h4>
      <p>1. 选择数据源字段</p>
      <p>2. 选择目标指标</p>
      <p>3. 配置转换规则</p>
      <p>4. 验证并保存</p>
    </div>
  ),
  'agent-config': (
    <div>
      <h4>Agent配置说明</h4>
      <p>1. 选择Agent类型</p>
      <p>2. 配置触发条件</p>
      <p>3. 设置数据源</p>
      <p>4. 定义执行动作</p>
    </div>
  ),
};

const GuideHelper: React.FC<GuideHelperProps> = ({
  type,
  pageKey,
  visible,
  onFinish,
  onClose,
  helpContent,
  targetElement,
  currentStep = 0,
  totalSteps = 1,
  isFirstLogin = false,
  allowSkip = true,
  onRemindLater,
}) => {
  const [tourOpen, setTourOpen] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  useEffect(() => {
    if (type === 'tour') {
      setTourOpen(visible);
    } else if (type === 'help') {
      setHelpVisible(visible);
    }
  }, [type, visible]);

  const handleTourClose = () => {
    setTourOpen(false);
    onClose?.();
  };

  const handleTourFinish = () => {
    setTourOpen(false);
    onFinish?.();
  };

  const handleHelpClose = () => {
    setHelpVisible(false);
    onClose?.();
  };

  // 渲染新手引导
  if (type === 'tour') {
    return (
      <Tour
        open={tourOpen}
        onClose={handleTourClose}
        onFinish={handleTourFinish}
        steps={tourSteps}
        type="primary"
        rootClassName="guide-tour"
        zIndex={1000}
        arrow={true}
        indicatorProps={{
          style: {
            fontSize: '14px',
          },
        }}
        mask={{
          style: {
            transition: 'all 0.3s ease-in-out',
          },
        }}
        closeIcon={allowSkip}
        extra={allowSkip && (
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <Button size="small" onClick={onRemindLater}>稍后提醒</Button>
            <Button size="small" onClick={handleTourClose}>跳过引导</Button>
          </div>
        )}
      />
    );
  }

  // 渲染上下文帮助
  if (type === 'help' && targetElement) {
    return (
      <Popover
        open={helpVisible}
        onOpenChange={(visible) => {
          setHelpVisible(visible);
          if (!visible) {
            onClose?.();
          }
        }}
        content={helpContent || helpContents[pageKey]}
        title="操作指引"
        trigger="click"
        getPopupContainer={(trigger) => trigger.parentElement as HTMLElement}
      >
        {targetElement}
      </Popover>
    );
  }

  // 渲染流程指引
  if (type === 'steps') {
    return (
      <div className="guide-steps" style={{ margin: '16px 0' }}>
        <Steps
          current={currentStep}
          percent={Math.round((currentStep / totalSteps) * 100)}
          items={[
            {
              title: '选择数据源',
              description: '配置数据连接',
            },
            {
              title: '映射字段',
              description: '匹配标准指标',
            },
            {
              title: '配置规则',
              description: '设置转换逻辑',
            },
            {
              title: '验证部署',
              description: '确认并启用',
            },
          ]}
        />
      </div>
    );
  }

  return null;
};

export default GuideHelper;