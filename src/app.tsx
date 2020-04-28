import store from 'store';
import { router } from 'umi';
import { TOKEN } from '@/utils/request';

// 首次渲染的时候权限认证
// TODO: 暂时只通过本地认证
export const render = (oldRender: any) => {
  const username = store.get('username');
  const token = store.get(TOKEN);
  const loginTime = store.get('loginTime');
  const expiredTime = store.get('expiredTime');
  if (!token || !username || loginTime + expiredTime < new Date().getTime()) {
    router.push('/user/login');
    oldRender();
  } else {
    oldRender();
  }
};
