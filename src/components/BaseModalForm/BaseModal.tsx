import React from 'react';
import { Modal, Form } from 'antd';
import { DynamicForm } from '@lianmed/components';
import FormSection from './FormSection';

export default class Base extends DynamicForm {
  static defaultProps = {
    title: '',
    formDescriptions: {},
    formItemLayout: {},
  };

  constructor(props: any) {
    super(props);
    const { formDescriptions, formItemLayout } = props;

    this.renderEditItem = this.generateRenderEditItem(formDescriptions, {
      formItemLayout,
    });
  }

  renderEditItem = (key: any, ReactNode: any) => {};

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.form.getFieldsValue());
  };

  render() {
    const { visible, onCancel, data, title, formDescriptions } = this.props;
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title={title}
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form ref={this.formRef}>
          <FormSection
            data={data}
            formDescriptions={formDescriptions}
            renderEditItem={this.renderEditItem}
          />
        </Form>
      </Modal>
    );
  }
}
