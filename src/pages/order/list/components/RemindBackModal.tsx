import React from 'react';
import { remindBackFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';

export default class RemindBackModal extends BaseModal {
  static defaultProps = {
    title: '提醒归还',
    formDescriptions,
    formItemLayout: {
      wrapperCol: { span: 18 },
    },
  };
}
