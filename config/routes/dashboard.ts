import { IRoute } from 'umi-types';

const r: IRoute = {
  path: '/dashboard',
  name: 'dashboard',
  icon: 'dashboard',
  hideInMenu: true,
  routes: [
    {
      name: 'workplace',
      icon: 'smile',
      path: '/dashboard/workplace',
      component: './dashboard/workplace',
    },
  ],
};

export default r;
