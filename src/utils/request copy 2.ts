/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import router from 'umi/router';
import store from 'store';
import r from '@lianmed/request';
import { notification } from 'antd';

export const TOKEN = 'lianmed-authority';

const request = r.config({
  prefix: 'http://192.168.123.10:3333/api',
  hideErr: false,
  errHandler({ status, errortext, url }) {
    switch (status) {
      case 401:
        g_app._store.dispatch({
          type: 'login/logout',
        });
        break;
      case 400:
        notification.error({ message: '登录失败，请检查账号密码' });
        break;
      default:
        notification.error({ message: '发送错误' });
    }
  },
});

/**
 * 配置request请求时的默认参数
 */

// request拦截器, 改变url 或 options.
request._request.interceptors.request.use((url, options) => {
  // 不是登录并且没有 token ，跳转到登录页面
  if (!(['/api/authenticate'].indexOf(url) > -1) && !store.get(TOKEN)) {
    window.location.href = '/#/user/login';
    return { url, options };
  }

  options.headers = {
    ...options.headers,
    Authorization: store.get(TOKEN),
  };

  return { url, options };
});

// response拦截器, 处理response
request._request.interceptors.response.use(response => {
  const token = response.headers.get('authorization');
  if (token) {
    store.set(TOKEN, token);
  }
  return response;
});

export default request;
