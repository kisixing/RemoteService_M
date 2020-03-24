import { IRoute } from 'umi-types';

const r: IRoute = {
  name: 'exception',
  icon: 'warning',
  path: '/exception',
  component: '../layouts/BlankLayout',
  routes: [
    {
      name: '403',
      icon: 'smile',
      path: '/exception/403',
      component: './exception/403',
    },
    {
      name: '404',
      icon: 'smile',
      path: '/exception/404',
      component: './exception/404',
    },
    {
      name: '500',
      icon: 'smile',
      path: '/exception/500',
      component: './exception/500',
    },
  ],
};

export default r;
