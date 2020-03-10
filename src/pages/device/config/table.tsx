import React from 'react';
import { deviceStatusMapping } from '@/components/selects/DeviceStatusSelect';
import { get, keyBy } from 'lodash';

export const tableColumns = [
  {
    title: '设备编号',
    dataIndex: 'erpno',
    key: 'erpno',
  },
  {
    title: '设备名称',
    dataIndex: 'devicename',
    key: 'devicename',
  },
  {
    title: '厂家',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (value: any) => {
      return get(keyBy(deviceStatusMapping, 'value'), `${value}.title`);
    },
  },
  {
    title: '绑定信息',
    dataIndex: 'service2amount',
    key: 'service2amount',
  },
  {
    title: '操作内容',
    dataIndex: 'devicename',
    key: 'devicename',
  },
  {
    title: '操作时间',
    dataIndex: 'devicename',
    key: 'devicename',
  },
  {
    title: '操作者',
    dataIndex: 'devicename',
    key: 'devicename',
  },
];
