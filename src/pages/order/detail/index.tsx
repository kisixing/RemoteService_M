import React from 'react';
import router from 'umi/router';
import { get, keyBy } from 'lodash';
import { Button, Row, Col } from 'antd';
import OrderStep from './components/OrderStep';
import OrdersTable from './components/OrdersTable';
import ShopsTable from './components/ShopsTable';
import ActionsTable from './components/ActionsTable';
import styles from './index.less';

import mockData from '../list/MockData';

interface InterfaceOrderDetailProps {}
interface InterfaceOrderDetailState {
  orderInfo: object;
}
export class OrderDetail extends React.Component<
  InterfaceOrderDetailProps,
  InterfaceOrderDetailState
> {
  constructor(props: any) {
    super(props);
    const orderNumber = get(this.props, 'history.location.query.orderNumber');
    if (!orderNumber) router.push('/order/list');

    // TODO: 模拟获取单个订单数据
    const orderInfo = get(keyBy(mockData.dataSource, 'orderNumber'), orderNumber) || {};
    this.state = {
      orderInfo,
    };
  }

  renderPanelHeader = () => {
    const orderStatus = get(this.state, 'orderInfo.orderStatus');

    return (
      <Row className={styles.panelHeader}>
        <Col span={4}>
          <span style={{ color: 'red' }}>当前订单状态：{orderStatus}</span>
        </Col>
        <Col span={5} offset={15}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {orderStatus === '已支付' && <Button>发货</Button>}
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
    const { orderInfo } = this.state;

    return (
      <div>
        <OrderStep data={orderInfo} />
        <div className={styles.panel}>
          {this.renderPanelHeader()}
          <div className={styles.panelCenter}>
            <OrdersTable />
            <ShopsTable />
            <ActionsTable />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;
