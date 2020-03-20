import { keys, get, keyBy, filter, last } from 'lodash';
import { router } from 'umi';

export default {
  namespace: 'tab',

  state: {
    activeKey: '/',
    tabs: [
      {
        title: '首页',
        key: '/',
        path: '/',
        closable: false,
      },
    ],
  },

  effects: {
    *deleteTabs(_, { call, put, select }) {
      let tabs = yield select(state => {
        return state.tab.tabs;
      });
      const key = get(_, 'payload.data.key');
      tabs = filter(tabs, tab => tab.key !== key);
      const activeKey = get(last(tabs), 'key');
      router.push(get(keyBy(tabs, 'key'), `${activeKey}.path`));
      yield put({
        type: 'tab/changeTabs',
        payload: {
          type: 'deleteTab',
          data: { key },
        },
      });
    },
  },

  reducers: {
    changeTabs(state, { payload }) {
      let tabs = state.tabs;
      const tabKeys = keys(keyBy(tabs, 'key'));
      const key = get(payload, 'data.key');
      let activeKey = get(payload, 'data.key') || '/';
      if (get(payload, 'type') === 'addTab') {
        if (!(tabKeys.indexOf(key) > -1)) {
          tabs.push(get(payload, 'data'));
          activeKey = key;
        }
      } else if (get(payload, 'type') === 'deleteTab') {
        tabs = filter(tabs, tab => tab.key !== key);
        activeKey = get(last(tabs), 'key');
      }

      return {
        ...state,
        tabs,
        activeKey,
      };
    },
    changeActiveKey(state, { payload }) {
      return {
        ...state,
        activeKey: get(payload, 'data.activeKey'),
      };
    },
  },
};
