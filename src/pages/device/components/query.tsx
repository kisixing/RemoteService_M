import React, { Fragment } from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Input } from 'antd';
import { queryFormDescriptions as formDescriptions } from '../config/form';
import DeviceStatusSelect from '@/components/selects/DeviceStatusSelect';
import { DataSelect } from '@lianmed/components';

export default class Query extends BaseQuery {
  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  renderContent = () => {
    return (
      <Fragment>
        {this.renderEditItem('devicename', <Input placeholder="请输入设备名称" />)}
        {this.renderEditItem(
          'type',
          <DataSelect
            url="/products"
            valueKey="id"
            labelKey="name"
            placeholder="请选择设备类型"
            style={{ width: 150 }}
            allowClear
          />,
        )}
        {this.renderEditItem('status', <DeviceStatusSelect style={{ width: 150 }} />)}
      </Fragment>
    );
  };
}
