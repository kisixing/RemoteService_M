import React from 'react';
import { Input, Row, Col, InputNumber } from 'antd';
import { get } from 'lodash';
import styles from './index.less';

interface IProps {
  labelBefore?: string;
  labelBeforeStyle?: object;
  labelAfterStyle?: object;
  labelAfter?: string;
  value?: any;
  style?: any;
  size?: any;
  onChange?: any;
  type?: 'string' | 'number';
}

export default (props: IProps) => {
  return (
    <div style={{ display: 'flex' }}>
      {get(props, 'labelBefore') && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 8,
            marginRight: 8,
            width: 'auto',
            ...get(props, 'labelAfterStyle'),
          }}
        >
          {get(props, 'labelBefore')}
        </span>
      )}
      {get(props, 'type') === 'number' ? (
        <InputNumber className={styles.inputWidth} size="small" min={0} {...props} />
      ) : (
        <Input className={styles.inputWidth} size="small" {...props} />
      )}
      {get(props, 'labelAfter') && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 8,
            marginRight: 8,
            width: 'auto',
            ...get(props, 'labelAfterStyle'),
          }}
        >
          {get(props, 'labelAfter')}
        </span>
      )}
    </div>
  );
};
