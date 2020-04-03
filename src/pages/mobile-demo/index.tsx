import React, { useEffect, useState } from 'react';
import { get, map } from 'lodash';
import styles from './index.less';

export default () => {
  const [data, setData] = useState('');

  const calculate = (x: number) => {
    return (321 * x) / 750;
  };

  useEffect(() => {
    window.addEventListener(
      'message',
      res => {
        let htmlData = typeof get(res, 'data') === 'string' ? get(res, 'data') : '';
        // 获取所有 font size
        const results = htmlData.matchAll(/font-size:\d+px/g);
        let tempIndex = 0;
        let responseHtml = '';
        map([...results], result => {
          const resultStr = get(result, '0');
          const resultIndex = get(result, 'index');
          const fontSize = get(get(result, '0').match(/\d+/g), '0');
          const responseStr = `font-size:${calculate(fontSize)}px`;
          const beforeStr = htmlData.substr(tempIndex, resultIndex - tempIndex);
          tempIndex = resultIndex + resultStr.length;
          responseHtml += `${beforeStr}${responseStr}`;
        });
        responseHtml = `${responseHtml}${htmlData.substring(tempIndex)}`;
        setData(responseHtml);
      },
      false,
    );
  }, []);

  return (
    <>
      <div className={styles.mobileDemo} dangerouslySetInnerHTML={{ __html: data }}></div>
    </>
  );
};
