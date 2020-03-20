import React from 'react';
import { Tabs } from 'antd';
import styles from './Layout.less';
import { connect } from 'dva';
import { map, get, keyBy, isEqual } from 'lodash';
import { router } from 'umi';

export class Tab extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  // shouldComponentUpdate(nextProps: any) {
    // if (nextProps.activeKey === this.props.activeKey) {
    // console.log(nextProps.activeKey, this.props.activeKey);

    //   return false;
    // }

    // return !isEqual(nextProps.activeKey, this.props.activeKey);
  // }

  componentWillUpdate(nextProps) {
    console.log(nextProps.activeKey, this.props.activeKey);
  }

  handleTabChange = activeKey => {
    const { dispatch, tabs } = this.props;
    router.push(get(keyBy(tabs, 'key'), `${activeKey}.path`));
    dispatch({
      type: 'tab/changeActiveKey',
      payload: {
        data: { activeKey },
      },
    });
  };

  handleEditTabs = (key, action) => {
    const { dispatch } = this.props;

    switch (action) {
      case 'add':
        break;
      case 'remove':
        dispatch({
          type: 'tab/deleteTabs',
          payload: {
            data: { key },
          },
        });
        break;
      default:
        break;
    }
  };

  renderHome = tab => {
    return (
      <Tabs.TabPane tab={get(tab, 'title')} key={get(tab, 'key')} closable={get(tab, 'closable')}>
        <div className={styles.customPanelContent}>这里是首页</div>
      </Tabs.TabPane>
    );
  };

  render() {
    const { children, tabs, activeKey } = this.props;
    // console.log(tabs);
    return (
      <div className={styles.customPanel}>
        <Tabs
          activeKey={activeKey}
          onChange={this.handleTabChange}
          type="editable-card"
          hideAdd
          onEdit={this.handleEditTabs}
        >
          {map(tabs, tab => {
            if (get(tab, 'key') === '/') {
              return this.renderHome(tab);
            }
            return (
              <Tabs.TabPane
                tab={get(tab, 'title')}
                key={get(tab, 'key')}
                closable={get(tab, 'closable')}
              >
                <div className={styles.customPanelContent}>{children}</div>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default connect(({ tab }) => {
  return {
    tabs: tab.tabs,
    activeKey: tab.activeKey,
  };
})(Tab);
