import { IRoute } from 'umi-types';

const r: IRoute = {
  name: 'system',
  icon: 'setting',
  path: '/system',
  routes: [
    {
      name: 'users',
      icon: 'user',
      path: '/system/users',
      component: './system/users',
    },
    {
      name: 'roles',
      icon: 'usergroup-add',
      path: '/system/roles',
      component: './system/roles',
    },
    {
      name: 'menus',
      icon: 'menu',
      path: '/system/menus',
      component: './system/menus',
    },
    {
      name: 'task',
      icon: 'code',
      path: '/system/task',
      component: './system/task',
    },
    {
      name: 'audit',
      icon: 'audit',
      path: '/system/audit',
      component: './system/audit',
    },
  ],
};

export default r;
