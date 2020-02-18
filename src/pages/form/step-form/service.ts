import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request.post('/forms', {

    data: params,
  });
}
