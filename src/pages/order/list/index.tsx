import React from 'react';
import Query from './components/query';
import Table from './components/Table';
import router from 'umi/router';

interface OrderListProps {}

export class OrderList extends React.Component<OrderListProps> {
  handleQuery = () => {};

  handleClose = () => {};

  handleRemind = () => {};

  handleReturn = () => {};

  handleViewOrder = (orderNumber: any) => () => {
    console.log(orderNumber);
    router.push(`/order/detail?orderNumber=${orderNumber}`);
  };

  handleCloseOrder = () => {};

  handleSendOrder = () => {};

  handleReturnDevice = () => {};

  handleRemindBack = () => {};

  handleReturnDeposit = () => {};

  render() {
    return (
      <div>
        <Query />
        <br />
        <Table
          onViewOrder={this.handleViewOrder}
          onCloseOrder={this.handleCloseOrder}
          onSendOrder={this.handleSendOrder}
          onReturnDevice={this.handleReturnDevice}
          onRemindBack={this.handleRemindBack}
          onReturnDeposit={this.handleReturnDeposit}
        />
      </div>
    );
  }
}

export default OrderList;
