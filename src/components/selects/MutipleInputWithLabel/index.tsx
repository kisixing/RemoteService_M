import React from 'react';
import { Input, Row, Col } from 'antd';
import { get, map } from 'lodash';
import InputWithLabel from '../InputWithLabel';

interface IProps {
  config: any;
}

export default (props: IProps) => {
  const config = get(props, 'config');
  const specialConfig = get(config, 'special_config') && JSON.parse(get(config, 'special_config'));

  return (
    <Row>
      {map(get(specialConfig, 'options'), option => {
        return (
          <Col>
            <InputWithLabel
              {...get(config, 'inputProps')}
              lableBefore={get(option, 'lableBefore')}
              lableAfter={get(option, 'lableAfter')}
            />
          </Col>
        );
      })}
    </Row>
  );
};
