import React, { Fragment } from 'react';
import { Form, Modal, message } from 'antd';
import { isFunction } from 'lodash';
import { DynamicForm } from '@lianmed/components';
import request from '@/utils/request';
import FormSection from './FormSection';

export default class Extends extends DynamicForm {
  constructor(props: any) {
    super(props);
    this.state = {
      formDescriptions: {},
      url: null,
      title: null,
      fromApi: null,
      toApi: null,
      modalProps: null,
      fixedFormParams: null,
      renderEditItem: null,
      formItemLayout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 8,
        },
      },
      data: {},
    };
  }

  componentDidMount() {
    const { id, paramryKey } = this.props;
    const { url, fromApi, formDescriptions, formItemLayout } = this.state;
    setTimeout(async () => {
      this.form = this.formRef.current;
      const renderEditItem = this.generateRenderEditItem(formDescriptions, {
        formItemLayout,
      });
      this.setState({ renderEditItem });
      if (id) {
        const values = isFunction(fromApi)
          ? fromApi(await request.get(`/${url}/${paramryKey || id}`))
          : await request.get(`/${url}/${paramryKey || id}`);
        this.form.setFieldsValue(values);
        this.setState({ data: values });
      }
    }, 100);
  }

  handleSubmit = async () => {
    const { data, toApi, title, url, fixedFormParams } = this.state;
    const { id, onCancel, onSearch } = this.props;
    let tip = '';
    let method = '';

    await this.form.validateFields();
    // console.log(this.form.getFieldsValue());return;
    const values = isFunction(toApi)
      ? toApi({ ...data, ...this.form.getFieldsValue(), id })
      : { ...data, ...this.form.getFieldsValue(), id };
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
    const { formDescriptions, renderEditItem } = this.state;
    return (
      <>
        {renderEditItem && (
          <FormSection {...this.props} renderEditItem={renderEditItem} formDescriptions={formDescriptions} />
        )}
      </>
    );
  };

  render() {
    const { modalProps, title, formItemLayout } = this.state;
    const { visible, onCancel, id } = this.props;
    return (
      <Modal
        {...modalProps}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        title={id ? `修改${title}` : `添加${title}`}
      >
        <Form ref={this.formRef} {...formItemLayout}>
          {this.renderEditContent()}
        </Form>
      </Modal>
    );
  }
}
