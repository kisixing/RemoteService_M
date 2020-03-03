import React from 'react';
import Query from './components/query';
import Table from './components/Table';

interface OrderListProps {}

export class OrderList extends React.Component<OrderListProps> {
  handleQuery = () => {};

  handleClose = () => {};

  handleRemind = () => {};

  handleReturn = () => {};

  render() {
    return (
      <div>
        <Query />
        <br />
        <Table />
      </div>
    );
  }
}

export default OrderList;
