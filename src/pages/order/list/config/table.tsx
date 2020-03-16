import React from 'react';

export const tableColumns = [
  {
    title: '订单编号',
    dataIndex: 'sn',
    align: 'center',
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    align: 'center',
  },
  {
    title: '用户姓名',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'telephone',
    align: 'center',
  },
  {
    title: '订单金额',
    dataIndex: 'payment',
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'paytypeString',
    align: 'center',
  },
  {
    title: '支付状态',
    dataIndex: 'paystateString',
    align: 'center',
  },
  {
    title: '判图次数',
    dataIndex: 'service1amount',
    align: 'center',
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    width: '10%',
    align: 'center',
    render: value => {
      if (value === '逾期中') {
        return <span style={{ color: '#ff0000' }}>{value}</span>;
      }
      return <span>{value}</span>;
    },
  },
];
