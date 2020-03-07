import React from 'react';
import { Select } from 'antd';
import { map } from 'lodash';

export const orderStatusMapping = [
  {
    value: 0,
    title: '待付款',
  },
  {
    value: 1,
    title: '已支付',
  },
  {
    value: 2,
    title: '使用中',
  },
  {
    value: 3,
    title: '已完成',
  },
  {
    value: 4,
    title: '已关闭',
  },
  {
    value: 5,
    title: '逾期中',
  },
  {
    value: 6,
    title: '已取消',
  },
];

export default (props: any) => (
  <Select style={{ width: 150 }} placeholder="请选择订单状态" allowClear {...props}>
    {map(orderStatusMapping, status => (
      <Select.Option value={status.value}>{status.title}</Select.Option>
    ))}
  </Select>
);
