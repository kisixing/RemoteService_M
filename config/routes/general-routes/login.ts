
// 登录注册页路由
export default {
  path: '/user',
  component: '../layouts/UserLayout',
  routes: [
    {
      path: '/user',
      redirect: '/user/login',
    },
    {
      path: '/user/reset',
      component: './user/reset',
    },
    {
      name: 'login',
      icon: 'smile',
      path: '/user/login',
      component: './user/login',
    },
    {
      name: 'register-result',
      icon: 'smile',
      path: '/user/register-result',
      component: './user/register-result',
    },
    {
      name: 'register',
      icon: 'smile',
      path: '/user/register',
      component: './user/register',
    },
  ],
};
