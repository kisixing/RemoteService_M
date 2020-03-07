import React from 'react';
import router from 'umi/router';
import { get, keyBy } from 'lodash';
import { Button, Row, Col } from 'antd';
import OrderStep from './components/OrderStep';
import OrdersTable from './components/OrdersTable';
import ShopsTable from './components/ShopsTable';
import ActionsTable from './components/ActionsTable';
import styles from './index.less';
import request from '@/utils/request';
import { processFromApi } from '../list/config/adapter';

interface InterfaceOrderDetailProps {}
interface InterfaceOrderDetailState {
  orderInfo: object;
  ordersTableDataSource: object;
  shopsTableDataSource: object;
  actionsTableDataSource: object;
}
export class OrderDetail extends React.Component<
  InterfaceOrderDetailProps,
  InterfaceOrderDetailState
> {
  state = {
    orderInfo: {},
    ordersTableDataSource: [],
    shopsTableDataSource: [],
    actionsTableDataSource: [],
  };

  async componentDidMount() {
    const orderNumber = get(this.props, 'history.location.query.orderNumber');
    if (!orderNumber) router.push('/order/list');
    const orderInfo = await this.getOrderById(orderNumber);
    const ordersTableDataSource = [
      {
        sn: get(orderInfo, 'sn'),
        submitTime: get(orderInfo, 'submitTime'),
        payTime: get(orderInfo, 'payTime'),
        paytypeString: get(orderInfo, 'paytypeString'),
        username: get(orderInfo, 'username'),
        telephone: get(orderInfo, 'pregnancy.telephone'),
      },
    ];
    const shopsTableDataSource = [
      {
        shopsPicture: get(orderInfo, 'shopsPicture'),
        shopsName: get(orderInfo, 'servicepackage.name'),
        price: get(orderInfo, 'price'),
        period: get(orderInfo, 'period'),
        renewal: get(orderInfo, 'renewal'),
        renewalFee: get(orderInfo, 'renewalFee'),
        belong: get(orderInfo, 'belong'),
        device: get(orderInfo, 'device'),
        others: get(orderInfo, 'others'),
      },
    ];
    const actionsTableDataSource = [
      {
        actioner: get(orderInfo, 'actioner'),
        actionTime: get(orderInfo, 'actionTime'),
        paytypeString: get(orderInfo, 'paytypeString'),
        state: get(orderInfo, 'state'),
        content: get(orderInfo, 'content'),
        comment: get(orderInfo, 'comment'),
      },
    ];
    this.setState({
      orderInfo,
      ordersTableDataSource,
      shopsTableDataSource,
      actionsTableDataSource,
    });
  }

  getOrderById = async (id: any) =>
    get(processFromApi(await request.get(`/packageorders?id.equals=${id}`)), '0');

  renderPanelHeader = () => {
    const orderStatus = get(this.state, 'orderInfo.orderStatus');

    return (
      <Row className={styles.panelHeader}>
        <Col span={4}>
          <span style={{ color: 'red' }}>当前订单状态：{orderStatus}</span>
        </Col>
        <Col span={5} offset={15}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {orderStatus === '已支付' && <Button>绑定设备</Button>}
            {(orderStatus === '已支付' || orderStatus === '待付款') && (
              <Button>修改订单信息</Button>
            )}
            {(orderStatus === '已支付' || orderStatus === '待付款') && <Button>关闭订单</Button>}
            {(orderStatus === '待归还' || orderStatus === '逾期中') && <Button>设备回收</Button>}
            {(orderStatus === '待归还' || orderStatus === '逾期中') && (
              <Button>提醒用户归还</Button>
            )}
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const {
      orderInfo,
      ordersTableDataSource,
      shopsTableDataSource,
      actionsTableDataSource,
    } = this.state;

    return (
      <div>
        <OrderStep data={orderInfo} />
        <div className={styles.panel}>
          {this.renderPanelHeader()}
          <div className={styles.panelCenter}>
            <OrdersTable dataSource={ordersTableDataSource} />
            <ShopsTable dataSource={shopsTableDataSource} />
            <ActionsTable dataSource={actionsTableDataSource} />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
