import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  try {
    await request.post('/authenticate', {
      data: params,
    });
    return {
      status: 'ok',
      currentAuthority: 'admin',
      type: 'login',
    };
  } catch (error) {
    return {
      status: 'error',
    };
  }
}

export async function getFakeCaptcha(mobile: string) {
  return request.get(`/login/captcha?mobile=${mobile}`);
}
