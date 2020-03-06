import React from 'react';
import { Select } from 'antd';
import { map } from 'lodash';

export const serviceTypeMapping = [
  {
    value: 0,
    title: '胎监判图',
  },
  {
    value: 1,
    title: '在线咨询',
  }
];

export default (props: any) => (
  <Select placeholder="请选择服务类型" allowClear {...props}>
    {map(serviceTypeMapping, status => (
      <Select.Option value={status.value}>{status.title}</Select.Option>
    ))}
  </Select>
);
