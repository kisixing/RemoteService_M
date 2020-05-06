import { IRoute } from 'umi-types';

const r: IRoute = {
  name: 'follow-up',
  icon: 'setting',
  path: '/follow-up',
  routes: [
    {
      name: 'question',
      icon: 'setting',
      path: '/follow-up/question',
      routes: [
        {
          name: 'list',
          icon: 'user',
          path: '/follow-up/question/list',
          component: './follow-up/question/list',
        },
        {
          name: 'add',
          icon: 'user',
          path: '/follow-up/question/add',
          component: './follow-up/question/edit',
        },
        {
          path: '/follow-up/question/edit',
          component: './follow-up/question/edit',
        },
      ],
    },
    {
      name: 'work-flow',
      icon: 'setting',
      path: '/follow-up/work-flow',
      component: './follow-up/work-flow',
    },
  ],
};

export default r;
