import { get } from 'lodash';
import { getProducts } from '@/services/select';

export default {
  namespace: 'select',

  state: {
    products: [],
  },

  effects: {
    *getProducts(_, { call, put, select }) {
      const products = yield call(getProducts);
      yield put({
        type: 'changeProducts',
        payload: { products },
      });
    },
  },

  reducers: {
    changeProducts(state, { payload }) {
      return {
        products: { ...get(state, 'products'), ...get(payload, 'products') },
      };
    },
  },
};
