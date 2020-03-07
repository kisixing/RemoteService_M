import React from 'react';
import router from 'umi/router';
import Query from './components/query';
import Table from './components/table';
import BindDeviceModal from './components/BindDeviceModal';
import BindServiceModal from './components/BindServiceModal';
import DeviceBackModal from './components/DeviceBackModal';
import OrderCloseModal from './components/OrderCloseModal';
import RemindBackModal from './components/RemindBackModal';
import DepositBackModal from './components/DepositBackModal';
import request from '@/utils/request';
import { processFromApi } from './config/adapter';
import { message } from 'antd';
import queryString from 'query-string';
import { get, pick, keys, keyBy, join, isNil, set } from 'lodash';

export class OrderList extends React.Component {
  state = {
    dataSource: [],
    bindDeviceModalVisible: false,
    bindServiceModalVisible: false,
    deviceBackModalVisible: false,
    orderCloseModalVisible: false,
    remindBackModalVisible: false,
    depositBackModalVisible: false,
    orderInfo: {},
    deviceInfo: {},
  };

  async componentDidMount() {
    await this.handleSearch();
  }

  handleSearch = async (query: any = {}) => {
    const { username, telephone, orderStatus } = query;
    let params = {};
    if (username || telephone) {
      params = {
        'name.contains': username,
        'telephone.contains': telephone,
      };
      // 获取查询到的孕妇 ID
      const pregnancies = await request.get(`/pregnancies?${queryString.stringify(params)}`);
      const pregnancyIds = join(keys(keyBy(pregnancies, 'id')), ',');
      if (pregnancyIds) {
        params = {
          'pregnancyId.in': pregnancyIds,
        };
      }
    }
    params = {
      ...params,
      'paystate.equals': orderStatus,
    };
    const dataSource = processFromApi(
      await request.get(`/packageorders?${isNil(params) ? '' : queryString.stringify(params)}`),
    );
    this.setState({ dataSource });
  };

  handleClose = () => {};

  handleRemind = () => {};

  handleReturn = () => {};

  handleViewOrder = (orderNumber: any) => () => {
    router.push(`/order/detail?orderNumber=${orderNumber}`);
  };

  handleCloseOrder = (id: any) => async () => {
    const orderInfo = await this.getOrderById(id);
    this.setState({
      orderCloseModalVisible: true,
      orderInfo,
    });
  };

  getOrderById = async (id: any) =>
    get(processFromApi(await request.get(`/packageorders?id.equals=${id}`)), '0');

  handleBindDevice = data => async () => {
    const orderInfo = await this.getOrderById(get(data, 'id'));
    this.setState({
      bindDeviceModalVisible: true,
      orderInfo,
    });
  };

  handleBindService = data => async () => {
    const orderInfo = await this.getOrderById(get(data, 'id'));
    this.setState({
      bindServiceModalVisible: true,
      orderInfo,
    });
  };

  handleDeviceBack = data => async () => {
    // TODO: 要展示 deviceInfo 的 erp 编号，这里不对
    const deviceInfo = get(await request.get(`/devices?id.equals=${get(data, 'id')}`), '0');
    const orderInfo = await this.getOrderById(get(data, 'id'));
    this.setState({
      deviceBackModalVisible: true,
      deviceInfo,
      orderInfo,
    });
  };

  handleRemindBack = data => async () => {
    const orderInfo = await this.getOrderById(get(data, 'id'));
    this.setState({
      remindBackModalVisible: true,
      orderInfo,
    });
  };

  handleReturnDeposit = data => async () => {
    const orderInfo = await this.getOrderById(get(data, 'id'));
    this.setState({
      depositBackModalVisible: true,
      orderInfo,
    });
  };

  handleSubmitBindDevice = async (data: any) => {
    const { orderInfo } = this.state;
    const { erpno } = data;
    const devices = await request.get(
      `/devices?${queryString.stringify({ 'erpno.equals': erpno })}`,
    );
    await request.put('/devices', {
      data: { id: get(devices, '0.id'), pregnancy: { id: get(orderInfo, 'pregnancyId') } },
    });
    this.setState({
      bindDeviceModalVisible: false,
    });
    message.success('绑定成功');
    this.handleSearch();
  };

