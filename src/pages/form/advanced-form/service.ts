import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request.post('/api/forms', {
    data: params,
  });
}
