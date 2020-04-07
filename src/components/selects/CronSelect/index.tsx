import React from 'react';
import InputCron from './InputCron';

interface IProps {
  onChange: (data: any) => void;
  value: object;
}

export default class CronSelect extends React.Component<IProps> {
  handleChange = (data: any) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };

  render() {
    const { value } = this.props;
    return (
      <InputCron
        onChange={this.handleChange}
        lang="zh_CN"
        type={['second', 'minute', 'hour', 'day', 'month', 'week']}
        value={value}
      />
    );
  }
}
