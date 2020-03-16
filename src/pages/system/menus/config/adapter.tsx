import { map, isEmpty } from 'lodash';

const transferMenus = (menus: any, parentid = 0) => {
  const temp: any = [];
  map(menus, item => {
    if (item.parentid === parentid) {
      item.title = item.name;
      item.value = item.id;
      if (!isEmpty(transferMenus(menus, item.id))) {
        item.children = transferMenus(menus, item.id);
      }
      temp.push(item);
    }
  });
  return temp;
};

export const processFromApi = data => {
  return transferMenus(data);
};
