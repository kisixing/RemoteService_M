/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import router from 'umi/router';
import store from 'store';
import { extend } from 'umi-request';
import r from "@lianmed/request";
import { notification } from 'antd';
import { get } from 'lodash';
export const TOKEN = 'lianmed-authority';

const isDev = process.env.isDev || true;

const request = extend({
  prefix: '/api',
  timeout: 30000,
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    Accept: 'application/json',
  },
  useCache: false,
  errorHandler: error => {
    const { response } = error;
    response
      .json()
      .catch(e => {})
      .then(res => {
        // console.log(res);
        switch (get(response, 'status')) {
          case 401:
            notification.error({
              message: '无权限',
              description: '未登录或登录已过期，请重新登录。',
            });
            g_app._store.dispatch({
              type: 'login/logout',
            });
            break;
          case 404:
            notification.error({
              message: '页面不存在',
              description: '你访问的页面不存在',
            });
            window.location.href = '/#/exception/404';
            break;
          case 400:
            notification.error({
              message: `发生错误`,
              description: get(res, 'detail') || get(res, 'title'),
            });
            // window.location.href = '/#/user/login';
            break;
          default:
            notification.error({ message: `发生错误`, description: get(res, 'detail') });
            isDev && console.log(res);
            return Promise.reject(error);
        }
      });
  },
});

/**
 * 配置request请求时的默认参数
 */

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  // 不是登录并且没有 token ，跳转到登录页面
  if (!(['/api/authenticate'].indexOf(url) > -1) && !store.get(TOKEN)) {
    window.location.href = '/#/user/login';
    return { url, options };
  }

  // 已有 token ，但是 token 已失效
  // const loginTime = store.get('loginTime');
  // const expiredTime = store.get('expiredTime');
  // if (
  //   !(['/api/authenticate'].indexOf(url) > -1) &&
  //   loginTime + expiredTime < new Date().getTime()
  // ) {
  //   notification.error({ message: 'token已过期，请重新登录' });
  //   Promise.reject('token已过期');
  //   window.location.href = '/#/user/login';
  //   return { url, options };
  // }

  options.headers = {
    ...options.headers,
    Authorization: store.get(TOKEN),
  };

  return { url, options };
});

// response拦截器, 处理response
request.interceptors.response.use(response => {
  const token = response.headers.get('Authorization');
  if (token) {
    r.config({ Authorization: token })
    store.set(TOKEN, token);
  }

  return response;
});

export default request;
