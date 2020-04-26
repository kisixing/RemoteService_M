import { map, get } from 'lodash';

export const fromApi = (data: any[]) => {
  return map(data, item => {
    return {
      ...item,
      placentaintact: {
        key: get(item, 'placentaintact'),
        keyNote: get(item, 'placentaintactNote'),
      },
    };
  });
};
