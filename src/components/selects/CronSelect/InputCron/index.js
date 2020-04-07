import React, { PureComponent } from 'react';
import { Dropdown, Input, Radio } from 'antd';
import Cron from '../Cron';

class InputCron extends PureComponent {
  state = {
    dateVisible: false,
    value: undefined,
    inputWay: 'manual',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: nextValue } = nextProps;
    const { value: prevValue } = prevState;
    if (nextValue !== prevValue) {
      return {
        value: nextValue,
      };
    }
    return null;
  }

  handleChange = value => {
    this.setState({
      value,
    });
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  clear = () => {
    this.setState({
      value: null,
    });
  };

  handleRadioChange = e => {
    this.setState({
      inputWay: e.target.value,
    });
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
    const { onChange } = this.props;
    onChange && onChange(e.target.value);
  };

  render() {
    const { dateVisible, value, inputWay } = this.state;
    const { style, lang, type, width } = this.props;
    return (
      <>
        <Radio.Group onChange={this.handleRadioChange} style={{ marginBottom: 8 }} value={inputWay}>
          <Radio value="select">选择</Radio>
          <Radio value="manual">手动</Radio>
        </Radio.Group>
        {inputWay === 'select' ? (
          <Dropdown
            trigger={['click']}
            placement="bottomLeft"
            visible={dateVisible}
            onVisibleChange={visible => this.setState({ dateVisible: visible })}
            overlay={<Cron onChange={this.handleChange} value={value} style={style} lang={lang} type={type} />}
          >
            <Input size="small" readOnly value={value} style={{ width }} />
          </Dropdown>
        ) : (
          <Input size="small" value={value} style={{ width }} onChange={this.handleInputChange} />
        )}
      </>
    );
  }
}
export default InputCron;
