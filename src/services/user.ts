import request from '@/utils/request';

export async function query(): Promise<any> {
  return request.get('/users');
}

export const queryCurrent = username => async () => {
  return await request.get(`/users/${username}`);
};

export async function queryNotices(): Promise<any> {
  return request.get('/notices');
}

export async function queryAllPermissions(): Promise<any> {
  return request.get('/permissions?type.equals=menu&size=200');
}
