import React from 'react';
import router from 'umi/router';
import Table from './components/table';
import { processFromApi } from './config/adapter';
import BaseList from '@/components/BaseList';
import CustomSpin from '@/components/CustomSpin';

export class ServiceList extends BaseList {
  state = {
    dataSource: [],
    total: 0,
    defaultQuery: {
      page: 0,
      size: 20,
    },
    needPagination: true,
    loding: true,
    processFromApi,
    baseUrl: '/serviceorders',
  };

  async componentDidMount() {
    await this.handleSearch();
  }

  // // TODO: 服务记录查询
  // handleSearch = async (query: any = {}) => {
  //   const dataSource = processFromApi(await request.get('/serviceorders'));
  //   this.setState({ dataSource });
  // };

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
    const { dataSource, loding } = this.state;

    return (
      <div>
        {/* <Query onSearch={this.handleSearch} /> */}
        {/* <br /> */}
        {loding ? (
          <CustomSpin />
        ) : (
          <Table
            dataSource={dataSource}
            onViewOrder={this.handleViewOrder}
            onCloseOrder={this.handleCloseOrder}
            onSendOrder={this.handleSendOrder}
            onReturnDevice={this.handleReturnDevice}
            onRemindBack={this.handleRemindBack}
            onReturnDeposit={this.handleReturnDeposit}
          />
        )}
      </div>
    );
  }
}

export default ServiceList;
