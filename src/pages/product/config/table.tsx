import React from 'react';
import { split, first } from 'lodash';

export const tableColumns = [
  // {
  //   title: '编号',
  //   dataIndex: 'id',
  //   key: 'id',
  //   align: 'center',
  // },
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100,
  },
  {
    title: '产品图片',
    dataIndex: 'picture',
    key: 'picture',
    align: 'center',
    render: value => {
      return (
        <img src={first(split(value, ','))} alt="产品图片" style={{ width: 375, height: 234 }} />
      );
    },
  },
];
