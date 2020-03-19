import React from 'react';
import { formatTimeToStandard } from '@/utils/format';

export const tableColumns = [
  // {
  //   title: '编号',
  //   dataIndex: 'id',
  //   key: 'id',
  //   align: 'center',
  // },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: '就诊卡号',
    dataIndex: 'inpatientNO',
    key: 'inpatientNO',
    align: 'center',
  },
  {
    title: 'areaNO',
    dataIndex: 'areaNO',
    key: 'areaNO',
    align: 'center',
  },
  {
    title: 'bedNO',
    dataIndex: 'bedNO',
    key: 'bedNO',
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'telephone',
    key: 'telephone',
    align: 'center',
  },
  {
    title: 'recordstate',
    dataIndex: 'recordstate',
    key: 'recordstate',
    align: 'center',
  },
];
