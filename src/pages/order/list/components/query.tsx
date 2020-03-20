import React, { Fragment } from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Input, DatePicker } from 'antd';
import OrderTypeSelect from '@/components/selects/OrderTypeSelect';
import { queryFormDescriptions as formDescriptions } from '../config/form';

export default class Query extends BaseQuery {
  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  renderContent = () => {
    return (
      <Fragment>
        {this.renderEditItem('username', <Input size="small" placeholder="用户姓名" />)}
        {this.renderEditItem('telephone', <Input size="small" placeholder="联系方式" />)}
        {this.renderEditItem('submitTime', <DatePicker.RangePicker size="small" />)}
        {this.renderEditItem('orderStatus', <OrderTypeSelect size="small" placeholder="订单状态" />)}
      </Fragment>
    );
  };
}
