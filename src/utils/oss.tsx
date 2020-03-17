import OSS from 'ali-oss';

export default class RemoteStore {
  oss = undefined;

  accessKeySecret = undefined;

  accessKeyId = undefined;

  stsToken = undefined;

  region = undefined;

  bucket = undefined;

  constructor(
    accessKeySecret: any,
    accessKeyId: any,
    stsToken: any,
    region: any = 'oss-cn-shenzhen',
    bucket: any = 'lmobrepo',
  ) {
    this.accessKeySecret = accessKeySecret;
    this.accessKeyId = accessKeyId;
    this.stsToken = stsToken;
    this.region = region;
    this.bucket = bucket;
    this.oss = new OSS({
      accessKeySecret,
      accessKeyId,
      stsToken,
      region,
      bucket,
    });
  }

  put = (key: any, file: any) => {
    return this.oss.put(key, file);
  };

  getImgUrl = (key: any) => {
    if (!this.bucket) {
      throw new Error('调用此函数之前必须初始化');
    }

    return `http://${this.bucket}.${this.region}.aliyuncs.com/${key}`;
  };
}
