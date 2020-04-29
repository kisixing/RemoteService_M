import React, { useState } from 'react';
import { get } from 'lodash';
import CheckboxWithInput from '@/components/GeneralComponents/CheckboxWithInput';

type Option = {
  value: string;
  label: string;
  checked: boolean;
  withInput: boolean;
  span?: number;
  offset?: number;
  inputSpan?: number;
};

export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'special_config') && JSON.parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [Option];
  const type = get(specialConfig, 'type') as 'single' | 'multiple';

  // const options = [
  //   { value: 0, label: '完整', span: 3, withInput: false },
  //   {
  //     value: 1,
  //     label: '切开',
  //     withInput: true,
  //     inputType: 'checkbox',
  //     inputSpan: 6,
  //     span: 3,
  //     options: [
  //       { value: 2, label: '侧切' },
  //       { value: 3, label: '直切' },
  //     ],
  //   },
  //   {
  //     value: 4,
  //     label: '破裂',
  //     withInput: true,
  //     inputType: 'checkbox',
  //     inputSpan: 6,
  //     span: 3,
  //     options: [
  //       { value: 5, label: 'Ⅰ°' },
  //       { value: 6, label: 'Ⅱ°' },
  //       { value: 7, label: 'Ⅲ°' },
  //     ],
  //   },
  //   { value: 8, label: '其它', inputSpan: 4, span: 3, withInput: true },
  // ];

  // const type = 'single';
  // 单选
  // const value = {
  //   checkedValues: [1],
  // };

  // 单选/多选带输入框
  // const value = {
  //   checkedValues: [1, 2],
  //   withInputValues: {
  //     1: {
  //       key: 1,
  //       value: {
  //         0: 123,
  //       },
  //     },
  //     2: {
  //       key: 2,
  //       value: {
  //         0: 'zzzz',
  //       },
  //     },
  //   },
  // };

  // 单选/多选带多个输入框
  // const value = {
  //   checkedValues: [1],
  //   withInputValues: {
  //     1: {
  //       key: 1,
  //       value: {
  //         0: '123',
  //         1: 999,
  //         2: 'zzz',
  //       },
  //     },
  //     2: {
  //       key: 2,
  //       value: {
  //         0: 'zzzz',
  //       },
  //     },
  //   },
  // };

  // 多选带 CheckBox 和输入框混合
  // const value = {
  //   checkedValues: [1],
  //   withInputValues: {
  //     1: {
  //       key: 1,
  //       value: [2]
  //     },
  //   },
  // };

  const handleChange = (data: any) => {
    console.log(data);
  };

  return <CheckboxWithInput type={type} options={options} onChange={handleChange} />;
};
