import React, { useState, useEffect } from 'react';
import { Radio, Row, Col, Input } from 'antd';
import { get } from 'lodash';

interface IProps {
  config: {};
  value?: any;
  onChange?: any;
}

export default (props: IProps) => {
  const [radioValue, setRadioValue] = useState();
  const [inputValue, setInputValue] = useState('');
  const config = JSON.parse(get(props, 'config.special_config'));
  const radioKey = get(config, 'radioKey');
  const inputKey = get(config, 'inputKey');

  useEffect(() => {
    const { value } = props;
    setRadioValue(get(value, radioKey));
    setInputValue(get(value, inputKey));
  }, []);

  const handleChangeOption = (e: any) => {
    const { onChange } = props;
    setRadioValue(get(e, 'target.value'));
    onChange &&
      onChange({
        [radioKey]: get(e, 'target.value'),
        [inputKey]: get(e, 'target.value') ? inputValue : null,
      });
  };

  const handleChangeInput = (e: any) => {
    const { onChange } = props;
    setInputValue(get(e, 'target.value'));
    onChange &&
      onChange({
        [radioKey]: radioValue,
        [inputKey]: get(e, 'target.value'),
      });
  };

  return (
    <>
      <Row>
        <Col span={13}>
          <Radio.Group onChange={handleChangeOption} value={radioValue}>
            <Radio value={get(config, 'no.value')}>{get(config, 'no.title')}</Radio>
            <Radio value={get(config, 'yes.value')}>{get(config, 'yes.title')}</Radio>
          </Radio.Group>
        </Col>
        {radioValue && (
          <Col span={11}>
            <Input value={inputValue} onChange={handleChangeInput} size="small" />
          </Col>
        )}
      </Row>
    </>
  );
};
