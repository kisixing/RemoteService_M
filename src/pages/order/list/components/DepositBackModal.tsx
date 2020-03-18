import React from 'react';
import { depositBackFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';

export default class DepositBackModal extends BaseModal {
  static defaultProps = {
    title: '退还押金',
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
}
