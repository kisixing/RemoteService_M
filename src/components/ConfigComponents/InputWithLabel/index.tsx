import React, { useState, useEffect } from 'react';
import { Input, InputNumber } from 'antd';
import { get } from 'lodash';
import InputWithLabel from '@/components/GeneralComponents/InputWithLabel';

interface IProps {
  labelBefore?: string;
  labelBeforeStyle?: object;
  labelAfterStyle?: object;
  labelAfter?: string;
  value?: any;
  style?: any;
  size?: any;
  onChange?: any;
  type?: 'string' | 'number';
}

// 通用的单个输入框
export default (props: IProps) => {
  const [data, setData] = useState('');

  const config = get(props, 'config');
  const specialConfig = get(config, 'special_config') && JSON.parse(get(config, 'special_config'));
  useEffect(() => {
    const { value } = props;
    value && setData(String(value));
  }, [props.value]);

  const handleChange = (value: any) => {
    const { onChange } = props;
    console.log(value);
    onChange && onChange(value);
  };

  return <InputWithLabel onChange={handleChange} value={data} {...specialConfig} />;
};
