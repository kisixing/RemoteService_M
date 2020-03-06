import React from 'react';
import router from 'umi/router';
import Query from './components/query';
import Table from './components/table';
import request from '@/utils/request';
import { processFromApi } from './config/adapter';
export class OrderList extends React.Component {
  state = {
    dataSource: [],
  };

  async componentDidMount() {
    const dataSource = await this.handleSearch();
    this.setState({ dataSource });
  }

  handleSearch = async (query: any = {}) => {
    return processFromApi(await request.get('/serviceorders'));
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
        <Query onSearch={this.handleSearch} />
        <br />
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
