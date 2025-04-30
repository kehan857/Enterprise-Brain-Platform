import React, { useState } from 'react';
import { Spin, Empty, Result } from 'antd';
import { FileTextOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FilePptOutlined } from '@ant-design/icons';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

interface DocumentPreviewProps {
  type?: string;
  url?: string;
  loading?: boolean;
  error?: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ type, url, loading: externalLoading, error: externalError }) => {
  const [internalLoading, setInternalLoading] = useState(true);
  const [internalError, setInternalError] = useState<string>();
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
            zoom: {
              defaultZoom: 1,
              zoomJump: 0.2
            },
            pdfVerticalScrollByDefault: true
          }}
          onError={(e) => {
            console.error('Document preview error:', e);
            setInternalError('文档加载失败，请检查文档格式或网络连接');
          }}
          beforeLoad={() => {
            setInternalLoading(true);
            setInternalError(undefined);
          }}
          afterLoad={() => {
            setInternalLoading(false);
          }}
        />
        {internalLoading && (
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