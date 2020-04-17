import React, { useState, useEffect } from 'react';
import { Radio, Row, Col, Input, Select } from 'antd';
import { get, map, join, set, split, compact } from 'lodash';

interface IProps {
  config: {};
  value?: any;
  onChange?: any;
}

interface IDease {
  value: string;
  label: string;
}

export default (props: IProps) => {
  const [data, setData] = useState([]);
  const config = JSON.parse(get(props, 'config.special_config'));
  const diseases = get(config, 'options') || [];

  // TODO: 获取数据回显

  useEffect(() => {
    const { value } = props;
    if (get(config, 'type') === 'string') {
      setData(compact(split(value, ',')));
    } else {
      const selectedDiseasesArray: any = map(diseases, (disease: IDease) => {
        if (get(value, disease.value)) {
          return disease.value;
        }
      });
      setData(compact(selectedDiseasesArray));
    }
  }, []);

  const handleChange = selectedDiseasesArray => {
    const { onChange } = props;
    let dataResponse: any = null;
    if (get(config, 'type') === 'string') {
      dataResponse = join(selectedDiseasesArray, ',');
      setData(selectedDiseasesArray);
    } else {
      dataResponse = {};
      map(selectedDiseasesArray, selectedDisease => {
        set(dataResponse, selectedDisease, true);
      });
      setData(selectedDiseasesArray);
    }
    onChange && onChange(dataResponse);
  };

  return (
    <>
      <Select mode="multiple" size="small" value={data} onChange={handleChange} {...get(props, 'config.inputProps')}>
        {map(diseases, disease => {
          return (
            <Select.Option key={get(disease, 'value')} value={get(disease, 'value')}>
              {get(disease, 'label')}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};
