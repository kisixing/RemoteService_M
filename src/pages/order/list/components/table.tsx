import React from 'react';
import { Form, Input, Button, Table } from 'antd';
import { indexOf, get, keyBy } from 'lodash';
import tableStyles from './table.less';

import mockData from '../MockData';

export class OrderTable extends React.Component {
  constructor(props: any) {
    super(props);
    this.columns = [
      {
        title: '订单编号',
        dataIndex: 'sn',
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
        dataIndex: 'payment',
        ellipsis: true,
        align: 'center',
      },
      {
        title: '支付方式',
        dataIndex: 'paytype',
        ellipsis: true,
        align: 'center',
      },
      {
        title: '订单状态',
        dataIndex: 'payStateString',
        ellipsis: true,
        width: '10%',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: '15%',
        render(value, { orderStatus, orderNumber, key }, index) {
          const {
            onViewOrder,
            onCloseOrder,
            onSendOrder,
            onReturnDevice,
            onRemindBack,
            onReturnDeposit,
          } = props;
          const closeArray = ['待付款', '已支付'];
          const orderSendArray = ['已支付'];
          const remindBackArray = ['逾期中'];
          const deviceBackArray = ['待归还', '逾期中'];
          const depositBackArray = ['已完成'];
          return (
            <div>
              <span className={tableStyles.label} onClick={onViewOrder(key)}>
                查看订单
              </span>
              {indexOf(closeArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onCloseOrder(key)}>
                  关闭订单
                </span>
              )}
              {indexOf(orderSendArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onSendOrder}>
                  订单发货
                </span>
              )}
              {indexOf(deviceBackArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onReturnDevice}>
                  设备回收
                </span>
              )}
              {indexOf(remindBackArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onRemindBack}>
                  提醒归还
                </span>
              )}
              {indexOf(depositBackArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onReturnDeposit}>
                  退还押金
                </span>
              )}
            </div>
          );
        },
      },
    ];
  }

  handleCheckBoxChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  };

  renderTitle = () => {
    return (
      <div className={tableStyles.title}>
        <div className={tableStyles.titleLeft}>
          <span className={tableStyles.titleLeftTip}>订单列表</span>
          <Button className={tableStyles.titleLeftBtn}>一键关闭</Button>
          <Button className={tableStyles.titleLeftBtn}>一键提醒归还</Button>
          <Button className={tableStyles.titleLeftBtn}>一键退还押金</Button>
        </div>
        <div>
          <Button>导出为Excel</Button>
        </div>
      </div>
    );
  };

  render() {
    const { dataSource } = this.props;

    return (
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: this.handleCheckBoxChange,
        }}
        title={this.renderTitle}
        columns={this.columns}
        dataSource={dataSource}
      ></Table>
    );
  }
}

export default OrderTable;
