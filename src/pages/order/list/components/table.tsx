import React from 'react';
import { Button } from 'antd';
import CustomTable from '@/layouts/CustomTable';
import { indexOf } from 'lodash';
import { tableColumns } from '../config/table';
import tableStyles from './table.less';

export class OrderTable extends React.Component {
  constructor(props: any) {
    super(props);
    this.columns = [
      ...tableColumns,
      {
        title: '操作',
        dataIndex: 'action',
        width: '15%',
        render(value, orderInfo, index) {
          const { orderStatus, id } = orderInfo;
          const {
            onViewOrder,
            onCloseOrder,
            onBindDevice,
            onBindService,
            onDeviceBack,
            onRemindBack,
            onReturnDeposit,
          } = props;
          const closeArray = ['待付款', '已支付'];
          const orderBindArray = ['已支付'];
          const serviceBindArray = ['已支付', '使用中'];
          const remindBackArray = ['逾期中'];
          const deviceBackArray = ['待归还', '逾期中', '使用中'];
          const depositBackArray = ['已完成'];
          return (
            <div>
              <Button size="small" className={tableStyles.label} onClick={onViewOrder(id)}>
                查看订单
              </Button>
              {indexOf(closeArray, orderStatus) > -1 && (
                <Button size="small" className={tableStyles.label} onClick={onCloseOrder(id)}>
                  关闭订单
                </Button>
              )}
              {indexOf(orderBindArray, orderStatus) > -1 && (
                <Button
                  size="small"
                  className={tableStyles.label}
                  onClick={onBindDevice(orderInfo)}
                >
                  关闭订单
                </Button>
              )}
              {indexOf(serviceBindArray, orderStatus) > -1 && (
                <Button
                  size="small"
                  // type="danger"
                  className={tableStyles.label}
                  onClick={onBindService(orderInfo)}
                >
                  关闭订单
                </Button>
              )}
              {indexOf(deviceBackArray, orderStatus) > -1 && (
                <Button
                  size="small"
                  className={tableStyles.label}
                  onClick={onDeviceBack(orderInfo)}
                >
                  设备回收
                </Button>
              )}
              {indexOf(remindBackArray, orderStatus) > -1 && (
                <Button
                  size="small"
                  className={tableStyles.label}
                  onClick={onRemindBack(orderInfo)}
                >
                  提醒归还
                </Button>
              )}
              {indexOf(depositBackArray, orderStatus) > -1 && (
                <Button
                  size="small"
                  className={tableStyles.label}
                  onClick={onReturnDeposit(orderInfo)}
                >
                  提醒归还
                </Button>
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
    const { dataSource, pagination } = this.props;

    return (
      <CustomTable
        // rowSelection={{
        //   type: 'checkbox',
        //   onChange: this.handleCheckBoxChange,
        // }}
        // title={this.renderTitle}
        pagination={pagination}
        columns={this.columns}
        dataSource={dataSource}
      />
    );
  }
}

export default OrderTable;
