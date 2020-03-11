import request from '@/utils/request';

export async function queryCurrent() {
  // return request.get('/currentUser');
}

export async function queryProvince() {
  return request.get('/geographic/province');
}

export async function queryCity(province: string) {
  return request.get(`/geographic/city/${province}`);
}

export async function query() {
  return request.get('/users');
}
