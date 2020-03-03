import React from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const columns: any = [
  {
    title: '商品图片',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '价格',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '有效期(日)',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '是否续期(日)',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '续期费用',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '所属产品',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '对应设备',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '其他服务',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
];

export default () => (
  <div>
    <div className={styles.panelTip}>商品信息</div>
    <Table columns={columns} pagination={false} bordered />
  </div>
);
