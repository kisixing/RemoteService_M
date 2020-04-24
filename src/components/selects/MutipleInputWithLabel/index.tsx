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
  const { options, type } = specialConfig;
  return (
    <Row>
      {map(options as any, option => {
        return (
          <Col span={Math.floor(24 / options.length)}>
            <InputWithLabel
              {...get(config, 'inputProps')}
              type={get(option, 'type') ? get(option, 'type') : type}
              labelBefore={get(option, 'labelBefore')}
              labelAfter={get(option, 'labelAfter')}
            />
          </Col>
        );
      })}
    </Row>
  );
};
