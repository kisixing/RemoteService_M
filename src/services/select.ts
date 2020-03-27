import request from '@/utils/request';

export const getProducts = async () => {
  return await request.get('/products');
};
