import React, { useState, useEffect } from 'react';
import { get, isEmpty, isNil } from 'lodash';
import CheckboxWithInput from '@/components/GeneralComponents/CheckboxWithInput';
import { isJsonStr } from '@/utils/helper';

type Option = {
  value: string;
  label: string;
  checked: boolean;
  withInput: boolean;
  span?: number;
  offset?: number;
  inputSpan?: number;
};

// 接收格式
/**
 * {
 *  key: '',
 *  keyNote: ''
 * }
 */

export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'special_config') && JSON.parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [Option];
  const type = get(specialConfig, 'type') as 'single' | 'multiple';

  const [data, setData] = useState({});
  useEffect(() => {
    const key = get(props, 'value.key');
    const keyNote = get(props, 'value.keyNote');

    !isEmpty(get(props, 'value')) &&
      setData({
        checkedValues: !isNil(key) && [key],
        withInputValues: keyNote ? { [key]: { key, value: { '0': keyNote } } } : undefined,
      });
  }, [props.value]);

  const handleChange = (callbackData: any) => {
    const { onChange } = props;
    const key = get(callbackData, 'checkedValues.0');
    const keyNote = get(callbackData, `withInputValues.${key}.value.0`);
    onChange &&
      onChange({
        key,
        keyNote,
      });
  };

  return <CheckboxWithInput type={type} options={options} onChange={handleChange} value={data} />;
};
