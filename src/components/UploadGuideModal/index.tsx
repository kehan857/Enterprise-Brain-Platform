import React, { useState } from 'react';
import { Modal, Button, Typography, Space, Divider, Upload, message, Row, Col, Card, Alert } from 'antd';
import { UploadOutlined, DownloadOutlined, InboxOutlined, FileTextOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';
import './index.less';

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

interface UploadGuideModalProps {
  open: boolean;
  onClose: () => void;
  templateUrl?: string;
  title?: string;
  description?: string;
  uploadTitle?: string;
  uploadDescription?: string;
  templateButtonText?: string;
  acceptTypes?: string[];
  maxSize?: number;
  uploadUrl?: string;
  onSuccess?: (fileList: any[]) => void;
  onDownloadTemplate?: () => void;
}

const UploadGuideModal: React.FC<UploadGuideModalProps> = ({
  open,
  onClose,
  templateUrl = '',
  title = '文件上传指引',
  description = '请按照以下步骤进行文件上传',
  uploadTitle = '上传文件',
  uploadDescription = '上传您的文件',
  templateButtonText = '下载模板',
  acceptTypes = ['.xlsx', '.xls', '.csv'],
  maxSize = 10,
  uploadUrl = '/api/upload',
  onSuccess,
  onDownloadTemplate
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
        message.success(`${info.file.name} 上传成功`);
        if (info.fileList.every(file => file.status === 'done' || file.status === 'error')) {
          // 所有文件上传成功
          const successFiles = info.fileList.filter(file => file.status === 'done');
          if (onSuccess && successFiles.length > 0) {
            onSuccess(successFiles);
          }
        }
      } else if (status === 'error') {
        setUploading(false);
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onDrop(e) {
      console.log('拖放文件: ', e.dataTransfer.files);
    },
  };

  // 重置状态并关闭弹窗
  const handleClose = () => {
    setFileList([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      title={title}
      footer={[
        <Button key="close" onClick={handleClose}>
          关闭
        </Button>
      ]}
      onCancel={handleClose}
      width={800}
      className="upload-guide-modal"
      centered
    >
      <Paragraph className="modal-description">{description}</Paragraph>
      
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
            <div className="template-download-section">
              <div className="icon-container">
                <FileTextOutlined className="template-icon" />
              </div>
              <Paragraph>
                请下载标准模板，按照模板格式填写您的数据
              </Paragraph>
              <ul className="guide-tips">
                <li>确保必填字段已填写完整</li>
                <li>遵循字段数据类型要求</li>
                <li>请勿修改模板结构和表头</li>
              </ul>
              <div className="template-download-button">
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
            <div className="upload-section">
              <Paragraph>{uploadDescription}</Paragraph>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                支持格式: {acceptTypes.join(', ')} | 单文件最大{maxSize}MB
              </Text>
              
              <Dragger {...uploadProps} style={{ marginTop: 8 }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
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
        <div className="upload-file-list">
          <Divider>已选择的文件</Divider>
          <ul>
            {fileList.map((file, index) => (
              <li key={index} className="file-item">
                <Space>
                  <FileTextOutlined /> 
                  {file.name} 
                  {file.status === 'uploading' && <span className="file-status uploading">上传中...</span>}
                  {file.status === 'done' && <span className="file-status success">上传成功</span>}
                  {file.status === 'error' && <span className="file-status error">上传失败</span>}
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