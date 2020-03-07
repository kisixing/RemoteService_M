import React from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const columns: any = [
  {
    title: '订单编号',
    dataIndex: 'sn',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '订单提交时间',
    dataIndex: 'submitTime',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '订单支付时间',
    dataIndex: 'payTime',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'paytypeString',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '用户姓名',
    dataIndex: 'username',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'telephone',
    ellipsis: true,
    align: 'center',
  },
];

export default (props: any) => (
  <div>
    <div className={styles.panelTip}>订单信息</div>
    <Table columns={columns} dataSource={props.dataSource} pagination={false} bordered />
  </div>
);
