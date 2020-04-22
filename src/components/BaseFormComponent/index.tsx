import React from 'react';
import { get } from 'lodash';
import { Input, DatePicker, Checkbox, InputNumber } from 'antd';
import SelectWithOptions from '@/components/selects/SelectWithOptions';
import NormalSelect from '@/components/selects/NormalSelect';

export default (props: any) => {
  const render = () => {
    const inputType = get(props, 'config.inputType');
    switch (inputType) {
      case 'input':
        return <Input size="small" {...props} />;
      case 'month_picker':
        return <DatePicker.MonthPicker size="small" {...props} />;
      case 'checkbox':
        return <Checkbox size="small" {...props} />;
      case 'select_with_options':
        return <SelectWithOptions size="small" {...props} />;
      case 'normal_select':
        return <NormalSelect size="small" {...props} />;
      case 'input_number':
        return <InputNumber size="small" {...props} />;
      default:
        return <Input size="small" {...props} />;
    }
  };

  return <>{render()}</>;
};
