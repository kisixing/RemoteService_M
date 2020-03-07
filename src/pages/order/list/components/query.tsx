import React from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Form, Input, Button, DatePicker } from 'antd';
import OrderTypeSelect from './OrderTypeSelect';

export default class Query extends BaseQuery {
  render() {
    return (
      <div>
        <Form
          ref={this.formRef}
          layout="inline"
          onFinish={(values: any) => this.props.onSearch(values)}
        >
          <Form.Item name="username" label="用户姓名">
            <Input placeholder="用户姓名" />
          </Form.Item>
          <Form.Item name="telephone" label="联系方式">
            <Input placeholder="联系方式" />
          </Form.Item>
          <Form.Item name="submitTime" label="提交时间">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="orderStatus" label="订单状态">
            <OrderTypeSelect />
          </Form.Item>
          <Form.Item>
            <Button htmlType="reset" onClick={this.handleReset}>
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
