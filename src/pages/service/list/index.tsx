import React from 'react';
import router from 'umi/router';
import Query from './components/query';
import Table from './components/table';

interface OrderListProps {}

export class OrderList extends React.Component<OrderListProps> {
  handleSearch = (data: any) => {
    console.log(data);
  };

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
        <Query onSearch={this.handleSearch} />
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
