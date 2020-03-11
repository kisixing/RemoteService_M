import { get, map } from 'lodash';

export const processFromApi = data => {
  return map(data, item => {
    return {
      ...item,
    };
  });
};
