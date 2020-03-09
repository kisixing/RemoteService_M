import React from 'react';
import { Form, Button } from 'antd';
import { DynamicForm } from '@lianmed/components';

export default class BaseQuery extends DynamicForm {
  formDescriptions = {};

  formItemLayout = {
    labelCol: {},
    wrapperCol: {},
  };

  renderEditItem = () => {};

  renderContent = () => {};

  handleReset = () => {
    this.form && this.form.resetFields();
    this.handleSearch();
  };

  handleSearch = (values = {}) => {
    const { onSearch } = this.props;
    onSearch && onSearch(values);
  };

  renderResetBtn = () => (
    <Form.Item>
      <Button onClick={this.handleReset}>重置</Button>
    </Form.Item>
  );

  renderSearchBtn = () => (
    <Form.Item>
      <Button type="primary" htmlType="submit">
        查询
      </Button>
    </Form.Item>
  );

  render() {
    return (
      <Form ref={this.formRef} layout="inline" onFinish={this.handleSearch}>
        {this.renderContent()}
        {this.renderResetBtn()}
        {this.renderSearchBtn()}
      </Form>
    );
  }
}
