import { Effect } from 'dva';
import { Reducer } from 'redux';
import { get } from 'lodash';

import { queryCurrent, query as queryUsers, queryAllPermissions } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrentUser: Effect;
    fetchAllPermissions: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    saveAllPermissions: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrentUser(_, { call, put }) {
      const response = yield call(queryCurrent(get(_, 'payload.username')));
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchAllPermissions(_, { call, put }) {
      const response = yield call(queryAllPermissions);
      yield put({
        type: 'saveAllPermissions',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveAllPermissions(state, action) {
      return {
        ...state,
        allPermissions: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
