import React from 'react';
import BaseTable from '@/components/BaseTable';
import { Form, Input, Button, Table } from 'antd';
import { indexOf } from 'lodash';
import tableStyles from './table.less';

const columns = [
  {
    title: '订单编号',
    dataIndex: 'orderNumber',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '用户姓名',
    dataIndex: 'username',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'contactType',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '订单金额',
    dataIndex: 'orderMoney',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'payType',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '订单状态',
    dataIndex: 'orderStatus',
    ellipsis: true,
    width: '10%',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '15%',
    render(value, { orderStatus }, index) {
      const closeArray = ['待付款', '已支付'];
      const orderSendArray = ['已支付'];
      const remindBackArray = ['逾期中'];
      const deviceBackArray = ['待归还', '逾期中'];
      const depositBackArray = ['已完成'];
      return (
        <div>
          <span className={tableStyles.label}>查看订单</span>
          {indexOf(closeArray, orderStatus) > -1 && (
            <span className={tableStyles.label}>关闭订单</span>
          )}
          {indexOf(orderSendArray, orderStatus) > -1 && (
            <span className={tableStyles.label}>订单发货</span>
          )}
          {indexOf(deviceBackArray, orderStatus) > -1 && (
            <span className={tableStyles.label}>设备回收</span>
          )}
          {indexOf(remindBackArray, orderStatus) > -1 && (
            <span className={tableStyles.label}>提醒归还</span>
          )}
          {indexOf(depositBackArray, orderStatus) > -1 && (
            <span className={tableStyles.label}>退还押金</span>
          )}
        </div>
      );
    },
  },
];

export class OrderTable extends BaseTable {
  state = {
    dataSource: [
      {
        key: '1',
        orderNumber: '1',
        submitTime: '2',
        username: '3',
        contactType: '4',
        orderMoney: '5',
        payType: '6',
        orderStatus: '待付款',
      },
      {
        key: '2',
        orderNumber: '1',
        submitTime: '2',
        username: '3',
        contactType: '4',
        orderMoney: '5',
        payType: '6',
        orderStatus: '已支付',
      },
      {
        key: '3',
        orderNumber: '1',
        submitTime: '2',
        username: '3',
        contactType: '4',
        orderMoney: '5',
        payType: '6',
        orderStatus: '使用中',
      },
      {
        key: '4',
        orderNumber: '1',
        submitTime: '2',
        username: '3',
        contactType: '4',
        orderMoney: '5',
        payType: '6',
        orderStatus: '逾期中',
      },
      {
        key: '5',
        orderNumber: '1',
        submitTime: '2',
        username: '3',
        contactType: '4',
        orderMoney: '5',
        payType: '6',
        orderStatus: '待归还',
      },
      {
        key: '6',
        orderNumber: '1',
        submitTime: '2',
        username: '3',
        contactType: '4',
        orderMoney: '5',
        payType: '6',
        orderStatus: '已完成',
      },
    ],
  };

  handleCheckBoxChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

  renderTitle = () => {
    return <div className={tableStyles.title}>
      <div className={tableStyles.titleLeft}>
        <span className={tableStyles.titleLeftTip}>订单列表</span>
        <Button className={tableStyles.titleLeftBtn}>一键关闭</Button>
        <Button className={tableStyles.titleLeftBtn}>一键提醒归还</Button>
        <Button className={tableStyles.titleLeftBtn}>一键退还押金</Button>
      </div>
      <div>
        <Button>导出为Excel</Button>
      </div>
    </div>;
  };

  render() {
    const { dataSource } = this.state;

    return (
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: this.handleCheckBoxChange,
        }}
        title={this.renderTitle}
        columns={columns}
        dataSource={dataSource}
      ></Table>
    );
  }
}

export default OrderTable;
