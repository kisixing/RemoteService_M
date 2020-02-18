import request from '@/utils/request';

export async function queryFakeList(params: { count: number }) {
  return request.get('/fake_list', {
    params,
  });
}
