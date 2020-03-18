import React from 'react';
import { get } from 'lodash';
import { bindServiceFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';
import { Modal, Form, Input, InputNumber } from 'antd';

export default class BindServiceModal extends BaseModal {
  static defaultProps = {
    title: '服务次数',
    formDescriptions,
    formItemLayout: {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    },
  };

  componentDidMount() {
    const { data } = this.props;
    setTimeout(() => {
      this.form = this.formRef.current;
      this.form.setFieldsValue({
        service1amount: get(data, 'service1amount'),
      });
    }, 100);
  }

  handleServiceChange = () => {
    const { data } = this.props;

    this.form.setFieldsValue({
      service1amount:
        Number(get(data, 'service1amount')) + Number(this.form.getFieldValue('addService')),
    });
  };

  render() {
    const { visible, onCancel, data, title } = this.props;
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title={title}
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form ref={this.formRef}>
          {this.renderEditItem('username', <span>{get(data, 'pregnancy.name')}</span>)}
          {this.renderEditItem('contactType', <span>{get(data, 'pregnancy.telephone')}</span>)}
          {this.renderEditItem('service1amount', <InputNumber disabled />)}
          {this.renderEditItem(
            'addService',
            <InputNumber
              min={0}
              placeholder="请输入服务次数"
              onChange={this.handleServiceChange}
            />,
          )}
        </Form>
      </Modal>
    );
  }
}
