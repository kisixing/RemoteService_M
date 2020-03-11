import React from 'react';
import { orderCloseFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';

export default class OrderCloseModal extends BaseModal {
  static defaultProps = {
    title: '关闭订单',
    formDescriptions,
    formItemLayout: {
      wrapperCol: { span: 18 },
    },
  };
}
