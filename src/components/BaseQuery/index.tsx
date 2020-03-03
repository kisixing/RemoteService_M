import React from 'react';
import { Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

export class BaseQuery extends React.Component {
  formRef = React.createRef<FormInstance>();

  handleQuery = (values: any) => {
    console.log(values);
  };

  handleReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    return <div></div>;
  }
}

export default BaseQuery;
