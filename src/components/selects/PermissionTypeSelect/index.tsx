import React from 'react';
import { Select } from 'antd';
import { map } from 'lodash';

export const typeMapping = [
  {
    value: 'menu',
    title: 'menu',
  },
  {
    value: 'function',
    title: 'function',
  },
];

export default (props: any) => (
  <Select style={{ width: 150 }} placeholder="请选择类型" allowClear {...props}>
    {map(typeMapping, status => (
      <Select.Option value={status.value}>{status.title}</Select.Option>
    ))}
  </Select>
);
