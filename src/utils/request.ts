/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import router from 'umi/router';
import store from 'store';

import r from '@lianmed/request';
const TOKEN = 'lianmed-authority'
const request = r.config({
  prefix: '/api',
  hideErr: false,
  errHandler({ status, errortext, url }) {
    if (status === 401) {
      // @HACK
      /* eslint-disable no-underscore-dangle */
      g_app._store.dispatch({
        type: 'login/logout',
      });
      return;
    }

  },
});

/**
 * 配置request请求时的默认参数
 */

// request拦截器, 改变url 或 options.
request._request.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    Authorization: store.get(TOKEN),
  };
  return { url, options };
});

// response拦截器, 处理response
request._request.interceptors.response.use(
  (response) => {
    let token = response.headers.get('authorization');
    if (token) {
      store.set(TOKEN, token);
    }
    return response;
  }
);

export default request;
