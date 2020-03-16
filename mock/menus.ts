import { Request, Response } from 'express';

const getMenus = (req: Request, res: Response) => {
  res.json([
    {
      key: '1',
      name: '产品管理',
      type: 'menu',
      module: 'PRODUCT',
      code: '--',
      children: [
        {
          key: '2',
          name: '产品列表',
          type: 'menu',
          module: 'PRODUCTLIST',
          code: '--',
          children: [
            {
              key: '3',
              name: '产品新增',
              type: 'permission',
              module: 'PRODUCTLIST',
              code: 'view',
            },
            {
              key: '4',
              name: '产品编辑',
              type: 'permission',
              module: 'PRODUCTLIST',
              code: 'edit',
            },
            {
              key: '5',
              name: '产品删除',
              type: 'permission',
              module: 'PRODUCTLIST',
              code: 'delete',
            },
          ],
        },
      ],
    },
    {
      key: '6',
      name: '套餐管理',
      type: 'menu',
      module: 'PACKAGE',
      code: '--',
      children: [
        {
          key: '2',
          name: '套餐列表',
          type: 'menu',
          module: 'PRODUCTLIST',
          code: '--',
          children: [
            {
              key: '3',
              name: '套餐新增',
              type: 'permission',
              module: 'PRODUCTLIST',
              code: 'view',
            },
            {
              key: '4',
              name: '套餐编辑',
              type: 'permission',
              module: 'PRODUCTLIST',
              code: 'edit',
            },
            {
              key: '5',
              name: '套餐删除',
              type: 'permission',
              module: 'PRODUCTLIST',
              code: 'delete',
            },
          ],
        },
      ],
    },
  ]);
};

export default {
  'GET /api/menus': getMenus,
};
