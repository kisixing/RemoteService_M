import React from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Form, Input, Button, DatePicker } from 'antd';

export class Query extends BaseQuery {
  handleQuery = (values: any) => {
    const { onQuery } = this.props;
    onQuery && onQuery(values);
  };

  render() {
    return (
      <div>
        <Form ref={this.formRef} layout="inline" onFinish={this.handleQuery}>
          <Form.Item name="consultTime" label="咨询时间">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="consultType" label="服务类型">
            <Input />
          </Form.Item>
          <Form.Item name="serviceStatus" label="服务状态">
            <Input />
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

export default Query;
