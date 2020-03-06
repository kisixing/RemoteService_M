import { map, get, keyBy } from 'lodash';
import { orderStatusMapping } from '../components/ServiceTypeSelect';

export const processFromApi = (data: any) => {
  return map(data, item => {
    return {
      ...item,
      username: get(item, 'pregnancy.name'),
      payStateString:
        get(keyBy(orderStatusMapping, 'value'), `${get(item, 'paystate')}.title`) || '未知',
    };
  });
};
