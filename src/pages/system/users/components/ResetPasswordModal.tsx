import React from 'react';
import { resetFormDescriptions as formDescriptions } from '../config/form';
import { DynamicForm } from '@lianmed/components';
import request from '@/utils/request';
import FormSection from '@/components/BaseModalForm/FormSection';
import { Modal, Form, message } from 'antd';
import { get } from 'lodash';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

export default class BaseModalForm extends DynamicForm {
  state = {
    data: {},
  };

  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout,
  });

  componentDidMount() {
    const { paramryKey } = this.props;
    setTimeout(async () => {
      this.form = this.formRef.current;
      const data = await request.get(`/users/${paramryKey}`);
      this.setState({ data });
    }, 100);
  }

  handleSubmit = async () => {
    const { data } = this.state;
    const { id, onCancel, onSearch } = this.props;
    await this.form.validateFields();
    await request.post('/account/reset-password', {
      data: {
        login: get(data, 'login'),
        password: this.form.getFieldValue('password'),
      },
    });
    message.success('重置密码成功');
    onCancel();
    onSearch();
  };

  renderEditContent = () => {
    return <FormSection {...this.props} renderEditItem={this.renderEditItem} formDescriptions={formDescriptions} />;
  };

  render() {
    const { visible, onCancel, id } = this.props;
    return (
      <Modal width={400} visible={visible} onCancel={onCancel} onOk={this.handleSubmit} title="重置密码">
        <Form ref={this.formRef} {...formItemLayout}>
          {this.renderEditContent()}
        </Form>
      </Modal>
    );
  }
}
