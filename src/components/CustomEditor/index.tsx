import React from 'react';
import OSS from '@/utils/oss';
import request from '@/utils/request';
import { Editor } from '@lianmed/components';
import { Row, Col, Button } from 'antd';
import { get, isEmpty } from 'lodash';
import styles from './index.less';

interface IProps {
  onChange?: any;
  value?: any;
}

export default class CustomEditor extends React.Component<IProps> {
  state = {
    data: '',
    editorVisible: false,
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({ data: value });
  }

  handleChange = (data: any) => {
    const { onChange } = this.props;
    this.setState({ data });
    this.handleIFrameLoad(data);
    onChange(data);
  };

  handleUpload = async ({ file, progress, libraryId, success, error }) => {
    try {
      const { accessKeyId, accessKeySecret, securityToken } = await request.post('/getSTS');
      const OSSClient = new OSS(accessKeySecret, accessKeyId, securityToken);
      const { lastModified, name } = file;
      const fileName = `${lastModified}-${name}`;
      await OSSClient.put(fileName, file);
      const imgUrl = OSSClient.getImgUrl(fileName);

      success({
        url: imgUrl,
      });
    } catch (e) {
      console.log('上传失败');
      console.log(e);
    }
  };

  handleClick = () => {
    const { editorVisible } = this.state;
    this.setState({
      editorVisible: !editorVisible,
    });
  };

  handleIFrameLoad = (data = '') => {
    this.iframeRef && this.iframeRef.contentWindow.postMessage(isEmpty(data) ? get(this.state, 'data') : data, '*');
  };

  handleFirstIFrameLoad = () => {
    const { value } = this.props;
    this.iframeRef && this.iframeRef.contentWindow.postMessage(isEmpty(value) ? '' : value, '*');
  };

  render() {
    const { editorVisible } = this.state;
    return (
      <>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={this.handleClick}>
          {editorVisible ? '收起' : '编辑'}此栏
        </Button>
        {editorVisible && (
          <Row>
            <Col span={16}>
              <Editor
                {...this.props}
                style={{ height: 720, overflow: 'scroll' }}
                onChange={this.handleChange}
                onUpload={this.handleUpload}
              />
            </Col>
            <Col span={7} offset={1}>
              <div className={styles.mobileBlock}>
                <div className={styles.mobileBlockContent}>
                  <iframe
                    id="iframe"
                    ref={node => {
                      this.iframeRef = node;
                    }}
                    title="editor-test"
                    width={321}
                    height={573}
                    src="/#/mobile-demo"
                    frameBorder="0"
                    onLoad={this.handleFirstIFrameLoad()}
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </>
    );
  }
}
