import React, { useState } from 'react';
import { Modal, Upload, Button, Row, Col, Typography, Space, Alert, Divider, message, Card } from 'antd';
import { UploadOutlined, DownloadOutlined, InboxOutlined, FileExcelOutlined, FilePdfOutlined, FileWordOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;
const { Title, Text, Paragraph } = Typography;

export interface UploadGuideModalProps {
  /**
   * 弹窗是否可见
   */
  open: boolean;
  /**
   * 弹窗标题
   */
  title?: string;
  /**
   * 上传模块标题
   */
  uploadTitle?: string;
  /**
   * 上传说明文本
   */
  uploadDescription?: string;
  /**
   * 描述文本
   */
  description?: string;
  /**
   * 模板下载按钮文字
   */
  templateButtonText?: string;
  /**
   * 模板下载URL
   */
  templateUrl?: string;
  /**
   * 上传成功回调
   */
  onSuccess?: (fileList: any[]) => void;
  /**
   * 关闭弹窗回调
   */
  onClose: () => void;
  /**
   * 下载模板回调
   */
  onDownloadTemplate?: () => void;
  /**
   * 支持的文件类型
   */
  acceptTypes?: string[];
  /**
   * 最大文件大小（MB）
   */
  maxSize?: number;
  /**
   * 上传文件接口的URL
   */
  uploadUrl?: string;
}

const UploadGuideModal: React.FC<UploadGuideModalProps> = ({
  open,
  title = '文件上传指引',
  uploadTitle = '上传数据文件',
  uploadDescription = '上传您的数据文件',
  description = '请按照以下步骤上传您的数据文件',
  templateButtonText = '下载模板',
  templateUrl = '',
  onSuccess,
  onClose,
  onDownloadTemplate,
  acceptTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv'],
  maxSize = 10,
  uploadUrl = '/api/upload'
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  // 处理模板下载
  const handleDownloadTemplate = () => {
    if (onDownloadTemplate) {
      onDownloadTemplate();
    } else if (templateUrl) {
      window.open(templateUrl, '_blank');
    }
  };

  // 处理文件上传前的校验
  const beforeUpload = (file: File) => {
    // 校验文件类型
    const isAcceptType = acceptTypes.some(type => 
      file.name.toLowerCase().endsWith(type));
    
    if (!isAcceptType) {
      message.error(`只支持上传以下格式: ${acceptTypes.join(', ')}`);
      return Upload.LIST_IGNORE;
    }
    
    // 校验文件大小
    const isLessThanMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLessThanMaxSize) {
      message.error(`文件大小不能超过 ${maxSize}MB!`);
      return Upload.LIST_IGNORE;
    }
    
    return true;
  };

  // 上传配置
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: uploadUrl,
    fileList: fileList,
    beforeUpload: beforeUpload,
    onChange(info) {
      const newFileList = [...info.fileList];
      
      // 限制只显示最近上传的文件
      const limitedFileList = newFileList.slice(-5);
      
      // 更新文件列表状态
      setFileList(limitedFileList);
      
      // 处理上传状态变化
      const { status } = info.file;
      if (status === 'uploading') {
        setUploading(true);
      } else if (status === 'done') {
        setUploading(false);
        message.success(`${info.file.name} 上传成功。`);
        if (info.fileList.every(file => file.status === 'done')) {
          // 所有文件上传成功
          if (onSuccess) {
            onSuccess(info.fileList);
          }
        }
      } else if (status === 'error') {
        setUploading(false);
        message.error(`${info.file.name} 上传失败。`);
      }
    },
    onDrop(e) {
      console.log('拖放文件: ', e.dataTransfer.files);
    },
  };

  // 重置状态
  const handleCancel = () => {
    setFileList([]);
    onClose();
  };

  return (
    <Modal
      title={title}
      open={open}
      width={800}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          关闭
        </Button>,
      ]}
    >
      <Alert
        message="上传说明"
        description="请先下载模板文件，按要求填写数据后上传。上传前请确保数据格式与模板一致。"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      
      <Row gutter={24}>
        <Col span={12}>
          <Card title="模板下载" className="guide-card">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Space size="large">
                  <FileExcelOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                  <FilePdfOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
                  <FileWordOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                </Space>
              </div>
              
              <Paragraph>
                请下载标准模板，按照模板格式填写您的数据
              </Paragraph>
              
              <ul style={{ marginBottom: 16 }}>
                <li>请不要修改模板的结构和格式</li>
                <li>保持必填字段的完整性</li>
                <li>日期格式建议使用YYYY-MM-DD</li>
              </ul>
              
              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownloadTemplate}
                  disabled={!templateUrl && !onDownloadTemplate}
                >
                  {templateButtonText}
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title={uploadTitle} className="guide-card">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Paragraph>{uploadDescription}</Paragraph>
              
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                支持格式: {acceptTypes.join(', ')} | 单文件最大{maxSize}MB
              </Text>
              
              <Dragger 
                {...uploadProps} 
                style={{ 
                  padding: '20px 0',
                  marginTop: 8,
                  background: '#fafafa',
                  border: '1px dashed #d9d9d9',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#1890ff', fontSize: 48 }} />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">
                  支持单个或批量上传
                </p>
              </Dragger>
            </div>
          </Card>
        </Col>
      </Row>
      
      {fileList.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <Divider>已选择的文件</Divider>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {fileList.map((file, index) => (
              <li key={index} style={{ padding: 8, marginBottom: 8, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                <Space>
                  {file.name.endsWith('.pdf') && <FilePdfOutlined style={{ color: '#ff4d4f' }} />}
                  {(file.name.endsWith('.doc') || file.name.endsWith('.docx')) && <FileWordOutlined style={{ color: '#1890ff' }} />}
                  {(file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) && <FileExcelOutlined style={{ color: '#52c41a' }} />}
                  {file.name} 
                  {file.status === 'uploading' && <span style={{ color: '#1890ff', fontSize: 12, marginLeft: 8 }}>上传中...</span>}
                  {file.status === 'done' && <span style={{ color: '#52c41a', fontSize: 12, marginLeft: 8 }}>上传成功</span>}
                  {file.status === 'error' && <span style={{ color: '#ff4d4f', fontSize: 12, marginLeft: 8 }}>上传失败</span>}
                </Space>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default UploadGuideModal; 