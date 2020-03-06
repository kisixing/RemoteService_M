import React from 'react';
import { Row, Col } from 'antd';
import { get } from 'lodash';
import styles from '../index.less';

interface IProps {
  data: object;
  isActive: boolean;
  onClick: (id: any) => void;
}

export default class Friend extends React.Component<IProps> {
  static defaultProps = {
    isActive: false,
  };

  handleClick = () => {
    const { data, onClick } = this.props;
    onClick && onClick(data);
  };

  render() {
    const { data, isActive } = this.props;
    const activeStyle = isActive
      ? {
          backgroundColor: '#d9d9d9',
        }
      : {};

    return (
      <Row className={styles.friendPanel} style={activeStyle} onClick={this.handleClick}>
        <Col span={4}>
          <img className={styles.friendPanelAvatar} alt="avatar" src={get(data, 'avatar')} />
        </Col>
        <Col span={11} offset={1} className={styles.friendPanelMiddle}>
          <span className={styles.friendPanelMiddleName}>{get(data, 'name')}</span>
          <span className={styles.friendPanelMiddleNews}>{get(data, 'lastNews')}</span>
        </Col>
        <Col span={7} offset={1}>
          <span className={styles.friendPanelTime}>{get(data, 'lastTime')}</span>
        </Col>
      </Row>
    );
  }
}
