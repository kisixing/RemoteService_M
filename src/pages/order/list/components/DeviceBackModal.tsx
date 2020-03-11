import React from 'react';
import { deviceBackFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';

export default class DepositBackModal extends BaseModal {
  static defaultProps = {
    title: '回收设备',
    formDescriptions,
    formItemLayout: {},
  };
}
