import OSS from 'ali-oss';
import { concat } from 'lodash';

export default class RemoteStore {
  oss = undefined;

  accessKeySecret = undefined;

  accessKeyId = undefined;

  stsToken = undefined;

  region = '';

  bucket = '';

  path = '';

  constructor(
    accessKeySecret: any,
    accessKeyId: any,
    stsToken: any,
    // 文件存储路径，如: images/
    path: string = 'images/',
    region: string = 'oss-cn-shenzhen',
    bucket: string = 'lmobrepo',
  ) {
    this.accessKeySecret = accessKeySecret;
    this.accessKeyId = accessKeyId;
    this.stsToken = stsToken;
    this.region = region;
    this.bucket = bucket;
    this.path = path;
    this.oss = new OSS({
      accessKeySecret,
      accessKeyId,
      stsToken,
      region,
      bucket,
    });
  }

  put = (key: any, file: any) => {
    return this.oss.put(`${this.path}${key}`, file);
  };

  getImgUrl = (key: any) => {
    if (!this.bucket) {
      throw new Error('调用此函数之前必须初始化');
    }

    return `http://${this.bucket}.${this.region}.aliyuncs.com/images/${key}`;
  };
}
