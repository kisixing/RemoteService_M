import React from 'react';
import { Steps } from 'antd';
import { get, keyBy } from 'lodash';

export default (props: any) => {
  const { data } = props;
  const stepsMapping = [
    {
      status: '待付款',
      current: 1,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: '未支付',
      stepDescriptionThree: '',
      stepDescriptionFour: '',
      stepDescriptionFive: '',
    },
    {
      status: '已支付',
      current: 2,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: get(data, 'payTime'),
      stepDescriptionThree: '待提取',
      stepDescriptionFour: '',
      stepDescriptionFive: '',
    },
    {
      status: '使用中',
      current: 3,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: get(data, 'payTime'),
      stepDescriptionThree: `使用时长：${get(data, 'useDays')}`,
      stepDescriptionFour: '',
      stepDescriptionFive: '',
    },
    {
      status: '逾期中',
      current: 3,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: get(data, 'payTime'),
      stepDescriptionThree: `使用时长：${get(data, 'useDays')}`,
      stepDescriptionFour: `逾期时长：${get(data, 'outDays')}`,
      stepDescriptionFive: '',
    },
    {
      status: '待归还',
      current: 3,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: get(data, 'payTime'),
      stepDescriptionThree: `使用时长：${get(data, 'useDays')}`,
      stepDescriptionFour: `逾期时长：${get(data, 'outDays')}`,
      stepDescriptionFive: '',
    },
    {
      status: '已完成',
      current: 4,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: get(data, 'payTime'),
      stepDescriptionThree: `使用时长：${get(data, 'useDays')}`,
      stepDescriptionFour: '逾期时长：无',
      stepDescriptionFive: get(data, 'endTime'),
    },
    {
      status: '已关闭',
      current: 1,
      stepDescriptionOne: get(data, 'createdTime'),
      stepDescriptionTwo: '订单已关闭',
      stepDescriptionThree: '',
      stepDescriptionFour: '',
      stepDescriptionFive: '',
    },
  ];

  const stepInfo = get(keyBy(stepsMapping, 'status'), get(data, 'orderStatus'));

  return (
    <Steps
      style={{ backgroundColor: '#ffffff', padding: '20px', marginBottom: '20px' }}
      current={get(stepInfo, 'current')}
    >
      <Steps.Step title="提交订单" description={get(stepInfo, 'stepDescriptionOne')} />
      <Steps.Step title="支付订单" description={get(stepInfo, 'stepDescriptionTwo')} />
      <Steps.Step title="使用中" description={get(stepInfo, 'stepDescriptionThree')} />
      <Steps.Step title="待归还" description={get(stepInfo, 'stepDescriptionFour')} />
      <Steps.Step title="已完成" description={get(stepInfo, 'stepDescriptionFive')} />
    </Steps>
  );
};
