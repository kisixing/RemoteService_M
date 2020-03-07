import React from 'react';
import { Modal, Form, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { get } from 'lodash';

export default class BindDeviceModal extends React.Component {
  formRef = React.createRef<FormInstance>();

  componentDidMount() {
    const { orderInfo } = this.props;

    setTimeout(() => {
      this.formRef.current.setFieldsValue({
        service1amount: get(orderInfo, 'service1amount'),
      });
    }, 100);
  }

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
        title="服务次数"
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
          <Form.Item label="服务次数" name="service1amount" required>
            <InputNumber placeholder="修改服务次数" min={0} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
