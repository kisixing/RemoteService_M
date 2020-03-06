import React from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Form, Input, Button, DatePicker } from 'antd';
import ServiceTypeSelect from './ServiceTypeSelect';

export default class Query extends BaseQuery {
  render() {
    return (
      <div>
        <Form
          ref={this.formRef}
          layout="inline"
          onFinish={(values: any) => this.props.onSearch(values)}
        >
          <Form.Item name="username" label="用户相关">
            <Input placeholder="用户姓名/手机号码" />
          </Form.Item>
          <Form.Item name="submitTime" label="提交时间">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="orderStatus" label="订单状态">
            <ServiceTypeSelect />
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
