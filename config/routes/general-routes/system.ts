// 系统页路由
export default {
  name: 'system',
  icon: 'setting',
  path: '/system',
  routes: [
    {
      name: 'users',
      icon: 'user',
      path: '/system/user',
      component: './system/users',
    },
    {
      name: 'roles',
      icon: 'usergroup-add',
      path: '/system/role',
      component: './system/roles',
    },
    {
      name: 'menus',
      icon: 'menu',
      path: '/system/menu',
      component: './system/menus',
    },
    {
      name: 'config-form',
      icon: 'setting',
      path: '/system/config-form',
      routes: [
        {
          name: 'section',
          icon: 'setting',
          path: '/system/config-form/sections',
          component: './system/config-form/sections',
        },
        {
          name: 'form-description',
          icon: 'setting',
          path: '/system/config-form/descriptions',
          component: './system/config-form/descriptions',
        },
      ],
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
    {
      name: 'version',
      icon: 'audit',
      path: '/system/version',
      component: './system/version',
    },
  ],
};
