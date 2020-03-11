import React from 'react';
import { get } from 'lodash';
import { bindServiceFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';

export default class BindServiceModal extends BaseModal {
  static defaultProps = {
    title: '服务次数',
    formDescriptions,
    formItemLayout: {},
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
}
