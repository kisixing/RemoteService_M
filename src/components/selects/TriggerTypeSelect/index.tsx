import React from 'react';
import { Select } from 'antd';
import { map } from 'lodash';

export const targetMethodMapping = [
  {
    value: 'RIGHTNOW',
    title: '立即执行',
  },
  {
    value: 'DELAY',
    title: '定点执行',
  },
  {
    value: 'REGULAR',
    title: '周期执行',
  },
];

export default (props: any) => (
  <Select placeholder="请选择一个任务方法" allowClear {...props}>
    {map(targetMethodMapping, status => (
      <Select.Option value={status.value}>{status.title}</Select.Option>
    ))}
  </Select>
);
