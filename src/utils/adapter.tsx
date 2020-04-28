import { map, get, reduce, concat, keyBy, set } from 'lodash';
import moment from 'moment';

export const formDescriptionsFromApi = data => {
  return map(data, item => {
    return {
      ...item,
      fields: map(get(item, 'fields'), field => {
        return {
          ...field,
          isNewRow: get(field, 'is_new_row'),
          inputType: get(field, 'input_type'),
          inputProps: get(field, 'input_props') && JSON.parse(`${get(field, 'input_props')}`),
          formItemLayout: get(field, 'form_item_layout') && JSON.parse(`${get(field, 'form_item_layout')}`),
          rules: get(field, 'rules') && JSON.parse(`${get(field, 'rules')}`),
          styles: get(field, 'styles') && JSON.parse(`${get(field, 'styles')}`),
        };
      }),
    };
  });
};

export const formDescriptionsWithoutSectionApi = formDescriptions => {
  return keyBy(
    reduce(
      formDescriptions,
      (sum, formDescription) => {
        return concat(sum, get(formDescription, 'fields'));
      },
      [],
    ),
    'key',
  );
};

export const transferDataToFormByRules = (data: any, nativeFormDescription: any) => {
  const result = {};
  map(nativeFormDescription, (desctiption, key) => {
    const { tranfer_rules: tranferRules } = desctiption;
    let type = 'default';
    let path = key;
    if (tranferRules && JSON.parse(tranferRules)) {
      const tranferRulesJson = JSON.parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
    }

    switch (type) {
      case 'stage':
        set(result, `${key}.0`, get(data, `${key}h`));
        set(result, `${key}.1`, get(data, `${key}m`));
        break;
      case 'moment':
        set(result, key, moment(get(data, path)));
        break;
      case 'default':
      default:
        set(result, key, get(data, path));
        break;
    }
  });
  return result;
};
