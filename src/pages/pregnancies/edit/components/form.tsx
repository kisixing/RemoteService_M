import React from 'react';
import { DynamicForm } from '@lianmed/components';
import { Form, Divider, Button } from 'antd';
import { get, map, isFunction, isEmpty, isEqual } from 'lodash';
import FormSection from '@/components/BaseModalForm/FormSection';

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default class PregnanciesForm extends DynamicForm {
  state = {
    isChildbirth: undefined,
    formDescriptionsWithoutSection: [],
    formDescriptions: [],
    renderEditItem: undefined,
  };

  componentDidMount() {
    const { data } = this.props;
    setTimeout(() => {
      this.form = this.formRef.current;
      this.form && this.form.setFieldsValue(data);
    }, 100);
  }

  componentWillReceiveProps(nextprops) {
    if (this.form) {
      const { formDescriptionsWithoutSection, formDescriptions, data } = nextprops;
      const renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
        formItemLayout,
      });
      if (isEqual(formDescriptionsWithoutSection, get(this.props, 'formDescriptionsWithoutSection')))
        this.setState({
          formDescriptionsWithoutSection,
          formDescriptions,
          renderEditItem,
        });
    }
  }

  handleFinish = async values => {
    const { onFinish, data } = this.props;
    await this.form.validateFields();
    console.log(values);
    onFinish && onFinish({ ...values, id: get(data, 'id') });
  };

  renderSection = section => {
    const { data } = this.props;
    const { renderEditItem } = this.state;

    return (
      <>
        <Divider key={`${get(section, 'flag')}-divider`} orientation="left">
          {get(section, 'name')}
        </Divider>
        {isFunction(renderEditItem) && (
          <FormSection
            key={`${get(section, 'flag')}-section`}
            data={data}
            formDescriptions={get(section, 'fields')}
            renderEditItem={renderEditItem}
          />
        )}
      </>
    );
  };

  renderEditContent = () => {
    const { formDescriptions } = this.props;
    return (
      <>
        {map(formDescriptions, section => {
          return this.renderSection(section);
        })}
      </>
    );
  };

  render() {
    return (
      <Form style={{ minWidth: '80%' }} ref={this.formRef} {...formItemLayout} onFinish={this.handleFinish}>
        {this.renderEditContent()}
        <Form.Item key="action" wrapperCol={{ span: 4 }} style={{ display: 'flex', flexFlow: 'row-reverse' }}>
          <Button size="middle" htmlType="reset" style={{ marginLeft: 8 }}>
            重置
          </Button>
          <Button size="middle" style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
