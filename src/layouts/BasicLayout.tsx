import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { notification, Tabs } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.jpg';
import request from '@/utils/request';
import { isNil, keyBy, keys, get, map } from 'lodash';
import store from 'store';
import { TOKEN } from '@/utils/request';
import styles from './Layout.less';
import Welcome from '@/pages/Welcome';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;

  const [menusPermissions = [], setMenusPermissions] = useState();

  useEffect(() => {
    const { location } = props;
    const username = store.get('username');
    // const loginTime = store.get('loginTime');
    // const expiredTime = store.get('expiredTime');
    const token = store.get(TOKEN);
    if (!token) {
      dispatch({
        type: 'login/logout',
      });
      return;
    }
    // if (loginTime + expiredTime < new Date().getTime()) {
    //   notification.error({ message: 'token已过期，请重新登录' });
    //   dispatch({
    //     type: 'login/logout',
    //   });
    //   return;
    // }

    (async () => {
      if (!!username && !!token) {
        dispatch({
          type: 'user/fetchCurrentUser',
          payload: {
            username,
          },
        });
      }

      const permissions = await request.get('/permissions?type.equals=menu&size=200');
      const permissionsMapping = keyBy(permissions, 'key');
      setMenusPermissions(keys(permissionsMapping));

      if (location && location.pathname !== '/') {
        const menuItemProps = get(permissionsMapping, get(location, 'pathname'));

        const data = {
          title: get(menuItemProps, 'name'),
          key: get(menuItemProps, 'key'),
          path: get(menuItemProps, 'key'),
          closable: true,
        };
        dispatch({
          type: 'tab/changeTabs',
          payload: {
            type: 'addTab',
            data,
          },
        });
      }
    })();
  }, []);

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    return menuList.map(item => {
      let localItem = {};
      if (menusPermissions.indexOf(item.path || '/') > -1) {
        localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
      }
      return localItem as MenuDataItem;
    });
  };

  const handleClickMenuItem = menuItemProps => () => {
    const { dispatch, activeKey } = props;
    const data = {
      title: get(menuItemProps, 'name'),
      key: get(menuItemProps, 'key'),
      path: get(menuItemProps, 'path'),
      closable: true,
    };
    if (activeKey !== get(menuItemProps, 'key')) {
      dispatch({
        type: 'tab/changeTabs',
        payload: {
          type: 'addTab',
          data,
        },
      });
    }
  };

  const handleClickHeader = () => {
    const { dispatch } = props;
    dispatch({
      type: 'tab/changeActiveKey',
      payload: {
        data: { activeKey: '/' },
      },
    });
  };

  const handleTabChange = activeKey => {
    const { dispatch, tabs } = props;
    router.push(get(keyBy(tabs, 'key'), `${activeKey}.path`));
    dispatch({
      type: 'tab/changeActiveKey',
      payload: {
        data: { activeKey },
      },
    });
  };

  const handleEditTabs = (key, action) => {
    const { dispatch } = props;

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

  const renderHome = tab => {
    return (
      <Tabs.TabPane tab={get(tab, 'title')} key={get(tab, 'key')} closable={get(tab, 'closable')}>
        <Welcome />
      </Tabs.TabPane>
    );
  };

  return (
    <>
      <ProLayout
        className={styles.customProLayout}
        logo={logo}
        formatMessage={formatMessage}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/" onClick={handleClickHeader}>
            {logoDom}
            {titleDom}
          </Link>
        )}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }
          return (
            <Link to={menuItemProps.path} onClick={handleClickMenuItem(menuItemProps)}>
              {defaultDom}
            </Link>
          );
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        {!!store.get(TOKEN) && (
          <div className={styles.customPanel}>
            <Tabs
              activeKey={props.activeKey}
              onChange={handleTabChange}
              type="editable-card"
              hideAdd
              onEdit={handleEditTabs}
            >
              {map(props.tabs, tab => {
                if (get(tab, 'key') === '/') {
                  return renderHome(tab);
                }
                return (
                  <Tabs.TabPane
                    tab={get(tab, 'title')}
                    key={get(tab, 'key')}
                    closable={get(tab, 'closable')}
                  >
                    <div className={styles.customPanelContent}>
                      {props.activeKey === get(tab, 'key') && children}
                    </div>
                  </Tabs.TabPane>
                );
              })}
            </Tabs>
          </div>
        )}
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings, tab }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  tabs: tab.tabs,
  activeKey: tab.activeKey,
}))(BasicLayout);
