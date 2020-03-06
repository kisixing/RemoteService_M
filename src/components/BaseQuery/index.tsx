import React from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import { get } from 'lodash';

interface IProps {
  onSearch: (values: any) => void;
}

export class BaseQuery extends React.Component<IProps>  {
  formRef = React.createRef<FormInstance>();

  handleReset = () => {
    get(this, 'formRef.current.resetFields')();
  };

  render() {
    return <div></div>;
  }
}

export default BaseQuery;
