import React, { Fragment } from 'react';
import { Form, Modal, message } from 'antd';
import { DynamicForm } from '@lianmed/components';
import request from '@/utils/request';
import FormSection from './FormSection';

export default ({
  formDescriptions,
  url,
  title,
  fixedFormParams = {},
  formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  },
}) => {
  return class CtgFeesModal extends DynamicForm {
    renderEditItem = this.generateRenderEditItem(formDescriptions, {
      formItemLayout,
    });

    componentDidMount() {
      const { id } = this.props;
      setTimeout(async () => {
        this.form = this.formRef.current;
        if (id) {
          const values = await request.get(`/${url}/${id}`);
          this.form.setFieldsValue(values);
        }
      }, 100);
    }

    handleSubmit = async () => {
      const { id, onCancel, onSearch } = this.props;
      let tip = '';
      let method = '';
      await this.form.validateFields();
      const values = this.form.getFieldsValue();
      if (id) {
        tip = `修改${title}成功`;
        method = 'put';
      } else {
        tip = `添加${title}成功`;
        method = 'post';
      }
      await request[method](`/${url}`, {
        data: {
          ...values,
          ...fixedFormParams,
        },
      });
      message.success(tip);
      onCancel();
      onSearch();
    };

    renderEditContent = () => {
      return (
        <FormSection
          {...this.props}
          renderEditItem={this.renderEditItem}
          formDescriptions={formDescriptions}
        />
      );
    };

    render() {
      const { visible, onCancel, id } = this.props;
      return (
        <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={this.handleSubmit}
          title={id ? `修改${title}` : `添加${title}`}
        >
          <Form ref={this.formRef}>{this.renderEditContent()}</Form>
        </Modal>
      );
    }
  };
};
