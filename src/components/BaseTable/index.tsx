import React, { Component } from 'react';
import { Table, Button } from 'antd';
import styles from './index.less';

export default class BaseTable extends Component {
  renderTitle = () => {
    const { onAdd, baseTitle } = this.props;
    return (
      <div className={styles.title}>
        <span className={styles.titleName}>{baseTitle}列表</span>
        <Button className={styles.titleAddBtn} onClick={onAdd}>
          添加{baseTitle}
        </Button>
      </div>
    );
  };

  render() {
    return <Table title={this.renderTitle} bordered {...this.props} />;
  }
}
