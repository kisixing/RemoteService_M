import { IRoute } from 'umi-types';
import exception from './general-routes/exception';
import businessRoutes from './business-routes';
import loginRoutes from './general-routes/login';
import system from './general-routes/system';

export const routes: IRoute[] = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/mobile-demo',
        component: './mobile-demo/index',
      },
      loginRoutes,
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/account/settings',
            component: './user/settings',
          },
          {
            path: '/',
            component: './Welcome',
          },
          exception,
          ...businessRoutes,
          system,
        ],
      },
    ],
  },
];
