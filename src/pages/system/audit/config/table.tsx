import { formatTimeToStandard } from '@/utils/format';

export const tableColumns = [
  // {
  //   title: '编号',
  //   dataIndex: 'id',
  //   key: 'id',
  //   align: 'center',
  // },
  {
    title: '审计编号',
    dataIndex: 'entityId',
    key: 'entityId',
    align: 'center',
  },
  {
    title: '审计类型',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  },
  {
    title: '审计值',
    dataIndex: 'entityValue',
    key: 'entityValue',
    width: '60%'
  },
  {
    title: '版本',
    dataIndex: 'commitVersion',
    key: 'commitVersion',
    align: 'center',
  },
  {
    title: '更新者',
    dataIndex: 'modifiedBy',
    key: 'modifiedBy',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'modifiedDate',
    key: 'modifiedDate',
    align: 'center',
    render: value => formatTimeToStandard(value),
  },
];
