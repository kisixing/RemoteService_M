import React from 'react';
import InputCron from './InputCron';

export default class CronSelect extends React.Component {
  handleChange = data => {
    const { onChange } = this.props;
    console.log(data);
    onChange(data);
  };

  render() {
    return (
      <InputCron
        onChange={this.handleChange}
        lang="zh_CN"
        type={['second', 'minute', 'hour', 'day', 'month', 'week']}
      />
    );
  }
}
