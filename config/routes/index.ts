import { IRoute } from 'umi-types';
// import account from "./account";
import dashboard from './dashboard';
// import form from "./form";
// import list from "./list";
// import profile from "./profile";
// import result from "./result";
// import editor from "./editor";
// import exception from "./exception";

import product from './product';
import device from './device';
import service from './service';
import _package from './package';
import order from './order';
import system from './system';
import propaganda from './propaganda';
import onlineConsultation from './onlineConsultation';
import pregnancyBook from './pregnancyBook';
import guardianshipFile from './guardianshipFile';

export const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
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
          {
            component: '404',
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
          service,
          {
            name: 'ctgfees',
            icon: 'setting',
            path: '/ctg-fees',
            component: './ctg-fees',
          },
          dashboard,
          {
            name: 'im',
            icon: 'team',
            path: '/im',
            component: './WebIM',
          },
          {
            name: 'imtest',
            icon: 'setting',
            path: '/imtest',
            component: './WebIM/test',
          },
          system,

          {
            path: '/',
            redirect: '/dashboard/workplace',
            authority: ['admin', 'user'],
          },
          {
            component: '404',
          },
        ],
      },
    ],
  },
];
