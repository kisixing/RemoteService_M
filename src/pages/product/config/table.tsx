import React from 'react';
import { split, map } from 'lodash';

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
  },
  {
    title: '产品图片',
    dataIndex: 'picture',
    key: 'picture',
    // align: 'lef',
    render: value => {
      const pictures = split(value, ',');

      return map(pictures, picture => (
        <img src={picture} alt="产品图片" style={{ width: 187, height: 117, marginRight: 4 }} />
      ));
    },
  },
];
