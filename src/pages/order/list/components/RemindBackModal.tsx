import React from 'react';
import { Modal, Input, Form, Spin, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { get } from 'lodash';

export default class RemindBackModal extends React.Component {
  formRef = React.createRef<FormInstance>();

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.formRef.current.getFieldsValue());
  };

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title="提醒用户归还"
        okText="确认"
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form wrapperCol={{ span: 18 }} ref={this.formRef}>
          <Form.Item label="标题" name="title" required>
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label="内容" name="content" required>
            <Input.TextArea placeholder="请输入推送内容" autoSize={{ minRows: 5 }} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
