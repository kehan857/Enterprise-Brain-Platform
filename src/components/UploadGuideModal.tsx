import React, { useState } from 'react';
import { Modal, Upload, Button, Typography, Alert, message, Input, Form, Select } from 'antd';
import { InboxOutlined, InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

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
   * 上传成功回调
   */
  onSuccess?: (fileList: any[]) => void;
  /**
   * 关闭弹窗回调
   */
  onClose: () => void;
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
  /**
   * 模板下载按钮文字
   */
  templateButtonText?: string;
  /**
   * 模板文件URL
   */
  templateUrl?: string;
  /**
   * 下载模板回调
   */
  onDownloadTemplate?: () => void;
}

const UploadGuideModal: React.FC<UploadGuideModalProps> = ({
  open,
  title = '上传文档',
  uploadTitle = '上传文件',
  uploadDescription = '支持单个或批量上传。',
  description = '请上传文档，系统将自动处理并分析文档内容。',
  onSuccess,
  onClose,
  acceptTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv'],
  maxSize = 10,
  uploadUrl = '/api/upload',
  templateButtonText,
  templateUrl,
  onDownloadTemplate
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [form] = Form.useForm();

  // 目录数据
  const directories = [
    { label: '产品文档', value: '产品文档' },
    { label: '销售文档', value: '销售文档' },
    { label: '技术文档', value: '技术文档' },
    { label: '运营文档', value: '运营文档' },
  ];

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
    form.resetFields();
    onClose();
  };

  // 处理上传
  const handleUpload = () => {
    form.validateFields().then(values => {
      // 这里可以处理表单数据与文件一起上传
      if (fileList.length > 0) {
        if (onSuccess) {
          onSuccess(fileList);
        }
        message.success('文档上传成功');
        handleCancel();
      } else {
        message.error('请先选择文件再上传');
      }
    }).catch(error => {
      console.log('表单验证失败：', error);
    });
  };

  // 处理下载模板
  const handleDownloadTemplate = () => {
    if (onDownloadTemplate) {
      onDownloadTemplate();
    } else if (templateUrl) {
      window.open(templateUrl, '_blank');
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      width={600}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button 
          key="upload" 
          type="primary" 
          onClick={handleUpload}
          loading={uploading}
        >
          上传
        </Button>
      ]}
    >
      <Alert
        message="文档上传说明"
        description={description}
        type="info"
        icon={<InfoCircleOutlined />}
        style={{ marginBottom: 24 }}
      />
      
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="directory"
          label="目标目录"
          rules={[{ required: true, message: '请选择目标目录' }]}
        >
          <Select placeholder="请选择目标目录">
            {directories.map(dir => (
              <Select.Option key={dir.value} value={dir.value}>
                {dir.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="title"
          label="文档标题"
          rules={[{ required: true, message: '请输入文档标题' }]}
        >
          <Input placeholder="请输入文档标题" />
        </Form.Item>
        
        <Form.Item
          name="tags"
          label="文档标签"
        >
          <Select mode="tags" placeholder="请输入标签，按Enter确认" />
        </Form.Item>
        
        {(templateButtonText || templateUrl) && (
          <Form.Item>
            <Button 
              icon={<DownloadOutlined />} 
              onClick={handleDownloadTemplate}
              style={{ marginBottom: 16 }}
            >
              {templateButtonText || '下载模板'}
            </Button>
          </Form.Item>
        )}
        
        <Form.Item
          name="upload"
          label="上传文件"
          required
          tooltip="支持PDF、Word、Excel等格式"
        >
          <Dragger 
            {...uploadProps}
            style={{ padding: '20px 0' }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{uploadTitle}</p>
            <p className="ant-upload-hint">{uploadDescription}</p>
            <p className="ant-upload-hint">
              支持格式: {acceptTypes.join(', ')} | 最大 {maxSize}MB
            </p>
          </Dragger>
          
          {fileList.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Text strong>已选择的文件:</Text>
              <ul>
                {fileList.map((file) => (
                  <li key={file.uid} style={{ margin: '8px 0' }}>
                    <Text ellipsis style={{ maxWidth: '100%' }}>
                      {file.name}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadGuideModal; 