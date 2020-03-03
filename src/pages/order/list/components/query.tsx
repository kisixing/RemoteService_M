import React from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Form, Input, Button } from 'antd';

export class Query extends BaseQuery {
  handleQuery = (values: any) => {
    const { onQuery } = this.props;
    onQuery && onQuery(values);
  };

  render() {
    return (
      <div>
        <Form ref={this.formRef} layout="inline" onFinish={this.handleQuery}>
          <Form.Item name="deviceName" label="输入搜索">
            <Input placeholder="设备名称/厂家/型号" />
          </Form.Item>
          <Form.Item name="deviceType" label="设备类型">
            <Input />
          </Form.Item>
          <Form.Item name="deviceStatus" label="设备状态">
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
