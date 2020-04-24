import React from 'react';
import { Input, Row, Col } from 'antd';
import { get, map } from 'lodash';
import InputWithLabel from '@/components/GeneralComponents/InputWithLabel';

interface IProps {
  options: any;
  type?: any;
}

export default (props: IProps) => {
  const { options } = props;
  return (
    <Row>
      {map(options as any, option => {
        return (
          <Col span={Math.floor(24 / options.length)}>
            <InputWithLabel {...props} />
          </Col>
        );
      })}
    </Row>
  );
};
