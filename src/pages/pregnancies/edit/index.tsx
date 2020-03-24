import React from 'react';
import Form from './components/form';
import styles from './index.less';

export default class Pregnancies extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className={styles.pregnanciesPanel}>
        <Form style={{ minWidth: '80%' }} />
      </div>
    );
  }
}
