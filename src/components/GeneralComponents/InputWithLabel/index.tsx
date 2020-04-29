import React, { useState, useEffect } from 'react';
import { Input, InputNumber } from 'antd';
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

// 通用的单个输入框
export default (props: IProps) => {
  const [data, setData] = useState('');
  useEffect(() => {
    const { value } = props;
    value && setData(String(value));
  }, [props.value]);

  const handleChange = (type: 'string' | 'number') => (e: any) => {
    const { onChange } = props;
    let tempData = '';
    if (type === 'string') {
      tempData = get(e, 'target.value');
    } else if (type === 'number') {
      tempData = e;
    }
    setData(tempData);
    onChange && onChange(tempData);
  };

  return (
    <div style={{ display: 'flex' }}>
      {get(props, 'labelBefore') && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 4,
            marginRight: 4,
            wordBreak: 'keep-all',
            ...get(props, 'labelAfterStyle'),
          }}
        >
          {get(props, 'labelBefore')}
        </span>
      )}
      {get(props, 'type') === 'number' ? (
        <InputNumber
          className={styles.inputWidth}
          size="small"
          min={0}
          {...props}
          value={Number(data)}
          onChange={handleChange('number')}
        />
      ) : (
        <Input className={styles.inputWidth} size="small" {...props} value={data} onChange={handleChange('string')} />
      )}
      {get(props, 'labelAfter') && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 4,
            marginRight: 4,
            wordBreak: 'keep-all',
            ...get(props, 'labelAfterStyle'),
          }}
        >
          {get(props, 'labelAfter')}
        </span>
      )}
    </div>
  );
};
