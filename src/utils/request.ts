/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import router from 'umi/router';
import store from 'store';
import { extend } from 'umi-request';
import { notification } from 'antd';
import { get } from 'lodash';

export const TOKEN = 'lianmed-authority';

const isDev = process.env.isDev || true;

const request = extend({
  prefix: '/api',
  timeout: 1000,
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    Accept: 'application/json',
  },
  useCache: false,
  errorHandler: error => {
    const { response } = error;
    switch (get(response, 'status')) {
      case 401:
        notification.error({ message: '请先登录' });
        window.location.href = '/#/user/login';
        break;
      default:
        break;
    }
    isDev && console.log(response);
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

  options.headers = {
    ...options.headers,
    Authorization: store.get(TOKEN),
  };

  return { url, options };
});

// response拦截器, 处理response
request.interceptors.response.use(response => {
  const token = response.headers.get('authorization');
  if (token) {
    store.set(TOKEN, token);
  }
  return response;
});

export default request;
