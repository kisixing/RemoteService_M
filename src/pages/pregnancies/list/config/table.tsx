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
    title: '就诊卡号',
    dataIndex: 'outpatientNO',
    key: 'outpatientNO',
    align: 'center',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: '出生日期',
    dataIndex: 'dob',
    key: 'dob',
    align: 'center',
  },
  {
    title: '职业',
    dataIndex: 'occupation',
    key: 'occupation',
    align: 'center',
  },
  {
    title: '证件号码',
    dataIndex: 'idNO',
    key: 'idNO',
    align: 'idNO',
  },
  {
    title: '准生证号',
    dataIndex: 'certificationNO',
    key: 'certificationNO',
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
  },
];
