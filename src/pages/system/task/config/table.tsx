import React from 'react';

export const tableColumns = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '任务对象',
    dataIndex: 'targetObject',
    key: 'targetObject',
  },
  {
    title: '任务方法',
    dataIndex: 'targetMethod',
    key: 'targetMethod',
  },
  {
    title: '触发器类型',
    dataIndex: 'triggerType',
    key: 'triggerType',
    render: value => {
      if (value === 'DELAY') {
        return '定点执行';
      }
      if (value === 'REGULAR') {
        return '周期执行';
      }
      return '立即执行';
    },
  },
  {
    title: '执行周期',
    dataIndex: 'cronExpression',
    key: 'cronExpression',
  },
  {
    title: '执行时间',
    dataIndex: 'fireTime',
    key: 'fireTime',
  },
  {
    title: '任务状态',
    dataIndex: 'enable',
    key: 'enable',
    render: (status, record) => {
      if (status) {
        return <span style={{ color: 'green' }}>已调度</span>;
      }
      return <span style={{ color: 'gray' }}>未调度</span>;
    },
  },
];
