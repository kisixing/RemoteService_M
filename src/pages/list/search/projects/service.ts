import request from '@/utils/request';

export async function queryFakeList(params: { count: number }) {
  return request.get('/api/fake_list', {
    params,
  });
}
