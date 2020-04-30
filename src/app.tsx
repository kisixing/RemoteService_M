import store from 'store';
import { startsWith } from 'lodash';
import { router } from 'umi';
import { TOKEN } from '@/utils/request';

// 首次渲染的时候权限认证
// TODO: 暂时只通过本地认证
export const render = (oldRender: any) => {
  const username = store.get('username');
  const token = store.get(TOKEN);
  const loginTime = store.get('loginTime');
  const expiredTime = store.get('expiredTime');
  if (startsWith(window.location.hash, '#/user/login')) {
    oldRender();
  } else {
    // eslint-disable-next-line no-lonely-if
    if (!token || !username || loginTime + expiredTime < new Date().getTime()) {
      router.push('/user/login');
      oldRender();
    } else {
      oldRender();
    }
  }
};
