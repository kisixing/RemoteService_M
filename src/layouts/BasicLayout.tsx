import ProLayout, { MenuDataItem, PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Modal, ConfigProvider } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.jpg';
import { keyBy, keys, get, map, isEmpty, reduce, concat, isNil } from 'lodash';
import store from 'store';
import request, { TOKEN } from '@/utils/request';
import styles from './less/Layout.less';
import VisitedPanel from '@lianmed/pages/lib/Remote/VisitedPanel';
import zhCN from 'antd/es/locale/zh_CN';
import RouterTabs from './RouterTabs';

const omitMenus = [
  {
    id: 999,
    type: 'others',
    key: '/account/settings',
    name: '个人设置',
    parentid: 0,
    active: null,
  },
  {
    id: 998,
    type: 'others',
    key: '/pregnancies/physical-exam/edit',
    name: '体格检查',
    parentid: 24,
    active: null,
  },
  {
    id: 998,
    type: 'others',
    key: '/pregnancies/deliver-form',
    name: '分娩记录',
    parentid: 24,
    active: null,
  },
];

const BasicLayout = (props: any) => {
  const [panelHeight, setPanelHeight] = useState(document.documentElement.clientHeight - 130);
  const [routerTabWidth, setRouterTabWidth] = useState(
    document.documentElement.clientWidth - (props.collapsed ? 100 : 276),
  );
  const { dispatch, children, settings } = props;

  const showOvertime = () => {
    Modal.error({
      title: '登录失效',
      content: '登录状态已失效，请重新登录',
      okText: '重新登录',
      onOk: () => {
        dispatch({
          type: 'login/logout',
        });
      },
    });
  };

  // 登录过期与退出登录
  useEffect(() => {
    const { currentUser, allPermissions } = props;

    const username = store.get('username');
    const token = store.get(TOKEN);
    const loginTime = store.get('loginTime');
    const expiredTime = store.get('expiredTime');
    if (loginTime + expiredTime < new Date().getTime()) {
      showOvertime();
    }
    if (!username || !token) {
      dispatch({
        type: 'login/logout',
      });
    }

    if (!isEmpty(currentUser) && !isNil(allPermissions)) {
      dispatchTabs(currentUser, allPermissions);
    }
  }, [props.location.pathname, props.collapsed]);

  // 获取权限
  useEffect(() => {
    const { products, currentUser, allPermissions } = props;
    const username = store.get('username');
    (async () => {
      if (isEmpty(products)) {
        await dispatch({
          type: 'select/getProducts',
          payload: {},
        });
      }

      const newCurrentUser = isEmpty(currentUser) ? await request.get(`/users/${username}`) : currentUser;
      const newAllPermissions = isEmpty(allPermissions)
        ? await request.get('/permissions?type.equals=menu&size=200')
        : allPermissions;

      await dispatch({
        type: 'user/saveCurrentUser',
        payload: newCurrentUser,
      });

      await dispatch({
        type: 'user/saveAllPermissions',
        payload: newAllPermissions,
      });

      dispatchTabs(newCurrentUser, newAllPermissions);
    })();
  }, []);

  // 监听 resize 和清除 resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  const dispatchTabs = (currentUser: any, allPermissions: any) => {
    const { location } = props;

    const selfPermissions = reduce(
      get(currentUser, 'groups'),
      (sum, group) => concat(sum as [], get(group, 'permissions') as []),
      [],
    );
    const permissionsMapping = keyBy(concat(selfPermissions, omitMenus), 'key');
    if (location && location.pathname !== '/') {
      const menuItemProps = get(permissionsMapping, get(location, 'pathname'));
      if (menuItemProps) {
        const data = {
          title: get(menuItemProps, 'name'),
          key: get(menuItemProps, 'key'),
          path: get(menuItemProps, 'key'),
          search: get(location, 'search'),
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
        const allPermissionsMapping = keyBy(allPermissions, 'key');

        get(allPermissionsMapping, get(location, 'pathname'))
          ? router.push('/exception/403')
          : router.push('/exception/404');
      }
    }
  };

  const handleResize = () => {
    setPanelHeight(document.documentElement.clientHeight - 130);
    setRouterTabWidth(document.documentElement.clientWidth - (props.collapsed ? 276 : 100));
  };

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
      (sum, group) => concat(sum as [], get(group, 'permissions') as []),
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

  const handleClickMenuItem = (menuItemProps: any) => () => {
    const { activeKey } = props;
    const data = {
      title: get(menuItemProps, 'name'),
      key: get(menuItemProps, 'key'),
      path: get(menuItemProps, 'path'),
      search: '',
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
    dispatch({
      type: 'tab/changeActiveKey',
      payload: {
        data: { activeKey: '/' },
      },
    });
  };

  return (
    <ConfigProvider locale={zhCN}>
      <ProLayout
        className={styles.customProLayout}
        style={{ height: 600, overflow: 'scroll' }}
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
            <PageHeaderWrapper className={styles.customPageHeader} title={false} />
            <RouterTabs style={{ width: routerTabWidth }} />
            <div className={styles.customPanelChild} style={{ height: panelHeight }}>
              {children}
            </div>
          </div>
        )}
      </ProLayout>
      {/* <VisitedPanel remote_url="http://transfer.lian-med.com" /> */}
    </ConfigProvider>
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
