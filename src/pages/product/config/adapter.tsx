import { get } from 'lodash';

export const toApi = item => {
  return {
    ...item,
    picture: get(item, 'picture.0.url'),
  };
};

export const fromApi = item => {
  return {
    ...item,
    picture: [
      {
        uid: Math.random(),
        name: get(item, 'picture'),
        status: 'done',
        url: get(item, 'picture'),
        thumbUrl: get(item, 'picture'),
      },
    ],
  };
};
