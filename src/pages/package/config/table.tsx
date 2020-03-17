import React from 'react';

export const tableColumns = [
  {
    title: '套餐名称',
    dataIndex: 'name',
    key: 'name',
  },
  // {
  //   title: '商品图片',
  //   dataIndex: 'picture',
  //   key: 'picture',
  // },
  {
    title: '价格',
    dataIndex: 'price',
    render: (price: string) => <div dangerouslySetInnerHTML={{ __html: price }} />,
  },
  {
    title: '所属产品',
    dataIndex: 'products',
    render: products => {
      return products ? products.map(_ => _.name).join('、') : '';
    },
  },
  {
    title: '排序',
    key: 'sortorder',
    dataIndex: 'sortorder',
    render: (sortorder: any) => <span>{sortorder}</span>,
  },
];
