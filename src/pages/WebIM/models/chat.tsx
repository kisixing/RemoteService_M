import { get } from 'lodash';
import { imDb } from '@lianmed/im';

export const addMessages = async (pMessage: any) => {
  return await imDb.addMessage(pMessage);
};

export const fetchMessages = async (id: any, chatType = 'chat', offset = 0, limit = 20) => {
  return await imDb.fetchMessage(id, chatType, offset, limit);
};

export default {
  namespace: 'chat',
  state: {
    activeFriend: null,
    friends: [],
  },
  reducers: {
    getMessagesById(state: any, { payload }) {
      return {
        ...state,
        [payload.id]: payload.pMessages,
      };
    },
    addMessage(state: any, { payload }) {
      const messages = get(state, payload.id);
      messages.push(payload.pMessage);
      return {
        ...state,
        [payload.id]: messages,
      };
    },
    addFriends(state: any, { payload }) {
      return {
        ...state,
        friends: payload.friends,
      };
    },
    changeActiveFriend(state: any, { payload }) {
      console.log('changeActiveFriend');
      return {
        ...state,
        activeFriend: payload.activeFriend,
      };
    },
  },
  effects: {
    *addMessages({ payload }, { call, put }) {
      yield call(addMessages, payload.pMessage);
      yield put({ type: 'addMessage', payload });
    },
    *fetchMessages({ payload }, { call, put }) {
      const pMessages = yield call(fetchMessages, payload.id);
      yield put({ type: 'getMessagesById', payload: { pMessages, id: payload.id } });
    },
  },
};
