import request from '@/utils/request';

export async function queryCurrent() {
  return request.get('/api/currentUser');
}

export async function queryProvince() {
  return request.get('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request.get(`/api/geographic/city/${province}`);
}

export async function query() {
  return request.get('/api/users');
}
