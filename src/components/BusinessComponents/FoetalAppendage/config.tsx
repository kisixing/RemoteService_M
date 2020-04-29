import { map, get, set } from 'lodash';
import moment from 'moment';

export const fromApi = (data: any[], nativeFormDescriptions: any) => {
  const resultArray = map(data, item => {
    const result = { ...item };
    map(nativeFormDescriptions, (desctiption, key) => {
      const { tranfer_rules: tranferRules } = desctiption;
      let type = 'default';
      let path = key;
      if (tranferRules && JSON.parse(tranferRules)) {
        const tranferRulesJson = JSON.parse(tranferRules);
        type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
        path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
      }

      switch (type) {
        case 'key_and_keyNote':
          set(result, `${key}.key`, get(item, path));
          set(result, `${key}.keyNote`, get(item, `${path}Note`));
          break;
        case 'moment':
          set(result, key, moment(get(item, path)));
          break;
        case 'default':
        default:
          set(result, key, get(item, path));
          break;
      }
    });

    return result;
  });

  console.log(resultArray);
  return resultArray;
};

export const toApi = (data: any[], nativeFormDescriptions: any) => {
  const resultArray = map(data, item => {
    const result = { ...item };
    map(nativeFormDescriptions, (desctiption, key) => {
      const { tranfer_rules: tranferRules } = desctiption;
      let type = 'default';
      let path = key;
      if (tranferRules && JSON.parse(tranferRules)) {
        const tranferRulesJson = JSON.parse(tranferRules);
        type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
        path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
      }

      switch (type) {
        case 'key_and_keyNote':
          set(result, path, get(item, `${key}.key`));
          set(result, `${path}Note`, get(item, `${key}.keyNote`));
          break;
        case 'default':
        default:
          set(result, path, get(item, key));
          break;
      }
    });

    return result;
  });

  console.log(resultArray);
  return resultArray;
};
