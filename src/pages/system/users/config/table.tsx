import React from 'react';
import { get, reduce, isEmpty } from 'lodash';

export const tableColumns = [
  // {
  //   title: '编号',
  //   dataIndex: 'id',
  //   key: 'id',
  //   align: 'center',
  // },
  {
    title: '账号',
    dataIndex: 'login',
    key: 'login',
    align: 'center',
  },
  // {
  //   title: '头像',
  //   dataIndex: 'imageUrl',
  //   key: 'imageUrl',
  //   align: 'center',
  // },
  {
    title: '姓名',
    dataIndex: 'firstName',
    key: 'firstName',
    align: 'center',
  },
  // {
  //   title: '邮箱',
  //   dataIndex: 'email',
  //   key: 'email',
  //   align: 'center',
  // },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    // render: (value, rowData) => {
    //   const { groups } = rowData;
    //   const res = reduce(
    //     groups,
    //     (sum, group) => {
    //       return `${isEmpty(sum) ? '' : sum + '、'}${get(group, 'nickname')}`;
    //     },
    //     '',
    //   );
    //   return <span>{res}</span>;
    // },
  },
  {
    title: '创建时间',
    dataIndex: 'createdDate',
    key: 'createdDate',
    align: 'center',
  },
  {
    title: '创建者',
    dataIndex: 'createdBy',
    key: 'createdBy',
    align: 'center',
  },
  {
    title: '最近修改时间',
    dataIndex: 'lastModifiedDate',
    key: 'lastModifiedDate',
    align: 'center',
  },
  {
    title: '最近修改者',
    dataIndex: 'lastModifiedBy',
    key: 'lastModifiedBy',
    align: 'center',
  },
];
