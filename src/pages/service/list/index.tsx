import React from 'react';
import router from 'umi/router';
import Query from './components/query';
import Table from './components/table';
import request from '@/utils/request';
import { processFromApi } from './config/adapter';

interface OrderListProps {}

export class OrderList extends React.Component<OrderListProps> {
  state = {
    dataSource: [],
  };

  async componentDidMount() {
    await this.handleSearch();
  }

  // TODO: 服务记录查询
  handleSearch = async (query: any = {}) => {
    const dataSource = processFromApi(await request.get('/serviceorders'));
    this.setState({ dataSource });
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
    const { dataSource } = this.state;

    return (
      <div>
        {/* <Query onSearch={this.handleSearch} /> */}
        {/* <br /> */}
        <Table
          dataSource={dataSource}
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
