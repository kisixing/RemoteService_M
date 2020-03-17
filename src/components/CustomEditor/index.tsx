import React from 'react';
import OSS from '@/utils/oss';
import request from '@/utils/request';
import { Editor } from '@lianmed/components';

interface IProps {
  onChange?: any;
  value?: any;
}

export default class CustomEditor extends React.Component<IProps> {
  handleChange = (data: any) => {
    const { onChange } = this.props;
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

  render() {
    return <Editor {...this.props} onChange={this.handleChange} onUpload={this.handleUpload} />;
  }
}
