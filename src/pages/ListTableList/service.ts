import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request.get('/api/rule', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request.post('/api/rule', {
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request.post('/api/rule', {
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request.post('/api/rule', {
    data: {
      ...params,
      method: 'update',
    },
  });
}
