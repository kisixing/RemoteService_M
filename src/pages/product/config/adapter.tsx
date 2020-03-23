import { get, map, split } from 'lodash';

export const toApi = item => {
  let pictureString = '';
  map(get(item, 'picture'), (picture, index) => {
    pictureString += `${get(picture, 'url')}${
      get(item, 'picture').length === index + 1 ? '' : ','
    }`;
  });
  return {
    ...item,
    picture: pictureString,
  };
};

export const fromApi = item => {
  const picture = map(split(get(item, 'picture'), ','), singlePicture => {
    return {
      uid: Math.random(),
      name: singlePicture,
      status: 'done',
      url: singlePicture,
      thumbUrl: singlePicture,
    };
  });
  return {
    ...item,
    picture,
  };
};
