import React from 'react';
import { DynamicForm } from '@lianmed/components';
import { Form, Divider, Button } from 'antd';
import { get, map, isFunction, isEqual } from 'lodash';
import FormSection from '@/components/BaseModalForm/FormSection';
import moment from 'moment';

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
    formDescriptionsWithoutSection: [],
    formDescriptions: [],
    renderEditItem: undefined,
    form: null,
  };

  componentDidMount() {
    const { data, formDescriptionsWithoutSection, formDescriptions } = this.props;
    setTimeout(() => {
      const form = this.formRef.current;
      form && form.setFieldsValue(data);
      const renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
        formItemLayout,
      });
      this.setState({
        form,
        renderEditItem,
        formDescriptions,
        formDescriptionsWithoutSection,
      });
    }, 100);
  }

  handleFinish = async () => {
    const { form } = this.state;
    const { onFinish, data } = this.props;
    // form && (await form.validateFields());
    const params = {
      ...form.getFieldsValue(),
      id: get(data, 'id'),
    };
    console.log(params);
    onFinish && onFinish(params);
  };

  handleIDNumberChange = e => {
    const { form } = this.state;
    const IDNumber = e.target.value as string;
    if (IDNumber.length === 18) {
      form &&
        form.setFieldsValue({
          dob: moment(`${IDNumber.substr(6, 4)}-${IDNumber.substr(10, 2)}-${IDNumber.substr(12, 2)}`),
        });
    }
  };

  renderSection = section => {
    const { data } = this.props;
    const { renderEditItem, form } = this.state;
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
            events={{ handleIDNumberChange: this.handleIDNumberChange }}
            renderEditItem={renderEditItem}
            form={form}
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
      <Form style={{ minWidth: '90%' }} ref={this.formRef} {...formItemLayout}>
        {this.renderEditContent()}
        <Form.Item key="action" wrapperCol={{ span: 4 }} style={{ display: 'flex', flexFlow: 'row-reverse' }}>
          <Button size="middle" htmlType="reset" style={{ marginLeft: 8 }}>
            重置
          </Button>
          <Button size="middle" style={{ marginLeft: 8 }} type="primary" htmlType="submit" onClick={this.handleFinish}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
