import { map, get } from 'lodash';

export const toApi = (data: any) => {
  return {
    ...data,
    products: map(get(data, 'products'), id => ({ id })),
  };
};

export const fromApi = (data: any) => {
  return {
    ...data,
    products: map(get(data, 'products'), product => get(product, 'id')),
  };
};
