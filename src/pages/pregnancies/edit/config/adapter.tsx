import { map, get, keys, replace, set, indexOf } from 'lodash';

export const formDescriptionsFromApi = data => {
  return map(data, item => {
    return {
      ...item,
      fields: map(get(item, 'fields'), field => {
        return {
          ...field,
          isNewRow: get(field, 'is_new_row'),
          inputType: get(field, 'input_type'),
          inputProps: JSON.parse(`${get(field, 'input_props')}`),
          formItemLayout: JSON.parse(`${get(field, 'form_item_layout')}`),
          rules: JSON.parse(`${get(field, 'rules')}`),
          styles: JSON.parse(`${get(field, 'styles')}`),
        };
      }),
    };
  });
};

export const toApi = data => {
  const result = {};
  map(keys(data), key => {
    if (indexOf(key, '_') > -1) {
      const path = replace(key, '_', '.');
      set(result, path, get(data, key));
    } else if (indexOf(keys(result), key) > -1) {
      if (get(data, key) instanceof Object) {
        set(result, key, { ...get(data, key), ...get(result, key) });
      }
    } else {
      set(result, key, get(data, key));
    }
  });
  return result;
};

export const mapDataToForm = (data, preKey = undefined) => {
  let newData = {};

  map(data, (item, key) => {
    if (item instanceof Object) {
      newData = { ...newData, ...mapDataToForm(item, key), [key]: item };
    } else {
      preKey ? set(newData, `${preKey}_${key}`, item) : set(newData, key, item);
    }
  });
  return newData;
};

export const fromApi = data => {
  return mapDataToForm(data);
};
