import React from 'react';
import { bindDeviceFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';
import { Input, Form, Modal } from 'antd';
import { get, split } from 'lodash';

export default class BindDeviceModal extends BaseModal {
  static defaultProps = {
    title: '绑定设备',
    formDescriptions,
    formItemLayout: {},
  };

  handleErpnoChange = e => {
    const value = get(e, 'target.value');
    if (value.length === 34 && split(value, '-').length === 4) {
      this.form.setFieldsValue({
        erpno: value.slice(0, 21),
      });
    }
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
          {this.renderEditItem('username', <span>{get(data, 'pregnancy.name')}</span>)}
          {this.renderEditItem('contactType', <span>{get(data, 'pregnancy.telephone')}</span>)}
          {this.renderEditItem('type', <span>{get(data, 'device.type')}</span>)}
          {this.renderEditItem('erpno', <Input onChange={this.handleErpnoChange} />)}
        </Form>
      </Modal>
    );
  }
}
