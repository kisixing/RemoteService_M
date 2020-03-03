import React from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const columns: any = [
  {
    title: '操作者',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作时间',
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
    title: '订单状态',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
];

export default () => (
  <div>
    <div className={styles.panelTip}>操作信息</div>
    <Table columns={columns} pagination={false} bordered />
  </div>
);
