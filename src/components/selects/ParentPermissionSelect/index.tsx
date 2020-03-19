import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import { map } from 'lodash';
import request from '@/utils/request';

export default (props: any) => {
  const [menus, setMenus] = useState();

  const transferMenus = (menus: any, parentid = 0) => {
    const temp: any = [];
    map(menus, item => {
      if (item.parentid === parentid) {
        item.title = item.name;
        item.value = item.id;
        item.children = transferMenus(menus, item.id);
        temp.push(item);
      }
    });
    return temp;
  };

  useEffect(() => {
    (async () => {
      const newMenus = transferMenus(await request.get('/permissions?type.equals=menu&size=100'));
      setMenus([{ id: 0, value: 0, title: '无父级', children: newMenus }]);
    })();
  }, []);

  return (
    <TreeSelect
      treeDefaultExpandAll
      placeholder="请选择父级菜单"
      allowClear
      {...props}
      treeData={menus}
    />
  );
};
