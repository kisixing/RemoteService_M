import React from 'react';
import { get } from 'lodash';
import SelectWithInput, { IOption as Option } from '@/components/GeneralComponents/SelectWithInput';

export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'special_config') && JSON.parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [Option];
  const inputType = get(specialConfig, 'inputType');
  const selectedValueShowInput = get(specialConfig, 'selectedValueShowInput');

  const handleChange = (data: { select: any; input: any }) => {
    console.log(data);
  };

  return (
    <SelectWithInput
      inputType={inputType}
      options={options}
      value={props.value}
      selectedValueShowInput={selectedValueShowInput}
      onChange={handleChange}
    />
  );
};
