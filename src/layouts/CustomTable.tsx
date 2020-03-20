import React from 'react';
import { Table } from 'antd';
import stylesCustomTable from './less/Table.less';

export default class CustomTable extends React.PureComponent {
  // state = {
  //   clientHeight: 600,
  // };

  // componentDidMount() {
  //   this.setState({
  //     clientHeight: document.body.clientHeight,
  //   });
  // }

  render() {
    return <Table className={stylesCustomTable.table} size="small" {...this.props} bordered={false} />;
  }
}
