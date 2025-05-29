import React, { useState, useEffect } from 'react';
import { Spin, Empty, Result, Typography } from 'antd';
import { FileTextOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FilePptOutlined } from '@ant-design/icons';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const { Paragraph, Title } = Typography;

interface DocumentPreviewProps {
  type?: string;
  url?: string;
  loading?: boolean;
  error?: string;
}

// 模拟文档内容
const getDocumentSampleContent = (type: string, title?: string) => {
  switch (type) {
    case 'pdf':
      return `# ${title || '文档标题'}
      
这是一个PDF文档的示例预览内容。

## 文档概述
这份PDF文档主要包含了企业相关的重要信息和数据，用于展示、分析和归档。

## 主要内容
1. 文档简介和背景
2. 数据分析和解读
3. 结论和建议
4. 未来规划和展望

## 注意事项
本文档仅用于内部参考，请勿外传。根据公司管理制度，所有涉密文档必须按照相关流程进行存储和传阅。`;

    case 'excel':
      return `# ${title || '数据表格'}

这是一个Excel数据表格的示例预览内容。

## 数据表格概览
| 序号 | 指标名称 | Q1数据 | Q2数据 | Q3数据 | Q4数据 | 年度合计 |
|------|----------|--------|--------|--------|--------|----------|
| 1    | 销售额   | 125.6  | 143.2  | 156.8  | 182.3  | 607.9    |
| 2    | 利润率   | 23%    | 25%    | 26%    | 28%    | 25.5%    |
| 3    | 客户数   | 1,253  | 1,485  | 1,629  | 1,892  | 1,892    |
| 4    | 转化率   | 3.2%   | 3.5%   | 3.8%   | 4.1%   | 3.65%    |
| 5    | 客诉率   | 0.8%   | 0.7%   | 0.6%   | 0.5%   | 0.65%    |

## 数据分析结论
根据上述数据，我们可以看出业务呈稳定增长趋势，各项关键指标均有所提升。`;

    case 'word':
      return `# ${title || '文档标题'}

这是一个Word文档的示例预览内容。

## 文档概要
本文档是针对企业运营情况的分析报告，包含了多个方面的内容和建议。

## 主要发现
1. 企业在过去一年中业绩显著提升，营收增长了23%
2. 员工满意度调查得分从78分提高到85分
3. 客户留存率提高了12个百分点，达到历史最高水平
4. 产品质量问题数量下降了35%

## 改进建议
- 进一步优化生产流程，提高生产效率
- 加强员工培训，提升专业技能和服务质量
- 扩大市场营销投入，提高品牌知名度
- 推进数字化转型，提升运营效率和客户体验

## 总结
总体而言，企业各项指标健康发展，管理团队应继续保持现有策略并针对性解决发现的问题。`;

    case 'text':
    default:
      return `# ${title || '文本文档'}

这是一个纯文本文档的示例预览内容。

这份文档包含了企业的相关信息和规范要求。作为参考资料，它提供了关于企业运营、管理和发展的指导原则。

文档主要内容包括：
1. 企业宗旨和愿景
2. 组织架构和职责划分
3. 工作流程和制度规范
4. 员工守则和行为准则
5. 培训计划和职业发展通道

所有员工都应当熟悉本文档内容，并按照文档中的要求开展工作。如有疑问，请咨询你的直接主管或人力资源部门。

文档版本：V2.3
更新日期：2024-04-15
审核人：张三`;
  }
};

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ type = 'text', url, loading: externalLoading, error: externalError }) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const [internalError, setInternalError] = useState<string>();
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  
  useEffect(() => {
    // 从URL中提取文档标题
    if (url) {
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      setDocTitle(fileName.split('.')[0] || '文档预览');
    }
    
    // 如果是text类型或者是模拟路径，直接显示文本预览
    if (type === 'text' || url?.includes('sample-data') || !url?.startsWith('http')) {
      setShowTextPreview(true);
      setInternalLoading(false);
    }
    
    // 30秒后如果还在加载，自动切换到文本预览模式
    const timer = setTimeout(() => {
      if (internalLoading) {
        setShowTextPreview(true);
        setInternalLoading(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [type, url, internalLoading]);
  
  const renderIcon = () => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <FilePdfOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined style={{ fontSize: 48, color: '#1677ff' }} />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined style={{ fontSize: 48, color: '#52c41a' }} />;
      case 'ppt':
      case 'pptx':
        return <FilePptOutlined style={{ fontSize: 48, color: '#fa8c16' }} />;
      default:
        return <FileTextOutlined style={{ fontSize: 48, color: '#8c8c8c' }} />;
    }
  };

  if (externalLoading) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip="文档加载中..." />
      </div>
    );
  }

  if (externalError || internalError) {
    return (
      <Result
        status="error"
        title="预览失败"
        subTitle={externalError || internalError}
      />
    );
  }

  if (!url) {
    return (
      <Empty
        image={renderIcon()}
        description="暂无可预览内容"
      />
    );
  }
  
  // 显示文本预览
  if (showTextPreview) {
    const sampleContent = getDocumentSampleContent(type, docTitle);
    
    return (
      <div style={{ height: '100%', padding: 24, background: '#fff', borderRadius: 8, overflow: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          {renderIcon()}
        </div>
        <div style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.8',
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '8px',
          border: '1px solid #e8e8e8'
        }}>
          {sampleContent.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('#')) {
              // 处理标题
              if (paragraph.startsWith('# ')) {
                return <Title level={1} key={i}>{paragraph.substring(2)}</Title>;
              } else if (paragraph.startsWith('## ')) {
                return <Title level={2} key={i}>{paragraph.substring(3)}</Title>;
              } else if (paragraph.startsWith('### ')) {
                return <Title level={3} key={i}>{paragraph.substring(4)}</Title>;
              }
            } else if (paragraph.includes('|') && paragraph.includes('-')) {
              // 简单处理表格
              return (
                <div key={i} style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', marginBottom: '20px' }}>
                    <tbody>
                      {paragraph.split('\n').map((row, rowIndex) => (
                        <tr key={rowIndex} style={{ 
                          borderBottom: '1px solid #e8e8e8', 
                          background: rowIndex === 0 ? '#fafafa' : 'transparent'
                        }}>
                          {row.split('|').filter(Boolean).map((cell, cellIndex) => (
                            <td key={cellIndex} style={{ 
                              padding: '12px 8px', 
                              textAlign: cell.trim().startsWith('-') ? 'center' : 'left'
                            }}>
                              {cell.trim().replace(/-/g, '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            } else if (paragraph.startsWith('- ')) {
              // 处理无序列表
              return (
                <ul key={i} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  {paragraph.split('\n').map((item, itemIndex) => (
                    <li key={itemIndex}>{item.substring(2)}</li>
                  ))}
                </ul>
              );
            } else if (paragraph.match(/^\d+\./)) {
              // 处理有序列表
              return (
                <ol key={i} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  {paragraph.split('\n').map((item, itemIndex) => {
                    const itemText = item.replace(/^\d+\.\s+/, '');
                    return <li key={itemIndex}>{itemText}</li>;
                  })}
                </ol>
              );
            }
            
            // 普通段落
            return <Paragraph key={i}>{paragraph}</Paragraph>;
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', padding: 24, background: '#fff', borderRadius: 8 }}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        {renderIcon()}
      </div>
      <div style={{ height: 'calc(100% - 80px)', overflow: 'hidden' }}>
        <DocViewer
          documents={[{ uri: url, fileType: type?.toLowerCase() }]}
          pluginRenderers={DocViewerRenderers}
          style={{ height: '100%', width: '100%', position: 'relative' }}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true
            },
            pdfVerticalScrollByDefault: true
          }}
          onError={(error: any) => {
            console.error('Document preview error:', error);
            setShowTextPreview(true);
            setInternalLoading(false);
          }}
          beforeLoad={() => {
            if (!showTextPreview) {
              setInternalLoading(true);
              setInternalError(undefined);
            }
          }}
          afterLoad={() => {
            setInternalLoading(false);
          }}
        />
        {internalLoading && !showTextPreview && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <Spin size="large" tip="文档加载中..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;