import request from '@/utils/request';

export async function query(): Promise<any> {
  return request.get('/users');
}

export async function queryCurrent(): Promise<any> {
  return request.get('/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request.get('/notices');
}
