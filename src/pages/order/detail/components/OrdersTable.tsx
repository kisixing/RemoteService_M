import React from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const columns: any = [
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '订单提交时间',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '订单支付时间',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '用户姓名',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
];

export default () => (
  <div>
    <div className={styles.panelTip}>订单信息</div>
    <Table columns={columns} pagination={false} bordered />
  </div>
);
