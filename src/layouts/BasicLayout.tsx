import ProLayout, { MenuDataItem, BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { useEffect } from 'react';
import { Link, router } from 'umi';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Tabs } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.jpg';
import { keyBy, keys, get, map, isEmpty, reduce, concat } from 'lodash';
import store from 'store';
import request, { TOKEN } from '@/utils/request';
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

  useEffect(() => {
    const { location, products, currentUser, allPermissions } = props;
    const username = store.get('username');
    const token = store.get(TOKEN);
    if (!username || !token) {
      dispatch({
        type: 'login/logout',
      });
      return;
    }
    (async () => {
      if (isEmpty(products)) {
        await dispatch({
          type: 'select/getProducts',
          payload: {},
        });
      }

      if (isEmpty(currentUser)) {
        await dispatch({
          type: 'user/fetchCurrentUser',
          payload: {
            username,
          },
        });
        // currentUser = await request.get(`/users/${username}`);
      }

      if (isEmpty(allPermissions)) {
        await dispatch({
          type: 'user/fetchAllPermissions',
          payload: {},
        });
      }

      const newCurrentUser = isEmpty(currentUser) ? await request.get(`/users/${username}`) : currentUser;
      const newAllPermissions = isEmpty(allPermissions)
        ? await request.get('/permissions?type.equals=menu&size=200')
        : allPermissions;

      const selfPermissions = reduce(
        get(newCurrentUser, 'groups'),
        (sum, group) => concat(sum, get(group, 'permissions') || []),
        [],
      );
      const permissionsMapping = keyBy(selfPermissions, 'key');
      if (location && location.pathname !== '/') {
        const menuItemProps = get(permissionsMapping, get(location, 'pathname'));
        if (menuItemProps) {
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
        } else {
          const allPermissionsMapping = keyBy(newAllPermissions, 'key');
          get(allPermissionsMapping, get(location, 'pathname'))
            ? router.push('/exception/403')
            : router.push('/exception/404');
        }
      }
    })();
  }, [props.location.pathname]);

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    const permissions = reduce(
      get(props, 'currentUser.groups'),
      (sum, group) => concat(sum, get(group, 'permissions') || []),
      [],
    );
    const menusPermissions = keys(keyBy(permissions, 'key'));
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
          return first ? <Link to={paths.join('/')}>{route.breadcrumbName}</Link> : <span>{route.breadcrumbName}</span>;
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        {!!store.get(TOKEN) && (
          <div className={styles.customPanel}>
            {children}
            {/* //   <Tabs
        //     activeKey={props.activeKey}
        //     onChange={handleTabChange}
        //     type="editable-card"
        //     hideAdd
        //     onEdit={handleEditTabs}
        //   >
        //     {map(props.tabs, tab => {
        //       if (get(tab, 'key') === '/') {
        //         return renderHome(tab);
        //       }
        //       return (
        //         <Tabs.TabPane tab={get(tab, 'title')} key={get(tab, 'key')} closable={get(tab, 'closable')}>
        //           <div className={styles.customPanelContent}>{props.activeKey === get(tab, 'key') && children}</div>
        //         </Tabs.TabPane>
        //       );
        //     })}
        //   </Tabs> */}
          </div>
        )}
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings, tab, user, select }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  tabs: tab.tabs,
  products: select.products,
  activeKey: tab.activeKey,
  currentUser: get(user, 'currentUser'),
  allPermissions: get(user, 'allPermissions'),
}))(BasicLayout);
