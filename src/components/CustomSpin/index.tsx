import React from 'react';
import { Spin } from 'antd';

export default (props: any) => {
  const style = {
    height: document.body.clientHeight - 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return <Spin style={style} tip="数据加载中..." {...props} />;
};
