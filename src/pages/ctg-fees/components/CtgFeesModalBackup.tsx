import React, { Fragment } from 'react';
import { Form, Modal, Input, InputNumber, message } from 'antd';
import { DynamicForm } from '@lianmed/components';
import { modalFormDescriptions as formDescriptions } from '../config/form';
import request from '@/utils/request';

export default class CtgFeesModal extends DynamicForm {
  formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  };

  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  componentDidMount() {
    const { ctgFeesId } = this.props;
    setTimeout(async () => {
      this.form = this.formRef.current;
      if (ctgFeesId) {
        const values = await request.get(`/ctgapplyfees/${ctgFeesId}`);
        this.form.setFieldsValue(values);
      }
    }, 100);
  }

  handleSubmit = async () => {
    const { ctgFeesId, onCancel, onSearch } = this.props;
    let tip = '';
    let method = '';
    const values = this.form.getFieldsValue();
    if (ctgFeesId) {
      tip = '修改判图费成功';
      method = 'put';
    } else {
      tip = '添加判图费成功';
      method = 'post';
    }
    await request[method]('/ctgapplyfees', {
      data: {
        ...values,
        type: 'CTGAPPLY',
      },
    });
    message.success(tip);
    onCancel();
    onSearch();
  };

  renderEditContent = () => {
    const { ctgFeesId } = this.props;
    return (
      <Fragment>
        {ctgFeesId && this.renderEditItem('id', <Input disabled />)}
        {this.renderEditItem('name', <Input />)}
        {this.renderEditItem('price', <InputNumber />)}
        {this.renderEditItem('sortorder', <InputNumber />)}
      </Fragment>
    );
  };

  render() {
    const { visible, onCancel, ctgFeesId } = this.props;
    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        title={ctgFeesId ? '修改判图费' : '添加判图费'}
      >
        <Form ref={this.formRef}>{this.renderEditContent()}</Form>
      </Modal>
    );
  }
}
