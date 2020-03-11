import React from 'react';
import { bindDeviceFormDescriptions as formDescriptions } from '../config/form';
import BaseModal from '@/components/BaseModalForm/BaseModal';

export default class BindDeviceModal extends BaseModal {
  static defaultProps = {
    title: '绑定设备',
    formDescriptions,
    formItemLayout: {},
  };
}
