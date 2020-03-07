import React from 'react';
import { Modal, Input, Form, Spin, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { get } from 'lodash';

export default class OrderCloseModal extends React.Component {
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
        title="关闭订单"
        okText="确认"
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form wrapperCol={{ span: 18 }} ref={this.formRef}>
          <Form.Item label="操作备注" name="comment" required>
            <Input.TextArea placeholder="请输入操作备注" autoSize={{ minRows: 5 }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
