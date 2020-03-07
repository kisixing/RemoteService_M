import React from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const columns: any = [
  {
    title: '商品图片',
    dataIndex: 'shopsPicture',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'shopsName',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'price',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '有效期(日)',
    dataIndex: 'period',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '是否续期(日)',
    dataIndex: 'renewal',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '续期费用',
    dataIndex: 'renewalFee',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '所属产品',
    dataIndex: 'belong',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '对应设备',
    dataIndex: 'device',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '其他服务',
    dataIndex: 'others',
    ellipsis: true,
    align: 'center',
  },
];

export default (props: any) => (
  <div>
    <div className={styles.panelTip}>商品信息</div>
    <Table columns={columns} dataSource={props.dataSource} pagination={false} bordered />
  </div>
);
