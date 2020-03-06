import React from 'react';
import { Form, Button, DatePicker } from 'antd';
import BaseQuery from '@/components/BaseQuery';
import ServiceTypeSelect from './ServiceTypeSelect';
import ServiceTypeStatus from './ServiceTypeStatus';

export default class Query extends BaseQuery {
  render() {
    return (
      <Form ref={this.formRef} layout="inline" onFinish={values => this.props.onSearch(values)}>
        <Form.Item name="consultTime" label="咨询时间">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item name="consultType" label="服务类型">
          <ServiceTypeSelect style={{ width: 150 }} />
        </Form.Item>
        <Form.Item name="serviceStatus" label="服务状态">
          <ServiceTypeStatus style={{ width: 150 }} />
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            查询
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
