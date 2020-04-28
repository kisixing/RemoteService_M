import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Row, Col } from 'antd';
import { get, map, set, indexOf, clone, filter, unset, isEmpty, cloneDeep, values } from 'lodash';
import InputWithLabel from '@/components/GeneralComponents/InputWithLabel';
import MultipleInputWithLabel, {
  Option as MultipleInputWithLabelOption,
} from '@/components/GeneralComponents/MultipleInputWithLabel';

interface Option {
  value: any;
  label?: any;
  span?: number;
  withInput?: boolean;
  inputType?: 'multiple_input' | 'checkbox' | 'input';
  inputSpan?: number;
  options?: MultipleInputWithLabelOption[] | any[];
}

interface IProps {
  value?: any;
  options?: Option[];
  onChange?: any;
  type?: 'single' | 'multiple';
}

export default (props: IProps) => {
  const { options, type, onChange } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    const { value } = props;
    !isEmpty(value) && setData(value);
  }, [props.value]);

  const handleBoxGroupChange = (checkedValues: any[]) => {
    const tempData = cloneDeep(data);
    const oldCheckedValues = get(tempData, 'checkedValues');
    let newCheckedValues = checkedValues;
    if (type === 'single') {
      newCheckedValues = filter(checkedValues, item => indexOf(oldCheckedValues, item) === -1);
      set(tempData, 'withInputValues', {});
    }
    set(tempData, 'checkedValues', newCheckedValues);
    setData(tempData);
    onChange && onChange(tempData);
  };

  const handleInputChange = (inputType: any, option: any) => (inputValue: any) => {
    const tempData = cloneDeep(data);

    if (inputType === 'input') {
      set(tempData, `withInputValues.${get(option, 'value')}`, {
        key: get(option, 'value'),
        value: {
          0: inputValue,
        },
      });
    }

    if (inputType === 'multiple_input') {
      set(tempData, `withInputValues.${get(option, 'value')}`, {
        key: get(option, 'value'),
        value: inputValue,
      });
    }

    if (inputType === 'checkbox') {
      set(tempData, `withInputValues.${get(option, 'value')}`, {
        key: get(option, 'value'),
        value: inputValue,
      });
    }

    setData(tempData);
    onChange && onChange(tempData);
  };

  const renderInput = (option: any) => {
    const { inputSpan = 6, offset = 0, inputType = 'input', enterType = 'string', ...others } = option;
    const { checkedValues, withInputValues } = data;

    if (indexOf(checkedValues, option.value) > -1) {
      // 简单的接一个 input
      if (inputType === 'input') {
        const inputValue = get(withInputValues, `${option.value}.value.0`);
        return (
          <Col span={inputSpan}>
            <div style={{ display: 'flex' }}>
              <span style={{ display: 'inline-block', marginRight: 4 }}>( </span>
              <InputWithLabel
                {...others}
                type={enterType}
                style={get(option, 'exceptionStyle.inputStyle')}
                size="small"
                onChange={handleInputChange(inputType, option)}
                value={inputValue}
              />
              <span style={{ display: 'inline-block', marginLeft: 4 }}> )</span>
            </div>
          </Col>
        );
      }

      // 接多个 checkbox
      if (inputType === 'checkbox') {
        const checkboxOptions = get(option, 'options');
        const boxValues = values(get(withInputValues, `${get(option, 'value')}.value`));

        return (
          <Col span={inputSpan}>
            <span style={{ display: 'inline-block', marginRight: 4 }}>( </span>
            <Checkbox.Group value={boxValues} onChange={handleInputChange(inputType, option)}>
              {map(checkboxOptions, checkboxOption => {
                return <Checkbox value={get(checkboxOption, 'value')}>{get(checkboxOption, 'label')}</Checkbox>;
              })}
            </Checkbox.Group>
            <span style={{ display: 'inline-block', marginLeft: 4 }}> )</span>
          </Col>
        );
      }

      // 接多个 input
      if (inputType === 'multiple_input') {
        const inputOptions = get(option, 'options');
        const inputValue = get(withInputValues, `${option.value}.value`);
        return (
          <Col span={inputSpan}>
            <MultipleInputWithLabel
              needWrapper
              options={inputOptions}
              value={inputValue}
              onChange={handleInputChange(inputType, option)}
            />
          </Col>
        );
      }
    }

    return <></>;
  };

  return (
    <Checkbox.Group value={get(data, 'checkedValues')} onChange={handleBoxGroupChange} style={{ width: '100%' }}>
      <Row>
        {map(options, (option, index) => {
          const { span = 3, offset = 0 } = option;
          if (option.withInput) {
            return (
              <>
                <Col offset={offset} span={span}>
                  <Checkbox
                    style={
                      indexOf(get(data, 'checkedValues'), option.value) > -1
                        ? get(option, 'exceptionStyle.checkboxStyle')
                        : {}
                    }
                    value={option.value}
                  >
                    {option.label}
                  </Checkbox>
                </Col>
                {renderInput(option)}
              </>
            );
          }

          return (
            <Col offset={offset} span={span}>
              <Checkbox value={option.value}>{option.label}</Checkbox>
            </Col>
          );
        })}
      </Row>
    </Checkbox.Group>
  );
};
