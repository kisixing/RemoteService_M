import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import OSS from '@/utils/oss';
import request from '@/utils/request';
import { get, filter } from 'lodash';

interface IProps {
  allowUploadImages?: number;
  onChange?: any;
  value?: any;
}

export default class UploadImg extends React.Component<IProps> {
  static defaultProps = {
    allowUploadImages: 1,
  };

  state = {
    fileList: [],
    isUpdated: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value = [] } = nextProps;
    const { isUpdated } = prevState;

    if (value.length !== prevState.fileList.length && !isUpdated) {
      return {
        fileList: value,
      };
    }

    return null;
  }

  handleUploadFile = async ({ onSuccess, file }) => {
    const { fileList } = this.state;
    const { accessKeyId, accessKeySecret, securityToken } = await request.post('/getSTS');
    const OSSClient = new OSS(accessKeySecret, accessKeyId, securityToken);
    const { uid, name } = file;
    const fileName = `images/${uid}-${name}`;
    const ret = await OSSClient.put(fileName, file);
    const imgUrl = OSSClient.getImgUrl(fileName);
    fileList.push({
      uid,
      name,
      status: 'done',
      url: imgUrl,
      thumbUrl: imgUrl,
    });
    this.setState({
      fileList,
      isUpdated: true,
    });
    onSuccess(ret);
  };

  handleRemoveFile = (file: any) => {
    const { fileList } = this.state;
    this.setState({
      fileList: filter(fileList, item => get(item, 'url') !== get(file, 'url')),
      isUpdated: true,
    });
  };

  handleChange = () => {
    const { onChange } = this.props;
    const { fileList } = this.state;
    onChange(fileList);
  };

  render() {
    const { allowUploadImages } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        className="avatar-uploader"
        accept=".png,.jpg,.jpeg,.svg,.gif"
        customRequest={this.handleUploadFile}
        fileList={fileList}
        listType="picture"
        onRemove={this.handleRemoveFile}
        onChange={this.handleChange}
        multiple={allowUploadImages > 1}
      >
        <Button disabled={fileList.length > allowUploadImages - 1}>
          <UploadOutlined /> 上传产品图片
        </Button>
      </Upload>
    );
  }
}
