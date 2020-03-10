import React from 'react';
import { Select } from 'antd';
import { map } from 'lodash';

export const deviceStatusMapping = [
  {
    value: 0,
    title: '空闲',
  },
  {
    value: 1,
    title: '外租',
  },
  {
    value: 2,
    title: '回收',
  },
  {
    value: 3,
    title: '故障',
  },
];

export default (props: any) => (
  <Select placeholder="请选择设备状态" allowClear {...props}>
    {map(deviceStatusMapping, status => (
      <Select.Option value={status.value}>{status.title}</Select.Option>
    ))}
  </Select>
);
