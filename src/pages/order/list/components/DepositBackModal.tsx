import React from 'react';
import { Modal, Input, Form, Spin, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { get } from 'lodash';

export default class DepositBackModal extends React.Component {
  formRef = React.createRef<FormInstance>();

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.formRef.current.getFieldsValue());
  };

  render() {
    const { visible, onCancel, orderInfo } = this.props;
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title="退还押金"
        okText="确认"
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form ref={this.formRef}>
          <Form.Item label="用户姓名" name="username">
            <span>{get(orderInfo, 'pregnancy.name')}</span>
          </Form.Item>
          <Form.Item label="联系方式" name="contactType">
            <span>{get(orderInfo, 'pregnancy.telephone') || '--'}</span>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
