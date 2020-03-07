import React from 'react';
import { Button, Table } from 'antd';
import { indexOf } from 'lodash';
import tableStyles from './table.less';

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
        dataIndex: 'telephone',
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
        dataIndex: 'paytypeString',
        ellipsis: true,
        align: 'center',
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        ellipsis: true,
        width: '10%',
        align: 'center',
        render(value) {
          if (value === '逾期中') {
            return <span style={{ color: '#ff0000' }}>{value}</span>;
          }
          return <span>{value}</span>;
        },
      },
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
          const deviceBackArray = ['待归还', '逾期中'];
          const depositBackArray = ['已完成'];
          return (
            <div>
              <span className={tableStyles.label} onClick={onViewOrder(id)}>
                查看订单
              </span>
              {indexOf(closeArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onCloseOrder(id)}>
                  关闭订单
                </span>
              )}
              {indexOf(orderBindArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onBindDevice(orderInfo)}>
                  绑定设备
                </span>
              )}
              {indexOf(serviceBindArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onBindService(orderInfo)}>
                  服务次数
                </span>
              )}
              {indexOf(deviceBackArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onDeviceBack(orderInfo)}>
                  设备回收
                </span>
              )}
              {indexOf(remindBackArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onRemindBack(orderInfo)}>
                  提醒归还
                </span>
              )}
              {indexOf(depositBackArray, orderStatus) > -1 && (
                <span className={tableStyles.label} onClick={onReturnDeposit(orderInfo)}>
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
        // rowSelection={{
        //   type: 'checkbox',
        //   onChange: this.handleCheckBoxChange,
        // }}
        // title={this.renderTitle}
        columns={this.columns}
        dataSource={dataSource}
      ></Table>
    );
  }
}

export default OrderTable;
