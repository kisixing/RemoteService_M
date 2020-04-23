import { IRoute } from 'umi-types';

const r: IRoute = {
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
    // test
    {
      name: 'physical-exam',
      icon: 'ordered-list',
      path: '/pregnancies/physical-exam/edit',
      component: './physical-exam/edit',
    },
    {
      name: 'physical-exam',
      icon: 'ordered-list',
      path: '/pregnancies/deliver-form',
      component: './deliver-form/edit',
    },
  ],
};

export default r;
