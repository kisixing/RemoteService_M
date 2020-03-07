import React from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const columns: any = [
  {
    title: '操作者',
    dataIndex: 'actioner',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作时间',
    dataIndex: 'actionTime',
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
    title: '订单状态',
    dataIndex: 'state',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作内容',
    dataIndex: 'content',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'comment',
    ellipsis: true,
    align: 'center',
  },
];

export default (props: any) => (
  <div>
    <div className={styles.panelTip}>操作信息</div>
    <Table columns={columns} dataSource={props.dataSource} pagination={false} bordered />
  </div>
);
