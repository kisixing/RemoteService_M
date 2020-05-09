import React from 'react';
import { map, get, keyBy } from 'lodash';
import { withRouter } from 'umi';
import { RouteComponentProps } from 'dva/router';
import TabButton from '@/components/GeneralComponents/TabButton';
import styles from './less/RouterTabs.less';
import { connect } from 'dva';

interface IProps extends RouteComponentProps {
  style?: any;
  dispatch?: any;
  tabs?: any;
  tabsMapping?: any;
}

export class RouterTabs extends React.Component<IProps> {
  handleClick = (tabKey: any) => {
    const { dispatch, tabsMapping, history } = this.props;
    history.push(
      `${get(tabsMapping, `${tabKey}.path`)}${
        get(tabsMapping, `${tabKey}.search`) ? get(tabsMapping, `${tabKey}.search`) : ''
      }`,
    );
    dispatch({
      type: 'tab/changeActiveKey',
      payload: {
        data: { key: tabKey },
      },
    });
  };

  handleCloseTab = (tabKey: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tab/deleteTabs',
      payload: {
        data: { key: tabKey },
      },
    });
  };

  render() {
    const { style, tabs, location } = this.props;

    return (
      <div className={styles.customRouterTabs} style={style}>
        {map(tabs, (tab, index) => {
          return (
            <TabButton
              key={tab.key}
              tabKey={tab.key}
              closable={tab.closable}
              isActive={location.pathname === tab.path}
              title={tab.title}
              onClick={this.handleClick}
              onClose={this.handleCloseTab}
            />
          );
        })}
      </div>
    );
  }
}

export default connect(({ tab }) => ({
  tabs: tab.tabs,
  tabsMapping: keyBy(tab.tabs, 'key'),
}))(withRouter(RouterTabs));
