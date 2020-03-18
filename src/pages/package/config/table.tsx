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
    title: '胎监判图次数',
    dataIndex: 'service1amount',
    key: 'service1amount',
  },
  {
    title: '在线咨询次数',
    dataIndex: 'service2amount',
    key: 'service2amount',
  },
  {
    title: '价格',
    dataIndex: 'price',
    render: (price: string) => <div dangerouslySetInnerHTML={{ __html: price }} />,
  },
  {
    title: '包含产品',
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
