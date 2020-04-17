import React, { useState } from 'react';
import { Checkbox, Input, Row, Col } from 'antd';
import { get, map, set, indexOf, clone, filter, unset } from 'lodash';

// special_config 配置如下
//
const specialConfigDemo = {
  type: 'single',
  options: [
    {
      value: 'negative',
      label: '阴性',
      withInput: false,
    },
    {
      value: 'positive',
      label: '阳性',
      withInput: true,
      exceptionStyle: {
        checkboxStyle: {
          color: '#ff0000',
        },
        inputStyle: {
          borderColor: '#ff0000',
        },
      },
    },
    {
      value: 'other',
      label: '其它',
      withInput: true,
    },
  ],
};

export default (props: any) => {
  const config = get(props, 'config');
  const specialConfig = JSON.parse(get(config, 'special_config'));
  const options = get(specialConfig, 'options') as [
    { value: string; label: string; checked: boolean; withInput: boolean },
  ];
  const type = get(specialConfig, 'type') as 'single' | 'multiple';

  const [checkedValues, setCheckedValues] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleCheckboxChange = option => e => {
    const { onChange } = props;
    const targetValue = get(e, 'target.value');
    if (type === 'single') {
      let checkedValuesFilter = [];
      let temp = clone(inputValues);
      if (indexOf(checkedValues, targetValue) > -1) {
        temp = {};
      } else {
        checkedValuesFilter = [targetValue];
        set(temp, targetValue, true);
      }
      setCheckedValues(checkedValuesFilter);
      setInputValues(temp);
      onChange &&
        onChange({
          type,
          checked: targetValue,
          input: inputValues,
        });
    } else if (type === 'multiple') {
      let checkedValuesFilter = [];
      let temp = clone(inputValues);
      if (indexOf(checkedValues, targetValue) > -1) {
        checkedValuesFilter = filter(checkedValues, item => item !== targetValue);
        unset(temp, targetValue);
        unset(temp, `${targetValue}Note`);
      } else {
        checkedValuesFilter = [...checkedValues, targetValue];
        // 如果 checkedValue 在 checkedValuesFilter 里面，说明该属性为 true
        set(temp, targetValue, true);
      }

      // TODO: 互斥逻辑
      //   if (get(option, 'resetAll')) {
      //     checkedValuesFilter = [targetValue];
      //     temp = { [targetValue]: true };
      //   }

      setCheckedValues(checkedValuesFilter);
      setInputValues(temp);

      onChange &&
        onChange({
          type,
          checked: checkedValuesFilter,
          input: temp,
        });
    }
  };

  const handleInputChange = option => e => {
    const { onChange } = props;
    const targetValue = get(e, 'target.value');
    if (type === 'single') {
      const inputValueObj = {
        [get(option, 'value')]: true,
        [`${get(option, 'value')}Note`]: targetValue,
      };
      setInputValues(inputValueObj);
      onChange &&
        onChange({
          type,
          checked: get(checkedValues, '0'),
          input: inputValueObj,
        });
    } else if (type === 'multiple') {
      const inputValueObj = {
        ...inputValues,
        [get(option, 'value')]: true,
        [`${get(option, 'value')}Note`]: targetValue,
      };
      setInputValues(inputValueObj);
      onChange &&
        onChange({
          type,
          checked: checkedValues,
          input: inputValueObj,
        });
      console.log({
        type,
        checked: checkedValues,
        input: inputValueObj,
      });
    }
  };

  return (
    <Checkbox.Group value={checkedValues} style={{ width: '100%' }}>
      <Row>
        {map(options, (option, index) => {
          if (option.withInput) {
            return (
              <>
                <Col offset={index === 0 ? 0 : 1}>
                  <Checkbox
                    style={indexOf(checkedValues, option.value) > -1 ? get(option, 'exceptionStyle.checkboxStyle') : {}}
                    value={option.value}
                    onChange={handleCheckboxChange(option)}
                  >
                    {option.label}
                  </Checkbox>
                </Col>
                <Col>
                  {indexOf(checkedValues, option.value) > -1 && (
                    <Input
                      style={get(option, 'exceptionStyle.inputStyle')}
                      size="small"
                      onChange={handleInputChange(option)}
                      value={get(inputValues, `${get(option, 'value')}Note`)}
                    />
                  )}
                </Col>
              </>
            );
          }

          return (
            <Col offset={index === 0 ? 0 : 1}>
              <Checkbox value={option.value} onChange={handleCheckboxChange(option)}>
                {option.label}
              </Checkbox>
            </Col>
          );
        })}
      </Row>
    </Checkbox.Group>
  );
};
