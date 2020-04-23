import React from 'react';
import { Input, Row, Col } from 'antd';
import { get } from 'lodash';

interface IProps {
  lableBefore?: string;
  lableBeforeStyle?: object;
  lableAfterStyle?: object;
  lableAfter?: string;
  value?: any;
}

export default (props: IProps) => {
  return (
    <Row>
      {get(props, 'lableBefore') && (
        <Col span={6}>
          <span style={{ display: 'block', marginLeft: 8, marginRight: 8, ...get(props, 'lableAfterStyle') }}>
            {get(props, 'lableBefore')}
          </span>
        </Col>
      )}
      <Col span={6}>
        <Input size="small" {...props} />
      </Col>
      {get(props, 'lableAfter') && (
        <Col span={6}>
          <span style={{ display: 'block', marginLeft: 8, marginRight: 8, ...get(props, 'lableAfterStyle') }}>
            {get(props, 'lableAfter')}
          </span>
        </Col>
      )}
    </Row>
  );
};
