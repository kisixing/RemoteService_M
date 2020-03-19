import React from 'react';

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
    align: 'center',
    render: value => {
      return <img src={value} alt="产品图片" style={{ width: 100, height: 100 }} />;
    },
  },
  
];
