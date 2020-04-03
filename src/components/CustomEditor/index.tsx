import React from 'react';
import OSS from '@/utils/oss';
import request from '@/utils/request';
import { Editor } from '@lianmed/components';
import { Row, Col } from 'antd';
import phoneImg from '@/assets/phone.png';
import styles from './index.less';

interface IProps {
  onChange?: any;
  value?: any;
}

export default class CustomEditor extends React.Component<IProps> {
  state = {
    data: '',
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({ data: value });
  }

  handleChange = (data: any) => {
    const { onChange } = this.props;
    this.setState({ data });
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

  handleIFrameLoad = () => {
    const { data } = this.state;
    this.iframeRef && this.iframeRef.contentWindow.postMessage(data, '*');
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <Row>
          <Col span={18}>
            <Editor {...this.props} onChange={this.handleChange} onUpload={this.handleUpload} />
          </Col>
          <Col span={5} offset={1}>
            <div className={styles.mobileBlock}>
              <div className={styles.mobileBlockContent}>
                {/* <iframe title="editor-show" srcDoc={data} frameBorder="0"></iframe> */}
                <iframe
                  id="iframe"
                  ref={node => {
                    this.iframeRef = node;
                  }}
                  title="editor-test"
                  width={194}
                  height={350}
                  src="http://m.baidu.com/"
                  frameBorder="0"
                  onLoad={this.handleIFrameLoad}
                ></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
