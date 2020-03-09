import React from 'react';
import { Table, Button } from 'antd';
import styles from '../index.less';

export default class CtgFeesTable extends React.Component {
  renderTitle = () => {
    const { onAdd } = this.props;
    return (
      <div className={styles.title}>
        <span className={styles.titleName}>判图费列表</span>
        <Button className={styles.titleAddBtn} onClick={onAdd}>添加判图费</Button>
      </div>
    );
  };

  render() {
    return <Table title={this.renderTitle} {...this.props} />;
  }
}
