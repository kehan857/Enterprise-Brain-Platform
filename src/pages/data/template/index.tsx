import { useState } from 'react';
import { Card, Button, Space, Tag, Modal, message, Upload, Row, Col, Alert, Divider } from 'antd';
import { DownloadOutlined, UploadOutlined, FileExcelOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import UploadGuideModal from '@/components/UploadGuideModal';
import './index.less';

interface TemplateData {
  id: string;
  code: string;
  name: string;
  businessType: string;
  fileType: 'excel' | 'csv';
  creator: string;
  createTime: string;
  updateTime: string;
  status: 'active' | 'disabled';
  description?: string;
  [key: string]: any;
}

// 数据上传模板类型定义

const OfflineDataUploadPage = () => {
  // 上传指引弹窗
  const [uploadGuideVisible, setUploadGuideVisible] = useState(false);
  // 上传提示弹窗
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  // 文件列表
  const [fileList, setFileList] = useState<any[]>([]);
  
  // 模板数据
  const [templates] = useState<TemplateData[]>([
    {
      id: '1',
      code: 'TPL00001',
      name: '产品质量检测数据模板',
      businessType: '质量管理',
      fileType: 'excel',
      creator: '张三',
      createTime: '2023-11-15',
      updateTime: '2023-12-01',
      status: 'active',
      description: '用于记录产品质量检测数据的Excel模板'
    },
    {
      id: '2',
      code: 'TPL00002',
      name: '设备维护记录模板',
      businessType: '设备管理',
      fileType: 'excel',
      creator: '李四',
      createTime: '2023-11-20',
      updateTime: '2023-11-20',
      status: 'active',
      description: '用于记录设备维护情况的Excel模板'
    },
    {
      id: '3',
      code: 'TPL00003',
      name: '库存盘点数据模板',
      businessType: '库存管理',
      fileType: 'csv',
      creator: '王五',
      createTime: '2023-12-05',
      updateTime: '2023-12-10',
      status: 'active',
      description: '用于记录库存盘点数据的CSV模板'
    },
    {
      id: '4',
      code: 'TPL00004',
      name: '销售数据导入模板',
      businessType: '销售数据',
      fileType: 'excel',
      creator: '李明',
      createTime: '2023-12-15',
      updateTime: '2023-12-15',
      status: 'active',
      description: '用于导入销售数据的Excel模板'
    },
    {
      id: '5',
      code: 'TPL00005',
      name: '生产计划模板',
      businessType: '生产计划',
      fileType: 'excel',
      creator: '赵云',
      createTime: '2023-12-20',
      updateTime: '2023-12-20',
      status: 'active',
      description: '用于导入生产计划数据的Excel模板'
    },
    {
      id: '6',
      code: 'TPL00006',
      name: '员工考勤数据模板',
      businessType: '人力资源',
      fileType: 'csv',
      creator: '周杰',
      createTime: '2024-01-03',
      updateTime: '2024-01-03',
      status: 'active',
      description: '用于导入员工考勤数据的CSV模板'
    }
  ]);

  // 处理模板下载
  const handleDownload = (record: TemplateData) => {
    message.success(`正在下载模板：${record.name}`);
  };

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
            title="线下数据上传"
            className="upload-area-card"
          >
            <Alert
              message="通过下方区域上传线下数据，或选择合适的模板进行填写"
              description="上传前请确保数据格式与模板一致，支持Excel和CSV文件格式，单文件大小不超过10MB"
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
                        <h4>下载合适的数据模板</h4>
                        <p>从下方模板列表选择并下载符合您业务需求的数据模板</p>
                      </div>
                    </div>
                    
                    <div className="guide-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>按照模板格式填写数据</h4>
                        <p>按照模板的要求填写您的线下数据，保持格式一致</p>
                      </div>
                    </div>
                    
                    <div className="guide-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>上传填写完成的文件</h4>
                        <p>将填写好的文件拖拽到左侧上传区域或点击上传</p>
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
        
        <Col span={24}>
          <Card
            title="可用模板"
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              {templates.map(template => (
                <Col span={8} key={template.id}>
                  <Card 
                    hoverable 
                    size="small"
                    className="template-card"
                    actions={[
                      <DownloadOutlined key="download" onClick={() => handleDownload(template)} />
                    ]}
                  >
                    <div className="template-icon">
                      <FileExcelOutlined style={{ fontSize: 24, color: template.fileType === 'excel' ? '#52c41a' : '#1890ff' }} />
                    </div>
                    <div className="template-info">
                      <h4>{template.name}</h4>
                      <p>{template.description}</p>
                      <div className="template-meta">
                        <Tag color={template.status === 'active' ? 'success' : 'default'}>
                          {template.status === 'active' ? '已启用' : '已停用'}
                        </Tag>
                        <span className="template-type">{template.fileType === 'excel' ? 'Excel文件' : 'CSV文件'}</span>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
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
          description="系统将根据文件名自动识别对应的模板并进行数据映射，请确保您的数据符合所选模板的格式要求。"
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