  handleSubmitBindService = async (data: any) => {
    const { orderInfo } = this.state;
    const newOrderInfo = await request.put('/packageorders', {
      data: { ...pick(data, ['service1amount']), id: get(orderInfo, 'id') },
    });
    this.setState({
      bindServiceModalVisible: false,
      orderInfo: newOrderInfo,
    });
    message.success('修改服务次数成功');
    this.handleSearch();
  };

  handleSubmitDeviceBack = async () => {
    const { orderInfo } = this.state;
    const newOrderInfo = await request.put('/packageorders', {
      data: { id: get(orderInfo, 'id'), paystate: 5 },
    });
    this.setState({
      deviceBackModalVisible: false,
      orderInfo: newOrderInfo,
    });
    message.success('设备回收成功');
    this.handleSearch();
  };

  handleSubmitOrderClose = async (data: any) => {
    const { orderInfo } = this.state;
    // TODO: data 备注信息暂时没有添加
    console.log(data);
    const newOrderInfo = await request.put('/packageorders', {
      data: { id: get(orderInfo, 'id'), paystate: 6 },
    });
    this.setState({
      orderCloseModalVisible: false,
      orderInfo: newOrderInfo,
    });
    message.success('设备关闭成功');
    this.handleSearch();
  };

  // TODO: 执行推送
  handleSubmitRemindBack = data => {
    this.setState({
      remindBackModalVisible: false,
    });
    message.success('提醒用户归还成功');
    this.handleSearch();
  };

  // TODO: 执行退还押金
  handleSubmitDepositBack = async data => {
    const { orderInfo } = this.state;
    const newOrderInfo = await request.put('/packageorders', {
      data: { id: get(orderInfo, 'id'), paystate: 6 },
    });
    this.setState({
      orderInfo: newOrderInfo,
      depositBackModalVisible: false,
    });
    message.success('押金退还成功');
    this.handleSearch();
  };

  handleModalCancel = (value: string) => () => {
    this.setState({
      [value]: false,
    });
  };

  render() {
    const {
      dataSource,
      bindDeviceModalVisible,
      bindServiceModalVisible,
      deviceBackModalVisible,
      orderCloseModalVisible,
      remindBackModalVisible,
      depositBackModalVisible,
      orderInfo,
      deviceInfo,
    } = this.state;
    return (
      <div>
        <Query onSearch={this.handleSearch} />
        <br />
        <Table
          dataSource={dataSource}
          onViewOrder={this.handleViewOrder}
          onCloseOrder={this.handleCloseOrder}
          onBindDevice={this.handleBindDevice}
          onBindService={this.handleBindService}
          onDeviceBack={this.handleDeviceBack}
          onRemindBack={this.handleRemindBack}
          onReturnDeposit={this.handleReturnDeposit}
        />
        {bindDeviceModalVisible && (
          <BindDeviceModal
            visible={bindDeviceModalVisible}
            orderInfo={orderInfo}
            onCancel={this.handleModalCancel('bindDeviceModalVisible')}
            onSubmit={this.handleSubmitBindDevice}
          />
        )}
        {bindServiceModalVisible && (
          <BindServiceModal
            visible={bindServiceModalVisible}
            orderInfo={orderInfo}
            onCancel={this.handleModalCancel('bindServiceModalVisible')}
            onSubmit={this.handleSubmitBindService}
          />
        )}
        {deviceBackModalVisible && (
          <DeviceBackModal
            visible={deviceBackModalVisible}
            deviceInfo={deviceInfo}
            orderInfo={orderInfo}
            onCancel={this.handleModalCancel('deviceBackModalVisible')}
            onSubmit={this.handleSubmitDeviceBack}
          />
        )}
        {orderCloseModalVisible && (
          <OrderCloseModal
            visible={orderCloseModalVisible}
            orderInfo={orderInfo}
            onCancel={this.handleModalCancel('orderCloseModalVisible')}
            onSubmit={this.handleSubmitOrderClose}
          />
        )}
        {remindBackModalVisible && (
          <RemindBackModal
            visible={remindBackModalVisible}
            orderInfo={orderInfo}
            onCancel={this.handleModalCancel('remindBackModalVisible')}
            onSubmit={this.handleSubmitRemindBack}
          />
        )}
        {depositBackModalVisible && (
          <DepositBackModal
            visible={depositBackModalVisible}
            orderInfo={orderInfo}
            onCancel={this.handleModalCancel('depositBackModalVisible')}
            onSubmit={this.handleSubmitDepositBack}
          />
        )}
      </div>
    );
  }
}

export default OrderList;
