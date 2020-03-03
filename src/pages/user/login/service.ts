import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {

  return request.post('/authenticate', {
 
    data: params,
  }).then(r => {
    return {
      status: 'ok',
      // type: 'account',
      currentAuthority: 'admin',
    }
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request.get(`/login/captcha?mobile=${mobile}`);
}
