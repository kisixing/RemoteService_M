import React, { Fragment } from 'react';
import { Input } from 'antd';
import { queryFormDescriptions as formDescriptions } from '../config/form';
import BaseQuery from '@/components/BaseQuery';

export default class Query extends BaseQuery {
  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  renderContent = () => {
    return <Fragment>{this.renderEditItem('name', <Input size="small" />)}</Fragment>;
  };
}
