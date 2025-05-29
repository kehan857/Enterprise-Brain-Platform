import { useState } from 'react';
import { Card, Button, Space, Modal, message, Upload, Row, Col, Alert, Divider } from 'antd';
import { DownloadOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import UploadGuideModal from '@/components/UploadGuideModal';
import './index.less';

const OfflineDataUploadPage = () => {
  // 上传指引弹窗
  const [uploadGuideVisible, setUploadGuideVisible] = useState(false);
  // 上传提示弹窗
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  // 文件列表
  const [fileList, setFileList] = useState<any[]>([]);
  
  // 上传配置
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 5,
    fileList,
    beforeUpload: (file) => {
      // 限制文件类型
      const isExcelOrCSV = file.type === 'application/vnd.ms-excel' || 
                          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                          file.name.endsWith('.csv');
      if (!isExcelOrCSV) {
        message.error('只支持上传Excel或CSV文件!');
        return Upload.LIST_IGNORE;
      }
      
      // 限制文件大小
      const isLessThan10M = file.size / 1024 / 1024 < 10;
      if (!isLessThan10M) {
        message.error('文件大小不能超过10MB!');
        return Upload.LIST_IGNORE;
      }
      
      return true;
    },
    onChange(info) {
      let newFileList = [...info.fileList];
      
      // 限制最多显示5个文件
      newFileList = newFileList.slice(-5);
      
      // 更新文件状态
      setFileList(newFileList);
      
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  return (
    <div className="data-template-page">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="线下数据同步"
            className="upload-area-card"
          >
            <Alert
              message="通过下方区域上传线下数据进行同步"
              description="上传前请确保数据格式正确，支持Excel和CSV文件格式，单文件大小不超过10MB"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />
            
            <Row gutter={24}>
              <Col span={12}>
                <Card title="数据文件上传" bordered={false}>
                  <Upload.Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                    <p className="ant-upload-hint">
                      支持Excel、CSV格式文件
                    </p>
                  </Upload.Dragger>
                  
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Button
                      type="primary"
                      onClick={() => setUploadModalVisible(true)}
                      disabled={fileList.length === 0}
                    >
                      确认上传
                    </Button>
                  </div>
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="使用指引" bordered={false}>
                  <div className="guide-steps">
                    <div className="guide-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>准备数据文件</h4>
                        <p>准备符合系统要求的Excel或CSV格式的数据文件</p>
                      </div>
                    </div>
                    
                    <div className="guide-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>检查数据格式</h4>
                        <p>确保数据格式符合系统要求，字段名称和数据类型正确</p>
                      </div>
                    </div>
                    
                    <div className="guide-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>上传文件</h4>
                        <p>将准备好的文件拖拽到左侧上传区域或点击上传</p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Button 
                      icon={<DownloadOutlined />}
                      onClick={() => setUploadGuideVisible(true)}
                    >
                      查看详细上传指引
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 上传指引模态框 */}
      <UploadGuideModal
        open={uploadGuideVisible}
        onClose={() => setUploadGuideVisible(false)}
        templateUrl="/templates/example-template.xlsx"
        title="线下数据上传指引"
        description="请按照以下步骤准备并上传您的线下数据文件"
      />

      {/* 数据上传确认模态框 */}
      <Modal
        title="确认上传数据"
        open={uploadModalVisible}
        onOk={() => {
          message.success('数据上传成功，系统将进行处理');
          setUploadModalVisible(false);
          setFileList([]);
        }}
        onCancel={() => setUploadModalVisible(false)}
      >
        <Alert
          message="请确认数据内容"
          description="系统将对上传的数据进行处理和同步，请确保您的数据格式正确。"
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <div style={{ marginBottom: 16 }}>
          <h4>待上传文件列表：</h4>
          <ul>
            {fileList.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <p>点击"确定"按钮开始上传数据，上传成功后文件将被导入到系统中并进行处理。</p>
        </div>
      </Modal>
    </div>
  );
};

export default OfflineDataUploadPage;