import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { get, map, join, set, split, compact } from 'lodash';

interface IProps {
  config: {};
  value?: any;
  onChange?: any;
}

interface IOption {
  value: string;
  label: string;
}

export default (props: IProps) => {
  const [data, setData] = useState([]);
  const config = get(props, 'config.special_config') && JSON.parse(get(props, 'config.special_config'));
  const options = get(config, 'options') || [];

  useEffect(() => {
    const { value } = props;
    // 字符串形式，如丈夫疾病史
    if (get(config, 'type') === 'string') {
      setData(compact(split(value, ',')));
      // 对象形式，如孕妇疾病史
    } else if (get(config, 'type') === 'object') {
      const selectedArray: any = map(options, (option: IOption) => {
        if (get(value, option.value)) {
          return option.value;
        }
      });
      setData(compact(selectedArray));
      // 数组形式，如分娩方式、不良生育史
    } else if (get(config, 'type') === 'array') {
      setData(value);
    }
  }, []);

  const handleChange = selectedArray => {
    const { onChange } = props;
    let dataResponse: any = null;
    if (get(config, 'type') === 'string') {
      dataResponse = join(selectedArray, ',');
    } else if (get(config, 'type') === 'object') {
      dataResponse = {};
      if (get(config, 'mode') === 'single') {
        set(dataResponse, selectedArray, true);
      } else {
        map(selectedArray, selectedDisease => {
          set(dataResponse, selectedDisease, true);
        });
      }
    } else if (get(config, 'type') === 'array') {
      dataResponse = selectedArray;
    }
    setData(selectedArray);
    onChange && onChange(dataResponse);
  };

  return (
    <>
      <Select
        mode={get(config, 'mode')}
        size="small"
        value={data}
        onChange={handleChange}
        {...get(props, 'config.inputProps')}
      >
        {map(options, option => {
          return (
            <Select.Option key={get(option, 'value')} value={get(option, 'value')}>
              {get(option, 'label')}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};
