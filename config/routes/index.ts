import { IRoute } from 'umi-types';
import dashboard from './dashboard';
import product from './product';
import device from './device';
import service from './service';
import _package from './package';
import order from './order';
import system from './system';
import followUp from './follow-up';
import pregnancies from './pregnancies';
import exception from './exception';

export const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/mobile-demo',
        component: './mobile-demo/index',
      },
      {
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
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'user'],
        routes: [
          exception,
          product,
          _package,
          order,
          device,
          pregnancies,
          {
            name: 'ctgfees',
            icon: 'setting',
            path: '/ctg-fees',
            component: './ctg-fees',
          },
          {
            path: '/account/settings',
            component: './user/settings',
          },
          service,
          followUp,
          // {
          //   name: 'im',
          //   icon: 'team',
          //   path: '/im',
          //   component: './WebIM',
          // },
          // {
          //   name: 'imtest',
          //   icon: 'setting',
          //   path: '/imtest',
          //   component: './WebIM/test',
          // },
          system,
          {
            path: '/',
            component: './Welcome',
          },
        ],
      },
    ],
  },
];
