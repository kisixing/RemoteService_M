import { IRoute } from 'umi-types';
import dashboard from './dashboard';
import product from './product';
import device from './device';
import service from './service';
import _package from './package';
import order from './order';
import system from './system';
import exception from './exception';

export const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      exception,
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
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
          product,
          _package,
          order,
          device,
          {
            name: 'pregnancies',
            icon: 'user',
            path: '/pregnancies',
            routes: [
              {
                name: 'list',
                icon: 'ordered-list',
                path: '/pregnancies/list',
                component: './pregnancies/list',
              },
              {
                name: 'add',
                icon: 'ordered-list',
                path: '/pregnancies/add',
                component: './pregnancies/edit',
              },
              {
                name: 'edit',
                icon: 'ordered-list',
                hideInMenu: true,
                path: '/pregnancies/edit',
                component: './pregnancies/edit',
              },
            ],
          },
          {
            name: 'ctgfees',
            icon: 'setting',
            path: '/ctg-fees',
            component: './ctg-fees',
          },
          service,
          dashboard,
          {
            name: 'im',
            icon: 'team',
            path: '/im',
            component: './WebIM',
          },
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
